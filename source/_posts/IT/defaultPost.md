---
title: defaultPost
date: 2024-03-20 18:57:43
tags:
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