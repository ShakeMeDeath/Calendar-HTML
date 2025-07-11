def possibleStringCount(word):
    current_letter: str = word[len(word)-1]
    ouput_num: int = 0

    for i in word[::-1]:

        if i == current_letter:
            ouput_num += 1

        elif i != current_letter:
            current_letter = i

    return ouput_num