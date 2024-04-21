---
title: VLAN Configuration - 1
date: 2024-03-05 00:47:11
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240305215152.png)
1. Configure the correct IP address/subnet mask on each PC.
    Set the gateway address as the LAST USABLE address of the subnet.

2. Make three connections between R1 and SW1.
    Configure one interface on R1 for each VLAN.
    Make sure the IP addresses are the gateway address you configured on the PCs.

3. Configure SW1's interfaces in the proper VLANs.
    Remember the interfaces that connect to R1!
    Name the VLANs
     (Engeering, HR, Sales)

4. Ping between the PCs to check connectivity.
    Send a broadcast ping from a PC (ping the subnet broadcast address),
     and see which PCs devices receive the broadcast
      (use Packet Tracer's 'Simulation Mode')
## PC Configuration (Step 1)

### VLAN 10
- The broadcast address of 10.0.0.0/26 is... (.(00)111111) = 63
- Therefore, the last usable address (gateway address) is 10.0.0.62/26

PC1's Configurations:
- Default Gateway: 10.0.0.62
- IPv4 Address: 10.0.0.1
- Subnet Mask: 255.255.255.192

PC2's Configurations:
- Default Gateway: 10.0.0.62
- IPv4 Address: 10.0.0.2
- Subnet Mask: 255.255.255.192

### VLAN 20
- The broadcast address of 10.0.0.64/26 is ...
	- 00001010.0.0.(01)000000 => .(01)111111 => 10.0.0.127/26
- Therefore, the last usable address (gateway address) is 10.0.0.126/26


PC3's Configurations:
- Default Gateway: 10.0.0.126
- IPv4 Address: 10.0.0.65
- Subnet Mask: 255.255.255.192

PC4's Configurations:
- Default Gateway: 10.0.0.126
- IPv4 Address: 10.0.0.66
- Subnet Mask: 255.255.255.192

### VLAN 30
- The broadcast address of 10.0.0.128/26 is ...
	- 00001010.0.0.(10)000000 => .(10)111111 =>  10.0.0.191/26
- - Therefore, the last usable address (gateway address) is 10.0.0.190/26

PC5's Configurations:
- Default Gateway: 10.0.0.190
- IPv4 Address: 10.0.0.129
- Subnet Mask: 255.255.255.192

PC6's Configurations:
- Default Gateway: 10.0.0.190
- IPv4 Address: 10.0.0.130
- Subnet Mask: 255.255.255.192

## Step 2
 Make three connections between R1 and SW1.
    Configure one interface on R1 for each VLAN.
    Make sure the IP addresses are the gateway address you configured on the PCs.

---

Below are the three connections using a straight-through cable. 
![](../../images/Pasted%20image%2020240305223145.png)
### Configure one interface on R1 for each VLAN.

Each interface G0/0, G0/1, and G0/2 should match their respective VLAN gateways.

```
R1>
R1>en
R1>enable
R1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#
R1(config)#
R1(config)#int g0/0
R1(config-if)#
R1(config-if)#ip address 10.0.0.62 255.255.255.192
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up

R1(config-if)#int g0/1
R1(config-if)#ip address 10.0.0.126 255.255.255.192
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up

R1(config-if)#int g0/2
R1(config-if)#ip address 10.0.0.190 255.255.255.192
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/2, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/2, changed state to up

R1(config-if)#do show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     10.0.0.62       YES manual up                    up 
GigabitEthernet0/1     10.0.0.126      YES manual up                    up 
GigabitEthernet0/2     10.0.0.190      YES manual up                    up 
Vlan1                  unassigned      YES unset  administratively down down
```

### Configure the Switch's VLAN


#### VLAN 10
- We can configure all three relevant interfaces for VLAN 10 as follows
```
SW1(config)#int range g0/1,f3/1,f4/1
```

- Next, enter switchport. Cisco automatically does this, but it's good to be explicit. 
- Remember, an "**access port**" belongs to a SINGLE VLAN, whereas "trunkports" over more. 
```
SW1(config-if-range)#switchport mode access 
```

- Now create the VLAN as follows:
```
SW1(config-if-range)#switchport access vlan 10
```
- That's it.

#### VLAN 20

```
SW1>en
SW1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
SW1(config)#int range g1/1,f5/1,f6/1
SW1(config-if-range)#switchport mod
SW1(config-if-range)#switchport mode acces
SW1(config-if-range)#switchport mode access ?
  <cr>
SW1(config-if-range)#switchport mode access 
SW1(config-if-range)#switchport access ?
  vlan  Set VLAN when interface is in access mode
SW1(config-if-range)#switchport access vlan 20
% Access VLAN does not exist. Creating vlan 20
```

#### VLAN 30

```
SW1(config-if-range)#
SW1(config-if-range)#int range g2/1,f8/1,f7/1
SW1(config-if-range)#switchport mode acc
SW1(config-if-range)#switchport mode access 
SW1(config-if-range)#swit
SW1(config-if-range)#switchport acce
SW1(config-if-range)#switchport access vlan 30
% Access VLAN does not exist. Creating vlan 30
```


#### Changing the names of VLAN 

```
SW1(config-if-range)#do show vlan brief

VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Fa9/1
10   VLAN0010                         active    Gig0/1, Fa3/1, Fa4/1
20   VLAN0020                         active    Gig1/1, Fa5/1, Fa6/1
30   VLAN0030                         active    Gig2/1, Fa7/1, Fa8/1
1002 fddi-default                     active    
1003 token-ring-default               active    
1004 fddinet-default                  active    
1005 trnet-default                    active    
SW1(config-if-range)#vlan 10
SW1(config-vlan)#name ENGINEERING
SW1(config-vlan)#vlan 20
SW1(config-vlan)#name HR
SW1(config-vlan)#vlan 30
SW1(config-vlan)#name Sales
SW1(config-vlan)#do show vlan brief

VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Fa9/1
10   ENGINEERING                      active    Gig0/1, Fa3/1, Fa4/1
20   HR                               active    Gig1/1, Fa5/1, Fa6/1
30   Sales                            active    Gig2/1, Fa7/1, Fa8/1
1002 fddi-default                     active    
1003 token-ring-default               active    
1004 fddinet-default                  active    
1005 trnet-default                    active    
SW1(config-vlan)#
```

### From VLAN 10, ping VLAN 20 and VLAN 30
PC1
```
C:\>ping 10.0.0.65

Pinging 10.0.0.65 with 32 bytes of data:

Request timed out.
Reply from 10.0.0.65: bytes=32 time<1ms TTL=127
Reply from 10.0.0.65: bytes=32 time<1ms TTL=127
Reply from 10.0.0.65: bytes=32 time<1ms TTL=127

Ping statistics for 10.0.0.65:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms

C:\>ping 10.0.0.129

Pinging 10.0.0.129 with 32 bytes of data:

Request timed out.
Reply from 10.0.0.129: bytes=32 time<1ms TTL=127
Reply from 10.0.0.129: bytes=32 time<1ms TTL=127
Reply from 10.0.0.129: bytes=32 time<1ms TTL=127

Ping statistics for 10.0.0.129:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms
```

- The packet moves from PC 1 to SW1 to R1 back to SW1 (to their respective interfaces), and finally to their destination.

- If we ping the broadcast address of VLAN 10, SW1 will receive the broadcast request and only send a request to R1 and PC2, so within its broadcast domain/LAN.