---
title: defaultPost
date: 2024-02-25 17:16:01
tags: 
categories:
  - IT
---
## Contents
- Interface speed and duplex
- Speed and duplex autonegotiation
- Interface status 
- Interface counters & errors
- Switch interfaces:
	- ASR 1000-X Router vs Catalyst 9200 Switch 
		- Routers has 8 SFP interfaces for fiber optic, and a few RJ45 for console ports.
		- Switch has 4 SFP interfaces, and 48 RJ45 interfaces.


## Network Topology

![](../../images/Pasted%20image%2020240225175829.png)


## `show ip interface brief`

- Unlike routers, switches do NOT have the `shutdown` command applied. So they'll usually be in the up-up state with no configuration required. 
	- IP addresses in a switch is unassigned because these are layer 2 switch ports. They don't need an IP address.
	- (In a later part, multi-layer switching do require IP addresses)
![](../../images/Pasted%20image%2020240225175940.png)
- Keep in mind, here that Router's "administratively down" is NOT the same as Switch's down-down. Here, down-down simply means they are not connected to a device. 


## `show interfaces status`

- Name = same as description
- Status = different from the Status in above.
- Duplex; = a-full (auto full) 
- Speed; = a-100 (auto-100) because Fast Ethernet cables operate at 100Mbps. However, they can also operate at 10 Mbps when necessary depending on the device.
- Type; = 10/100BaseTX (RJ45) 
![](../../images/Pasted%20image%2020240225180246.png)

## Configure the interface speed and duplex.
- Typically auto-negotiation works well enough on its own, but let's explore options.
![](../../images/Pasted%20image%2020240225180658.png)- After configured... 
![](../../images/Pasted%20image%2020240225180722.png)

## How to disable remaining interfaces we don't use? `interface range`

![](../../images/Pasted%20image%2020240225180840.png)

- Here is another way to select interfaces. 
![](../../images/Pasted%20image%2020240225180945.png)



## Full and Half-Duplex
- Half duplex: device cannot receive and send data at the same time. 
- Full duplex: sends and receives simultaneously. 

### Purpose of half-duplex? Hubs are layer 1 devices; repeaters. 
- Back in the day, a "hub" was a half-duplex. There was an issue with collision, and the entire network connected to a half duplex hub was considered part of a **"collision domain"**. 
- **CSMA/CD** : Carrier Sense Multiple Access with Collison Detection 
	- Before sending frames, devices 'listen' to the collision domain until they detect that other devices are not sending frames.
	- If a collision does occur, the device sends a jamming signal to inform the other devices that a collision happened.
	- Each device will wait a random period of time before sending frames again. 
	- Repeat. 

## Speed/Duplex Autonegotiation
- Default settings of interfaces that have varying speeds run at "speed auto" and "duplex auto".

- Ethernet (E) = 10 Mbps
- Fast Ethernet (F) 10/100 Mbps
- Gigabit (G) = 10/100/1000 Mbps

![](../../images/Pasted%20image%2020240225184052.png)

### What if auto-negotiation is disabled on the device connected to the switch? 

SPEED
- The switch will try to sense the speed, but the default to the lowest supported speed. 

DUPLEX
- The switch will use half duplex if speed is 10 or 100 Mbps.
- Else, the switch will use full duplex for 1000 Mbps or greater. 



### Why does duplex mismatch occur? 
Assuming auto-negotiation is disabled here.
![](../../images/Pasted%20image%2020240225185559.png)

## Interface Errors 

- Runts: frames that are smaller than the minimum frame size (64 bytes)
- Giants: Frames that are larger than the maximum frame size (1518 bytes)
- CRC: Frames that failed the CRC check (in the Ethernet FCS trailer)
	- Checks errors and counts them.
- Frames: Frames that have an incorrect format (due to an error)
- Input errors: Total of various counters, such as the above four.
- Output errors: Frames that a switch tried to send, but failed due to an error
![](../../images/Pasted%20image%2020240225185645.png)




## Questions 1

![](../../images/Pasted%20image%2020240225190305.png)
B. Collision mismatch due to auto-negotiation being disabled. 

## Questions 2
![](../../images/Pasted%20image%2020240225190346.png)
A. CSMA/CD - recall from above for the steps.
- Devices using half-duplex listen to activity, send data when other devices aren't sending. And describes how devices will react when collision does occur. 

- CMSA/CA - is something different. 

## Questions 3

![](../../images/Pasted%20image%2020240225190455.png)
- A. show interfaces

## Questions 4

![](../../images/Pasted%20image%2020240225190637.png)
D. 

## Questions 5

![](../../images/Pasted%20image%2020240225191346.png)

B.