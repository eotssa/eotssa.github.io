---
title: VLAN - 3
date: 2024-03-07 13:07:54
tags:
---
## Overview
- Native VLAN on a Router
- Wireshark analysis
- Layer 3 Switching/Multilayer Switching
	- Switches are Layer 2 devices, and don't use IP addresses. However, many modern switches are Layer 3 capable. 

- DTP (Dynamic Trunking Protocol) - Not in CCNA
- VTP (VLAN Trunking Protocol) - Not in CCNA


## Native VLAN on a router (ROAS)
- Native VLANs are a security concern, but if you want to use it. Here's how:
- Native VLANs are good for efficiency because they are untagged. 


- Two methods of configuring Native VLAN on Router
Method 1: 
	- `encapsulation dot1q VLAN-ID native` in a subnet interface
![](../../images/Pasted%20image%2020240307131313.png)

Consider the following image. 
![](../../images/Pasted%20image%2020240307131753.png)
![](../../images/Pasted%20image%2020240307131808.png)
- Source and Destination IP addresses
- Ethernet Header (encapsulating IP packet):
	- Type: 802.1Q Virtual LAN (0x8100) - dot1q is inserted after the source MAC address field
		- This is the TPID
	- PCP: 0 - no special priority
	- DEI: drop eligiblity indicator
	- **VLAN ID = 20 ; this is expected because it's not the native VLAN**
	- Type: IPv4 (0x800) - indicates an IPv4 header is encapsualted

![](../../images/Pasted%20image%2020240307132129.png)
- Since the destination is in VLAN 10 in R1, SW2 and SW1, the packet capture should not display a VLAN-ID in the dot1q frame. 
- R1 -> SW2: A ICMP echo request is made by R1 now.
![](../../images/Pasted%20image%2020240307132251.png)
- It's been encapsulates by a new ethernet header. 
- But this ethernet header does not have a dot1q tag. Both R1 and SW2 understand that untagged frames belong to VLAN 10. 
![](../../images/Pasted%20image%2020240307132409.png)
- The ICMP request goes to the destination untagged all the way (R1 0 -> SW2 -> SW1 -> PC1).
- When PC1 replies (192.168.1.1), it'll remain untagged from PC1 -> SW1 -> SW2 -> R1. 
- But once R1 is reached, R1 will tag the frame with a dot1q VLAN ID: 20. 




### 2nd method: Configure the IP address for the native VLAN on the router's physical interface (the encapsulation dot1q VLAN-ID is not necessary)

![](../../images/Pasted%20image%2020240307132532.png)