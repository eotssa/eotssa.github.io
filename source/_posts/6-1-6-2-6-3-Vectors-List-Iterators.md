---
title: 6.1, 6.2, 6.3 Vectors, List, Iterators
categories:
  - CPlusPlus
date: 2024-01-31 13:43:51
tags:
---

## Vectors

- Vector is a sequential data structure that supports access to its elements by its indices
- A vector is also called an array list
- Vector elements can be accessed just like an array
- Unlike arrays, the size of vectors can be increased dynamically

### Vector ADT operations

In all cases, the index parameter i is assumed to be in the range `0 ≤ i ≤ size()−1`

`at(i)`: Return the element of V with index i; an error condition occurs if i is out of range.

`set(i,e)`: Replace the element at index i with e; an error condition occurs if i is out of range.

`insert(i,e)`: Insert a new element e into V to have index i; an error condition occurs if i is out of range.

`erase(i)`: Remove from V the element at index i; an error condition occurs if i is out of range.

| Operation   | Output  | V           |
| ----------- | ------- | ----------- |
| insert(0,7) |         | (7)         |
| insert(0,4) |         | (4,7)       |
| at(1)       | 7       | (4,7)       |
| insert(2,2) |         | (4,7,2)     |
| at(3)       | "error" | (4,7,2)     |
| erase(1)    |         | (4,2)       |
| insert(1,5) |         | (4,5,2)     |
| insert(1,3) |         | (4,3,5,2)   |
| insert(4,9) |         | (4,3,5,2,9) |
| at(2)       | 5       | (4,3,5,2,9) |
| set(3,8)    |         | (4,3,5,8,9) |

## Array based vector implementation

##### Algorithm for array based vector implementation

```PlainText
Algorithm insert(i,e):
	for j = n−1,n−2,...,i do
		A[j +1] ← A[ j]      {make room for the new element}
	A[i] ← e
	n ← n+1

Algorithm erase(i):
	for j = i+1,i+2,...,n−1 do
		A[ j −1] ← A[ j]     {fill in for the removed element}
	n ← n−1
```

### This array replacement strategy is known as an extendable array.

Of course, in C++ (and most other programming languages) we cannot actually grow the array A; its capacity is fixed at some number N, as we have already observed. Instead, when an overflow occurs, that is, when n = N and function insert is called, we perform the following steps:

1. Allocate a new array B of capacity N
2. Copy A[i] to B[i], for `i=0,...,N-1`
3. Deallocate A and reassign A to point to the new array B.

## C++ Implementation of ArrayVector

#### Reason for Overloaded [] Operator

https://www.learncpp.com/cpp-tutorial/overloading-the-subscript-operator/
Our class definition differs slightly from the operations given in our ADT. For example, we provide two means for accessing individual elements of the vector. The first involves overriding the C++ array index operator (“[ ]”), and the second is the at function.

The two functions behave the same, except that the `at` function performs a range test before each access. (Note the similarity with the STL vector class given in Section 6.1.4.) If the index i is not in bounds, this function throws an exception.
**Because both of these access operations `return a reference`, there is no need to explicitly define a set function. Instead, we can simply use the assignment operator. For example, the ADT function `v.set(i,5)` could be implemented either as `v[i] = 5` or, more safely, as `v.at(i) = 5`.**

### Constructor, ADTs, new `reserve()` function, and housekeeping functions

- The member data for class ArrayVector consists of the array storage A, the current number n of elements in the vector, and the current storage capacity.

- The class ArrayVector also provides the ADT functions insert and remove. We discuss their implementations below.

- We have added a new function, called `reserve`, that is not part of the ADT. This function allows the user to explicitly request that the array be expanded to a capacity of a size at least n. If the capacity is already larger than this, then the function does nothing.

- Even though we have not bothered to show them, the class also provides some of the standard housekeeping functions. These consist of a copy constructor, an assignment operator, and a destructor. Because this class allocates memory, their inclusion is essential for a complete and robust class implementation. We leave them as an exercise (R-6.6). We should also add versions of the indexing operators that return constant references.

- When the vector is constructed, we do not allocate any storage and simply set A to NULL. Note that the first attempt to add an element results in array storage being allocated.

```C++
typedef int Elem;
class ArrayVector {
public:
	ArrayVector();
	int size() const;                                  // number of elements
	bool empty() const;                                // is vector empty?
	Elem& operator[](int i);                           // element at index
	Elem& at(int i) throw(IndexOutOfBounds);           // element at index
	void erase(int i);                                 // remove element at index
	void insert(int i, const Elem& e);                 // insert element at index
	void reserve(int N);                               // reserves at least N spots
	//...(housekeeping functions omitted)
private:
	int capacity;                                      // current array size
	int n;                                            // number of elements in a vector
	Elem* A;                                          // array storing the elements
};

ArrayVector::ArrayVector()
	: capacity(0), n(0), A(NULL) { }

int ArrayVector::size() const                        // number of elements, n
	{ return n; }

bool ArrayVector::empty() const                      // is vector empty?
	{return size() == 0; }

Elem& ArrayVector::operator[](int i)                 // element at index
	{ return A[i]; }

Elem& ArrayVector::at(int i) throw(IndexOutOfBounds) {
	if (i < 0 || i >= n)
		throw IndexOutOfBounds("illegal index in function at()");
	return A[i];

//it removes an element at index i by shifting all subsequent elements from index i+1 to the last element of the array down by one position.
void ArrayVector::erase(int i) {
	for (int j = i + 1; j < n; j++)
		A[j - 1] = A[j];          //shifts element down (or the the "left", conventionally speaking)
	n--;
}

//reserve function first checks whether the capacity already exceeds n, in which case nothing needs to be done. Otherwise, it allocates a new array B of the desired sizes, copies the contents of A to B, deletes A, and makes B the current array.
void ArrayVector::reserve(int N) {                   // reserves N spots
	if (capacity >= N) return;                       // already big enough

	Elem* B = new Elem[N];                           // allocate bigger array, dynamically
	for (int j = 0; j < n; j++)                      // copy contents to new array
		B[j] = A[j];
	if (A != NULL) delete [] A;                      // discard old array

	A = B;                                           // make B the new array, through A = B. Need copy constructor(?)
	capacity = N;                                    // set new capacity
}

void ArrayVector::insert(int i, const Elem* e) {
	if (n >= capacity)
		reserve(max(1, 2 * capacity));                 //what the fuck is max?
	for (int j = n - 1; j >= i; j--)
		A[j+1] = A[j];
	A[i] = e;
	n++;
}

}
```

## STL Vector

A **container** is a data structure that stores a collection of objects.
Many of the data structures that we study later in this book, such as stacks, queues, and lists, are examples of STL containers.
The class vector is perhaps the most basic example of an STL container class.
The definition of class vector is given in the system include file named “vector.”

```C++
#include <vector> // provides definition of vector
using std::vector; // make vector accessible

vector<int> myVector(100); // a vector with 100 integers
```

- Members can be accessed using the index operator `[]` or using the `at()` function. However, only the `at()` function does range check.
- Vectors can be dynamically resized.
- Vectors can _efficiently_ append and remove elements at the end of an array.
- STL vector objects are automatically destroyed via its destructor for each of its elements. (With C++ arrays, it's manual)

### STL vectors have a number of useful functions that operate on the entire vector (not individual elements)

- Most of these use copy constructors (e.g., push_back())

```C++
vector(n): Construct a vector with space for n elements; if no argument is given, create an empty vector.

size(): Return the number of elements in V.

empty(): Return true if V is empty and false otherwise.

resize(n): Resize V, so that it has space for n elements.

reserve(n): Request that the allocated storage space be large enough
to hold n elements.

operator[i]: Return a reference to the ith element of V.

at(i): Same as V[i], but throw an out-of-range exception if i is
out of bounds, that is, if i < 0 or i ≥ V.size().

front(): Return a reference to the first element of V.

back(): Return a reference to the last element of V.

push_back(e): Append a copy of the element e to the end of V, thus
increasing its size by one.

pop_back(): Remove the last element of V, thus reducing its size by
one.

```

## Differences between ArrayVector and STL Vector

1. One difference is that the STL constructor allows for an arbitrary number of initial elements, whereas our ArrayVect constructor always starts with an empty vector.

2. The STL vector functions V.front() and V.back() are equivalent to our functions V[0] and V[n−1], respectively, where n is equal to V.size().

3. The STL vector functions V.push back(e) and V.pop back() are equivalent to our ArrayVect functions V.insert(n,e) and V.remove(n − 1), respectively
