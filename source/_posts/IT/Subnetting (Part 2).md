---
title: Subnetting (Part 2)
date: 2024-02-28 23:43:35
tags: 
categories:
  - IT
---
## Overview
- Subnetting practice for class C
- Subnetting class B networks (same process)


## Subnet for Class C Question

![](../../images/Pasted%20image%2020240228232311.png)
1. Determine the number of networks required. 
	1. 45 + 2 = 47
	2. 47 * 4 = 188 (well within the range of a class C subnet which has 256 subnets)
2. How to calculate the subnets we need to make? 
	1. /30 gives us 2^2 - 2 = 4 usable addresses
	2. /29 gives us 2^2 - 2 = 6 usable addresses
	3. /28 gives us 2^4 - 2 = 14 usable addresses
	4. /27 gives us 2^5 - 2 = 30 usable addresses
	5. /26 gives us 2^6 - 2 = 62 usable addresses  -- this provides us more than we need. 

Subnet 1: 192.168.1.0/26 
- (range is 192.168.1.0 to 192.168.1.63), where...
	- 192.168.1.0 = network addresses
	- 192.168.1.63 = broadcast address
		- We can also determine this by simply going 00111111 = 63 
	- 192.168.1.1 = first usable 
	- 192.168.1.62 = last usable
Subnet 2: 192.168.1.64/26  
- (range is 192.168.1.64 to 192.168.1.127), where...
	- 192.168.1.64 = network addresses
	- 192.168.1.127 = broadcast address
Subnet 3: 192.168.1.128 - 192.168.1.191
Subnet 4: 192.168.1.192 - 192.168.1.255

- Increments of 64s... 


### Tip #1 ('Borrowing' Bits)
- Take a look at the CIDR notation. /26, means it "borrows" the last 2 bits in the octet. 
	- X1XXXXXXX, in this case, the '1' position is in the 64th bit, hence 64 bit increments for the subnets. 
- 2^x = number of subnets (where x = 'borrowed' bits)


/25, means borrowing 1XXXXXXXX, 128. 
- 0 - 127
- 128 - 256

/26, 2 bits, 2^2 = 4 subnets

/27, 3 bits, 2^3 = 8 subnets
- 256/32 = 8 
- 0, 32, 64, 96, 128, 160, 192, 224


### What subnet does host 192.168.5.57/27 belong to?
- /27 -> 3 borrowed -> 32 increments -> which means 2nd subnet -> 192.168.5.32/27

### What subnet does host 192.168.29.219/29?
- Should belong to the .216/29 subnet


## Subnet Sizes for Class C Networks

| Prefix Length | # of Subnets | # of Host |
| ------------- | ------------ | --------- |
| /25           | 2            | 126       |
| /26           | 4            | 62        |
| /27           | 8            | 30        |
| /28           | 16           | 14        |
| /29           | 32           | 6         |
| /30           | 64           | 2         |
| /31           | 128          | 0 (2)     |
| /32           | 256          | 0 (1)     |
|               |              |           |
- Note for /31, there's only 2 addresses, one for broadcast and one for network, but a special exception is made for point-to-point networks.

## Subnet Size for Class B Network
(The process of subnetting is exactly the same)
![](../../images/Pasted%20image%2020240303010705.png)


### Create 80 subnets with the 172.16.0.0/16 network. What prefix length should be used?
- xxxxxxxx.xxxxxxxx.00000000.00000000 /16 
- xxxxxxxx.xxxxxxxx.10000000.00000000 /17 // 2 subnets
- xxxxxxxx.xxxxxxxx.11000000.00000000 /18 // 4 subnets
- xxxxxxxx.xxxxxxxx.11100000.00000000 /19 // 8 subnets
- xxxxxxxx.xxxxxxxx.11110000.00000000 /20 // 16 subnets
- xxxxxxxx.xxxxxxxx.11111000.00000000 /21 // 32 subnets
- xxxxxxxx.xxxxxxxx.11111100.00000000 /22 // 64 subnets
- xxxxxxxx.xxxxxxxx.11111110.00000000 /23 // 128 subnets

- The prefix length should be /23. 


### Create 500 subnets with the 172.22.0.0/16 network. What prefix length should be used?
- xxxxxxxx.xxxxxxxx.00000000.00000000 /16 
- xxxxxxxx.xxxxxxxx.10000000.00000000 /17 // 2 subnets
- xxxxxxxx.xxxxxxxx.11000000.00000000 /18 // 4 subnets
- xxxxxxxx.xxxxxxxx.11100000.00000000 /19 // 8 subnets
- xxxxxxxx.xxxxxxxx.11110000.00000000 /20 // 16 subnets
- xxxxxxxx.xxxxxxxx.11111000.00000000 /21 // 32 subnets
- xxxxxxxx.xxxxxxxx.11111100.00000000 /22 // 64 subnets
- xxxxxxxx.xxxxxxxx.11111110.00000000 /23 // 128 subnets
- xxxxxxxx.xxxxxxxx.11111111.00000000 /24 // 256 subnets
- xxxxxxxx.xxxxxxxx.11111111.10000000 /25 // 512 subnets

- The prefix length is /25

### What subnet does host 172.25.217.192/21 belong to?
- xxxxxxxx.xxxxxxxx.11111000.00000000 /21 // 32 subnets (5 borrowed bits)
- 217 is written as 11011001
	- Therefore, the first 5 bits are 11011(000) = 128 + 64 + 16 + 8 = **216** 
		- Answer: 172.25.216.0/21


## Subnets/Host (Class B)

Here is the table in markdown format:

| Prefix Length | Number of Subnets | Number of Hosts per Subnet | Total Number of Hosts... |
| ------------- | ----------------- | -------------------------- | ------------------------ |
| /17           | 2                 | 32766                      | 32768                    |
| /18           | 4                 | 16382                      | 16384                    |
| /19           | 8                 | 8190                       | 8192                     |
| /20           | 16                | 4094                       | 4096                     |
| /21           | 32                | 2046                       | 2048                     |
| /22           | 64                | 1022                       | 1024                     |
| /23           | 128               | 510                        | 512                      |
| /24           | 256               | 254                        | 256                      |
| /25           | 512               | 126                        | 128                      |
| /26           | 1024              | 62                         | 64                       |
| /27           | 2048              | 30                         | 32                       |
| /28           | 4096              | 14                         | 16                       |
| /29           | 8192              | 6                          | 8                        |
| /30           | 16384             | 2                          | 4                        |
| /31           | 32768             | 0 (2)                      | 2                        |
| /32           | 65536             | 0 (1)                      | 1                        |

### Question 1: You have been given 172.30.0.0/16 network. Company requires 100 subnets with at least 500 hosts per subnet. What prefix length should be used?
- Right off the bat, Class C subnets are out of the question. The smallest subnet 2 will likely support only 128 - 2 = 126 hosts.
- Class B subnets should be used here.
- given the 100 subnet requirement...it should be... /16 (0), /17 (2), ... 7 borrowed bits... so /23 should be used.
	- 9 hosts bits allows for 2^9 - 2 = 510 usable addresses.

### Question 2: What subnet does host 172.21.111.201/20 belong to?
Class B, so...
- xxxxxxxx.xxxxxxxx.01101111.xxxxxxxx
	- 64 + 32 = 96 
	- 96 + 8 = 104
	- 104 + 4 = 108
	- 108 + 2 = 110
	- 110 + 1 = 111
- Given /20 for a class B subnet, this means 4 borrowed bits, so...
	- xxxxxxxx.xxxxxxxx.(0110)0000.xxxxxxxx
		- That value is... 64 + 32 = 96, so belongs to 172.21.96.0/20 subnet. 

### What is the broadcast address of the network 192.168.91.78/26?
Class B, so...
- xxxxxxxx.xxxxxxxx.01011011.xxxxxxxx
- /26 is borrowing 10 bits... would need to calculate the last octet in this case as well
- xxxxxxxx.xxxxxxxx.01011011.01001110
- So first 10 bits would be... 
- xxxxxxxx.xxxxxxxx.(01011011.01)001110
- xxxxxxxx.xxxxxxxx.91.64/26 (this would be the subnet)
- Hence, the broadcast address will be the last address of this subnet... **which I have no idea how to calculate.** 
- I assume it'd be - xxxxxxxx.xxxxxxxx.(01011011.01)(111111)
	- So 192.168.91.127/26 is the broadcast address...


### You divide the 172.16.0.0/16 network into 4 subnets of equal size. Identify the NETWORK and BROADCAST addresses of the 2nd subnet.

- 4 equal sizes means 2 borrowed bits.
- xxxxxxxx.xxxxxxxx.11xxxxxx.xxxxxxxx

### You divide the 172.30.0.0/16 network into subnets of 1000 hosts each. How many subnets are you able to make? 
- Even if we don't know it, we can start at /32.
- /32 = 0 (1)
- /31 = 0 (2)
- /30 = 4 (4 addresses, 2 hosts)
- /29 = 8
- ... 16, 32, 64, 128, 256, 512, 
- /22 = 1024 - 2 = 1022 hosts... 
- /22 in subnets is... 6 bits so... 2 (/17) , 4, 8, 16, 32, 64 (/22)
- Answer: 64 subnets. 