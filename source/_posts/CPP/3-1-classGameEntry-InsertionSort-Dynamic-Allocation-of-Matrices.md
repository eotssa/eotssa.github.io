---
title: 3.1 classGameEntry, InsertionSort, Dynamic Allocation of Matrices
categories:
  - CPlusPlus
date: 2024-01-31 13:22:50
tags:
---

## Class GameEntry

```C++
class GameEntry {
public:
	GameEntry(const string& n = "", int s = 0);          //constructor
	string getName() const;                              //get player name
	int getScore () const;                               //get player score
private:
	string name;
	int score;

};

//constructor
GameEntry::GameEntry(const string& n, int s)
	: name(n), score(s) { }
//accessors
string GameEntry::getName() const { return name; }
int GameEntry::getScore() const { return score; }

class Scores {
public:
	Scores(int maxEnt = 10);               //constructor
	/* maxEntries is specified when a Scores object is first constructed*/
	~Scores();                             //destructor
	void add (const GameEntry& e);         //add a game entry
	GameEntry remove(int i)                //remove the -i'th entry
		throw(IndexOutOfBounds);
						// derived from the class RuntimeException from Section 2.4.
private:
	int maxEntries;
	int numEntries;
	GameEntry* entries;             // creates a pointer of type GameEntry object, which holds an address...??
};

//constructor
Scores::Scores(int maxEnt) {
	maxEntries = maxEnt;                     //saves max size
	entries = new GameEntry[maxEntries];     //allocate array to storage
	numEntries = 0;                          //initial array has no elements
}

//destructor, given a dynamic array--necessary
Scores::~Scores() {
	delete [] entries;
}
```

### Insertion:

Check the code carefully to see that all the limiting cases have been handled correctly by the add function (for example, largest score, smallest score, empty array, full array).

Insertion:
`add(e)`: Insert game entry e into the collection of high scores. If this causes the number of entries to exceed maxEntries, the smallest is removed.

- Check if array is full.
  - If full, check `entries[maxEntries -1]` is at least as large as `e`'s score. If not, then `return` because it will not replace any existing entries.
- If array is not full,
  - increment `numEntries`
  - Identify all entries whose scores are smaller than `e`.
    - Shift all scores one entry to the right.
  - Once entryScore > `e`, add entry to index at `i+1`.

```C++
void Scores::add(const GameEntry& e) {
	int newScore = e.getScore();
//if array is full, check the last entry to see if it qualifies to be in hi-score
	if (numEntries == maxEntries) {
		if (newScore <= [maxEntries - 1].getScore())           //if full and last entry is still greater than the newScore, then it doesn't belong in hi-score
			return;
	}
//if array is not full,
	else numEntries++;
	//starts with the next to last, since maxEntries - 1 was already checked
	int i = numEntries - 2;                 //starts at the bottom of the list, and works up the list
	while (i >= 0 && newScore > entries[i].getScore()) {
		entries[i + 1] = entries[i];     //shift right if smaller.
		i--;                             //keeps on moving up the list until newScore is greater than or equal to e.getScore
	}
//if while loop ends, that means that entries[i] > newScore, place in empty spot.
	entries[i + 1] = e; //places entire object into the array/pointer
}
```

```C++
GameEntry Scores::remove(int i) throw(IndexOutOfBounds) {
	if ((i < 0) || i >= numEntries))        //invalid index, limiting case
		throw IndexOutOfBounds("Invalid index");

	GameEntry e = entries[i]; //creates a temp object to hold the pointer address of the desired GameEntry obj to be removed. ...? how does a class obj hold a memory address location?
	for (int j = i + 1; j < numEntries; j++)
		entries[j - 1] = entries[j];   //shift entries left
	numEntries--;                      //one fewer entries
	return e;                          //return the removed object...?
}

```

## Insertion Sort

```C++
void insertionSort(char* A, int n) {
	for (int i = 1; i < n; i++) {
		char cur = A[i]; //stores current char to insert
		int j = i - 1;
		while ((j >= 0) && A[j] > cur)) {//while A[j] is greater than cur/out of order
			A[j+1] = A[j];               //move A[j] to the right
			j--;
		}
		A[j + 1] = cur;                  //proper place for j
	}
}
```

![Insertion Sort](/images/20220920133241.png)

## Dynamic Allocation of Matrices

```C++
const int N_ROW = 3;
const int M_COL = 4;

//table is a pointer(1) on a stack, which points to another pointer(1)
int **table = new int*[N_ROW]; //allocates array of row pointers
for (int i = 0; i < N_ROW; i++) {
	table[i] = new int [M_COL];         //allocate the i'th row (aka COL)
}

//Accessing dynamic array; same as regular
table[1][2] = 33;

//Deleting dynamic array
for (int i = 0; i < N_ROW; i++) {  //deletes the i'th row (aka COL)
	delete [] table[i];
}

delete[] table;          //deletes the array of row pointers

table = NULL;            //good practice

```

## Using STL Vectors to Implement Matrices

Each row of our matrix is declared as “`vector<int>`.” Thus, the entire matrix is declared to be a vector of rows, that is, “`vector<vector<int> >`.” Let us declare M to be of this type.

```C++
vector< vector<int> > M(n, vector<int>(m));
cout << M[i][j] << endl;

```

The space between vector and the following “>” has been added to prevent ambiguity with the C++ input operator “>>.”

STL vector class automatically takes care of deleting its members, we do not need to write a loop to explicitly delete the rows, as we needed with dynamic arrays
