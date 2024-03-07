---
title: VLAN - 2
date: 2024-03-05 23:14:39
tags: 
categories:
  - IT
---
## Overview
- What is a trunk port? (multiple VLANs on a single interface)
- Purpose of trunk ports
- 802.1Q Encapsulation (additional tag added to an ethernet frame to identify VLAN traffic)
- Trunk port configuration
- 'Router on a stick' (ROAS); more efficient for inter-VLAN routing

![](../../images/Pasted%20image%2020240306162125.png)

## Trunk Ports
- In small networks with few VLANS, it is possible to use a separate interface for each VLAN when connecting switches to switches, and switches to routers.
- However, when # of VLANs increase, it is not viable (lack of VLAN interfaces or wasted interfaces)
- So, you can use **trunk ports** to carry traffic from multiple VLANs over a single interface. 


Multiple connections (shown above) are now replaced by single connections. 
![](../../images/Pasted%20image%2020240306163601.png)

- Switches will 'tag' all frames that they send over a trunk link. This allows the recieving witch to know which VLAN the frame belongs to. 
	- Trunk port = 'tagged' ports
	- Access ports = 'untagged' ports

## VLAN Tagging (Trunking Protocols)
- ISL (Inter-Switch Link) ; Cisco (old)
- IEEE 802.1Q. (dot1q) ; industry standard

- ISL is an old Cisco proprietary protocol created before the industry standard.
- IEEE 802.1Q is industry standard.



## Ethernet Frame with the dot1q tag

![](../../images/Pasted%20image%2020240306163903.png)


![](../../images/Pasted%20image%2020240306163909.png)
- 802.1Q tag is inserted between the Source and Type/Length Field
- Tag is 4 bytes (32 bits)
- Tag consists of two fields:
	- **Tag Protocol Identifier** (TPID)
	- **Tag Control Information** (TCI); which consists of three subfields...

![](../../images/Pasted%20image%2020240306164021.png)

### 802.1Q Tag - TPID (Tag Protocol Identifier)
- 16 bits (2 bytes) ; half of the 802.1Q length
- Always set to 0x8100 ; indicates frame is 802.1Q-tagged.


### ### 802.1Q Tag - TCI (Part 1 - PCP)
- PCP = Priority Code Point
- PCP is 3 bits in length.
- PCP is used for Class of Service (CoS), which prioritizes important traffic in congested networks. 

### ### 802.1Q Tag - TCI (Part 2 - DEI)
- DEI = Drop Eligible Indicator 
- DEI = 1 bit in length
- Used to indicate frames that can be dropped if the network is congested. 

### ### 802.1Q Tag - TCI (Part 3 - VID) (Important)
- VLAN ID = VID
- 12 bits in length
- Identifies the VLAN the frame belongs to. 
- 12 bits in length = 4096 total VLANs (2^12), range of 0 - 4095
	- However, first and last range is reserved. So effective range is 1 - 4094. 


## VLAN Ranges
- Range of VLANs (1 - 4094) is divided into two sections.
	- Normal VLAN: 1 - 1005
	- Extended VLAN: 1006 - 4094
		- Some older devices cannot use the extended VLAN range, however it's safe to expect that modern switches will support the extended VLAN.

![](../../images/Pasted%20image%2020240306164627.png)

## 802.1Q - Native VLAN
- 802.1Q has a feature called **native VLAN.** (ISL does not have this feature)
- The native VLAN is VLAN 1 by default on all trunk ports. However, this can be manually configured on each trunk port. 
- The switch does not add an 802.1Q tag to frames in the native VLAN. 
	- When a switch receives an untagged frame on a trunk port, it assumes that the frame belongs to the native VLAN. 
	- **It is very important that the Native VLAN matches.** 

### For example...
- If the Native VLAN on SW1 and SW2 are both 10. 
- If a PC on VLAN 10 sends traffic to SW2 (which also has a Native VLAN: 10), then SW2 won't tag this traffic. 
- SW2 sends the untagged traffic to SW1, which sees it's also untagged. 
- SW1 default behavior is to forward untagged traffic to the configured Native VLAN, which is 10. 

- However, if SW1 has a native VLAN of 30, and SW2 has a Native VLAN of 10. Let's see what happens. 
- If a PC on VLAN 10 sends traffic to SW2 (which also has a Native VLAN: 10), then SW2 won't tag this traffic. 
- SW2 sends the untagged traffic to SW1, which sees it's also untagged.
- This is where problems occur. 
- SW1 sees this untagged traffic and its default behavior is to send to VLAN 30. 
	- However, the destination is in VLAN 10, so the frame is not forwarded. 


## Overview of Basic Trunk Port Configurations (Cisco vs Modern)
`SW(config)#interface g0/0`
`switchport mode trunk` ; manually configures interface as a trunk
`Command rejected: An interface whose trunk encapsulation is "Auto" can not be configured to "trunk" mode.`
- Why is this? 
	- Many modern switches do not support Cisco's ISL at all, and only support 802.1Q (dot1q). 
		- However, switches that do support both have a trunk encapsulation of 'Auto' by default.
		- Therefore, it is required to manually configure the interface as a trunk port by first setting the encapsulation to 802.1Q or ISL. (This is uncessary for Switches that only support 802.1Q)
`switchport trunk encapsulation ?`
```
dot1q      Inteface uses only 802.1q trunking encapsulation when trunking
isl        Interface uses only ISL trunking encapsulatuion when trunking
negotiate  Device will negotiate trunking encapsulation with peer on inferface ; same as auto
```

`switchport trunk encapsulation dot1q` ; sets encapsulation type
`switchport mode trunk` ; now works

`show interfaces trunk`
```
SW1#show interfaces trunk

Port       Mode         Encapsulation  Status       Native vlan
Gi0/0      on           802.1q         trunking     1

Port       Vlans allowed on trunk
Gi0/0      1-4094

Port       Vlans allowed and active in management domain
Gi0/0      1, 10, 30

Port       Vlans in spanning tree forwarding state and not pruned

Gi0/0      1, 10, 30 
SW1#
```

#### Configure a VLAN allowed on a trunk 
```
SW1(config)# int g0/0
SW1(config-if)# switchport trunk allowed vlan ?
  WORD          VLAN IDs of the allowed VLANs when this port is in trunking mode
  add           add VLANs to the current list
  all           all VLANs
  except        all VLANs except the following
  none          no VLANs
  remove        remove VLANs from the current list

SW1(config-if)# switchport trunk allowed vlan 
```


![](../../images/Pasted%20image%2020240306171804.png)

#### Configure to add VLAN's to a trunk

```
SW1(config)# int g0/0
SW1(config-if)# switchport trunk allowed vlan ?
  WORD          VLAN IDs of the allowed VLANs when this port is in trunking mode
  add           add VLANs to the current list
  all           all VLANs
  except        all VLANs except the following
  none          no VLANs
  remove        remove VLANs from the current list

SW1(config-if)# switchport trunk allowed vlan 
```

![](../../images/Pasted%20image%2020240306171855.png)
- Note that VLAN 20 isn't shown on "VLAN allowed and active in management domain" because it wasn't been configured yet, just allowed. 

#### Remove VLAN 20
![](../../images/Pasted%20image%2020240306172005.png)

#### Configure a VLAN to allow All
- Same as default state if we so choose.
![](../../images/Pasted%20image%2020240306172117.png)

#### Configure VLAN to except
- except is a deny list.
![](../../images/Pasted%20image%2020240306172141.png)

#### Configure VLAN to none

![](../../images/Pasted%20image%2020240306172214.png)
## Trunk Configuration
- Configure SW1's G0/0 as a trunk port.
- Configure SW2's G0/0 and G0/1 as a trunk port. 
![](../../images/Pasted%20image%2020240306165304.png)
### Configure SW1's G0/0 as a trunk port.
- SW1 has host in VLAN10 and VLAN30. 
![](../../images/Pasted%20image%2020240306172401.png)
- Configuring specific VLANs is dual-purpose. Security and performance. 

### **For security purposes, the native VLAN should be changed to an UNUSED VLAN**. 
- **Ensure the native VLAN matches between switches.** 
![](../../images/Pasted%20image%2020240306172555.png)

### `show vlan brief`
- G0/0 is not listed anywhere, even though these VLANs are allowed on the trunk. 
- `show vlan brief` shows access ports assigned to each VLAN, NOT the trunk ports that allow each VLAN.

### `show interfaces trunk`
- use this to confirm trunk ports.

### Configure SW2's G0/0 and G0/1 as a trunk port. 
- SW2 G0/0, must allow VLAN 10 and 30
![](../../images/Pasted%20image%2020240306172907.png)

- SW2 G0/1 must allow VLAN 10, 20, and 30.
![](../../images/Pasted%20image%2020240306172944.png)


## What about the Router Configuration in Trunking?
- In a access port, we used three separate interfaces from the connection to SW2 <-> R1. We assigned a separate ip address to each one on R1; each one serving as the default gateway address for the PCs in each VLAN. 
- Now there's a single connection, we must use **sub-interfaces**. 

### Router on a Stick (ROAS)
- Given a single physical interface connection R1's g0/0 to SW2 G0/1.
	- We can divide this one physical interface to three sub-interfaces for **inter-VLAN routing**.

- R1 will have the following:
	- g0/0.10
	- g0/0.20
	- g0/0.30
- These three sub-logical interfaces are really just one interface; and operate like three separate interfaces.

1. `interface g0/0`
2. `no shutdown`
3. `interface g0/0.10`  // notice how to enter sub-interface mode; the sub-interface doesn't have to match, but it is recommended for visual purposes.
4. `R1(config-subif)#encapsulation dot1q 10` // tells the router that is tagged with this specific VLAN number as if they arrived on this sub-interface. 
5. `ip address 192.168.1.62 255.255.255.192` // assigned the last usable address to the sub-int
6. `interface g0/0.20`
7. `encapsulation dot1q 20`
8. `ipaddresss 192.168.1.126 255.255.255.192`
9. `interface g0/0.30`
10. `encapsulation dot1q 30`
11. `ip address 192.168.1.190 255.255.255.192`


![](../../images/Pasted%20image%2020240306173829.png)

![](../../images/Pasted%20image%2020240306173837.png)


![](../../images/Pasted%20image%2020240306174054.png)

## Questions

![](../../images/Pasted%20image%2020240306184055.png)

![](../../images/Pasted%20image%2020240306184030.png)

![](../../images/Pasted%20image%2020240306184139.png)

![](../../images/Pasted%20image%2020240306184154.png)

![](../../images/Pasted%20image%2020240306184306.png)
- Even if VLAN10 is allowed, it must still be enabled or brought into existence on the switch. 