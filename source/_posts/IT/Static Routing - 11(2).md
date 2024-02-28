---
title: defaultPost
date: 2024-02-27 12:20:47
tags:
---
## Overview
- Connected and Local Routes
- Static Routes
- Static Route configurations
- Default routes


## Routing Packets: Default Gateway

![](../../images/Pasted%20image%2020240227132654.png)

End hosts like PC1 and PC4 can send packets directly to destinatiosn in their connected network. 
- PC1 is connected to 192.168.1.0/24
- PC4 is connected to 192.168.4.0/24

To send packets to destinations outside of a local network, endhosts must send the packets to their **default gateway**. 

Linux stores this data in a text file.

![](../../images/Pasted%20image%2020240227132258.png)
- The default gateway configuration is also called the **default route**.
	- It is a route to 0.0.0.0/0 = all netmask bits are set to 0 
		- Includes all addresses from 0.0.0.0 to 255.255.255255. 
	- The default route is the least specific route possible (whereas a /32 route is the most specific route possible.)

- End hosts usually have no need for more specific routes. 
	- End hosts just need to know that in order to send a packet outside of a local network, it should be send to the default gateway. 

- Say PC1 wants to send a packet to PC4 which resides outside of the LAN.
	- Layer 3:
		- Source IP: 192.168.1.10
		- Destination IP: 192.168.4.10
	- Layer 2: *to learn R1 G0/2's MAC address, PC1 will send an ARP request ot 192.168.1.1*
		- Source MAC: R1 G0/2
		- Destination MAC: PC1 eth0 MAC
- Once R1 receives the packet, it will de-encapsulate the L2 header/trailer, which exposes the L3 header.
- Then it checks the routing table for the most-specific matching route. 
Assume this is R1's routing table.
![](../../images/Pasted%20image%2020240227132815.png)
- There is no matching IP address for "Destination IP: 192.168.4.10". 
- The packet is dropped. 

- There are two possible paths from R1 to 192.168.4.0/24. 
![](../../images/Pasted%20image%2020240227132950.png)
- Let's consider the path PC1 -> R1 -> R3 -> R4 -> PC4.
- Each router, therefore, needs two routes. A route to 192.168.1.10 and 192.168.4.10, ensuring **two-way reachability.**


- If we initially configured the router's interfaces, Cisco routers would have already configured connected routes from R1 to 192.168.1.0/24. And R4 with a connected route of 1982.168.4.0/24.
- **Other routes need to be configured manually.**

![](../../images/Pasted%20image%2020240227135137.png)


## Static Route Configuration: (config)# `ip route ip address netmask next-hop`
### Static Route Configuration R1
- The connected route is configured. So only need to one configuration.
```
R1(config)#
R1(config)# ip route 192.168.4.0 255.255.255.0 192.168.13.3
R1(config)# do show ip route
```

### Static Route Configuration R3
- Two configurations are needed. 
```
R3(config)# ip route 192.168.1.0 255.255.255.0 192.168.13.1
R3(config)# ip route 192.168.4.0 255.255.255.0 192.168.34.4
R3(config)# do show ip route
```

### Static Route Configuration R4
- The connected route is configured. So only need to one configuration.
```
R4(config)# ip route 192.168.1.0 255.255.255.0 192.168.34.3
R4(config)# do show ip route
```

## Packet Traveling from PC1 to PC4
![](../../images/Pasted%20image%2020240227141051.png)
## Static Route configuration with "exit-interface"

R2 wants to sent a packet to 192.168.1.0/24. 
**Specifies the exit interface**
```
R2(config)# ip route 192.168.1.0 255.255.255.0 g0/0
```
- Keep in mind that the routing table will state "192.168.1.0/24 is directly connected, GigbitEthernet0/0" even though it's not". -- just a byproduct of an exit-interface that relies on Proxy ARP. 

## Static Route configuration with "exit-interface" and next-hop
R2 wants to sent a packet to 192.168.4.0/24 network. 
**Specifies the exit interface and next-hop**
```
R2(config)# ip route 192.168.1.0 255.255.255.0 g0/1 192.168.24.4
```


## Default Route
- A default route is 0.0.0.0/0
	- Least specific route and includes every possible destination IP address. 
- If the router doesn't have any more specific routes that match a packet's destination IP address, the router will forward the packet using the default route.
	- So a default route is used to direct traffic to the internet. 
	- More specific routes are used for destinations inside internal networks
	- Traffic destinations outside of the internal network is sent to the internet.


![](../../images/Pasted%20image%2020240227141930.png)

![](../../images/Pasted%20image%2020240227141940.png)

### Configuring a default route.
```
R1(config)# ip route 0.0.0.0 0.0.0.0 203.0.133.2
```

![](../../images/Pasted%20image%2020240227142051.png)
## Questions

![](../../images/Pasted%20image%2020240227142914.png)


![](../../images/Pasted%20image%2020240227143421.png)
