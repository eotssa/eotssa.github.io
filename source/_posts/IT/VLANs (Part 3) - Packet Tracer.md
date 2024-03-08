---
title: VLANs (Part 3) - Packet Tracer
date: 2024-03-07 19:19:12
tags: 
categories:
  - IT
---
Hosts are in the correct VLANs.
SW1-SW2 are connected via trunk.
R1-SW2 are connected via ROAS.

1. Replace the ROAS configuration on R1-SW2 with a point-to-point Layer 3 connection.
    Use the IP addresses given in the network diagram.
    Configure a default route on SW2, with R1's G0/0 interface as the next hop.


First, confirm the status of R1. 
```
R1>
R1>en

// confirm running configuration and physical switches 
R1#show run           
Building configuration...

Current configuration : 1090 bytes
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
license udi pid CISCO2911/K9 sn FTX152425PG-
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
// we can see that g0/0 is enabled, with no IP address, and contains three sub-interfaces 
!
interface GigabitEthernet0/0
 no ip address
 duplex auto
 speed auto
!
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 10.0.0.62 255.255.255.192
!
interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 10.0.0.126 255.255.255.192
!
interface GigabitEthernet0/0.30
 encapsulation dot1Q 30
 ip address 10.0.0.190 255.255.255.192
!
interface GigabitEthernet0/1
 no ip address
 duplex auto
 speed auto
 shutdown
!

// the status of g0/0 and its sub-interfaces are all up/up. will remove.
R1#show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     unassigned      YES NVRAM  up                    up 
GigabitEthernet0/0.10  10.0.0.62       YES manual up                    up 
GigabitEthernet0/0.20  10.0.0.126      YES manual up                    up 
GigabitEthernet0/0.30  10.0.0.190      YES manual up                    up 
GigabitEthernet0/1     unassigned      YES NVRAM  administratively down down 
GigabitEthernet0/2     unassigned      YES NVRAM  administratively down down 
GigabitEthernet0/0/0   1.1.1.2         YES manual up                    up 
Vlan1                  unassigned      YES unset  administratively down down
```

We can begin by removing the sub-interfaces as follows.

```
R1#
R1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#no int g0/0.10
R1(config)#
%LINK-3-UPDOWN: Interface GigabitEthernet0/0.10, changed state to down

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0.10, changed state to down

R1(config)#no int g0/0.20
R1(config)#
%LINK-3-UPDOWN: Interface GigabitEthernet0/0.20, changed state to down

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0.20, changed state to down

R1(config)#no int g0/0.30
R1(config)#
%LINK-3-UPDOWN: Interface GigabitEthernet0/0.30, changed state to down

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0.30, changed state to down
```

We can confirm the running config and interface status. 

```
R1(config)#do show run
Building configuration...

Current configuration : 800 bytes
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
license udi pid CISCO2911/K9 sn FTX152425PG-
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
// successfully removed sub-interfaces 
!
interface GigabitEthernet0/0
 no ip address
 duplex auto
 speed auto
!
interface GigabitEthernet0/1
 no ip address
 duplex auto
 speed auto
 shutdown
!
interface GigabitEthernet0/2
 no ip address
 duplex auto
 speed auto
 shutdown
!
interface GigabitEthernet0/0/0
 ip address 1.1.1.2 255.255.255.0
!
interface Vlan1
 no ip address
 shutdown

// in Cisco, it should show 'deleted' until the device is restarted; not here. 
R1(config)#do show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     unassigned      YES NVRAM  up                    up 
GigabitEthernet0/1     unassigned      YES NVRAM  administratively down down 
GigabitEthernet0/2     unassigned      YES NVRAM  administratively down down 
GigabitEthernet0/0/0   1.1.1.2         YES manual up                    up 
Vlan1                  unassigned      YES unset  administratively down down
```


We can reset the interface with `default int g0/0` but not necessary here given there's no other configurations besides `no shutdown`.

```
R1(config)#int g0/0
R1(config-if)#ip address 10.0.0.194 255.255.255.252
```
---

Switch G1/0/2 Interface

Confirm the status of the interface.

```
SW2>en
SW2#show run
Building configuration...

Current configuration : 1688 bytes
!
version 16.3.2
no service timestamps log datetime msec
no service timestamps debug datetime msec
no service password-encryption
!
hostname SW2
!
!
!
!
!
!
!
no ip cef
no ipv6 cef
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
interface GigabitEthernet1/0/1
 switchport trunk allowed vlan 10,30
 switchport mode trunk
!
interface GigabitEthernet1/0/2
 switchport trunk allowed vlan 10,20,30
 switchport mode trunk
!
interface GigabitEthernet1/0/3
 switchport access vlan 20
 switchport mode access
 switchport nonegotiate
!
interface GigabitEthernet1/0/4
 switchport access vlan 10
 switchport mode access
 switchport nonegotiate
!
interface GigabitEthernet1/0/5
 switchport access vlan 10
 switchport mode access
 switchport nonegotiate
!
interface GigabitEthernet1/0/6
!
interface GigabitEthernet1/0/7
!
interface GigabitEthernet1/0/8
!
interface GigabitEthernet1/0/9
!
interface GigabitEthernet1/0/10
!
interface GigabitEthernet1/0/11
!
interface GigabitEthernet1/0/12
!
interface GigabitEthernet1/0/13
!
interface GigabitEthernet1/0/14
!
interface GigabitEthernet1/0/15
!
interface GigabitEthernet1/0/16
!
interface GigabitEthernet1/0/17
!
interface GigabitEthernet1/0/18
```

We'll reset g1/0/2, and confirm its status

```
SW2#
SW2#
SW2#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
SW2(config)#default int g1/0/2
Building configuration...



Interface GigabitEthernet1/0/2 set to default configuration
SW2(config)#default int g1/0/2
Building configuration...



Interface GigabitEthernet1/0/2 set to default configuration
SW2(config)#
SW2(config)#do show run
Building configuration...

Current configuration : 1625 bytes
!
version 16.3.2
no service timestamps log datetime msec
no service timestamps debug datetime msec
no service password-encryption
!
hostname SW2
!
!
!
!
!
!
!
no ip cef
no ipv6 cef
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
interface GigabitEthernet1/0/1
 switchport trunk allowed vlan 10,30
 switchport mode trunk
!
interface GigabitEthernet1/0/2
!
interface GigabitEthernet1/0/3
 switchport access vlan 20
 switchport mode access
 switchport nonegotiate
!
interface GigabitEthernet1/0/4
 switchport access vlan 10
 switchport mode access
 switchport nonegotiate
!
interface GigabitEthernet1/0/5
 switchport access vlan 10
 switchport mode access
 switchport nonegotiate
!
interface GigabitEthernet1/0/6
!
interface GigabitEthernet1/0/7
!
interface GigabitEthernet1/0/8
```

For a switch, remember to turn the switchport into a "router port", use `no switchport`.

```
SW2(config)#
SW2(config)#
SW2(config)#int g1/0/2
SW2(config-if)#ip ?
  access-group  Specify access control for packets
  arp           Configure ARP features
  dhcp          Configure DHCP parameters for this interface
SW2(config-if)#// no option for address because this interface is still in layer 2 mode
               ^
% Invalid input detected at '^' marker.
	
SW2(config-if)#no switchport
SW2(config-if)#
%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet1/0/2, changed state to down

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet1/0/2, changed state to up

SW2(config-if)#ip ?
  access-group     Specify access control for packets
  address          Set the IP address of an interface
  authentication   authentication subcommands
  flow             NetFlow Related commands
  hello-interval   Configures IP-EIGRP hello interval
  helper-address   Specify a destination address for UDP broadcasts
  inspect          Apply inspect name
  ips              Create IPS rule
  mtu              Set IP Maximum Transmission Unit
  ospf             OSPF interface commands
  proxy-arp        Enable proxy ARP
  route-cache      Enable fast-switching cache for outgoing packets
  split-horizon    Perform split horizon
  summary-address  Perform address summarization
// IP ADDRESS IS NOW CONFIGURED. WE CHANGED A SWITCHPORT INTO A "ROUTER PORT"
SW2(config-if)#ip address 10.0.0.193 255.255.255.252
SW2(config-if)#

```

Now add a static route.
Static routes can be added on a switch, but `ip routing` needs to be enabled first

```
SW2(config-if)#exit
SW2(config)#// let's configure the routing table
            ^
% Invalid input detected at '^' marker.
	
SW2(config)#
SW2(config)#do sh ip route
Default gateway is not set

Host               Gateway           Last Use    Total Uses  Interface
ICMP redirect cache is empty

SW2(config)#// no routes appear atm, ip routing has not been enabled.
            ^
% Invalid input detected at '^' marker.
	
SW2(config)#ip routing
SW2(config)#//enabled
            ^
% Invalid input detected at '^' marker.
	
SW2(config)#do show ip route
Codes: C - connected, S - static, I - IGRP, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is not set

     10.0.0.0/30 is subnetted, 1 subnets
C       10.0.0.192 is directly connected, GigabitEthernet1/0/2

SW2(config)#
SW2(config)#//local route should appear, maybe packet tracer issue?
% Unrecognized command
SW2(config)#//local route should appear, maybe packet tracer issue
            ^
% Invalid input detected at '^' marker.
	
SW2(config)#
SW2(config)#ip route 0.0.0.0 0.0.0.0 10.0.0.194
SW2(config)#
SW2(config)#do sh ip route
Codes: C - connected, S - static, I - IGRP, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is 10.0.0.194 to network 0.0.0.0

     10.0.0.0/30 is subnetted, 1 subnets
C       10.0.0.192 is directly connected, GigabitEthernet1/0/2
S*   0.0.0.0/0 [1/0] via 10.0.0.194
```

Before we configure the SVI, confirm the VLAN status because SVI's remain down/down unless a VLAN exists. 

```
SW2>
SW2>show vlan brief

VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Gig1/0/6, Gig1/0/7, Gig1/0/8, Gig1/0/9
                                                Gig1/0/10, Gig1/0/11, Gig1/0/12, Gig1/0/13
                                                Gig1/0/14, Gig1/0/15, Gig1/0/16, Gig1/0/17
                                                Gig1/0/18, Gig1/0/19, Gig1/0/20, Gig1/0/21
                                                Gig1/0/22, Gig1/0/23, Gig1/0/24, Gig1/1/1
                                                Gig1/1/2, Gig1/1/3, Gig1/1/4
10   VLAN0010                         active    Gig1/0/4, Gig1/0/5
20   VLAN0020                         active    Gig1/0/3
30   VLAN0030                         active    
1002 fddi-default                     active    
1003 token-ring-default               active    
1004 fddinet-default                  active    
1005 trnet-default                    active    
SW2>
```
We can see VLAN10, 20, and 30 exists.

Now we can configure the SVIs.
Ensure `no shutdown` is applied to each vlan interface. 

```
SW2>
SW2>en
SW2#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
SW2(config)#int vlan 10
SW2(config-if)#
%LINK-5-CHANGED: Interface Vlan10, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface Vlan10, changed state to up

SW2(config-if)#ip add 10.10.0.62 255.255.255.192
SW2(config-if)#int vlan 20
SW2(config-if)#
%LINK-5-CHANGED: Interface Vlan20, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface Vlan20, changed state to up

SW2(config-if)#10.0.0.0.126 255.255.255.192
               ^
% Invalid input detected at '^' marker.
	
SW2(config-if)#ip address 10.0.0.0.126 255.255.255.192
                          ^
% Invalid input detected at '^' marker.
	
SW2(config-if)#
SW2(config-if)#ip address 10.0.0.126 255.255.255.192
SW2(config-if)#
SW2(config-if)#inter
SW2(config-if)#interface vlan 30
SW2(config-if)#
%LINK-5-CHANGED: Interface Vlan30, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface Vlan30, changed state to up

SW2(config-if)#ip address 10.0.0.190 255.255.255.192
SW2(config-if)#
SW2(config-if)#int vlan 10
SW2(config-if)#no shutdown
SW2(config-if)#int vlan 20
SW2(config-if)#no shutdown
SW2(config-if)#int vlan 30
SW2(config-if)#no shutdown
SW2(config-if)#exit
SW2(config)#do show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet1/0/1   unassigned      YES unset  up                    up 
GigabitEthernet1/0/2   10.0.0.193      YES manual up                    up 
GigabitEthernet1/0/3   unassigned      YES unset  up                    up 
GigabitEthernet1/0/4   unassigned      YES unset  up                    up 
GigabitEthernet1/0/5   unassigned      YES unset  up                    up 
GigabitEthernet1/0/6   unassigned      YES unset  down                  down 
GigabitEthernet1/0/7   unassigned      YES unset  down                  down 
GigabitEthernet1/0/8   unassigned      YES unset  down                  down 
GigabitEthernet1/0/9   unassigned      YES unset  down                  down 
GigabitEthernet1/0/10  unassigned      YES unset  down                  down 
GigabitEthernet1/0/11  unassigned      YES unset  down                  down 
GigabitEthernet1/0/12  unassigned      YES unset  down                  down 
GigabitEthernet1/0/13  unassigned      YES unset  down                  down 
GigabitEthernet1/0/14  unassigned      YES unset  down                  down 
GigabitEthernet1/0/15  unassigned      YES unset  down                  down 
GigabitEthernet1/0/16  unassigned      YES unset  down                  down 
GigabitEthernet1/0/17  unassigned      YES unset  down                  down 
GigabitEthernet1/0/18  unassigned      YES unset  down                  down 
GigabitEthernet1/0/19  unassigned      YES unset  down                  down 
GigabitEthernet1/0/20  unassigned      YES unset  down                  down 
GigabitEthernet1/0/21  unassigned      YES unset  down                  down 
GigabitEthernet1/0/22  unassigned      YES unset  down                  down 
GigabitEthernet1/0/23  unassigned      YES unset  down                  down 
GigabitEthernet1/0/24  unassigned      YES unset  down                  down 
GigabitEthernet1/1/1   unassigned      YES unset  down                  down 
GigabitEthernet1/1/2   unassigned      YES unset  down                  down 
GigabitEthernet1/1/3   unassigned      YES unset  down                  down 
GigabitEthernet1/1/4   unassigned      YES unset  down                  down 
Vlan1                  unassigned      YES unset  administratively down down 
Vlan10                 10.10.0.62      YES manual up                    up 
Vlan20                 10.0.0.126      YES manual up                    up 
Vlan30                 10.0.0.190      YES manual up                    up
SW2(config)# 
```