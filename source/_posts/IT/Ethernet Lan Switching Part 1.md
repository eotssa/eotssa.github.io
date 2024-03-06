---
title: "[CCNA] Ethernet Lan Switching Part 1"
categories:
  - IT
date: 2024-02-23 17:32:48
tags:
---


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

