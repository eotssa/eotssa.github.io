---
title: defaultPost
date: 2024-03-20 18:57:43
tags: 
categories:
  - IT
---
## Configuring IPv6 Addresses (EUI-64)
1. Divide MAC address in half
2. Insert FFFE in the middle
3. Invert the 7th bit. 

1234567890AB
1. 123456 7890AB
2. 123456FF FE7890AB
3. (00001)(0010)3456FF FE7890AB => (00001)(0000)3456FF FE7890AB => 103456FF FE7890AB

```
R1(config)#int g0/0
R1(config-if)#ipv6 address 2001:db8::/64 eui-64

R1(config-if)#no shutdown
R1(config-if)#

R1(config-if)#int g0/1
R1(config-if)#ipv6 address 2001:db8:0:1::/64 eui-64

R1(config-if)#no shutdown
R1(config-if)#

R1(config-if)#int g0/2
R1(config-if)#ipv6 address 2001:db8:0:2::/64 eui-64

R1(config-if)#no shutdown
```

## Solicited-Node Multicast Address Calculations

An IPv6 solicited-node multicast address is calculated from a unicast address. 

The prefix is: `ff02:0000:0000:0000:0000:0001:ff` followed by the + (last 6 hex digits from unicast address)

For example:

`2001:0db8:0000:0001:0f2a:4fff:fea3:00b1`  

Take the prefix: `2001:0db8:0000:0001:ff`, which is also written as `2001:0db8::1:ff`. 

Now add the last 6 hex digits `ae:00b1`, also written as `ae:b1`

Result: `2001:0db8::1:ffa3:b1`

