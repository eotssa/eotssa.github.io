---
title: Subnetting (Part 1)
date: 2024-02-28 18:58:41
tags: 
categories:
  - IT
---
## Overview
- CIDR (Classless Inter-Domain Routing)


## IPv4 Review
- CIDR throws away Class A, B, C, D, E in IPv4.

| Class | First Octet (Binary) | First octet range (decimial) |                             | Prefix Length |
| ----- | -------------------- | ---------------------------- | --------------------------- | ------------- |
| A     | 0xxxxxxx             | 0 - 127                      | 0.0.0.0 - 127.255.255.255   | /8            |
| B     | 10xxxxxx             | 128 - 191                    | 128.0.0.0 - 191.255.255.255 | /16           |
| C     | 110xxxxx             | 192 - 223                    | 192.0.0.0 - 223.255.255.255 | /24           |
| D     | 1110xxxx             | 224 - 239                    | 224.0.0.0 - 239.255.255.255 |               |
| E     | 1111xxxx             | 240 - 255                    | 240.0.0.0 - 255.255.255.255 |               |
However, only class A, B, C can be assigned to a device. The other 2 are reserved. 

![](../../images/Pasted%20image%2020240228212411.png)

## IPv4 Addresses and Assignment
- The IANA (Internet Assigned Numbers Authority) assigns IPv4 addresses/networks to companies based on their size.
	- For example, a very large company might receive a class A or class B network, while a small company might receive a class C network. 
	- This system can lead to many wasted IP addresses. 
		- Point-to-point networks typically use class C networks. 
			- ![](../../images/Pasted%20image%2020240228220709.png)
		- Or perhaps a company has 5000 end hosts, which is too large for a class C, so a class B must be used, resulting in 60,000~ addresses wasted. 
## CIDR (Classes Inter-Domain Routing)

- IETF (Internet Engineering Task Force) introduced CIDR in 1993 to replace classful addressing system. 
- The removal of class allowed for larger networks to be split into smaller networks, called '**subnetworks**' or '**subnets**'

Consider the following
![](../../images/Pasted%20image%2020240228221053.png)
- CIDR let's us use different prefix lengths. 

## CIDR Practice

### 203.0.113.0/25 = 2^7 = 128 - 2 = 126
![](../../images/Pasted%20image%2020240228221501.png)

### 203.0.113.0/26
![](../../images/Pasted%20image%2020240228222046.png)
### 203.0.113.0/27
![](../../images/Pasted%20image%2020240228222057.png)
### 203.0.113.0/28
![](../../images/Pasted%20image%2020240228222119.png)
### 203.0.113.0/29
![](../../images/Pasted%20image%2020240228222135.png)
### 203.0.113.0/30
![](../../images/Pasted%20image%2020240228222153.png)
## /30 is a subnet of the class C network. 
- 203.0.113.0/30 includes 203.0.113.0 - 203.0.113.3, 4 possible addresses, but only 2 usable addresses. 
![](../../images/Pasted%20image%2020240228231451.png)

### The remaining addresses in 203.0.113.0/24 address block (203.0.113.4 - 203.0.113.255) are now available to be used in other subnets! 

## Is there a way to be even more efficient beyond /30?

### What's so special about /31?
![](../../images/Pasted%20image%2020240228231649.png)
- There are 0 usable addresses. However, **for a point-to-point connection**, it's possible to use a /32 netmask. 
- 203.0.113.0/31 contains the addresses:
	- 203.0.113.0
		- 11001011.00000000.01110001.00000000
	- 203.0.113.1
		- 11001011.00000000.01110001.00000001
- Such a configuration is valid for a point-to-point connection. 
- The remaining addresses in the 203.113.0/24 address block (203.0.113.2 - 203.0.113.255) are available to be used in other networks. Great.


## and /32?
![](../../images/Pasted%20image%2020240228232043.png)
- Unusable to configure interfaces. 
- Some uses include: 
	- Static route to specify an exact host. 
	- Other...


## CIDR Notation (Class C)

![](../../images/Pasted%20image%2020240228232151.png)

## Question 1

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
etc. 