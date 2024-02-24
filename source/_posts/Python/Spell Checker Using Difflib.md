---
title: Spell Checker Using Difflib
categories:
  - Python
date: 2024-02-24 23:11:42
tags:
  - Python
---
```python
from difflib import get_close_matches

# takes and parses input 
my_input = input()
input_list = my_input.split(' ')

# processes word_list into a list 
lst = [] 
with open("wordlist.txt") as new_file:
    for line in new_file:
        lst.append(line.strip())


new_sentence = ""
suggestions = {}
for i in range(0, len(input_list)):
    if input_list[i].lower() in lst:
        new_sentence += f"{input_list[i]} " 
    else: 
        new_sentence += f"*{input_list[i]}* "

        suggestions[input_list[i]] = get_close_matches(input_list[i], lst)


print(new_sentence)
print("Suggestions:")
for word, suggs in suggestions.items():
    print(f"{word}: {', '.join(suggs)}")

```