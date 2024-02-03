---
title: Sequences and Bubble Sort
categories:
  - CPlusPlus
date: 2024-01-31 13:48:01
tags:
---

- The Sequence ADT is the union of the `Array List` and `Node List` ADTs
  - Elements are accessed by `index` or `position`.
  - Generic methods include: `size()`, `empty()`
  - ArrayList-based methods include: `at(i)`, `set(i, o)`, `insert(i, o)`, `erase(i)`
  - List-based methods include: `begin()`, `end()`, `insertFront(o)`, `insertBack(o)`, `eraseFront()`, `eraseBack()`, `insert(p, o)`, `erase(p)`
  - Bridge methods: `atIndex(i)`, `indexOf(p)`

### Applications of Sequences

- The Sequence ADT is a basic, general-purpose, data structure for storing an ordered collection of elements
- ## Direct applications:
  - Generic replacement for stack, queue, vector, or list
  - small database (e.g., address book)

## - Indirect applications:

    - Building block of more complex data structures

## 6.3.1 The Sequence Abstract Data Type

**_A sequence is an ADT that supports all the functions of the list ADT_** (discussed in Section 6.2), but it also provides functions for accessing elements by their index, as we did in the vector ADT (discussed in Section 6.1). The interface consists of the operations of the list ADT, plus the following two “bridging” functions, which provide connections between indices and positions

Through the magic of inheritance, users of our class NodeSequence have access to all the members of the NodeList class, including its nested class, NodeList::Iterator.

```C++
class NodeSequence : public NodeList {
public:
	Iterator atIndex(int i) const; // get position from index
	int indexOf(const Iterator& p) const; // get index from position
};
```

```C++
atIndex(i): Return the position of the element at index i.

indexOf(p): Return the index of the element at position p.

// get position from index
NodeSequence::Iterator NodeSequence::atIndex(int i) const {
	Iterator p = begin();
	for (int j = 0; j < i; j++)
		++p;
	return p;
}
// get index from position
int NodeSequence::indexOf(const Iterator& p) const {
	Iterator q = begin();
	int j = 0;
	while (q != p) { // until finding p
		++q; ++j; // advance and count hops
	}
	return j;
}

```

### Pros and Cons of List Implementation of Sequeence vs. Array-based Implementation of Sequence

- `atIndex` and `indexOf` are O(n), but the rest of list ADT (which is a doubly linked list) is O(1)
  - This is because to find the position within the data structure, the iterator must traverse to that point.

An array-based implementation is the opposite.

- `atIndex` and `indexOf` would be very efficient, but in return...
  - `insertion()` and `remove()` operations would run at O(n) time.

## Implementing a Sequence with an Array

- In a regular sequence using arrrays, we can store each element of e of S in a cell A[i] of an array A.

  - We can define position object p to hold an index i and a reference to array A.
    - But the issue with this is that positions in a sequence are defined relative to their neighboring positions, not their ranks. Hence, cells in A have no way to reference their corresponding positions if we use, for example, an `insertFront()` operation, which causes all positions to shift.

- Solution: a pointer to a new kind of `position object` which stores both in index i and the element `e` associated with `p` (the iterator). - Therefore, now we can update the i value associated with each position whose rank changes based on insertion or deletion.
  ![](/images/20221107000808.png)
- Solution (part 2): Furthermore, a circular array makes `insertFront()` and `insertBack()` O(1) time instead of O(n). - (Seems like this is because there would be no need to move any elements with a circular)
  ![](/images/20221107001241.png)

## Bubble Sort (on a Sequence)

- Bubble sort performs a series of passes over a sequence. Elements are scanned by increasing rank from rank 0 to the end of the sequence. At each position in a pass, the element is compared with its neighbor. If larger, swap.

| pass | swaps                      | sequence      |
| ---- | -------------------------- | ------------- |
| 1st  | 7 <-> 3 , 7 <-> 6, 9 <-> 3 | (5,7,2,6,9,3) |
| 2nd  | 5 <-> 2, 7 <-> 3           | (5,2,6,7,3,9) |
| 3rd  | 6 <-> 3                    | (2,5,6,3,7,9) |
| 4th  | 5 <-> 3                    | (2,5,3,6,7,9) |
|      |                            | (2,3,5,6,7,9) |

The bubble-sort algorithm has the following properties:
• In the first pass, once the largest element is reached, it keeps on being swapped until it gets to the last position of the sequence.
• In the second pass, once the second largest element is reached, it keeps on being swapped until it gets to the second-to-last position of the sequence.
• In general, at the end of the i-th pass, the right-most i elements of the sequence (that is, those at indices from n−1 down to n−i) are in final position.

The last property implies that it is correct to limit the number of passes made by a bubble-sort on an n-element sequence to n. Moreover, it allows the ith pass to be limited to the first n−i+1 elements of the sequence.

## Bubble Sort by Indices

The first is based on accessing elements by their index. We use the function `atIndex` to access the two elements of interest.

Since function bubbleSort1 accesses elements only through the index-based interface functions atIndex, this implementation is suitable only for the array-based implementation of the sequence, for which `atIndex` takes O(1) time. Given such an array-based sequence, this bubble-sort implementation runs in **O(n^2 ) time** (quadratic time)

```C++
void bubbleSort1(Sequence& S) { // bubble-sort by indices
	int n = S.size();
	for (int i = 0; i < n; i++) { // i-th pass
		for (int j = 1; j < n−i; j++) {
			Sequence::Iterator prec = S.atIndex(j−1); // predecessor
			Sequence::Iterator succ = S.atIndex(j); // successor
			if (*prec > *succ) { // swap if out of order
				int tmp = *prec; *prec = *succ; *succ = tmp;
			}
		}
	}
}
```

In contrast to bubbleSort1, our second function, bubbleSort2, accesses the elements entirely through the use of iterators. The iterators prec and succ play the roles that indices j−1 and j play, respectively, in bubbleSort1. Observe that when we first enter the inner loop of bubbleSort1, the value of j −1 is 0, that is, it refers to the first element of the sequence. This is why we initialize prec to the beginning of the sequence before entering the inner loop. Whenever we reenter the inner loop, we initialize succ to prec and then immediately increment it. Thus, succ refers to the position immediately after prec. Before resuming the loop, we increment prec.

```C++
void bubbleSort2(Sequence& S) { // bubble-sort by positions
	int n = S.size();
	for (int i = 0; i < n; i++) { // i-th pass
		Sequence::Iterator prec = S.begin(); // predecessor
	for (int j = 1; j < n−i; j++) {
		Sequence::Iterator succ = prec;
		++succ; // successor
		if (*prec > *succ) { // swap if out of order
			int tmp = *prec; *prec = *succ; *succ = tmp;
		}
		++prec; // advance predecessor
	}
  }
}
```

Since the iterator increment operator takes O(1) time in either the array-based or node-based implementation of a sequence, this second implementation of bubblesort would run in O(n^2) worst-case time, irrespective of the manner in which the
sequence was implemented.
