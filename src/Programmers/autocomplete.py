from sys import setrecursionlimit

setrecursionlimit(1000001)


class Trie:
    class TrieNode:
        def __init__(self, char):
            self.children = {}
            self.char = char
            self.size = 1

    def __init__(self):
        self.root = Trie.TrieNode('')
        self.root.size = 0

    def insert(self, word):
        self. _insert(self.root, word, 0)

    def _insert(self, curr, word, loc):
        char = word[loc]
        if char not in curr.children:
            node = Trie.TrieNode(char)
            curr.children[char] = node
        else:
            node = curr.children[char]
            node.size = node.size + 1
        if loc != len(word) - 1:
            self._insert(node, word, loc+1)

    def is_only_one(self, str):
        size = len(str)
        curr = self.root
        loc = 0
        while loc < size:
            curr = curr.children[str[loc]]
            loc = loc + 1
        return curr.size < 2


def solution(words):
    trie = Trie()
    answer = 0
    for word in words:
        trie.insert(word)
    for word in words:
        length = len(word)
        loc = 0
        while loc < length - 1:
            if trie.is_only_one(word[0:loc+1]):
                answer = answer + loc + 1
                break
            loc = loc + 1
        if loc == length - 1:
            answer = answer + length
    return answer
