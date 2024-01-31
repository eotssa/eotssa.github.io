---
title: 4.3 Doubly and Circular Linked
categories:
  - CPlusPlus
date: 2024-01-31 13:31:32
tags:
---

## Doubly Linked List

There is a type of linked list that allows us to go in both directions—forward and reverse—in a linked list. It is the **doubly linked list**. In addition to its element member, a node in a doubly linked list stores two pointers, a `next` link and a `prev` link, which point to the next node in the list and the previous node in the list, respectively.
Such lists allow for a great variety of quick update operations, including efficient insertion and removal at any given position.

### Header and Trailer Sentinels

To simplify programming, it is convenient to add special nodes at both ends of a doubly linked list: a `header` node just before the head of the list, and a `trailer` node just after the tail of the list. These “dummy” or sentinel nodes do not store any elements. They provide quick access to the first and last nodes of the list. In particular, the header’s next pointer points to the first node of the list, and the prev pointer of the trailer node points to the last node of the list.

## Insertion in a Doubly Linked List

- Given node v, z, and w.
  - Node v is the header node or any other node _except_ for the tail node.
  - Node z is the node to be inserted inbetween.
  - Node w is the node that comes after node z.
    - `v-next = w`
    - `w->prev = v`

### How to insert z between v and w

```C++
z->prev = v;         //1)Make z’s prev link point to v
z->next = w;         //2)Make z’s next link point to w
w->prev = z;         //3)Make w’s prev link point to z
v->next = z;         //4)Make v’s next link point to z

```

## 3.3.2 Removal from a Doubly Linked List

Given node v, z, and w. - Node v is the header node or any other node _except_ for the tail node. - Node z is the node to be removed inbetween. - Node w is the node that comes after node z.

```C++
w->prev = z->prev;         //w->prev now points to v
v->next = z->next;         //v->next now points to w
delete z;                  //delete middle node
```

## 3.3.3 A C++ Implementation: doubly linked list

- a **typedef** statement that defines the element type, called Elem. We define it to be a string, but any other type could be used instead. Each node stores an element.
- pointers to both the `previous` and `next` nodes of the list.
- We declare _DLinkedList_ to be a friend, so it can access the node’s private members
- To keep the code simple, we have chosen not to derive a templated class as we did in Section 3.2.1 for singly linked lists.

```C++
typedef string Elem;
class DNode {
	Elem elem;              //node element value
	DNode* prev;            //previous node in list
	DNode* next;            //next node in list

	friend class DLinkedList;          //allows DLinkedList access
};
```

## DLinkedList.cpp

```C++
class DLinkedList {
public:
	DLinkedList();
	~DLinkedList();
	bool empty() const;                 //is list empty? -- only contains sentinels
	const Elem& front() const;          //get front element
	const Elem& back() const;           //get back element, return by const reference--to not copy entire obj
	void addFront(const Elem& e);       //add to front of list
	void addBack(const Elem& e);        //add to back of list
	void removeFront();                 //remove from front
	void removeBack();                  //remove from back
private:  //local type defintions; which point to the sentinels
	DNode* header;
	DNode* trailer;
protected:   //local utilities used internally by class and subclasses (derived classses) only
	void add(DNode* v, const Elem& e); //insert new node before v
	void remove(DNode* v);             //remove node v
};

//Constructor creates sentinel nodes and sets each point to the other, and destructor removes all sentinel nodes
DLinkedList::DLinkedList() {
	header = new DNode;          //create sentinel
	trailer = new DNode;         //create sentinel
	header->next = trailer;      //have them point to each other
	trailer->prev = header;
}

DLinked::~DLinkedList() {                //destructor
	while (!empty())
		removeFront();      //remove all but sentinels

	delete header;
	delete trailer;
}

//Accessor functions:: TO_DO: enhanced these functions by throwing an exception if an attempt is made to access the front or back of an empty list, just as we did in Code Fragment 3.6

//To determine whether the list is empty, we check that there is no node between the two sentinels. We do this by testing whether the trailer follows immediately after the header.
bool DLinkedList::empty() const {
	return (header->next == trailer); //if true, then empty.
}

//access the front element of the list, we return the element associated with the node that follows the list header
const Elem& DLinkedList::front() const {
	return header->next->elem;
}

//access the back element, we return the element associated with node that precedes the trailer.
const Elem& DLinkedList::back() const {
	return trailer->prev->elem;
}

//Inserting node(middle), addFront, addBack


//[[5_1#HUUUUUUUUH v- prev- next v- prev u DLinkList add]]
//Inserting a new node into a doubly linked list. The protected utility function add inserts a node z before an arbitrary node v.
void DLinkedList::add(DNode* v, const Elem& e) {   //insert new node before v...?
	DNode* u = new DNode;        //create a new node for e, and store e in next line.
	u->elem = e;                 //assigns data value
	u->next = v;                 //link the inserted node 'u' between v and v-prev (next line)
	u->prev = v->prev;
	v->prev->next = v->prev = u;  //replaces both arrows originally to point to u
	//ANOTHER, SIMPLIER WAY
		//v->prev->next = u;           //this is the only way to access the node before v prior to add()
		//v->prev = u;            ///honestly prefer the one above, and the order does matter here.
}

void DLinkedList::addFront(const Elem& e) {       //no need to pass node b/c Front is always header->next
	add(header->next, e);        //passes pointer and the data type,
}                           //since the add function adds before v, then this makes sense.

void DLinkedList::addBack(const Elem& e) {
	add(trailer, e);                     //no need to trailer->prev
}
/* One of the major advantages of providing sentinel nodes is to avoid handling of special cases, which would otherwise be needed.
	For example, if addBack is invoked on an empty list, then the value of trailer->prev (v->prev) is a pointer to the list header. Thus, the node is added between the header and trailer as desired. */



//DELETION OF NODES IN MIDDLE, FRONT, BACK
[[5_1 #3 3 2 Removal from a Doubly Linked List]]

void DLinkedList::remove(DNode* v) {
	/*purpose of this? The purpose is because we're only passed 1 node. So, in order to get the other 2 nodes, we can create 2 temp nodes */
	DNode* u = v->prev;
	DNode* w = v->next;                      /
	                                           //how does creating two new pointers affect the original list?
	u->next = w;                    //unlinks v from list ...
	w->prev = u;
	delete v;
}

//both functions below invoke the utilty function that is ::remove
void DLinkedList::removeFront() {
	remove(header->next);
}

void DLinkedList::removeBack() {
	remove(trailer->prev);
}

/* we have not provided any mechanism for accessing or modifying elements in the middle of the list. Chapter 6, we discuss the concept of iterators, which provides a mechanism for accessing arbitrary elements of a list*/
```

## Chain Assignment: `v->prev->next = v->prev = u;`

Operator priority. the `->` are all realized before the assignment operator.

## 3.4 Circularly linked list

It is similar to a single link list - Has the same kind of node

The list is circular i.e., the last node points back at the first node - If the list has only one node, that node will point to itself.

There is no beginning or end, but nevertheless, a beginning spot is marked called the **`cursor`**. - The first element referenced by the cursor is actually called the **back**, and the element immediately following is called the **front**.
**- cursor is inserted before the head because it is the back of the queue**

![](/images/20220926174626.png)

    front(): Return the element referenced by the cursor; an error results if the list is empty.

back(): Return the element immediately after the cursor; an error results if the list is empty.

advance(): Advance the cursor to the next node in the list.

add(e): Insert a new node with element e immediately after the cursor; if the list is empty, then this node becomes the cursor and its next pointer points to itself.

## NOTE: The DLinked List add function adds the node BEFORE the pointer. Here, in circular linked list, the node is added AFTER the pointer/cursor.

remove(): Remove the node immediately after the cursor (not the cursor itself, unless it is the only node); if the list becomes empty, the cursor is set to null.

## Note: In The DLinked List, the remove function removes the Node itself that is passed. In circular, the node is removed immediately after the cursor.

### (What if we did use a templated class? How would that look?))))To keep the code simple, we have not implemented a templated class. Instead, we provide a typedef statement that defines the element type Elem to be the base type of the list, which in this case is a string.

To keep the code simple, we have omitted error checking. In front, back, and advance, we should first test whether the list is empty, since otherwise the cursor pointer will be NULL. In the first two cases, we should throw some sort of exception. In the case of advance, if the list is empty, we can simply return

```C++
typedef string Elem;              //element type

class CNode {
private:                //similiar to singly linked list
	Elem elem;
	CNode* next;

	friend class CircleList;
};


class CircleList {
public:
	CircleList();
	~CircleList();
	bool empty() const;       //is list empty?
	const Elem& front() const;     //element at cursor...? HUH
	const Elem& back() const;      //element following cursor...? HUH isnt it the opposite

	void advance();                //move cursor forward by 1
	void add(const Elem& e);         //add after cursor
	void remove();                   //remove node after cursor
private:
	CNode* cursor;                 //the starting pointer/node
};

//The constructor generates an empty list by setting the cursor to NULL.
//The destructor iteratively removes nodes until the list is empty. We exploit the fact that the member function remove (given below) deletes the node that it removes.

CircleList::CircleList()     //constructor
	: cursor(NULL) { }

CircleList::~CircleList()    //destructor
	{ while (!empty()) remove(); }

//The Other Functions

bool CircleList::empty() const {
	return cursor == NULL;
}

const Elem& CircleList::Front() const {
	return cursor->next->elem;  //since cursor is defined as back, we go to the next node, and ->elem
}

const Elem& CircleList::back() const {
	return cursor->elem; //returns the cursor position's node, because that's just the definition of cursor defined earlier
}



void CircleList::advance() {
	cursor = cursor->next;
}

//Insertion: in a circularly linked list, insertion occurs AFTER the cursor
void CircleList::add(const Elem& e) {
	CNode* v = new CNode;         //create new node
	v->elem = e;                         //store data in new node

	if (cursor == NULL) {     //list is empty?
		v->next = v;                //v points to itself
		cursor = v;                          //the node v becomes the cursor itself
	}
	else {               //list is non-empty?
		v->next = cursor->next;    //link in v after the cursor
		cursor->next = v;
	}
}

//Removal: assume user has checked non-empty before invoking this function
               //if last node, check if last node points to itself, set cursor NULL.
               //else, link cursor's next pointer to skip over the removed node. Then delete node.

void CircleList::remove() {
	CNode* old = cursor->next; //temp stores the node to be removed.
	if (old == cursor)              //if last node, then old == cursor, set cursor to NULL
		cursor = NULL;
	else
		cursor->next = old->next;  //links out old node //does cursor->next->next; work?

	delete old;                     //deletes the node to be removed.
}
```

![](/images/20221213010954.png)

```C++
playList.add("20");
    	cout << "Now Playing: " << playList.front() << endl;

    playList.add("30");
    	cout << "Now Playing: " << playList.front() << endl;

    playList.advance();
    	cout << "Now Playing: " << playList.front() << endl;

    playList.add("19");
    	cout << "Now Playing: " << playList.front() << endl;

    playList.advance();
    	cout << "Now Playing: " << playList.front() << endl;

    playList.remove();
    	cout << "Now Playing: " << playList.front() << endl;

    playList.add("12");
    	cout << "Now Playing: " << playList.front() << endl;




Now Playing:
Now Playing: 20
Now Playing: 30
Now Playing: 20
Now Playing: 19
Now Playing: 20
Now Playing: 30
Now Playing: 12
```

## Maintaining a Playlist for a Digital Audio Player

## 3.4.2 Reversing a Linked List

As another example of the manipulation of linked lists, we present a simple function
for reversing the elements of a doubly linked list. Given a list L, our approach
involves first copying the contents of L in reverse order into a temporary list T, and
then copying the contents of T back into L (but without reversing).
To achieve the initial reversed copy, we repeatedly extract the first element of
L and copy it to the front of T. (To see why this works, observe that the later an
element appears in L, the earlier it will appear in T.) To copy the contents of T
back to L, we repeatedly extract elements from the front of T, but this time we
copy each one to the back of list L. Our C++ implementation is presented in Code
Fragment 3.35.

```C++
void listReverse(DLinkedList& L) { // reverse a list
DLinkedList T; // temporary list
	while (!L.empty()) {              // reverse L into T
	string s = L.front(); L.removeFront();
	T.addFront(s);
}
while (!T.empty()) { // copy T back to L
	string s = T.front(); T.removeFront();
	L.addBack(s);
}
}
```
