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


```
R2(config)#router ospf 1
R2(config-router)#
R2(config-router)#
R2(config-router)#network 192.168.0.0 0.0.255.255 area 0
R2(config-router)#network 203.0.113.0 0.0.0.3 area 0
R2(config-router)#
R2(config-router)#do sh
10:06:10: %OSPF-5-ADJCHG: Process 1, Nbr 203.0.113.1 on Serial0/0/0 from LOADING to FULL, Loading 
R2(config-router)#
R2(config-router)#do sh ip ospf int

GigabitEthernet0/0 is up, line protocol is up
  Internet address is 192.168.1.254/24, Area 0
  Process ID 1, Router ID 203.0.113.2, Network Type BROADCAST, Cost: 1
  Transmit Delay is 1 sec, State WAITING, Priority 1
  No designated router on this network
  No backup designated router on this network
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5
    Hello due in 00:00:01
  Index 1/1, flood queue length 0
  Next 0x0(0)/0x0(0)
  Last flood scan length is 1, maximum is 1
  Last flood scan time is 0 msec, maximum is 0 msec
  Neighbor Count is 0, Adjacent neighbor count is 0
  Suppress hello for 0 neighbor(s)
GigabitEthernet0/1 is up, line protocol is up
  Internet address is 192.168.2.254/24, Area 0
  Process ID 1, Router ID 203.0.113.2, Network Type BROADCAST, Cost: 1
  Transmit Delay is 1 sec, State WAITING, Priority 1
  No designated router on this network
  No backup designated router on this network
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5
    Hello due in 00:00:01
  Index 2/2, flood queue length 0
  Next 0x0(0)/0x0(0)
  Last flood scan length is 1, maximum is 1
  Last flood scan time is 0 msec, maximum is 0 msec
  Neighbor Count is 0, Adjacent neighbor count is 0
  Suppress hello for 0 neighbor(s)
Serial0/0/0 is up, line protocol is up
  Internet address is 203.0.113.2/30, Area 0
  Process ID 1, Router ID 203.0.113.2, Network Type POINT-TO-POINT, Cost: 64
  Transmit Delay is 1 sec, State POINT-TO-POINT,
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5
    Hello due in 00:00:00
  Index 3/3, flood queue length 0
  Next 0x0(0)/0x0(0)
  Last flood scan length is 1, maximum is 1
  Last flood scan time is 0 msec, maximum is 0 msec
```

We can check if R2 has established a connection with R1, as well as identify routes created by OSPF. 
```
R2(config-router)#do sh ip ospf neigh


Neighbor ID     Pri   State           Dead Time   Address         Interface
203.0.113.1       0   FULL/  -        00:00:35    203.0.113.1     Serial0/0/0
R2(config-router)#
R2(config-router)#
R2(config-router)#do sh ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is not set

     172.16.0.0/24 is subnetted, 2 subnets
O       172.16.1.0/24 [110/65] via 203.0.113.1, 00:00:55, Serial0/0/0
O       172.16.2.0/24 [110/65] via 203.0.113.1, 00:00:55, Serial0/0/0
     192.168.1.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.1.0/24 is directly connected, GigabitEthernet0/0
L       192.168.1.254/32 is directly connected, GigabitEthernet0/0
     192.168.2.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.2.0/24 is directly connected, GigabitEthernet0/1
L       192.168.2.254/32 is directly connected, GigabitEthernet0/1
     203.0.113.0/24 is variably subnetted, 2 subnets, 2 masks
C       203.0.113.0/30 is directly connected, Serial0/0/0
L       203.0.113.2/32 is directly connected, Serial0/0/0
```

We can verify the routes here from R2 to R1 via the S0/0/0 interface. 
```
O       172.16.1.0/24 [110/65] via 203.0.113.1, 00:00:55, Serial0/0/0
O       172.16.2.0/24 [110/65] via 203.0.113.1, 00:00:55, Serial0/0/0
```


R1's route are also dynamically added via OSPF as shown.

```
R1(config-router)#do sh ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is not set

     172.16.0.0/16 is variably subnetted, 4 subnets, 2 masks
C       172.16.1.0/24 is directly connected, GigabitEthernet0/0
L       172.16.1.254/32 is directly connected, GigabitEthernet0/0
C       172.16.2.0/24 is directly connected, GigabitEthernet0/1
L       172.16.2.254/32 is directly connected, GigabitEthernet0/1
O    192.168.1.0/24 [110/65] via 203.0.113.2, 00:03:15, Serial0/0/0
O    192.168.2.0/24 [110/65] via 203.0.113.2, 00:03:15, Serial0/0/0
     203.0.113.0/24 is variably subnetted, 2 subnets, 2 masks
C       203.0.113.0/30 is directly connected, Serial0/0/0
L       203.0.113.1/32 is directly connected, Serial0/0/0

R1(config-router)#
```

We have full connectivity in the network. 


## 2. Configure standard numbered ACLS on R1 and standard named ACLs on R2
    to fulfill the following network policies:
      -Only PC1 and PC3 can access 192.168.1.0/24
      -Hosts in 172.16.2.0/24 can't access 192.168.2.0/24
      -172.16.1.0/24 can't access 172.16.2.0/24
      -172.16.2.0/24 can't access 172.16.1.0/24


To fulfill requirements 1.
      -Only PC1 and PC3 can access 192.168.1.0/24
  
The standard for ACL named mode is as follows:

```
R2(config)#ip access-list standard ?
  <1-99>  Standard IP access-list number
  WORD    Access-list name
R2(config)#ip access-list standard TO_192.168.1.0/24
R2(config-std-nacl)#permit 172.16.1.1
R2(config-std-nacl)#permit 172.16.2.1
R2(config-std-nacl)#deny any
R2(config-std-nacl)#
R2(config-std-nacl)#
R2(config-std-nacl)#int g0/0
R2(config-if)#ip access-group  ?
  <1-199>  IP access list (standard or extended)
  WORD     Access-list name
R2(config-if)#ip access-group  TO_192.168.1.0/24 out
```

We applied the ACL to g0/0 outbound. 

We can verify PC1 can reach SRV1.

```
C:\>ping 192.168.1.100

Pinging 192.168.1.100 with 32 bytes of data:

Request timed out.
Reply from 192.168.1.100: bytes=32 time=9ms TTL=126
Reply from 192.168.1.100: bytes=32 time=14ms TTL=126
Reply from 192.168.1.100: bytes=32 time=1ms TTL=126

Ping statistics for 192.168.1.100:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 1ms, Maximum = 14ms, Average = 8ms

```


PC2 cannot reach SRV1 as per the ACL.

```
Pinging 192.168.1.100 with 32 bytes of data:

Reply from 203.0.113.2: Destination host unreachable.
Reply from 203.0.113.2: Destination host unreachable.
Reply from 203.0.113.2: Destination host unreachable.
Reply from 203.0.113.2: Destination host unreachable.

Ping statistics for 192.168.1.100:
    Packets: Sent = 4, Received = 0, Lost = 4 (100% loss),
```


To fulfill requirement 2: 
      -Hosts in 172.16.2.0/24 can't access 192.168.2.0/24

```
R2(config)#ip a
R2(config)#ip access-list ?
  extended  Extended Access List
  standard  Standard Access List
R2(config)#ip access-list standard ?
  <1-99>  Standard IP access-list number
  WORD    Access-list name
R2(config)#ip access-list standard TO_192.168.2.0/24 ?
  <cr>
R2(config)#ip access-list standard TO_192.168.2.0/24
R2(config-std-nacl)#deny 172.16.2.0 0.0.0.255 ?
  <cr>
R2(config-std-nacl)#deny 172.16.2.0 0.0.0.255
R2(config-std-nacl)#permit any
R2(config-std-nacl)#
R2(config-std-nacl)#int g0/1
R2(config-if)#ip ac?
access-group  
R2(config-if)#ip ac
R2(config-if)#ip access-group TO_192.168.2.0/24 out
```

Note that the `permit any` is required here to allow other traffic through. 

We can see the full ACLs here:

```
R2(config-if)#do sh access-list
Standard IP access list TO_192.168.1.0/24
    10 permit host 172.16.1.1 (4 match(es))
    20 permit host 172.16.2.1
    30 deny any (4 match(es))
Standard IP access list TO_192.168.2.0/24
    10 deny 172.16.2.0 0.0.0.255
    20 permit any
```


To meet requirement 3 and 4: 
      -172.16.1.0/24 can't access 172.16.2.0/24
      -172.16.2.0/24 can't access 172.16.1.0/24

```
R1(config)#access-list 1 deny 172.16.1.0 0.0.0.255
R1(config)#access-list 1 permit any
R1(config)#
R1(config)#access-list 2 deny 172.16.2.0 0.0.0.255
R1(config)#access-list 2 permit any
R1(config)#
R1(config)#do sh ac
Standard IP access list 1
    10 deny 172.16.1.0 0.0.0.255
    20 permit any
Standard IP access list 2
    10 deny 172.16.2.0 0.0.0.255
    20 permit any

R1(config)#int g0/1
R1(config-if)#?
  arp                Set arp type (arpa, probe, snap) or timeout
  bandwidth          Set bandwidth informational parameter
  cdp                CDP interface subcommands
  channel-group      Add this interface to an Etherchannel group
  crypto             Encryption/Decryption commands
  custom-queue-list  Assign a custom queue list to an interface
  delay              Specify interface throughput delay
  description        Interface specific description
  duplex             Configure duplex operation.
  exit               Exit from interface configuration mode
  fair-queue         Enable Fair Queuing on an Interface
  hold-queue         Set hold queue depth
  ip                 Interface Internet Protocol config commands
  ipv6               IPv6 interface subcommands
  lldp               LLDP interface subcommands
  mac-address        Manually set interface MAC address
  mtu                Set the interface Maximum Transmission Unit (MTU)
  no                 Negate a command or set its defaults
  pppoe              pppoe interface subcommands
  pppoe-client       pppoe client
  priority-group     Assign a priority group to an interface
  service-policy     Configure QoS Service Policy
  shutdown           Shutdown the selected interface
  speed              Configure speed operation.
  standby            HSRP interface configuration commands
  tx-ring-limit      Configure PA level transmit ring limit
R1(config-if)#
R1(config-if)#
R1(config-if)#ip ?
  access-group     Specify access control for packets
  address          Set the IP address of an interface
  authentication   authentication subcommands
  flow             NetFlow Related commands
  hello-interval   Configures IP-EIGRP hello interval
  helper-address   Specify a destination address for UDP broadcasts
  mtu              Set IP Maximum Transmission Unit
  nat              NAT interface commands
  ospf             OSPF interface commands
  proxy-arp        Enable proxy ARP
  split-horizon    Perform split horizon
  summary-address  Perform address summarization
R1(config-if)#ip access-group 1 out
R1(config-if)#
R1(config-if)#int g0/0
R1(config-if)#ip access-group 2 out
```