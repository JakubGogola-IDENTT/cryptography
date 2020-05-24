from enc import merkle_hellman as mh
from random import seed

if __name__ == "__main__":
    seed(0)

    msg = "Something to encrypt"

    bin_msg = mh.str_to_bin(msg)

    private_key, B = mh.gen(128)

    encrypted = mh.enc(bin_msg, B)
    decrytped = mh.dec(encrypted, private_key)

    print(decrytped)

