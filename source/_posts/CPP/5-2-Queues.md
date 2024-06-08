---
title: 5.2 Queues
categories:
  - CPlusPlus
date: 2024-01-31 13:41:45
tags:
---

- Queue is a fundamental data structure
- A queue is a container of elements that are inserted and removed according to the **first-in first-out (FIFO) principle.**

**_Elements can be inserted in a queue at any time, but only the element that has been in the queue the longest can be removed at any time._**

We usually say that elements enter the queue at the **rear** and are removed from the **front**.
The metaphor for this terminology is a line of people waiting to get on an amusement park ride. People enter at the rear of the line and get on the ride from the front of the line.

## The STL Queue

Based on the STL vector class.

- The STL Queue provides access to the queue from both front and back.
- The STL queue does not throw exceptions
  - It is upto the programmer to keep track of unexpected conditions
- Unlike our queue interface, the STL queue provides access to both the front
  and back of the queue.

```C++
#include <queue>
using std::queue;              // making queue accessible

queue<float> myQueue;          // a queue of floats

size(): Return the number of elements in the queue.
empty(): Return true if the queue is empty and false otherwise.
push(e): Enqueue e at the rear of the queue.
pop(): Dequeue the element at the front of the queue.
front(): Return a reference to the element at the queue’s front.
back(): Return a reference to the element at the queue’s rear.


```

## The _queue_ abstract data type (ADT) supports the following operations:

```C++
enqueue(e): // Insert element e at the rear of the queue.

dequeue():  // Remove element at the front of the queue; an error occurs if the queue is empty.

front():    // Return, but do not remove, a reference to the front element in the queue; an error occurs if the queue is empty.

//The queue ADT also includes the following supporting member functions:

size():    // Return the number of elements in the queue.

empty():   //Return true if the queue is empty and false otherwise.
```

```C++

Operation     Output      front ←Q←rear
enqueue(5)     –             (5)
enqueue(3)     –             (5,3)
front()        5             (5,3)
size()         2             (5,3)
dequeue()      –             (3)
enqueue(7)     –             (3,7)
dequeue()      –             (7)
front()        7             (7)
dequeue()      –             ()
dequeue()    “error”         ()
empty()      true            ()
```

## 5.2.3 A C++ Queue Interface

We design our own queue that throws the QueueEmpty exception

This queue does not have a limit on size but many applications would like an upper limit

Note the const keywords in 2 places.

```C++
template <typeName E>
class Queue {                   // interface of Queue
public:
	int size() const;           // number of items in queue
	bool empty() const;         // is the queue empty?
	const E& front() const throw (QueueEmpty);    // the front element
	void enqueue (const E& e);                    // enqueue element at rear
	void dequeue() throw(QueueEmpty);             // dequeue element at front
};

class QueueEmpty : public RuntimeException {
public:
	QueueEmpty(const string& err) : RuntimeException(err) { }
};

```

## Implementing with arrays.

- A queue can be implemented via array.
  - Keeping track of the `front` would require Q[0] to be the front of the queue, and to keep track of the number of elements to find the `rear`.
    - Not efficient because: if dequeueing, need to shift the entire array by one place.
      - What do?

### Using an Array in a Circular Way

https://www.youtube.com/watch?v=okr-XE8yTO8
To avoid moving objects once they are placed in `Q` , define 3 variables `f` , `r` , `n` .

- `f` is the index of the front of the queue.
- `r` is the index of the space after the last element (rear) of the queue.
- `n` is the number of current elements in the queue.

Initially, we set n = 0 and f = r = 0, indicating an empty queue.

- When we dequeue an element from the front of the queue, we decrement n and increment f to the next cell in Q.
- Likewise, when we enqueue an element, we increment r and increment n.

This allows us to implement the enqueue and dequeue functions in constant time.

#### Immediate Issue with this method:

- It's because of the way enqueue() and dequeue() are implemented. Both increment based on what's being added or what's being removed. So we're not really removing any value--rather we just move through the array and pretend like the values in front of the `f` index do not exist within the queue (which they don't, but they do exist on the array).

Lets say we have the following:
Array size is `N = 5` and an array of integers called Q which we will use as a queue
Draw your queue and keep track of f,r,n as we execute the following:

| Operation   | f   | r   | n   |
| ----------- | --- | --- | --- |
| enqueue(5)  | 0   | 1   | 1   |
| enqueue(10) | 0   | 2   | 2   |
| dequeue()   | 1   | 2   | 1   |
| enqueue(15) | 1   | 3   | 2   |
| dequeue()   | 2   | 3   | 1   |
| dequeue()   | 3   | 3   | 0   |
| enqueue(2)  | 3   | 4   | 1   |
| dequeue()   | 4   | 4   | 0   |

|      |      |      |      | f    |
| ---- | ---- | ---- | ---- | ---- |
| 5    | 10   | 15   | 2    |      |
|      |      |      |      | r    |
| A[0] | A[1] | A[2] | A[3] | A[4] |

- The queue is now full?! Yes! F and R, if incremented again with dequeue() or enqueue(), will go out-of-bounds.
- `enqueue(1)` will result in an out-of-bounds.
  - This is because when we dequeue, `f` moves one forward, meaning that the index prior becomes inaccessible.

## Circular Array

To avoid this problem and be able to utilize all of the array Q, we let the f and r indices “wrap around” the end of Q. That is, we now view Q as a “circular array” that goes from Q[0] to Q[N −1] and then immediately back to Q[0] again.

We stated earlier that . . .

- `dequeue()` means incrementing `f` , and (decrementing `n` )
- `enqueue()` means incrementing `r` , and (incrementing `n` )

Instead, we use **modulo**

- `dequeue()` means `f = (f + 1) % N` , where N is the total array size.
- `enqueue()` means `r = (r + 1) % N`, where N is the total array size.

|      |      |      |      | f    |
| ---- | ---- | ---- | ---- | ---- |
| 5    | 10   | 15   | 2    |      |
|      |      |      |      | r    |
| A[0] | A[1] | A[2] | A[3] | A[4] |

- Once again, if we `enqueue(1)` here:
  - `r = (r + 1) % N`
  - `r = ((4) + 1) % (5) = 0
    - This shows that once we reach Q[N - 1], we go right back to Q[0].

### C++ Implementation isn't provided--but the powerpoint has the algorithm.

- Array-based queue implementation are extremely fast with O(1) time.
- **As with the array-based stack implementation, the only real disadvantage of the array-based queue implementation is that we artificially set the capacity of the queue to be some number N.**
  - What do? Linked list-based queues. Particularly circularly linked list.

## Implement Queue using a circularly linked list (5.2.5)

https://www.youtube.com/watch?v=A5_XdiK4J8A (this is singly)

- Can't use a singly linked list? Why?

  - Singly linked list only provides efficient access to one side. Queue requires enqueue (rear access) and dequeue (front access).

- Recall CircleList supports the following:

  - The `cursor` itself is implemented to point to the back of the circulary linked list.
    **- It works out that the cursor in a queue points to the `rear`.**
    Therefore, in order to implement a queue:
    - the element referenced by back will be the `rear` of the queue
    - the element referenced by front will be the `front`
  - `back(): returns reference to the element the cursor points`
  - `front(): returns reference to the element AFTER the cursor`

  - `add(): inserts a new node AFTER the cursor`
  - `remove(): removes the node AFTER the cursor`

### Implementing `enqueue()` and `dequeue()`

```C++
void LinkedQueue::enqueue(const Elem& e) {
	add(e);
	advance();
	n++;
}

void LinkedQueue::dequeue() {
	if (empty())
		throwQueueEmpty("dequeue of empty queue");

	remove();
	n--;
}
```

## C++ Implemention of Queue using Circularly Linked List

```C++
typedef string Elem;
class LinkedQueue {
public:
	LinkedQueue();
	int size() const;         //returns # elem in queue, not found in CircleList
	bool empty() const;                              //is queue empty?
	const Elem& front() const throw(QueueEmpty);    //front element (oldest)
	void enqueue(const Elem& e);          //enqueues rear
	void dequeue() throw(QueueEmpty);     //dequeues front
private:
	CircleList C;                 // circular list of elements
	int n;                        // number of elements, used in size()
};


LinkedQueue::LinkedQueue()           //constructor
	: C(), n(0) { }

int LinkedQueue::size() const        //number of items in queue
	{ return n; }

bool LinkedQueue::empty() const      //is the queue empty?
	{ return n == 0; }

const Elem& LinkedQueue::front() const throw(QueueEmpty) {
	if (empty())
		throw QueueEmpty("front of empty queue");
	return C.front();
}

void LinkedQueue::enqueue(const Elem& e) {
	C.add(e);
	C.advance();
	n++;
}

void LinkedQueue::dequeue() const throw(QueueEmpty) {
	if (empty())
		throw QueueEmpty("Dequeue an empty queue");

	C.remove();
	n--;
}
```

- The entire implementation is just a mind exercise comparing a queue and a circular list.
- In the array-based implementation of a queue, what we did was: - we had three variables, two of which are cursors. - front (`f`), when we `dequeue()`, we increment front and decrement `n` - rear (`r`), when we `enqueue()`, we increment rear, and increment `n`.
- Since in a circular linked list, front (`f`) and rear (`r`) are implemented as one variable, `cursor`.
  - The cursor points to the `rear` element.
  - And front `f` is simply the element immediately after the cursor because of the nature of a circular linked list.
- We made use of the circular linked list's multi-functionality to create a new type of data structure. In this case, `add()`, `remove()`, `advance()`, and even `front()`
