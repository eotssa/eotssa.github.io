---
title: defaultPost
date: 2024-04-16 15:17:14
tags: 
categories:
  - IT
---
# Basics of CLI on Cisco


## Privileged EXEC Mode
Provides complete access to view device configuration, restart the device, etc.

Cannot change the configuration, but can change the time on the device, save configuration files, and more.
```
Router>enable
Router#
## '#' indicates privileged EXEC mode
```


## How to Enter Global Configuration Mode

```
Router>enable
Router#configure terminal
## conf t
```

## Enable Password
```
Router(config)#enable password LINE

Router(config)#exit
Router#exit
## Now I am logged out of the device
Router>
Router>enable
Password:
Router#
```

## Running-Config / Startup Config

```
Router#show running-config
## shows our current config, if any changes were made
```

```
Router#show startup-config
startup-config is not present
## Why? 
## Running config isn't saved yet, so default config will be loaded.
```

## Saving the Running Configuration

```BASH
Router#write

Router#write memory 

Router#copy cunning-config startup-config
```

# Service password-encryption

- Changes the way passwords are displayed. 
- If enabled, current passwords will be encrypted.
	- Future passwords will be encrypted.
	- `enable secrets` will not be affected
- If you disable `servie password-encryption`:
	- current passwords will not be decrypted

```
Router# conf t

Router(config)#service password-encryption
```

## Enable Secret Command 

```
Router(config)#enable secret Cisco
Router(config)#do sh run
```
- Uses MD5 encryption, but a little tougher to crack than regular password encryption. 
- `enable secret` does not require the `password-encryption` command to be enabled. 


## Canceling Commands
- Use `no`
```
Router(config)#no service password-encryption
```


## Overview
- `Router>` = user EXEC mode
- `Router#` = privileged EXEC mode
- `Router(config)#` = global configuration mode

```
Router>enable
## used to enter privileged EXEC mode

Router#configure terminal
## used to enter global configuration mode

Router(config)#enable password LINE
## configures a password to protect previliege EXEC mode

Router(config)#service password-encryption
## encrypts the enable password (and other passwords)

Router(config)#enable secret LINE
## configures a more secure, always-encrypted enable password.

Router(config)#run privileged-exec-level [command]
## run is used to escalate previleges to global configuration mode

Router(config)#no [command]
## removes the command

Router(config)#show running-config
## displays current, active config file

Router(config)#show startup-config
## displays the saved config file which will be loaded if the device is restarted

-------------
## Below are all three to save running config 
Router#write

Router#write memory 

Router#copy cunning-config startup-config
```

# Ethernet Lan Switching (Part 1)



## Quick OSI Model Review

### Data Link
- Provides node to node connectivity and data transfer (PC to switch, switch to router, router to router)
- Defines how data is formatted for transmission over a physical medium (e.g., copper UTP cable)
- Detects and possibly correct Physical layer errors
- Uses Layer 2 addressing, separate from layer 3 addressing
- Switches operate a layer 2


## Local Area Networks (LANs)
- Local networks are separated by routers, not switches. 

## The focus will be how switches receive and forward specifically ethernet "frames". [so layer 2...]

## Ethernet Frame
- Ethernet header / Packet / Eth. Trailer

- In the ethernet header:
	- Preamble - SFD - Destination - Source - Type 
		- Preamble and SFD (start frame delimiter): used for synchronization
		- Destination: layer 2 address
		- Source: layer 2 address
		- Type: indicates the layer 3 protocol (typically always IPv4 or IPv6) 
			- However, it can also be a length field.
- In the ethernet trailer:
	- Only one part: FCS (Frame Check Sequence): used by the receiving device to detect for errors


### Preamble and SFD (Start Frame Delimiter)
- Preamble is 7 bytes (56 bits).
	- Alternating 1's and 0's (10101010 * 7)
		- Allows devices to synchronize their receiver's clock
- SFD's length is 1 byte (8 bits)
	- 10101011 (notice it ends in a 1)
	- Marks the end of the preamble and the beginning of the rest of the frame.

### Destination and Source Field
- Indicate the devices sending and receiving the frame. 
- Consists of the destination and source 'MAC' address
- MAC = Media Access Control = 6 byte (48-bit) address of the physical device

### Type OR Length Field
- 2 byte (16 bits)
- A value is 1500 or LESS in this field, indicates the LENGTH of the encapsulated packet in bytes
- A value of 1536 or GREATER in this field, indicates the TYPE of the encapsulated packet (usually IPv4 or IPv6)
	- IPv4 = 0x0800 (2048 in decimal)
	- IPv6 = 0x86DD (34525 in decimal) 


HEADER                                                              | TRAILER
[Preamble (7) - SFD (1) - Destination (6) - Source (6) - Type (2)]    [FCS (4)]


### Ethernet Trailer: FCS (Frame Check Sequence)
- 4 bytes (32 bits)
- Detects corrupted data by running a 'CRC' algorithm over the received data
- CRC = 'Cyclic Redundancy Check'

### Total Size of Ethernet Frame
- 26 bytes. Do you know the sizes individually?


## MAC Address
- 6 byte (48 - bit) physical address assigned to the device
- A.K.A 'Burned-In Address' (BIA)
- MAC addresses are globally unique... 
- The first 3 bytes are the OUI (Organizationally Unique Identifier) - which are assigned to a company
- Last 3 bytes: are unique to the device itself.
- Written as 12 hexadecimal characters.

- Dynamically learned MAC address (switches keep track of MAC addresses and fills dynamically as network traffic flows)
- Unicast frames: a frame destined for a single target
- Unknown Unicast Frame: 
	- If a switch does not know where the destination is; the only option is to **FLOOD** the frame, which means it copies the frame and sends it out to every other system/device (except for where the switch received the frame).
		- A switch will only know where the receiver is if the destination responds back. Otherwise, the switch will continue to FLOOD. 
- For CISCO, dynamic MAC addresses are removed after 5 minutes of inactivity.

#### Other

- Recall FO/1, where F stands for "Fast ethernet"


## Questions
1. Which field of an Ethernet frame provides receiver clock synchronization? 
- Preamble. 

2. How long is the physical address of a network device?
- 48 bits (6 bytes)

3. What is the OUI of this MAC Address? E8BA.7011.2874
- E8BA.70 - OUI is the first HALF. 

4. Which field of an Ethernet frame does a switch use to populate its MAC address table?
- Source address. 


# Ethernet Lan Switching (Part 2)

## Ethernet Frames - Cont. - Preamble and SFD does "not" count. 
- Preamble and SFD is usually NOT considered part of the Ethernet header.
- Therefore, the size of the Ethernet header is "technically" 18 bytes.
	- [Preamble (7) - SFD (1)] || [Destination (6) - Source (6) - Type (2)] + [SFD (4)]
- The minimum size of an Ethernet frame is 64 bytes.
	- 64 bytes - 18 bytes (header + trailer size) = **46 bytes** (if 802.1q (4) tags are not used)
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

## Question 4: 
Which type of frames does a switch send out of all interfaces, except one frame was received on?
- Broadcast AND unknown unicast. 
	- Broadcast frames have a destination address of FFFF.FFFF.FFFF and are sent to all hosts on the local network.
	- Unknown unicast frames are destined for a single host. However, the switch does not have an entry for the destination in its MAC address table so it must flood the frame. 

## Question 5: 
Which command is used on a Cisco switch to clear all dynamic MAC addresses on a specific interface from the MAC address table?

`clear mac address-table dynamic interface INTERFACE-ID`

# IPv4 Addressing (Part 1)

## Recall Layer 3: Network Layer
- Provides connectivity between end hosts on different networks (outside of the LAN)
- Provides logical addressing (IP addresses)
- Provides path selection between source and destination.
- Routers operate at Layer 3

## Routing
- Recall switches simply expand networks. Therefore, PCs within the same LAN have the same IP addresses within the same network. 

## What does the IP address indicate?
- The three group 192.168.X indicates network itself.
- Y in 192.168.X.Y represents the PCs/clients/servers.
- The `/24` represents the network and which part represents the end-host.
	- `/24` says the first 3 group of the numbers represents the network. 

![](../../images/Pasted%20image%2020240224112821.png)

### The router in the picture above requires an IP address.
- `G0/0` interface is given 192.168.1.254
- `G0/1` interface is given 192.168.2.254
![](../../images/Pasted%20image%2020240224113153.png)
- The broadcast signal is forwarded to 192.168.1.2 and 192.168.1.254. 
	- Broadcast signals are limited within the local network. 


## IPv4 Header (Let's focus on Source and Dest IP address atm)
- IP addresses are 32 bits (4 bytes) in length.
![](../../images/Pasted%20image%2020240224113332.png)

### 192.168.1.254: A closer look
- Each group of numbers represents 8 bits. 
	- 192 = 8 bits => 11000000
	- 168 = 8 bits => 10101000
	- 1 = 8 bits => 00000001
	- 254 = 8 bits = 11111110
- Instead of binary, we use **dotted decimal**.

### Recall Decimal, Hexadecimal, and Binary Notation 
![](../../images/Pasted%20image%2020240224113921.png)
![](../../images/Pasted%20image%2020240224114039.png)![](../../images/Pasted%20image%2020240224114146.png)

### Decimal to Binary...
![](../../images/Pasted%20image%2020240224114806.png)

### The range of possible numbers of binary can range from? 
0 - 255

### IPv4 address is a series of 32 bits
![](../../images/Pasted%20image%2020240224114951.png)

### So what is the /24? 
- The `/24` indicates the first 24 bits represents the network portion, and the remaining 8 represents the host. 
![](../../images/Pasted%20image%2020240224115043.png)

### /16 indicates the first half. 

![](../../images/Pasted%20image%2020240224115406.png)

### /8

![](../../images/Pasted%20image%2020240224115518.png)

## IPv4 Address Classes

| Class | First octet | First octet numeric range |                                     |                                                               |
| ----- | ----------- | ------------------------- | ----------------------------------- | ------------------------------------------------------------- |
| A     | 0xxxxxxx    | 0-127                     | 64+32+16+8+4+2+1 = 127              | Really 0 - 126, not 127.                                      |
| B     | 10xxxxxx    | 128 - 191                 | 128 + 32 + 16 + 8 + 4 + 2 + 1 = 191 |                                                               |
| C     | 110xxxxx    | 192-223                   |                                     |                                                               |
| D     | 1110xxxx    | 224-239                   |                                     | Reserved for multicast (different from unicast and broadcast) |
| E     | 1111xxxx    | 240-255                   |                                     | Reserved for experimental use                                 |

### Why is class A range in practice only 0 - 126? Loopback Addresses
- The 127 octet range is reserved for loopback addresses. What does that mean?
	- The first octet is always 127.
		- Address range 127.0.0.0 - 127.255.255.255
	- Used to test the 'network stack' (think OSI, TCP/IP model) on the **local** device. 
		- **If a device sends any network traffic in this range, it's simply sent back up the network stack (think of when you receive a packet and it's being de-encapsulated).** 
	- This is demonstrated by the RTT when pinged.
![](../../images/Pasted%20image%2020240224120511.png)

### Implications of Class A, B, C. 

| Class | First octet | First octet numeric range | Prefix Length |     |     |
| ----- | ----------- | ------------------------- | ------------- | --- | --- |
| A     | 0xxxxxxx    | 0-127 * really 0 - 126    | /8            |     |     |
| B     | 10xxxxxx    | 128 - 191                 | /16           |     |     |
| C     | 110xxxxx    | 192-223                   | /24           |     |     |

![](../../images/Pasted%20image%2020240224121438.png)

- Class A: Fewer potential networks, there can be many hosts on each network
- Class C: there are many possible networks, but there can only be a few hosts.
	- 

![](../../images/Pasted%20image%2020240224121553.png)
- Indicated by the chart above, class C networks can only have 256 possible hosts. 
	- **However, the first bit is reserved for the network. AND the last address of the network is the broadcast network (the layer 3 address when you want to send traffic to all host**
	- **So really, the host count is 2 LESS. 256 - 2 = 254 in class C**

## Netmask: "A Newer and Easier Way of Writing the Prefix Length?"

In juniper networks, we use the slash notation.
- Class A: /8
- Class B: /16
- Class C: /24

Cisco networks use an older method: **dotted decimal netmask**
- Class A: 255.0.0.0 (11111111 00000000 00000000 00000000)
- Class B: 255.255.0.0 (11111111 11111111 00000000 00000000)
- Class C: 255.255.255.0 (11111111 11111111 11111111 00000000)

## The network address CANNOT be assigned to the host. 
- If the host portion of the address is all 0's, then it is a network address.

192.168.1.0/24 = network address
192.168.2.0/24 = network address

The first usable host address is 192.168.1.1/24

## The last address in the network is the broadcast address.
- If the host portion of the address is all 1's, then it is the broadcast address.

192.168.1.255/24 (X.X.X.1111111)

The last usable host address is 192.168.1.254/24


## In short, we talk about
- Dotted decimal and binary
- Network portion / host portion of IPv4
- IPv4 address classes
- Prefix lengths / netmasks (Cisco)
- Network address / broadcast address

## Question 0
If we sent a ping to 192.168.1.255, what would be the destination MAC address?
- Given that 255 is the broadcast address, the destination MAC address should be FFFF.FFFF.FFFF
