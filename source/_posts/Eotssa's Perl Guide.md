---
title: Vigenere Keyless Decrypter
categories: 
date: 2024-02-23 23:11:42
tags:
  - Perl
---
Disclaimer: These are notes that I took during lecture. I used Professor's Jin Woo Kim's slides, as well as my general research on the internet. 

## Use of f strings to concatenate 

```python
limit = int(input("Limit: "))
number = 1
sum = 1
numbers = "1"
while sum < limit:
    number += 1
    sum += number
    # note that f-string can also be used like this
    numbers += f" + {number}"
print(f"The consecutive sum: {numbers} = {sum}")

```
```OUTPUT
The consecutive sum: 1 + 2 + 3 = 6
```

### Use of `a < b < c` is legal and has the intended mathematical effect in python. But why don't we use this?
- Consider other programming languages, C# does not have this feature. Best to avoid features that are not widely use...can be confusing

## Strings use the same indexing as perl. Negative indexing. 
-  You can think of input_string[-1] as shorthand for input_string[len(input_string) - 1].

## Searching for substrings
The in operator can tell us if a string contains a particular substring. The Boolean expression a in b is true, if b contains the substring a.

For example, this bit of code
```python
input_string = "test"

print("t" in input_string)
print("x" in input_string)
print("es" in input_string)
print("ets" in input_string)
prints out the following:
```
```
Sample output
True
False
True
False
```


## Instead, the Python string method `find` can be used for this purpose. It takes the substring searched for as an argument, and returns either the first index where it is found, or -1 if the substring is not found within the string.

The image below illustrates how it is used:
```
input_string = "test"

print(input_string.find("t"))
print(input_string.find("x"))
print(input_string.find("es"))
print(input_string.find("ets"))
```
```
Sample output
0
-1
1
-1
```

## Substrings and slices
A substring of a string is a sequence of characters that forms a part of the string. For example, the string example contains the substrings exam, amp and ple, among others. In Python programming, the process of selecting substrings is usually called slicing, and a substring is often referred to as a slice of the string. The two terms can often be used interchangeably.

If you know the beginning and end indexes of the slice you wish to extract, you can do so with the notation [a:b]. This means the slice begins at the index a and ends at the last character before index b - that is, including the first, but excluding the last. You can think of the indexes as separator lines drawn on the left side of the indexed character, as illustrated in the image below:

```python
input_string = "presumptious"

print(input_string[0:3])
print(input_string[4:10])

# if the beginning index is left out, it defaults to 0
print(input_string[:3])

# if the end index is left out, it defaults to the length of the string
print(input_string[4:])
```

```
pre
umptio
pre
umptious
```


### Type Hinting
```python
def print_many_times(message : str, times : int):
    while times > 0:
        print(message)
        times -= 1
```

```python 
def ask_for_name() -> str:
    name = input("Mikä on nimesi? ")
    return name
```


## Lists

### Adding items to a list

The `append` method adds items to the end of a list. It works like this:

```python
numbers = []
numbers.append(5)
numbers.append(10)
numbers.append(3)
print(numbers)
```
```
[5, 10, 3]

```


## Adding to a specific location

If you want to specify a location in the list where an item should be added, you can use the `insert` method. The method adds an item at the specified index. All the items already in the list with an index equal to or higher than the specified index are moved one index further "to the right". Here's an example:

```python
numbers = [1, 2, 3, 4]
numbers.insert(2, 10)
print(numbers)
```

```
# Program
numbers = [1, 2, 3, 4, 5, 6]
numbers.insert(0, 10)
print(numbers)
numbers.insert(2, 20)
print(numbers)

```

```
Sample output
[10, 1, 2, 3, 4, 5, 6]
[10, 1, 20, 2, 3, 4, 5, 6]
```


## Removing items from a list
There are two different approaches to removing an item from a list:

1. If the index of the item is known, you can use the method `pop`.
2. If the contents of the item are known, you can use the method `remove`.

So, the method `pop` takes the index of the item you want to remove as its argument. The following program removes items at indexes 2 and 3 from the list. Notice how the indexes of the remaining items change when one is removed.

```python
my_list = [1, 2, 3, 4, 5, 6]

my_list.pop(2)
print(my_list)
my_list.pop(3)
print(my_list)
```

**Sample output:**

```
[1, 2, 4, 5, 6]
[1, 2, 4, 6]
```

It's useful to remember that the method `pop` also returns the removed item:

```python
my_list = [4, 2, 7, 2, 5]

number = my_list.pop(2)
print(number)
print(my_list)
```

**Sample output:**

```
7
[4, 2, 2, 5]
```


## Remove 

The `remove` method, on the other hand, takes the value of the item to be removed as its argument. For example, consider this program:

```python
my_list = [1, 2, 3, 4, 5, 6]

my_list.remove(2)
print(my_list)
my_list.remove(5)
print(my_list)
```

The above code produces the following output:

```
[1, 3, 4, 5, 6]
[1, 3, 4, 6]
```

The `remove` method removes the **FIRST** occurrence of the value in the list, similar to how the string function `find` returns the index of the first occurrence of a substring. Here's another example:

```python
my_list = [1, 2, 1, 2]

my_list.remove(1)
print(my_list)
my_list.remove(1)
print(my_list)
```

The output of the above code is:

```
[2, 1, 2]
[2, 2]
```

# `in` vs `not in` 

### using `in` for `list`

If the specified item is not present in the list, the `remove` function will raise an error. Similar to working with strings, you can check for the presence of an item using the `in` operator. Here's an example:

```python
my_list = [1, 3, 4]

if 1 in my_list: ## returns true if word exist
    print("The list contains item 1")

if 2 in my_list:
    print("The list contains item 2")
```

The output of the above code is:

```
The list contains item 1
```


## Sorting Lists (`sort` vs `sorted`

To sort a list from smallest to greatest, you can use the `sort` method:

```python
my_list = [2, 5, 1, 2, 4]
my_list.sort()
print(my_list)
```

To create a new sorted copy of the list without modifying the original, you can use the `sorted` function:

```python
my_list = [2, 5, 1, 2, 4]
print(sorted(my_list))
```

Remember, `sort` modifies the original list, while `sorted` creates a new sorted list.

```python
original = [2, 5, 1, 2, 4]
in_order = sorted(original)
print(original)
print(in_order)
```

## Example of sort vs sorted issue
```python
# Write your solution here
def distinct_numbers(my_list : list):
    this_list = []
    for i in my_list:
        if i not in this_list: 
            this_list.append(i)

    #this_list.sort()  
    #return this_list.sort() ## doesn't work. Recall what sort() does. It doesn't return anything. 
    return sorted(this_list)

if __name__ == "__main__":
    my_list = [3, 2, 2, 1, 3, 3, 1]
    print(distinct_numbers(my_list))
```

### Use of in-range
```python
def list_sum(my_list1 : list, my_list2 : list):
    this_list = []
    for i in range(0, len(my_list1)): # recall that it doens't include 3
        result = my_list1[i] + my_list2[i]
        this_list.append(result)
    
    return this_list
```

## Add two lists with the same index, use `zip`

**zip function is used to iterate over two or more lists (and not only lists, but any iterables) in parallel.**
```python
# for item1, item2 in zip(list1, list2):
#   results.append(item1 + item2)

```


# Print Statement Formatting

We have learned three methods for formatting the arguments in the `print` statement.

1. The first method is using the `+` operator for string concatenation:

```python
name = "Mark"
age = 37
print("Hi " + name + " your age is " + str(age) + " years")
```

2. The second method is separating the segments with commas:

```python
print("Hi", name, "your age is", age, "years")
```

3. To remove the automatically added spaces, you can use the `sep` keyword argument:

```python
print("Hi", name, "your age is", age, "years", sep="")
```

You can specify any string as the separator. For example, using `"\n"` as the separator will print each argument on a separate line:

```python
print("Hi", name, "your age is", age, "years", sep="\n")
```

You can also modify the end of the line using the `end` keyword argument. Setting `end=""` removes the newline character:

```python
print("Hi ", end="")
print("there!")
```

---
# `.f` modifier in formatted values

The third method to prepare strings is f-strings. The previous example with the name and the age would look like this formulated with f-strings:

```python
name = "Erkki"
age = 39
print(f"Hi {name} your age is {age} years")
```

The output is:

```
Hi Erkki your age is 39 years
```

Thus far, we have only used very simple f-strings, but they can be very versatile in formatting string-type content. One very common use case is setting the number of decimals that are printed out with a floating-point number. By default, the number is quite high:

```python
number = 1/3
print(f"The number is {number}")
```

The output is:

```
The number is 0.3333333333333333
```

The specific format we want the number to be displayed in can be set within the curly brackets of the variable expression. Let's add a colon character and a format specifier after the variable name:

```python
number = 1/3
print(f"The number is {number:.2f}")
```

The output is:

```
The number is 0.33
```

The format specifier `.2f` states that we want to display 2 decimals. The letter `f` at the end means that we want the variable to be displayed as a float, i.e., a floating-point number.

### White-Space Format

Here's another example, where we specify the amount of whitespace reserved for the variable in the printout. Both times the variable name is included in the resulting string, it has a space of 15 characters reserved. First, the names are justified to the left, and then they are justified to the right:

```python
names = ["Steve", "Jean", "Katherine", "Paul"]
for name in names:
    print(f"{name:15} centre {name:>15}")
```

**{name:15}: Here, :15 means that 15 spaces are reserved for the variable name. If the name is less than 15 characters, the extra spaces will be filled with whitespace. By default, the text is left-justified, meaning the extra spaces will be on the right side of the name.

**{name:>15}: This is similar to the previous one, but with an extra > character. The > means that the text should be right-justified. So if the name is less than 15 characters, the extra spaces will be on the left side of the name.**

The output is:

```
Steve           centre           Steve
Jean            centre            Jean
Katherine       centre       Katherine
Paul            centre            Paul
```

The uses of f-strings are not restricted to `print` commands. They can be assigned to variables and combined with other strings:

```python
name = "Larry"
age = 48
city = "Palo Alto"
greeting = f"Hi {name}, you are {age} years of age"
print(greeting + f", and you live in {city}")
```

The output is:

```
Hi Larry, you are 48 years of age, and you live in Palo Alto
```

You can think of an f-string as a sort of function that creates a normal string based on the "arguments" within the curly brackets.

----------------------------------------

#### Format int list to str list with 2 decimal places

```python
def formatted(my_list : list[float]) -> list[str]:
    str_list = []
    for num in my_list:
        str_list.append(f"{num:.2f}")

    return str_list
```


## More String and List


## Slicing Strings

You are already familiar with the `[]` syntax for accessing a part of a string:

```python
my_string = "exemplary"
print(my_string[3:7])
```

The output is:

```
mpla
```

## Slicing Lists

The same syntax works with lists. Lists can be sliced just like strings:

```python
my_list = [3, 4, 2, 4, 6, 1, 2, 4, 2]
print(my_list[3:7])
```

The output is:

```
[4, 6, 1, 2]
```

## Slicing with Step

In fact, the `[]` syntax works very similarly to the `range` function, which means we can also give it a step:

```python
my_string = "exemplary"
print(my_string[0:7:2])
my_list = [1, 2, 3, 4, 5, 6, 7, 8]
print(my_list[6:2:-1])
```

The output is:

```
eepa
[7, 6, 5, 4]
```

## Reverse a String (easy)

If we omit either of the indexes, the operator defaults to including everything. Among other things, this allows us to write a very short program to reverse a string:

```python
my_string = input("Please type in a string: ")
print(my_string[::-1])
```

Sample output:

```
Please type in a string: exemplary
yralpmexe
```


## Count Method

The `count` method counts the number of times the specified item or substring occurs in the target. The method works similarly with both strings and lists:

```python
my_string = "How much wood would a woodchuck chuck if a woodchuck could chuck wood"
print(my_string.count("ch"))

my_list = [1, 2, 3, 1, 4, 5, 1, 6]
print(my_list.count(1))
```

The output is:

```
5
3
```

The method will not count overlapping occurrences. For example, in the string "aaaa", the method counts only two occurrences of the substring "aa", even though there would actually be three if overlapping occurrences were allowed.

## Replace Method

### Basic Replacement

The `replace` method creates a new string where a specified substring is replaced with another string:

```python
my_string = "Hi there"
new_string = my_string.replace("Hi", "Hey")
print(new_string)
```

The output is:

```
Hey there
```

The method will replace all occurrences of the substring.

### Multiple Replacements

```python
sentence = "sheila sells seashells on the seashore"
print(sentence.replace("she", "SHE"))
```

The output is:

```
SHEila sells seaSHElls on the seashore
```

### Immutable Strings and Variable Assignment

When using the `replace` method, a typical mistake is forgetting that strings are immutable. If the old string is no longer needed, the new string can be assigned to the same variable:

```python
my_string = "Python is fun"

# Replaces the substring and stores the result in the same variable
my_string = my_string.replace("Python", "Java")
print(my_string)
```

The output is:

```
Java is fun
```

If the old string is not assigned to a new variable or the updated string is not stored, the original string remains unchanged.


----------------------------------------

## `in` Operator

The `in` operator is used to check if a value exists in a sequence, such as a string or a list. It returns `True` if the value is present and `False` otherwise.

### Example 1: Checking Membership in a String

```python
my_string = "Hello, World!"
print('l' in my_string)
print('z' in my_string)
```

The output is:

```
True
False
```

In the first example, `'l'` is present in the string, so `True` is returned. In the second example, `'z'` is not found in the string, so `False` is returned.

### Example 2: Checking Membership in a List

```python
my_list = [1, 2, 3, 4, 5]
print(3 in my_list)
print(6 in my_list)
```

The output is:

```
True
False
```

In the first example, `3` is present in the list, so `True` is returned. In the second example, `6` is not found in the list, so `False` is returned.

## `not in` Operator

The `not in` operator is used to check if a value does not exist in a sequence. It returns `True` if the value is not present and `False` if it is.

### Example 1: Checking Non-Membership in a String

```python
my_string = "Hello, World!"
print('z' not in my_string)
print('o' not in my_string)
```

The output is:

```
True
False
```

In the first example, `'z'` is not found in the string, so `True` is returned. In the second example, `'o'` is present in the string, so `False` is returned.

### Example 2: Checking Non-Membership in a List

```python
my_list = [1, 2, 3, 4, 5]
print(6 not in my_list)
print(3 not in my_list)
```

The output is:

```
True
False
```

In the first example, `6` is not found in the list, so `True` is returned. In the second example, `3` is present in the list, so `False` is returned.

----------------------------------------

# `if` vs. `if not` 

## `if` variant
```python
def no_shouting(my_list : list[str]) -> list[str]: 
    pruned_list = []
    for word in my_list:
        if word.isupper():
            continue
        else:
            pruned_list.append(word)
    
    return pruned_list
```

## `if not` variant (concise) 

```python
def no_shouting(my_list: list):
    without_upper = []
 
    for string in my_list:
        if not string.isupper():
            without_upper.append(string)
 
    return without_upper
```

### Original Code that didn't compile 
```python 
# Write your solution here
def calculate_grade(my_exam : list[int], my_exercise : list[int]):
    # exercise points is x / 10, range [0 - 100] 
    # exam points range [0 - 20]

    for num in my_exercise: 
        num = num // 10  # rounds down, integer division / or //? 

    # combine values using zip() 
    combined_points = []
    for num1, num2 in zip(my_exam, my_exercise):
        combined_points.append(num1 + num2)

    # need to account for the automatic fail of  < 10 points, use range based values instead?
    i = 0   # counter to track exam automatic fails, regardless of points
    grade_list = []                  # "pythonic" method instead of iterating each seperatly, we use count()? 
    for total_points in combined_points: 
        if my_exam[i] < 10: 
            grade_list.append(0)
            i += 1
            continue

        if total_points <= 14 or total_points >= 0:
            grade_list.append(0)
        elif total_points <= 17:
            grade_list.append(1)
        elif total_points <= 20:
            grade_list.append(2)
        elif total_points <= 23:
            grade_list.append(3)
        elif total_points <= 27:
            grade_list.append(4)
        elif total_points <= 30:
            grade_list.append(5)
        
        i += 1 
    
    print("Statistics:") # 1st print
    # calculate point average
    sum = 0
    for num in grade_list: 
        sum += num
    
    average = sum / len(grade_list)

    print(f"Points average: {average}")

    # calculate pass percentage
    students_passed = len(grade_list) - grade_list.count(0)
    pass_percentage = students_passed / len(grade_list)
    print(f"Pass percentage: {pass_percentage}")

    # show grade distribution, formatted
    sort_grade_list = sorted(grade_list)
    # reverse list
    sort_grade_list[::-1]

    print("Grade distribution:")
    for i in range(len(sort_grade_list), 0, -1): 
        print(f"  {i}: ", "*" * sort_grade_list.count(i))




    
def main():
    exam_points_list = []
    num_exercise_list = []

    while True: 
        user_input = input() 

        if user_input == "": 
            break

        ## given that we're limited to using in-book knowledge, use find()? 
        exam_score = int(user_input[0: user_input.find(" ")])
        exercise_score = int(user_input[user_input.find(" ") + 1:])# index + 1, splicing functionality

        exam_points_list.append(exam_score)
        num_exercise_list.append(exercise_score)

        calculate_grade(exam_points_list, num_exercise_list)
    
main()
```

## Issue #1 
```python
    for num in my_exercise: 
        num = num // 10  # rounds down, integer division / or //? 
```
- **`for` loops do not alter data as shown.** num is a temporary variable used to iterate through the structure. 
##### Solution to Issue #1 v_1
```python
    weighted_my_exercise_list = []
    for num in my_exercise: 
        weighted_my_exercise_list.append(num // 10)  # rounds down, integer 
```
- ended up creating a new list and storing the values in there
#### Solution to Issue #1 v_1 **(LIST COMPHRENSION)**
```python
 my_exercise = [num // 10 for num in my_exercise]
```
- This is an example of a **list comprehension**, which is a Python feature that provides a concise way to create lists based on existing lists (or other iterable objects).


## Issue #2 (code conciseness) 
```python
    i = 0   # counter to track exam automatic fails, regardless of points
    grade_list = []                  # "pythonic" method instead of iterating each seperatly, we use count()? 
    for total_points in combined_points: 
        if my_exam[i] < 10: 
            grade_list.append(0)
            i += 1
            continue

        if total_points <= 14 or total_points >= 0:
            grade_list.append(0)
        elif total_points <= 17:
            grade_list.append(1)
        elif total_points <= 20:
            grade_list.append(2)
        elif total_points <= 23:
            grade_list.append(3)
        elif total_points <= 27:
            grade_list.append(4)
        elif total_points <= 30:
            grade_list.append(5)
        
        i += 1 
```
- this is more of a `C++` way of handling code. 

#### Solution to Issue #2 (enumeration function)
```python
for i, total_points in enumerate(combined_points): 
        if my_exam[i] < 10: 
            grade_list.append(0)
            continue

        if total_points <= 14 or total_points >= 0:
            grade_list.append(0)
        elif total_points <= 17:
            grade_list.append(1)
        elif total_points <= 20:
            grade_list.append(2)
        elif total_points <= 23:
            grade_list.append(3)
        elif total_points <= 27:
            grade_list.append(4)
        elif total_points <= 30:
            grade_list.append(5)

```
 
`enumerate()` is a built-in Python function that allows you to loop over something and have an automatic counter. 

When you use `enumerate()`, it gives you two values for each iteration of the loop: the count (or index) and the value of the item at that index. 

So when you write `for i, total_points in enumerate(combined_points):`, the variable `i` is set to the index of the current item in the loop, and `total_points` is set to the value of the item at that index.

**In your original code, you maintained the index `i` manually by initializing `i = 0` before the loop and incrementing `i` with `i += 1` inside the loop. `enumerate()` does this for you automatically.**

Let's say `combined_points` is `[14, 15, 20, 25, 30]`. 

Here's what `i` and `total_points` would be on each iteration of the loop:

- On the first iteration, `i` would be `0` and `total_points` would be `14`.
- On the second iteration, `i` would be `1` and `total_points` would be `15`.
- And so on, until the end of the list.

**The benefit of using `enumerate()` is that it makes the code more readable and Pythonic (idiomatic Python). It's also safer in case you forget to increment `i`, and it's slightly more efficient because you're not performing an additional operation on each loop iteration.**

### Issue #3 (this loops over each element as opposed to each collection of unique grades)
```python
    for i in range(len(sort_grade_list), 0, -1): 
        print(f"  {i}: ", "*" * sort_grade_list.count(i))
```
- Issue: loops over each element, this is not what was intended. 
- Issue#2: Recall the use of range() and its parameters, we want to include grade "0", but that isn't included in the given parameters. 
#### Solution to Issue#3 V_1
```
   for i in range(5, -1, -1): # can use set() function to get unique set of grades, but not discussed. 
        print(f"  {i}:", "*" * sort_grade_list.count(i))
```
- Hard-coded the grading range (not ideal, but works)
- Fixed parameter to be -1, so that 0 is included.
#### **Solution to Issue#3 V_2 (better), use of `set()` function**
```python
   for i in range(len(set(grade_list)), 0, -1): 
        print(f"  {i}: ", "*" * grade_list.count(i))
```
**- set(grade_list) to get a collection of unique grades.** 

### Issue #4: return values on certain functions
```python
    # show grade distribution, formatted
    sort_grade_list = sorted(grade_list)
    # reverse list
    sort_grade_list[::-1]
```
- The list grade_list is reversed using [::-1], but this doesn't actually change grade_list itself, it just returns a reversed copy.
#### Solution to Issue#4
```
```

### Other Improvements #1 (using **split()** for multiple inputs) 
```python
exam_points_list = []
num_exercise_list = []

while True: 
    user_input = input("Exam points and exercises completed: ") 

    if user_input == "": 
        break

    user_input_list = user_input.split()

    exam_point = int(user_input_list[0])
    num_exercise = int(user_input_list[1])
    
    exam_points_list.append(exam_point)
    num_exercise_list.append(num_exercise)
```

In this revised code, the `split()` function creates a list of two strings from the user's input. The `int(user_input_list[0])` and `int(user_input_list[1])` lines then convert the first and second elements of that list to integers, respectively. The rest of the code is the same as in the previous example.


### Compiled Code (Passed All Tests)
```python
# Write your solution here
def calculate_grade(my_exam : list[int], my_exercise : list[int]):
    # exercise points is x / 10, range [0 - 100] 
    # exam points range [0 - 20]

    weighted_my_exercise_list = []
    for num in my_exercise: 
        weighted_my_exercise_list.append(num // 10)  # rounds down, integer division / or //? 

    #print(weighted_my_exercise_list)    
    # combine values using zip() 
    combined_points = []
    for num1, num2 in zip(my_exam, weighted_my_exercise_list):
        combined_points.append(num1 + num2)

    #print(combined_points)

    # need to account for the automatic fail of  < 10 points, use range based values instead?
    i = 0   # counter to track exam automatic fails, regardless of points
    grade_list = []                  # "pythonic" method instead of iterating each seperatly, we use count()? 
    for total_points in combined_points: 
        if my_exam[i] < 10: 
            grade_list.append(0)
            i += 1
            continue

        if total_points <= 14:
            grade_list.append(0)
        elif total_points <= 17:
            grade_list.append(1)
        elif total_points <= 20:
            grade_list.append(2)
        elif total_points <= 23:
            grade_list.append(3)
        elif total_points <= 27:
            grade_list.append(4)
        elif total_points <= 30:
            grade_list.append(5)
        
        i += 1 
    
    print("Statistics:") # 1st print
    # calculate point average
    sum = 0
    for num in combined_points: 
        sum += num
    
    average = sum / len(combined_points)
    #print("my_exam list", my_exam)
    #print("Length of grade list", len(grade_list))
    #print("Grade list values", grade_list)
    print(f"Points average: {average}")

    # calculate pass percentage
    students_passed = len(grade_list) - grade_list.count(0)
    pass_percentage = students_passed / len(grade_list)
    print(f"Pass percentage: {pass_percentage * 100:.1f}")

    # show grade distribution, formatted
    sort_grade_list = sorted(grade_list)
    # reverse list
    sort_grade_list = sort_grade_list[::-1]

    print("Grade distribution:")
    for i in range(5, -1, -1): # can use set() function to get unique set of grades, but not discussed. 
        print(f"  {i}:", "*" * sort_grade_list.count(i))




    
def main():
    exam_points_list = []
    num_exercise_list = []

    while True: 
        user_input = input() 

        if user_input == "": 
            break

        ## given that we're limited to using in-book knowledge, use find()? 
        exam_score = int(user_input[0: user_input.find(" ")])
        exercise_score = int(user_input[user_input.find(" ") + 1:])# index + 1, splicing functionality

        exam_points_list.append(exam_score)
        num_exercise_list.append(exercise_score)


    calculate_grade(exam_points_list, num_exercise_list)
    
main()
```

## Model Solution
- This solution and the way it solves problems was eye-opening.
```python
def exam_and_exercise_completed(inpt):
    space = inpt.find(" ")
    exam = int(inpt[:space])
    exercise = int(inpt[space+1:])
    return [exam, exercise]
 
def exercise_points(amount):
    return amount // 10
 
def grade(points):
    boundary = [0, 15, 18, 21, 24, 28]
    for i in range(5, -1, -1):
        if points >= boundary[i]:
            return i
 
def mean(points):
    return sum(points) / len(points)
 
def main():
    points = []
    grades = [0] * 6
    while True:
        inpt = input("Exam points and exercises completed: ")
        if len(inpt) == 0:
            break
 
        exam_and_exercises = exam_and_exercise_completed(inpt)
        exercise_pnts = exercise_points(exam_and_exercises[1])
        total_points = exam_and_exercises[0] + exercise_pnts
 
        points.append(total_points)
        grd = grade(total_points)
        if exam_and_exercises[0] < 10:
            grd = 0
        grades[grd] += 1
 
    pass_pros = 100 * (len(points) - grades[0]) / len(points)
 
    print("Statistics:")
    print(f"Points average: {mean(points):.1f}")
    print(f"Pass percentage: {pass_pros:.1f}")
    print("Grade distribution:")
    for i in range(5, -1, -1):
        stars = "*" * grades[i]
        print(f"  {i}: {stars}")
 
main()
 
```


## Lists within Lists

The items in a list can be lists themselves:

```python
my_list = [[5, 2, 3], [4, 1], [2, 2, 5, 1]]
print(my_list)
print(my_list[1])
print(my_list[1][0])
```

The output is:

```
[[5, 2, 3], [4, 1], [2, 2, 5, 1]]
[4, 1]
4
```

Lists within lists can be useful for storing structured data. For example, you could store information about a person in a list. Each person's information can be represented as a sublist within the main list:

```python
persons = [["Betty", 10, 1.37], ["Peter", 7, 1.25], ["Emily", 32, 1.64], ["Alan", 39, 1.78]]

for person in persons:
    name = person[0]
    age = person[1]
    height = person[2]
    print(f"{name}: age {age} years, height {height} meters")
```

The output is:

```
Betty: age 10 years, height 1.37 meters
Peter: age 7 years, height 1.25 meters
Emily: age 32 years, height 1.64 meters
Alan: age 39 years, height 1.78 meters
```

In this example, each sublist represents a person, with the first item being the name, the second item being the age, and the third item being the height.

## Matrices

A two-dimensional array, or a matrix, can be represented using a list within a list. Each sublist corresponds to a row in the matrix.

For example, consider the following matrix:

```
5 1 1
```

It can be represented as a two-dimensional list in Python:

```python
my_matrix = [[1, 2, 3], [3, 2, 1], [4, 5, 6]]
```

To access individual elements within the matrix, use consecutive square brackets. The first index refers to the row, and the second index refers to the column. Indexing starts from zero. For example, `my_matrix[0][1]` refers to the second item on the first row.

```python
my_matrix = [[1, 2, 3], [3, 2, 1], [4, 5, 6]]

print(my_matrix[0][1])
my_matrix[1][0] = 10
print(my_matrix)
```

The output is:

```
2
[[1, 2, 3], [10, 2, 1], [4, 5, 6]]
```

Traversing rows and elements within the matrix can be done using nested loops:

```python
my_matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

for row in my_matrix:
    print(row)
```

The output is:

```
[1, 2, 3]
[4, 5, 6]
[7, 8, 9]
```

To access individual elements, use nested loops:

```python
my_matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

for row in my_matrix:
    print("A new row")
    for element in row:
        print

(element)
```

The output is:

```
A new row
1
2
3
A new row
4
5
6
A new row
7
8
9
```

## Visualizing Code with Lists within Lists

Understanding programs that involve lists within lists can be challenging. The Python Tutor visualisation tool can help in visualizing how they work.

Working with matrices and nested lists can be easier to grasp using visualizations. For example, a 3x3 matrix technically consists of four lists. The first list represents the entire matrix, while the remaining lists represent the rows.

The visualisation tool helps in understanding the reference relationships between the main list and the nested lists representing the rows.

## Accessing Items in a Matrix

Accessing a single row within a matrix is straightforward by selecting the desired row. The following function calculates the sum of the elements in a chosen row:

```python
def sum_of_row(my_matrix, row_no: int):
    row = my_matrix[row_no]
    row_sum = 0
    for item in row:
        row_sum += item
    return row_sum

m = [[4, 2, 3, 2], [9, 1, 12, 11], [7, 8, 9, 5], [2, 9, 15, 1]]

my_sum = sum_of_row(m, 1)
print(my_sum)  # prints out 33 (which equals 9 + 1 + 12 + 11)
```

Working with columns within a matrix requires iterating through each row and selecting the item at the chosen position:

```python
def sum_of_column(my_matrix, column_no: int):
    column_sum = 0
    for row in my_matrix:
        column_sum += row[column_no]
    return column_sum

m = [[4, 2, 3, 2], [9, 1, 12, 11], [7, 8, 9, 5], [2, 9, 15, 1]]

my_sum = sum_of_column(m, 2)
print(my_sum)  # prints out 39 (which equals 3 + 12 + 9 + 15)
```

Changing the value of a single element within the matrix can be done by selecting the desired row and column:

```python
def change_value(my_matrix, row_no: int, column_no: int, new_value: int):
    row = my_matrix[row_no]
    row[column_no] = new_value

m = [[4, 2, 3, 2], [9, 1, 12, 11], [7, 8, 9, 5], [2, 9, 15, 1]]

print(m)
change_value(m, 2, 3, 1000)
print(m)
```

The output is:

```
[[4, 2, 3, 2], [9, 1, 12, 11], [7, 8, 9, 5], [2, 9, 15, 1]]
[[4, 2, 3, 2], [9, 1, 12, 11], [7, 8, 9, 1000], [2, 9, 15, 1]]
```

To modify the contents of a matrix, it is necessary to access elements by their indexes rather than using a simple loop. A loop using the `range` function can be used to iterate over the indexes.


# Understanding Python Variables and References

## Variables as References in Python

Instead of considering a variable as a "box" containing its value, it is more accurate to think of a Python variable as a reference to the actual object, which can be a number, a string, or a list, among others. This reference information points to the location in computer memory where the value can be found, but it is not the value itself.

```python
a = [1, 2, 3]
print(id(a))
b = "This is a reference, too"
print(id(b))
```

### Using References to Identify Variables

The function `id` can be used to find out the exact location the variable points to, returning an integer that can be thought of as the memory address. For instance, if you execute the code above on your own computer, the result will likely differ as your variables will point to different locations - the references will be different.

The Python Tutor visualization tool also presents references as arrows from the variable to the actual value. However, it simplifies how strings are represented by displaying them as if they are stored in the variables themselves, even though Python handles strings much like lists with references to locations in memory.

## Understanding Immutable and Mutable Types in Python

Many of Python's built-in types like `str` are immutable, meaning their value or any part of it cannot change. Conversely, some types like `list` are mutable, meaning their content can change without needing to create an entirely new object. 

Surprisingly, the basic data types `int`, `float`, and `bool` are also immutable in Python. Although it may seem like you're changing the value stored in the variable, each operation creates a new object in memory.

```python
number = 1
print(id(number))
number += 10
print(id(number))
a = 1
print(id(a))
```

## Multiple References and List Assignment

When you assign a list variable to a new variable, what gets copied is the reference, not the list itself. This means there are now two references to the same memory location containing the list, and changes made to the list through one reference affect the other reference too, as they both point to the same location.

```python
list1 = [1, 2, 3, 4]
list2 = list1
list1[0] = 10
list2[1] = 20
print(list1)
print(list2)
```

## Copying a List

To create an actual separate copy of a list, you can either create a new list and add each item from the original list, or use the bracket operator `[:]` to select all items in the original list, which creates a copy.

```python
my_list = [1,2,3,4]
new_list = my_list[:]
my_list[0] = 10
new_list[1] = 20
print(my_list)
print(new_list)
```

## Lists as Parameters in Functions

When passing a list as an argument to a function, you're passing a reference to that list, meaning the function can modify the list directly. Note that changes made to the list inside the function persist outside the function because they're modifying the same list referenced in the calling scope.

```python
def add_item(my_list: list):
    new_item = 10
    my_list.append(new_item)
a_list = [1,2,3]
print(a_list)
add_item(a_list)
print(a_list)
```

## Editing Lists Given as Arguments

When you try to modify a list argument within a function by assigning a new list to the argument variable, the original list is not affected because the argument variable now points to a new memory location. A better approach is to directly modify the original list or copy items from the new list into the original one.

```python
def augment_all(my_list: list):
    for i in range(len(my_list)):
        my_list[i] += 10
```

```python
# Write your solution here

def row_correct(sudoku : list, row_no: int) -> bool: 
    for cell in sudoku[row_no]:
        if (sudoku[row_no].count(cell) != 1) and cell > 0: 
            return False
        
    return True

def column_correct(sudoku: list, column_no: int):
    numbers = []
    for row in sudoku:
        if row[column_no] > 0 and row[column_no] in numbers:
            return False
        numbers.append(row[column_no])
    
    return True


def block_correct(sudoku: list, row_no: int, column_no: int):

    list_A = []

    for row in sudoku[row_no: row_no + 3]:
        for cell in row[column_no: column_no + 3]: 
            if cell > 0 and cell in list_A:
                return False
            list_A.append(cell)
    
    return True

def sudoku_grid_correct(sudoku: list):
    for i in range(0, 8):
        if column_correct(sudoku, i)  == False:
            return False
        
        if row_correct(sudoku, i) == False:
            return False
    
    for i in range(0, 9, 3):
        for j in range(0, 9, 3):
            if block_correct(sudoku, i, j) == False:
                return False
            
    return True
```


# .join() 

`.join()` is a string method in Python which concatenates (or "joins") all the elements of an iterable (like a list or a tuple) into a string. The string on which this method is called is used as a separator between the elements.

Here's an example:

```python
separator = ', '
words = ['apple', 'banana', 'cherry']
result = separator.join(words)
```

In this example, `result` will be `'apple, banana, cherry'`. The `', '` string is used to join the words in the `words` list.

Let's look at a few more examples:

1. **Joining a list of strings with no separator**:

```python
"".join(["H", "e", "l", "l", "o"])
```

This will result in the string `'Hello'`.

2. **Joining a list of numbers**:

```python
", ".join([str(num) for num in [1, 2, 3, 4, 5]])
```

This will result in the string `'1, 2, 3, 4, 5'`. Note that we had to convert the numbers to strings first, because `.join()` only works on iterables of strings.

3. **Joining a tuple of strings with a separator**:

```python
" - ".join(("apple", "banana", "cherry"))
```

This will result in the string `'apple - banana - cherry'`.

Let's execute these examples in Python to see the results.
```
# Example 1: Joining a list of strings with no separator
result_1 = "".join(["H", "e", "l", "l", "o"])

# Example 2: Joining a list of numbers
result_2 = ", ".join([str(num) for num in [1, 2, 3, 4, 5]])

# Example 3: Joining a tuple of strings with a separator
result_3 = " - ".join(("apple", "banana", "cherry"))

result_1, result_2, result_3
```
```OUTPUT
('Hello', '1, 2, 3, 4, 5', 'apple - banana - cherry')

```

Here are the results from our examples:

1. Joining a list of strings with no separator: `'Hello'`
2. Joining a list of numbers: `'1, 2, 3, 4, 5'`
3. Joining a tuple of strings with a separator: `'apple - banana - cherry'`

As you can see, the `.join()` method is quite versatile and can be used in various scenarios to combine elements of an iterable into a single string.

# Shallow Copy Problem
```python
# Write your solution here
def print_sudoku(sudoku: list):
    for i, row in enumerate(sudoku):
        if i % 3 == 0 and i > 0:
            print()
        for j, cell in enumerate(row):
            if j % 3 == 0 and j > 0:
                print(" ", end="")
            if cell == 0: 
                print("_ ", end="")
            else: 
                print(f"{cell} ", end="")
        print()

def add_number(sudoku: list, row_no: int, column_no: int, number:int):
    sudoku[row_no][column_no] = number

def copy_and_add(sudoku: list, row_no: int, column_no: int, number: int):
    this_sudoku = sudoku[:]
    #add_number(this_sudoku, row_no, column_no, number)

    return this_sudoku



sudoku  = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]

grid_copy = copy_and_add(sudoku, 0, 0, 2)
print("Original:")
print_sudoku(sudoku)
print()
print("Copy:")
print_sudoku(grid_copy)
```

**The line `this_sudoku = sudoku[:]` is creating a shallow copy of the list `sudoku`, which means it creates a new list containing all of the elements in the old list. However, it's important to note that it's a "shallow" copy. This means that while the top-level list is duplicated, the inner lists (the rows in your Sudoku grid) are still the same lists. If you modify one of these inner lists, the change will be reflected in both `this_sudoku` and `sudoku`.**

Here is a small example that demonstrates this behavior:

```python
sudoku = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
this_sudoku = sudoku[:]

sudoku[0][0] = 10
print(this_sudoku)  # [[10, 2, 3], [4, 5, 6], [7, 8, 9]]
```

If you need a deep copy of the list, where changes to one list do not affect the other, you should use the `copy` module's `deepcopy` function:

```python
import copy

def copy_and_add(sudoku: list, row_no: int, column_no: int, number: int):
    this_sudoku = copy.deepcopy(sudoku)
    #add_number(this_sudoku, row_no, column_no, number)

    return this_sudoku
```

With `deepcopy`, changes to the inner lists in `sudoku` will not affect `this_sudoku`, and vice versa.

------------

## My Solution vs. Model Solution vs. deepcopy Solution
    # shallow copy of the rows, but the inner row lists remain referenced  
    # shallow copy of the inner row lists, but this double shallow copy effective creates the entire copy of the list of list
```python
def add_number(sudoku: list, row_no: int, column_no: int, number:int):
    sudoku[row_no][column_no] = number


def copy_and_add(sudoku: list, row_no: int, column_no: int, number: int):
    this_sudoku = sudoku[:]      
    for i, row in enumerate(sudoku):
            this_sudoku[i] = row[:]
    add_number(this_sudoku, row_no, column_no, number)
  
return this_sudoku
```


**The model solution of copy and add sidelines this issue by initializing a new list to begin with.  Then it adds the rows after. It's the same as what I did, but with more steps.** 
```python
def copy_and_add(sudoku: list, row_no: int, column_no: int, number:int):
    new_list = []
    for r in sudoku:
        new_list.append(r[:])
 
    new_list[row_no][column_no] = number
    return new_list
```

## List Comphrension Solution (Limits is only List of List)
```python
def copy_and_add(sudoku: list, row_no: int, column_no: int, number: int):
    this_sudoku = [list(row) for row in sudoku]  # Create a new list for each row
    add_number(this_sudoku, row_no, column_no, number)

    return this_sudoku
```

## More "Sophisticated" Solution
```python
import copy

def copy_and_add(sudoku: list, row_no: int, column_no: int, number: int):
    this_sudoku = copy.deepcopy(sudoku)
    #add_number(this_sudoku, row_no, column_no, number)

    return this_sudoku

```

```
if __name__ == "__main__":
    sudoku  = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    grid_copy = copy_and_add(sudoku, 0, 0, 2)
    print("Original:")
    print_sudoku(sudoku)
    print()
    print("Copy:")
    print_sudoku(grid_copy)
```

---

# Transposing Elements

```
The following matrix

1 2 3
4 5 6
7 8 9

transposed looks like this:

1 4 7
2 5 8
3 6 9

```

- #### Solution 1 (creating a temp matrix) -- inefficient 
	The initial code is my take on creating a deep copy of a matrix, or in this case a `list[list[int]]`. A temporary matrix is created and used as a temp variable. However, the problem specifies that the original list is modified. (So yes, while this solution works, it somewhat defeats the original goal." 
	
```python
def transpose(matrix: list):
    temp_list = matrix[:]            # copies row references
    for i, row in enumerate(matrix): # copies information from each row 
        temp_list[i] = row[:]

    for x in range(len(matrix)):
        for y in range(len(matrix)):
            matrix[y][x] = temp_list[x][y] 
```

#### Copying a matrix: `deepcopy()` vs. `list comphrension vs. manually

- **deepcopy** 
```Python
#import copy
def transpose(matrix: list):
	temp_list = copy.deepcopy(matrix) 
```

- list comphrension
```python
def transpose(matrix: list): 
	temp_list = [row[:] for row in matrix] 

""" manually, but too many lines 
def transpose(matrix: list):
    temp_list = matrix[:]            # copies row references
    for i, row in enumerate(matrix): # copies information from each row 
        temp_list[i] = row[:]
"""
```

#### Solution 2: Model Solution
```python
def transpose(matrix: list):
    n = len(matrix)
    for i in range(n):
        for j in range(i, n):
            temp = matrix[i][j]
            matrix[i][j] = matrix[j][i]
            matrix[j][i] = temp
```

#### Solution 3: Pythonic 
- Variables are assigned in order, and left hand side is evaluted first, creating a tuple, and then assignment is done in a single, atomic, operation. 
```python: 
def transpose(matrix: list):
    n = len(matrix)
    for i in range(n):
        for j in range(i, n):
			matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

```

---

# Side Effects

The following program has an unintended side effect:

```python
def second_smallest(my_list: list) -> int:
    # in an ordered list, the second smallest item is at index 1
    my_list.sort()
    return my_list[1]

numbers = [1, 4, 2, 5, 3, 6, 4, 7]
print(second_smallest(numbers))
print(numbers)
```

The since `my_list` is passed as a reference, calling `my_list.sort()` affects the original list. 

We can avoid the side effect by making a small change to the function:

```python
def second_smallest(my_list: list) -> int:
    list_copy = sorted(my_list)
    return list_copy[1]

numbers = [1, 4, 2, 5, 3, 6, 4, 7]
print(second_smallest(numbers))
print(numbers)
```

`sorted()` returns a list, whereas `sort()` alters the original list. 

Functions free of side effects are also called **pure functions**. Especially when adhering to a **functional programming style**, this is a common ideal to follow.

---

In a dictionary, items are indexed by `keys`, and each `key` maps to a `value`. 

```python
my_dictionary = {}          # creates empty dictionary

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

print(len(my_dictionary))
print(my_dictionary)
print(my_dictionary["apina"])
```

```
3
{'apina': 'monkey', 'banaani': 'banana', 'cembalo': 'harpsichord'}
monkey
```

#### Dictionary with User Input

```python
word = input("Please type in a word: ")
if word in my_dictionary:
    print("Translation: ", my_dictionary[word])
else:
    print("Word not found")
```

#### What can be stored in a dictionary?
- Looks to me like any data type. Here are a few examples

1. string -> int
```python
results = {}
results["Mary"] = 4
results["Alice"] = 5
results["Larry"] = 2
```

2. int -> `int[list]`
```python
lists = {}
lists[5] = [1, 2, 3]
lists[42] = [5, 4, 5, 4, 5]
lists[100] = [5, 2, 3]
```

#### Keys are unique 

If you use an existing key, the value mapped to that key is replaced with the new value. 

```python
my_dictionary["suuri"] = "big"
my_dictionary["suuri"] = "large"
print(my_dictionary["suuri"])
```

```
large
```


#### Keys must be immutable! 

This means that keys CANNOT be lists. 

```python
my_dictionary[[1, 2, 3]] = 5
```

```
TypeError: unhashable type: 'list'
```


#### Traversing a dictionary

Use `for item in collection` as we have been to traverse a dictionary.

```python
my_dictionary = {}

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

for key in my_dictionary:
    print("key:", key)
    print("value:", my_dictionary[key])
```

```
key: apina
value: monkey
key: banaani
value: banana
key: cembalo
value: harpsichord
```

A more pythonic way to achieve this is to use the `.items()` method. In this case, we're returning a view of an object that displays a list of dictionary key-value tupule pairs, which is unpacked into key and value. 
- This is more efficient and readable because unlike the `for item in collection`, we don't need to do a key lookup to access each value. 

```python
my_dictionary = {}

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

for key, value in my_dictionary.items():
    print("key:", key)
    print("value:", value)
```

```
key: apina
value: monkey
key: banaani
value: banana
key: cembalo
value: harpsichord
```

**As the keys are processed based on a hash value, the order should not usually matter in applications. In fact, in many older versions of Python the order is not guaranteed to follow the time of insertion.**


#### Some more advanced ways to use dictionaries

#### Count the number of times a word appears in a list
```python
def counts(my_list: list):
    this_dict = {} 

    for word in my_list:
        if word not in this_dict:     # if word (key) is not in dictionary, add it
            this_dict[word] = 0
        
        this_dict[word] += 1          # increment 
    
    return this_dict


word_list = [
  "banana", "milk", "beer", "cheese", "sourmilk", "juice", "sausage",
  "tomato", "cucumber", "butter", "margarine", "cheese", "sausage",
  "beer", "sourmilk", "sourmilk", "butter", "beer", "chocolate"
]

print(counts(word_list))
```

```
{'banana': 1, 'milk': 1, 'beer': 3, 'cheese': 2, 'sourmilk': 3, 'juice': 1, 'sausage': 2, 'tomato': 1, 'cucumber': 1, 'butter': 2, 'margarine': 1, 'chocolate': 1}
```

#### What if we wanted to categorize the words based on the initial letter in each word? One way to accomplish this would be to use dictionaries:

```python
def categorize_by_initial(my_list: list):
    this_dict = {} 

    for word in my_list: 
        initial = word[0]

        if initial not in this_dict:
            this_dict[initial] = []

        this_dict[initial].append(word)

    
    return this_dict



word_list = [
  "banana", "milk", "beer", "cheese", "sourmilk", "juice", "sausage",
  "tomato", "cucumber", "butter", "margarine", "cheese", "sausage",
  "beer", "sourmilk", "sourmilk", "butter", "beer", "chocolate"
]

#print(counts(word_list))

groups = categorize_by_initial(word_list)

for key, value in groups.items():
    print(f"words beginning with {key}:")
    
    for word in value:             # value here is a list 
        print(word)
```

```
words beginning with b:
banana
beer
butter
beer
butter
beer
words beginning with m:
milk
margarine
words beginning with c:
cheese
cucumber
cheese
chocolate
words beginning with s:
sourmilk
sausage
sausage
sourmilk
sourmilk
words beginning with j:
juice
words beginning with t:
tomato
```

#### Phone Book that can store multiple numbers for one name

```python
# Write your solution here
def search(my_dict : dict):
    name = input("name: ")
    if name in my_dict: 
        for item in my_dict[name]:  # prints out all values in a given key
            print(item)
    else:
        print("no number")    

def add(my_dict : dict): 
        name = input("name: ")
        number = input("number: ")
        # accomodate multiple numbers by storing list values 
        if name not in my_dict:
            my_dict[name] = []
    
        my_dict[name].append(number)
        print("ok!")

def main():
    my_dict = {}

    while True: 
        val = int(input("command (1 search, 2 add, 3 quit): "))
        if val == 1: 
            search(my_dict)
        elif val == 2: 
            add(my_dict)
        elif val == 3: 
            break

    print("quitting...")

main()
```


#### Removing keys and values from a dictionary (Two Methods)

1. **Method One** : `del`

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
del staff["David"]
print(staff)
```

```
{'Alan': 'lecturer', 'Emily': 'professor'}
```

If you try and use `del` on a key that does not exisit in the dictionary, 

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
del staff["Paul"]
```

```
>>> del staff["Paul"]
Traceback (most recent call last):
  File "", line 1, in 
KeyError: 'Paul'
```

**So, before deleting a key you should check if it is present in the dictionary:**

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
if "Paul" in staff:
  del staff["Paul"]
  print("Deleted")
else:
  print("This person is not a staff member")
```

2. **Method Two:**  `pop()`
	Unlike `del`, `pop` returns the value removed from dictionary 

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
deleted = staff.pop("David")
print(staff)
print(deleted, "deleted")
```

```
{'Alan': 'lecturer', 'Emily': 'professor'}
lecturer deleted
```

By default, pop will also cause an error if you try to delete a key which is not present in the dictionary. It is possible to avoid this by giving the method a second argument, which contains a default return value. This value is returned in case the key is not found in the dictionary. The special Python value `None` will work here:

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
deleted = staff.pop("Paul", None)
if deleted == None:         ### return value is None == None
  print("This person is not a staff member")
else:
  print(deleted, "deleted")
```

```
This person is not a staff member
```

##### NB: if you need to delete the contents of the entire dictionary, and try to do it with a for loop, like so

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
for key in staff:
  del staff[key]
```

```
RuntimeError: dictionary changed size during iteration
```

**Why?**
When you iterate over a dictionary, Python creates an iterator that expects the dictionary to stay the same size. If you modify the dictionary's size (by adding or removing items), Python loses track of the size and raises an error.
	**When traversing a collection with a for loop, the contents may not change while the loop is in progress.**
	
Instead, use **`clear()`** 

```
staff.clear()
```

#### Invert a Dictionary 

So my original approach was as follows:

```python
    for key, value in dictionary.items():
        del dictionary[key]
        dictionary[value] = key
```

The above did not work because I was deleting (therefore, changing size) of the dictionary, while I used the iterator of the same structure I was deleting. 

To avoid this, the model code made a copy first. So the iterator is of the copy, which means we can freely change the dictionary. Recall that dictionaries, like lists, are referenced. 

```python
def invert(dictionary: dict):
	copy = {}
	for key in dictionary:        # copies the same dictionary 
		copy[key] = dictionary[key]
	for key in copy:              # iterator is copy, while delete key 
		del dictionary[key]
	for key in copy:              # invert key-value pair  
		dictionary[copy[key]] = key
```

My original approach: 
- I just stored both keys and values in seperate lists, and then deleted the dictionary using `clear()`
```python
def invert(dictionary: dict):
    list_key = []
    list_value = []
    for key, value in dictionary.items():
        list_key.append(key)
        list_value.append(value)

    dictionary.clear()

    for key, value in zip(list_key, list_value):
        dictionary[value] = key
```


# Movie Database - Structured Data 

The advantage of a dictionary is that it is a collection. It collects related data under one variable, so it is easy to access the different components. This same advantage is offered by a list. However, as a programmer, the index `[1], [2], etc` do not tell us anything about what is stored. When using a dictionary this problem is avoided, as each bit of data is accessed through a named key.

```python
person1 = {"name": "Pippa Python", "height": 154, "weight": 61, "age": 44}
person2 = {"name": "Peter Pythons", "height": 174, "weight": 103, "age": 31}
person3 = {"name": "Pedro Python", "height": 191, "weight": 71, "age": 14}

people = [person1, person2, person3]

for person in people:
    print(person["name"])

combined_height = 0
for person in people:
    combined_height += person["height"]

print("The average height is", combined_height / len(people))
```

```python
def add_movie(database: list, name: str, director: str, year: int, runtime: int):
    # a list of dictonaries? 
    movie = {
        "name": name, 
        "director": director, 
        "year": year, 
        "runtime": runtime
        }
    database.append(movie)

movie_database = []
```

### Search for a movie title, case-insensitive (since `in` is case-sensitive)
```python
# Write your solution here
def find_movies(database: list, search_term: str):
    movie_list = []
    for movie in database: # for each object 
        if search_term.lower() in movie["name"].lower():    # search for the specific term in this dictionary object...?
            movie_list.append(movie)
    return movie_list

if __name__ == "__main__":

    database = [{"name": "Gone with the Python", "director": "Victor Pything", "year": 2017, "runtime": 116},
    {"name": "Pythons on a Plane", "director": "Renny Pytholin", "year": 2001, "runtime": 94},
    {"name": "Dawn of the Dead Programmers", "director": "M. Night Python", "year": 2011, "runtime": 101}]

    my_movies = find_movies(database, "python")
    print(my_movies)
```

Tuple is a data structure which is, in many ways, similar to a list. The most important differences between the two are:

- Tuples are enclosed in parentheses (), while lists are enclosed in square brackets [].
- Tuples are immutable, while the contents of a list may change.

The following bit of code creates a tuple containing the coordinates of a point:

```python
point = (10, 20)
```

The items stored in a tuple are accessed by index, just like the items stored in a list:

```python
point = (10, 20)
print("x coordinate:", point[0])
print("y coordinate:", point[1])
```

Sample output:

```
x coordinate: 10
y coordinate: 20
```

The values stored in a tuple cannot be changed after the tuple has been defined. The following will not work:

```python
point = (10, 20)
point[0] = 15
```

Sample output:

```
TypeError: 'tuple' object does not support item assignment
```

#### Programming exercise: The oldest person

```python

#### Points:
#### 1
#### / 
#### 1

#### Problem:
Please write a function named `oldest_person(people: list)`, which takes a list of tuples as its argument.
In each tuple, the first element is the name of a person, and the second element is their year of birth.
The function should find the oldest person on the list and return their name.

An example of the function in action:

```python
p1 = ("Adam", 1977)
p2 = ("Ellen", 1985)
p3 = ("Mary", 1953)
p4 = ("Ernest", 1997)
people = [p1, p2, p3, p4]

print(oldest_person(people))
```

#### Solution:
```python
def oldest_person(people: list):
    oldest = people[0]  # stores the first tuple 

    for person in people: 
        if person[1] < oldest[1]: 
            oldest = person 
        
    return oldest[0]


if __name__ == "__main__":
    p1 = ("Adam", 1977)
    p2 = ("Ellen", 1985)
    p3 = ("Mary", 1953)
    p4 = ("Ernest", 1997)
    people = [p1, p2, p3, p4]

    print(oldest_person(people))
```

The problem requires you to write a function named `oldest_person` that takes a list of tuples as its argument. Each tuple contains the name of a person as the first element and their year of birth as the second element. The function should find the oldest person in the list and return their name.

In the provided example, four tuples representing people's names and birth years are created: `p1`, `p2`, `p3`, and `p4`. These tuples are then added to the `people` list. The `oldest_person` function is called with the `people` list as the argument, and the result is printed.

The `oldest_person` function starts by initializing the `oldest` variable with the first tuple from the `people` list. It then iterates over each tuple in the `people` list and compares the birth year of each person with the birth year of the oldest person found so far. If a person has a lower birth year, the `oldest` variable is updated with that person's tuple.

Finally, the function returns the name of the oldest person (`oldest[0]`).


# Purpose of a Tuple

Tuples serve a specific purpose in Python programming. They are particularly useful when dealing with a fixed set of values that are somehow related. For instance, when working with coordinates like x and y, tuples are a natural choice because coordinates always consist of two values.

## Example:
```python
point = (10, 20)
```

While it is technically possible to use a list to store coordinates, it is not ideal. Lists are collections of consecutive items that can change in size. When storing coordinates, it is preferable to have a specific structure that represents the x and y values directly, rather than an arbitrary list.

An important characteristic of tuples is that they are immutable, unlike lists. This immutability allows tuples to be used as keys in dictionaries. Consider the following example, where a dictionary is created with coordinate points as keys:

```python
points = {}
points[(3, 5)] = "monkey"
points[(5, 0)] = "banana"
points[(1, 2)] = "harpsichord"
print(points[(3, 5)])
```

Output:
```
monkey
```

If we attempt to use lists instead of tuples as keys in the dictionary, it would result in an error:

```python
points = {}
points[[3, 5]] = "monkey"  # This line would cause an error
points[[5, 0]] = "banana"  # This line would cause an error
points[[1, 2]] = "harpsichord"  # This line would cause an error
print(points[[3, 5]])  # This line would cause an error
```

Output:
```
TypeError: unhashable type: 'list'
```

This error occurs because lists are mutable objects, and mutable objects cannot be used as dictionary keys. Tuples, being immutable, can be hashed and used as keys effectively.

In summary, tuples are beneficial for representing fixed sets of related values and can be used as keys in dictionaries due to their immutability.


## Tuples without parentheses

The parentheses are not strictly necessary when defining tuples. The following two variable assignments are identical in their results:

```python
numbers = (1, 2, 3)
numbers = 1, 2, 3
```

This means we can also easily return multiple values using tuples. Let's have a look at the following example:

```python
def minmax(my_list):
  return min(my_list), max(my_list)

my_list = [33, 5, 21, 7, 88, 312, 5]

min_value, max_value = minmax(my_list)
print(f"The smallest item is {min_value} and the greatest item is {max_value}")
```

**Sample output:**
The smallest item is 5 and the greatest item is 312

This function returns two values in a tuple. The return value is assigned to two variables at once:

```python
min_value, max_value = minmax(my_list)
```

Using parentheses may make the notation more clear. On the left-hand side of the assignment statement, we also have a tuple, which contains two variable names. The values contained within the tuple returned by the function are assigned to these two variables.

```python
(min_value, max_value) = minmax(my_list)
```

You may remember the dictionary method `items` in the previous section. We used it to access all the keys and values stored in a dictionary:

```python
my_dictionary = {}

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

for key, value in my_dictionary.items():
    print("key:", key)
    print("value:", value)
```

Tuples are at work here, too. The method `my_dictionary.items()` returns each key-value pair as a tuple, where the first item is the key and the second item is the value.

Another common use case for tuples is swapping the values of two variables:

```python
number1, number2 = number2, number1
```

The assignment statement above swaps the values stored in the variables `number1` and `number2`. The result is identical to what is achieved with the following bit of code, using a helper variable:

```python
helper_var = number1
number1 = number2
number2 = helper_var
	```

```python
# Write your solution here
def print_student(students: dict, name: str):
    if name not in students: 
        print(f"{name}: no such person in the database")
    elif name in students:
        if students[name] == []: 
            print(f"{name}:")
            print(" no completed courses")
        else: 
            print(f"{name}:")
            print(f" {len(students[name])} completed courses:")
            for courses in students[name]:
                print(f"  {courses[0]} {courses[1]}")

            # average grade
            sum = 0
            for courses in students[name]:
                sum += courses[1]
            print(f" average grade {sum / len(students[name])}")

def add_student(students: dict, name: str ):
    if name not in students:
        students[name] = []

def add_course(students: dict, name: str, course_grade: tuple):
    if name not in students: 
        print(f"{name}: no such person in the database")
        return 
    
    # zero grade, don't add
    if course_grade[1] == 0: 
        return
    
    # checks for existing classes, and if grade is higher 
    for i, course in enumerate(students[name]): 
        if course_grade[0] == course[0]: 
            # grade should never be lowered
            if course_grade[1] > course[1]: 
                students[name][i] = course_grade
            return 
    
    # appends if first time 
    students[name].append(course_grade)



def summary(students: dict):
    #student number 
    print(f"students {len(students)}")

    max = 0
    name_max = "" 
    for person in students: # this alone prints out the key only 
        if len(students[person]) > max:
            max = len(students[person])
            name_max = person
    print(f"most courses completed {max} {name_max}")


    # average grade
    highest_average = 0
    highest_average_person = ""


    for person in students:
        sum = 0
        for courses in students[person]:
            sum += courses[1]
            average_grade =  sum / len(students[person])

        if average_grade > highest_average:
            highest_average = average_grade
            highest_average_person = person 
    print(f"best average grade {highest_average} {highest_average_person}")

    

if __name__ == "__main__":
    students = {}
    add_student(students, "Peter")
    add_student(students, "Eliza")
    add_course(students, "Peter", ("Data Structures and Algorithms", 1))
    add_course(students, "Peter", ("Introduction to Programming", 1))
    add_course(students, "Peter", ("Advanced Course in Programming", 1))
    add_course(students, "Eliza", ("Introduction to Programming", 5))
    add_course(students, "Eliza", ("Introduction to Computer Science", 4))
    summary(students)


```

# Working with Text Files in Python

## Overview
- Python programming often involves reading and writing data to files.
- This provides a simple and effective way to handle large datasets.
- In this guide, we focus only on text files, which contain lines of text. 

## Text Files vs Word Processor Documents
- **Text Files**: Simple to handle; used with programs like Visual Studio Code.
- **Word Documents**: Contain text but aren't text files. Includes formatting info; complex to handle programmatically.

## Reading from Text Files
- Example file used: `example.txt`, with content:
    ```
    Hello there!
    This example file contains three lines of text.
    This is the last line.
    ```

## Including Files in Python 
- Python's `with` statement is used to include and handle files.
- It opens the file, allows operations within its block, then automatically closes it.

## Example Code
```python
with open("example.txt") as new_file:
    contents = new_file.read()
    print(contents)
```
- **Output**: 
    ```
    Hello there!
    This example file contains three lines of text.
    This is the last line.
    ```

## File Handle and `read` Method
- `new_file` is a file handle that allows access to the file.
- `read` method returns file contents as a single string.
- String returned by `read`: `"Hello there!\nThis example file contains three lines of text.\nThis is the last line."`

# Processing Text Files Line-by-Line in Python

## `read` Method vs Line-by-Line Iteration
- `read` method: prints entire file content.
- Line-by-line iteration: more common and flexible, treats file as list of strings (lines).

## Iterating Through Lines with a `for` Loop
- Each string represents a single line in the file.
- Use a `for` loop to traverse the file.

## Code Example: Counting and Printing Lines
```python
with open("example.txt") as new_file:
    count = 0
    total_length = 0

    for line in new_file:
        line = line.replace("\n", "")
        count += 1
        print("Line", count, line)
        length = len(line)
        total_length += length

print("Total length of lines:", total_length)
```
- **Output**:
    ```
    Line 1 Hello there!
    Line 2 This example file contains three lines of text.
    Line 3 This is the last line.
    Total length of lines: 81
    ```

## Understanding the Code
- Line breaks (`\n`) are removed from each line with the `replace` method.
- `replace` method: Replaces line break characters with an empty string, thereby allowing accurate calculation of line lengths.
- The `for` loop counts the lines, prints each line with its line number, and sums the lengths of all lines.

## Key Takeaway
- **`replace` Method**: Used for manipulating strings; very useful for cleaning data in files.


# Working with CSV Files in Python

## CSV File Basics
- CSV: Comma-separated values.
	- A type of text file with data separated by a predetermined character, usually a comma (,) or semicolon (;).
- Used for storing different kinds of records; easy data exchange between systems.

## Python `split` Method
- Splits a string into a list of substrings based on a separator character.
- Used to separate different fields on a line.

## Code Example: Processing CSV Data
- Assume `grades.csv` file contains student names and their grades, separated by semicolons.

```python
with open("grades.csv") as new_file:
    for line in new_file:
        line = line.replace("\n", "")
        parts = line.split(";")
        name = parts[0]
        grades = parts[1:]
        print("Name:", name)
        print("Grades:", grades)
```
- **Output**:
    ```
    Name: Paul
    Grades: ['5', '4', '5', '3', '4', '5', '5', '4', '2', '4']
    Name: Beth
    Grades: ['3', '4', '2', '4', '4', '2', '3', '1', '3', '3']
    Name: Ruth
    Grades: ['4', '5', '5', '4', '5', '5', '4', '5', '4', '4']
    ```

## Understanding the Code
- For each line, remove the line break (`\n`) and split the line into parts at each semicolon using `split`.
- The first part is the student's name, the rest are the grades.

## Key Takeaway
- **`split` Method**: Powerful tool for parsing and processing structured data in files, such as CSVs.

# Reading a File Multiple Times in Python

## Problem Statement
- Need to process contents of a file more than once in a single program.
- Attempting to read a file twice leads to an error because after the first read, the file handle rests at the end of the file and data in the file can't be accessed again.

## Incorrect Code
- Tries to read the file twice, leading to an error.
```python
with open("people.csv") as new_file:
    # Print out the names
    for line in new_file:
        parts = line.split(";")
        print("Name:", parts[0])

    # Find the oldest
    age_of_oldest = -1
    for line in new_file:
        parts = line.split(";")
        name = parts[0]
        age = int(parts[1])
        if age > age_of_oldest:
            age_of_oldest = age
            oldest = name
    print("The oldest is", oldest)
```
- Error encountered: `UnboundLocalError: local variable 'oldest' referenced before assignment`

## Inefficient Solution
- Open and read the file twice.
```python
with open("people.csv") as new_file:
    # Print out the names
    for line in new_file:
        parts = line.split(";")
        print("Name:", parts[0])

with open("people.csv") as new_file:
    # Find the oldest
    age_of_oldest = -1
    for line in new_file:
        parts = line.split(";")
        name = parts[0]
        age = int(parts[1])
        if age > age_of_oldest:
            age_of_oldest = age
            oldest = name
    print("The oldest is", oldest)
```
- Cons: Unnecessary repetition, inefficiency as the file is read twice.

## Efficient Solution
- Read the file once, store its contents in a suitable data structure for future use.
```python
people = []
with open("people.csv") as new_file:
    for line in new_file:
        parts = line.split(";")
        people.append((parts[0], int(parts[1]), parts[2]))

# Print out the names
for person in people:
    print("Name:", person[0])

# Find the oldest
age_of_oldest = -1
for person in people:
    name = person[0]
    age = person[1]
    if age > age_of_oldest:
        age_of_oldest = age
        oldest = name
print("The oldest is", oldest)
```
- Pros: More efficient, as the file is only read once. Contents are stored in a list for further processing.

## Key Takeaway
- **File Reading Strategy**: Avoid reading the same file multiple times, instead store contents in memory for efficient processing.


# Processing CSV Files in Python

## Context
- Working with file `grades.csv`, which contains student names and their grades.
- Aim: Create a dictionary `grades` where keys are student names and values are lists of grades.

## Reading and Storing Data
```python
grades = {}
with open("grades.csv") as new_file:
    for line in new_file:
        line = line.replace("\n", "")
        parts = line.split(";")
        name = parts[0]
        grades[name] = []
        for grade in parts[1:]:
            grades[name].append(int(grade))
```
- **Output**: `{'Paul': [5, 4, 5, 3, 4, 5, 5, 4, 2, 4], 'Beth': [3, 4, 2, 4, 4, 2, 3, 1, 3, 3], 'Ruth': [4, 5, 5, 4, 5, 5, 4, 5, 4, 4]}`

## Compute and Display Statistics
- Compute best grade and average grade for each student.
```python
for name, grade_list in grades.items():
    best = max(grade_list)
    average = sum(grade_list) / len(grade_list)
    print(f"{name}: best grade {best}, average {average:.2f}")
```
- **Output**:
    - `Paul: best grade 5, average 4.10`
    - `Beth: best grade 4, average 2.90`
    - `Ruth: best grade 5, average 4.50`

## Key Concepts
- **Dictionary in Python**: Powerful data structure for storing key-value pairs. In this case, used for mapping student names to their grades.
- **File Processing**: Used the `with open` statement to read the CSV file line by line, then split each line into parts and stored them in the dictionary.
- **Statistics Calculation**: Computed the maximum (best grade) and average grade for each student using built-in Python functions `max()` and `sum()`.

## Note
This technique is applicable for processing many different types of data contained in files, not just for grade lists.


# CSV File Processing in Python with Whitespace Handling

## Context
- A CSV file `people.csv` with unnecessary white spaces and line breaks exported from Excel.
- Each line contains a first and last name separated by a semicolon, and extra spaces.

### Before Cleanup
When we read from the CSV file and print the names without using any strip functions, we see extra spaces and line breaks in the output.

```python
last_names = []
with open("people.csv") as new_file:
    for line in new_file:
        parts = line.split(';')
        if parts[0] == "first":
            continue # this was the header line, so it is ignored
        last_names.append(parts[1])
print(last_names)
```

Sample output:
```python
[' Python\n', ' Java\n', ' Haskell']
```

## Reading and Storing Data (After Cleanup) 
```python
last_names = []
with open("people.csv") as new_file:
    for line in new_file:
        parts = line.split(';')
        if parts[0] == "first":
            continue # this was the header line, so it is ignored
        last_names.append(parts[1].strip())
```
- **Output**: `['Python', 'Java', 'Haskell']`

## Key Concepts
- **Whitespace Removal**: Utilizing the `strip()` method to remove unnecessary white spaces from beginning and end of a string. In the example above, the strip method is used to remove the leading and trailing white spaces from the last names.

## Other Whitespace Handling Techniques
- `lstrip()`: Removes leading white spaces (from the left).
- `rstrip()`: Removes trailing white spaces (from the right).

## Demonstration:
```python
>>> " teststring  ".rstrip()
' teststring'
>>> " teststring  ".lstrip()
'teststring  '
```
## Note
`strip()`, `lstrip()`, and `rstrip()` are powerful string methods that can be particularly useful when cleaning up data in Python. Their usage can be extended beyond the given example to handle data from various sources which might not always be cleanly formatted.


# Combining Data from Different Files in Python

In many scenarios, the data required for processing by a program could be scattered across multiple files. Here's an example that illustrates how you can connect data from multiple CSV files using a common identifier.

## Context
- A company's personal details of employees are stored in a file `employees.csv`.
- The employee's salaries are stored in another file `salaries.csv`.
- Each data line in both files contains a Personal Identity Code (PIC) that can be used as a common identifier.

## Sample Data
**employees.csv**
```
pic;name;address;city
080488-123X;Pekka Mikkola;Vilppulantie 7;00700 Helsinki
290274-044S;Liisa Marttinen;Mannerheimintie 100 A 10;00100 Helsinki
010479-007Z;Arto Vihavainen;Pihapolku 4;01010 Kerava
010499-345K;Leevi Hellas;Tapiolantie 11 B;02000 Espoo
```
**salaries.csv**
```
pic;salary;bonus
080488-123X;3300;0
290274-044S;4150;200
010479-007Z;1300;1200
```
## Code
```python
names = {}
with open("employees.csv") as new_file:
    for line in new_file:
        parts = line.split(';')
        if parts[0] == "pic":
            continue
        names[parts[0]] = parts[1]

salaries = {}
with open("salaries.csv") as new_file:
    for line in new_file:
        parts = line.split(';')
        if parts[0] == "pic":
            continue
        salaries[parts[0]] = int(parts[1]) +int(parts[2])

print("incomes:")
for pic, name in names.items():
    if pic in salaries:
        salary = salaries[pic]
        print(f"{name:16} {salary} euros")
    else:
        print(f"{name:16} 0 euros")
```
```
"""First the program produces the dictionaries **names** and salaries. They have the following contents:

{ # names
    '080488-123X': 'Pekka Mikkola',
    '290274-044S': 'Liisa Marttinen',
    '010479-007Z': 'Arto Vihavainen',
    '010499-345K': 'Leevi Hellas'
}

{ # salaries
    '080488-123X': 3300,
    '290274-044S': 4350,
    '010479-007Z': 2500
}
```
### Output
```
incomes:
Pekka Mikkola    3300 euros
Liisa Marttinen  4350 euros
Arto Vihavainen  2500 euros
Leevi Hellas     0 euros
```
## Key Concepts
- **Dictionaries**: The program uses two dictionaries `names` and `salaries` which use the Personal Identity Code (PIC) as the key. 
- **Data Linking**: The PIC is used as a common identifier to link the employee's name from `employees.csv` to their corresponding salary in `salaries.csv`.

## Note
- The program also handles cases where an employee's PIC is not present in the salary file, it prints 0 euros as the salary for those employees.
- The order of storing items in a dictionary doesn't matter as keys are processed based on hash values.
```python
# 

inpt = int(input("Layers: "))
alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

num_char = inpt * 2 - 1
my_string = alphabet[inpt - 1] * num_char

splice_index_start = 0
splice_index_end = num_char

in_char_counter = num_char - 2

my_list = []
my_list.append(my_string)
print(my_string)
for i in range(1, inpt): 
    holder_string_start = my_string[:i]
    holder_string_end = my_string[num_char - i:]
    my_string = holder_string_start + (alphabet[inpt - i - 1] * in_char_counter) + holder_string_end
    my_list.append(my_string)
    in_char_counter -= 2
    print(my_string)

for line in my_list[::-1][1:]: # reverse, then skip first line
    print(line)

```

```python
# write your solution here

if True:
    # this is never executed
    student_info = input("Student information: ")
    exercise_data = input("Exercises completed: ")
else:
    # hard-coded input
    student_info = r"C:\Users\Wilson\AppData\Local\tmc\vscode\mooc-programming-22\part06-04_course_grading_part_1\src\students1.csv"
    exercise_data = r"C:\Users\Wilson\AppData\Local\tmc\vscode\mooc-programming-22\part06-04_course_grading_part_1\src\exercises1.csv"



students = {} 

with open(student_info) as new_file:
    for line in new_file:
        parts = line.split(';')
        if parts[0] == "id":
            continue
        # id, first, last
        students[parts[0]] = (parts[1] + " " +  parts[2]).strip() 

exercises = {}

with open(exercise_data) as new_file:
    for line in new_file:
        parts = line.split(';')
        if parts[0] == "id":
            continue

        #id, exercise1 ... exercise7
        exercises[parts[0]] = parts[1:]  # returns a single string because [] is used for strings... 

sums = {} 

for key in exercises:
    #earlier [1:] implementation resulted in a string 
    grades = exercises[key] 
    grades = [int(grade) for grade in grades] # converts all string to int
    sums[key] = sum(grades)

#print(sums)

for pic, first_last in students.items():
    if pic in sums: 
        sum_grade = sums[pic]
        print(f"{first_last} {sum_grade}")

"""
there were some implementation issues with mine, such as using the string[:] functionality 
which caused issues down the road. important to know what they return. should look deeper. 
"""


"""model solution
student_data = input("Student information: ")
exercise_data = input("Exercises completed: ")
 
students = {}
with open(student_data) as file:
    for row in file:
        parts = row.split(";")
        if parts[0] == "id":
            continue
        students[parts[0]] = f"{parts[1]} {parts[2].strip()}"
 
exercises = {}
with open(exercise_data) as file:
    for row in file:
        parts = row.split(";")
        if parts[0] == "id":
            continue
        esum = 0
        for i in range(1, 8):
            esum += int(parts[i])
        exercises[parts[0]] = esum
 
for student_id, name in students.items():
    print(f"{name} {exercises[student_id]}")
"""
```


## my condensed revised ver. 

```python
exercises = {}
with open(exercise_data) as new_file:
    for line in new_file:
        parts = line.split(';')
        if parts[0] == "id":
            continue

        lst = [int(part) for part in parts[1:]] 
        #id, exercise1 ... exercise7
        exercises[parts[0]] = sum(lst)  # returns a single string because [] is used for strings... 

```

```python
def grade(points):
    boundary = [0, 15, 18, 21, 24, 28]   # fixed: small logic error, adjusted to fit the lower bounds 
    for i in range(5, -1, -1):
        if points >= boundary[i]:
            return i
```

```python
# write your solution here
student_info  = input("Student information: ")
exercise_data = input("Exercises completed: ")
exam_data     = input("Exam points: ")

students = {} 
with open(student_info) as new_file:
    for line in new_file:
        parts = line.split(';')
        if parts[0] == "id":
            continue
        # id, first, last
        students[parts[0]] = (parts[1] + " " +  parts[2]).strip() 

exercises = {}
with open(exercise_data) as new_file:
    for line in new_file:
        parts = line.split(';')
        if parts[0] == "id":
            continue

        lst = [int(part) for part in parts[1:]] 
        #id, exercise1 ... exercise7
        exercises[parts[0]] = sum(lst)  # returns a single string because [] is used for strings... 


exams = {}
with open(exam_data) as new_file:
    for line in new_file:
        parts = line.split(';')
        if parts[0] == "id":
            continue
        
        # creates an integer list for each individual char in string parts[1:]
        lst = [int(part) for part in parts[1:]] 
        exams[parts[0]] = sum(lst)

def grade(points):
    boundary = [0, 15, 18, 21, 24, 28]   # fixed: small logic error, adjusted to fit the lower bounds 
    for i in range(5, -1, -1):
        if points >= boundary[i]:
            return i

grade_dict = {} 

print(f'{"name":30}{"exec_nbr":10}{"exec_pts.":10}{"exm_pts.":10}{"tot_pts.":10}{"grade":10}') # string are left aligned 

for pic, first_last in students.items(): 
    if pic in exercises and pic in exams:
        #assuming total exercises is 40, and percentage of that rounded down 
        adjusted_exercise_points = int((exercises[pic] / 40) * 10)
        total_grade = exams[pic] + adjusted_exercise_points
        grade_dict[pic] = total_grade
        #print(f"{first_last} {grade(total_grade)}")
        print(f'{first_last:30}{exercises[pic]:<10}{adjusted_exercise_points:<10}{exams[pic]:<10}{total_grade:<10}{grade(total_grade):<10}') # string are left aligned 

    
```

```python
my_input = input()
input_list = my_input.split(' ')

lst = [] 
with open("wordlist.txt") as new_file:
    for line in new_file:
        lst.append(line.strip())


new_sentence = ""
for i in range(0, len(input_list)):
    if input_list[i].lower() in lst:
        new_sentence += f"{input_list[i]} " 
    else: 
        new_sentence += f"*{input_list[i]}* "


print(new_sentence)


"""model solution
I like the pythonic 

"for word in sentence.split(' '):" since split will return a list of words that is iterable 
"""```


```python
my_input = input()
input_list = my_input.split(' ')

lst = [] 
with open("wordlist.txt") as new_file:
    for line in new_file:
        lst.append(line.strip())


new_sentence = ""
for i in range(0, len(input_list)):
    if input_list[i].lower() in lst:
        new_sentence += f"{input_list[i]} " 
    else: 
        new_sentence += f"*{input_list[i]}* "


print(new_sentence)


"""model solution
I like the pythonic 

"for word in sentence.split(' '):" since split will return a list of words that is iterable 
"""```


```
Write some functions for working on a file containing location data from the stations for city bikes in Helsinki.

Each file will follow this format:

Longitude;Latitude;FID;name;total_slot;operative;id
24.950292890004903;60.155444793742276;1;Kaivopuisto;30;Yes;001
24.956347471358754;60.160959093887129;2;Laivasillankatu;12;Yes;002
24.944927399779715;60.158189199971673;3;Kapteeninpuistikko;16;Yes;003
Each station has a single line in the file. The line contains the coordinates, name, and other identifying information for the station.

Distance between stations
First, write a function named get_station_data(filename: str). This function should read the names and locations of all the stations in the file, and return them in a dictionary with the following format:

Sample output
{
  "Kaivopuisto: (24.950292890004903, 60.155444793742276),
  "Laivasillankatu: (24.956347471358754, 60.160959093887129),
  "Kapteeninpuistikko: (24.944927399779715, 60.158189199971673)
}
Dictionary keys are the names of the stations, and the value attached is a tuple containing the location coordinates of the station. The first element in the tuple is the Longitude field, and the second is the Latitude field.

Next, write a function named distance(stations: dict, station1: str, station2: str), which returns the distance between the two stations given as arguments.

The distance is calculated using the Pythagorean theorem. The multiplication factors below are approximate values for converting latitudes and longitudes to distances in kilometres in the Helsinki region.

# we will need the function sqrt from the math module 
import math

x_km = (longitude1 - longitude2) * 55.26
y_km = (latitude1 - latitude2) * 111.2
distance_km = math.sqrt(x_km**2 + y_km**2)
Some examples of the function in action:

stations = get_station_data('stations1.csv')
d = distance(stations, "Designmuseo", "Hietalahdentori")
print(d)
d = distance(stations, "Viiskulma", "Kaivopuisto")
print(d)
Sample output
0.9032737292463177
0.7753594392019532

NB: If Visual Studio can't find the file and you have checked that there are no spelling errors, take a look at these instructions.

The greatest distance
Please write a function named greatest_distance(stations: dict), which works out the two stations on the list with the greatest distance from each other. The function should return a tuple, where the first two elements are the names of the two stations, and the third element is the distance between the two.

stations = get_station_data('stations1.csv')
station1, station2, greatest = greatest_distance(stations)
print(station1, station2, greatest)
```

```python
import math 

def get_station_data(filename: str):
    this_dct = {}

    with open(filename) as new_file:
        for line in new_file:
            parts = line.split(';')

            if parts[0] == "Longitude": 
                continue

            this_dct[parts[3]] = (float(parts[0]), float(parts[1])) 
    
    return this_dct

def distance(stations: dict, station1: str, station2: str): 
    #print("stations[station1][0]", stations[station1][0])
    #print("stations[station1][1]", (stations[station1][1]))

    x_km = ((stations[station1][0]) - (stations[station2][0])) * 55.26
    y_km = ((stations[station1][1]) - (stations[station2][1])) * 111.2

    distance_km = math.sqrt(x_km**2 + y_km**2)

    return distance_km


def greatest_distance(stations: dict) -> tuple: 
    this_dct = {} 
    max_dist = 0.0
    for stationOne in stations:
        for stationTwo in stations: 
            dist = distance(stations, stationOne, stationTwo)
            if dist > max_dist:
                max_dist = dist
                this_dct[max_dist] = (stationOne, stationTwo)

    return (this_dct[max_dist][0], this_dct[max_dist][1], max_dist)



    

if __name__ == "__main__":

    stations = get_station_data(r"C:\Users\Wilson\AppData\Local\tmc\vscode\mooc-programming-22\part06-09_city_bikes\src\stations1.csv")
    station1, station2, greatest = greatest_distance(stations)
    print(station1, station2, greatest)

```

```
program which allows the user to search for recipes based on their names, preparation times, or ingredients used. The program should read the recipes from a file submitted by the user.

Each recipe consists of three or more lines. The first line has the name of the recipe, the second line contains an integer number representing the preparation time in minutes, and the remaining line or lines contain the ingredients used, one on each line. The recipe ends with an empty line, with the exception of the final recipe in the file which just ends with the end of the file. So, there can be more than one recipe in a single file, like in the example below.

Pancakes
15
milk
eggs
flour
sugar
salt
butter

Meatballs
45
mince
eggs
breadcrumbs

Tofu rolls
30
tofu
rice
water
carrot
cucumber
avocado
wasabi

Cake pops
60
milk
bicarbonate
eggs
salt
sugar
cardamom
butter
Hint: it might be best to first read through all the lines in the file and pop them into a list, which is then easier to manipulate in the way described in the exercise.

Search for recipes based on the name of the recipe
Please write a function named search_by_name(filename: str, word: str), which takes a filename and a search string as its arguments. The function should go through the file and select all recipes whose name contains the given search string. The names of these recipes are then returned in a list.

An example of the function in action:

found_recipes = search_by_name("recipes1.txt", "cake")

for recipe in found_recipes:
    print(recipe)
Sample output
Pancakes
Cake pops

As you can see in the example above, the case of the letters is irrelevant. The search term cake returns both Pancakes and Cake pops, even though the latter is capitalized.

NB: If Visual Studio can't find the file and you have checked that there are no spelling errors, take a look at these instructions.

Search for recipes based on the preparation time
Please write a function named search_by_time(filename: str, prep_time: int), which takes a filename and an integer as its arguments. The function should go through the file and select all recipes whose preparation time is at most the number given.

The names of these recipes are again returned in a list, but the preparation time should be appended to each name. Please have a look at the example below.

found_recipes = search_by_time("recipes1.txt", 20)

for recipe in found_recipes:
    print(recipe)
Sample output
Pancakes, preparation time 15 min

Search for recipes based on the ingredients
A word of caution: this third part of the exercise is considerably more demanding than the previous two. If you feel like you aren't making headway, it may be worth your while to move on, complete the other exercises in this part of the material, and then come back to this exercise if you have time later. Remember, you can submit and receive points for the first two parts of this exercise even if you haven't completed the third part.

Please write a function named search_by_ingredient(filename: str, ingredient: str), which takes a filename and a search string as its arguments. The function should go through the file and select all recipes whose ingredients contain the given search string.

The names of these recipes are returned in a list just like in the second part, with the preparation time appended. Please have a look at the example below.

found_recipes = search_by_ingredient("recipes1.txt", "eggs")

for recipe in found_recipes:
    print(recipe)
Sample output
Pancakes, preparation time 15 min
Meatballs, preparation time 45 min
Cake pops, preparation time 60 min
```


```python
def open_file(filename: str) -> list:  
    this_lst = []
    this_lst.append("")
    with open(filename) as new_file:
        for line in new_file:
            line = line.strip()
            this_lst.append(line)

    return this_lst


def search_by_name(filename: str, word: str): 
    this_lst = open_file(filename)

    return_lst = []
    for i in range(0, len(this_lst)):
        if this_lst[i] == "" and i <= len(this_lst):  #title always comes after "" 
            if this_lst[i+1].lower().find(word.lower()) != -1:
                return_lst.append(this_lst[i+1])
    
    return return_lst

def search_by_time(filename: str, prep_time: int):
    this_lst = open_file(filename)


    return_lst = []
    for i in range(0, len(this_lst)):
        if this_lst[i] == "" and int(this_lst[i + 2]) <= prep_time and (i + 2) <= len(this_lst):  
            return_lst.append(this_lst[i+1] + ", preparation time " + this_lst[i + 2] + " min")

    return return_lst

def search_by_ingredient(filename: str, ingredient: str):
    this_lst = open_file(filename)

    #is_Flag = True 
    return_lst = []
    for i in range(0, len(this_lst)):
        if this_lst[i] == "" and i <= len(this_lst):
            is_Title = True
            counter = i + 2 
            while is_Title and counter <= len(this_lst):
                if this_lst[counter] == "":
                    is_Title = False

                if ingredient.lower() == this_lst[counter].lower():
                    return_lst.append(this_lst[i+1] + ", preparation time " + this_lst[i + 2] + " min")
                    break
                
                counter += 1

    return return_lst


if __name__ == "__main__":

    found_recipes = search_by_ingredient("src/recipes1.txt", "eggs")

    for recipe in found_recipes:
        print(recipe)

```

## Writing Data to Files

We can create a new file every time we want to write data to a file, but we can also append new data to the end of an existing file. In both cases, we use the `open` function from the previous section. For writing files, the function requires a second argument.

### Creating a New File

If you want to create a new file, you would call the `open` function with the additional argument `"w"` to signify that the file should be opened in write mode. So, the function call could look like this:

```python
with open("new_file.txt", "w") as my_file:
    # code to write something to the file
```

**NB:** If the file already exists, all the contents will be overwritten. It's important to be very careful when creating new files.

With the file open, you can write data to it. You can use the `write` method, which takes the string that is to be written as its argument.

```python
with open("new_file.txt", "w") as my_file:
    my_file.write("Hello there!")
```

When you execute the program, a new file named `new_file.txt` will appear in the directory. The contents would look like this:

**Sample data:**
```
Hello there!
```

If you want line breaks in the file, you will have to add them manually. The `write` function doesn't work exactly like the more familiar `print` function, although they are similar. So, the following program:

```python
with open("new_file.txt", "w") as my_file:
    my_file.write("Hello there!")
    my_file.write("This is the second line")
    my_file.write("This is the last line")
```

Would result in a file with these contents:

**Sample data:**
```
Hello there!This is the second lineThis is the last line
```

Line breaks are achieved by adding new line characters (`\n`) to the argument strings:

```python
with open("new_file.txt", "w") as my_file:
    my_file.write("Hello there!\n")
    my_file.write("This is the second line\n")
    my_file.write("This is the last line\n")
```

Now the contents of `new_file.txt` would look like this:

**Sample data:**
```
Hello there!
This is the second line
This is the last line
```


## Appending Data to an Existing File

To append data to the end of an existing file, you can open the file in append mode by passing `"a"` as the second argument to the `open()` function.

```python
with open("new_file.txt", "a") as my_file:
    my_file.write("This is the 4th line\n")
    my_file.write("And yet another line.\n")
```

Appending data to a file allows you to add new content without overwriting the existing contents. If the file doesn't exist, it will be created. However, it's important to note that appending data to files is not a common practice in programming. In most cases, files are read, processed, and overwritten entirely when needed.

Remember to include the appropriate newline characters (`\n`) if you want to separate the appended content into separate lines within the file.


# Writing CSV Files

## Writing CSV files line by line

CSV files can be written line by line using the `write` method, similar to writing any other file. Each line in the CSV file represents a record, with fields separated by a specific delimiter, such as a semicolon or a comma.

Here's an example that creates a file called `coders.csv` and writes programmer data to it:

```python
with open("coders.csv", "w") as my_file:
    my_file.write("Eric;Windows;Pascal;10\n")
    my_file.write("Matt;Linux;PHP;2\n")
    my_file.write("Alan;Linux;Java;17\n")
    my_file.write("Emily;Mac;Cobol;9\n")
```

Executing this program would result in a CSV file with the following contents:

```
Eric;Windows;Pascal;10
Matt;Linux;PHP;2
Alan;Linux;Java;17
Emily;Mac;Cobol;9
```

## Writing CSV files from a list

If the data to be written is stored in a list in computer memory, you can iterate over the list and construct the lines using an f-string:

```python
coders = [
    ["Eric", "Windows", "Pascal", 10],
    ["Matt", "Linux", "PHP", 2],
    ["Alan", "Linux", "Java", 17],
    ["Emily", "Mac", "Cobol", 9]
]

with open("coders.csv", "w") as my_file:
    for coder in coders:
        line = f"{coder[0]};{coder[1]};{coder[2]};{coder[3]}"
        my_file.write(line + "\n")
```

If the list contains a large number of items, building the string manually may become cumbersome. In such cases, you can use nested loops to construct the line:

```python
with open("coders.csv", "w") as my_file:
    for coder in coders:
        line = ""
        for value in coder:
            line += f"{value};"
        line = line[:-1]
        my_file.write(line + "\n")
```

## Clearing file contents and deleting files

To clear the contents of an existing file, you can open it in write mode and close it immediately. This can be achieved using a `pass` statement within a `with` block:

```python
with open("file_to_be_cleared.txt", "w") as my_file:
    pass
```

Alternatively, you can use a one-liner to bypass the `with` block:

```python
open("file_to_be_cleared.txt", "w").close()
```

To delete a file entirely, you can use the `os` module:

```python
import os

os.remove("unnecessary_file.csv")
```

This will delete the file called "unnecessary_file.csv" from the filesystem.


```
The file solutions.csv contains some solutions to mathematics problems:

Arto;2+5;7
Pekka;3-2;1
Erkki;9+3;11
Arto;8-3;4
Pekka;5+5;10
...jne...
As you can see above, on each line the format is name_of_student;problem;result. All the operations are either addition or subtraction, and each has exactly two operands.

Please write a function named filter_solutions() which

Reads the contents of the file solutions.csv
writes those lines which have a correct result into the file correct.csv
writes those lines which have an incorrect result into the file incorrect.csv
Using the example above, the file correct.csv would contain the lines

Arto;2+5;7
Pekka;3-2;1
Pekka;5+5;10
The other two would be in the file incorrect.csv.

Please write the lines in the same order as they appear in the original file. Do not change the original file.

NB: the function should have the exact same result, no matter how many times it is called. That is, it shouldn't matter if the function is called once

filter_solutions()
or multiple times in a row

filter_solutions()
filter_solutions()
filter_solutions()
filter_solutions()
After the execution, the contents of the files correct.csv and incorrect.csv should be exactly the same in either case.
```


```python
def filter_solutions(): 
    with open("solutions.csv", "r") as my_file:
        lst = []
        for row in my_file: 
            row = row.strip()
            parts = row.split(';')
            lst.append([parts[0], parts[1], parts[2]])
        #print(lst)

    with open("correct.csv", "w") as my_file:
        pass

    with open("incorrect.csv", "w") as my_file:
        pass


    for person in lst:
        if person[1].find("+") != -1:
            parts = person[1].split("+")
            if int(parts[0]) + int(parts[1]) == int(person[2]): 
                with open("correct.csv", "a") as my_file: 
                    my_file.write(f"{person[0]};{person[1]};{person[2]}" + "\n")
            else:
                with open("incorrect.csv", "a") as my_file: 
                    my_file.write(f"{person[0]};{person[1]};{person[2]}" + "\n")
        elif person[1].find("-") != -1:
            parts = person[1].split("-")
            if int(parts[0]) - int(parts[1]) == int(person[2]): 
                with open("correct.csv", "a") as my_file: 
                    my_file.write(f"{person[0]};{person[1]};{person[2]}" + "\n")
            else:
                with open("incorrect.csv", "a") as my_file: 
                    my_file.write(f"{person[0]};{person[1]};{person[2]}" + "\n")            



"""model solution
-- one thing to note is how all files are opened in one line, otherwise, nothing I didn't do, but neater. 



def filter_solutions():
    # Open all lines
    with open("solutions.csv") as source, open("correct.csv", "w") as correct_file, open("incorrect.csv", "w") as incorrect_file:
        for row in source:
            # Split into pieces
            pieces = row.split(";")
 
            calculation = pieces[1]
            result = pieces[2]
 
            # Addition or subtraction?
            if "+" in calculation:
                operands = calculation.split("+")
                # correct is True or False based on whether the calculation was correct or not
                correct = int(operands[0]) + int(operands[1]) == int(result)
            else:
                operands = calculation.split("-")
                # correct is True or False based on whether the calculation was correct or not
                correct = int(operands[0]) - int(operands[1]) == int(result)
 
            # Write to file
            if correct:
                correct_file.write(row)
            else:
                incorrect_file.write(row)

"""
```


```solutions.csv
Kirka;79-15;22
Taina;84-24;60
Tony;75-15;60
Kirsi;86-22;32
Pekka;31+95;126
Mike;59-7;52
Pauli;82-6;43
Kirsi;27+12;39
Toni;70+47;117
Kirsi;69-50;40
Antti;91+84;175
Matti;67-41;26
Antti;65-39;26
Tiina;26+72;1
Tea;33+71;104
Pekka;97+53;150
Toni;34+71;66
Mike;1+6;61
Tony;48+66;114
Emilia;23+30;53
Tuula;99-42;57
Pauli;73-35;78
Paula;83-17;80
Kimmo;25+29;7
Kirka;92+47;56
Arto;26+81;107
Pauli;89-30;1
Antti;85+38;123
Toni;71-19;52
Pekka;34+67;101
Tiina;84+16;45
Toni;89-19;70
Tony;62+61;123
Pekka;90-25;65
Mike;63-12;77
Arto;73-20;17
Emilia;40+17;57
Tanja;92+77;169
Antti;36+95;131
Paula;81-33;48
Kirsi;88-41;47
Emilia;69+74;143
Juho;76-27;39
Juha;99-18;81
Paula;23+13;43
Antti;68-31;37
Tea;49+3;52
Juha;61-19;72
Kimmo;28+38;25
Tanja;10+26;47
Mia;34+79;113
Kirsi;62-1;91
Arto;76-27;75
Paula;94-11;83
Paula;85-48;45
Kirka;64+99;37
Pekka;55-26;29
Antti;66-25;19
Kimmo;98+13;45
Arto;71-23;39
Pekka;49+1;50
Tea;91+94;53
Tiina;68-27;53
Tiina;68-32;36
Kirsi;71-37;8
Mike;97-16;5
Paula;67-10;57
Kirsi;60+18;51
Mike;82+19;4
Lauri;86-21;65
Juho;95+26;30
Mia;93-27;38
Erkki;62-9;53
Matti;71-7;74
Arto;95+23;74
Matti;80-48;6
Pekka;68-44;22
Erkki;1+90;42
Matti;61+24;85
Tuula;61-37;85
Antti;37+64;5
Kirsi;74-47;85
Taina;16+43;24
Mia;51+36;87
Juho;21+38;83
Taina;62-33;10
Toni;52-7;45
Matti;59+2;20
Tiina;55-50;5
```

Here is a summary of the typical errors in Python and how they can be handled, as you would expect from a person with a Master's degree in the field:

1. **ValueError**: This occurs when an argument passed to a function is invalid. For instance, calling `float("1,23")` will raise a ValueError because in Python, decimals are represented using a period, not a comma.

2. **TypeError**: This error arises when an operation is applied to an object of inappropriate type. For instance, calling `len(10)` results in a TypeError because the length function expects an iterable (like string or list), but receives an integer.

3. **IndexError**: This occurs when trying to access an index that doesn't exist in a sequence. For instance, `"abc"[5]` will raise an IndexError because there's no element at index 5 in the string "abc".

4. **ZeroDivisionError**: This error is raised when there is an attempt to divide by zero. It’s a common mathematical error. For example, calculating the mean of a list using `sum(my_list) / len(my_list)` will throw a ZeroDivisionError if the list is empty.

5. **File Handling Exceptions**:
    a. **FileNotFoundError**: Raised when trying to access a file that doesn't exist.
    b. **io.UnsupportedOperation**: Occurs when an operation is not supported in the mode the file is opened.
    c. **PermissionError**: Raised when the program doesn’t have the necessary permissions to access the file.

6. **Handling Multiple Exceptions**: Python allows handling multiple exceptions using more than one `except` block attached to a `try` block. For instance, you can separately handle `FileNotFoundError` and `PermissionError` by using two different `except` blocks.

7. **Generic Exception Handling**: Sometimes it might not be necessary to know the specific error. In such cases, a generic `except` block can be used which doesn’t specify the error. However, it's usually a good practice to specify the exception type as generic handling can mask the real issue.

8. **Passing Exceptions**: If a function raises an exception and it’s not handled within that function, the exception is passed to the calling code. This continues up the call stack until it’s either handled or causes the program to exit.

9. **Raising Exceptions**: Exceptions can be explicitly triggered using the `raise` statement. This is helpful, for example, when validating input parameters in a function. Raising an exception can signal that something is wrong, which is particularly useful when the function is called from elsewhere.

Here's an example where a custom exception is raised:
```python
def factorial(n):
    if n < 0:
        raise ValueError(f"The input was negative: {n}")
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result
```
In this example, the `factorial` function raises a `ValueError` if the input number is negative.

This summary covers the typical errors you may encounter in Python and how they can be handled or raised intentionally. Understanding these errors and handling mechanisms is crucial for writing robust and error-resistant code.


```python
def filter_incorrect():
    with open("lottery_numbers.csv", "r") as source_file, open("correct_numbers.csv", "w") as destination_file:
        for row in source_file:
            # remove new line character
            row = row.strip() 

            # (split weeks + #) and (the lottery numbers)
            parts = row.split(';')

            # checks for two parts
            if len(parts) != 2:
                continue

            # checks if weeks and number exists -- isdigit is okay with str 
            parts_week = parts[0].split(" ")           
            if len(parts_week) != 2 or not parts_week[1].isdigit() or not parts_week[0].lower() == "week": 
                continue

            # stores the lottery numbers in a list, only if it's actually numbers (and not ** or letters)
            numbers = [int(part) for part in parts[1].split(',') if part.isdigit()] 
            
            #dual functionality of part.isdigit(), solves for "One or more numbers are not correct:" and "len list"
            if len(numbers) != 7:
                continue

            # checks unique numbers
            unique_numbers = set(numbers)
            if len(unique_numbers) != 7:
                continue

            valid_nums = True
            for number in numbers: 
                if number < 1 or number > 39:
                    valid_nums = False
                    break
            
            if valid_nums: 
                destination_file.write(row + "\n")
                    
                




if __name__ == "__main__":
    filter_incorrect()

    """Model Solution uses more try, except structures to parse data, and invalid data is handled in the except block instead of timing out

    def filter_incorrect():
    with open("lottery_numbers.csv") as input_file, open("correct_numbers.csv", "w") as result_file:
        for row in input_file:
            parts = row.strip().split(";")
            if len(parts) != 2:
                continue
            week = parts[0].split(" ")
            error = False
            if len(week) != 2 or week[0] != "week":
                error = True
            try:
                mika = int(week[1])
            except:
                error = True
            number_list = parts[1].split(",")
            if len(number_list) != 7:
                error = True
 
            # numbers already listed --> to find out duplicates
            listed = []
            for item in number_list:
                try:
                    number = int(item)
                    if number < 1 or number > 39 or number in listed:
                        error = True
                    listed.append(number)
                except:
                    error = True
            if not error:
                result_file.write(row)
    """
```


# Variable Scope in Python

The scope of a variable refers to the sections of a program where a variable is accessible. In Python, variables can have local or global scope.

## Local Variables

Variables defined within a function have local scope, meaning they are only accessible within that function. This includes function parameters and other variables defined within the function. Local variables do not exist outside the function.

In the following example, the variable `x` is defined within the `testing` function:

```python
def testing():
    x = 5
    print(x)

testing()
print(x)  # Raises a NameError: name 'x' is not defined
```

Here, `x` is only accessible within the `testing` function. Trying to access `x` outside the function results in an error.

## Global Variables

Variables defined outside any function, typically in the main section of the program, have global scope. Global variables can be accessed from any part of the program, including other functions.

```python
def testing():
    print(x)

x = 3
testing()  # Outputs 3
```

In this example, `x` is a global variable defined in the main section of the program. It can be accessed and used within the `testing` function.

However, a global variable cannot be changed directly from within a function unless specified using the `global` keyword:

```python
def testing():
    x = 5
    print(x)

x = 3
testing()  # Outputs 5
print(x)   # Outputs 3
```

Here, the `testing` function creates a new local variable `x` that masks the global variable. The local variable `x` has a value of 5, but it is a separate variable from the global `x`.

To modify the global variable within a function, you need to use the `global` keyword:

```python
def testing():
    global x
    x = 3
    print(x)

x = 5
testing()  # Outputs 3
print(x)   # Outputs 3
```

By using `global x` within the `testing` function, the assignment `x = 3` affects the global variable `x` as well.

## When to Use Global Variables

Global variables should be used judiciously and not as a way to bypass function parameters or return values. It is generally better to use function parameters and return values to pass data between functions.

Global variables are useful in situations where you need to have common information available to multiple functions throughout the program. For example:

```python
def calculate_sum(a, b):
    global count
    count += 1
    return a + b

def calculate_difference(a, b):
    global count
    count += 1
    return a - b

count = 0
print(calculate_sum(2, 3))         # Outputs 5
print(calculate_sum(5, 5))         # Outputs 10
print(calculate_difference(5, 2))  # Outputs 3
print(calculate_sum(1, 0))         # Outputs 1
print("There were", count, "function calls")  # Outputs "There were 4 function calls"
```

Here, the global variable `count` keeps track of how many times the functions `calculate_sum` and `calculate_difference` are called.

However, it's important to use global variables sparingly and consider other alternatives, such as function parameters and return values, whenever possible. Overusing global variables can make it difficult to track program state and lead to unpredictable behavior.

Passing data between functions is best achieved through function arguments and return values, as shown in the example below

# **Debugging Methods in Python**

## **Recap of Debugging Methods**
- **Visualization tools** and **debugging print outs** are common methods.
- **Visual Studio Code built-in debugger** is an effective tool. Problems with file location are covered in the previous section.

## **Introduction to Breakpoint Command**
- Python version 3.7 introduced the **breakpoint() command** for debugging.
- The command halts the program execution at the point where it is inserted.
- An **interactive console** opens upon halting, enabling the user to experiment with the code.

## **Use Cases and Instructions**
- The command is useful in identifying the cause of an error in a particular line.
- Execution can be resumed using the command **continue**, or **c**, in the debugging console.
- Other commands for the console can be found through the **help** command.
- The **exit** command concludes the program execution.
- Users must remember to remove **breakpoint** commands after debugging.

# **Python Modules**

## **Introduction to Modules**
- Python's language definition includes useful functions, but more complex programs often require additional functionalities provided by the **Python standard library**.
- The standard library consists of **modules**, each containing functions and classes around different themes.
- The **import** command allows the use of a given module's contents in the current program.

## **Using the Math Module**
- The **math module** provides functions for mathematical operations.
- Functions in a module are referred to by prefixing them with the module name (e.g., math.sqrt).

## **Importing Specific Module Sections**
- Select parts of a module can be imported using the **from** command, which eliminates the need for prefixing.
- The **star notation** imports all contents of a module.
- The star notation can be handy in testing and small projects but may also pose problems.

## **Programming Exercises**
- An exercise on calculating the **hypotenuse** of a triangle using the **math module**.
- Another exercise on separating different character types using the **string module**.
- A third exercise on creating fractions using the **fractions module**.

## **Understanding Module Contents**
- Python documentation provides detailed resources on each module.
- The **dir function** lists all names defined by a module.
- The names can represent classes, constant values, or functions.

# Randomness

## Learning objectives

After this section, you will be able to:
- Understand and utilize the functions in the `random` module
- Generate random numbers in your programs
- Shuffle data structures using the `shuffle` function
- Pick random items from a data structure using the `choice` function
- Generate unique sets of random numbers

## Generating a random number

The `random` module in Python's standard library provides tools for generating random numbers and implementing other randomized functionality.

To generate a random integer value between `a` and `b` (inclusive), you can use the `randint(a, b)` function. For example:

```python
from random import randint

print("The result of the throw:", randint(1, 6))
```

Output:
```
The result of the throw: 4
```

You can also generate multiple random numbers by using a loop:

```python
from random import randint

for i in range(10):
    print("The result of the throw:", randint(1, 6))
```

## More randomizing functions

The `random` module provides other functions for randomizing data structures. The `shuffle` function shuffles a list in-place:

```python
from random import shuffle

words = ["atlas", "banana", "carrot"]
shuffle(words)
print(words)
```

Output:
```
['banana', 'atlas', 'carrot']
```

The `choice` function returns a randomly selected item from a data structure:

```python
from random import choice

words = ["atlas", "banana", "carrot"]
print(choice(words))
```

Output:
```
'carrot'
```

## Lottery numbers

Generating lottery numbers involves selecting a set of unique random numbers within a specified range. Here are a few approaches to achieve this:

### Approach 1: List and loop

```python
from random import randint

weekly_draw = []
while len(weekly_draw) < 7:
    new_rnd = randint(1, 40)
    if new_rnd not in weekly_draw:
        weekly_draw.append(new_rnd)

print(weekly_draw)
```

### Approach 2: Shuffle and slice

```python
from random import shuffle

number_pool = list(range(1, 41))
shuffle(number_pool)
weekly_draw = number_pool[0:7]
print(weekly_draw)
```

### Approach 3: Sample function

```python
from random import sample

number_pool = list(range(1, 41))
weekly_draw = sample(number_pool, 7)
print(weekly_draw)
```

## True randomness

The `random` module in Python generates pseudorandom numbers, which are not truly random but rather based on an algorithm and a seed value. To ensure the same sequence of pseudorandom numbers, you can set the seed value using the `seed` function:

```python
from random import randint, seed

seed(1337)
print(randint(1, 100))  # Always produces the same "random" number
```

For true randomness, external sources such as background radiation or noise levels are used to generate the seed value.

## Programming exercise: Password generator

You can use the `random` module to create a password generator. Here's an example of generating passwords consisting of lowercase characters 'a' to 'z':

```python
from random import choice
from string import ascii_lowercase

def generate_password(length: int):
    password = ''
    for _ in range(length):
        password += choice(ascii_lowercase)
    return password

for _ in range(10):
    print(generate_password(8))
```

Output:
```
lttehepy
olsxttjl
cbjncrzo
dwxqjdgu
gpfdcecs
jabyvgar
xnbbonbl
ktmsjyww
ejhprmel
rjkoacib
```

The `choice` function is used to randomly select a character from the lowercase alphabet. The generated password length is specified as an argument to the `generate_password` function.

Remember, this is a simple example using only lowercase characters. You can extend it to include uppercase letters, digits, and special characters based on your requirements.

#### Code 

```python
from random import choice, shuffle
from string import ascii_lowercase, digits


def generate_strong_password(length: int, include_num: bool, include_special_chars: bool):
    
    spec_chrs = "!?=+-()#"
    pwd = [choice(ascii_lowercase)]  # ensures at least 1 char

    characters_pool = ascii_lowercase
    if include_num:
        pwd.append(choice(digits))  # ensures at least 1 digit if true
        characters_pool += digits

    if include_special_chars:
        pwd.append(choice(spec_chrs))  # ensures at least 1 special char if true
        characters_pool += spec_chrs

    while len(pwd) < length:
        pwd.append(choice(characters_pool))

    shuffle(pwd)
    
    return ''.join(pwd)

```


```
Programming exercise:
Random words
Points:
1

/

1

The exercise template contains the file words.txt, which contains some English language words, one on each line.

Please write a function named words(n: int, beginning: str), which returns a list containing n random words from the words.txt file. All words should begin with the string specified by the second argument.

The same word should not appear twice in the list. If there are not enough words beginning with the specified string, the function should raise a ValueError exception.

An example of the function in action:

word_list = words(3, "ca")
for word in word_list:
    print(word)
Sample output
cat
car
carbon
```

```python
from random import sample

def words(n: int, beginning: str):
    words = []
    with open(r"C:\Users\Wilson\AppData\Local\tmc\vscode\mooc-programming-22\part07-08_random_words\src\words.txt", "r") as file:
        for word in file:
            words.append(word.strip())

    match_words = []
    for word in words:
        check_begin = word[:len(beginning)]
        #print(check_begin)
        if beginning == check_begin:
            match_words.append(word)
    

    if len(match_words) < n:
        raise ValueError("Not enough matches")

    return sample(match_words, n)

```


## using beginswith()

```python
import random
 
def words(n: int, beginning: str):
    word_list = []
    with open("words.txt") as file:
        for word in file:
            word = word.replace("\n","")
            if word.startswith(beginning):
                word_list.append(word)
    if len(word_list) < n:
        raise ValueError("Not enough suitable words can be found!")
    return random.sample(word_list, n)
```


# startswith()



# The datetime object

The Python `datetime` module provides functionalities for working with dates and times. One of the key components of this module is the `datetime` object, which represents a specific date and time.

## Obtaining the current date and time

To get the current date and time, you can use the `datetime.now()` function:

```python
from datetime import datetime

current_time = datetime.now()
print(current_time)
```

Output:
```
2023-06-19 12:30:45.123456
```

## Creating a datetime object

You can also create a `datetime` object for a specific date and time by providing the year, month, day, hour, minute, second, and microsecond values:

```python
from datetime import datetime

my_time = datetime(2021, 12, 24, 18, 30, 0)
print(my_time)
```

Output:
```
2021-12-24 18:30:00
```

If you don't provide the time components, the default time will be set to midnight (00:00:00).

## Accessing datetime components

You can access the individual components of a `datetime` object using the corresponding attributes:

```python
from datetime import datetime

my_time = datetime(1952, 12, 24)

print("Day:", my_time.day)
print("Month:", my_time.month)
print("Year:", my_time.year)
```

Output:
```
Day: 24
Month: 12
Year: 1952
```

## Comparing datetime objects

Datetime objects can be compared using the standard comparison operators, such as `<`, `>`, `==`, etc. This allows you to check if one date is before, after, or equal to another date:

```python
from datetime import datetime

time_now = datetime.now()
midsummer = datetime(2023, 6, 21)

if time_now < midsummer:
    print("It is not yet Midsummer")
elif time_now == midsummer:
    print("Happy Midsummer!")
elif time_now > midsummer:
    print("It is past Midsummer")
```

Output:
```
It is not yet Midsummer
```

## Calculating the difference between datetime objects

You can calculate the difference between two `datetime` objects using the subtraction operator. The result is a `timedelta` object representing the time difference:

```python
from datetime import datetime

time_now = datetime.now()
midsummer = datetime(2023, 6, 21)

difference = midsummer - time_now
print("Midsummer is", difference.days, "days away")
```

Output:
```
Midsummer is 2 days away
```

## Performing arithmetic operations with datetime objects

You can perform arithmetic operations involving `datetime` and `timedelta` objects. Adding a `timedelta` object to a `datetime` object results in a new `datetime` object:

```python
from datetime import datetime, timedelta

midsummer = datetime(2023, 6, 21)
one_week = timedelta(weeks=1)
week_from_date = midsummer + one_week

print("A week after Midsummer it will be", week_from_date)

long_time = timedelta(weeks=32, days=15)
print("32 weeks and 15 days after Midsummer it will be", midsummer + long_time)
```

Output:
```
A week after Midsummer it will be 2023-06-28 00:00:00
32 weeks and 15 days after Midsummer it will be 2024-02-05 00:00:00
```

## Conclusion

The `datetime` object in Python's `datetime` module allows you to work with dates and times effectively. You can obtain the current date and time, create custom datetime objects, compare dates, calculate differences, and perform arithmetic operations. Understanding and utilizing the `datetime` object is essential for working with time-related data and operations in Python.


# **Programming Exercise: How old**

Please write a program that asks the user for their date of birth and then prints out how old the user was on the eve of the new millennium. The program should ask for the day, month, and year separately and print out the age in days. Please refer to the examples below:

Sample Output:
```
Day: 10
Month: 9
Year: 1979
You were 7417 days old on the eve of the new millennium.
```

Sample Output:
```
Day: 28
Month: 3
Year: 2005
You weren't born yet on the eve of the new millennium.
```

You may assume that all day-month-year combinations given as arguments will be valid dates. That is, there will not be a date like February 31st.


```Python
# Write your solution here
import datetime

day = int(input("Day: "))
month = int(input("Month: "))
year = int(input("Year: "))




# 12:00AM, 12/31/1999 is eve 
#datetime obj
eve_of_millennium = datetime.datetime(1999, 12, 31)

#datetime obj
born_time = datetime.datetime(year, month, day)

# datetime - datetime -> timedelta, then which we can access the days of timedelta 
days_old = (eve_of_millennium - born_time).days

#print(days_old)

if born_time > eve_of_millennium: 
    print("You weren't born yet on the eve of the new millennium.")
else:
    print(f"You were {days_old} days old on the eve of the new millennium.")
```


Programming exercise:
Valid PIC?
Points:
0

---

In this exercise you will validate Finnish Personal Identity Codes (PIC).

Please write a function named `is_it_valid(pic: str)`, which returns `True` or `False` based on whether the PIC given as an argument is valid or not. Finnish PICs follow the format `ddmmyyXyyyz`, where `ddmmyy` contains the date of birth, `X` is the marker for century, `yyy` is the personal identifier, and `z` is a control character.

The program should check the validity by these three criteria:

1. The first half of the code is a valid, existing date in the format `ddmmyy`.
2. The century marker is either `+` (1800s), `-` (1900s), or `A` (2000s).
3. The control character is valid.

The control character is calculated by taking the nine-digit number created by the date of birth and the personal identifier, dividing this by 31, and selecting the character at the index specified by the remainder from the string `0123456789ABCDEFHJKLMNPRSTUVWXY`. For example, if the remainder was 12, the control character would be `C`.

More examples and explanations of the uses of the PIC are available at the [Digital and Population Data Services Agency](https://dvv.fi/en/personal-identity-code).

NB! Please make sure you do not share your own PIC, for example in the code you use for testing or through the course support channels.

Here are some valid PICs you can use for testing:

- 230827-906F
- 120488+246L
- 310823A9877

--------------


```python

import datetime

#ddmmyyXyyyz
def is_it_valid(pic: str) -> bool:
    
    if len(pic) != 11: 
        return False
    
    # + (1800s), - (1900s) or A (2000s).
    if pic[6] not in ["-", "+", "A"]:
        return False

    # solves the issue for ambigious datetime, since we only parse the xxXX years 
    dct = {}
    dct["+"] = "18"
    dct["-"] = "19"
    dct["A"] = "20"

    try: 
        #day, month, year for pic format --   ddmmyy 10 04 00
        #datetime format is year, month, day 
        is_valid = datetime.datetime(int(dct[pic[6]] + pic[4:6]), int(pic[2:4]), int(pic[:2]))
    except: 
        return False

    
    # nine-digit number created by the date of birth and the personal identifier

    try: 
        nine_digit = int(pic[0:6] + pic[7:10])
    except:
        #value error if not all digits
        return False
    remainder = nine_digit % 31 

    str_ident = "0123456789ABCDEFHJKLMNPRSTUVWXY"

    if pic[10] != str_ident[remainder]:
        return False
    
    return True

```

```
Programming exercise:
Screen time
Points:
0

---

Please write a program for recording the amount of time the user has spent in front of a television, computer, or mobile device screen over a specific period of time.

The program should work as follows:

Sample output:
Filename: late_june.txt
Starting date: 24.6.2020
How many days: 5
Please type in screen time in minutes on each day (TV computer mobile):
Screen time 24.06.2020: 60 120 0
Screen time 25.06.2020: 0 0 0
Screen time 26.06.2020: 180 0 0
Screen time 27.06.2020: 25 240 15
Screen time 28.06.2020: 45 90 5
Data stored in file late_june.txt

The user will input each day on a separate line, and the entries will contain three numbers separated by spaces, representing minutes.

With the above input, the program should store the data in a file named late_june.txt. The contents should look like this:

Sample data:
Time period: 24.06.2020-28.06.2020
Total minutes: 780
Average minutes: 156.0
24.06.2020: 60/120/0
25.06.2020: 0/0/0
26.06.2020: 180/0/0
27.06.2020: 25/240/15
28.06.2020: 45/90/5

```


```python
# Write your solution here
from datetime import datetime, timedelta

if False:
    file_name = "late_june.txt"
    start_date = "24.6.2020"
    num_days = 5
else:
    file_name = input("Filename: ")
    start_date = input("Starting date: ") # day, month, year 
    num_days = int(input("How many days: "))

# returns a datetime from parsed info
start_time = datetime.strptime(start_date, "%d.%m.%Y")

with open(file_name, "w") as new_file:
    print("Please type in screen time in minutes on each day (TV computer mobile):")

    days_to_add = timedelta(days=(num_days - 1))
    new_file.write(f"Time period: {start_time.strftime('%d.%m.%Y')}-{(start_time + days_to_add).strftime('%d.%m.%Y')}" + "\n")

    total_minutes = 0
    store_times = []
    for i in range(num_days):
        current_time = start_time + timedelta(days=i)
        inpt = input(f"Screen time {current_time}: ")
        
        #store times to write, due to formatting requirements--stored as string         
        store_times.append(inpt)


        parts = inpt.split(' ')
        for num in parts: 
            total_minutes += int(num)

    average_minutes = float(total_minutes) / float(num_days)
    new_file.write(f"Total minutes: {total_minutes}" + "\n")
    new_file.write(f"Average minutes: {average_minutes}" + "\n")


    for i in range(num_days):
        current_time = start_time + timedelta(days=i)
        new_file.write(f"{current_time.strftime('%d.%m.%Y')}: {store_times[i].replace(' ','/' )}" + "\n")
        
        

print(f"Data stored in file {file_name}")
```


##### Model Code...
```python
from datetime import datetime, timedelta
 
week = timedelta(days=7)
 
def format(aika):
    return aika.strftime("%d.%m.%Y")
 
file = input("Filename: ")
start = input("Starting date: ").split('.')
days = int(input("How many days: "))
print("Please type in screen time in minutes on each day (TV computer mobile):")
 
screen_times = []
total = 0
start = datetime(int(start[2]), int(start[1]), int(start[0]))
 
for i in range(days):
    day = start + timedelta(days=i)
    times = input(f"Screen time {format(day)}: ").split(' ')
    tv = int(times[0])
    pc = int(times[1])
    mobile = int(times[2])
    total += tv + pc + mobile
    screen_times.append((day, tv, pc, mobile) )
 
with open(file, "w") as tdsto:
    tdsto.write(f"Time period: {format(start)}-{format(start + timedelta(days=(days-1)))}\n")
    tdsto.write(f"Total minutes: {total}\n")
    tdsto.write(f"Average minutes: {total/days:.1f}\n")
    for pv, tv, pc, mob in screen_times:
        tdsto.write(f"{format(pv)}: {tv}/{pc}/{mob}\n")
 
print(f"Data stored in file {file}")
# Write your solution here

```

This section explains handling dates and times in Python, and it introduces several key functionalities:

1. **datetime object**: The Python `datetime` module includes the `now` function which returns a datetime object containing the current date and time.

```python
from datetime import datetime
my_time = datetime.now()
print(my_time)
```
You can also create the datetime object yourself:

```python
from datetime import datetime
my_time = datetime(1952, 12, 24)
print(my_time)
```

2. **Accessing elements of datetime object**: You can access different elements of a datetime object, like the day, month, and year.

```python
from datetime import datetime
my_time = datetime(1952, 12, 24)
print("Day:", my_time.day)
print("Month:", my_time.month)
print("Year:", my_time.year)
```

3. **Time of day**: You can also specify the time of day when creating a datetime object. 

```python
from datetime import datetime
pv1 = datetime(2021, 6, 30, 13)     # 30.6.2021 at 1PM
pv2 = datetime(2021, 6, 30, 18, 45) # 30.6.2021 at 6.45PM
```

4. **Comparison and calculation of differences between datetime objects**: The familiar comparison operators also work on datetime objects.

```python
from datetime import datetime
time_now = datetime.now()
midsummer = datetime(2021, 6, 26)

if time_now < midsummer:
    print("It is not yet Midsummer")
elif time_now == midsummer:
    print("Happy Midsummer!")
elif time_now > midsummer:
    print("It is past Midsummer")
```
The difference between two datetime objects can be calculated simply with the subtraction operator:

```python
from datetime import datetime
time_now = datetime.now()
midsummer = datetime(2021, 6, 26)

difference = midsummer - time_now
print("Midsummer is", difference.days, "days away")
```

5. **Datetime and timedelta**: Addition is available between datetime and timedelta objects. 

```python
from datetime import datetime, timedelta
midsummer = datetime(2021, 6, 26)

one_week = timedelta(days=7)
week_from_date = midsummer + one_week

print("A week after Midsummer it will be", week_from_date)

long_time = timedelta(weeks=32, days=15)

print("32 weeks and 15 days after Midsummer it will be", midsummer + long_time)
```

6. **strftime method**: The `strftime` method allows you to format the string representation of a datetime object. 

```python
from datetime import datetime
my_time = datetime.now()
print(my_time.strftime("%d.%m.%Y"))
print(my_time.strftime("%d/%m/%Y %H:%M"))
```

7. **strptime function**: The `strptime` function parses a datetime object from a string given by the user. 

```python
from datetime import datetime
birthday = input("Please type in your birthday in the format dd.mm.yyyy: ")
my_time = datetime.strptime(birthday, "%d.%m.%Y")

if my_time < datetime(2000, 1, 1):
    print("You were born in the previous millennium")
else:
    print("You were born during this millennium")
```

```
Notation	Significance
%d	day (01–31)
%m	month (01–12)
%Y	year in 4 digit format
%H	hours in 24 hour format
%M	minutes (00–59)
%S	seconds (00–59)
```

```python
# Write your solution here
import urllib.request
import json

def retrieve_all():
    
    my_request = urllib.request.urlopen("https://studies.cs.helsinki.fi/stats-mock/api/courses")
    my_data = (my_request.read()) # gets json data 

    data_read = json.loads(my_data)

    active_courses = []



    for course in data_read:
        if course['enabled'] == True:
            sum = 0
            for exercise in course['exercises']:
                sum += int(exercise)

            active_courses.append((course['fullName'], course['name'], course['year'], sum))


    return active_courses

def retrieve_course(course_name: str):
    courses = {} 
    my_request = urllib.request.urlopen("https://studies.cs.helsinki.fi/stats-mock/api/courses/" + course_name + "/stats")
    my_data = (my_request.read()) # gets json data 

    data_read = json.loads(my_data)


    weeks = 0
    students = 0
    hours = 0
    exercises = 0
    #data_read is the entire dictionary object, say we just want to iterate over each key, then we would do data_read.values()
    for week in data_read.values(): 
        weeks += 1

        if int((week['students'])) > students:
            students = int(week['students'])
        

        hours += int(week['hour_total'])
        exercises += int(week['exercise_total'])

    #hour_average = hours divided by students value, rounded down 
    hour_average = hours // students

    #exercises_average: the exercises value divided by the students value (rounded down to the closest integer value)
    exercises_average = exercises // students

    courses['weeks'] = weeks
    courses['students'] = students
    courses['hours'] = hours
    courses['hours_average'] = hour_average
    courses['exercises'] = exercises
    courses['exercises_average'] = exercises_average

    return courses




if __name__ == "__main__":
    print(retrieve_course("docker2019"))
```

```https://studies.cs.helsinki.fi/stats-mock/api/courses/
[{"week":7,"exercises":[17,13,13,8,6,5,11],"enabled":false,"miniproject":false,"peerReviewOpen":false,"extension":false,"_id":"59f883227655fe0034b4dfe5","year":2017,"term":"syksy","fullName":"Ohjelmistotuotanto","name":"ohtus17","url":"https://github.com/mluukkai/ohjelmistotuotanto2017/wiki/Ohjelmistotuotanto-syksy-2017","__v":7},{"week":8,"exercises":[6,14,19,22,21,21,23,23],"enabled":false,"miniproject":false,"peerReviewOpen":false,"extension":false,"_id":"5a576ac24d91600059c09180","year":1970,"term":"Unknown term","fullName":"Full stack -websovelluskehitys","name":"fs","url":"https://fullstack-hy.github.io","__v":9},{"week":8,"exercises":[6,14,19,22,21,21,23,23],"enabled":false,"miniproject":false,"peerReviewOpen":false,"extension":false,"_id":"5a7f50aa9b73740051c69898","year":2018,"term":"Unknown term","fullName":"Open Full Stack 2018","name":"ofs","url":"http://fullstackopen.github.io","__v":8},{"week":7,"exercises":[0,17,13,13,8,6,6,11],"enabled":false,"miniproject":true,"peerReviewOpen":false,"extension":false,"_id":"5bb48ca56ec4c800e33cb76f","year":2018,"term":"syksy","fullName":"Ohjelmistotuotanto","name":"ohtu2018","url":"https://github.com/mluukkai/ohjelmistotuotanto2018/wiki/Ohjelmistotuotanto-syksy-2018","__v":7},{"week":4,"exercises":[0,8,6,7,0,0,0,0],"enabled":false,"miniproject":false,"peerReviewOpen":false,"extension":false,"_id":"5be43839e90ef000b62e8ca4","year":2018,"term":"fall","fullName":"Beta DevOps with Docker","name":"docker-beta","url":"https://docker-hy.github.io","__v":3},{"week":7,"exercises":[0,11,16,16,15,15,15,15],"enabled":false,"miniproject":false,"peerReviewOpen":false,"extension":false,"_id":"5be5dfaeca8b21009ac43d35","year":2018,"term":"syksy","fullName":"Web-palvelinohjelmointi Ruby on Rails","name":"rails2018","url":"https://github.com/mluukkai/WebPalvelinohjelmointi2018","__v":7},{"week":1,"exercises":[0,9,6,7,0,0,0,0],"enabled":false,"miniproject":false,"peerReviewOpen":false,"extension":false,"_id":"5c17f2fdcccfd100f9c6a260","year":2018,"term":"christmas","fullName":"DevOps with Docker","name":"docker18","url":"https://docker-hy.github.io/","__v":3},{"week":8,"exercises":[6,14,20,22,21,21,21,20,0],"enabled":false,"miniproject":false,"peerReviewOpen":false,"extension":true,"_id":"5c39d27776e25b01007e7a12","year":2019,"term":"kevät","fullName":"Full stack websovelluskehitys","name":"fullstack2019","url":"https://fullstack-hy2019.github.io/","__v":11},{"week":8,"exercises":[0,4,4,4,5,3,3,4],"enabled":false,"miniproject":false,"peerReviewOpen":false,"extension":false,"_id":"5c3dd379e2ecb8022bb75407","year":2019,"term":"Fall","fullName":"Cloud Computing Fundamentals","name":"CCFUN","url":"https://ccfun.fi/home","__v":8},{"week":0,"exercises":[6,14,20,22,22,22,21,21,26,27],"enabled":true,"miniproject":false,"peerReviewOpen":false,"extension":true,"_id":"5c7f97d3b7e42b00495261de","year":2020,"term":"Year","fullName":"Full Stack Open 2020","name":"ofs2019","url":"https://fullstackopen.com/","__v":16},{"week":4,"exercises":[1,17,10,8,0,0,0,0],"enabled":true,"miniproject":false,"peerReviewOpen":false,"extension":false,"_id":"5cb5bcd65e4c2f005281f7e7","year":2019,"term":"Year","fullName":"DevOps with Docker 2019","name":"docker2019","url":"https://docker-hy.github.io/","__v":4},{"week":1,"exercises":[1,17,10,8],"enabled":true,"miniproject":false,"peerReviewOpen":false,"extension":false,"_id":"5e8ae0d2d9979700193caed4","name":"docker2020","url":"https://devopswithdocker.com/","term":"Year","year":2020,"fullName":"DevOps with Docker 2020","__v":0},{"week":1,"exercises":[0,13,8,7],"enabled":true,"miniproject":false,"peerReviewOpen":false,"extension":false,"_id":"5ebe6a8f54e7f10019becc15","name":"beta-dwk-20","url":"https://devopswithkubernetes.com","term":"Summer","year":2020,"fullName":"Beta DevOps with Kubernetes","__v":1}]
```


# Who cheated

**Points:** 1/1

The file `start_times.csv` contains individual start times for a programming exam, in the format `name;hh:mm`. An example:

```
jarmo;09:00
timo;18:42
kalle;13:23
```

Additionally, the file `submissions.csv` contains points and hand-in times for individual exercises. The format here is `name;task;points;hh:mm`. An example:

```
jarmo;1;8;16:05
timo;2;10;21:22
jarmo;2;10;19:15
```

Your task is to find the students who spent over 3 hours on the exam tasks. That is, any student whose any task was handed in over 3 hours later than their exam start time is labeled a cheater. There may be more than one submission for the same task for each student. You may assume all times are within the same day.

Please write a function named `cheaters()`, which returns a list containing the names of the students who cheated.


### My Code 
- Issues: I used (time) instead of a datetime object, which forced to to later convert to timedelta or datetime, when I should've used datetime to begin with.
```python
import csv
from datetime import datetime, timedelta, time

def cheaters():
    with open("start_times.csv") as file_one, open("submissions.csv") as file_two:
        students_start_time = {}
        # this line seperates elements into a list based on the delimiter 
        for line in csv.reader(file_one, delimiter=";"):
            students_start_time[line[0]] = datetime.strptime(line[1], "%H:%M").time()

        students_end_time = {}
        for line in csv.reader(file_two, delimiter=";"):
            if line[0] in students_end_time: 
                # checks if new_time is later than the current recorded time
                if datetime.strptime(line[3], "%H:%M").time() > students_end_time[line[0]]:
                    students_end_time[line[0]] = datetime.strptime(line[3], "%H:%M").time()
            #student name doesn't exist, add it 
            else:
                students_end_time[line[0]] = datetime.strptime(line[3], "%H:%M").time()

        #print(students_start_time)
        #print(students_end_time)

        cheaters_list = []
        for student in students_start_time:
            #time object can't subtract, convert to either datetime or timedelta object 
            end_time_delta = timedelta(hours=students_end_time[student].hour,
                                    minutes=students_end_time[student].minute)
            print("end_time_delta", end_time_delta)

            start_time_delta = timedelta(hours=students_start_time[student].hour, 
                                        minutes=students_start_time[student].minute)
        

            difference_time = end_time_delta - start_time_delta

            # 3 hour time_delta
            cut_off_time = timedelta(hours=3)

            if difference_time > cut_off_time:
                cheaters_list.append(student)

        return cheaters_list

```


### Model Code: just more clean, compare. 


```python
import csv
from datetime import datetime, timedelta
 
def cheaters():
    with open("start_times.csv") as start, open("submissions.csv") as submission:
        start_times = {}
        # First read students and start times to memory
        for row in csv.reader(start, delimiter=";"):
            name = row[0]
            time = datetime.strptime(row[1], "%H:%M")
            start_times[name] = time
 
        # Then read submissions
        # From each student, last (i.e. greatest) is saved
        submission_times = {}
        for row in csv.reader(submission, delimiter=";"):
            name = row[0]
            time = datetime.strptime(row[3], "%H:%M")
            # If name does not exists in dictionary, add time directly to the dictionary
            if name not in submission_times:
                submission_times[name] = time
            # If there alredy exists time for key, compare if current time is greater
            elif time > submission_times[name]:
                submission_times[name] = time
        
        cheaters = []
        # Iterate through students one by one
        for name in start_times:
            if submission_times[name] - start_times[name] > timedelta(hours = 3):
                cheaters.append(name)
 
        return cheaters
```




# Who cheated, version 2

**Points:** 1/1

You have the CSV files from the previous exercise at your disposal again. Please write a function named `final_points()`, which returns the final exam points received by the students, in a dictionary format, following these criteria:

- If there are multiple submissions for the same task, the submission with the highest number of points is taken into account.
- If the submission was made over 3 hours after the start time, the submission is ignored.
- The tasks are numbered 1 to 8, and each submission is graded with 0 to 6 points.

In the dictionary returned, the key should be the name of the student, and the value should be the total points received by the student.

Hint: Nested dictionaries might be a good approach when processing the tasks and submission times of each student.



```python
# Write your solution here

# submissions
# name;task;points;hh:mm

# nested dictionaries
# name -> task -> grade 

import csv
from datetime import datetime, timedelta


def final_points():
    
    # stores student start time 
    with open("start_times.csv") as file_one:
            students_start_time = {}
            # this line separates elements into a list based on the delimiter 
            for line in csv.reader(file_one, delimiter=";"):
                students_start_time[line[0]] = datetime.strptime(line[1], "%H:%M")
    


    students_tasks = {}
    with open("start_times.csv") as file_one, open("submissions.csv") as file_two:
        for line in csv.reader(file_two, delimiter=";"):
            
            #If the submission was made over 3 hours after the start time, the submission is ignored.
            start_time = students_start_time[line[0]]
            task_end_time = datetime.strptime(line[3], "%H:%M")
            cut_off_time = timedelta(hours=3)

            if task_end_time - start_time > cut_off_time:
                continue

            # checks if a key exists, and creates both key-value pair
            if line[0] not in students_tasks:
                students_tasks[line[0]] = {}
                students_tasks[line[0]][line[1]] = int(line[2])
            # if key exists, checks if task is exists, if not, make one with score 
            elif line[0] in students_tasks:
                if line[1] not in students_tasks[line[0]]:
                    students_tasks[line[0]][line[1]] = int(line[2])
                # If there are multiple submissions for the same task, the submission with the highest number of points is taken into account.
                elif line[1] in students_tasks[line[0]]:
                    if int(line[2]) > int(students_tasks[line[0]][line[1]]):
                        students_tasks[line[0]][line[1]] = int(line[2])



    final_grade = {}
    for student in students_tasks:
        sum = 0
        for task in students_tasks[student]:
            sum += students_tasks[student][task]
 
        final_grade[student] = sum   

    return final_grade





if __name__ == "__main__":
    #print(cheaters())
    print(final_points())

```

**BOTH MY SOLUTION AND IDEALIZED SOLUTION IS PRETTY MUCH THE SAME, NO DIFFERENCE IN METHOD. I WILL SAY INITIALIZING VARIABLES BEFOREHAND WITH PROPER NAMES DOES MAKE CODE MORE READABLE.  HE ALSO INITIALIZES A LOT OF OTHER ASPECTS AS WELL... **

#### Model Solution 

```python
import csv
from datetime import datetime, timedelta
 
def final_points():
    with open("start_times.csv") as start, open("submissions.csv") as submission:
        start_times = {}
        # First read students and start times to memory
        for row in csv.reader(start, delimiter=";"):
            name = row[0]
            time = datetime.strptime(row[1], "%H:%M")
            start_times[name] = time
 
        # Then read submissions
        # From each student time and points is saved to a dictionary
        # Time and points is saved as tuple.
        points = {}
        for row in csv.reader(submission, delimiter=";"):
            name = row[0]
            tno = int(row[1])
            p = int(row[2])
            time = datetime.strptime(row[3], "%H:%M")
 
            # If cheating has happened, submission is not handled
            if time - start_times[name] > timedelta(hours=3):
                continue
 
            # If student is not handled yet, add student directly to the dictionary
            if name not in points:
                default_time = datetime(1900, 1, 1)
                points[name] = {}
                for i in range(1, 8+1):
                    points[name][i] = 0
                points[name][tno] = p
 
            # If student already exists, more points than earlier is required
            elif p > points[name][tno]:
                points[name][tno] = p
 
        final_points = {}
        # Iterate through students one by one
        for student in points:
            p = 0
            for exercise in points[student]:
                p += points[student][exercise]
            final_points[student] = p
 
        return final_points
 
# Write your solution here
```



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


```python
def change_case(orig_string: str):
     return orig_string.swapcase()


def split_in_half(orig_string: str):
    length = len(orig_string)
    return (orig_string[:length // 2], orig_string[length // 2:])
    
def remove_special_characters(orig_string: str):
    # creates a list of characters that fit the requirements, then join() creates a string. 
    return ''.join(c for c in orig_string if c.isalpha() or c.isdigit() or c.isspace())

```


This section aims to familiarize you with some additional Python features that you may find useful:

1. **Single line conditionals**: Python offers a way to create conditional logic in a single line of code using the structure: `a if [condition] else b`. This is sometimes referred to as a ternary operator.

```python
x = 10
print("even" if x%2 == 0 else "odd")
```
This can be especially useful for conditional assignments:

```python
y = 5
y = y + 1 if x%2 == 0 else 0
```

2. **"Empty" block**: Python does not allow for empty blocks of code. In instances where you need to have a block of code which does nothing (perhaps for testing), you can use the `pass` command. 

```python
def testing():
    pass
```

3. **Loops with else blocks**: In Python, loops can have `else` blocks. These blocks execute when the loop finishes normally, without encountering any `break` statements.

```python
my_list = [3,5,2,8,1]
for x in my_list:
    if x%2 == 0:
        print("found an even number", x)
        break
else:
    print("there were no even numbers")
```

4. **Default parameter value**: Python allows function parameters to have default values. These are used whenever no argument is passed for that parameter.

```python
def say_hello(name="Emily"):
    print("Hi there,", name)

say_hello()        # Uses default parameter
say_hello("Eric")  # Uses provided parameter
```

5. **A variable number of parameters**: Python also allows functions to be defined with a variable number of parameters, by adding a star (`*`) before the parameter name. 

```python
def testing(*my_args):
    print("You passed", len(my_args), "arguments")
    print("The sum of the arguments is", sum(my_args))

testing(1, 2, 3, 4, 5)  # Passes 5 arguments
```
In this case, all arguments passed to the function are contained in a tuple and can be accessed via the named parameter.