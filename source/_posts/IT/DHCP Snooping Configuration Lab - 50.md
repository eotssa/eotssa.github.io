---
title: DHCP Snooping Configuration
date: 2024-04-06 12:24:05
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240406122440.png)
1. Configure R1 as a DHCP server.
    Exclude 192.168.1.1 - 192.168.1.9 from the pool
    Default gateway: R1

2. Configure DHCP snooping on SW1 and SW2.
    Configure the uplink interfaces as trusted ports.

3. Use IPCONFIG /RENEW on PC1 to get an IP address.
    Does it work?  Why or why not?

4. If it doesn't work, make the necessary configuration change to fix it.

---

## 1. Configure R1 as a DHCP server.
    Exclude 192.168.1.1 - 192.168.1.9 from the pool
    Default gateway: R1

```
R1(config)#ip dhcp excluded-address 192.168.1.1 192.168.1.9
R1(config)#
R1(config)#ip dhcp pool POOL1
R1(dhcp-config)#
R1(dhcp-config)#network 192.168.1.0 ?
  A.B.C.D  Network mask
R1(dhcp-config)#network 192.168.1.0 255.255.255.0
R1(dhcp-config)#
R1(dhcp-config)#?
  default-router  Default routers
  dns-server      Set name server
  domain-name     Domain name
  exit            Exit from DHCP pool configuration mode
  network         Network number and mask
  no              Negate a command or set its defaults
  option          Raw DHCP options
R1(dhcp-config)#default-router 192.168.1.1
```

## 2. Configure DHCP snooping on SW1 and SW2. Configure the uplink interfaces as trusted ports.

SW1 
```
SW1(config)#
SW1(config)#ip dhcp snooping
SW1(config)#do show vlan

VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Fa0/1, Fa0/2, Fa0/3, Fa0/4
                                                Fa0/5, Fa0/6, Fa0/7, Fa0/8
                                                Fa0/9, Fa0/10, Fa0/11, Fa0/12
                                                Fa0/13, Fa0/14, Fa0/15, Fa0/16
                                                Fa0/17, Fa0/18, Fa0/19, Fa0/20
                                                Fa0/21, Fa0/22, Fa0/23, Fa0/24
                                                Gig0/1, Gig0/2
1002 fddi-default                     active    
1003 token-ring-default               active    
1004 fddinet-default                  active    
1005 trnet-default                    active    

VLAN Type  SAID       MTU   Parent RingNo BridgeNo Stp  BrdgMode Trans1 Trans2
---- ----- ---------- ----- ------ ------ -------- ---- -------- ------ ------
1    enet  100001     1500  -      -      -        -    -        0      0
1002 fddi  101002     1500  -      -      -        -    -        0      0   
1003 tr    101003     1500  -      -      -        -    -        0      0   
1004 fdnet 101004     1500  -      -      -        ieee -        0      0   
1005 trnet 101005     1500  -      -      -        ibm  -        0      0   

SW1(config)#
SW1(config)#
SW1(config)#ip dhcp snooping vlan 1
SW1(config)#no ip dhcp snooping information option
SW1(config)#int g0/2
SW1(config-if)#ip dhcp snooping trusted
                                     ^
% Invalid input detected at '^' marker.
	
SW1(config-if)#ip dhcp snooping ?
  limit  DHCP Snooping limit
  trust  DHCP Snooping trust config
SW1(config-if)#ip dhcp snooping trust
```

SW2
```
SW2(config)#ip dhcp snooping
SW2(config)#
SW2(config)#ip dhcp snooping vlan 1
SW2(config)#no ip dhcp snooping information option
SW2(config)#int g0/1
SW2(config-if)#ip dhcp snooping trust
```



## 3. Use IPCONFIG /RENEW on PC1 to get an IP address. Does it work?  Why or why not?

Works. All configurations are proper. 

