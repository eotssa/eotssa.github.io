---
title: "[CCNA] Ethernet Lan Switching Part 2"
categories:
  - IT
date: 2024-02-23 18:32:48
tags:
---
## Ethernet Frames - Cont 
- Preamble and SFD is usually NOT consideered part of the Ethernet header.
- Therefore, the size of the Ethernet header is "technically" 18 bytes.
	- [Preamble (7) - SFD (1) - Destination (6) - Source (6) - Type (2)] + [SFD (4)]
- The minimum size of an Ethernet frame is 64 bytes.
	- 64 bytes - 18 bytes (header + trailer size) = **46 bytes**.
	- Therefore, the minimum payload (packet) size is 46 bytes. If the payload is less than 46 bytes, padding bytes are added. Padding bytes consists of just 0's. 

## Ethernet LAN Switching

- First half of the MAC address indicates the organization/company.
- When you send data, it includes more than just a source and destination MAC address. It also includes an IP packet, which includes SRC IP and DST IP. 
	- When you send data, the sender doesn't necessarily know the receiver's MAC address. Remember, these switches are layer 2 devices. They don't operate at layer 3. 
	- So, how does it learn PC 3's MAC address? 

### ARP
- ARP stands for 'Address Resolution Protocol'
- ARP is used to discover the Layer 2 address (MAC address) of a known Layer 3 address (IP address).
- Consists of two messages: ARP Request and ARP Reply.
	- ARP Request is send as a **broadcast** = sent to all hosts on the network
	- ARP Reply is a **unicast** which is only send to one host.

### ARP Request
- Before PC1 sends something to PC3, it must send an ARP Request Frame.
- Notice the 'FFFF.FFFF.FFFF.FFFF', which is known as a **broadcast** frame. 
	- It is similar to an unknown unicast frame. 
	- A broadcast frame is dropped when the destination IP address does not match. 

![](../../images/Pasted%20image%2020240223164715.png)

- Once the ARP Request reaches its intended sender (by matching IP addresses), an ARP reply is sent back. 

![](../../images/Pasted%20image%2020240223165019.png)

