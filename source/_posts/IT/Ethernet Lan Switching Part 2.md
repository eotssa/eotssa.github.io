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

- Finally, when the ARP reply is received by the original sender (PC 1), it is added to the ARP table. 

![](../../images/Pasted%20image%2020240223165215.png)

### [CMD] arp - a
- Use `arp -a` to view the ARP table.
- Internet Address = IP Address (Layer 3 address)
- Physical Address = MAC address (Layer 2 address)
- Type static = default entry
- Type dynamic = learned via ARP

## Ping
- Network utility to test reachability
- Measures Round-Trip-Time (RTT)
- Uses two messages (like ARP): ICMP Echo Request and ICMP Echo Reply
	- However, unlike ARP, it is sent to a specific host, so it must know the destination of the MAC address, which is why ARP must be used first.

### What is the arp command in Linux, Mac, Windows IOS? What about CISCO?
- Windows/Mac/Linux all use `arp`
- Cisco switches use `show arp` from previlged EXEC mode 

### This is a ping request on a CISCO switch. What is a likely reason the first ping failed?

![](../../images/Pasted%20image%2020240223170234.png)
- PC1 likely did not know the destination MAC address. So it had to use ARP first.

### Take a look at the ARP table after the ping.

![](../../images/Pasted%20image%2020240223170528.png)

- Notice the protocol ARP. 
- The ARP request is asking "Who has 192.161.1.3" and to 'Tell 192.168.1.1'.
- Followed by an ARP reply on frame 2.
![](../../images/Pasted%20image%2020240223170835.png)

- Also note in frame 4 and frame 5 have reversed source and destination.
![](../../images/Pasted%20image%2020240223170915.png)

- In short, if device A wants to send traffic to device B on the SAME NETWORK, device A must use ARP. Then it can send traffic to device B.


## MAC Address Table on Cisco
- `#show mac address-table`

![](../../images/Pasted%20image%2020240223180109.png)
- 
