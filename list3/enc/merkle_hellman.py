from random import randint
from sympy import mod_inverse
from math import gcd
from textwrap import wrap

def str_to_bin(str_to_conv):
    bin_str = ''

    for c in str_to_conv:
        bin_ch = format(ord(c), '08b')
        bin_str += str(bin_ch)

    return bin_str

def bin_to_str(str_to_conv):
    bin_chunks = chunks(str_to_conv, 8)
    converted_str = ''

    for ch in bin_chunks:
        c = chr(int(ch, 2))
        converted_str += c

    return converted_str

def chunks(str_to_chunks, n):
    wrapped = wrap(str_to_chunks, n)

    while len(wrapped[-1]) < n:
        wrapped[-1] = '0' + wrapped[-1]

    return wrapped

def knapsack(s, A):
    bin_str = ''

    for a in reversed(A):
        if s >= a:
            bin_str = '1' + bin_str
            s -= a
        else:
            bin_str = '0' + bin_str
    
    if s != 0:
        raise Exception("Invalid s valie")

    return bin_str

def gen(n):
    # A - private key (super-increasing sequence)
    A = []

    init_seed = randint(0, n)
    A.append(init_seed)
    
    for _ in range(n - 1):
        next = sum(A) + randint(1, 10)
        A.append(next)

    E = sum(A)
    M = randint(E + 1, 2 * E)

    W = 0

    while gcd(W, M) != 1:
        W = randint(2, E - 1)
    
    # B - public key
    B = []
    for a in A:
        B.append(W * a % M)

    # (A, W, M) - private key
    # B - public key
    return (A, W, M), B

def enc(P, B):
    n = len(B)

    msg_chunks = chunks(P, n)

    C = []
    for ch in msg_chunks:
        c = sum([int(ch[j]) * B[j] for j in range(n)])
        C.append(c)
    
    return C
            

def dec(C, private_key):
    A, W, M = private_key

    w = mod_inverse(W, M)

    S = []
    for c in C:
        s = w * c % M
        S.append(s)

    P = []
    for s in S:
        P.append(knapsack(s, A))

    msg = ''
    for p in P:
        msg += bin_to_str(p)

    return msg

    



