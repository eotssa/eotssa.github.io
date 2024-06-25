---
title: Perl Translation Operators
date: 2024-06-24 23:33:35
tags: 
categories:
  - IT
---
# translation operator (tr///)
- the translation operator is used to change **individual** characters in the $_ variable.
`tr/a/z/;` translates all 'a' characters to 'z' characters in the $_ .

## **if you specify mroe than one character in the match character list, you can translate multiple characters at a time, like this:** 

`tr/ab/z/;` # translates all 'a' and 'b' characters into the 'z' character

## **if the replacement list of characters is SHORTER than the target list of characters**, the last character in the replacement list is repeated as often as needed. 

```Perl
#!/usr/bin/perl

# Declare a string
my $string = "hello world!";

# Perform character transliteration
# Target list: "elw"
# Replacement list: "12"
$string =~ tr/elw/12/;

# Print the result
print "Modified string: $string\n"; # w -> 2 

```
```OUTPUT
Modified string: h122o 2or2d!
```

## However, if more than one replacement character is given for a matched character, only the first is used, like this: tr/WWW/ABC/; 

```Perl
#!/usr/bin/perl

# Declare a string
my $string = "WWWonderful WWWorld";

# Perform character transliteration
# Target list: "WWW"
# Replacement list: "ABC"
$string =~ tr/WWW/ABC/; # only W -> A is used 

# Print the result
print "Modified string: $string\n";
```
```OUTPUT
Modified string: AAAmazing AAAdorable
```

### Unlike the matching and substitution operators, the translation operator doesn't perform variable interpolation
- doesn't do the double quotes "" subsitution(?) 

# Options for Translation Operator 

| Option | Description |
|--------|-------------|
| c      | Complements the match character list. The translation is done for every character that does **not** match the character list. |
| d      | Deletes any character in the match list that does not have a corresponding character in the replacement list. |
| s      | Reduces repeated instances of matched characters to a single instance of that character. |

### /c option

```Perl
#!/usr/bin/perl

my $string = "AAA bbb AAA";

# Perform character transliteration with complement option
$string =~ tr/b/a/c;

# Print the result
print "Modified string: $string\n";
```
```OUTPUT
Modified string: aaaabbbaaaa
```

# /d option (delete) 
## if there is no replacement option, then /d will delete that value instead of doing a direct sub. 
```Perl
#!/usr/bin/perl

my $string = "AAA bbb AAA";

# Perform character transliteration with delete option
$string =~ tr/Ab/1/d; # replaces all 'A' and 'b' with 1, deletes rest. 

# Print the result
print "Modified string: $string\n";
```
```OUTPUT
Modified string: 111  111
```

# /s option (squeeze)
```Perl
my $string = "AAA bbb AAA";

# Perform character transliteration with squeeze option
$string =~ tr/A/1/s;

# Print the result
print "Modified string: $string\n";
```
```OUTPUT
1 bbb 1
```


```Perl
#!/usr/bin/perl

# Declare a string with repeated characters
my $string = "AAABBBAAACCCDDD";

# Perform character transliteration with the 's' option
# Target list: "ABCD"
# Replacement list: "1234"
$string =~ tr/ABCD/1234/s;

# Print the result
print "Modified string: $string\n";
```
```OUTPUT
```Modified string: 12134
```


### cont...

- Normally, if the match list is longer than the replacement list, the last character in the replacement list is used as the replacement for the extra characters. However, when the d option is used, the matched characters are simply deleted.





### More Examples
```Perl
$x = "'quoted words'";
$x =~ s/^'(.*)'$/$1/;

# must contain a beginning quote 
# followed by any number of characters
# and then end with an end quote 
# and sub that entire match with just the characters without the quotes

print "$x"; 
```
```OUTPUT
quoted words
```



- If the replacement list is empty, then no translation is done. The operator will still return the number of characters that matched, though. This is useful when you need to know how often a given letter appears in a string. This feature also can compress repeated characters using the s option.
- In the context of the tr/// operator in Perl, the period (.) is treated as a literal character, not a special character or a wildcard (any character) match as it would be in regular expressions. The tr/// operator performs character-by-character transliteration, and it doesn't recognize regular expression syntax or special characters.
	- **This is because tr/// isn't pattern matching!!!!**
```Perl
$y = "I'm fine. Thank you."; 
$count = ($y =~ tr/././); 
print $y, "\n";
print $count, "\n";
```
```OUTPUT
I'm fine. Thank you.
2
```

### Consider # `$count = ($y =~ s/././)` and # `$count = ($y =~ s/././g)`
```Perl
$y = "I'm fine. Thank you."; 
$count = ($y =~ s/././g); # pattern matching, (.) is a special character
print $y, "\n";
print $count, "\n";
```
```OUTPUT
Modified string: ................. 
Number of substitutions: 17
```


# More Examples of Regex
1. /[abc]|[123]/ -- matches a string that contains a character 