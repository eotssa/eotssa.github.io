---
title: Music Player Implementation Using a Cirlce List Structure
categories:
  - CPlusPlus
date: 2024-02-02 22:19:36
tags:
---

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

### Immediate Issue with this method:

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

#### C++ Implementation isn't provided--but the powerpoint has the algorithm.

- Array-based queue implementation are extremely fast with O(1) time.
- **As with the array-based stack implementation, the only real disadvantage of the array-based queue implementation is that we artificially set the capacity of the queue to be some number N.**
  - What do? Linked list-based queues. Particularly circularly linked list.

## Implement Queue using a circularly linked list (5.2.5)

https://www.youtube.com/watch?v=A5_XdiK4J8A (this is singly)

- Can't use a singly linked list? Why?
  - Singly linked list only provides efficient access to one side. Queue requires enqueue (rear access) and dequeue (front access).
- Recall CircleList [[5.1 Doubly and Circular Linked#3.4 Circularly linked list]]

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

```C++
#include <iostream>
using namespace std;

typedef string Elem;
class CNode {         //circular node, similiar to that of a singly linked list
private:
    Elem elem;
    CNode* next;

    friend class CircleList;
};

class CircleList {
public:
	CircleList();
	~CircleList();
	bool empty() const;             //is list empty?
	const Elem& front() const;
	const Elem& back() const;

	void advance();                 //move cursor forward by 1
	void add(const Elem& e);        //add after cursor
	void remove();                  //remove node after cursor


private:
	CNode* cursor;                 //the starting pointer/node
};

CircleList::CircleList()          //constructor
	: cursor(NULL) { }

CircleList::~CircleList() {       //destructor
    while (!empty()) remove(); }

bool CircleList::empty() const {
	return cursor == NULL;
}

const Elem& CircleList::back() const {
	return cursor->elem;
}

const Elem& CircleList::front() const {
	return cursor->next->elem;
}

void CircleList::advance() {
	cursor = cursor->next;
}

//Insertion
void CircleList::add(const Elem& e) {
	CNode* v = new CNode;                //create new node
	v->elem = e;                             //store data in new node

	if (cursor == NULL) {                //list is empty?
		v->next = v;                     //v points to itself
		cursor = v;                          //the node v becomes the cursor itself
	}
	else {                               //list is non-empty?
		v ->next = cursor->next;          //link in v after the cursor
		cursor->next = v;
	}
}

//Removal
void CircleList::remove() {
	CNode* old = cursor->next;      //temp stores the node to be removed.
	if (old == cursor)              //if last node, then old == cursor, set cursor to NULL
		cursor = NULL;
	else
		cursor->next = old->next;   //links out old node //does cursor->next->next; work?

	delete old;                     //deletes the node to be removed.
}

int main() {
    CircleList playList;         //creates empty playlist with cursor(NULL)

    playList.add("Track 1");     //[*Track 1]
	cout << "Now Playing: " << playList.front() << endl;
    playList.add("Track 2");     //[*Track 2, Track 1]
	cout << "Now Playing: " << playList.front() << endl;
    playList.add("Track 3");     //[*Track 3, Track 2, Track 1]
	cout << "Now Playing: " << playList.front() << endl;
    playList.add("Track 4");     //[*Track 4, Track 3, Track 2, Track 1]
	cout << "Now Playing: " << playList.front() << endl;

	playList.advance();         //[Track 4, *Track 3, Track 2, Track 1]
	cout << "Now Playing: " << playList.front() << endl;



    return 0;
}


```
