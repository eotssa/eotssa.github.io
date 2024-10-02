---
title: 4.2 Linked Lists
categories:
  - CPlusPlus
date: 2024-01-31 13:27:50
tags:
---

## Linked List Overview

```C++
class Node {
public:
	int value;
	Node* next;         //this is a pointer that can point to the next Node object.
};

int main() {

	Node* head = new Node();     //head represents the first logical start
	Node* second = new Node();
	Node* tail = new Node();      //tail points to NULL in a singly linked list.

	head->value = 1;
	head->next = second;          //assign head->next (ptr) to hold second Node address

	second->value = 2;
	second->next = third;
/* the reason why we can just assign `second->next = third` and not something like `second->next = &third' is because Node objects were declared dynamically, which means the node objects are pointers themselves. */

	third->value = 3;
	third->next = NULL;
}


//print entire linked list in a function
void printList(Node* n) {   //passing Node* pointer
	while(n != NULL ) {     //while pointer is not pointing to NULL
		cout << n->value << endl;
		n = n->next;
	}
}
```

## 3.2 Singly Linked List (pros and cons)

- Arrays are not adaptable and cannot change in size.
  - Vectors skirt this problem by allowing expansion and reduction.
    - However, both arrays and vectors are inefficient if used to insert and remove data because they need to be shifted left and right to keep data sorted or fill the gap when data is removed.
      - Therefore, **linked list** is a collecting of nodes that form a linear ordering.
        - A linked list contains: a) **internal** **data**, and b) a **pointer**.
          - First node is called the **head** and last node is called the **tail**.
            **- Linked lists can be maintained in an order and do not have a predetermined size**

## 3.2.1 Implementing a Singly Linked List

```C++
class StringNode {           //a node
private:
	string elem;
	StringNode* next; //pointer of type StringNode called 'next'

	friend class StringLinkedList;
};


class StringLinkedList {
public:
	StringLinkedList();
	~StringLinkedList();

	bool empty() const;           //checks if list is empty
	const string& front() const;  //get front element

	void addFront(const string& e);  //add to front
	void removeFront();              //remove front item
private:
	StringNode* head;                //pointer to the head of the list
};
```

```C++ StringLinkedList
//Constructor creates an empty list by setting head pointer to NULL
StringLinkedList::StringLinkedList()
	: head(NULL) { }

//Destructor removes elements from the list (exploits the fact that the function remove() destroys the node that it removes).
StringLinkedList::~StringLinkedList() {
	while (!empty())
		removeFront();
}
```

```C++
//checks if list is empty
bool StringLinkList::empty() const {
	{ return head == NULL; }
}

//get front element
const string& StringLinkedList::front() const {
	return head->elem;
}
```

## 3.2.2 Insertion to the Front of a Singly Linked List

- Create a new node
- Set new node pointer to point to current head
- Set head to point to the new node.

```C++
void StringLinkedList::addFront(const string& e) {
	StringNode* v = new StringNode;    //create a new Node called 'v'
	v->elem = e;          //store string data that was passed into the f-n, e
	v->next = head;       //set new node to current head
	head = v;             //set head to point to the new node
}
```

## 3.2.3 Removal from the Front of a Singly Linked List

Assume that the user has checked that the list is nonempty before applying this operation. (A more careful implementation would throw an exception if the list were empty.) The function deletes the node in order to avoid any memory leaks.

```C++
void StringLinkedList::removeFront() {
	stringNode* temp = head;     // save current head
	head = temp->next;           // skip to the next node which will be the new head

	delete temp;                 // since only temp has access to the original 1st node head was pointing to
					//this deletes all the contents which the pointer is pointing to, not the pointer itself.
	temp = NULL;
}
```

## Inserting at the end of a singly linked list

Since we did not keep a pointer to the tail
We will have a hard time inserting in the end
Step 1: Navigate the list to reach the last node

```C++
//nagivate to the last node, I guess v is the first node
v = head;
while (v->next != NULL)
	v = v->next;

//create a new node
Node *n = new Node();
//attaches the new node to the last one
v->next = n;
n->next = NULL;
```

## Inserting in the middle of a singly linked list

Assuming that we have the pointer to node v,

- Insert a node between `v` and `w`,
  - where `w` is a node immediately after v (which means `v->next = w`)

```C++
Node* inBetween = new Node();
inBetween->next = v->next;     //v->next is the pointer to 'w'
v->next = inBetween;           //set v->next to point to the new wedged node.
```

## Removing a node from the end of a singly linked list

- Since we did not keep a pointer to the `tail` in a singly linked list, we we will have to traverse the entire list.

```C++
//Navigate the list to the last node, but be careful to save the pointer to the second last node.
current = NULL;
v = head;
while (v->next != NULL)
{
	current = v; //stores the pointer v
	v = v->next; //v increments to next, which means current is always 1 node behind v.
} //reaches the end of the linked list.

current->next = NULL; //sets the 2nd to last node as the new tail
delete(v);            //deletes original tail
v = NULL; //good practice to set to NULL

```

## Removing in the middle (not the beginning or end) in singly linked list

- Assume we have the pointer to node v.
  •We want to delete a node that is between v and w. **(v, middle, w)**

Basically, save the pointer of the middle node, connect v and w together by using the middle node, and then deleting the middle node finally after its served its purpose--as a pointer to w.

(Notice how we don't even have the actual name of node between v and w--we can just access it using `v-next`)

```C++
//Copy the middle node to delete.
Node* middle = v->next;      //stores the middle node in a variable ptr 'z' (middle)
v->next = middle->next;      //points v to w (z->next, or rather middle->next)
delete middle;
middle = NULL;
```

## Implementing a Generic Singly Linked List (IMPORTANT)

#### Contrast this to typedef (Page 130)

In Section 3.2.1 assumes that the element type is a character string. It is easy to convert the implementation so that it works for an arbitrary element type through the use of C++’s template mechanism. The resulting generic singly linked list class is called SLinkedList.

**The element type associated with each node is parameterized by the type variable E.** In contrast to our earlier version in Code Fragment 3.13, references to the data type “string” have been replaced by “E.” When referring to our templated node and list class, we need to include the suffix “."" For example, the class is SLinkedList and the associated node is SNode.

```C++
template <typeName E>
class SNode {
private:
	E elem;      //E specifies the data type
	SNode<E>* next;  //I guess this is how you specify data type for objects

	friend class SLinkedList<E>;
};

template <typeName E>
class SLinkedList {
public:
	SLinkedList();
	~SLinkedList();

	bool empty() const;
	const E& front() const;
	void addFront(const E& e);
	void removeFront();
private:
	SNode<E>* head;
};

/* Compare the above to below. Every string is replaced with E, and objects<E>
class StringNode {           //a node
private:
	string elem;
	StringNode* next; //pointer of type StringNode called 'next'

	friend class StringLinkedList;
};


class StringLinkedList {
public:
	StringLinkedList();
	~StringLinkedList();

	bool empty() const;           //checks if list is empty
	const string& front() const;  //get front element
	void addFront(const string& e);  //add to front
	void removeFront();              //remove front item
private:
	StringNode* head;                //pointer to the head of the list
};

*/
```

In Code Fragment 3.20, we present the class member functions. Note the similarity with Code Fragments 3.15 through 3.17. Observe that each definition is prefaced by the template specifier template .

```C++
template <typename E>
SLinkedList<E>::SLinkedList()
	: head (NULL) { }
/*---------------------------------
StringLinkedList::StringLinkedList()
	: head(NULL) { }                */
```

```C++
template <typename E>
SLinkedList<E>::~SLinkedList() {
	while (!empty())
		removeFront();
}
/*---------------------------------
StringLinkedList::~StringLinkedList() {
	while (!empty())
		removeFront();
}               */
```

```C++
template <typename E>
bool SLinkedList<E>::empty() const
	{ return head == NULL; }
/*---------------------------------
bool StringLinkList::empty() const {
	{ return head == NULL; }
}            */
```

```C++
template <typename E>
const E& SLinkedList<E>::front() const {
	return head->elem;
}

/* //get front element
const string& StringLinkedList::front() const { //string& ...?
	return head->elem;
}                 */
```

```C++
void SLinkedList<E>::addFront(const E& e) {
	SNode<E>* v = new SNode<E>;
	v->elem = e;
	v-next = head;
	head = v;
}
/*
void StringLinkedList::addFront(const string& e) {
	StringNode* v = new StringNode;    //create a new Node called 'v'
	v->elem = e;          //store string data that was passed into the f-n, e
	v->next = head;       //set new node to current head
	head = v;             //set head to point to the new node
}             */
```

```C++
void SLinkedList<E>::removeFront() {
	SNode<E>* temp = head;
	head = temp->next;
	delete temp; temp = NULL;
}

/* -----------------------------
void StringLinkedList::removeFront() {
	stringNode* temp = head;      //save current head pointer in temp (old)
	head = temp->next;            //skip to the next node which will be the new head
								 //can I do 'head = head->next' ?
	delete temp;                //since only temp has access to the original head, del.
}          */
```

### Using the generic singly linked list

```C++
SLinkedList<string> a;                      //list of strings
a.addFront("MSP");

SLinkedList<int> b;                         //list of integers
a.addFront(12);
```
