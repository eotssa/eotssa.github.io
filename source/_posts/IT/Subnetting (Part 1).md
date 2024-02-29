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
- /30 is a subnet of the class C network. 


### What's so special about /31 and /32?
203.0.113.0/31
203.0.113.0/32




