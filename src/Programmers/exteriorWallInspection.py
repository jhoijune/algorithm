import sys
import os


def permutation(candidates, Prepermuation, res):
    if len(candidates) == 0:
        res.append(Prepermuation)
        return
    else:
        for i in range(len(candidates)):
            permutation(candidates[:i]+candidates[i+1:],
                        Prepermuation + [candidates[i]], res)
        return


def solution(n, weak, dist):
    # complete search
    dist.sort(reverse=True)

    for i in range(1, len(dist)+1):
        permutations = []
        permutation(dist[:i], [], permutations)
        for p in permutations:
            for start in range(len(weak)):
                _left = weak[:start]
                _right = weak[start:]
                traverse_list = _right + [x+n for x in _left]
                candidate = p.copy()
                while traverse_list and candidate:
                    cur = traverse_list.pop(0)
                    d = candidate.pop(0)
                    Cover = cur + d
                    while traverse_list and traverse_list[0] <= Cover:
                        traverse_list.pop(0)

                if not traverse_list:
                    return i
    return -1
