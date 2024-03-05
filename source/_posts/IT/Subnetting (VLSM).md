---
title: Subnetting (VLSM) - Packet Tracer
date: 2024-03-04 18:00:08
tags:
---
![](../../images/Pasted%20image%2020240304182650.png)
- VSLM setup: LAN2 -> LAN1 -> LAN3 -> LAN4 -> R/1 to R/2

Given 192.168.5.0/24...

### LAN2 first.
- LAN2 requires 64 hosts, consider 6 borrowed bits means 2^6 - 2 = 62 hosts... not enough.
	- Consider 7 borrowed bits on the host side, 2^7 - 2 = 126 hosts 
	- That means 1 borrowed bits on network side = /25;
		- Given that this is the first subnet, it'll be 192.168.5.0/26. 
	- Next, consider the broadcast address. 
		- 192.168.5.0/25 is 11000000.10101000.00000101.(0)0000000
		- Change the bits to 1's. 11000000.10101000.00000101.(0)1111111 = 192.168.5.127

1. Network address: 192.168.5.0/25
2. Broadcast address: 192.168.5.127/25
3. First usable address: 192.168.5.1/25
4. Last usable address: 192.168.5.126/25
5. Number of host (usable addresses): 126 host

### LAN 1 (45 Host)

- Network address is the next subsequent number after the prior broadcast request.
	- 192.168.5.128
		- Prefix length is likely 6 host bits; 2^6 - 2 = 62 host
		- So 2 network bits means /26
		- 192.168.5.128/26
- Broadcast Address is xxxxxxxx.xxxxxxxx.00000101.(10)111111
	- which is 192.168.5.191/26

1. Network address: 192.168.5.128/26
2. Broadcast address: 192.168.5.191/26
3. First usable address: 192.168.5.129/26
4. Last usable address: 192.168.5.191/26
5. Number of host (usable addresses): 62 host

### LAN 3 (14 host)

- - Network address is the next subsequent number after the prior broadcast request.
	- 192.168.5.192
		- Prefix length is determined by 14 hosts, so about 4 host bits is required.
			- 4^2 -2 = 14 host (exactly the right amount)
		- 4 host bits means 4 network bits. 24 + 4 = /28
		- Network address: 192.168.5.192/28
- Broadcast address is determined as follows:
	- xxxxxxxx.xxxxxxxx.xxxxxxxx.(1100)0000 (192.168.5.192/28)
	- xxxxxxxx.xxxxxxxx.xxxxxxxx.(1100)1111 (192.168.5.207/28)
		- Broadcast address = 192.168.5.207/28

1. Network address: 192.168.5.192/28
2. Broadcast address: 192.168.5.207/28
3. First usable address: 192.168.5.193/28
4. Last usable address: 192.168.5.206/28
5. Number of host (usable addresses): 14 host

### LAN 4 (9 Host)

1. Network address: 192.168.5.208/28
2. Broadcast address: xxxxxxxx.xxxxxxxx.xxxxxxxx.(1101)0000 => (1101)1111 => 223 => 192.168.5.223/28
3. First usable address: 192.168.5.209/28
4. Last usable address: 192.168.5.222/28
5. Number of host (usable addresses): 14 

### Point-to-Point

1. Network address: 192.168.5.224 (can be /30 or /31) --- we will use /30
2. Broadcast address: xxxxxxxx.xxxxxxxx.xxxxxxxx.(111000)00 => (111000)11 => 192.168.5.227/30
3. First usable address: 192.168.5.225/30 => (R1)
5. Last usable address: 192.168.5.226/30 => (R2)
6. Number of host (usable addresses): 2



## Configuration ------------------

![](../../images/Pasted%20image%2020240304182650.png)

## LAN 2
### Router 1's interface configuration 
```
R1>
R1>en
R1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#int g0/1
R1(config-if)#ip address 192.168.5.126 255.255.255.128
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up

R1(config-if)#
R1(config-if)#do sh ip int
GigabitEthernet0/0 is administratively down, line protocol is down (disabled)
  Internet protocol processing disabled
GigabitEthernet0/1 is up, line protocol is up (connected)
  Internet address is 192.168.5.126/25
  Broadcast address is 255.255.255.255
  Address determined by setup command
  MTU is 1500 bytes
  Helper address is not set
  Directed broadcast forwarding is disabled
  Outgoing access list is not set
  Inbound  access list is not set
  Proxy ARP is enabled
  Security level is default
  Split horizon is enabled
  ICMP redirects are always sent
  ICMP unreachables are always sent
  ICMP mask replies are never sent
  IP fast switching is disabled
  IP fast switching on the same interface is disabled
  IP Flow switching is disabled
  IP Fast switching turbo vector
  IP multicast fast switching is disabled
  IP multicast distributed fast switching is disabled
  Router Discovery is disabled
  IP output packet accounting is disabled
  IP access violation accounting is disabled
  TCP/IP header compression is disabled
  RTP/IP header compression is disabled
  Probe proxy name replies are disabled
  Policy routing is disabled
  Network address translation is disabled
  BGP Policy Mapping is disabled
  Input features: MCI Check
  WCCP Redirect outbound is disabled
  WCCP Redirect inbound is disabled
  WCCP Redirect exclude is disabled
GigabitEthernet0/2 is administratively down, line protocol is down (disabled)
  Internet protocol processing disabled
GigabitEthernet0/0/0 is administratively down, line protocol is down (disabled)
  Internet protocol processing disabled
Vlan1 is administratively down, line protocol is down
  Internet protocol processing disabled

R1(config-if)#
R1(config-if)#
R1(config-if)#
```

### PC2
1. Configure the default gateway to R1 g0/1, which was set to 192.168.5.126.
2. Configure FastEthernet0:
		IP address: 192.168.5.1 Subnet: 255.255.255.128

## LAN 1 Configuration

1. Network address: 192.168.5.128/26
2. Broadcast address: 192.168.5.191/26
3. First usable address: 192.168.5.129/26
4. Last usable address: 192.168.5.191/26
5. Number of host (usable addresses): 62 host

### R1 Configuration for LAN 1

```
R1(config-if)#
R1(config-if)#
R1(config-if)#int g0/0
R1(config-if)#ip address 192.168.5.190 255.255.255.192
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up

R1(config-if)#
R1(config-if)#do sh ip int g0/0
GigabitEthernet0/0 is up, line protocol is up (connected)
  Internet address is 192.168.5.190/26
  Broadcast address is 255.255.255.255
  Address determined by setup command
  MTU is 1500 bytes
  Helper address is not set
  Directed broadcast forwarding is disabled
  Outgoing access list is not set
  Inbound  access list is not set
  Proxy ARP is enabled
  Security level is default
  Split horizon is enabled
  ICMP redirects are always sent
  ICMP unreachables are always sent
  ICMP mask replies are never sent
  IP fast switching is disabled
  IP fast switching on the same interface is disabled
  IP Flow switching is disabled
  IP Fast switching turbo vector
  IP multicast fast switching is disabled
  IP multicast distributed fast switching is disabled
  Router Discovery is disabled
  IP output packet accounting is disabled
  IP access violation accounting is disabled
  TCP/IP header compression is disabled
  RTP/IP header compression is disabled
  Probe proxy name replies are disabled
  Policy routing is disabled
  Network address translation is disabled
  BGP Policy Mapping is disabled
  Input features: MCI Check
  WCCP Redirect outbound is disabled
  WCCP Redirect inbound is disabled
  WCCP Redirect exclude is disabled

R1(config-if)#
R1(config-if)#
R1(config-if)#
```


### PC2's Configuration

1. Configure the default gateway to R1 g0/0, which was set to 192.168.5.190.
2. Configure FastEthernet0:
		IP address: 192.168.5.129 Subnet: 255.255.255.192

## LAN 3

1. Network address: 192.168.5.192/28
2. Broadcast address: 192.168.5.207/28
3. First usable address: 192.168.5.193/28
4. Last usable address: 192.168.5.206/28
5. Number of host (usable addresses): 14 host


### R2 Configuration for LAN 3

```
R2>
R2>en
R2#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R2(config)#int g0/0
R2(config-if)#ip address 192.168.5.192 255.255.255.240
Bad mask /28 for address 192.168.5.192
R2(config-if)#no shutdown

R2(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up

R2(config-if)#
R2(config-if)#do sh ip int g0/0
GigabitEthernet0/0 is up, line protocol is up (connected)
  Internet protocol processing disabled

R2(config-if)#
R2(config-if)#
R2(config-if)#
R2(config-if)#
R2(config-if)#ip address 192.168.5.206 255.255.255.240
R2(config-if)#
R2(config-if)#do sh ip int
GigabitEthernet0/0 is up, line protocol is up (connected)
  Internet address is 192.168.5.206/28
  Broadcast address is 255.255.255.255
  Address determined by setup command
  MTU is 1500 bytes
  Helper address is not set
  Directed broadcast forwarding is disabled
  Outgoing access list is not set
  Inbound  access list is not set
  Proxy ARP is enabled
  Security level is default
  Split horizon is enabled
  ICMP redirects are always sent
  ICMP unreachables are always sent
  ICMP mask replies are never sent
  IP fast switching is disabled
  IP fast switching on the same interface is disabled
  IP Flow switching is disabled
  IP Fast switching turbo vector
  IP multicast fast switching is disabled
  IP multicast distributed fast switching is disabled
  Router Discovery is disabled
  IP output packet accounting is disabled
  IP access violation accounting is disabled
  TCP/IP header compression is disabled
  RTP/IP header compression is disabled
  Probe proxy name replies are disabled

R2(config-if)#no shutdown
R2(config-if)#do sh ip int
GigabitEthernet0/0 is up, line protocol is up (connected)
  Internet address is 192.168.5.206/28
  Broadcast address is 255.255.255.255
  Address determined by setup command
  MTU is 1500 bytes
  Helper address is not set
  Directed broadcast forwarding is disabled
  Outgoing access list is not set
  Inbound  access list is not set
  Proxy ARP is enabled
  Security level is default
  Split horizon is enabled
  ICMP redirects are always sent
  ICMP unreachables are always sent
  ICMP mask replies are never sent
  IP fast switching is disabled
  IP fast switching on the same interface is disabled
  IP Flow switching is disabled
  IP Fast switching turbo vector
  IP multicast fast switching is disabled
  IP multicast distributed fast switching is disabled
  Router Discovery is disabled
  IP output packet accounting is disabled
  IP access violation accounting is disabled

R2(config-if)#
R2#
```



### PC3's Configuration

1. Configure the default gateway to R2 g0/0, which was set to 192.168.5.206
2. Configure FastEthernet0:
		IP address: 192.168.5.193 Subnet: 255.255.255.240


## LAN 4 Configuration

1. Network address: 192.168.5.208/28
2. Broadcast address: xxxxxxxx.xxxxxxxx.xxxxxxxx.(1101)0000 => (1101)1111 => 223 => 192.168.5.223/28
3. First usable address: 192.168.5.209/28
4. Last usable address: 192.168.5.222/28
5. Number of host (usable addresses): 14 
### R2 Config

```
R2#show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.5.206   YES manual up                    up 
GigabitEthernet0/1     unassigned      YES unset  administratively down down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
GigabitEthernet0/0/0   unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R2#
R2#
R2#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R2(config)#g0/1
           ^
% Invalid input detected at '^' marker.
	
R2(config)#int g0/1
R2(config-if)#ip address 192.168.5.222 255.255.255.240
R2(config-if)#no shutdown

R2(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up

R2(config-if)#
R2(config-if)#do show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.5.206   YES manual up                    up 
GigabitEthernet0/1     192.168.5.222   YES manual up                    up 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
GigabitEthernet0/0/0   unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R2(config-if)#
```

### PC4 Config

Default gateway: 192.168.5.222
FastEth0: 
- IP: 192.168.5.209
- Subnet: 255.255.255.240


## Point-to-Point Connection

1. Network address: 192.168.5.224 (can be /30 or /31) --- we will use /30
2. Broadcast address: xxxxxxxx.xxxxxxxx.xxxxxxxx.(111000)00 => (111000)11 => 192.168.5.227/30
3. First usable address: 192.168.5.225/30 => (R1)
5. Last usable address: 192.168.5.226/30 => (R2)
6. Number of host (usable addresses): 2

### R1 Config
```
R1>en
R1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#do show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.5.190   YES manual up                    up 
GigabitEthernet0/1     192.168.5.126   YES manual up                    up 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
GigabitEthernet0/0/0   unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R1(config)#int g0/0/0
R1(config-if)#ip address 192.168.5.225 255.255.255.252
R1(config-if)#no shutdown

%LINK-5-CHANGED: Interface GigabitEthernet0/0/0, changed state to down
R1(config-if)#do show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.5.190   YES manual up                    up 
GigabitEthernet0/1     192.168.5.126   YES manual up                    up 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
GigabitEthernet0/0/0   192.168.5.225   YES manual down                  down 
Vlan1                  unassigned      YES unset  administratively down down
R1(config-if)#
```


### R2 Config

```
R2(config-if)#
R2(config-if)#do show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.5.206   YES manual up                    up 
GigabitEthernet0/1     192.168.5.222   YES manual up                    up 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
GigabitEthernet0/0/0   unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R2(config-if)#int g0/0/0
R2(config-if)#ip address 192.168.5.226 255.255.255.252
R2(config-if)#do show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.5.206   YES manual up                    up 
GigabitEthernet0/1     192.168.5.222   YES manual up                    up 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
GigabitEthernet0/0/0   192.168.5.226   YES manual administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R2(config-if)#no shutdown

R2(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0/0, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0/0, changed state to up

R2(config-if)#do show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.5.206   YES manual up                    up 
GigabitEthernet0/1     192.168.5.222   YES manual up                    up 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
GigabitEthernet0/0/0   192.168.5.226   YES manual up                    up 
Vlan1                  unassigned      YES unset  administratively down down
R2(config-if)#
```


## Configure Static Routes

![](../../images/Pasted%20image%2020240304182650.png)

### Configuring R2 
- Configure what happens when R2 attempts to send data to LAN 1 and LAN 2. 
- `ip route (destination IP) (subnet mask) (next-hop)`
	- next hop is the P2P connection at G0/0/0. 

```
R2>en
R2#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R2(config)#ip route 192.168.5.128 255.255.255.192 ?
  A.B.C.D          Forwarding router's address
  Dialer           Dialer interface
  Ethernet         IEEE 802.3
  FastEthernet     FastEthernet IEEE 802.3
  GigabitEthernet  GigabitEthernet IEEE 802.3z
  Loopback         Loopback interface
  Null             Null interface
  Serial           Serial
  Vlan             Catalyst Vlans
R2(config)#ip route 192.168.5.128 255.255.255.192 192.168.5.225
R2(config)#ip route 192.168.5.0 255.255.255.128 192.168.5.225
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

     192.168.5.0/24 is variably subnetted, 8 subnets, 5 masks
S       192.168.5.0/25 [1/0] via 192.168.5.225
S       192.168.5.128/26 [1/0] via 192.168.5.225
C       192.168.5.192/28 is directly connected, GigabitEthernet0/0
L       192.168.5.206/32 is directly connected, GigabitEthernet0/0
C       192.168.5.208/28 is directly connected, GigabitEthernet0/1
L       192.168.5.222/32 is directly connected, GigabitEthernet0/1
C       192.168.5.224/30 is directly connected, GigabitEthernet0/0/0
L       192.168.5.226/32 is directly connected, GigabitEthernet0/0/0

R2(config)#
```


### Configuring R1
- - Configure what happens when R1 attempts to send data to LAN 3 and LAN 4. 
- `ip route (destination IP) (subnet mask) (exit-int)`

```
R1>en
R1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#do show ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is not set

     192.168.5.0/24 is variably subnetted, 6 subnets, 4 masks
C       192.168.5.0/25 is directly connected, GigabitEthernet0/1
L       192.168.5.126/32 is directly connected, GigabitEthernet0/1
C       192.168.5.128/26 is directly connected, GigabitEthernet0/0
L       192.168.5.190/32 is directly connected, GigabitEthernet0/0
C       192.168.5.224/30 is directly connected, GigabitEthernet0/0/0
L       192.168.5.225/32 is directly connected, GigabitEthernet0/0/0

R1(config)#
R1(config)#ip route 192.168.5.192 255.255.255.240 g0/0/0
%Default route without gateway, if not a point-to-point interface, may impact performance
R1(config)#ip route 192.168.5.208 255.255.255.240 g0/0/0
%Default route without gateway, if not a point-to-point interface, may impact performance
R1(config)#do show ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is not set

     192.168.5.0/24 is variably subnetted, 8 subnets, 5 masks
C       192.168.5.0/25 is directly connected, GigabitEthernet0/1
L       192.168.5.126/32 is directly connected, GigabitEthernet0/1
C       192.168.5.128/26 is directly connected, GigabitEthernet0/0
L       192.168.5.190/32 is directly connected, GigabitEthernet0/0
S       192.168.5.192/28 is directly connected, GigabitEthernet0/0/0
S       192.168.5.208/28 is directly connected, GigabitEthernet0/0/0
C       192.168.5.224/30 is directly connected, GigabitEthernet0/0/0
L       192.168.5.225/32 is directly connected, GigabitEthernet0/0/0

R1(config)#
```


## Ping PC1 to PC4 to check

```
Cisco Packet Tracer PC Command Line 1.0
C:\>ping 192.168.5.209

Pinging 192.168.5.209 with 32 bytes of data:

Request timed out.
Request timed out.
Reply from 192.168.5.209: bytes=32 time<1ms TTL=126
Reply from 192.168.5.209: bytes=32 time<1ms TTL=126

Ping statistics for 192.168.5.209:
    Packets: Sent = 4, Received = 2, Lost = 2 (50% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms

C:\>ping 192.168.5.209

Pinging 192.168.5.209 with 32 bytes of data:

Reply from 192.168.5.209: bytes=32 time<1ms TTL=126
Reply from 192.168.5.209: bytes=32 time<1ms TTL=126
Reply from 192.168.5.209: bytes=32 time=7ms TTL=126
Reply from 192.168.5.209: bytes=32 time<1ms TTL=126

Ping statistics for 192.168.5.209:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 7ms, Average = 1ms

C:\>
C:\>
```

Works.