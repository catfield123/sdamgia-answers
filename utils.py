from ctypes import c_int32

def getHash(s):
    hash_code = 0
    for char in s:
        hash_code = 31*hash_code + ord(char)

    return c_int32(hash_code).value   