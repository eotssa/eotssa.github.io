---
title: Configuring Static Routes in IPv6 - 33 - 3
date: 2024-03-25 17:26:02
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240325183553.png)

IPv6 addresses have been pre-configured on the routers.
The serial connections use link-local addresses only.

1. Enable IPv6 routing on each router.

2. Use SLAAC to configure IPv6 addresses on the PCs.
    What IPv6 address was configured on each PC?

3. Configure static routes on the routers to allow PC1 and PC2 to ping each other.
    The path via R2 should be used only as a backup path.



## 1. Enable IPv6 routing on each router.

```
ipv6 unicast-routing
```

## 2. Use SLAAC to configure IPv6 addresses on the PCs.
    What IPv6 address was configured on each PC?

Simply go to config -> settings and enable Gateway to "automatic". It will generate a default gateway which is likely R1's address FE80::290:2BFF:FECC:A101, which was learned from R1's NDP RA messages. 

In FastEthernet0, IPv6 configuration should also be automatically generated for PC1, which generates a IPv6 address. The network prefix is learned from R1, and the 2nd half was generated using EUI-64. 

PC1's IPv6: 2001:DB8:0:1:20A:41FF:FE4D:1BBC/64
PC1's Link-Local Address: FE80::20A:41FF:FE4D:1BBC

PC2's IPv6: 2001:DB8:0:3:240:BFF:FE69:9B18/64
PC2's Link-Local Address: FE80::240:BFF:FE69:9B18

## 3. Configure static routes on the routers to allow PC1 and PC2 to ping each other. The path via R2 should be used only as a backup path.

### R1's Configurations

The route from R1 -> R3 can be configured as follows: 

```
R1(config)#ipv6 route 2001:db8:0:3::/64 g0/1 2001:db8:0:13::2
```

Since this is an ethernet interface, directly attached static routes cannot be used. I personally used a fully specified static route, but a recursive static route is also viable. 

The route from R1 -> R2 is slightly different. R2 doesn't actually have an IPv6 address; however, R2 does have a link-local address. 

```
R2#show ipv6 int brief
GigabitEthernet0/0         [administratively down/down]
    unassigned
GigabitEthernet0/1         [administratively down/down]
    unassigned
GigabitEthernet0/2         [administratively down/down]
    unassigned
Serial0/0/0                [up/up]
    FE80::20B:BEFF:FED7:4901
Serial0/0/1                [up/up]
    FE80::20B:BEFF:FED7:4901
Vlan1                      [administratively down/down]
    unassigned
R2#
```

For S0/0/0: `FE80::20B:BEFF:FED7:4901`

As such, R1 is configured as following: 
```
R1(config)#ipv6 route 2001:db8:0:3::/64 s0/0/0 FE80::20B:BEFF:FED7:4901 5
```
S0/0/0 is a serial interface, so normally a directly attached static route could be possible. However, since the next-hop is a link-local address, a fully specified address is required. 

Note that since the route is a backup route, an AD of 5 is configured. Static routes have an AD of 1 in Cisco ISO, so anything higher than 1 would work. 


```
R1(config)#do show ipv6 route
IPv6 Routing Table - 6 entries
Codes: C - Connected, L - Local, S - Static, R - RIP, B - BGP
       U - Per-user Static route, M - MIPv6
       I1 - ISIS L1, I2 - ISIS L2, IA - ISIS interarea, IS - ISIS summary
       ND - ND Default, NDp - ND Prefix, DCE - Destination, NDr - Redirect
       O - OSPF intra, OI - OSPF inter, OE1 - OSPF ext 1, OE2 - OSPF ext 2
       ON1 - OSPF NSSA ext 1, ON2 - OSPF NSSA ext 2
       D - EIGRP, EX - EIGRP external
C   2001:DB8:0:1::/64 [0/0]
     via GigabitEthernet0/0, directly connected
L   2001:DB8:0:1::1/128 [0/0]
     via GigabitEthernet0/0, receive
S   2001:DB8:0:3::/64 [1/0]
     via 2001:DB8:0:13::2, GigabitEthernet0/1
C   2001:DB8:0:13::/64 [0/0]
     via GigabitEthernet0/1, directly connected
L   2001:DB8:0:13::1/128 [0/0]
     via GigabitEthernet0/1, receive
L   FF00::/8 [0/0]
     via Null0, receive
```

Only the route from R1 -> R3 is shown. 

```
S   2001:DB8:0:3::/64 [1/0]
     via 2001:DB8:0:13::2, GigabitEthernet0/1
```

The backup route can be shown in the running-config. 

```
R1(config)#do show running-config | include ipv6 route
ipv6 route 2001:DB8:0:3::/64 GigabitEthernet0/1 2001:DB8:0:13::2
ipv6 route 2001:DB8:0:3::/64 Serial0/0/0 FE80::20B:BEFF:FED7:4901 5
```

### R2's Configurations

We want the link-local addresses in R1 and R3, since these serial interfaces do not have an IPv6 address configured. 

```
R1(config)#do sh ipv6 int brief
GigabitEthernet0/0         [up/up]
    FE80::202:4AFF:FE23:E201
    2001:DB8:0:1::1
GigabitEthernet0/1         [up/up]
    FE80::202:4AFF:FE23:E202
    2001:DB8:0:13::1
GigabitEthernet0/2         [administratively down/down]
    unassigned
Serial0/0/0                [up/up]
    FE80::202:4AFF:FE23:E201
Serial0/0/1                [administratively down/down]
    unassigned
Vlan1                      [administratively down/down]
    unassigned
R1(config)#
```

R1's S0/0/0's link-local is: `FE80::202:4AFF:FE23:E201`

So to reach PC1, we can configure as follows: 
```
R2(config)#ipv6 route 2001:db8:0:1::/64 s0/0/0 FE80::202:4AFF:FE23:E201
```


R3's link-local for s0/0/0 is found as follows:

```
R3#show ipv6 int brief
GigabitEthernet0/0         [up/up]
    FE80::290:2BFF:FECC:A101
    2001:DB8:0:3::1
GigabitEthernet0/1         [up/up]
    FE80::290:2BFF:FECC:A102
    2001:DB8:0:13::2
GigabitEthernet0/2         [administratively down/down]
    unassigned
Serial0/0/0                [up/up]
    FE80::290:2BFF:FECC:A101
Serial0/0/1                [administratively down/down]
    unassigned
Vlan1                      [administratively down/down]
    unassigned
```

R3 S0/0/0: `FE80::290:2BFF:FECC:A101`

Now R2 is configured as follows:

```
R2(config)#ipv6 route 2001:db8:0:3::/64 s0/0/1 FE80::290:2BFF:FECC:A101
```

We can confirm R2's ipv6 routes now:

```
R2(config)#do show ipv6 route
IPv6 Routing Table - 3 entries
Codes: C - Connected, L - Local, S - Static, R - RIP, B - BGP
       U - Per-user Static route, M - MIPv6
       I1 - ISIS L1, I2 - ISIS L2, IA - ISIS interarea, IS - ISIS summary
       ND - ND Default, NDp - ND Prefix, DCE - Destination, NDr - Redirect
       O - OSPF intra, OI - OSPF inter, OE1 - OSPF ext 1, OE2 - OSPF ext 2
       ON1 - OSPF NSSA ext 1, ON2 - OSPF NSSA ext 2
       D - EIGRP, EX - EIGRP external
S   2001:DB8:0:1::/64 [1/0]
     via FE80::202:4AFF:FE23:E201, Serial0/0/0
S   2001:DB8:0:3::/64 [1/0]
     via FE80::290:2BFF:FECC:A101, Serial0/0/1
L   FF00::/8 [0/0]
     via Null0, receive
```

### R3's Configurations

We can use R1's g0/1 IPv6 address. 

```
R3(config)#ipv6 route 2001:db8:0:1::/64 g0/1 2001:db8:0:13::1
```

R2's link-local address is found as follows:

```
R2(config)#do show ipv6 int brief
GigabitEthernet0/0         [administratively down/down]
    unassigned
GigabitEthernet0/1         [administratively down/down]
    unassigned
GigabitEthernet0/2         [administratively down/down]
    unassigned
Serial0/0/0                [up/up]
    FE80::20B:BEFF:FED7:4901
Serial0/0/1                [up/up]
    FE80::20B:BEFF:FED7:4901
Vlan1                      [administratively down/down]
    unassigned
```

Given the diagram, we want s0/0/1's link-local: FE80::20B:BEFF:FED7:4901

```
R3(config)#ipv6 route 2001:db8:0:1::/64 s0/0/0 FE80::20B:BEFF:FED7:4901 5
```

Since this is a backup route, an AD of 5 is configured.

Confirm the routes.

```
R3#show running-config | include ipv6 route
ipv6 route 2001:DB8:0:1::/64 Serial0/0/0 FE80::20B:BEFF:FED7:4901 5
ipv6 route 2001:DB8:0:1::/64 GigabitEthernet0/1 2001:DB8:0:13::1
```


## Ping to Test

PC1 -> PC2 

```
C:\>ping 2001:DB8:0:3:240:BFF:FE69:9B18

Pinging 2001:DB8:0:3:240:BFF:FE69:9B18 with 32 bytes of data:

Reply from 2001:DB8:0:3:240:BFF:FE69:9B18: bytes=32 time=10ms TTL=126
Reply from 2001:DB8:0:3:240:BFF:FE69:9B18: bytes=32 time<1ms TTL=126
Reply from 2001:DB8:0:3:240:BFF:FE69:9B18: bytes=32 time<1ms TTL=126
Reply from 2001:DB8:0:3:240:BFF:FE69:9B18: bytes=32 time=1ms TTL=126

Ping statistics for 2001:DB8:0:3:240:BFF:FE69:9B18:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 10ms, Average = 2ms

C:\>traceroute 2001:DB8:0:3:240:BFF:FE69:9B18
Invalid Command.

C:\>tracert 2001:DB8:0:3:240:BFF:FE69:9B18

Tracing route to 2001:DB8:0:3:240:BFF:FE69:9B18 over a maximum of 30 hops: 

  1   0 ms      0 ms      0 ms      2001:DB8:0:1::1
  2   0 ms      0 ms      0 ms      2001:DB8:0:13::2
  3   0 ms      0 ms      0 ms      2001:DB8:0:3:240:BFF:FE69:9B18

Trace complete.

C:\>
```

We can confirm that PC1 -> R1 -> R3 -> PC2. 

Let's shut down R3's G0/1.

```
R3(config)#int g0/1
R3(config-if)#shutdown

R3(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to administratively down

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to down

R3(config-if)#
```

We can see the backup route working. 

```PC1
C:\>tracert 2001:DB8:0:3:240:BFF:FE69:9B18

Tracing route to 2001:DB8:0:3:240:BFF:FE69:9B18 over a maximum of 30 hops: 

  1   0 ms      0 ms      0 ms      2001:DB8:0:1::1
  2   *         *         *         Request timed out.
  3   7 ms      8 ms      8 ms      2001:DB8:0:3::1
  4   1 ms      1 ms      3 ms      2001:DB8:0:3:240:BFF:FE69:9B18
```
