"""Efectos de sonido del teaser, sintetizados desde cero con numpy (sin muestras ni música de terceros).
Uso: python scripts/teaser/sonido.py  →  scripts/teaser/audio/efectos.wav (48 kHz, estéreo, 43 s)
Los tiempos coinciden con escena.html."""
import wave
from pathlib import Path
import numpy as np

SR = 48000
DUR = 43.0
N = int(SR * DUR)
rng = np.random.default_rng(7)
L = np.zeros(N)
R = np.zeros(N)


def t_(d):
    return np.arange(int(SR * d)) / SR


def banda(x, lo=None, hi=None):
    """Filtro paso banda por FFT (suave)."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    m = np.ones_like(f)
    if lo:
        m *= 1 / (1 + (lo / np.maximum(f, 1)) ** 4)
    if hi:
        m *= 1 / (1 + (f / hi) ** 4)
    return np.fft.irfft(X * m, len(x))


def env(n, ataque, caida):
    e = np.ones(n)
    a = int(SR * ataque)
    if a:
        e[:a] = np.linspace(0, 1, a)
    t = np.arange(n - a) / SR
    e[a:] = np.exp(-t / caida)
    return e


def poner(sig, en, gan=1.0, pan=0.0):
    i = int(en * SR)
    if i >= N:
        return
    sig = sig[: N - i]
    gl, gr = np.sqrt((1 - pan) / 2), np.sqrt((1 + pan) / 2)
    L[i:i + len(sig)] += sig * gan * gl * 1.414
    R[i:i + len(sig)] += sig * gan * gr * 1.414


def eco(x, dur=1.2, mezcla=.25):
    ir = rng.standard_normal(int(SR * dur)) * np.exp(-np.arange(int(SR * dur)) / SR / (dur / 5))
    ir = banda(ir, 200, 6000)
    ir /= np.abs(ir).sum() ** .5 * 6
    n = len(x) + len(ir)
    y = np.fft.irfft(np.fft.rfft(x, n) * np.fft.rfft(ir, n), n)
    out = np.zeros(n)
    out[:len(x)] += x
    return out * (1 - mezcla) + y * mezcla * 4


# ── Sonidos base
def golpe_piedra(peso=1.0):
    d = .9
    t = t_(d)
    cuerpo = np.sin(2 * np.pi * (55 + 60 * np.exp(-t * 30)) * t) * env(len(t), .002, .18)
    roce = banda(rng.standard_normal(len(t)), 300, 2500) * env(len(t), .001, .03)
    chas = banda(rng.standard_normal(len(t)), 1500, 7000) * env(len(t), 0, .012) * .5
    return eco((cuerpo * 1.1 + roce * .6 + chas) * peso, .8, .15)


def caldero(fuerte=1.0):
    d = 2.2
    t = t_(d)
    parciales = [(212, 1.0, .9), (437, .7, .7), (689, .5, .55), (1033, .35, .4), (1497, .25, .3), (2213, .15, .2)]
    s = sum(a * np.sin(2 * np.pi * f * t + rng.random() * 6) * np.exp(-t / c) for f, a, c in parciales)
    golpe = banda(rng.standard_normal(len(t)), 800, 6000) * env(len(t), 0, .015)
    return eco((s * .35 + golpe * .5) * fuerte * env(len(t), .001, 2), 1.5, .3)


def bum(fuerte=1.0, d=2.4):
    t = t_(d)
    sub = np.sin(2 * np.pi * (38 + 90 * np.exp(-t * 12)) * t) * env(len(t), .003, .55)
    cuerpo = banda(rng.standard_normal(len(t)), 40, 400) * env(len(t), .002, .25)
    ataque = banda(rng.standard_normal(len(t)), 2000, 9000) * env(len(t), 0, .02) * .6
    return eco((sub * 1.2 + cuerpo * .7 + ataque) * fuerte, 2.0, .35)


def golpe_corto(fuerte=1.0):
    t = t_(.5)
    k = np.sin(2 * np.pi * (48 + 140 * np.exp(-t * 40)) * t) * env(len(t), .001, .12)
    tic = banda(rng.standard_normal(len(t)), 3000, 10000) * env(len(t), 0, .01) * .35
    return (k + tic) * fuerte


def zas(d=.45, fuerte=1.0, sube=True):
    t = t_(d)
    x = rng.standard_normal(len(t))
    # barrido de filtro: suma de bandas con envolventes desplazadas
    out = np.zeros_like(x)
    pasos = 8
    for i in range(pasos):
        c = 300 * (2 ** (i * 0.75))
        b = banda(x, c * .7, c * 1.4)
        centro = (i / (pasos - 1)) if sube else 1 - i / (pasos - 1)
        out += b * np.exp(-((t / d - centro * .8 - .1) ** 2) / .02)
    out *= np.sin(np.pi * t / d) ** 1.5
    return out / (np.abs(out).max() + 1e-9) * .5 * fuerte


def subida(d=.5):
    t = t_(d)
    x = banda(rng.standard_normal(len(t)), 500, 9000) * (t / d) ** 3
    tono = np.sin(2 * np.pi * (200 + 800 * (t / d) ** 2) * t) * (t / d) ** 2 * .2
    return (x * .5 + tono)


def toque():
    t = t_(.12)
    return (np.sin(2 * np.pi * 1800 * t) * .4 + banda(rng.standard_normal(len(t)), 2000, 8000) * .6) * env(len(t), 0, .012)


def chasquido_fuego(d, densidad=40, fuerte=1.0):
    n = int(SR * d)
    x = np.zeros(n)
    rumor = banda(rng.standard_normal(n), 80, 900) * .12
    for _ in range(int(densidad * d)):
        i = rng.integers(0, n - 2000)
        l = rng.integers(60, 900)
        c = banda(rng.standard_normal(l), 1500, 9000) * np.exp(-np.arange(l) / (l / 5)) * rng.uniform(.2, 1)
        x[i:i + l] += c
    return (x * .5 + rumor) * fuerte


def encendido():
    t = t_(1.0)
    x = banda(rng.standard_normal(len(t)), 150, 3000) * env(len(t), .06, .25)
    return x * .8


def zumbido(d):
    t = t_(d)
    s = (np.sin(2 * np.pi * 55 * t) + .5 * np.sin(2 * np.pi * 58.3 * t) + .25 * np.sin(2 * np.pi * 110.5 * t))
    e = np.minimum(1, t / .4) * np.minimum(1, (d - t) / .3)
    return s * e * .35


def latido():
    t = t_(.35)
    return np.sin(2 * np.pi * (45 + 50 * np.exp(-t * 35)) * t) * env(len(t), .002, .08)


# ── Pista (tiempos de escena.html, 43 s)
# A · gancho (0–2,4)
poner(chasquido_fuego(2.4, 30, .9) * np.linspace(.3, 1, int(SR * 2.4)), 0.0, 1.0)
poner(zas(.9, .9), 0.2, .8)
# B · emociones: un golpe por corte
for i, a in enumerate([2.4, 3.4, 4.4, 5.4]):
    poner(golpe_corto(1.0), a, .9, pan=(-.25, .25, -.15, .15)[i])
    poner(zas(.3, .4, sube=False), a - .03, .4)
poner(golpe_corto(.6), 6.5, .6)
poner(golpe_corto(.6), 7.1, .6)
poner(subida(.55), 7.6, .55)
# C · dato
poner(bum(1.0, 2.8), 8.2, 1.0)
poner(bum(1.2, 3.0), 11.2, 1.0)
poner(zumbido(1.8), 14.2, .9)
poner(zas(.5, .8), 15.55, .8)
# D · fogón
for a, p in [(16.38, -.4), (17.08, 0), (17.78, .4)]:
    poner(golpe_piedra(1.0), a, .9, pan=p)
poner(encendido(), 18.45, .9)
poner(chasquido_fuego(7.8, 45, 1.0), 18.5, .8)
poner(caldero(1.0), 19.38, .75)
poner(bum(.5, 2.2), 20.0, .5)
poner(zas(.45, 1.0), 22.55, .9, pan=.5)
poner(caldero(.8), 23.15, .7, pan=.2)
poner(golpe_piedra(.7), 23.2, .6, pan=-.2)
poner(golpe_piedra(1.2), 24.62, 1.0, pan=.4)
poner(caldero(.6), 24.85, .6)
poner(zas(.5, .8), 26.2, .8)
# E · app
for a in np.arange(26.5, 36.9, .75):
    poner(latido(), a, .4)
for a in [28.0, 29.0, 30.6, 31.8]:
    poner(zas(.35, .55), a - .05, .55, pan=.4)
for a in [27.5, 28.6, 30.1, 31.3]:
    poner(toque(), a, .7, pan=.35)
poner(zas(.55, .9), 33.45, .8, pan=-.3)
poner(golpe_corto(.8), 34.1, .8)
poner(zas(.55, .9), 35.05, .8, pan=-.3)
poner(golpe_corto(.8), 35.7, .8)
poner(zas(.5, .7), 36.7, .7)
# F · cierre
poner(encendido(), 37.1, .6)
poner(chasquido_fuego(3.0, 35, .8), 37.0, .7)
poner(zas(.5, .6), 39.75, .6)
poner(bum(.55, 2.4), 40.15, .55)
cola = chasquido_fuego(2.6, 18, .5) * np.linspace(1, 0, int(SR * 2.6)) ** 2
poner(cola, 40.0, .6)

# ── Masterización simple: normalizar a −1 dBFS con limitador suave
st = np.stack([L, R])
pico = np.abs(st).max()
st = np.tanh(st / pico * 1.4) / np.tanh(1.4) * 10 ** (-1 / 20)
st[:, -int(SR * .6):] *= np.linspace(1, 0, int(SR * .6))
out = Path(__file__).parent / 'audio'
out.mkdir(exist_ok=True)
with wave.open(str(out / 'efectos.wav'), 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((st.T * 32767).astype('<i2').tobytes())
print('ok', out / 'efectos.wav')
