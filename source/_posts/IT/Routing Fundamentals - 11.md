---
title: Routing Fundamentals - 11
date: 2024-02-26 18:57:57
tags: 
categories:
  - IT
---
## Overview
- What is routing?
- The routing table on a Cisco router (routing tables)
	- Two Routes: Connected & Local Routes
- Routing Fundamentals (route selection) 

## What is routing? 
- Routing is used to determine the path that IP packets should take over a network to reach their destination
- (Switches keep their MAC address table with known MAC addresses)
- Similarly, routers store routes to all their known destinations in a **routing table.**
	- When routers receive packets, they look at the routing table to foward that packet.

- **Dynamic Routing**: protocols like (OSPF) to share routing information with each other automatically and build their routing tables. 
- **Static routing**: a network engineer/admin manually configures routes on their router.

- But what is a **route?**
	- A route is an instructor that tells the router to "send a packet to destination X, you should send the packet to next-hop Y"
		- Or, if the destination is directly connected to the router, send the packet directly to the destination.
		- Or, if the destination is the router's own IP address, receive the packet yourself (don't forward it)

![](../../images/Pasted%20image%2020240226221106.png)

![](../../images/Pasted%20image%2020240226221424.png)

- The following will **NOT** cover dynamic or static routes. These routes are automatically added to a router's routing table. 

## R1 Pre-configurations (IP Addresses) - other routers are configured the same.
![](../../images/Pasted%20image%2020240226221702.png)

## Routing Table (`show ip route`)

![](../../images/Pasted%20image%2020240226221944.png)

### Connected Routes and Local Routes
- **Connected** **routes** and **local routes** are added automatically when we used `no shutdown` -- when an interface is configured. 

- A **connected route** is a route to the network the interface is connected to. 
	- R1 G0/2 IP = 192.168.1.1/24
	- Network Address = 192.168.1.0/24        // recall this
		- Network address provides a route to all hosts in that network (e.g., 192.168.1.X), where X = 1 to 232)



![](../../images/Pasted%20image%2020240226222412.png)
- A **local route** is a route to the exact IP address configured on the interface.
- A /32 netmask is used to specify the exact IP address of the interface
	- A /32 means that all 32 bits are 'fixed'. They cannot be changed.
		- Even though R1's G0/2 is configured as 192.168.1.1/24, the connected route is to 192.168.1.1/32 (which specifies only this address -- meaning that it doesn't use 192.168.1.2/32)


To clarify, a **connected route** is...
- 192.168.1.0/24 255.255.255.0 
	- This matches all IP addresses from 192.168.1.0 ~ 192.168.1.255.
		- That means if R1 receives a packet with a destination in that range, it will send a packet out to G0/2. 
			- 192.168.1.2 = match, => send packet out of G0/2
			- 192.168.1.87 = match, => send packet out of G0/2
			- 192.168.2.1 = no match, => send the packet using a different route, or drop the packet if there's no matching route. 

To clarify, a **local route** is...
- 192.168.1.1/32 255.255.255.255
	- All bits are fixed, so 192.168.1.1 only matches itself. 


## Route Selection

What would be the issue if R3 sends a packet with a destination IP of 192.168.1.1?


![](../../images/Pasted%20image%2020240226222954.png)![](../../images/Pasted%20image%2020240226223007.png)
### Which route will R1 use for a packet destined for 192.168.1.1?
- It will choose the most specific matching route.
	- The route to 192.168.1.0/24 includes 256 different IP addresses.
	- The route to 192.168.1.1/32 includes only 1 IP address.
		- This route is more specific. 

- Most specific matching route = matching route with the **longest prefix length**.



### Route Selection Q1: 

![](../../images/Pasted%20image%2020240227112134.png)
- 192.168.1.1 matches both 192.168.1.0/24 and 192.168.1.1/32. 
	- Given the longest prefix rule, it'll match 192.168.1.1/32, which is a local route.

### Route Selection Q2: 


![](../../images/Pasted%20image%2020240227112900.png)
- 192.168.13.3 only matches 192.168.13.0/24, which is a connected route. 
	- R1 will send the packet to the destination connected to the G0/0 interface.

### Route Section Q5:

![](../../images/Pasted%20image%2020240227120020.png)
- No matching routes, will drop packet.
- Unlike switches, routers do not "flood" frames. 

## Summary
- Routers store information about destinations they know in their **routing table.**
- - When they recieve packets, they look in the routing table to find the best route to foward the packet.

- Each route in the routing table is an instruction:
	- To reach destinations in network X, send the packet to next-hop Y (the next router n the path to the destination)
	- If the destination is directly connected (**connected route**), send the packet directly to the destination
	- If the destination is your own IP address (Local Route), receive the packet yourself.

- When you configure an IP address on an interface and enable the interface, two routes are automatically added to the routing table:
	- Connected route (code C): A route to the network connected to the interface.
		- (i.e., if the interface's IP address is 192.168.1.1/24, the route will be to 192.168.1.0/24)
	- Local route (code L): a route to the exact IP address configured on the interface.
		- (i.e., if the interface's IP address is 192.168.1.1/24, the route will be to 192.168.1.1/32)
		- Tells the router that the packets are destined for itself.

- A route "matches" a destination if the packet's destination IP address is part of the network specified by the route.
- If a router receives a packet with no matching route, it'll be dropped. 
- Routers match using the **longest prefix length.**
