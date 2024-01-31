---
title: 5.1 Stack
categories:
  - CPlusPlus
date: 2024-01-31 13:34:39
tags:
---

### STL Stack

The Standard Template Library provides an implementation of a stack. The underlying implementation is based on the STL vector class, which is presented in Sections 1.5.5 and 6.1.4. In order to declare an object of type stack, it is necessary
to first include the definition file, which is called “stack.” As with the STL vector, the class stack is part of the std namespace, so it is necessary either to use “std::stack” or to provide a “using” statement. The stack class is templated with the class of the individual elements. For example, the code fragment below declares a stack of integers.

**_STL does not throw an exception if the user calls top() or pop() when the stack is empty, whereas our own implementation (below) does._** Even though no exception is thrown, it may very likely result in your program aborting. Thus, it is up to the programmer to be sure that no such illegal accesses are attempted.

(For example, s is a vector of integers, and e is an integer.)

```C++

#include <stack>
using std::stack; // make stack accessible
stack<int> myStack; // a stack of integers

size(): Return the number of elements in the stack.
empty(): Return true if the stack is empty and false otherwise.
push(e): Push e onto the top of the stack.
pop(): Pop the element at the top of the stack.
top(): Return a reference to the element at the top of the stack.
```

### Example of stack operation: Given the operations, what does the stack look like

### Note the difference between pop(), which does not return a value, and top(),

```C++
Operations  Output  Stack Contents
   push(5)    –          (5)
   push(3)    –          (5,3)
   pop()      –          (5)
   push(7)    –          (5,7)
   pop()      –          (5)
   top()      5          (5)
   pop()      –          ()
   pop()    “error”      ()
   top()    “error”      ()
   empty()    true       ()
   push(9)    –          (9)
   push(7)    –          (9,7)
   push(3)    –          (9,7,3)
   push(5)    –          (9,7,3,5)
   size()     4          (9,7,3,5)
   pop()      –          (9,7,3)
   push(8)    –          (9,7,3,8)
   pop()      –          (9,7,3)
   top()      3          (9,7,3)
```

###### Note about the keyword _\*\*const_

_- Member functions size(), top() and empty() use the const keyword to tell the compiler that they do not modify anything_

- top() returns a const reference to the top of the stack so that the object in the top can only be read, not written
- pop() does not return the object it removes. The user program needs to read the object using top() before removing it by calling pop()

### Our Stack Interface (not STL stack, which throws no exception)

```C++
template <typename E>
class Stack { // an interface for a stack
public:
	int size() const;                             // number of items in stack
	bool empty() const;                           // is the stack empty?
	const E& top() const throw(StackEmpty);       // the top element
	void push(const E& e);                        // push x onto the stack
	void pop() throw(StackEmpty);                 // remove the top element (does not return)
};
```

Observe that the member functions `size`, `empty`, and `top` are all declared to be **const**, which informs the compiler that they do not alter the contents of the stack.

- The member function top returns a constant reference to the top of the stack, which means that its value may be read but not written.

An error condition occurs when calling either of the functions pop or top on an empty stack.

- This is signaled by throwing an exception of type StackEmpty, which is defined in Code Fragment 5.2.

```C++
// Exception thrown on performing top or pop of an empty stack.
class StackEmpty : public RuntimeException {
public:
	StackEmpty(const string& err) : RuntimeException(err) {}
};

/* Exception thrown by functions pop and top when called on an empty stack. This class is derived from RuntimeException from Section 2.4. */
```

## 5.1.4 Array-Based Stack Implementation

- Since arrays start at index [0], `t` is initialized to -1. //`t = - 1` is used to identify when stack is empty.
- Likewise, `t + 1` is used to identify the number of elements in a stack.

## C++ Implementation of a Stack

- To keep the code simple, we have omitted the standard housekeeping utilities, such as a destructor, an assignment operator, and a copy constructor. We leave their implementations as an exercise.

```C++
template <typeName E>
class ArrayStack {
	enum { DEF_CAPACITY = 100};
public:
	ArrayStack(int cap = DEF_CAPACITY);           // constructor from capacity
	int size() const;                             // number of items in the stack
	bool empty() const;                           // is the stack empty?
	const E& top() const throw(StackEmpty);       // get top element
	void push(const E& e) throw(StackFull);       // push element onto stack
	void pop() throw(StackEmpty);                 // pop the stack
	// ... housekeeping functions omitted
private:
	E* S;                                         // member data
	int capacity;                                 // stack capacity
	int t;                                        // index of the top of the stack
};
/*Our class is templated with the element type, denoted by E. The stack’s storage, denoted S, is a dynamically allocated array of type E, that is, a pointer to E.*
```

**Default Arguements in Function Calls**

- In the consturctor, the desire capacity of the stack is its only argument.
  - If no arguement is given, the default value `DEF_CAPACITY` is used.
    - We use an enumeration to define this default capacity value. This is the simplest way of defining symbolic integer constants within a C++ class
      - `ArrayStack(int cap = DEF_CAPACITY);           // constructor from capacity`

```C++
template <typename E>
ArrayStack<E>::ArrayStack(int cap)                        // constructor from capacity
	: S(new E[cap]), capacity(cap), t(-1) { }

template <typename E>
int ArrayStack<E>::size() const
	{ return (t + 1); }

template <typename E>
bool ArrayStack<E>::empty() const
{ return (t < 0); }

template <typename E>
const E& ArrayStack<E>::top() const throw(StackEmpty) {
	if (empty()) throw StackEmpty("Top of empty stack");
	return S[t];
}

template <typename E>
void ArrayStack<E>::push(const E& e) throw(StackFull) {
	if (size() == capacity) throw StackFull("Push to full stack");
	S[++t] = e;
}

template <typename E>
void ArrayStack<E>::pop() throw (StackEmpty) {
	if (empty()) throw StackEmpty("Pop from empty stack");
	--t;
}



```

## The instance A is a stack of integers of the default capacity (100). The instance B is a stack of character strings of capacity 10.

```C++
ArrayStack<int> A;                               // A = [ ], size = 0
A.push(7);                                       // A = [7*], size = 1
A.push(13);                                      // A = [7, 13*], size = 2
cout << A.top() << endl; A.pop();                // A = [7*], outputs: 13
A.push(9);                                       // A = [7, 9*], size = 2
cout << A.top() << endl;                         // A = [7, 9*], outputs: 9
cout << A.top() << endl; A.pop();                // A = [7*], outputs: 9


ArrayStack<string> B(10);                        // B = [ ], size = 0
B.push("Bob");                                   // B = [Bob*], size = 1
B.push("Alice");                                 // B = [Bob, Alice*], size = 2
cout << B.top() << endl; B.pop();                // B = [Bob*], outputs: Alice
B.push("Eve");                                   // B = [Bob, Eve*], size = 2
```

### An application may need more space than this, in which case our stack implementation might “crash” if too many elements are pushed onto the stack

Fortunately, there are other implementations that do not impose an arbitrary size limitation. One such method is to use the STL stack class, which was introduced earlier in this chapter. The STL stack is also based on the STL vector class, and it offers the advantage that it is automatically expanded when the stack overflows its current storage limits. In practice, the STL stack would be the easiest and most practical way to implement an array-based stack. - In instances where we have a good estimate on the number of items needing to go in the stack, the array-based implementation is hard to beat from the perspective of speed and simplicity. Stacks serve a vital role in a number of computing applications, so it is helpful to have a fast stack ADT implementation, such as the simple array-based implementation.

## span2 Function

```C++
int spans2(int x[], n) {
	int S[n];
	ArrayStack<int> A;
	for (int i = 0; i <= n - 1; i++) {
		while (!A.empty() && X[A.top()] <= X[i]) {
			A.pop();
		}
	if (A.empty())
		S[i] = i + 1;
	else
		S[i] = i - A.top();

	A.push(i);
	}

	return s;
}


```
