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

def ext_gcd(a, b):
    if a == 0:
        return (b, 0, 1)
    else:
        g, x, y = ext_gcd(b % a, a)
        return (g, y - (b // a) * x, x)

def mod_inv(b, n):
    g, x, _ = ext_gcd(b, n)

    if g == 1:
        return x % n

def crack_unknown_incr(states, mod, mult):
    incr = (states[1] - states[0] * mult) % mod

    return mod, mult, incr

def crack_unknown_mult(states, mod):
    mult = (states[2] - states[1]) * mod_inv(states[1] - states[0], mod) % mod

    return crack_unknown_incr(states, mod, mult)

def crack_unknown_mod(states):
    diffs = []
    zeroes = []

    for s0, s1 in zip(states, states[1:]):
        diffs.append(s1 - s0)

    for t0, t1, t2 in zip(diffs, diffs[1:], diffs[2:]):
        zeroes.append(t2 * t0 - t1 * t1)

    mod = gcd(0, zeroes[0])

    for z in zeroes[1:]:
        mod = gcd(mod, z)

    mod = abs(mod)
    
    return crack_unknown_mult(states, mod)


# seed
states = [2137]

# init generator with seed
generator = LCG(states[0])

# append some values
for i in range(0, 6):
    states.append(generator.next())


print(states)


mod, mult, incr = crack_unknown_mod(states)

cracked = (mult * states[-1] + incr) % mod
next = generator.next()

print('Cracked: ' + str(cracked))
print('Next: ' + str(next))


print('Result: ' + str(cracked == next))