---
title: Dynamic NAT and PAT Configurations
date: 2024-04-03 20:23:03
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240403202717.png)

1. Configure dynamic NAT on R1.
   > Configure the appropriate inside/outside interfaces
   > Translate all traffic from 172.16.0.0/24
   > Create a pool of 100.0.0.1 to 100.0.0.2 from the 100.0.0.0/24 subnet

2. Ping google.com from PC1 and PC2.  Then, ping it from PC3.  
    What happens to PC3's ping?

3. Clear the NAT translations and remove the current NAT configuration.
    Switch the configuration to PAT using R1's public IP address.

4. Ping google.com from each PC.  Do the pings work?
    Examine the NAT translations on R1.


## 1. Configure dynamic NAT on R1.
   > Configure the appropriate inside/outside interfaces

```
R1(config)#int g0/0
R1(config-if)#ip nat ?
  inside   Inside interface for address translation
  outside  Outside interface for address translation
R1(config-if)#ip nat outside
R1(config-if)#
R1(config-if)#int g0/1
R1(config-if)#ip nat inside
```

   > Translate all traffic from 172.16.0.0/24
   
```
R1(config)#access-list 1 permit 172.16.0.0 0.0.0.255
```

   > Create a pool of 100.0.0.1 to 100.0.0.2 from the 100.0.0.0/24 subnet

```
R1(config)#ip nat pool POOL1 100.0.0.1 100.0.0.2 netmask 255.255.255.0
```

Configure the dynamic NAT to apply to the ACL and the pool.

```
R1(config)#ip nat inside source list 1 pool POOL1
```

## 2. Ping google.com from PC1 and PC2.  Then, ping it from PC3.  
    What happens to PC3's ping?
PC1 and PC2 can ping Google.com successfully. 
Subsequently, PC3 cannot ping Google.com. 

This is because the dynamic NAT pool configures a 1 to 1 connection. Since only 2 public IP addresses are configured, the NAT is exhausted, and pings from PC3 are dropped. 


## 3. Clear the NAT translations and remove the current NAT configuration.
    Switch the configuration to PAT using R1's public IP address.

```
R1#show ip nat translations 
Pro  Inside global     Inside local       Outside local      Outside global
icmp 100.0.0.1:10      172.16.0.1:10      172.217.175.238:10 172.217.175.238:10
icmp 100.0.0.1:11      172.16.0.1:11      172.217.175.238:11 172.217.175.238:11
icmp 100.0.0.1:12      172.16.0.1:12      172.217.175.238:12 172.217.175.238:12
icmp 100.0.0.1:9       172.16.0.1:9       172.217.175.238:9  172.217.175.238:9
icmp 100.0.0.2:5       172.16.0.2:5       172.217.175.238:5  172.217.175.238:5
icmp 100.0.0.2:6       172.16.0.2:6       172.217.175.238:6  172.217.175.238:6
icmp 100.0.0.2:7       172.16.0.2:7       172.217.175.238:7  172.217.175.238:7
icmp 100.0.0.2:8       172.16.0.2:8       172.217.175.238:8  172.217.175.238:8
udp 100.0.0.1:1025     172.16.0.1:1025    8.8.8.8:53         8.8.8.8:53
udp 100.0.0.1:1026     172.16.0.1:1026    8.8.8.8:53         8.8.8.8:53
udp 100.0.0.2:1025     172.16.0.2:1025    8.8.8.8:53         8.8.8.8:53
udp 100.0.0.2:1026     172.16.0.2:1026    8.8.8.8:53         8.8.8.8:53
```

The NAT table is cleared. Dynamic routes will also be cleared.

```
R1#clear ip nat translation ?
  *  Deletes all dynamic translations
R1#clear ip nat translation *
R1#
R1#show ip nat trans
R1#show ip nat translations 
R1#
```

Switch to PAT as follows

```
R1(config)#do sh run | include nat
 ip nat outside
 ip nat inside
ip nat pool POOL1 100.0.0.1 100.0.0.2 netmask 255.255.255.0
ip nat inside source list 1 pool POOL1
R1(config)#ip nat inside source list 1 int g0/0 overload
R1(config)#do sh run | include nat
 ip nat outside
 ip nat inside
ip nat pool POOL1 100.0.0.1 100.0.0.2 netmask 255.255.255.0
ip nat inside source list 1 interface GigabitEthernet0/0 overload
R1(config)#
```


## 4. Ping google.com from each PC.  Do the pings work?
    Examine the NAT translations on R1.

Pings on all 3 PCs now work. The NAT table should have only 1 NAT address, and multiple ports.

```
R1#show ip nat translations 
Pro  Inside global     Inside local       Outside local      Outside global
icmp 203.0.113.1:10    172.16.0.2:10      172.217.175.238:10 172.217.175.238:10
icmp 203.0.113.1:11    172.16.0.2:11      172.217.175.238:11 172.217.175.238:11
icmp 203.0.113.1:12    172.16.0.2:12      172.217.175.238:12 172.217.175.238:12
icmp 203.0.113.1:13    172.16.0.1:13      172.217.175.238:13 172.217.175.238:13
icmp 203.0.113.1:14    172.16.0.1:14      172.217.175.238:14 172.217.175.238:14
icmp 203.0.113.1:15    172.16.0.1:15      172.217.175.238:15 172.217.175.238:15
icmp 203.0.113.1:16    172.16.0.1:16      172.217.175.238:16 172.217.175.238:16
icmp 203.0.113.1:1     172.16.0.3:1       172.217.175.238:1  172.217.175.238:1
icmp 203.0.113.1:2     172.16.0.3:2       172.217.175.238:2  172.217.175.238:2
icmp 203.0.113.1:3     172.16.0.3:3       172.217.175.238:3  172.217.175.238:3
icmp 203.0.113.1:4     172.16.0.3:4       172.217.175.238:4  172.217.175.238:4
icmp 203.0.113.1:9     172.16.0.2:9       172.217.175.238:9  172.217.175.238:9
udp 203.0.113.1:1024   172.16.0.2:1027    8.8.8.8:53         8.8.8.8:53
udp 203.0.113.1:1026   172.16.0.3:1026    8.8.8.8:53         8.8.8.8:53
udp 203.0.113.1:1027   172.16.0.1:1027    8.8.8.8:53         8.8.8.8:53
```