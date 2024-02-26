---
title: IPv4 Header
date: 2024-02-26 17:13:04
tags: 
categories:
  - IT
---
## IPv4 is used as a Layer 3.

## Overview
- IPv4 packet structure (header used to encapsulate TCP or UDP)
- Fields of IPv4 Header


## OSI Model - PDUs

Protocol Data Units (PDU) 

Data                                               // Data
Data/L4 Header                                     // Segment
Lata/L4 Header/L3 Header                           // Packet
L2 Trailer/Data/L4 Header/L3 Header/L2 Header      // Frame

IPv4 Header focuses on L3 Header.


## IPv4 Header
![](../../images/Pasted%20image%2020240226172913.png)
- Version: 4 bits; identifies version of IP used (IPv4 (0100) or IPv6 (0110))
- **IHL** (Internet Header Length): 4 bits;
- **DSCP** (Differentiated Services Code Point): 6 bits
	- Used for **QoS** (Quality of Service)
		- QoS is used to prioritize delay-sensitive data (streaming voice, video, etc) 
- **ECN** (Explicit Congestion Notification): 2 bits; 
	- Provides end-to-end notification of network congestion WITHOUT dropping packets.
		- (Normally, when congestion occurs, packets are dropped). 
	- This is an optional field that requires both endpoints as well as the underlying network to support it.
- **Total Length**: 16 bytes; 
	- Indicates the total length of the packet (L3 header + L4 segment) (and the data(?))
	- This is different from the 'IHL' header, which only indicates the length of the IPv4 Header itself. 
	- Measured in 1 byte increments (not like 4-byte increments like IHL)
	- Minimum value of 20 (=IPv4 header with no encapsulated data)
	- Maximum value of 65,535 (maximum of 16-bit)
		- 1111111111111111
- **Identification Field**: Length 16 bits
	- If a packet is fragmented due to being too large, this field is used to identify which packet the fragment belongs to.
	- All of the same packet will have their own IPv4 header with the same value in this field.
	- Packets are fragmented if larger than the **MTU** (Maximum Transmission Unit)
		- MTU is usually 1500 bytes
		- Remember the maximum size of Ethernet Frame? 
			- Maximum payload size is 1500 bytes. So these are related.
		- Fragments are reassembled by the receiving host. 
- **Flags field**: 3 bits;
	- Used to control and identify fragments
		- Bit 0: Reserved, always set to 0
		- Bit 1: Don't Fragment (DF); if set to 1, don't fragment.
		- Bit 2: More Fragments (MF Bit); set to 1, if there are more fragments.
			- MF bit = 0, last fragment.
			- If a packet is unfragmented, MF bit = 0 by default.
- **Fragment Offset Field**: 13 bits; 
	- Used to indicate the position of the fragment within the original, unfragmented IP packet.
	- Allows fragmented packets to be reassembled even if the fragments arrive out of order.
- **Time to Live Field (TTL)**: 8 bits;
	- A router will drop a packet with a TTL of 0
	- Used to prevent infinite loops.
	- In practice, TTL indicates hop count; recommended default TTL = 64
- **Protocol field**: 8 bits;
	- Indicates the protocol of the encapsulated L4PDU (TCP or UDP)
		- Value of 6: TCP
		- Value of 17: UDP
		- Value of 1: ICMP 
		- Value of 89: OSPF (Open Shortest Path First): (Dynamic Routing Protocol)
- **Header Checksum**: 16 bits
	- Calculated checksum used to check for errors in the IPv4 Header
	- When a router receives a packet, it calculates the checksum of the header and compares it to the Header Checksum.
		- If no match, drops the packet.
	- Note that Header Checksum checks for integrity of the IPv4 header, NOT the encapsulated data.
		- (TCP and UDP have their own checksum fields to detect errors for encapsulated data)
- **Source/Destination IP Address**; 32 bit (EACH)
	- Source IP Address: IPv4 sender
	- Destination IP Address: IPv4 reciever
- **Options**; 0 - 320 bits
	- If IHL is greater than 5, it means that Options are present. 
	- Rarely used.

- The final field of the IPv4 header (**Options**) is variable in length, so this field is necessary to indicate the total length of the header.
	- Identifies the length of the header in **4-byte increments**. 
		- **Value of 5 = 5 x 4 = 20 bytes**
		- The minimum value is 5 (=20 bytes)
			- This is without the 'Options' field. 
		- The maximum value is 15 (15 x 4 bytes = 60 bytes)
			- Because (1111 = 15)
		- Thus, the maximum length of the Options field is 40 bytes.
- In short...
	- Minimum IPv4 Header = 20 Bytes 
	- Maximum IPv4 Header = 60 bytes

