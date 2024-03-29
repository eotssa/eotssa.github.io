---
title: DNS Configurations
date: 2024-03-29 17:06:57
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240329171424.png)

1. Configure a default route to the Internet on R1.

2. Configure PC1, PC2, and PC3 to use 1.1.1.1 as their DNS server.

3. Configure R1 to use 1.1.1.1 as its DNS server.
    Configure host entries on R1 for R1, PC1, PC2, and PC3.
    Ping PC1 by name from R1.

4. #USE SIMULATION MODE FOR THIS STEP#
    From PC1, ping youtube.com by name.  Analyze the messages being sent.


## 1. Configure a default route to the Internet on R1.

```
R1(config)#do show ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is not set

     192.168.0.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.0.0/24 is directly connected, GigabitEthernet0/1
L       192.168.0.254/32 is directly connected, GigabitEthernet0/1
     203.0.113.0/24 is variably subnetted, 2 subnets, 2 masks
C       203.0.113.0/30 is directly connected, GigabitEthernet0/0
L       203.0.113.1/32 is directly connected, GigabitEthernet0/0

R1(config)#ip route 0.0.0.0 0.0.0.0 203.0.113.2
```

```
R1(config)#do ping 1.1.1.1

Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 1.1.1.1, timeout is 2 seconds:
..!!!
Success rate is 60 percent (3/5), round-trip min/avg/max = 0/0/0 ms
```
## 2. Configure PC1, PC2, and PC3 to use 1.1.1.1 as their DNS server.

Just head to the manual config and set the DNS. 

## 3. Configure R1 to use 1.1.1.1 as its DNS server. Configure host entries on R1 for R1, PC1, PC2, and PC3.Ping PC1 by name from R1.

```
R1(config)#ip name-server 1.1.1.1
R1(config)#ip host R1 192.168.0.254
R1(config)#ip host PC1 192.168.0.1
R1(config)#ip host PC2 192.168.0.2
R1(config)#ip host PC3 192.168.0.3
R1(config)#
R1(config)#do show hosts
Default Domain is not set
Name/address lookup uses domain service
Name servers are 1.1.1.1

Codes: UN - unknown, EX - expired, OK - OK, ?? - revalidate
       temp - temporary, perm - permanent
       NA - Not Applicable None - Not defined

Host                      Port  Flags      Age Type   Address(es)
PC1                       None  (perm, OK)  0   IP      192.168.0.1
PC2                       None  (perm, OK)  0   IP      192.168.0.2
PC3                       None  (perm, OK)  0   IP      192.168.0.3
R1                        None  (perm, OK)  0   IP      192.168.0.254
R1(config)#do ping PC1

Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 192.168.0.1, timeout is 2 seconds:
.!!!!
Success rate is 80 percent (4/5), round-trip min/avg/max = 0/0/0 ms
```

