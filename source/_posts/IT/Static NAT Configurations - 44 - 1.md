---
title: Static NAT Configurations
date: 2024-04-03 13:43:26
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240403134433.png)
1. Attempt to ping from PC1 to 8.8.8.8.  Does the ping work?

2. Configure static NAT on R1.
   > Configure the appropriate inside/outside interfaces
   > Map the IP addresses of PC1, PC2, and PC3 to 100.0.0.x/24

3. Ping 8.8.8.8 from PC1 again.  Does the ping work?

4. Ping google.com from each PC, and then check the NAT translations on R1.

5. Clear the NAT translations on R1.  Which entries remain?


## 1. Attempt to ping from PC1 to 8.8.8.8.  Does the ping work?

No. Private IP addresses are dropped. 


## 2. Configure static NAT on R1.
   > Configure the appropriate inside/outside interfaces
   > Map the IP addresses of PC1, PC2, and PC3 to 100.0.0.x/24

```
R1(config)#int g0/0
R1(config-if)#ip nat ?
  inside   Inside interface for address translation
  outside  Outside interface for address translation
R1(config-if)#ip nat outside
R1(config-if)#int g0/1
R1(config-if)#ip nat inside
R1(config-if)#exit
R1(config)#
R1(config)#ip nat inside source static 172.16.0.1 100.0.0.1
R1(config)#ip nat inside source static 172.16.0.2 100.0.0.2
R1(config)#ip nat inside source static 172.16.0.3 100.0.0.3
R1(config)#
R1(config)#exit
R1#
%SYS-5-CONFIG_I: Configured from console by console

R1#
R1#show ip nat translations
Pro  Inside global     Inside local       Outside local      Outside global
---  100.0.0.1         172.16.0.1         ---                ---
---  100.0.0.2         172.16.0.2         ---                ---
---  100.0.0.3         172.16.0.3         ---                ---

R1#
R1#show ip nat ?
  statistics    Translation statistics
  translations  Translation entries
R1#show ip nat stat
Total translations: 3 (3 static, 0 dynamic, 0 extended)
Outside Interfaces: GigabitEthernet0/0
Inside Interfaces: GigabitEthernet0/1
Hits: 0  Misses: 0
Expired translations: 0
Dynamic mappings:
```


## 3. Ping 8.8.8.8 from PC1 again.  Does the ping work?

Yes.

## 4. Ping google.com from each PC, and then check the NAT translations on R1.

We can see the new translations for all pings, and for all PCs that pinged google.com
```
R1#show ip nat translations
Pro  Inside global     Inside local       Outside local      Outside global
icmp 100.0.0.1:10      172.16.0.1:10      172.217.175.238:10 172.217.175.238:10
icmp 100.0.0.1:11      172.16.0.1:11      172.217.175.238:11 172.217.175.238:11
icmp 100.0.0.1:12      172.16.0.1:12      172.217.175.238:12 172.217.175.238:12
icmp 100.0.0.1:5       172.16.0.1:5       8.8.8.8:5          8.8.8.8:5
icmp 100.0.0.1:6       172.16.0.1:6       8.8.8.8:6          8.8.8.8:6
icmp 100.0.0.1:7       172.16.0.1:7       8.8.8.8:7          8.8.8.8:7
icmp 100.0.0.1:8       172.16.0.1:8       8.8.8.8:8          8.8.8.8:8
icmp 100.0.0.1:9       172.16.0.1:9       172.217.175.238:9  172.217.175.238:9
icmp 100.0.0.2:1       172.16.0.2:1       172.217.175.238:1  172.217.175.238:1
icmp 100.0.0.2:2       172.16.0.2:2       172.217.175.238:2  172.217.175.238:2
icmp 100.0.0.2:3       172.16.0.2:3       172.217.175.238:3  172.217.175.238:3
icmp 100.0.0.2:4       172.16.0.2:4       172.217.175.238:4  172.217.175.238:4
icmp 100.0.0.3:1       172.16.0.3:1       172.217.175.238:1  172.217.175.238:1
icmp 100.0.0.3:2       172.16.0.3:2       172.217.175.238:2  172.217.175.238:2
icmp 100.0.0.3:3       172.16.0.3:3       172.217.175.238:3  172.217.175.238:3
icmp 100.0.0.3:4       172.16.0.3:4       172.217.175.238:4  172.217.175.238:4
---  100.0.0.1         172.16.0.1         ---                ---
---  100.0.0.2         172.16.0.2         ---                ---
---  100.0.0.3         172.16.0.3         ---                ---
udp 100.0.0.1:1025     172.16.0.1:1025    8.8.8.8:53         8.8.8.8:53
udp 100.0.0.2:1025     172.16.0.2:1025    8.8.8.8:53         8.8.8.8:53
udp 100.0.0.3:1025     172.16.0.3:1025    8.8.8.8:53         8.8.8.8:53
```


## 5. Clear the NAT translations on R1.  Which entries remain?

Static entries remain. 
```
R1#clear ip nat trans
% Incomplete command.
R1#clear ip nat ?
  translation  Clear dynamic translation
R1#clear ip nat translation
% Incomplete command.
R1#clear ip nat translation ?
  *  Deletes all dynamic translations
R1#clear ip nat translation *
R1#show ip nat translations
Pro  Inside global     Inside local       Outside local      Outside global
---  100.0.0.1         172.16.0.1         ---                ---
---  100.0.0.2         172.16.0.2         ---                ---
---  100.0.0.3         172.16.0.3         ---                ---

```