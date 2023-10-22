from struct import Struct as byteParser

def toAscii85(data):
    """
    Convert input string 'data' into ascii85 encoded string
    @param data: string to encode
    """
    CODE_PREFIX = b"<~"
    CODE_SUFFIX = b"~>"

    # Convert to bytes
    data = data.encode("utf-8")
    powers_of_85 = [85, 85*85, 85*85*85]
    chars = [bytes((i,)) for i in range(33, 118)]
    # chars = [chr(i) for i in range(33, 118)]
    chars2 = [(a + b) for a in chars for b in chars]

    padding = (-len(data)) & 3
    if padding:
        data = data + b'\0' * padding

    # divide data into a group of 4 bytes
    words = byteParser('!%dI' % (len(data) // 4)).unpack(data)

    chunks = []

    for word in words:
        curr_chunk = b'\0'
        if not word:
            curr_chunk = b'z'
        else:
            curr_chunk = (chars2[word // powers_of_85[2]]) + (chars2[word // powers_of_85[0] % powers_of_85[1]]) + (chars[word % powers_of_85[0]])
        chunks.append(curr_chunk)


    if padding:
        if chunks[-1] == b'z':
            chunks[-1] = chars[0] * 5
        chunks[-1] = chunks[-1][:-padding]

    result = CODE_PREFIX + b''.join(chunks) + CODE_SUFFIX

    return result.decode('utf-8')

def fromAscii85(data):
    """
    Decode ascii85 encoded input string 'data' into ascii string
    @param data: string to decode
    """
    CODE_PREFIX = b"<~"
    CODE_SUFFIX = b"~>"
    data = data.encode('utf-8')

    # Remove prefix and suffix used during encoding and
    # adding a 4 character padding to ensure last chunk of data
    # is parsed properly
    data = data[2:-2] + b'u' * 4

    parser = byteParser('!I')
    decoded, curr = [], []
    for cur_char in data:
        if b'!'[0] <= cur_char <= b'u'[0]:
            curr.append(cur_char)
            if len(curr) == 5:
                accumulator = 0
                for c_char in curr:
                    accumulator = 85 * accumulator + (c_char - 33)
                try:
                    decoded.append(parser.pack(accumulator))
                    print("decoded: ", accumulator, decoded[-1])
                except struct.error as e:
                    print('Ascii85 overflow', e)
                    exit(1)
                curr.clear()
        elif cur_char == b'z'[0]:
            decoded.append(b'\0\0\0\0')
        else:
            print("ignoring Whitespace or non-ascii character")

    result = b''.join(decoded)
    padding = 4 - len(curr)
    if padding:
        # Throw away the extra padding
        result = result[:-padding]
    return result.decode('utf-8')


def test():
    strings = [
        'easysy\0\0\0\0\0\0', # 1100101, 1100001, 1110011, 1111001, 1110011, 1111001 | 1100101 01100001 01110011 01111001,1110011 01111001 00000000 00000000
        'moderate', #
    'somewhat difficult']
    # s0 = b"Aladdin:open sesame"
    for s0 in strings:
        s1 = toAscii85(s0)
        s2 = fromAscii85(s1)
        # print(repr(s0), ':', repr(s1), ":", repr(s2))
        assert s0 == s2


if __name__ == '__main__':
    test()
