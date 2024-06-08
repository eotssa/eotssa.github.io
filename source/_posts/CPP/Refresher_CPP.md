---
title: Refresher on Copy Constructors, Overloading, Initializer Lists, Inheritances, and Polymorphic Structures
categories:
  - CPlusPlus
date: 2024-01-30 18:28:32
tags:
---

Constructors are called when an instance of the  class is created

## Copy constructor

- A constructor that copies value from one instance of the object to another
- This is important because without a copy constructor, you would end up with two variables pointing to the same object.
  - If one is deleted, the other doesn't know it's been deleted as well.

```C++ EXAMPLE OF COPY CONSTRUCTOR
class Passenger
{

private:
  // ...some data members

public:
  Passenger(); //Default
  Passenger(const string& nm, MealType mp, const string& ffn = "NONE");   // override
  Passenger(const Passenger& pass);     // copy constructor

};

Passenger::Passenger() //default constructor
{
  name = "--NO NAME--";
  mealPref = NO_PREF;
  isFreqFlyer = false;
  freqFlyerNo = "NONE";
}

Passenger::Passenger(const string& nm, MealType mp, const string& ffn) // constructor with given values
{
  name = nm;
  mealPref = mp;
  isFreqFlyer = (ffn != "NONE");
  freqFlyerNo = ffn;
}

Passenger::Passenger(const Passenger& pass)  // copy constructor
{
  name = pass.name;
  mealPref = pass.mealPref;
  isFreqFlyer =   pass.isFreqFlyer;
  freqFlyerNo = pass.freqFlyerNo;

}
```

### How to Invoke Constructors

```C++
Passenger p1; //default constructor
Passenger p2("John Smith", VEGETERIAN, 293145); // 2nd constructor
Passenger p3("Pocahontas", REGULAR); // not a frequent flyer
Passenger p4(p3); // copy constructor used to copy from p3
Passenger p5 = p2; // copied from p2...but not a copy constructor...?

Passenger* pp1 = new Passenger; // default constructor
Passenger* pp2 = new Passenger("Joe Blow", NO_PREF); // 2nd constructor
Passenger pa[20];               // default constructor

```

## Enumerables

- Enumerables are used as a way to represent a category. Each "label" in an enumerable is associated with an int value, but as a programmer, typing the same would be the same as if we typed that specific int value.

## Constructor using initializer list

- Initializer list avoids calling default constructor for no reason.
- It's used when the arguments are not simple data types. For example, if the argument is another class called "Name".
- Another use for initializer list is when you want to initialize variables from a base class to a derived class. The derived class might not have access to the base class private data members, so the only way the derived class can use base class data members is right before object initialization.

```C++
Passenger::Passenger(const string& nm, MealType mp, string ffn)
: name(nm), mealPref(mp), isFreqFlyer(ffn != "NONE")
{ freqFlyerNo = ffn; }
```

## Destructors

- A destructor is a member function which is called automatically when the object is destroyed, when the program terminates or when memory is released
- A destructor of class Passenger is denoted by ~Passenger
- It does not return anything and does not take any arguments
  **- We need destructors to deallocate any memory used by data members**

```C++
class Vect {
public:
	Vect(int n); //constructor, given size
	~Vect(); //destructor
	// ... other public member functions

private:
	int* data; //an array holding the vector
	int size; //number of array entries
};

Vect::Vect(int n) {
	size = n;
	data = new int[n]; //allocate array
}

Vect::~Vect() {            //DESTRUCTOR
	delete [] data;        //free the allocated array after destructor is called
}
```

## Classes and Memory Allocation Problem

```C++
Vect a(100);     //vector 'a' has a size of 100


Vect b = a;      //initialize b from a //DANGER!!!!
/* Line 2 is creating a vector with default constructor so its size is unknown or 0, not 100.
Vector class does not have a copy constructor
**BAD: the default constructor will copy the pointer to a.data to b.data**
- Copying the POINTER will modify and affect the original data. No actual copying of data is happening.
*/

Vect c;          //vector 'c' has a default size of 10
/* Line 3 creates a vector using the default constructor (default size is 10) */


c = a;           //assign a to c //(DANGER!!!!)
/*
Line 4 also copies the pointer to a.data to c.data.
- This is because we did NOT provide an ASSIGNMENT operator. */
```

First, `Vect a(100)` allocates an array of 100 integers and `a.data` points to this array.

Declaration `Vect b=a` does not work as intended. - Intended: copies over every element of a to b, which results in a different vector of 100 integer values. - Actual: Since no copy constructor was provided, the system uses the default, which copies `b.data = a.data`. This **does not copy the contents of the array. All it does is copy the pointer to the array's initial element.** (**_Shallow copy_**) - Notice that `data` here is a pointer variable.

Declaration `Vect c` invokes the default constructor, which has a default size of 10. So only 10 element vect.

`c = a`, once again, since no assignment operator is provided, it does a shallow copy, which means only the pointer of `a` is copied to the first element of `c`. - Moreover, we lost the pointer to c's original 10-element array--resulting in a memory leak.

### The Fix: Provide a **copy constructor** and \*\*overload the assignment operator

The problems arose because we allocated memory, and we used the system’s default copy constructor and assignment operator.

If a class allocates memory, you should provide a copy constructor and assignment operator to allocate new memory for making copies. A copy constructor for a class T is typically declared to take a single argument, which is a constant reference to an object of the same class, that is, `T(const T& t)`. As shown in the code fragment below, it copies each of the data members from one class to the other while allocating memory for any dynamic members.

```C++
Vect::Vect(const Vect& a) {                   //copy constructor from a
	size = a.size;                            // copy size
	data = new int[size];                     // allocate new array in heap
	for (int i = 0; i < size; i++) {          //copy vector contents
		data[i] = a.data[i];
	}
}
```

The assignment operator is handled by overloading the `=` operator as shown in the next code fragment. The argument “a” plays the role of the object on the right side of the assignment operator.

The assignment operator deletes the existing array storage, allocates a new array of the proper size, and copies elements into this new array.

The if statement checks against the possibility of self assignment. (This can sometimes happen when different variables reference the same object.) We perform this check using the keyword `this`. For any instance of a class object “`this`” is defined to be the address of this instance. If this equals the address of a, then `this` is a case of self assignment, and we ignore the operation. **Otherwise, we deallocate the existing array, allocate a new array, and copy the contents over.**

```C++
Vect& Vect::operator=(const Vect& a) {        //assignment operator from
	if (this!= &a) {                          //avoid self-assignment
		delete [] data;                       //delete old array
		size a.size;                          //set new size
		data = new int [size];                //allocate new array in heap
		for (int i = 0; i < size; i++) {      //copy the vector contents
			data[i] = a.data[i];
		}
	}
	return *this;
}
```

Notice that in the last line of the assignment operator we return a reference to the current object with the statement “`return *this`.” Such an approach is useful for assignment operators, since it allows us to chain together assignments, as in “a=b=c.” The assignment “b=c” invokes the assignment operator, copying variable c to b and then returns a reference to b. This result is then assigned to variable a

## The Upshot

- Everything class that allocate its own objects using `new` should:
  - Define a destructor to free any allocated objects
  - Define a `copy constructor`, which allocates its own new member storae and copies the contents of member variables.
  - Define an `assignment operator`, which deallocates old storage, allocates new storage, and copies all member variables.

---

## Friend Class

- Friend designation gives access rights to private members

```C++
class Vector {
public: //...public members omitted
private:
	double coord[3];
	friend class Matrix;                         //give Matrix access to coord

}

class Matrix {
public:
	Vector multiply(const Vector& v);            //multiply by vector v
	//...other public members omitted
private:
	double a[3][3];                              //matrix entries
};

Vector Matrix::multiply(const Vector& v) {
	Vector w;
	for (int i = 0; i < 3; i++)
		for (int j = 0; j < 3; j++)
			w.coord[i] += a[i][j] * v.coord[j];                //ALLOWED TO ACCESS Vector class private "coord"
	return w;
}
```

---

## Object Oriented Programming Goals:

Robustness:
Correct software that can catch errors and recover or gracefully terminate
Adaptability
Complex software will need to change with time to add new features
Reusability
After writing something complex, you want to be able to reuse it elsewhere

## Inheritance

- Inheritance is a technique of reusing existing class definitions to derive new classes
- These new classes (called **derived classes** or **subclasses** or  **child classes**) can inherit the attributes and behavior of the pre-existing classes (called **base classes** or **superclasses** or  **parent classes**)
  - Derived classes can add, delete, & modify methods and data members in their own definitions (known as **overriding**)

```C++ //Example: Derive a student class from a person class
class Person {
private:
	string name;
	string idNum;
public:
	//...
	void print();
	string getName();
};

class Student : public Person {    //Student (derived from Person class)
private:
	string major;
	int gradYear;
public:
	//...
	void print();     //NEEDS A NEW PRINT FUNCTION OR IT'LL USE PERSON (PARENT) PRINT FUNCTION.
	void changeMajor(const string& newMajor);
}
```

## Usage of Inheritance

An object of type Person can access the public members of Person. An object of type Student can access the public members of both classes. If a Student object invokes the shared print function, it will use its own version by default. We use the class scope operator (::) to specify which class’s function is used, as in Person::print and Student::print. Note that an object of type Person cannot access members of derived type, and **_thus it is not possible for a Person object to invoke the changeMajor function of class Student._**

```C++
Person person1("Mary", "12-345");        // declare a person
Student student1("Bob", "98-764", "Math", 2012);  //declare a student --student has more parameters

cout << student.GetName() << endl;          // invokes PARENT class Person::GetName()
person.print();                             // invokes PARENT class Person::print()
student.print();                            // invokes STUDENT class student
person.changeMajor("Physics");              //ERROR PERSON is parent class, and does not have child class student::...
student.changeMajor("English");             //VALID b/c student has changeMajor function

```

## Special attention to the print function for inheritance

C++ programmers often find it useful for a derived class to explicitly invoke a member function of a base class. For example, in the process of printing information for a student, it is natural to first print the information of the Person base class, and then print information particular to the student. Performing this task is done using the class scope operator.

```C++
void Person::print() {
	cout << "Name " << name << endl;
	cout << "IDnum " << idNum << endl;
}

void Student::print() {
	Person::print();      // will first print Person::print();
	cout << "Major " << major << endl;
	cout << "Year " << gradYear << endl;
}
```

Without the “Person::” specifier used above, the Student::print function would call itself recursively, which is not what we want.

## No access to private members from Student

Protected Members:
Even though class Student is inherited from class Person, member functions of Student do not have access to private members of Person. For example, the following is illegal.

```C++
void Student::printName() {
	cout << name << endl;               // ERROR. 'name' is a private data member to Person. 'Student' derived class cannot access.
}
```

**Special access privileges for derived classes can be provided by declaring members to be “protected.”** A protected member is “public” to all classes derived from this one, but “private” to all other functions. From a syntactic perspective, the keyword protected behaves in the same way as the keyword private and public. In the class example above, had we declared name to be protected rather than private, the above function printName would work fine.

## Note on public, private and protected: Illustrating Class Protection/Derived Accessibility

Consider for example, three classes: a base class Base, a derived class Derived, and an unrelated class Unrelated. The base class defines three integer members, one of each access type.

**Special access privileges for derived classes can be provided by declaring members to be “protected.”**

```C++
class Base {
	private:
		int priv;
	protected:
		int prot;
	public:
		int publ;
};

class Derived public: Base {
	void someMemberFunction() {
		cout << priv;       //ERROR: private member
		cout << prot;       //Okay: protected member can be accessed by a derived class
		cout << publ;       //Okay: public member
	}
};

class Unrelated {        //not inherited or derived
	Base X;              //object of type Base named 'X'

	void anotherMemberFunction() {
		cout << X.priv;         //ERROR: private member
		cout << X.prot;         //ERROR: protected members are only for derived classes.
		cout << X.publ;         //Okay: public class
	}
};
```

Member functions are always declared `private` or `protected`.
Protected members are commonly used for `utility functions`, which may be useful for derived classes.

## Inheritance Summary

- The amount of access, and levels of modification are controlled by specifying `public`, `protected`, or `private` in the derived class header.
  - **Public inhertiance** of a `derived class` preserves the access classes of the `base class`.
    - E.g.,
      - private remains private.
      - protected remains protected.
      - public remains public.
  - **Protected inheritance** of a `derived class` treats:
    - public and protected members of the `base class` as protected.
    - Private members remain private.
  - **Private inheritence** of a `derived class` treats all members of the base class as private.

## Constructor and Destructors for Derived

Class hierarchies in C++ are constructed bottom-up:
base class first,
then its members,
then the derived class itself.
**For this reason, the constructor for a base class needs to be called in the initializer list of the derived class.**

The example below shows how constructors might be implemented for the Person and Student classes.

```C++
Person::Person(const string& nm, const string& id)
	: name(nm), idNum(id) { }               //initialize name and ID number in initializer list
/*Only the Person(nm,id) call has to be in the initializer list.*/

Student::Student(const string& nm, const string& id, const string& maj, int year)
	: Person(nm, id),                   // initialize Person members
	  major(maj),                       // initialize major
	  gradYear(year) { }                // initialize graduation year
```

**Only the Person(nm,id) call has to be in the initializer list.**
The other initializations could be placed in the constructor function body ({...}), but putting class initializations in the initialization list is generally more efficient. Suppose that we create a new student object.
Suppose that we create a new student object

```C++
	Student* s1 = new Student("Carol", "34-927", "Physics", 2014);
```

The following will happen respectively: (given the use of initializer of base class above) 1. Constructor for the student class first makes a function call to Person("Carol, "34-927") to initialize the Person base class. 2. Then, it initializes the major to "Physics" and the year to 2014.

## Destructor For Derived Classes and Base Class

Classes are destroyed in reverse order. Derived classes are destroyed first, and then base classes.
For example:

```C++
Person::˜Person() { . . . } // Person destructor
Student::˜Student() { . . . } // Student destructor

delete s1; // calls ˜Student() then ˜Person()
```

Unlike constructors, the Student destructor does not need to (and is not allowed to) call the Person destructor.

## Static Binding: Declared Type vs. Actual Type

When a class is derived from a base class, as with Student and Person, the derived class becomes a subtype of the base class, which means that we can use the derived class wherever the base class is acceptable.

For example, suppose that we create an array of pointers to university people.

```C++
Person* pp[100];             // array of 100 Person pointers
pp[0] = new Person(. . .);   // add a Person (details omitted)
pp[1] = new Student(. . .);  // add a Student (details omitted) //can use derived class Studrnt here despite array of Pointers of type Person

cout << pp[1]->getName() << endl;    //okay

pp[0]->print();               //calls Person::Print(), expected.
pp[1]->print();               //also calls Person::Print() ... WHY?
/*Static binding--when determining which member function to call, C++'s default action is to consider the object's DECLARED TYPE, and NOT its ACTUAL type. Since pp[1] is a declared pointer to a 'Person' class(base class), the members for that class is used. */

pp[1]->changeMajor("English");              //ERROR! Why?
/* Once again, since the DECLARED type is base class Person (which does not have a changeMajor() function). pp[i] is not allowed to access Student member functions.
```

Nonetheless, C++ provides a way to achieve the desired dynamic effect using the technique we describe next

## Dynamic Binding and Virtual Functions

As we saw above, C++ uses `static binding` by default to determine which member function to call for a derived class.

Alternatively, in `dynamic binding`, an object’s contents determine which member function is called.
To specify that a member function should use dynamic binding, the keyword `virtual` is added to the function’s declaration.

```C++
class Person {
		virtual void print() { ... }//print (details omitted)
	// ...
};

class Student : public Person {
	virtual void print() { ... } //print (details omitted)
	// ...
	}
};

Person* pp[100];   //array of 100 Person pointers
pp[0] = new Person(...);    //add a Person (details omitted)
pp[1] = new Student(...);    // add a Student (details omitted)

pp[0]->print();         //calls Person::print()
pp[1]->print();         //calls Student::print(), "FIXED"
/*
In this case, pp[1] contains a pointer to an object of type Student, and by the power of dynamic binding with virtual functions, the function Student::print will be called. The decision as to which function to call is made at run-time, hence the name dynamic binding.
*/
```

Dynamic binding is a powerful technique, **since it allows us to create an object, such as the array pp above**, whose behavior varies depending on its contents. This technique is fundamental to the concept of polymorphism

## Virtual Destructors

**RULE:**

- If a base class defines any virtual functions, it should define a virtual destructor, even if it is empty.

- If we store types Person and Student in the array, it is important to call the appropriate destructor. It isn't an issue for the example above (because nothing is stored dynamically).

- If a Student class had allocated memory dynamically, the fact that the wrong constructor is called would result in a memory leak.

## Polymorphism

Literally, “polymorphism” means “many forms.” In the context of object-oriented design, it refers to the ability of a variable to take different types. Polymorphism is typically applied in C++ using pointer variables. In particular, a variable p declared to be a pointer to some class S implies that p can point to any object belonging to any derived class T of S.

That is, p can take many forms, depending on the specific class of the object it is referring to. This kind of functionality allows a specialized class T to extend a class S, inherit the “generic” functions from class S, and redefine other functions from class S to account for specific properties of objects of class T.

Inheritance, polymorphism, and function overloading support reusable software. We can define classes that inherit generic member variables and functions and can then define new, more specific variables and functions that deal with special aspects of objects of the new class.
For example, suppose that we defined a generic class Person and then derived three classes Student, Administrator, and Instructor. We could store pointers to all these objects in a list of type Person\*. When we invoke a virtual member function, such as print, to any element of the list, it will call the function appropriate to the individual element’s type.

Now consider what happens if both of these classes define a virtual member function `a`, and let us consider which of these functions is called when we invoke p->a(). Since dynamic binding is used, if p points to an object of type T, then it invokes the function T::a. In this case, T is said to override function a from S. Alternatively, if p points to an object of type S, it will invoke S::a.

–**Static binding** determines the function call at compile time
–**Dynamic binding** delays the decision until run time

### Polymorphisms: Specialization

- In short, the base class and the derived class have the same functions, but one or more functions of the same name can be altered to meet specific goals.
  - Dog and bloodhound have a drink() and sniff() function.
    - Bloodhounds have a much higher sniff() sensitivity, so sniff() is "specialized" and overrides the base class (Dog) sniff().

### Polymorphisms: Extension

- In short, the base class and the derived class have the same functions, but the derived class has extra functions. No overlap compared to specialization.

TLDR:
With polymorphism we can both specialize and extend a class - Specialize by overriding a function or implementing a virtual function - Extend by introducing new functions

## Examples of Inheritance and Polymorphism

## Define a base class, `Progression`, which defines the "generic" numbers and functions of a numeric progression.

Why did we declare virtual for firstValue() and nextValue() ?

- It is our intention that in order to generate different progressions, derived classes will override one or both of the functions `firstValue()` and `nextValue()`. For this reason, we have declared both functions to be **virtual**.
  - Furthermore, with every virtual function, a virtual destructor is provided to be safe.

```C++
class Progression {
public:
	Progression(long f = 0)
		: first(f), cur(f) { }             //constructor

	virtual ~Progression() { };            //destrutor
	void printProgression(int n);          //prints the first n values

protected:             //intended as utility that will be invoked within base or derived class, so protected
	virtual long firstValue();             //reset
	virtual long nextValue();              //advance

protected:
	long first;                            //first value of progression
	long cur;                              //current value of progression
};


void Progression::printProgression(int n) {
	cout << firstValue();     //prints first

	for (int i = 2; i <= n; i++) {     //prints 2 through n
		cout << ' ' << nextValue();
	}
	cout << endl;
}

long Progression:: firstValue() {         //reset
	cur = first;
	return cur;
}

long Progression::nextValue() {           //advance
	return ++cur;
}
```

## Arithmetic Progression Class

```C++
class ArithProgression : public Progression {
public:
	ArithProgression(long i = 1);  //constructor
protected:
	virtual long nextValue();     //OVERRIDE Progression::nextValue() with ArithProgression::nextValue()
protected:
	long inc;                     //increment
};

/*The constructor and the new member function nextValue are defined below. Observe that the constructor invokes the base class constructor Progression to initialize the base object in addition to initializing the value of inc.
*/
ArithProgression::ArithProgression(long i)       //constructor
	: Progression(), inc(i) { }

long ArithProgression::nextValue() {             //OVERRIDE, advance by adding inc value (not just simple increment)
	cur += inc;
	return cur;
}
```

Polymorphism is at work here. When a Progression pointer is pointing to an ArithProgression object, it will use the ArithProgression functions firstValue and nextValue.

\*\*Even though the function printProgression in the base class is not virtual, it makes use of this polymorphism.

- Its calls to the firstValue and nextValue functions are implicitly for the “current” object, which will be of the ArithProgression class.\*\*

## Geometric Progression Class

Like ArithProgression, this new class inherits `first` and `cur` and the member functions `firstValue()` and `printProgression()` from base Class Progression. - A new member `base` is added, which holds the base value, and the constructor initializes the base class with a starting value of 1 instead of a 0.

```C++
class GeomProgression : public Progression {
public:
	GeomProgression(long b = 2);     //constructor
protected:
	virtual long nextValue();           //advance
protected:
	long base;                          //NEW! base value
};

GeomProgression::GeomProgression(long b)     //constructor
	: Progression(1), base(b) { }

long GeomProgression::nextValue() {
	cur *= base;
	return cur;
}
```

## Fibonacci Progression Class

Each element of a Fibonacci series is the sum of the previous two elements. - Fibonacci progression (first = 0, second = 1): 0, 1, 1, 2, 3, 5, 8, . . .

```C++
class FibonacciProgression : public Progression {
public:
	FibonacciProgression(long f = 0, long s = 1);      //constructor with first = 0, second = 1
protected:
	virtual long firstValue();
	virtual long secondValue();
protected:
	long second;
	long prev;
};
```

```C++
/* The initialization process is a bit tricky because we need to create a “fictitious” element that precedes the first element. Note that setting this element to the value (second − first) achieves the desired result.*/
FibonacciProgression::FibonacciProgression(long f, long s)
	: Progression(f), second(s), prev(second - first) { }          //fictious prev value (1 - 0) = 1



long FibonacciProgression::firstValue() {
	cur = first;              //cur = 0;
	prev = second - first;    //1 = 1 - 0 --> = 1...?
	return cur;
}

/* The overridden member function nextValue copies the current value to the previous value. We need to store the old previous value in a temporary variable. */
long FibonacciProgression::nextValue() {
	long temp = prev;
	prev = cur;
	cur += temp;
	return cur;
}
```

## Entire Progression Class Combined

```C++
#include <iostream>
using namespace std;

class Progression {
public:
	Progression(long f = 0)
		: first(f), cur(f) { }             //constructor

	virtual ~Progression() { };            //destrutor
	void printProgression(int n);          //prints the first n values

protected:             //intended as utility that will be invoked within base or derived class, so protected
	virtual long firstValue();             //reset
	virtual long nextValue();              //advance

protected:
	long first;                            //first value of progression
	long cur;                              //current value of progression
};


void Progression::printProgression(int n) {
	cout << firstValue();     //prints first

	for (int i = 2; i <= n; i++) {     //prints 2 through n
		cout << ' ' << nextValue();
	}
	cout << endl;
}

long Progression:: firstValue() {         //reset
	cur = first;
	return cur;
}

long Progression::nextValue() {           //advance
	return ++cur;
}

//...
class ArithProgression : public Progression {
public:
	ArithProgression(long i = 1);  //constructor
protected:
	virtual long nextValue();     //OVERRIDE Progression::nextValue() with ArithProgression::nextValue()
protected:
	long inc;                     //increment
};
//--------------------------------------------------------------------------------------------------------
/*The constructor and the new member function nextValue are defined below. Observe that the constructor invokes the base class constructor Progression to initialize the base object in addition to initializing the value of inc.
*/
ArithProgression::ArithProgression(long i)       //constructor
	: Progression(), inc(i) { }

long ArithProgression::nextValue() {             //OVERRIDE, advance by adding inc value (not just simple increment)
	cur += inc;
	return cur;
}

//--------------------------------------------------------------------------------------------------------
class GeomProgression : public Progression {
public:
	GeomProgression(long b = 2);     //constructor
protected:
	virtual long nextValue();           //advance
protected:
	long base;                          //NEW! base value
};

GeomProgression::GeomProgression(long b)     //constructor
	: Progression(1), base(b) { }

long GeomProgression::nextValue() {
	cur *= base;
	return cur;
}
//-------------------------------------------------------------------------------------------------------


class FibonacciProgression : public Progression {
public:
	FibonacciProgression(long f = 0, long s = 1);      //constructor with first = 0, second = 1
protected:
	virtual long firstValue();
	virtual long nextValue();
protected:
	long second;
	long prev;
};

/* The initialization process is a bit tricky because we need to create a “fictitious” element that precedes the first element. Note that setting this element to the value second -first achieves the desired result.*/
FibonacciProgression::FibonacciProgression(long f, long s)
	: Progression(f), second(s), prev(second - first) { }          //fictious prev value (1 - 0) = 1



long FibonacciProgression::firstValue() {
	cur = first;              //cur = 0;
	prev = second - first;    //1 = 1 - 0 --> = 1...?
	return cur;
}

/* The overridden member function nextValue copies the current value to the previous value. We need to store the old previous value in a temporary variable. */
long FibonacciProgression::nextValue() {
	long temp = prev;
	prev = cur;
	cur += temp;
	return cur;
}

//-------------------------------------------------------------------------------------------------------

/** Test program for the progression classes */
int main() {
	Progression* prog;             //...???????????????
// test ArithProgression
	cout << "Arithmetic progression with default increment:\n";
	prog = new ArithProgression();
	prog->printProgression(10);
	cout << "Arithmetic progression with increment 5:\n";
	prog = new ArithProgression(5);
	prog->printProgression(10);

// test GeomProgression
	cout << "Geometric progression with default base:\n";
	prog = new GeomProgression();
	prog->printProgression(10);
	cout << "Geometric progression with base 3:\n";
	prog = new GeomProgression(3);
	prog->printProgression(10);

// test FibonacciProgression
	cout << "Fibonacci progression with default start values:\n";
	prog = new FibonacciProgression();
	prog->printProgression(10);
	cout << "Fibonacci progression with start values 4 and 6:\n";
	prog = new FibonacciProgression(4, 6);
	prog->printProgression(10);

return 0;

// successful execution
}
/*---------------------------------*/
Arithmetic progression with default increment:
0 1 2 3 4 5 6 7 8 9
Arithmetic progression with increment 5:
0 5 10 15 20 25 30 35 40 45
Geometric progression with default base:
1 2 4 8 16 32 64 128 256 512
Geometric progression with base 3:
1 3 9 27 81 243 729 2187 6561 19683
Fibonacci progression with default start values:
0 1 1 2 3 5 8 13 21 34
Fibonacci progression with start values 4 and 6:
4 6 10 16 26 42 68 110 178 288
```

### Without virtual function, the output of the program in the previous slide will be different. Why?

All values will print the same as the Arithmetic progression with default increment.
Due to Static binding since the variable prog is of type Progression.

---

## Other Types of Inheritance (Summary)

```C++
class Base { // base class
	protected: int foo;
	public: int bar;
};
class Derive1 : public Base { // public inheritance
	// foo is protected and bar is public
};
class Derive2 : protected Base { // protected inheritance
	// both foo and bar are protected
};
class Derive3 : private Base { // public inheritance
	// both foo and bar are private
}
```

## Dynamic Casting

Dynamic casting can only be applied to polymorphic objects, that is, objects that come from a class with at least one virtual function.
`dynamic cast < desired type > ( expression )`

```C++
Student* sp = dynamic cast(pp[1]); // cast pp[1] to
Student* sp−>changeMajor("Chemistry"); // now changeMajor is legal
```

## Interfaces and Abstract Base Classes/Pure Virtual Functions

**Abstract classes** is a class only used as a base class for inheritance. It cannot be used to create instances directly. It's like the abstract concept of a shape, but a shape in itself is not an object--but subclasses of shapes like triangles and squares are objects.

In C++, an abstract class is defined when one or more members are **abstract** or **pure virtual**.

- **Pure virtual** is when a function is given "`=0`" in place of its body.
  - C++ does not allow the creation of a pure virtual function.
    - As a result, the compiler will not allow the creation of objects of type Progression, since the function nextValue is “pure virtual.” However, its derived classes, ArithProgression for example, can be defined because they provide a definition for this member function.
    -

```C++
class Progression { // abstract base class
	// . . .
	virtual long nextValue() = 0; // pure virtual function
	// . . .
};

```

## Interfaces and Abstract Base Classes

While C++ does not provide a direct mechanism for defining interfaces for abstract data types--we can use abstract classes to achieve much of the same purpose.

```C++
class Stack { // stack interface as an abstract class
public:
	virtual bool isEmpty() const = 0; // is the stack empty?
	virtual void push(int x) = 0; // push x onto the stack
	virtual int pop() = 0; // pop the stack and return result
}
```

```C++
class ConcreteStack : public Stack {    // implements Stack
public:
	virtual bool isEmpty() { . . . }   // implementation of members
	virtual void push(int x) { . . . } // . . . (details omitted)
	virtual int pop() { . . . }
private:
	// . . . /                         / member data for the implementation
};
```
