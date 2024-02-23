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
- Notice the 'FFFF.FFFF.FFFF', which is known as a **broadcast** frame. 
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


## MAC Address Table on Cisco and Commands
- `#show mac address-table`

![](../../images/Pasted%20image%2020240223180109.png)
- **Aging**: if a Cisco switch does not receive any traffic from that MAC address for 5 minutes, it'll delete.
- Another way `clear mac address-table dynamic`
- If you want to delete a specific mac address: `clear mac address-table dynamic address MAC-ADDRESS`
- You can also do it via interface: `clear mac address-table dynamic interface INTERFACE-ID`

## Ethernet Frame (Cont.) What if we send a ping with a payload of size 36?
- `#ping 192.168.1.3 size 36`
![](../../images/Pasted%20image%2020240223180554.png)
- Recall that the minimum payload size of an ethernet frame (not accounting for the preamble and SFD) is 46 bytes.
- If we send a size 36 byte payload, how many 0's will there be in the padding?
	- Each hexadecimal 0 = 4 bits ((recall hexadecimal is 16, so 2^4, takes 4 bits to represent one hexadecimal number))
	- So, 00 = 8 bits = 1 byte
	- If you count the 0's, there should be 20 bits (10 bytes). 

## What is the ARP ethernet Type? 
- **ARP: 0x0806**
- IPv4: 0x86DD
- IPv6: 0x0800 (?)


## Conclusion
- Ethernet frame payload minimum size
- ARP (Address Resolution Protocol): ARP Request/Reply
- ARP Table (in CISCO)
- Ping (ICMP Echo Request/Reply)
- MAC Address (CISCO clear MAC addresses all/via MAC address/via INTERFACE ID)

## Question 1
You send a 36-byte ping to another computer and perform a packet capture to analyze the network traffic. You notice a long series of bytes of 00000000 at the end of the Ethernet payload. How can you explain these zeros?
- Padding bytes.
	- The minimum payload size is 46 bytes.

## Question 2
Which of these messages is sent to all hosts on the local network? 
a. ARP Request - Answer -- learns a layer 2 address of the host, which if not known, needs to be broadcast to all host on the network.
b. ARP Reply : unicast message -- 
c. ICMP echo request: -- also a unicast message, requires
d. ICMP echo reply -- also a unicast reply


## Question 3
Which fields are present in the output of the `show mac address-table` command on a Cisco switch?
C) VLAN, MAC Address, Type, Ports

## Question 4
Which type o frames does a switch send out of all interfaces, except one frame was received on?
- Broadcast AND unknown unicast. 
	- Broadcast frames have a destination address of FFFF.FFFF.FFFF and are sent to all hosts on the local network.
	- Unknown unicast frames are destined for a single host. However, the switch does not have an entry for the destination in its MAC address table so it must flood the frame. 

## Which command is used on a Cisco switch to clear all dynamic MAC addresses on a specific interface from the MAC address table?

`clear mac address-table dynamic interface INTERFACE-ID`