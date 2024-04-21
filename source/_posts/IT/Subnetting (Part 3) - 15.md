---
title: Subnetting (Part 3)
date: 2024-03-04 00:40:03
tags: 
categories:
  - IT
---
## Overview
- Subnetting Class A Networks
- VLSM (Variable-Length Subnet Masks)

![](../../images/Pasted%20image%2020240304123240.png)
### Subnetting Class A Networks

Given the 10.0.0.0/8 network. Create 2000 subnets. 
What prefix length is used?
How many host addresses (usable addresses) will be in each subnet? 

00001010.00000000.00000000.00000000 (10.0.0.0)
11111111.00000000.00000000.00000000 (255.0.0.0)

2^x = 2000?
2^11 = 2048, 11 borrowed bits. 

00001010.(00000000.000)00000.00000000 (10.0.0.0)
11111111.11111111.11100000.00000000 (255.255.224.0)

How many hosts per subnet?
Given 13 remaining bits....
- 2^13 -2 = 8190 host bits

Answer: /19 prefix, and each host addresses will have 8190 usable hosts in each subnet.


### PC1 has an IP address of 10.217.182.223/11.

Identify the following:
1. Network address:
2. Broadcast address:
3. Last usable address
4. Number of host (usable addresses): 

/11 means 3 borrowed bits in class A
00001010.(110)10001.xxxxxxxx.xxxxxxxx

That means the subnet it belongs to will be the following:
00001010.(110)00000.xxxxxxxx.xxxxxxxx (10.192.0.0) 
which is also the network address: 10.192.0.0

The broadcast address would be the following:
00001010.(110)11111.11111111.11111111 
10.191.255.255

The last usable address would be therefore...
10.191.255.254


The number of hosts depends on the bits remaining after the borrowed amount, which in this case would be...
00001010.(110)(00000.xxxxxxxx.xxxxxxxx) = 21 host bits
2^21 = 2097152
2097152 - 2 = **2097150**

Final answer:
1. Network address: 10.192.0.0/11
2. Broadcast address: 10.191.255.255/11
3. Last usable address: 10.191.255.254/11
4. Number of host (usable addresses): 2097150

## Variable-Length Subnet Masks (VLSM)
- Until now, the subnetting questions used FLSM (Fixed-Length Subnet Masks)
	- FLSM means that all subnets use the same prefix length. 
- VLSM (Variable-Length-Subnet Masks) is the process of creating subnets of different sizes to make network addresses more efficient.

### Create 5 subnets to provide IP address to all hosts.

![](../../images/Pasted%20image%2020240304131453.png)

- If we used FLSM, we would need to borrow 3 bits (for 8 subnets) , leaving 5 host bits, 2^5 - 2 = 30 host addresses, not enough for Tokyo LAN A or Toronto LAN B. 
- VLSM provides some efficiency gains.

## VLSM - Steps
1. Assign the largest subnet a the start of the address space.
2. Assign the 2nd largest after. 
3. Repeat until largest to smallest.
---

Tokyo LAN A (110) -> Toronto LAN B (45)-> Toronto LAN A (29) -> Tokyo LAN B (8) -> P2P (1)

Tokyo LAN A:
- Since 110 hosts are required, for a class C, we can use /25, we leaves us with 2^7 - 2 = 126 usable addresses. 
11000000.10101000.00000001.(0)0000000 (192.168.1.0)


Network address: 192.168.1.0/25
Broadcast address: 192.168.1.127/25
First usable address 192.168.1.1/25
Last usable address: 192.168.1.126/25
Total number of usable host addresses: 126 

So our first subnet is 192.168.1.0/25 for Tokyo LAN A, which uses up half of the network space of the 192.168.1.0/24 network, which shouldn't be an issue for VLSM, which we can assign smaller subnets.

---
Toronto LAN B (45): 
- The broadcast address of Tokyo LAN A is where the address space "ends", 192.168.1.127/25. 
- Therefore, the next value should be the network address of Toronto LAN B, which is 192.168.1.128. 
- What should be the prefix length? 
	- Since Toronto LAN B requires 45 hosts, 6 host bits is required to give us 2^6 - 2 = 62 usable addresses. 
	- This means that the subnet will be /26, making our network address 192.168.1.128/26. 
- The broadcast address is the last possible address in the subnet. Given a possible of 64 addresses (62 usable), 192.168.1.128 + 63 (since .128 counts as 1) = 192.168.1.191. 
	- Another way of doing this is just take the network address:
		- 11000000.10101000.00000001.(10)000000 (192.168.1.128) => change all host bits to 1
		- 11000000.10101000.00000001.(10)111111 (192.168.1.191)


Network address: 192.168.1.128/26
Broadcast address: 192.168.1.191/26
First usable address 192.168.1.129/26
Last usable address: 192.168.1.190/26
Total number of usable host addresses: 62 

---
Toronto LAN A
- Recall Toronto LAN B has Broadcast address: 192.168.1.191/26. So,
- The network address of Toronto LAN A (29 host) should be 192.168.1.192.
- What is the prefix length? 
	- The host borrowed bits should be 5. 2^5 - 2 = 30 hosts.
	- This means the network bits will be 3 (8 - 5), which is /27. 

- Broadcast address is therefore, 11000000.10101000.00000001.(110)00000 => 
									- 11000000.10101000.00000001.(110)11111 (223)

Network address: 192.168.1.192/27
Broadcast address: 192.168.1.223/27
First usable address 192.168.1.193/27
Last usable address: 192.168.1.222/27
Total number of usable host addresses: 30 hosts

---
Tokyo LAN B (8 hosts)
- Same process. 

Network address: 192.168.1.224
- prefix should be /28 because 4 host bits = 16 - 2 = 14 hosts (so 4 network bits)
Network address: 192.168.1.224/28

Broadcast Address:
- Given the network address: 192.168.1.224/28 (11000000.10101000.00000001.(1101)0000),
	- the broadcast address is (11000000.10101000.00000001.(1101)1111):
		- 192.168.1.239/28


- Network address: 192.168.1.224/28
- Broadcast Address: 192.168.1.239/28
- First usable address: 192.168.1.225/28
- Last usable address: 192.168.1.240/28
- Number of host: 14

---
Point to  Point Connection

- 192.168.1.239/28 is the broadcast address of Tokyo LAN B. 
- 192.168.1.40 should be the point-to-point connection.
	- What is the prefix length? 
		- /31 works well because there are 4 possible addresses, 2 reserved, 2 for host.
		- /32 works works as well...
		- /30 is the CORRECT CCNA answer. 
			- 192.168.1.40/30
			- /30 has 2 borrowed bits, so 4 addresses. 2 for network and broadcast. 2 for host, one of which is used for point-to-point.

![](../../images/Pasted%20image%2020240304174224.png)

## Other Resources
- subnettingquestions.com
- subnetting.org
- subnettingpractice.com

