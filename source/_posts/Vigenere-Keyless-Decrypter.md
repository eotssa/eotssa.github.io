---
title: Vigenere Keyless Decrypter
categories:
  - CPlusPlus
date: 2024-02-02 23:11:42
tags:
---

The code here is used to decrypt a vigenere cipher. Most decryption programs require you to know the length of the key. The code below automatically brute force generates all possible key choices. As soon as you see a repeating key segment, that's when you know you've found the key.

Adjust `ifstream file("e12e9445_ve.txt");` to path to your input text file.

Adjust `int maxKeyLength = 10;` if you believe your vigenere key is more than 10 characters long.

```C++
#include <iostream>
#include <string>
#include <fstream>
#include <vector>
#include <algorithm>
using namespace std;

void coincidence(string);
string getVE_key(string, int);
string VE_Decrypt(string, string, int);

int main() {
    ifstream file("e12e9445_ve.txt");
    if (!file.is_open()) {
        cout << "Error opening input file \n";
        return 1;
    }

    string encryptedText((istreambuf_iterator<char>(file)), istreambuf_iterator<char>());
    file.close();

    int maxKeyLength = 10;  // Maximum key length, increase if results aren't matching
    for (int keyLength = 1; keyLength <= maxKeyLength; ++keyLength) {
        string VE_key = getVE_key(encryptedText, keyLength);
        cout << "Key Length: " << keyLength << ", Key: " << VE_key << endl;

        // string decryptedText = VE_Decrypt(encryptedText, VE_key, keyLength);
        // cout << "Decrypted Text with Key Length " << keyLength << ":\n" << decryptedText << "\n\n";
    }

    return 0;
}

string getVE_key(string encryptedText, int keyLength) {
    string VE_key = "";
    int counterVal = 0;
    while (counterVal != keyLength) {
        int encryptedFrequency[26] = {0};
        string ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (int i = counterVal; i < encryptedText.size(); i+=keyLength) {
            char ch = encryptedText.at(i);
            int pos = ALPHABET.find(ch);
            if (pos != string::npos) {
                encryptedFrequency[pos]++;
            }
        }

        int totalLetters = 0;
        for (int i = 0; i < 26; i++) {
            totalLetters += encryptedFrequency[i];
        }

        double encryptedFreqencyList[26];
        for (int i = 0; i < 26; i++) {
            encryptedFreqencyList[i] = (double)encryptedFrequency[i] / totalLetters;
        }

        vector<double> englishAlphabetFrequency = {0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02228, 0.02015, 0.06094,
        0.06966, 0.00153, 0.00772, 0.04025, 0.02406, 0.06749, 0.07507, 0.01929, 0.00095, 0.05987, 0.06327, 0.09056, 0.02758,
        0.00978, 0.02360, 0.00150, 0.01974, 0.00074};

        double calculatedArray[26][26];

        for (int j = 0; j < 26; j++) {
            for (int i = 0; i < 26; i++) {
                calculatedArray[j][i] = encryptedFreqencyList[i] * englishAlphabetFrequency[i];
            }
            double temp = englishAlphabetFrequency.back();
            englishAlphabetFrequency.insert(englishAlphabetFrequency.begin(), temp);
            englishAlphabetFrequency.pop_back();
        }

        double finalArrayCalculation[26];
        for (int j = 0; j < 26; j++) {
            double sum = 0;
            for (int i = 0; i < 26; i++) {
                sum += calculatedArray[j][i];
            }
            finalArrayCalculation[j] = sum;
        }

        int posOfHighestFrequencyShift = 0;
        double max = finalArrayCalculation[0];
        for (int i = 1; i < 26; i++) {
            if (finalArrayCalculation[i] > max) {
                max = finalArrayCalculation[i];
                posOfHighestFrequencyShift = i;
            }
        }

        char shiftKey = posOfHighestFrequencyShift + 65;
        VE_key += shiftKey;

        counterVal++;
    }

    return VE_key;
}

string VE_Decrypt(string txt, string key, int keyLength) {
    string decryptedText = "";
    int txtLen = txt.length();
    for (int i = 0, j = 0; i < txtLen; ++i) {
        char c = txt[i];

        if (c >= 'A' && c <= 'Z') {
            decryptedText += (c - key[j] + 26) % 26 + 'A';
            j = (j + 1) % keyLength;
        } else {
            decryptedText += c;
        }
    }
    return decryptedText;
}

```
