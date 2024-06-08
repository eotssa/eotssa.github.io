---
title: Program for Peak Stock Prices using Historical Data
categories:
  - CPlusPlus
date: 2024-02-01 20:54:29
tags:
---

## Using historical data of any stock of your choice, compute the span for each data point.

Find all peaks in the stock price using the span.

Here is my implementation using a stack and template class.

```C++
#include <iostream>
using namespace std;

class RuntimeException {            //generic run-time exception
private:
	string errorMsg;
public:
	RuntimeException(const string& err) {
		errorMsg = err;
	}

	string getMessage() const {
		return errorMsg;
	}
};

class StackEmpty : public RuntimeException {
public:
	StackEmpty(const string& err) : RuntimeException(err) {}
};

class StackFull : public RuntimeException {
public:
	StackFull(const string& err) : RuntimeException(err) {}
};

template <typename E>
class ArrayStack {
	enum { DEF_CAPACITY = 100};
public:
	ArrayStack(int cap = DEF_CAPACITY);           // constructor from capacity
	int size() const;                             // number of items in the stack
	bool empty() const;                           // is the stack empty?
	const E& top() const throw(StackEmpty);       // get top element
	void push(const E& e) throw(StackFull);       // push element onto stack
	void pop() throw(StackEmpty);                 // pop the stack
	// ... housekeeping functions omitted
	E* spans2(E*, int);                             // linear algo to determine span
	void printArray(E*, int);                       // prints stack
	E peakPricebySpan(E*, int);

	~ArrayStack();                                // destructor to delete dynamically allocated S in spans2()


private:
	E* S;                                         // member data
	int capacity;                                 // stack capacity
	int t;                                        // index of the top of the stack

};

template <typename E>
ArrayStack<E>::ArrayStack(int cap)                        // constructor from capacity
	: S(new E[cap]), capacity(cap), t(-1) { }

template <typename E>
int ArrayStack<E>::size() const
	{ return (t + 1); }

template <typename E>
bool ArrayStack<E>::empty() const
{ return (t < 0); }

template <typename E>
const E& ArrayStack<E>::top() const throw(StackEmpty) {
	if (empty()) throw StackEmpty("Top of empty stack");
	return S[t];
}

template <typename E>
void ArrayStack<E>::push(const E& e) throw(StackFull) {
	if (size() == capacity) throw StackFull("Push to full stack");
	S[++t] = e;
}

template <typename E>
void ArrayStack<E>::pop() throw (StackEmpty) {
	if (empty()) throw StackEmpty("Pop from empty stack");
	--t;
}

template <typename E>
E* ArrayStack<E>::spans2(E* X, int n) {                 //span2
	E* S = new E[n];       //dynamic allocation, might need to delete.
    ArrayStack<E> A;
    for (int i = 0; i <= n - 1; i++) {
        while (!A.empty() && X[A.top()] <= X[i])
            A.pop();

    if (A.empty())
        S[i] = i + 1;
    else
        S[i] = i - A.top();

    A.push(i);
    }

    return S;
}

template <typename E>
void ArrayStack<E>::printArray(E arr[], int n) {
	for (int i = 0; i < n; i++)
		cout << arr[i] << ", ";
}

template <typename E>
E ArrayStack<E>::peakPricebySpan(E arr[], int n) {
	int position;
	E spanVal = arr[0];
	for (int i = 1; i < n; i++) {
		if (spanVal < arr[i]) {
			spanVal = arr[i];
			position = i;
		}
	}

	return position;
}

template <typename E>
ArrayStack<E>::~ArrayStack() {
	delete [] S;
}


int main() {
    //DOW HISTORICAL PAST 6 DAY CHART
	const int SIZE = 6;
	int stockA[SIZE] = {30333, 30423, 30523, 30185, 29634, 30038};

	ArrayStack<int> price;
	int* spanValue = price.spans2(stockA, SIZE);

	cout << "The price of the last " << SIZE << " days of the stock are: ";

	for (int i = 0; i < SIZE; i++)
		cout << stockA[i] << ", ";

	cout << "\nThe corresponding span values of the stock are: ";

	price.printArray(spanValue, SIZE);

	//highest span is same position as highest price
	cout << "\nThe peak price of the last " << SIZE << " days of the stock is: "
	<< stockA[price.peakPricebySpan(spanValue, SIZE)];

    return 0;
}

```
