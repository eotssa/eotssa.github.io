---
title: Dynamic ARP Inspection Configurations
date: 2024-04-08 13:24:42
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240408132515.png)

1. Configure R1 as a DHCP server.
    Exclude 192.168.1.1 - 192.168.1.9 from the pool
    Default gateway: R1

2. Configure DHCP snooping on SW1 and SW2.

3. Configure DAI on SW1 and SW2.
  -Enable all additional validation checks
  -Trust ports connected to a router or switch


---

## 1. Configure R1 as a DHCP server.
    Exclude 192.168.1.1 - 192.168.1.9 from the pool
    Default gateway: R1
    

```
R1(config)#ip dhcp excluded-address 192.168.1.1 192.168.1.9
R1(config)#
R1(config)#ip dhcp pool POOL1
R1(dhcp-config)#network 192.168.1.0 255.255.255.0
R1(dhcp-config)#
R1(dhcp-config)#def
R1(dhcp-config)#default-router 192.168.1.1
```


## 2. Configure DHCP snooping on SW1 and SW2.

```
SW1(config)#ip dhcp snooping
SW1(config)#ip dhcp snooping vlan 1
SW1(config)#no ip dhcp snooping information option
SW1(config)#int g0/2
SW1(config-if)#ip dhcp snooping trust
```

```
SW2(config)#ip dhcp snooping 
SW2(config)#ip dhcp snooping vlan 1
SW2(config)#no ip dhcp snooping information option
SW2(config)#
SW2(config)#int g0/1
SW2(config-if)#ip dhcp snooping trust
```

## 3. Configure DAI on SW1 and SW2.
  -Enable all additional validation checks
  -Trust ports connected to a router or switch

```
SW1#show ip arp inspection int
Interface        Trust State     Rate(pps)    Burst Interval
---------------  -----------     ---------    --------------
Fa0/1            Untrusted              15                 1
Fa0/2            Untrusted              15                 1
Fa0/3            Untrusted              15                 1
Fa0/4            Untrusted              15                 1
Fa0/5            Untrusted              15                 1
Fa0/6            Untrusted              15                 1
Fa0/7            Untrusted              15                 1
Fa0/8            Untrusted              15                 1
Fa0/9            Untrusted              15                 1
Fa0/10           Untrusted              15                 1
Fa0/11           Untrusted              15                 1
Fa0/12           Untrusted              15                 1
Fa0/13           Untrusted              15                 1
Fa0/14           Untrusted              15                 1
Fa0/15           Untrusted              15                 1
Fa0/16           Untrusted              15                 1
Fa0/17           Untrusted              15                 1
Fa0/18           Untrusted              15                 1
Fa0/19           Untrusted              15                 1
Fa0/20           Untrusted              15                 1
Fa0/21           Untrusted              15                 1
Fa0/22           Untrusted              15                 1
Fa0/23           Untrusted              15                 1
Fa0/24           Untrusted              15                 1
Gig0/1           Trusted                15                 1
Gig0/2           Trusted                15                 1
```


```
SW2(config)#ip arp inspection vlan 1
SW2(config)#
SW2(config)#ip arp inspection validate ?
  dst-mac  Validate destination MAC address
  ip       Validate IP address
  src-mac  Validate source MAC address
SW2(config)#ip arp inspection validate dst-mac ip src-mac
SW2(config)#int g0/1
SW2(config-if)#ip arp inspection trust
```

```
SW2#show run | sec sno
ip dhcp snooping vlan 1
no ip dhcp snooping information option
ip dhcp snooping
 ip dhcp snooping trust


SW2#show ip arp inspection int
Interface        Trust State     Rate(pps)    Burst Interval
---------------  -----------     ---------    --------------
Fa0/1            Untrusted              15                 1
Fa0/2            Untrusted              15                 1
Fa0/3            Untrusted              15                 1
Fa0/4            Untrusted              15                 1
Fa0/5            Untrusted              15                 1
Fa0/6            Untrusted              15                 1
Fa0/7            Untrusted              15                 1
Fa0/8            Untrusted              15                 1
Fa0/9            Untrusted              15                 1
Fa0/10           Untrusted              15                 1
Fa0/11           Untrusted              15                 1
Fa0/12           Untrusted              15                 1
Fa0/13           Untrusted              15                 1
Fa0/14           Untrusted              15                 1
Fa0/15           Untrusted              15                 1
Fa0/16           Untrusted              15                 1
Fa0/17           Untrusted              15                 1
Fa0/18           Untrusted              15                 1
Fa0/19           Untrusted              15                 1
Fa0/20           Untrusted              15                 1
Fa0/21           Untrusted              15                 1
Fa0/22           Untrusted              15                 1
Fa0/23           Untrusted              15                 1
Fa0/24           Untrusted              15                 1
Gig0/1           Trusted                15                 1
Gig0/2           Untrusted              15                 1
```


We configured PC1 - PC3 to have DHCP. 

In PC1:
```

FastEthernet0 Connection:(default port)

   Connection-specific DNS Suffix..: 
   Link-local IPv6 Address.........: FE80::201:64FF:FE32:B922
   IPv6 Address....................: ::
   IPv4 Address....................: 192.168.1.10
   Subnet Mask.....................: 255.255.255.0
   Default Gateway.................: ::
                                     192.168.1.1

Bluetooth Connection:

   Connection-specific DNS Suffix..: 
   Link-local IPv6 Address.........: ::
   IPv6 Address....................: ::
   IPv4 Address....................: 0.0.0.0
   Subnet Mask.....................: 0.0.0.0
   Default Gateway.................: ::
                                     0.0.0.0

C:\>ping 192.168.1.1

Pinging 192.168.1.1 with 32 bytes of data:

Reply from 192.168.1.1: bytes=32 time<1ms TTL=255
Reply from 192.168.1.1: bytes=32 time<1ms TTL=255
Reply from 192.168.1.1: bytes=32 time<1ms TTL=255
Reply from 192.168.1.1: bytes=32 time<1ms TTL=255

Ping statistics for 192.168.1.1:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms

```
