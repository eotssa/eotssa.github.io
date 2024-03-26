---
title: Standard ACL - 34 (Std Numbered and Std Named)
date: 2024-03-26 01:02:37
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240326010335.png)


1. Configure OSPF on R1 and R2 to allow full connectivity between the PCs and servers.

2. Configure standard numbered ACLS on R1 and standard named ACLs on R2
    to fulfill the following network policies:
      -Only PC1 and PC3 can access 192.168.1.0/24
      -Hosts in 172.16.2.0/24 can't access 192.168.2.0/24
      -172.16.1.0/24 can't access 172.16.2.0/24
      -172.16.2.0/24 can't access 172.16.1.0/24


## 1. Configure OSPF on R1 and R2 to allow full connectivity between the PCs and servers.

Enabled R1's G0/0, G0/1, and S0/0/0, and confirmed their status. 

```
R1>
R1>en
R1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#router ospf 1
R1(config-router)#network 172.16.0.0 0.0.255.255
% Incomplete command.
R1(config-router)#network 172.16.0.0 0.0.255.255 area 0
R1(config-router)#
R1(config-router)#network 203.0.113.0 0.0.0.3 area 0
R1(config-router)#
R1(config-router)#do sh ip ospf interface

GigabitEthernet0/0 is up, line protocol is up
  Internet address is 172.16.1.254/24, Area 0
  Process ID 1, Router ID 203.0.113.1, Network Type BROADCAST, Cost: 1
  Transmit Delay is 1 sec, State WAITING, Priority 1
  No designated router on this network
  No backup designated router on this network
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5
    Hello due in 00:00:03
  Index 1/1, flood queue length 0
  Next 0x0(0)/0x0(0)
  Last flood scan length is 1, maximum is 1
  Last flood scan time is 0 msec, maximum is 0 msec
  Neighbor Count is 0, Adjacent neighbor count is 0
  Suppress hello for 0 neighbor(s)
GigabitEthernet0/1 is up, line protocol is up
  Internet address is 172.16.2.254/24, Area 0
  Process ID 1, Router ID 203.0.113.1, Network Type BROADCAST, Cost: 1
  Transmit Delay is 1 sec, State WAITING, Priority 1
  No designated router on this network
  No backup designated router on this network
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5
    Hello due in 00:00:03
  Index 2/2, flood queue length 0
  Next 0x0(0)/0x0(0)
  Last flood scan length is 1, maximum is 1
  Last flood scan time is 0 msec, maximum is 0 msec
  Neighbor Count is 0, Adjacent neighbor count is 0
  Suppress hello for 0 neighbor(s)
Serial0/0/0 is up, line protocol is up
  Internet address is 203.0.113.1/30, Area 0
  Process ID 1, Router ID 203.0.113.1, Network Type POINT-TO-POINT, Cost: 64
  Transmit Delay is 1 sec, State POINT-TO-POINT,
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5
    Hello due in 00:00:06
  Index 3/3, flood queue length 0
  Next 0x0(0)/0x0(0)
  Last flood scan length is 1, maximum is 1
  Last flood scan time is 0 msec, maximum is 0 msec
  Suppress hello for 0 neighbor(s)
```

The same is done for R2. OSPF is enabled on all interfaces.

