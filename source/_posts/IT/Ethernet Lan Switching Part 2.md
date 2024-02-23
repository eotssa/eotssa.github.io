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

## Ethernet LAN Switchingaaa
![](../../images/Pasted%20image%2020240223163901.png)