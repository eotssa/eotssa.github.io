---
title: Cisco IP Address PacketTracer
date: 2024-02-25 10:52:31
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240225105423.png)

## 1. How do you change the host name of a router?

```
Router>en
Router#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
Router(config)#host ?
  WORD  This system's network name
Router(config)#hostname R1
R1(config)#$
```

## 2. Use a 'show' command to view a lsit of R1's interfaces, their IP addresses, status, etc.

- Note that show command doesn't work in config mode, as indicated below. 
```
R1(config)#show ip ?
% Unrecognized command
R1(config)#show ip interface brief
            ^
% Invalid input detected at '^' marker.
	
R1(config)#do show ip interface brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     unassigned      YES unset  administratively down down 
GigabitEthernet0/1     unassigned      YES unset  administratively down down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
```

## 3. Configure the appropriate IP addresses on R1's interfaces, and enable the interfaces. Then, configure appropriate interface descriptions.

- Entered each interface using shortcut. 
- Edit the IP address for each interface, gave description, and turned off shutdown. 
- 

```
R1(config)#int g 0/0
R1(config-if)#ip address 15.255.255.254 ?
  A.B.C.D  IP subnet mask
R1(config-if)#ip address 15.255.255.254 255.0.0.0
R1(config-if)#desc ## R1 to SW 1 ##
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up

R1(config-if)#int g0/1
R1(config-if)#ip address 182.98.255.254 255.255.0.0
R1(config-if)#desc ## R1 to SW 2 ##
R1(config-if)#no shut

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up

R1(config-if)#int g0/2
R1(config-if)#ip address 201.191.20.0 255.255.255.0
Bad mask /24 for address 201.191.20.0
R1(config-if)#ip address 201.191.20.254 255.255.255.0
R1(config-if)#desc ## R1 to SW3 ##
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/2, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/2, changed state to up

```

## 4. Use a 'show' command to verify R1's interfaces again.

```
R1(config-if)#end
R1#
%SYS-5-CONFIG_I: Configured from console by console

R1#show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     15.255.255.254  YES manual up                    up 
GigabitEthernet0/1     182.98.255.254  YES manual up                    up 
GigabitEthernet0/2     201.191.20.254  YES manual up                    up 
Vlan1                  unassigned      YES unset  administratively down down
```

## 5. View the running config to confirm the configuration changes, then save the config

```
R1#
R1#show running-config
Building configuration...

Current configuration : 829 bytes
!
version 15.1
no service timestamps log datetime msec
no service timestamps debug datetime msec
no service password-encryption
!
hostname R1
!
!
!
!
!
!
!
!
ip cef
no ipv6 cef
!
!
!
!
license udi pid CISCO2911/K9 sn FTX1524NMDP-
!
!
!
!
!
!
!
!
!
!
!
spanning-tree mode pvst
!
!
!
!
!
!
interface GigabitEthernet0/0
 description ## R1 to SW 1 ##
 ip address 15.255.255.254 255.0.0.0
 duplex auto
 speed auto
!
interface GigabitEthernet0/1
 description ## R1 to SW 2 ##
 ip address 182.98.255.254 255.255.0.0
 duplex auto
 speed auto
!
interface GigabitEthernet0/2
 description ## R1 to SW3 ##
 ip address 201.191.20.254 255.255.255.0
 duplex auto
 speed auto
!
interface Vlan1
 no ip address
 shutdown
!
ip classless
!
ip flow-export version 9
!
 --More-- 

R1#write
Building configuration...
[OK]
```



## 6. Configure the IP addresses of PC1, PC2, and PC3

- PC's default gateway should be configured to R1's IP addresses for their respective interfaces. 
	- For example, in PC1, the default gateway should be 15.255.255.254. 
	- Press "FastEthernet0" and configure the IP address. 
		- Subnet masks are automatically configured since Cisco can recognize a Class A address.
	

## 7. Ping from PC1 to PC2 and PC3 to test connectivity


```
Cisco Packet Tracer PC Command Line 1.0
C:\>ping 182.98.0.1

Pinging 182.98.0.1 with 32 bytes of data:

Request timed out.
Reply from 182.98.0.1: bytes=32 time<1ms TTL=127
Reply from 182.98.0.1: bytes=32 time<1ms TTL=127
Reply from 182.98.0.1: bytes=32 time<1ms TTL=127

Ping statistics for 182.98.0.1:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms

C:\>ping 201.191.20.1

Pinging 201.191.20.1 with 32 bytes of data:

Request timed out.
Reply from 201.191.20.1: bytes=32 time<1ms TTL=127
Reply from 201.191.20.1: bytes=32 time<1ms TTL=127
Reply from 201.191.20.1: bytes=32 time=9ms TTL=127

Ping statistics for 201.191.20.1:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 9ms, Average = 3ms
```