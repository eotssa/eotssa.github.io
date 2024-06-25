---
title: Perl Pattern Matching
date: 2024-06-24 23:32:04
tags: 
categories:
  - IT
---
Perl has built in capabilities for patter matching. 
Pattern matching allows programs to scan data for patterns and extract data. 
- For example, to look for a specific name in a phone list or all of the names that start with the letter 'a'. 
- Can be used to reformat documents
- Search and replace


# Regular Expressions (regex) 
A regular expression is a pattern to be matched.
There are three main uses for regex
1. Matching
	1. use normal characters to match signal characters
	2. uses the m/ / operator, which evaluates to true or false value. 
2. Substitution 
	1. substitutes one expression for another; it uses the s/ / / operator 
3. Translation
	1. translates one set of characters to another and uses the tr/// operator. 

# Perl's Regular Expression Operators
| Operator | Description |
| --- | --- |
| `m/PATTERN/` | Returns true if the regular expression pattern `PATTERN` is found in the default variable `$_` (or in an explicitly specified string). |
| `s/PATTERN/REPLACEMENT/` | Searches the default variable `$_` (or an explicitly specified string) for the regular expression pattern `PATTERN`, and replaces the first occurrence with the string `REPLACEMENT`. The modified string is returned. |
| `tr/CHARACTERS/REPLACEMENTS/` | Translates the characters specified in `CHARACTERS` to the corresponding characters in `REPLACEMENTS`. This is typically used for simple character substitutions or transformations. The translation is performed on the default variable `$_` (or an explicitly specified string), and the modified string is returned. |


**All three regular expression operators work with $_ as the string to search. You can use the binding operators (=~ and !~) to search a variable other than $_.**
- What is the `!~` operator??? 


# Regular Expressions (cont.)

Using a regex to match against a string will either return true or false. 
Note that the return value of true or false is not stored anywhere unless we assign it. 
The code below is showing the target.
```Perl
$name =~m/John/ 
$name =~/John/ # if no expression is given, default is matching # same

#if "John" is inside $name, then returns true; else false. 
# The regular expresion itself is between / / slashes, and the =~ operator assigns the target for the search
```

Sometimes, you just want to see if there's a match.
Other times, you might want to do something with the matched string, such as **replacing it or storing it in a variable.**

# The Matching Operator (m//)
The matching operator (`m//`) is used to find patterns in a string. 
## **The matching operator only searches the $_ variable.** 
- makes the match statement shorter because you don't need to specify where to search. 



```Perl
$needToFind = "bbb";
$_ = "AAA bbb AAA"; 
print Found bbb\n if m/$needToFind/; # looks to match "bbb" in $_ string 
#recall postfix if-statements...
```

## Using the matching operator to find a string inside a file is very easy because the defaults are designed to facilitate this activity


```Perl
$targert = "M";
open(INPUT, "<findstr.dat"); 
while (<INPUT>) {
	if (/$target/) {
		print "Found $target on line $."; 
	}
}
close(INPUT); 
```


| Option | Description |
| ------ | ----------- |
| g | Finds all occurrences of the pattern in a string. |
| i | Ignores the case of characters in the string. |
| m | Treats the string as multiple lines. Use this option if you know that the string contains multiple newline characters to turn off the optimization. |
| o | Compiles the pattern only once. Can achieve small performance gains. Use with variable interpolation only when the value of the variable will not change during the lifetime of the program. |
| s | Treats the string as a single line. |
| x | Allows the use of extended regular expressions. Ignores whitespace that's not escaped with a backslash or within a character class. Recommended for making regular expressions more readable. |


# Examples

```Perl
if (/barney.*fred/is) { 
    print "That string mentioned Fred after Barney!\n";  
}

# / start of delimiter
# . matches any character except for newline chararacters
# * is a modifier indicating 0 or more. 
# fred is a matching word
# / end of delimiter
# i is a flag that specifies pattern match case-insensitivity
# s is a flag that makes '.' character also match newline characters since target string is now a single line
```

# /m modifier affects ^ and $, and /s affects special characters 

## using /m modifer (niches) 
```Perl
$_ = "foo\nbar\n";

if (/foo$/) {
    print "Match!\n";
}
else {
    print "No Match.\n";
}

# Output: No Match. 
# No match because "foo" is not the end of the string. 
# The lack of a 'm' flag treats the entire string as one. 
# Therefore, the actual end is "bar"...(why is it not \n? anyways...)

$_ = "foo\nbar\n";

if (/foo$/m) {
    print "Match!\n";
}
else {
    print "No Match.\n", "\n";
}

# Output: Match! 
# 'm' will treat the string as multiple lines. 
# Therefore, 'foo' is the end of the first line. 
**```
 **the regular expression `/foo$/m` is checking if the string ends with "foo" at the end of any line. Since the string assigned to $_ is "foo\nbar\n", the regular expression will match because "foo" appears at the end of the first line.**


### what does the `^` expression mean? 
 - **^ character is a special metacharacter that represents the beginning of a line or string. When used at the start of a regular expression pattern, it asserts that the pattern should match the beginning of a line or string.**

```
/^bar/ will match:

    "bar"
    "barbaz"
    "barnacle"

/^bar/ will not match:

    "foobar"`
```

### /m modifer: using the same string as above (similiar example) 
```Perl
$_ = "foo\nbar\n";

if (/^bar/) {
    print "Match!\n";
}
else {
    print "No Match.\n";
}

# Output: No Match. 
# lack of 'm' flag means the entire string is treated as one. 
# bar is in the middle of the string, not the beginning. 

if (/^bar/m) {
    print "Match!\n";
}
else {
    print "No Match.\n";
}

# Output: Match!
# 'm' flag treats string as now multiple strings. 
# Therefore, bar matches the start of the 2nd line/string. 
```

# /s modifer and its niches
```Perl
$_ = "cat\ndog\ngoldfish"; 

if (/cat.*fish/) {
    print "Match!\n";
}
else {
    print "No Match.\n";
}

# Does it match? 
# Output: No Match. 
# No match because '.' is any character BUT newline characters.
# (Recall .* indicates any amount 0 or more)


if (/cat.*fish/s) { #use /s flag 
    print "Match!\n";
}
else {
    print "No Match.\n";
}

# Does it match? 
# Output: Match!
# the '/s' flag modifer treats the string as a single line. 
# therefore, \n is just any other character now. 
```


# =~ operator
The search, modify, and translation operations work on the `$_` variable by default. 

What if the string to be searched is in some other variable? 
- That's where the **binding operators** come to play.
	- Perl lets you bind the regular expression opeators to a variable other than `$_`

## =~ operator compares a string to a regular expression 

The string to compare is on the left, refex on the right. 

### The =~ operator either returns true (1) or false (0). 

### The lack of a "target" operator will default to `$_`. 
```Perl
$mycar = <STDIN>;
if ($mycar =~ /abc/ {
	print "$mycar contains 'abc"!"; 
}
else {
	print "$mycar does not contain 'abc'!"; 
}
```

## !~ (non-match operator)
Returns true (1) if no match.
Returns false(0) if match. 

## Example of match/non-match/, m/, s/, and tr/ 
```Perl
$scalar = "The root has many leaves and root"; 

#generic matching 
$match = $scalar =~ m/root/; 

$substitution = $scalar =~ s/root/tree/g; # "The tree has many leaves and tree"

$translate = $scalar =~ tr/h/H/; # "THe tree Has many leaves and tree"

print ("\$match = $match\n"); # output: 1 

# !~ found NO match, which returns 1, and executes postfix if-
print ("String has no root.\n") if $scalar !~ m/root/; #output: "String has no root." 

print ("\$substitution = $substitution\n"); # output: 2 (because two root AND /g flag)

print ("\$translate = $translate\n"); # output: 2 

print ("\$scalar = $scalar\n"); # output: THe tree Has many leaves and tree
```
```OUTPUT
$match = 1
String has no root.
$substitution = 2
$translate = 2
$scalar = THe tree Has many leaves and tree
```

# Character Class
A group of characters in square brackets will match any characters in the bracket
| Pattern         | Description                                     | Example           |
|-----------------|-------------------------------------------------|-------------------|
| `/[ab][cd]/`    | Matches 'a' or 'b' followed by 'c' or 'd'       | ac, ad, bc, bd    |
| `/[aeiou]/`     | Matches any vowel (lowercase)                   | a, e, i, o, u     |
| `/[^aeiou]/`    | Matches any character that is not a vowel       | b, c, d, 1, #, @  |
| `/[0123456789]/`| Matches any digit (0-9)                         | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 |
| `/[0-9]/`       | Matches any digit (0-9) using range syntax      | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 |
#### Notice how in `^` used in a character class differs from `^` when used in pattern matching alone


The following is funtionally different from `/[0123456789]/`
 `/0123456789/`  | Matches the **exact** digit sequence '0123456789'   | 0123456789 |

## Symbolic Character Class

| Pattern | Equivalent      | Description                                         |
|---------|-----------------|-----------------------------------------------------|
| `.`     |                 | Matches any character except for the newline       |
| `\d`    | `[0-9]`         | Matches any digit (0-9)                            |
| `\D`    | `[^0-9]`        | Matches any character that is not a digit          |
| `\s`    | `[\t \n]`       | Matches whitespace characters (tab, space, newline)|
| `\S`    | `[^\t \n]`      | Matches any character that is not whitespace       |
| `\w`    | `[a-zA-Z0-9_]`  | Matches any word character (letters, digits, underscore)|
| `\W`    | `[^a-zA-Z0-9_]` | Matches any character that is not a word character |

### Symbolic Character Class (Example)

```Perl
$_ = "AAABBBCCC";
$charList = "ADE";

print "matched" if m/[$charList]/; #output: matched # contains ANY of the characters in $charList

$_ = "AAABBBCCC";
print "matched" if m/[^ABC]/; # will display nothing
# match only returns true if a character besides A, B, or C is in the searched string

$_ = "AAABBBCCC";
print "matched" if m/[^A]/; # output: matched
# (because there is a character besides A)
```

# Word Boundaries
### `\b` option is used for exact word boundaries
| Pattern  | Description                                         | Example                |
|----------|-----------------------------------------------------|------------------------|
| `m/foo\b/`| Matches 'foo' with exact word boundaries            | Matches 'foo', not 'foobar' |
| `m/\bwiz/`  | Matches 'wiz' at the beginning of a word            | Matches 'wizard', not 'geewiz'|

### example of word boundaries and use of group and OR (|)
```Perl
$mystr = "abcfeed";

print "matched" if $mystr =~ m/foo|far|fee/; #outout: matched

print "matched" if $mystr =~ m/\b(foo|far|fee)\b/; # no output: Why? 
```
The regular expression `m/\b(foo|far|fee)\b/` evaluates to false in this case because of the word boundary metacharacter `\b`. The `\b` asserts that the position it occupies is at the beginning or end of a word. In your example, the string "abcfeed" contains "fee" as part of a larger word, not as a separate word.

Since the regular expression is looking for "foo", "far", or "fee" as standalone words, it doesn't match the "fee" within the "abcfeed" string due to the surrounding characters.


# Matching Specific Points
Can you find the differences below? 

```Perl
if (/n/i) {
    # true if the $_ contains 'n' or 'N' anywhere
}

if (/^n/i) {
    # true $_ contains 'n' or 'N' at the start of the string 
    # recall that ^ has a different meaning within a character class []
}

if (/n$/i) {
    # true if $_ contains 'n' or 'N' char at the end of the string  
}

f (/[^n]/i) {
    # true if $_ does NOT contain any 'n' or 'N' characters at all
}
```

### Example with character class matching

```Perl
@names = qw(Karlson Carleon Karla Carla Karin Carina);

foreach (@names) { # no element is given, defaults to $_ 
    if (/[-a-eKCZ]arl[^sa]/) {
        print "Match! $_\n"; 
    }

    else {
        print "Sorry. $_\n"; 
    }
}

# couple of layers here...
#1. recall qw() is another way of initializing an array
#2. foreach has no element given, so every loop defaults to $_
#3. matching is also given no target string either via =~ or !~, so defaults to $_ 
#4. defaults to m/ matching
#5. [-a-eKCZ]arl[^sa]/ will match
## character class: hypen, a,b,c,d,e,K,C,Z
## then it must match 'arl'
## then it must not contain characters either starting with 's' or 'a' 
## So... Carleon is the only match... 'Carle'
```
```OUTPUT
Sorry. Karlson
Match! Carleon
Sorry. Karla
Sorry. Carla
Sorry. Karin
Sorry. Carina
```


# Negating the regex (!~) 
| Expression            | Description                                     | Example                |
|-----------------------|-------------------------------------------------|------------------------|
| `$_ !~ /[KC]arl/`     | Returns true if 'Karl' or 'Carl' is NOT in `$_` | True for 'Marla', false for 'Karl' or 'Carl' |
| `!/[KC]arl/`          | Alternative way to achieve the same result      | True for 'Marla', false for 'Karl' or 'Carl' |

# Grouping
Grouping allows you to look for a certain (or arbitrary) amount of something. 
- You can look for it at least *n* times
- At least *n* times but not more than *m* (range)
- 1 or more of something
- 0 or 1
- 0 or more

## Grouping Quantifiers
| Quantifier | Description                          | Example        |
|------------|--------------------------------------|----------------|
| `*`        | 0 or more times                      | a* (matches '', 'a', 'aa', 'aaa', ...) |
| `+`        | 1 or more times                      | a+ (matches 'a', 'aa', 'aaa', ...)     |
| `?`        | 0 or 1 time                          | a? (matches '', 'a')                   |
| `{n}`      | Exactly n times                      | a{3} (matches 'aaa')                   |
| `{n,}`     | At least n times                     | a{3,} (matches 'aaa', 'aaaa', ...)     |
| `{n,m}`    | At least n, but no more than m times | a{2,4} (matches 'aa', 'aaa', 'aaaa')   |


### Example + use of /x modifer 
```Perl
/-?\d+\.?\d*/ 

# -? ::: 0 or ONE dashes
# \d+ ::: [0-9] , 1 or more digits 
# \.? ::: wait.. I think this is 0 or 1 "decimal point"
# \d* ::: 0 or more digits 

#Recall the /x modifer! higher readability
/ -? \d+ \.? \d* /x 

```

### **paratheses may be used for grouping!**
```Perl
/fred+/ 
# this matches strings like fredddddddd 
# does not match fredfredfred

#use this instead to match fredfredfred
/(fred)+/ 
```


```Perl

$_ = "fred";

print "match\n" if (/(fred)+/); #output: match 

print "match\n" if (/(fred)*/); #output: match
#why??? 
# * group quantifier is 0 or more times. -- will match literally anything.  
```

## **Parantheses also give us a way to reuse part of the string directly in the match!!!!!!!!!!!**
- Back references `(\1, \2, \3)`

#### Example
```Perl
$_ = "abba"; 

if (/(.)\1/) { #\1 refers to the first grouping
    print "It matches with the first grouping.\n"; #no match for ab, but #match for bb 
}
```
```OUTPUT
It matches with the first grouping.
```

```Perl
$_ = "yabba dabba doo"; 

print "matches 1st option" if (/y(....)d\1/); # matches??? y(abba)(space_char) # no match

print "matches 2nd option" if (/y(.)(.)\2\1/) # matches??? y(a)(b)(b)(a) # match!
# \2 = b
# \1 = a
```
```OUTPUT
matches 2nd option
```

### using g{}, more readable way than \1
```Perl
$_ = "aa11bb";

print "1st print: matches" if (/(.)\111/); # matches??? yes! (a)(a)11, a little ambigious, but it works

print "2nd print: matches" if (/(.)\g{1}11/); # matches???  yes. 
#less ambigious # same 
#  use of g{1} refers to backreference of the first capturing group. 
```

```Perl
$_ = "racecarleelrotor";
if (/(.)(.)\g{2}\g{1}/g) {
    print "Match: $&\n";
}
```
```OUTPUT
Match: leel
```

#### **Another Example (combining some)** 
# Notice the lack of `g` in the `{}` 
```Perl
$_ = "AA AB AC AD AE"; 

if (m/^(\w+\W+){5}$/) {
    print "match!"; 
}
else {
    print "no match!"; 
}

# any amount of characters, [a-zA-Z0-9_]
# followed by any amount of white space/non_characters...? so like.. newline
# {} modifer for (), must repeat 5 times exactly
```
```OUTPUT
no match!
```

```Perl
$_ = "AA AB AC AD AE "; # added a space char, but in input files, would also be a newline char, so that would work too! 

if (m/^(\w+\W+){5}$/) {
    print "match!"; 
}
else {
    print "no match!"; 
}

# any amount of characters, [a-zA-Z0-9_]
# followed by any amount of white space/non_characters...? so like.. newline
# {} modifer for (), must repeat 5 times exactly
```
```OUTPUT
match!
```

```Perl
# match a starting word whose length is unknown
if (m/^\w+/) {
    print "match!\n"; 
}
else {
    print "no match!\n"; 
}

# matches any amount of characters [a-zA-Z0-9_]
# e.g., "QQQ", "AQQ", 
# will not match # " QQQ"
```

### storing a word into a buffer using grouping 
```Perl
$_ = "AAA BBB CCC"; 

if (m/(\w+)/) { # prints AAA
    print ("$1\n"); 
}
else {
    print "no match!\n"; 
}

# looks for first word in a string and stores it into first buffer ($1)
# which we can now access, given we used the grouping 
```


# capturing behavior
- only the grouping is stored. So in this case, even though the match is 'AA', 'BB', 'CC'. The array outputs A B C because of the grouping match.
- How do we fix this? Not sure. I tried wrapping the entire expression in a single paratheses; didn't work. 

- matching occurs fine as shown
```Perl

$_ = "AAA BBB CCC"; 

print "matched" if (m/(.)\1/g);  
# need to find repeated characters in a string 
# matches 'AA', 'BB', 'CC' #or does it...?! 
```
```OUTPUT
matched
```

- unintended array output. 
```Perl

$_ = "AAA BBB CCC"; 

@array1 = m/(.)\1/g; 
# need to find repeated characters in a string 
# matches 'AA', 'BB', 'CC' #or does it...?! 


print "@array1\n"; # Why?! grouping issue. 
```
```OUTPUT
A B C 
```

### other matching examples
```Perl

$_ = "AAA BBB CCC"; 

print "matched" if (m/^\s*(\w+)/); # notice the lack of /g, what effect? 

# match...
# any amount (0 or more) of white space at the beginning
# followed by  any number of characters 

# used to find the first word in a string 
```
```OUTPUT
matched 
```


# Saving Parts of a Match
- Parentheses allow you to save pieces of your match
	- If a match is successful, the item in paratheses gets stored in $1, $2, $3, etc according to their order
```Perl
$myvar =~ /System Configuration: (.*)/; 

#stores any non-new line character into $1 that is after "System Configuration: " 

```


```PErl
# we use '' instead of "" due to subsitution issues 
$_ = 'My email address is John@Yahoo.com.';

# Paren forces matches to $1, $2, etc
print "Found it! $1 at $2\n" if (/(john)\@(yahoo.com)/i); 

# non-targets default matches with $_
# (john) in brackets will be stored in $1 if matched 
# \@ ignores the @ subsitution (?)
# (yahoo.com) is stored in $2 if matched 
# /i is case insensitive modifier 
```
```OUTPUT
Found it! John at Yahoo.com
```


```Perl
$_ = 'My email address is <john@yahoo.com>!.'; 


#matches '<' then any character that is not '>' 
#the grouping prints out everything proceeding the < but precedes > 
if (/<([^>]+)/i) {
	print "Found it! $1\n";
}

```
```OUTPUT
Found it! john@yahoo.com
```


# Alteration/Alternatives? 
- The `|` character is used to specify alternative expressions. 
- Basically the OR logic operator. 

```Perl
m/\w|\w\w/ # match a single char or two consecutive word char
```


- This 'OR' works well with paratheses. 

```Perl
$class = mat374;

$class =~ /(mat374|mat375)/;

print "The class is $1";
```


