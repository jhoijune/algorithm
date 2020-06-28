import re


def solution(phone_book):
    """
    전화번호 목록
    """
    size = len(phone_book)
    for index in range(size):
        for count in range(1, size):
            if len(phone_book[index]) <= len(phone_book[(index+count) % size]):
                p = re.compile(phone_book[index])
                m = p.match(phone_book[(index+count) % size])
                if m:
                    return False

    return True
