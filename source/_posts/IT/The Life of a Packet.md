---
title: The Life of a Packet
date: 2024-02-28 13:40:13
tags: 
categories:
  - IT
---
## Overview

Entire process of sending a packet to a remote destination
- Includes ARP, encapsulation, de-encapsulation, etc.

## Packet from PC1 to PC4, with already pre-configured static routes.

PC1 -> SW1 -> R1 -> R2 -> R4 -> SW2 -> PC4
![](../../images/Pasted%20image%2020240228134214.png)
- Each router interface has a MAC address.
- Each switch interface has a MAC address (not shown).
![](../../images/Pasted%20image%2020240228134454.png)

- Note that in the ethernet header, the destination MAC address comes first.
- Whereas, in the IPv4 header, the source MAC address comes first. 


PC1 wants to send data to PC2. 
The data is encapsulated in an `IP Header`.
- Src IP: 192.168.1.1
- Dst IP: 192.168.4.1
	- Because the destination address is in a different network, it'll send the packet to its default gateway, R1 (assuming it's been configured)

In this example, no data has traversed the network yet. Therefore, it must begin with an ARP.

ARP Request 
- Src IP: 192.168.1.1
- Dst: 192.168.4.1
- Dst MAC: FFFF.FFFF.FFFF (Ethernet Header - Dst MAC address comes first)
- Src MAC: 1111
PC1 sends the ARP request to SW1. Given that the Dst MAC is FFFF.FFFF.FFFF, SW1 will send a broadcast. 

R1 receives the the broadcast frame, and since the destination MAC matches its own MAC, it'll create an ARP reply frame. R1 implicitly learned PC1's MAC address given the "source MAC address", therefore, the ARP reply sent back will be unicast. 

```
Src IP: 192.168.1.1
Dst: 192.168.4.1
Dst MAC: 1111
Src MAC: aaaa
```


### PC1 -> R1
Now that PC1 knows the MAC address of R1. It'll encapsulate the packet with an ethernet header.

![](../../images/Pasted%20image%2020240228150200.png)

R1 receives this packet, and de-encapsulates the ethernet header. 
Now R1 can see the source IP and destination IP. 
R1 looks up the destination IP in its routing table. 

```R1 Routing Table
Destination                   Next Hop
192.168.4.0/24                192.168.12.2
```

There is indeed an matching route. 192.168.4.1 is within the range 192.168.4.0/24. 


The above process repeats from R1 -> R2, R2 -> R4, R4 -> PC4. 

Once PC4 receives the packet, and its destination addresses matches its own IP address, PC4 will send an ARP reply all the way back to PC1. 


## In summary,
- The IP address and destination remain unchanged, while the MAC address is continuously encapsulated and decapsulated (to reveal the IP address). 


## Questions

![](../../images/Pasted%20image%2020240228175104.png)
- fffe, because PC1 is in a remote network, it must send the packet to its default gateway. 
	- If you considered that it was 1111, that isn't true. The destination IP would be PC1's, however. 


## Packet Tracer

![](../../images/Pasted%20image%2020240228190027.png)


1. PC1 pings PC4.  
Identify the src/dst MAC address at each specified point in the route to PC4.
Identify the MAC address by the device and interface (ie. the MAC of R1 G0/0)
A. Source/Destination MAC at PC1 → SW1 segment
B. Source/Destination MAC at SW1 → R1 segment
C. Source/Destination MAC at R1 → R2 segment
D. Source/Destination MAC at R2 → R3 segment
E. Source/Destination MAC at R3 → SW2 segment
F. Source/Destination MAC at SW2 → PC4 segment

Use the CLI and Packet Tracer's simulation mode to verify your answers.
(Before you enter simulation mode, ping once to complete ARP/the MAC learning process.)


2. PC1 pings PC3.
Identify the src/dst MAC address at each specified point in the route to PC3.
Identify the MAC address by the device and interface (ie. the MAC of R1 G0/0)
A. Source/Destination MAC at PC1 → SW1
B. Source/Destination MAC at SW1 → PC3

Use the CLI and Packet Tracer's simulation mode to verify your answers.
(Before you enter simulation mode, ping once to complete ARP/the MAC learning process.)


3. PC4 pings PC1.
Identify the src/dst MAC address at each specified point in the route to PC1.
Identify the MAC address by the device and interface (ie. the MAC of R1 G0/0).
