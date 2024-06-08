---
title: Huffman Compression Algorithm Using Preorder Traversal
categories:
  - CPlusPlus
date: 2024-02-02 22:44:07
tags:
---

```C++
#include <iostream>
#include <string>
using namespace std;


struct Node {
    char ch = '\0';
    int freq = 0;
    Node* left;
    Node* right;
};

void Preorder_HuffmanCodes(Node* root, string huffcode) {
    if (root == NULL) return;

    if (root->left == NULL && root->right == NULL) {
        cout << root->ch << ": " << huffcode << endl;
        return;
    }

    Preorder_HuffmanCodes(root->left, huffcode + "0"); // left, add 0
    Preorder_HuffmanCodes(root->right, huffcode + "1"); // right, add 1
}


int main() {

    // Get user input
    string IN;
    int frequencies[256] = {0};   // ASCII 0 - 255

    cout << "enter text: \n";
    getline(cin, IN, '\n');

    // Populate frequencies, takes advantage of 1:1 match of array index and ASCII
    for (int i = 0; i < IN.length(); i++) {
        int c = int(IN[i]);
        frequencies[c]++;
    }

    // Counts the non-zero frequencies and stores the number into a 'count' variable
    int count = 0;
    for (int i = 0; i < 256; i++) {
        if (frequencies[i] > 0) {
            count++;
        }
    }

    // Allocates memory for just the non-zero frequencies and stores corresponding ASCII char to frequency
    int *F = new int[count];
    char *C = new char[count];
    int index = 0;
    for (int i = 0; i < 256; i++) {
        if (frequencies[i] > 0) {
            C[index] = char(i);
            F[index] = frequencies[i];
            index++;
        }
    }

    // Printing the C and F arrays
    cout << "\nCharacter and frequency values after being read: \n";
    for (int i = 0; i < count; i++) {
        cout << "Character: " << C[i]
             << ", Frequency: " << F[i] << endl;
    }

    // Insertion Sort based on F (frequency)
    for (int i = 1; i < count; i++) {
        char keyChar = C[i];
        int keyFreq = F[i];
        int j = i - 1;

        while (j >= 0 && F[j] > keyFreq) {
            C[j + 1] = C[j];
            F[j + 1] = F[j];
            j = j - 1;
        }

        C[j + 1] = keyChar;
        F[j + 1] = keyFreq;
    }



    // Printing the C and F arrays
    cout << "\nCharacter and freqency values after being sorted: \n";
    for (int i = 0; i < count; i++) {
        cout << "Character: " << C[i]
             << ", Frequency: " << F[i] << endl;
    }
    cout << endl;


    //Huffman Code Binary Tree

    // Adds the sorted character-frequency arrays into a node structure
    Node* sortedNodes[count];
    for (int i = 0; i < count; i++) {
        sortedNodes[i] = new Node();
        sortedNodes[i]->ch = C[i];
        sortedNodes[i]->freq = F[i];
    }



    while (count > 1) {
        Node* right = sortedNodes[0];
        Node* left = sortedNodes[1];

        Node* combined = new Node();
        combined->freq = left->freq + right->freq;
        combined->left = left;
        combined->right = right;


        // shifts nodes to the to the left by 2 (the furthest right two nodes are still present and accessible, but aren't used )
        // even if sortedNodes[0] and sortedNodes[1] get replaced by [2] and [3], the 'combined" Node still points to their memory locations
        for (int i = 2; i < count; i++) {
            sortedNodes[i - 2] = sortedNodes[i];
        }
        count -= 2;

        // Add the combined node at the end of the sortedNode
        sortedNodes[count] = combined;
        count++;

        // Sort the entire sortedNode using insertion sort
        for (int i = 1; i < count; i++) {
            Node* key = sortedNodes[i];
            int j = i - 1;

            while (j >= 0 && (sortedNodes[j]->freq) > (key->freq)) {
                sortedNodes[j + 1] = sortedNodes[j];
                j = j - 1;
            }
            sortedNodes[j + 1] = key;
        }

    }
    // when one node remains, it is set to root
    Node* root = sortedNodes[0];

    // Now... to generate the huffman codes. Preorder traversal.
    cout << "The huffman codes for the given string '" + IN + "' is:" << endl;
    Preorder_HuffmanCodes(root, "");

}

```

1. The program takes into account extended ASCII characters which is 0 - 255, and creates
   two separate arrays that correspond with the ASCII character to frequency.

```C++
    // Get user input
    string IN;
    int frequencies[256] = {0};   // ASCII 0 - 255

    cout << "enter text: \n";
    getline(cin, IN, '\n');

    // Populate frequencies, takes advantage of 1:1 match of array index and ASCII
    for (int i = 0; i < IN.length(); i++) {
        int c = int(IN[i]);
        frequencies[c]++;
    }

    // Counts the non-zero frequencies and stores the number into a 'count' variable
    int count = 0;
    for (int i = 0; i < 256; i++) {
        if (frequencies[i] > 0) {
            count++;
        }
    }

    // Allocates memory for just the non-zero frequencies and stores corresponding ASCII char to frequency
    int *F = new int[count];
    char *C = new char[count];
    int index = 0;
    for (int i = 0; i < 256; i++) {
        if (frequencies[i] > 0) {
            C[index] = char(i);
            F[index] = frequencies[i];
            index++;
        }
    }

```

2. I used insertion sort to create code that sorted both the character and frequency array in tandem from lowest to highest frequency.

3. Store the already sorted character-frequncy arrays into a node structure array.

4. The sorted Node array provided a massive
   advantage because I could simply take the first two Node structs in the array and combine
   them into a new Node. The combined Node will contain the combined frequency of the first
   two Node structs, and also point to the first two Node structs.

   I shift the sortedNode array to the left by 2. This overrides the first 2 nodes. However, the
   implementation of our sortedNodes is such that the “combined” Node still points to Node
   [c:2] and Node [b:3] memory locations. I also decremented the count by 2.

   Then, I add the “combined” Node back into the sortedNodes array and increment the count.

   Then, I sort the sortedArray again.

   This process repeats itself until there is one node remaining, which then the while loop
   condition exits, and I assign the last remaining node as “root”

5. Obtaining the Huffman codes. I used preorder traversal. I tried to avoid helper functions,
   but in order to preorder traverse, I only knew how to do so recursively. I passed the root
   Node and an empty string as arguments. Any time a left node was visited, I concatenated a
   0 to the string, and any time a right node was visited, I concatenated a 1 to the string.
