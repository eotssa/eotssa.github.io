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
	- 192.168.1.1 = first usable 
	- 192.168.1.62 = last usable
Subnet 2: 192.168.1.64/26  
- (range is 192.168.1.64 to 192.168.1.127), where...
	- 192.168.1.64 = network addresses
	- 192.168.1.127 = broadcast address
Subnet 3: 192.168.1.128 - 192.168.1.191
Subnet 4: 192.168.1.192 - 192.168.1.255

https://www.youtube.com/watch?v=IGhd-0di0Qo&list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ&index=26