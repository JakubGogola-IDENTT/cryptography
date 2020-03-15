from functools import reduce
from math import gcd


class LCG:
    mult = 672257317069504227
    incr = 7382843889490547368
    mod = 9223372036854775783

    def __init__(self, seed):
        self.current_state = seed

    def next(self):
        self.current_state = (self.current_state * self.mult + self.incr) % self.mod
        return self.current_state

def egcd(a, b):
    if a == 0:
        return (b, 0, 1)
    else:
        g, x, y = egcd(b % a, a)
        return (g, y - (b // a) * x, x)

def modinv(b, n):
    g, x, _ = egcd(b, n)

    if g == 1:
        return x % n

def crack_unknown_incr(states, mod, mult):
    incr = (states[1] - states[0] * mult) % mod
    return mod, mult, incr

def crack_unknown_mult(states, mod):
    mult = (states[2] - states[1]) * modinv(states[1] - states[0], mod) % mod
    return crack_unknown_incr(states, mod, mult)

def crack_unknown_mod(states):
    diffs = [s1 - s0 for s0, s1 in zip(states, states[1:])]
    zeroes = [t2 * t0 - t1 * t1 for t0, t1, t2 in zip(diffs, diffs[1:], diffs[2:])]
    mod = abs(reduce(gcd, zeroes))
    return crack_unknown_mult(states, mod)


states = [2137]
generator = LCG(states[0])

for i in range(0, 6):
    states.append(generator.next())

print(states)

mod, mult, incr = crack_unknown_mod(states)

cracked = (mult * states[-1] + incr) % mod

print(cracked)

print(cracked == generator.next())