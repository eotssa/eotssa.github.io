---
title: Quick Rundown on C++ Pointers
categories:
  - CPlusPlus
date: 2024-01-31 13:19:35
tags: pointers
---

## Pointer Basics

A pointer is a variable whose value is the address of another variable in memory

`int i=15,j,*p,*q;` - i and j are integer variables, while p and q are pointers to integer variables

Pointers can hold address of objects other than the basic data types
Pointers are very useful in data structures where objects are linked to each other using pointers

```C++
char ch = 'Q';
char* p = &ch                //stores memory address of ch
cout << *p;                  //dereferenced pointer, prints Q

ch = 'Z';
cout << *p;                  //deferenced pointer, prints Z

*p = 'X';                    //can access ch via the pointer as well
cout << ch;                  //prints out X
```

## NULL Pointer (`#include <cstdlib>`)

When a pointer points to nothing

- Initialize it to point to 0 or NULL
- Specially in data structures
  - NULL helps a programmer to know that an end or terminal point of the structure has been reached

## Pointers : Dangling Reference

When an object is deleted without modifying the value of the pointer, the pointer still points to the memory location of the deallocated memory. This creates the **dangling reference problem**. Therefore, after deleting the object, the pointer should be set to a known address or NULL, which is equivalent to 0.

`p = NULL; or p = 0;`

## Pointers : Dynamic memory allocation

Two functions are used to handle dynamic memory

To allocate memory, new is used; it returns the address of the allocated memory, which can be assigned to a pointer
`int *p;
`p = new int;`To release the memory pointed at, delete is used`delete p;`

## Pointers: Memory Leak

This occurs when the same pointer is used in consecutive allocations, such as:

```C++
p = new int;
p = new int;

/* •Since the second allocation occurs without deleting the first, the memory from the first allocation becomes inaccessible */
```

To avoid this, memory needs to be deallocated when no longer in use i.e.,

```C++
p = new int;

delete p;
p = NULL;

p = new int;
```

## Pointers and Arrays

Typically, arrays in C++ are declared before they can be used, known as static declaration
Size of the array must be determined before it is used.

Now remember that a pointer can be used in the allocation of memory _without a name_, through the use of `new`

•This means that we can also declare an array dynamically, via

```C++
int *p;

int n = 10;
p = new int[n];
```

- As long as the value of n is known when the declaration is executed, the array can be of arbitrary size.

## Pointers and Static Arrays

Remember that an array name is basically a pointer to the first element of that array.

`temp` is equivalent to `temp[0]`

### Pointer arithmetic

In pointer arithmetic, we can add an offset to the base address of the array:
`temp + 1, temp + 2`, … etc. and dereference the result

`*(temp + 1)` is the same as `temp[1]`

Example

```C++

char c[] = {'c', 'a', 't'};

char* p = c;         //since c itself is a pointer to an address of an array--this is valid.
                     // p points to c[0]
char* q = &c[0];     // q also points to c[0]

cout << c[2] << p[2] << q[2];     //prints ttt
```

### Delete operator is different for pointer of arrays

Brackets indicate that an array is to be deleted; p is the pointer to that array.
`delete [] p;

## Pointer to Array vs Array of Pointers

### Array of pointers to integers

```C++
int *p[10];           //creates an ARRAY OF 10 POINTERS

/*
for (int i = 0; i < 10; ++i) {
	*p[i] = 0;                        //ERROR, WRONG. WHY? Because pointers only hold address values. Not integers, etc.
}
*/

for (int i = 0; i < 10; ++i) {        //CORRECT
	p[i] = new int;
	*p[i] = 0;
}
```

### Pointer to an array of integers

```C++
int k[10];
int *q = k;        //pointer to an array of integers, pointer q is basically k[0] or k
```

## Pointers and Copy Constructors

A potential problem can arise when copying data from one object to another if one of the data members is a pointer

The default behavior is to copy the items member by member

Because the value of a pointer is an address, this address is copied to the new object
Consequently the new object’s pointer points to the same data as the old object’s pointer, instead of being distinct

To correct this, the user must create a copy constructor which will copy not only the pointer, but the object the pointer points to

## Pointers and Destructors

When a local object goes out of scope, the memory associated with it is released

Unfortunately, if one of the object members is a pointer, the pointer’s memory is released, leaving the object pointed at inaccessible

To avoid this memory leak, objects that contain pointers need to have destructors written for them

A destructor is a code construct that is automatically called when its associated object is deleted.
It can specify special processing to occur, such as the deletion of pointer-linked memory objects.
//Refer to Lecture 2

## Pointers and Reference Variables

Reference variables are implemented as constant pointers.
Given,

```C++
int n = 5;
int *p = &n;         //pointer stores memory address of n
int &r = n;          // this declares r as a reference to n

/*

n = 7;

*p = 7

r = 7

will all result in n = 7

*/
```

Furthermore,

```C++
int *const a //... declares a CONST POINTER to an integer

const int *  //...delcares a CONST INTEGER to a pointer variable
             //will cause errors if we try to assign a value through a dereferenced pointer

```

It is possible to compromise information hiding if a public method returns a reference to a private data member

### Pointers and Functions

The same characteristics of variables can also be applied to functions (value and location). - function’s value is the result it returns, - its address is the memory location of the function’s body
So we can use a pointer to a function to access it:

- Given a function temp,
  - its name, `temp`, is a pointer to the function
  - and `*temp` is the function itself

Following the dereferenced pointer with an argument list will call the function and pass the argument values. - Using this we can implement functionals, functions that take functions as arguments
