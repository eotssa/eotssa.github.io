---
title: 5.1.6 Matching Parentheses and HTML Tags with a stack
categories:
  - CPlusPlus
date: 2024-01-31 13:40:04
tags:
---

## 5.1.7 Matching Parentheses and HTML Tags

The basic idea behind checking that the grouping symbols in S match correctly, is to process the tokens in X in order. Each time we encounter an opening symbol, we push that symbol onto S, and each time we encounter a closing symbol, we pop the top symbol from the stack S (assuming S is not empty) and we check that these two symbols are of corresponding types. (For example, if the symbol “(” was pushed, the symbol “)” should be its match.)
If the stack is empty after we have processed the whole sequence, then the symbols in X match.

## Matching HTML tags

Step 1: read all html tags into a data structure of your choice (array, vector and linked list will work best)
Step 2: Use stack to check whether tags are balanced. Reuse the Stack that you developed in the 2nd assignment for this assignment

First, the procedure getHtmlTags reads the input line by line, extracts all the tags as strings, and stores them in a vector, which it returns.
Given the example shown in Figure 5.3(a), this procedure would return the following vector:
`<body>, <center>, <h1>, </h1>, </center>, . . . , </body>`

In Code Fragment 5.12, we employ a variable pos, which maintains the current position in the input line. We use the built-in string member function find to locate the first occurrence of “<” that follows the current position. (Recall the discussion of string operations from Section 1.5.5.) This tag start position is stored in the variable ts. We then find the next occurrence of “>,” and store this tag end position in te. The tag itself consists of the substring of length te−ts+1 starting at position ts. This is pushed onto the vector tags. We then update the current position to be te+1 and repeat until we find no further occurrences of “<.” This occurs when the find function returns the special value string::npos.

```C++
vector<string> getHtmlTags() {                                    // store tags in a vector
	vector<string> tags;                                          // vector of html tags
	while (cin) {                                                 // read until end of file
		string line;
		getline(cin, line);                                       // input a full line of text
		int pos = 0;                                              // current scan position
		int ts = line.find("<", pos);                             // possible tag start
		while (ts != string::npos) {                              // repeat until end of string
			int te = line.find(">", ts+1);                        // scan for tag end
			tags.push back(line.substr(ts, te−ts+1));             // append tag to the vector
			pos = te + 1;                                         // advance our position
			ts = line.find("<", pos);
		}
	}
	return tags; // return vector of tags
}
```

We create a stack, called S, in which we store the opening tags. We then iterate through the vector of tags. If the second character tag string is not “/,” then this is an opening tag, and it is pushed onto the stack. Otherwise, it is a closing tag, and we check that it matches the tag on top of the stack. To compare the opening and closing tags, we use the string substr member function to strip the first character off the opening tag (thus removing the “<”) and the first two characters off the closing tag (thus removing the “</”). We check that these two substrings are equal, using the built-in string function compare. When the loop terminates, we know that every closing tag matches its corresponding opening tag. To finish the job, we need to check that there were no unmatched opening tags. We test this by checking that the stack is now empty. Finally, the main program is presented in Code Fragment 5.14. It invokes the function getHtmlTags to read the tags, and then it passes these to isHtmlMatched to test them.

```C++
bool isHtmlMatched(const vector<string>& tags) {
	LinkedStack S;                                   // stack for opening tags
	typedef vector<string>::const iterator Iter;     // iterator type
                                                     // iterate through vector
	for (Iter p = tags.begin(); p != tags.end(); ++p) {
		if (p−>at(1) != ’/’)                         // opening tag?
			S.push(*p);                              // push it on the stack
		else { // else must be closing tag
			if (S.empty()) return false;                  // nothing to match - failure
			string open = S.top().substr(1);             // opening tag excluding ’<’
			string close = p−>substr(2);                 // closing tag excluding ’</’
			if (open.compare(close) != 0) return false;  // fail to match
			else S.pop(); // pop matched element
			}
    }
	if (S.empty()) return true; // everything matched - good
	else return false; // some unmatched - bad
}
```

Finally, the main program is presented in Code Fragment 5.14. It invokes the function getHtmlTags to read the tags, and then it passes these to isHtmlMatched to test them.

```C++
int main() { // main HTML tester
	if (isHtmlMatched(getHtmlTags())) // get tags and test them
		cout << "The input file is a matched HTML document." << endl;
	else
		cout << "The input file is not a matched HTML document." << endl;
}
```
