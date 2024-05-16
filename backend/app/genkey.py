import os
def gen_secret_key(length=32):
    return os.urandom(length)

secret_key = gen_secret_key()
print(secret_key.hex())