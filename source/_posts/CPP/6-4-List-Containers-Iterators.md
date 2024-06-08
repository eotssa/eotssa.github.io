---
title: 6.4  List, Containers, Iterators
categories:
  - CPlusPlus
date: 2024-01-31 13:47:12
tags:
---

## Containers and Positions

https://www.youtube.com/watch?v=wEa_ix6G2-o&ab
https://www.youtube.com/watch?v=TxufBysSPK0&ab_channel=iamcanadian1867 (This is the best one)

- Iterators provide a uniform interface for accessing data--regardless of how the data is laid out in memory.

To abstract and unify the different ways of storing elements in the various implementations of a list, we introduce a data type that abstracts the notion of the relative position or place of an element within a list. Such an object might naturally be called a **position**.
Because we want this object not only to access individual elements of a list, but also to move around in order to enumerate all the elements of a list, we adopt the convention used in the C++ Standard Template Library, and call it an **iterator**.

A **container** is a data structure that stores any collection of elements. We assume that the elements of a container can be arranged in a linear order.
A **position** is defined to be an abstract data type that is associated with a **particular** container and which supports the following function.

A position is always defined in a relative manner, that is, in terms of its neighbors.
Unless it is the first or last of the container, a position `q` is always “after” some position `p` and “before” some position `r`.
`p--q--r--s`

- A position q, which is associated with some element e in a container, does not change, even if the index of e changes in the container, unless we explicitly remove e. - Moreover, the position q does not change even if we replace or swap the element e stored at q with another element.
  (This means the iterator is separate from the object...(?)).

### Iterators

Although a **position** is a useful object, **it would be more useful still to be able to navigate through the container**, for example, by advancing to the next position in the container. Such an object is called an **iterator**. - An iterator is an extension of a position. - It supports the ability to access a node’s element, but it also provides the ability to navigate forwards (and possibly backwards) through the container

A container is an abstract data structure that supports element access through iterators

```PlainText
- begin(): returns an iterator to the first element
- end(): return an iterator to an imaginary position just after the last element

An iterator behaves like a pointer to an element
- *p: returns the element referenced by this iterator
- ++p: advances to the next element
```

    ###### Vector vs. List (not in ppt)

"Vector in C++ is nothing but a container to store the elements in the computer memory. It is implemented as a dynamic array internally which can resize itself upon the successful insertion and deletion of elements. As it is implemented as an array so the elements are stored in the contiguous memory locations and can be traversed easily using the iterator and accessed through random access by providing the index. Default memory is pre-allocated for the array in case of working with the Vector. Insertion of an element in the Vector by default takes place at the end of an array.

List in C++ is also a container (data structure) and stores the elements in non-contiguous memory locations. List implements the doubly linked list to store the elements having the address (pointed out by the pointers) for the next and previous elements in order for the easy backward and forward traversal. For every new insertion of the element, memory is dynamically allocated and is linked with the nodes of other elements through pointers. So there is no need for the default memory allocation in the case of List.""

### 6.2.2 The List ADT

https://www.youtube.com/watch?v=HdFG8L1sajw
This ADT supports the following functions for a list `L` and an iterator `p` for this list

```C++
##Iterators:
begin(): Return an iterator referring to the first element of L; same as end() if L is empty.

end(): Return an iterator referring to an imaginary element just after the last element of L.

##Update Methods
insertFront(e): Insert a new element e into L as the first element.

insertBack(e): Insert a new element e into L as the last element.

eraseFront(): Remove the first element of L.

eraseBack(): Remove the last element of L.

##Iterator-based updates
insert(p,e): Insert a new element e into L before position p in L.

erase(p): Remove from L the element at position p; invalidates p as a position.


```

The functions insertFront(e) and insertBack(e) are provided as a convenience.
Similarly, eraseFront and eraseBack can be performed by the more general function erase.

```C++
insertFront(e) // insert(L.begin(), e)         //same thing

insertback(e) // insert(L.end(), e)            //same thing
```

An error condition occurs if an invalid position is passed as an argument to one
of the list operations. Reasons for a position p to be invalid include:
• p was never initialized or was set to a position in a different list
• p was previously removed from the list
• p results from an illegal operation, such as attempting to perform ++p, where `p = L.end()`, that is, attempting to access a position beyond the end position.

We do not check for these errors in our implementation. Instead, it is the responsibility of the programmer to be sure that only legal positions are used.

| Operation      | Output  | L         |
| -------------- | ------- | --------- |
| insertFront(8) | -       | (8)       |
| p = begin()    | p : (8) | (8)       |
| insertBack(5)  | -       | (8,5)     |
| q = p; ++q     | q : (5) | (8,5)     |
| p == begin()   | true    | (8,5)     |
| insert(q,3)    | -       | (8,3,5)   |
| \* q = 7       | -       | (8,3,7)   |
| insertFront(9) | -       | (9,8,3,7) |
| eraseBack()    | -       | (9,3,8)   |
| erase(p)       | -       | (9,3)     |
| eraseFront()   | -       | (3)       |

For these operations, pay attention to where p is. Even though insertFront() happened, it doesn't change the position of the iterator `p`, which was originally at 8.

## 6.2.3 Doubly Linked List Implementation (List / NodeList)

### Iterator Implementation

- Our iterator object is called Iterator.
- To users of class NodeList, it can be accessed by the qualified type name NodeList::Iterator
- Its definition is placed in the public part of NodeList
- An element associated with an iterator can be accessed by overloading the dereferencing operator, `*`.
- In order to make it possible to compare iterator objects, we overload the == and != operators
- We provide the ability to move forward or backward in the list by providing the increment and decrement operators (“++” and “– –”)

- We declare NodeList to be a friend class in the Iterator so that it may access the private members of Iterator
- The private data member of Iterator class consists of a pointer v to the associated node of the list
- A private constructor in Iterator initializes the node pointer
- The constructor is private so that only NodeList is allowed to create new iterators

```C++
struct Node {
	Elem elem;
	Node *prev;
	Node* next;
};
```

```C++
class Iterator {
public:
	Elem& operator*();               //reference to the element

	bool operator==(const Iterator& p) const;            //compare positions
	bool operator!=(const Iterator& p) const;
	Iterator& operator++();                              //move to next position
	Iterator& operator--();                              //move to previous position
	friend class NodeList;                               //give NodeList access
private:
	Node* v;                                             //pointer to the node
	Iterator(Node* u);                                   //create from node
 };

NodeList::Iterator::Iterator(Node* u)                    //constructor fron Node*
	{ v = u; }

Elem& NodeList::Iterator::operator*()
	{ return v->elem; }

bool NodeList::Iterator::operator==(const Iterator& p) const
	{ return v == p.v; }

bool NodeList::Iterator::operator!=(const Iterator& p) const
	{ return v!= p.v; }

NodeList::Iterator& NodeList::Iterator::operator++()
	{ v = v->next; return *this; }

NodeList::Iterator& NodeList::Iterator::operator--()
	{ v = v->prev; return *this; }
```

Observe that the increment and decrement operators not only update the position, but they also return a reference to the updated position. This makes it possible to use the result of the increment operation, as in “`q = ++p`”.

```C++
typedef int Elem;               //list base element type
class NodeList {                //node-based list
private:
	//insert Node declaration here...
public:
	//insert Iterator declaration here...
public:
	NodeList();
	int size() const;                     // list size
	bool empty() const;                   // is the list empty?
	Iterator begin() const;               // beginning position
	Iterator end() const;                 // (just beyond) last position
	void insertFront(const Elem& e);      // insert at front
	void insertBack(const Elem& e);       // insert at rear
	void insert(const Iterator& p, const Elem& e);  // insert e before p
	void eraseFront();                    // remove first
	void eraseBack();                     // remove last
	void erase(const Iterator& p);        // remove p
	// housekeeping functions (destructor, etc) omitted...
private:
	int n;                                // number of items, used to implement size() efficiently
	Node* header;                         // head of list sentinel
	Node* trailer; 	                      // tail of list sentinel
};
```

```C++
NodeList::NodeList() {
	n = 0;
	header = new Node;               //create sentinels
	trailer = new Node;
	header->next = trailer;          //point them to each other
	trailer->prev = header;
}

int NodeList::size() const                      // list size
	{ return n; }

bool NodeList:: empty() const                   // is the list empty?
	{ return (n == 0); }

NodeList::Iterator NodeList::begin() const      // begin position is first item -- I don't understand the syntax
	{ return Iterator(header->next); }

NodeList::Iterator NodeList::end() const
	{ return Iterator(trailer); }               // end position is just beyond the last item
```

```C++
//insert e before p
void NodeList::insert(const NodeList::Iterator& p, const Elem& e) {
	Node* w = p.v;                   // p's node
	Node* u = w->prev;               // p's prececessor
	Node* v = new Node;              // new node to insert
	v->elem = e;
	v->next = w; w->prev = v;        // link in v before w
	v->prev = u; u->next = v;        // link in v after u
	n++;
}

void NodeList::insertFront(const Elem& e) //insert at beginning of list
	{ insert(begin(), e); }

void NodeList::insertBack(const Elem& e) //insert at rear (trailer)
	{ insert(end(), e); }
```

## STL Iterators in C++

STL list is implemented as a doubly linked list.

```C++
#include <list>
using std::list; // make list accessible
list<float> myList; // an empty list of float
```

Note that, when the base type of an STL vector is class object, all copying of elements (for example, in push back) is performed by invoking the base class’s copy constructor. Whenever elements are destroyed (for example, by invoking the destroyer or the pop back member function) the class’s destructor is invoked on each deleted element

##### STL Functions

`push_front()` is equal to `insertFront()`
`push_back()` is equal to `insertBack()
`pop_front()`is equal to`eraseFront()`
`pop_back()`is equal to`eraseBack()`

```C++
list(n): Construct a list with n elements; if no argument list is given, an empty list is created.

size(): Return the number of elements in L.

empty(): Return true if L is empty and false otherwise.

front(): Return a reference to the first element of L.

back(): Return a reference to the last element of L.

push_front(e): Insert a copy of e at the beginning of L.

push_back(e): Insert a copy of e at the end of L.

pop_front(): Remove the fist element of L.

pop_back(): Remove the last element of L
```

## 6.2.5 STL Containers and Iterators

https://www.youtube.com/watch?v=TxufBysSPK0&ab_channel=iamcanadian1867 (This is the best one)
Recall that a container is a data structure that stores a collection of elements.

#### STL Containers

| STL Containers     | Description               |
| ------------------ | ------------------------- |
| Vector             | Vector                    |
| deque              | Double ended queue        |
| list               | List (doubly linked list) |
| stack              | Last in, first-out        |
| queue              | First in, first out queue |
| priority_queue     | priority queue            |
| set (and multiset) | Set (and multiset)        |
| map (and multimap) | Map (and multi-key map)   |

Different containers organize their elements in different ways, and hence support different methods for accessing individual elements. STL iterators provide a relatively uniform method for accessing and enumerating the elements stored in containers.

### Example: Summing elements in a vector without an interator

```C++
int vectorSum1(const vector<int>& V) {
	int sum = 0;
	for (int i = 0; i < V.size(); i++)
		sum += V[i];
	return sum;
}
```

Unfortunately, this method would not be applicable to other types of containers, because it relies on the fact that the elements of a vector can be accessed efficiently through indexing. This is not true for all containers, such as lists. What we desire is a uniform mechanism for accessing elements.

### Example: Summing elements in a vector with an iterator

- Suppose, for example, that C is of type vector.
  - The associated iterator type is denoted “`vector<int>::iterator`.”
    - In general, the iterator type would be denoted: `cont<base>::iterator`

```C++
int vectorSum2(vector<int> V) {
	typedef vector<int>::iterator Iterator;
	int sum = 0;
	for (Iterator p = V.begin(); p != V.end(); ++p)
		sum += *p;
	return sum;
}
```

Although this approach is less direct than the approach based on indexing individual elements, it has the advantage that it can be applied to any STL container class, not just vectors.

## Types of Iterators

| Iterator Type          | Description                                           | Extra Information |
| ---------------------- | ----------------------------------------------------- | ----------------- |
| Bidirectional Iterator | supports both ++p and --p                             | Lists, Sets, Maps |
| Random-access Iterator | supports any addition and subtraction (p + i), (p - i | Vectors, deque    |
| const_iterator         | provides read only access to elements                 |                   |
| iterator               | allows both read-write access to elements             |                   |

### Each STL container type C supports iterators

- C::iterator – read/write iterator type
- C::const_iterator – read-only iterator type
- C.begin(), C.end() – return start/end iterators
- p+i and p-i is supported by some containers

### Const Iterators

Look at the following code:

```C++
int vectorSum2(vector<int> V) {
	typedef vector<int>::iterator Iterator;
	int sum = 0;
	for (Iterator p = V.begin(); p != V.end(); ++p)
		sum += *p;
	return sum;
}
```

- Recall, it's more efficient to pass a vector by a constant reference: `const vector<int>&`
  - However, many STL implementations will generate an error if we attempt to use a regular iterator, since it may lead to an _attempt_ to modify the vector's contents.
    - The solution is a **_const iterator_**. This results in the iterator being able to read values by dereferencing the iterator, but not possible to assign it a value.

```C++
int vectorSum3(const vector<int>& V) {
	typedef vector<int>::const_iterator ConstIterator;        //iterator type
	int sum = 0;
	for (ConstIterator p = V.begin(); p != V.end(); ++p)
		sum += *p;
	return sum;
}
```

# Types of Containers

| Container Type       | Description                      | Extra                   |
| -------------------- | -------------------------------- | ----------------------- |
| Sequence container   | store elements in order          | vector, list, deque     |
| associated container | accessed by associated key value | set, multiset, multimap |

## Iterator-based container functions:

- A convention with iterator ranges is that it starts with p and ends **_just prior_** to q. - `V(p,q)`, `assign(p,q)`, `erase(p,q)`
  Let V be an STL vector of some given base type, and let e be an object of this base type. Let p and q be iterators over this base type, both drawn from the same container.

```C++
vector(p,q): Construct a vector by iterating between p and q, copying each of these elements into the new vector.

assign(p,q): Delete the contents of V, and assigns its new contents by iterating between p and q and copying each of these elements into V.

insert(p,e): Insert a copy of e just prior to the position given by iterator p and shifts the subsequent elements one position to the right.

erase(p): Remove and destroy the element of V at the position given by p and shifts the subsequent elements one position to the left.

erase(p,q): Iterate between p and q, removing and destroying all these elements and shifting subsequent elements to the left to fill the gap.

clear(): Delete all these elements of V.

```

```C++
*p: access current element

++p, --p: advance to next/previous element

C.assign(p, q): replace C with contents referenced by the iterator range [p, q) (from p up to, but not including, q)

insert(p, e): insert e prior to position p

erase(p): remove element at position p

erase(p, q): remove elements in the iterator range [p, q)

```

### Extra: Worthile to Mention

It is worthwhile noting that, in the constructor and assignment functions, the iterators p and q do not need to be drawn from the same type of container as V, as long as the container they are drawn from has the same base type. For example, suppose that L is an STL list container of integers. We can create a copy of L in the form of an STL vector V as follows:

```C++
list<int> L; // an STL list of integers
// . . .
vector<int> V(L.begin(), L.end()); // initialize V to be a copy of L

```

### Using vector(p,q) to initialize contents of an STL container from a standard C++ array

- Recall pointer arithmetic. A[] points to A[0]. A + 1 points to A[1], etc.
- Even though pointers A and (A + 5) are not STL iterators, they essentially behave as they were. The same trick can be used to initialize any STL **sequence** containers.

```C++
int A[ ] = {2, 5, −3, 8, 6}; // a C++ array of 5 integers
vector<int> V(A, A+5); // V = (2, 5, -3, 8, 6)
```

## STL Vectors and Algorithms (not in ppt)

```C++
sort(p,q): Sort the elements in the range from p to q in ascending order. It is assumed that less-than operator (“<”) is defined for the base type.

random shuffle(p,q): Rearrange the elements in the range from p to q in random order.

reverse(p,q): Reverse the elements in the range from p to q.

find(p,q,e): Return an iterator to the first element in the range from p to q that is equal to e; if e is not found, q is returned.

min element(p,q): Return an iterator to the minimum element in the range from p to q.

max element(p,q): Return an iterator to the maximum element in the range from p to q.

for each(p,q, f): Apply the function f the elements in the range from p to q.

```

### An Illustrative Example

```C++
#include <cstdlib> // provides EXIT SUCCESS
#include <iostream> // I/O definitions
#include <vector> // provides vector
#include <algorithm> // for sort, random shuffle

using namespace std; // make std:: accessible

int main () {
	int a[ ] = {17, 12, 33, 15, 62, 45};
	vector<int> v(a, a + 6);                          // v: 17 12 33 15 62 45
	cout << v.size() << endl;                         // outputs: 6
	v.pop back();                                     // v: 17 12 33 15 62
	cout << v.size() << endl;                         // outputs: 5
	v.push back(19);                                  // v: 17 12 33 15 62 19
	cout << v.front() << " " << v.back() << endl;     // outputs: 17 19
	sort(v.begin(), v.begin() + 4);                   // v: (12 15 17 33) 62 19
	v.erase(v.end() − 4, v.end() − 2);                // v: 12 15 62 19
	cout << v.size() << endl;                         // outputs: 4


	char b[ ] = {’b’, ’r’, ’a’, ’v’, ’o’};
	vector<char> w(b, b + 5);                        // w: b r a v o
	random shuffle(w.begin(), w.end());              // w: o v r a b
	w.insert(w.begin(), ’s’);                        // w: s o v r a b


	for (vector<char>::iterator p = w.begin(); p != w.end(); ++p)
	cout << *p << " ";                               // outputs: s o v r a b
	cout << endl;
	return EXIT SUCCESS;
}
```
