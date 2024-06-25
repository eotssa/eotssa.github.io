---
title: Perl Substitution Operators
date: 2024-06-24 23:33:03
tags: 
categories:
  - IT
---
# Searching and Replacing 
| Operator        | Syntax             | Description                  |
|-----------------|--------------------|------------------------------|
| Match Operator  | `/PATTERN/`        | Match the given pattern      |
| Match Operator  | `m/PATTERN/`       | Match the given pattern      |
| Search & Replace| `s/PATTERN/REPLACE/`| Search and replace the pattern |
| Char. S&R       | `tr/searchlist/replacelist/`| Character search and replace|
| Split           | `split(/PATTERN/, $line)` | Split on regex pattern  |


# The Substitution Operator (s///)
- The substitution operator (s///) is used to change strings


## IMPORTANT* : **looks like the original text is replaced, and actually the $result simply stores the NUMBER of substitutions made, not the actual result. **
```Perl
$needToReplace = "bbb";
$replacementText = "1234567890";

$_ = "AAA bbb AAA";

$result = s/$needToReplace/$replacementText/; 

print $_; print "\n";

print $result; # notice how this is '1'. why? 
```
```OUTPUT
AAA 1234567890 AAA
1
```


Options for Substitution Operator

| Option | Description |
|--------|-------------|
| e      | Forces Perl to evaluate the replacement pattern as an expression |
| g      | Replaces all occurrences of the pattern in the string |
| i      | Ignores the case of characters in a string |
| m      | Treats string as multiple lines (any `\n` will be the end of a single match) |
| s      | Treats string as a single line (treats `\n` as any other character) |
| o      | Compiles pattern only once |
| x      | Allows for extended regular expressions (ignores white spaces within the / /) |

```Perl
$_ = "home, sweet home!"; 
s/home/cave/g; #no target results to default target

print "$_\n"; # output: cave, sweet cave!
```
```OUTPUT
cave, sweet cave!
```

removing excessive whitespaces
```Perl
$_ = "   Input    data\t may have      extra whitespace. "; 
print "$_\n";

s/\s+/ /g;

# replaces all white space with a single whitespace
print "$_\n"; # output: " Input data may have extra whitespace."

# remove the whitespace in the beginning
s/^\s+//; # replaces 1 or more leading whitespaces with nothing 

print "$_\n";
```
```OUTPUT
   Input    data         may have      extra whitespace. 
 Input data may have extra whitespace.
Input data may have extra whitespace.
```
