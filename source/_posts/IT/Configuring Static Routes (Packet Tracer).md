---
title: Configuring Static Routes (Packet Tracer 11-2)
date: 2024-02-28 11:13:39
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240228112733.png)

## Pre-Configuration 

### PC1 Configurations
- Head into PC1 and configure the default gateway to R1
- Then go to the fastEthernet0 to set PC1's IP address `192.168.1.1`. Subnet is auto-filled to class C.

### R1 Configurations
- We will configure hostname, and both interfaces g0/1 and g0/0.
```
Router>en
Router#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
Router(config)#hostname R1
R1(config)#int
% Incomplete command.
R1(config)#int g0/1
R1(config-if)#ip add
R1(config-if)#ip address 192.168.1.254 255.255.255.0
R1(config-if)#desc ## to SW1 ##
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up

R1(config-if)#int g0/0
R1(config-if)#ip address 192.168.12.1 255.255.255.0
R1(config-if)#desc
R1(config-if)#description ## to R2 ##
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up

R1(config-if)#do sh ip int brief
R1(config-if)#do sh ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.12.1    YES manual up                    down 
GigabitEthernet0/1     192.168.1.254   YES manual up                    up 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R1(config-if)#
```
- Note that g0/0 shows protocol "down" still because R2 is not configured yet. 

### R2 Configurations

```
Router>en
Router#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
Router(config)#host
Router(config)#hostname R2
R2(config)#int g0/0
R2(config-if)#ip address 192.168.12.1 255.255.255.0
R2(config-if)#desc ## to R1 ##
R2(config-if)#no shutdown

R2(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up
%IP-4-DUPADDR: Duplicate address 192.168.12.1 on GigabitEthernet0/0, sourced by 00D0.D326.6D01
%IP-4-DUPADDR: Duplicate address 192.168.12.1 on GigabitEthernet0/0, sourced by 00D0.D326.6D01

R2(config-if)#int g0/1
R2(config-if)#int g0/0
R2(config-if)#ip address 192.168.12.2 255.255.255.0
R2(config-if)#int g0/1
R2(config-if)#ip address 192.168.13.2 255.255.255.0
R2(config-if)#no shutdown

R2(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to up

R2(config-if)#do show ip brief
show ip brief
         ^
% Invalid input detected at '^' marker.
	
R2(config-if)#do show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.12.2    YES manual up                    up 
GigabitEthernet0/1     192.168.13.2    YES manual up                    down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R2(config-if)#desc ## to R1 ##
R2(config-if)#desc ## to R3 ##
R2(config-if)#
```

### R3 Configurations

```
Router>en
Router#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
Router(config)#hostname R3
R3(config)#int g0/0
R3(config-if)#ip address 192.168.13.3 255.255.255.0
R3(config-if)#desc ## to R2 ##
R3(config-if)#int g0/1
R3(config-if)#ip address 192.168.3.254 255.255.255.0
R3(config-if)#desc ## to SW2 ##
R3(config-if)#do sh ip ?
% Unrecognized command
R3(config-if)#do sh ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.13.3    YES manual administratively down down 
GigabitEthernet0/1     192.168.3.254   YES manual administratively down down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R3(config-if)#
R3#
```


### PC2 Configurations
- Head into PC2 and configure the default gateway to point to R3
- Then go to the fastEthernet0 to set PC1's IP address `192.168.3.254`. Subnet is auto-filled to class C.



![](../../images/Pasted%20image%2020240228115707.png)
## Configuring Static Routes
- Ensure two way reachability. 
- How many routes do we need to configure?
	- R1 knows where PC1 is already (Same LAN)
	- R3 knows where PC2 is already (Same LAN)
	- So, 4 routes. 
		- R1 needs 1 route.
		- R2 needs 2 routes.
		- R3 needs 1 route.


### R1 Static Route Config.
- Note that the destination should be the network address, not individual hosts. 
	- R1(config)#ip route `192.168.3.0` 255.255.255.0 192.168.12.2
```
R1>
R1>en
R1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#ip route ?
  A.B.C.D  Destination prefix
R1(config)#show ip route
            ^
% Invalid input detected at '^' marker.
	
R1(config)#do show ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is not set

     192.168.1.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.1.0/24 is directly connected, GigabitEthernet0/1
L       192.168.1.254/32 is directly connected, GigabitEthernet0/1
     192.168.12.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.12.0/24 is directly connected, GigabitEthernet0/0
L       192.168.12.1/32 is directly connected, GigabitEthernet0/0

R1(config)#ip route 192.168.3.0 255.255.255.0 ?
  A.B.C.D          Forwarding router's address
  Dialer           Dialer interface
  Ethernet         IEEE 802.3
  FastEthernet     FastEthernet IEEE 802.3
  GigabitEthernet  GigabitEthernet IEEE 802.3z
  Loopback         Loopback interface
  Null             Null interface
  Serial           Serial
  Vlan             Catalyst Vlans
R1(config)#ip route 192.168.3.0 255.255.255.0 192.168.12.2
R1(config)#do show ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is not set

     192.168.1.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.1.0/24 is directly connected, GigabitEthernet0/1
L       192.168.1.254/32 is directly connected, GigabitEthernet0/1
S    192.168.3.0/24 [1/0] via 192.168.12.2
     192.168.12.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.12.0/24 is directly connected, GigabitEthernet0/0
L       192.168.12.1/32 is directly connected, GigabitEthernet0/0

R1(config)#
R1#
```

### R2 Static Route Config 


```
R2>en
R2#conf t
R2#conf terminal 
Enter configuration commands, one per line.  End with CNTL/Z.
R2(config)#do show ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is not set

     192.168.12.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.12.0/24 is directly connected, GigabitEthernet0/0
L       192.168.12.2/32 is directly connected, GigabitEthernet0/0

R2(config)#do show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.12.2    YES manual up                    up 
GigabitEthernet0/1     192.168.13.2    YES manual up                    down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
```
- I noticed a quick issue. Why is there only an dynamic route to g0/0?
	- Where is g0/1? 

Taking a quick glance at my R3 configurations, it looks like I forgot `no shutdown`
```
Router>en
Router#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
Router(config)#hostname R3
R3(config)#int g0/0
R3(config-if)#ip address 192.168.13.3 255.255.255.0
R3(config-if)#desc ## to R2 ##
R3(config-if)#int g0/1
R3(config-if)#ip address 192.168.3.254 255.255.255.0
R3(config-if)#desc ## to SW2 ##
R3(config-if)#do sh ip ?
% Unrecognized command
R3(config-if)#do sh ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.13.3    YES manual administratively down down 
GigabitEthernet0/1     192.168.3.254   YES manual administratively down down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R3(config-if)#
R3#
```

Fixed that.
```
R3>
R3>en
R3#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R3(config)#g0/0
           ^
% Invalid input detected at '^' marker.
	
R3(config)#int g0/0
R3(config-if)#no shutdown

R3(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up

R3(config-if)#int g0/1
R3(config-if)#no shutdown

R3(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up

R3(config-if)#
```

Taking a look at R2 now...looks like we can proceed.

```
R2#
R2#en
R2#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R2(config)#do show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.12.2    YES manual up                    up 
GigabitEthernet0/1     192.168.13.2    YES manual up                    up 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R2(config)#do show ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is not set

     192.168.12.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.12.0/24 is directly connected, GigabitEthernet0/0
L       192.168.12.2/32 is directly connected, GigabitEthernet0/0
     192.168.13.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.13.0/24 is directly connected, GigabitEthernet0/1
L       192.168.13.2/32 is directly connected, GigabitEthernet0/1

R2(config)#
```

Looks good. Configured both routes.
```
R2#
R2#en
R2#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R2(config)#do show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.12.2    YES manual up                    up 
GigabitEthernet0/1     192.168.13.2    YES manual up                    up 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R2(config)#do show ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is not set

     192.168.12.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.12.0/24 is directly connected, GigabitEthernet0/0
L       192.168.12.2/32 is directly connected, GigabitEthernet0/0
     192.168.13.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.13.0/24 is directly connected, GigabitEthernet0/1
L       192.168.13.2/32 is directly connected, GigabitEthernet0/1

R2(config)#
R2(config)#
R2(config)#ip route 192.168.1.0 255.255.255.0 192.168.12.1
R2(config)#ip route 192.168.3.0 255.255.255.0 192.168.13.3
R2(config)#
R2(config)#do show ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is not set

S    192.168.1.0/24 [1/0] via 192.168.12.1
S    192.168.3.0/24 [1/0] via 192.168.13.3
     192.168.12.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.12.0/24 is directly connected, GigabitEthernet0/0
L       192.168.12.2/32 is directly connected, GigabitEthernet0/0
     192.168.13.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.13.0/24 is directly connected, GigabitEthernet0/1
L       192.168.13.2/32 is directly connected, GigabitEthernet0/1

R2(config)#
```


### R3 Static Route Configuration

```
R3(config-if)#exit
R3(config)#ip route 192.168.1.0 255.255.255.0 192.168.13.2
R3(config)#
R3(config)#do show ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is not set

S    192.168.1.0/24 [1/0] via 192.168.13.2
     192.168.3.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.3.0/24 is directly connected, GigabitEthernet0/1
L       192.168.3.254/32 is directly connected, GigabitEthernet0/1
     192.168.13.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.13.0/24 is directly connected, GigabitEthernet0/0
L       192.168.13.3/32 is directly connected, GigabitEthernet0/0

R3(config)#
```

## Let's try to ping PC1 to PC2.

```
Cisco Packet Tracer PC Command Line 1.0
C:\>ping 192.168.3.1

Pinging 192.168.3.1 with 32 bytes of data:

Request timed out.
Request timed out.
Request timed out.
Reply from 192.168.3.1: bytes=32 time<1ms TTL=125

Ping statistics for 192.168.3.1:
    Packets: Sent = 4, Received = 1, Lost = 3 (75% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms

C:\>ping 192.168.3.1

Pinging 192.168.3.1 with 32 bytes of data:

Reply from 192.168.3.1: bytes=32 time<1ms TTL=125
Reply from 192.168.3.1: bytes=32 time=6ms TTL=125
Reply from 192.168.3.1: bytes=32 time<1ms TTL=125
Reply from 192.168.3.1: bytes=32 time=1ms TTL=125

Ping statistics for 192.168.3.1:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 6ms, Average = 1ms

C:\>
```


### Bonus: Why are there three timeouts?
- PC1 sends ICMP echo request to R1.
- R1 does not have R2 in its MAC table yet. So R1 drops the packet.
	- R1 initiates an ARP request, which then R2 replies. 
	- And so forth. 
