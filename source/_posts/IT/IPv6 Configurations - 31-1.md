---
title: IPv6 Configurations - 31-1
date: 2024-03-20 15:15:47
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240320153002.png)

The IPv4 configuration of each device is complete.
Perform the following IPv6 configurations to create an IPv4/IPv6 'dual-stack' network.


1. Enable IPv6 routing on R1.

2. Configure the appropriate IPv6 addresses on R1.

3. Confirm your configurations.
    What IPv6 addresses are present on each interface?

4. Configure the appropriate IPv6 addresses on each PC.
    Configure the correct default gateway.

5. Attempt to ping between the PCs (IPv4 and IPv6)



## 1. Enable IPv6 routing on R1.

```
R1(config)#ipv6 ?
  access-list      Configure access lists
  cef              Cisco Express Forwarding
  dhcp             Configure Ipv6 DHCP
  general-prefix   Configure a general IPv6 prefix
  host             Configure static hostnames
  local            Specify local options
  nat              NAT-PT Configuration commands
  neighbor         Neighbor
  route            Configure static routes
  router           Enable an IPV6 routing process
  unicast-routing  Enable unicast routing
R1(config)#ipv6 unicast-routing
R1(config)#
```

## 2. Configure the appropriate IPv6 addresses on R1.

```
R1(config)#int g0/0
R1(config-if)#
R1(config-if)#ipv6 address 2001:db8:0:1::1/64
R1(config-if)#
R1(config-if)#
R1(config-if)#int g0/1
R1(config-if)#
R1(config-if)#ipv6 address 2001:db8:0:2::1/64
R1(config-if)#
R1(config-if)#int g0/2
R1(config-if)#
R1(config-if)#ipv6 address 2001:db8:0:3::1/64
```

## 3. Confirm your configurations. What IPv6 addresses are present on each interface?

```
R1(config-if)#do show ipv6 int br
GigabitEthernet0/0         [up/up]
    FE80::201:97FF:FE9A:AC01
    2001:DB8:0:1::1
GigabitEthernet0/1         [up/up]
    FE80::201:97FF:FE9A:AC02
    2001:DB8:0:2::1
GigabitEthernet0/2         [up/up]
    FE80::201:97FF:FE9A:AC03
```

## 4. Configure the appropriate IPv6 addresses on each PC. Configure the correct default gateway.

## 5. Attempt to ping between the PCs (IPv4 and IPv6)