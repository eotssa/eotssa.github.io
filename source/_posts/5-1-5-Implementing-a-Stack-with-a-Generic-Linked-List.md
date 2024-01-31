---
title: 5.1.5 Implementing a Stack with a Generic Linked List
categories:
  - CPlusPlus
date: 2024-01-31 13:38:54
tags:
---

## Implementing a Stack with a Generic Linked List

```C++
typedef string Elem;                           // stack element type
class LinkedStack {                            // stack as a linked list
public:
LinkedStack();                                 // constructor
int size() const;                              // number of items in the stack
bool empty() const;                            // is the stack empty?
const Elem& top() const throw(StackEmpty);     // the top element
void push(const Elem& e);                      // push element onto stack
void pop() throw(StackEmpty);                  // pop the stack
private: // member data
SLinkedList<Elem> S;                           // linked list of elements
int n;                                         // number of elements
};
```

The principal data member of the class is the generic linked list of type Elem, called S. Since the SLinkedList class does not provide a member function size, we store the current size in a member variable, n.

### Code Fragment 5.8: Constructor and size functions for the LinkedStack class.

Our constructor creates the initial stack and initializes n to zero. We do not provide an explicit destructor, relying instead on the SLinkedList destructor to deallocate the linked list S.

```C++
LinkedStack::LinkedStack()
	: S(), n(0) { } // constructor

int LinkedStack::size() const
	{ return n; } // number of items in the stack

bool LinkedStack::empty() const
	{ return n == 0; } // is the stack empty?
```

### Code Fragment 5.9: definitions of the stack operations, top, push, and pop

Which side of the list, head or tail, should we choose for the top of the stack? Since SLinkedList can insert and delete elements in constant time only at the head, the head is clearly the better choice. Therefore, the member function top returns S.front(). The functions push and pop invoke the functions addFront and removeFront, respectively, and update the number of elements.

```C++
// get the top element
const Elem& LinkedStack::top() const throw(StackEmpty) {
	if (empty()) throw StackEmpty("Top of empty stack");
	return S.front();
}

// push element onto stack
void LinkedStack::push(const Elem& e) {
	++n;
	S.addFront(e);
}

// pop the stack
void LinkedStack::pop() throw(StackEmpty) { if (empty()) throw StackEmpty("Pop from empty stack");
	−−n;
	S.removeFront();
}
```

## 5.1.6: Reversing a Vector using Stack

We can use a stack to reverse the elements in a vector, thereby producing a non-recursive algorithm for the array-reversal problem introduced in Section 3.5.1.

The basic idea is to

1. Push all the elements of the vector in order into a stack.
2. Then fill the vector back up again by popping the elements off of the stack.

```C++
template <typename E>
void reverse(vector<E>& V) {
	ArrayStack<E> S(V.size));
	for (int i = 0; i < V.size(); i++)   //push elements onto a stack
		S.push(V[i]);
	for (int i = 0; i < V.size(); i++) { //copy then pop in reverse order
		V[i] = S.top();
		S.pop();
	}
}

```
