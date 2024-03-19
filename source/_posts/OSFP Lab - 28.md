---
title: OSFP Lab - 28
date: 2024-03-19 18:10:01
tags: 
categories:
  - IT
---
![](../images/Pasted%20image%2020240319181043.png)


```
R1>
R1>en
R1#
R1#show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     10.0.1.254      YES manual up                    up 
GigabitEthernet0/1     unassigned      YES unset  administratively down down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Serial0/0/0            unassigned      YES unset  administratively down down 
Serial0/0/1            unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R1#
```
R1 G0/0 is configured.
R1 S0/0/0 is not configured. 

```
R1#
R1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#
R1(config)#
R1(config)#int s0/0/0
R1(config-if)#ip address 192.168.12.1
% Incomplete command.
R1(config-if)#ip address 192.168.12.1 255.255.255.252
R1(config-if)#
```
S0/0/0 is now configured.

Next, configure the serial connection between R1 and R2 (clock rate of 128000).
Need to confirm which router is the DCE. 

```
R1(config-if)#do show controllers s0/0/0
Interface Serial0/0/0
Hardware is PowerQUICC MPC860
DCE V.35, clock rate 2000000
idb at 0x81081AC4, driver data structure at 0x81084AC0
SCC Registers:
General [GSMR]=0x2:0x00000000, Protocol-specific [PSMR]=0x8
Events [SCCE]=0x0000, Mask [SCCM]=0x0000, Status [SCCS]=0x00
Transmit on Demand [TODR]=0x0, Data Sync [DSR]=0x7E7E
Interrupt Registers:
Config [CICR]=0x00367F80, Pending [CIPR]=0x0000C000
Mask   [CIMR]=0x00200000, In-srv  [CISR]=0x00000000
Command register [CR]=0x580
Port A [PADIR]=0x1030, [PAPAR]=0xFFFF
       [PAODR]=0x0010, [PADAT]=0xCBFF
Port B [PBDIR]=0x09C0F, [PBPAR]=0x0800E
       [PBODR]=0x00000, [PBDAT]=0x3FFFD
Port C [PCDIR]=0x00C, [PCPAR]=0x200
       [PCSO]=0xC20,  [PCDAT]=0xDF2, [PCINT]=0x00F
Receive Ring
        rmd(68012830): status 9000 length 60C address 3B6DAC4
        rmd(68012838): status B000 length 60C address 3B6D444
Transmit Ring
        tmd(680128B0): status 0 length 0 address 0
        tmd(680128B8): status 0 length 0 address 0
        tmd(680128C0): status 0 length 0 address 0
        tmd(680128C8): status 0 length 0 address 0
        tmd(680128D0): status 0 length 0 address 0
 --More-- 
```
Indeed, R1's S0/0/0 is `DCE V.35, clock rate 2000000`.

```
R1(config-if)#
R1(config-if)#clock rate 128000
R1(config-if)#
```
Clock rate is configured as specified. 

```
R1#
R1#show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     10.0.1.254      YES manual up                    up 
GigabitEthernet0/1     unassigned      YES unset  administratively down down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Serial0/0/0            192.168.12.1    YES manual administratively down down 
Serial0/0/1            unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
```
S0/0/0 still shows down. That's because I forgot to turn off shutdown. 

```
R1#
R1#en
R1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#int s0/0/0
R1(config-if)#
R1(config-if)#no shutdown

%LINK-5-CHANGED: Interface Serial0/0/0, changed state to down
R1(config-if)#
R1(config-if)#
R1(config-if)#end
R1#
%SYS-5-CONFIG_I: Configured from console by console

R1#show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     10.0.1.254      YES manual up                    up 
GigabitEthernet0/1     unassigned      YES unset  administratively down down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Serial0/0/0            192.168.12.1    YES manual down                  down 
Serial0/0/1            unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R1#
```
Looks good. Still shows `down` because R2 is not configured yet. 


Now we configure R2's S0/0/0 interface the same way.

```
R2>
R2>en
R2#show ip interface brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.245.1   YES manual up                    up 
GigabitEthernet0/1     unassigned      YES unset  administratively down down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Serial0/0/0            unassigned      YES unset  administratively down down 
Serial0/0/1            unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R2#
R2#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R2(config)#
R2(config)#int s0/0/0
R2(config-if)#
R2(config-if)#ip address 192.168.12.2 255.255.255.252
R2(config-if)#
R2(config-if)#
R2(config-if)#
R2(config-if)#do show controllers s0/0/0
Interface Serial0/0/0
Hardware is PowerQUICC MPC860
DTE V.35 TX and RX clocks detected
idb at 0x81081AC4, driver data structure at 0x81084AC0
SCC Registers:
General [GSMR]=0x2:0x00000000, Protocol-specific [PSMR]=0x8
Events [SCCE]=0x0000, Mask [SCCM]=0x0000, Status [SCCS]=0x00
Transmit on Demand [TODR]=0x0, Data Sync [DSR]=0x7E7E
Interrupt Registers:
Config [CICR]=0x00367F80, Pending [CIPR]=0x0000C000
Mask   [CIMR]=0x00200000, In-srv  [CISR]=0x00000000
Command register [CR]=0x580
Port A [PADIR]=0x1030, [PAPAR]=0xFFFF
       [PAODR]=0x0010, [PADAT]=0xCBFF
Port B [PBDIR]=0x09C0F, [PBPAR]=0x0800E
       [PBODR]=0x00000, [PBDAT]=0x3FFFD
Port C [PCDIR]=0x00C, [PCPAR]=0x200
       [PCSO]=0xC20,  [PCDAT]=0xDF2, [PCINT]=0x00F
Receive Ring
        rmd(68012830): status 9000 length 60C address 3B6DAC4
        rmd(68012838): status B000 length 60C address 3B6D444
Transmit Ring
        tmd(680128B0): status 0 length 0 address 0

R2(config-if)#
R2(config-if)#
R2(config-if)#no shutdown

R2(config-if)#
%LINK-5-CHANGED: Interface Serial0/0/0, changed state to up

R2(config-if)#
R2(config-if)#
R2(config-if)#exi
%LINEPROTO-5-UPDOWN: Line protocol on Interface Serial0/0/0, changed state to 
R2(config-if)#
R2(config-if)#exit
R2(config)#
R2(config)#do show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.245.1   YES manual up                    up 
GigabitEthernet0/1     unassigned      YES unset  administratively down down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Serial0/0/0            192.168.12.2    YES manual up                    up 
Serial0/0/1            unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R2(config)#
```
Great. IP addresses are configured. We confirmed R2's S0/0/0 is DTE `DTE V.35 TX and RX clocks detected`, which we already knew since R1 was confirmed DCE.

Now let's configured OSPF on R1 and R2. 

```
R2(config)#do show ip protocol

Routing Protocol is "ospf 1"
  Outgoing update filter list for all interfaces is not set 
  Incoming update filter list for all interfaces is not set 
  Router ID 192.168.245.1
  Number of areas in this router is 1. 1 normal 0 stub 0 nssa
  Maximum path: 4
  Routing for Networks:
    192.168.245.1 0.0.0.0 area 0
  Routing Information Sources:  
    Gateway         Distance      Last Update 
    192.168.34.1         110      00:09:52
    192.168.245.1        110      00:09:52
    192.168.245.2        110      00:09:52
  Distance: (default is 110)
```

OSPF is already running on the G0/0 interface as shown here `    192.168.245.1 0.0.0.0 area 0`.

There are two methods that I can recall for enabling ospf. 

We can use 
 
```
R2(config)#router ospf 1
R2(config-router)#
R2(config-router)#
R2(config-router)#network 192.168.12.0 0.0.0.3 area 0
```

Or we can simply do (given that we're on the correct interface).

```
R2(config-if)#ip ospf 1 area 0
```

We're going to use the first method because it's consistent with what has already occurred on R2's G0/0 interface. 

R2's OSPF protocols should be enabled now.

Let's do the same for R1.

```
R1>
R1>en
R1#show ip protocols
R1#
R1#
```
No protocol has been configured... 

We can configure G0/0 and G0/1 like so

```
R1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#router os?
ospf  
R1(config)#router ospf 1
R1(config-router)#
R1(config-router)#network 192.168.12.0 0.0.0.3 area 0
R1(config-router)#network 
10:21:19: %OSPF-5-ADJCHG: Process 1, Nbr 192.168.245.1 on Serial0/0/0 from LOADING to FULL, Loadi
R1(config-router)#
R1(config-router)#network 10.0.1.0 0.0.0.3 area 0
R1(config-router)#
```

However, I think a better method would be to enable OSPF directly on interfaces instead of specifying network and wildmasks. 

While not done in this lab, alternatively, we could've gone this route as follows:

```
R1(config)#int g0/0
R1(config-if)#ip ospf 1 area 0
R1(config-if)#
R1(config-if)#
R1(config-if)#int s0/0/0
R1(config-if)#ip ospf 1 area 0
```

In any case, let's confirm both interfaces.

In s0/0/0,

```
R1(config)#do show ip ospf int s0/0/0

Serial0/0/0 is up, line protocol is up
  Internet address is 192.168.12.1/30, Area 0
  Process ID 1, Router ID 192.168.12.1, Network Type POINT-TO-POINT, Cost: 64
  Transmit Delay is 1 sec, State POINT-TO-POINT,
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5
    Hello due in 00:00:09
  Index 1/1, flood queue length 0
  Next 0x0(0)/0x0(0)
  Last flood scan length is 1, maximum is 1
  Last flood scan time is 0 msec, maximum is 0 msec
  Neighbor Count is 1 , Adjacent neighbor count is 1
    Adjacent with neighbor 192.168.245.1
  Suppress hello for 0 neighbor(s)
```
- R1 is showing a `  Process ID 1, Router ID 192.168.12.1, Network Type POINT-TO-POINT, Cost: 64`

```
R1(config)#do show ip ospf int g0/0
%OSPF: OSPF not enabled on GigabitEthernet0/0
R1(config)#
```
What's wrong?

![](../images/Pasted%20image%2020240319183739.png)

If we look at the diagram again, it looks like I misconfigured G0/0 wildcard mask to be `R1(config-router)#network 10.0.1.0 0.0.0.3 area 0`, when it should be `R1(config-router)#network 10.0.1.0 0.0.0.255 area 0`.

I fixed it below. 
```
R1(config)#router ospf 1
R1(config-router)#
R1(config-router)#network 10.0.1.0 0.0.0.255 area 0
R1(config-router)#
R1(config-router)#exit
R1(config)#
R1(config)#do show ip ospf int g0/0
```

```
GigabitEthernet0/0 is up, line protocol is up
  Internet address is 10.0.1.254/24, Area 0
  Process ID 1, Router ID 192.168.12.1, Network Type BROADCAST, Cost: 1
  Transmit Delay is 1 sec, State DR, Priority 1
  Designated Router (ID) 192.168.12.1, Interface address 10.0.1.254
  No backup designated router on this network
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5
    Hello due in 00:00:05
  Index 2/2, flood queue length 0
  Next 0x0(0)/0x0(0)
  Last flood scan length is 1, maximum is 1
  Last flood scan time is 0 msec, maximum is 0 msec
  Neighbor Count is 0, Adjacent neighbor count is 0
  Suppress hello for 0 neighbor(s)
R1(config)#
```
Looks good now. 

Let's see if OSPF is working.

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

     10.0.0.0/8 is variably subnetted, 2 subnets, 2 masks
C       10.0.1.0/24 is directly connected, GigabitEthernet0/0
L       10.0.1.254/32 is directly connected, GigabitEthernet0/0
     192.168.12.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.12.0/30 is directly connected, Serial0/0/0
L       192.168.12.1/32 is directly connected, Serial0/0/0
     192.168.34.0/30 is subnetted, 1 subnets
O       192.168.34.0/30 [110/66] via 192.168.12.2, 00:09:46, Serial0/0/0
     192.168.245.0/29 is subnetted, 1 subnets
O       192.168.245.0/29 [110/65] via 192.168.12.2, 00:09:46, Serial0/0/0
```

I can see two OSPF routes, but it looks like we're missing some specifically to 10.0.2.0/24 and 203.0.113.0/30.

Step 2 says "Only R3 has a route to 10.0.2.0/24.  Why?  Fix the problem."

I'm pretty confident we configured R1 and R2 correctly. So the issue should lie anywhere on the path before that. 

Let's check R4 first.

Could there be an issue between R3 and R4's OSPF adjacency? 

```
R4>
R4>en
R4#show ip ospf neighbor


Neighbor ID     Pri   State           Dead Time   Address         Interface
192.168.245.1     1   FULL/BDR        00:00:39    192.168.245.1   GigabitEthernet0/0
192.168.34.1      1   FULL/BDR        00:00:39    192.168.34.1    GigabitEthernet0/1
```
Initially, it looks good. State is FULL/BDR to R3. 

Let's check the OSPF interface settings on R4 G0/1.

```
R4#show ip ospf int g0/1

GigabitEthernet0/1 is up, line protocol is up
  Internet address is 192.168.34.2/30, Area 0
  Process ID 1, Router ID 192.168.245.2, Network Type BROADCAST, Cost: 1
  Transmit Delay is 1 sec, State DR, Priority 1
  Designated Router (ID) 192.168.245.2, Interface address 192.168.34.2
  Backup Designated Router (ID) 192.168.34.1, Interface address 192.168.34.1
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5
    Hello due in 00:00:03
  Index 2/2, flood queue length 0
  Next 0x0(0)/0x0(0)
  Last flood scan length is 1, maximum is 1
  Last flood scan time is 0 msec, maximum is 0 msec
  Neighbor Count is 1, Adjacent neighbor count is 1
    Adjacent with neighbor 192.168.34.1  (Backup Designated Router)
  Suppress hello for 0 neighbor(s)
```

Now let's check R3's interface and see if there are any common OSPF incompatibilities. 

```
R3>
R3>en
R3#show ip ospf int g0/1

GigabitEthernet0/1 is up, line protocol is up
  Internet address is 192.168.34.1/30, Area 0
  Process ID 1, Router ID 192.168.34.1, Network Type POINT-TO-POINT, Cost: 1
  Transmit Delay is 1 sec, State POINT-TO-POINT,
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5
    Hello due in 00:00:02
  Index 1/1, flood queue length 0
  Next 0x0(0)/0x0(0)
  Last flood scan length is 1, maximum is 1
  Last flood scan time is 0 msec, maximum is 0 msec
  Neighbor Count is 1 , Adjacent neighbor count is 1
    Adjacent with neighbor 192.168.245.2
  Suppress hello for 0 neighbor(s)
```
Right off the bat, I can see a NETWORK misconfiguration. One is POINT-TO-POINT, and another is BROADCAST. 

We will disable R3's point-to-point, so that it'll default to broadcast. 

```
R3>
R3>en
R3#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R3(config)#
R3(config)#int g0/1
R3(config-if)#no ip ospf ?
  <1-65535>           Process ID
  authentication      Enable authentication
  authentication-key  Authentication password (key)
  cost                Interface cost
  dead-interval       Interval after which a neighbor is declared dead
  hello-interval      Time between HELLO packets
  message-digest-key  Message digest authentication password (key)
  network             Network type
  priority            Router priority
R3(config-if)#no ip ospf network ?
  <cr>
R3(config-if)#no ip ospf network point-to-point
R3(config-if)#
11:05:35: %OSPF-5-ADJCHG: Process 1, Nbr 192.168.245.2 on GigabitEthernet0/1 from FULL to DOWN, Neighbor Down: Interface down or detached

11:05:35: %OSPF-5-ADJCHG: Process 1, Nbr 192.168.245.2 on GigabitEthernet0/1 from LOADING to FULL, Loading Done

R3(config-if)#
```

Check the configuration again. 

```
R3(config-if)#do show ip ospf int g0/1

GigabitEthernet0/1 is up, line protocol is up
  Internet address is 192.168.34.1/30, Area 0
  Process ID 1, Router ID 192.168.34.1, Network Type BROADCAST, Cost: 1
  Transmit Delay is 1 sec, State BDR, Priority 1
  Designated Router (ID) 192.168.245.2, Interface address 192.168.34.2
  Backup Designated Router (ID) 192.168.34.1, Interface address 192.168.34.1
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5
    Hello due in 00:00:08
  Index 1/1, flood queue length 0
  Next 0x0(0)/0x0(0)
  Last flood scan length is 1, maximum is 1
  Last flood scan time is 0 msec, maximum is 0 msec
  Neighbor Count is 1, Adjacent neighbor count is 1
    Adjacent with neighbor 192.168.245.2  (Designated Router)
  Suppress hello for 0 neighbor(s)
```

It is now `  Process ID 1, Router ID 192.168.34.1, Network Type BROADCAST, Cost: 1`

In R4, let's see if OSPF is configured properly to route to 10.0.2.0. 

```
R4#show ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is not set

     10.0.0.0/24 is subnetted, 2 subnets
O       10.0.1.0/24 [110/66] via 192.168.245.1, 00:37:36, GigabitEthernet0/0
O       10.0.2.0/24 [110/2] via 192.168.34.1, 00:00:51, GigabitEthernet0/1
     192.168.12.0/30 is subnetted, 1 subnets
O       192.168.12.0/30 [110/65] via 192.168.245.1, 00:49:57, GigabitEthernet0/0
     192.168.34.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.34.0/30 is directly connected, GigabitEthernet0/1
L       192.168.34.2/32 is directly connected, GigabitEthernet0/1
     192.168.245.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.245.0/29 is directly connected, GigabitEthernet0/0
L       192.168.245.2/32 is directly connected, GigabitEthernet0/0
```

Yup. `O       10.0.2.0/24 [110/2] via 192.168.34.1, 00:00:51, GigabitEthernet0/1`

Pinging PC1 to PC2 should work now.

```
C:\>ping 10.0.2.1

Pinging 10.0.2.1 with 32 bytes of data:

Request timed out.
Reply from 10.0.2.1: bytes=32 time=2ms TTL=124
Reply from 10.0.2.1: bytes=32 time=2ms TTL=124
Reply from 10.0.2.1: bytes=32 time=2ms TTL=124

Ping statistics for 10.0.2.1:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 2ms, Maximum = 2ms, Average = 2ms

C:\>
```


## Step 3.

3. R2 and R4 won't become OSPF neighbors with R5.  Why?  Fix the problem.

Let's check R4 g0/0 configurations.

```
R4#show ip ospf neighbor


Neighbor ID     Pri   State           Dead Time   Address         Interface
192.168.245.1     1   FULL/BDR        00:00:33    192.168.245.1   GigabitEthernet0/0
192.168.34.1      1   FULL/BDR        00:00:38    192.168.34.1    GigabitEthernet0/1
R4#
```
R5 isn't present. 


This is R4's OSPF interface config.

```
R4#show ip ospf int g0/0

GigabitEthernet0/0 is up, line protocol is up
  Internet address is 192.168.245.2/29, Area 0
  Process ID 1, Router ID 192.168.245.2, Network Type BROADCAST, Cost: 1
  Transmit Delay is 1 sec, State DR, Priority 1
  Designated Router (ID) 192.168.245.2, Interface address 192.168.245.2
  Backup Designated Router (ID) 192.168.245.1, Interface address 192.168.245.1
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5
    Hello due in 00:00:07
  Index 1/1, flood queue length 0
  Next 0x0(0)/0x0(0)
  Last flood scan length is 1, maximum is 1
  Last flood scan time is 0 msec, maximum is 0 msec
  Neighbor Count is 1, Adjacent neighbor count is 1
    Adjacent with neighbor 192.168.245.1  (Backup Designated Router)
  Suppress hello for 0 neighbor(s)
```

Now let's check R2.

```
R2#show ip ospf nei


Neighbor ID     Pri   State           Dead Time   Address         Interface
192.168.12.1      0   FULL/  -        00:00:32    192.168.12.1    Serial0/0/0
192.168.245.2     1   FULL/DR         00:00:36    192.168.245.2   GigabitEthernet0/0
R2#
R2#
R2#show ip ospf int g0/0

GigabitEthernet0/0 is up, line protocol is up
  Internet address is 192.168.245.1/29, Area 0
  Process ID 1, Router ID 192.168.245.1, Network Type BROADCAST, Cost: 1
  Transmit Delay is 1 sec, State BDR, Priority 1
  Designated Router (ID) 192.168.245.2, Interface address 192.168.245.2
  Backup Designated Router (ID) 192.168.245.1, Interface address 192.168.245.1
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5
    Hello due in 00:00:09
  Index 1/1, flood queue length 0
  Next 0x0(0)/0x0(0)
  Last flood scan length is 1, maximum is 1
  Last flood scan time is 0 msec, maximum is 0 msec
  Neighbor Count is 1, Adjacent neighbor count is 1
    Adjacent with neighbor 192.168.245.2  (Designated Router)
  Suppress hello for 0 neighbor(s)
R2#
```
R2 is also not showing R5 as a neighbor. 


From here, we can do some preliminary checklists. 
- The IP address in R2 and R4's are in the same subnet mask. 
- They both have default hello and dead timers. 
- They both have BROADCAST networks. 
- Both are in area 0. 
- They have differing router ID's. 

Now let's look at R5. 

```
R5#show ip ospf neighbor

R5#
R5#show ip ospf int g0/0

GigabitEthernet0/0 is up, line protocol is up
  Internet address is 192.168.245.3/29, Area 0
  Process ID 1, Router ID 203.0.113.1, Network Type BROADCAST, Cost: 1
  Transmit Delay is 1 sec, State DR, Priority 1
  Designated Router (ID) 203.0.113.1, Interface address 192.168.245.3
  No backup designated router on this network
  Timer intervals configured, Hello 5, Dead 20, Wait 20, Retransmit 5
    Hello due in 00:00:02
  Index 1/1, flood queue length 0
  Next 0x0(0)/0x0(0)
  Last flood scan length is 1, maximum is 1
  Last flood scan time is 0 msec, maximum is 0 msec
  Neighbor Count is 0, Adjacent neighbor count is 0
  Suppress hello for 0 neighbor(s)
R5#
```
- As expected, no neighbors.
- The internet address is within the correct subnet.
- It has matching area 0. 
- Network type matches R2 and R4. 
- The issue is here: `  Timer intervals configured, Hello 5, Dead 20, Wait 20, Retransmit 5`.
	- The hello and dead timers differ from R2 and R4. 

```
R5#show ip ospf neighbor

R5#
R5#show ip ospf int g0/0

GigabitEthernet0/0 is up, line protocol is up
  Internet address is 192.168.245.3/29, Area 0
  Process ID 1, Router ID 203.0.113.1, Network Type BROADCAST, Cost: 1
  Transmit Delay is 1 sec, State DR, Priority 1
  Designated Router (ID) 203.0.113.1, Interface address 192.168.245.3
  No backup designated router on this network
  Timer intervals configured, Hello 5, Dead 20, Wait 20, Retransmit 5
    Hello due in 00:00:02
  Index 1/1, flood queue length 0
  Next 0x0(0)/0x0(0)
  Last flood scan length is 1, maximum is 1
  Last flood scan time is 0 msec, maximum is 0 msec
  Neighbor Count is 0, Adjacent neighbor count is 0
  Suppress hello for 0 neighbor(s)
R5#
R5#
R5#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R5(config)#
R5(config)#int g0/0
R5(config-if)#
R5(config-if)#ip os?
ospf  
R5(config-if)#ip ospf ?
  <1-65535>           Process ID
  authentication      Enable authentication
  authentication-key  Authentication password (key)
  cost                Interface cost
  dead-interval       Interval after which a neighbor is declared dead
  hello-interval      Time between HELLO packets
  message-digest-key  Message digest authentication password (key)
  network             Network type
  priority            Router priority
R5(config-if)#no ip ospf dead-interval
R5(config-if)#no ip ospf hello-interval
R5(config-if)#
R5(config-if)#
R5(config-if)#
11:14:56: %OSPF-5-ADJCHG: Process 1, Nbr 192.168.245.1 on GigabitEthernet0/0 from LOADING to FULL, Loading Done

11:14:56: %OSPF-5-ADJCHG: Process 1, Nbr 192.168.245.2 on GigabitEthernet0/0 from LOADING to FULL, Loading Done

R5(config-if)#
R5(config-if)#exit
R5(config)#do show ip ospf int g0/0

GigabitEthernet0/0 is up, line protocol is up
  Internet address is 192.168.245.3/29, Area 0
  Process ID 1, Router ID 203.0.113.1, Network Type BROADCAST, Cost: 1
  Transmit Delay is 1 sec, State DR, Priority 1
  Designated Router (ID) 203.0.113.1, Interface address 192.168.245.3
  Backup Designated Router (ID) 192.168.245.1, Interface address 192.168.245.1
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5
    Hello due in 00:00:05
  Index 1/1, flood queue length 0
  Next 0x0(0)/0x0(0)
  Last flood scan length is 1, maximum is 1
  Last flood scan time is 0 msec, maximum is 0 msec
  Neighbor Count is 2, Adjacent neighbor count is 2
    Adjacent with neighbor 192.168.245.1  (Backup Designated Router)
    Adjacent with neighbor 192.168.245.2
  Suppress hello for 0 neighbor(s)
```
We reset the hello and dead timers and confirmed. 
`  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5`


```
R5(config)#do show ip ospf ne


Neighbor ID     Pri   State           Dead Time   Address         Interface
192.168.245.1     1   FULL/BDR        00:00:32    192.168.245.1   GigabitEthernet0/0
192.168.245.2     1   FULL/DROTHER    00:00:32    192.168.245.2   GigabitEthernet0/0
R5(config)#
```
We can see that R5 now has neighbors. 


## Step 4
4. PC1 and PC2 can't ping the external server 8.8.8.8.  Why?  Fix the problem.

Confirm the problem.

```
C:\>ping 8.8.8.8

Pinging 8.8.8.8 with 32 bytes of data:

Reply from 10.0.1.254: Destination host unreachable.
Reply from 10.0.1.254: Destination host unreachable.
Reply from 10.0.1.254: Destination host unreachable.
Reply from 10.0.1.254: Destination host unreachable.

Ping statistics for 8.8.8.8:
    Packets: Sent = 4, Received = 0, Lost = 4 (100% loss),

C:\>
```
Yep.

Let's check R5 is advertising it's OSPF Type 5 LSA. 

```
R5(config)#
R5(config)#do show running
Building configuration...

Current configuration : 899 bytes
!
version 15.1
no service timestamps log datetime msec
no service timestamps debug datetime msec
no service password-encryption
!
hostname R5
!
!
!
!
!
!
!
!
no ip cef
no ipv6 cef
!
!
!
!
license udi pid CISCO2911/K9 sn FTX1524WH54-
!
!
!
!
!
!
!
!
!
!
!
spanning-tree mode pvst
!
!
!
!
!
!
interface GigabitEthernet0/0
 ip address 192.168.245.3 255.255.255.248
 duplex auto
 speed auto
!
interface GigabitEthernet0/1
 no ip address
 duplex auto
 speed auto
 shutdown
!
interface GigabitEthernet0/2
 no ip address
 duplex auto
 speed auto
 shutdown
!
interface GigabitEthernet0/0/0
 ip address 203.0.113.1 255.255.255.252
!
interface Vlan1
 no ip address
 shutdown
!
router ospf 1
 log-adjacency-changes
 network 192.168.245.3 0.0.0.0 area 0
 default-information originate
!
ip classless
!
ip flow-export version 9
 --More-- 
```

We can see that R5 has ` default-information originate` enabled. So no issues here.

Let's check for the default route.

```
R5(config)#do sh ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is not set

     10.0.0.0/24 is subnetted, 2 subnets
O       10.0.1.0/24 [110/66] via 192.168.245.1, 00:05:23, GigabitEthernet0/0
O       10.0.2.0/24 [110/3] via 192.168.245.2, 00:05:13, GigabitEthernet0/0
     192.168.12.0/30 is subnetted, 1 subnets
O       192.168.12.0/30 [110/65] via 192.168.245.1, 00:05:23, GigabitEthernet0/0
     192.168.34.0/30 is subnetted, 1 subnets
O       192.168.34.0/30 [110/2] via 192.168.245.2, 00:05:13, GigabitEthernet0/0
     192.168.245.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.245.0/29 is directly connected, GigabitEthernet0/0
L       192.168.245.3/32 is directly connected, GigabitEthernet0/0
     203.0.113.0/24 is variably subnetted, 2 subnets, 2 masks
C       203.0.113.0/30 is directly connected, GigabitEthernet0/0/0
L       203.0.113.1/32 is directly connected, GigabitEthernet0/0/0

R5(config)#
```
There is no default route. 

```
R5(config)#ip route 0.0.0.0 0.0.0.0 203.0.113.2
R5(config)#
R5(config)#
R5(config)#do show ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is 203.0.113.2 to network 0.0.0.0

     10.0.0.0/24 is subnetted, 2 subnets
O       10.0.1.0/24 [110/66] via 192.168.245.1, 00:09:44, GigabitEthernet0/0
O       10.0.2.0/24 [110/3] via 192.168.245.2, 00:09:34, GigabitEthernet0/0
     192.168.12.0/30 is subnetted, 1 subnets
O       192.168.12.0/30 [110/65] via 192.168.245.1, 00:09:44, GigabitEthernet0/0
     192.168.34.0/30 is subnetted, 1 subnets
O       192.168.34.0/30 [110/2] via 192.168.245.2, 00:09:34, GigabitEthernet0/0
     192.168.245.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.245.0/29 is directly connected, GigabitEthernet0/0
L       192.168.245.3/32 is directly connected, GigabitEthernet0/0
     203.0.113.0/24 is variably subnetted, 2 subnets, 2 masks
C       203.0.113.0/30 is directly connected, GigabitEthernet0/0/0
L       203.0.113.1/32 is directly connected, GigabitEthernet0/0/0
S*   0.0.0.0/0 [1/0] via 203.0.113.2

R5(config)#
```
We configured it as shown `S*   0.0.0.0/0 [1/0] via 203.0.113.2`

Pinging works now from PC1 to 8.8.8.8.
```PC1
Pinging 8.8.8.8 with 32 bytes of data:

Request timed out.
Reply from 8.8.8.8: bytes=32 time=2ms TTL=252
Reply from 8.8.8.8: bytes=32 time=2ms TTL=252
Reply from 8.8.8.8: bytes=32 time=2ms TTL=252

Ping statistics for 8.8.8.8:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 2ms, Maximum = 2ms, Average = 2ms

C:\>
```

We can even check R1's route table to confirm that OSPF has added a default route.

```
R1#show ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP
       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area
       * - candidate default, U - per-user static route, o - ODR
       P - periodic downloaded static route

Gateway of last resort is 192.168.12.2 to network 0.0.0.0

     10.0.0.0/8 is variably subnetted, 3 subnets, 2 masks
C       10.0.1.0/24 is directly connected, GigabitEthernet0/0
L       10.0.1.254/32 is directly connected, GigabitEthernet0/0
O       10.0.2.0/24 [110/67] via 192.168.12.2, 00:11:03, Serial0/0/0
     192.168.12.0/24 is variably subnetted, 2 subnets, 2 masks
C       192.168.12.0/30 is directly connected, Serial0/0/0
L       192.168.12.1/32 is directly connected, Serial0/0/0
     192.168.34.0/30 is subnetted, 1 subnets
O       192.168.34.0/30 [110/66] via 192.168.12.2, 00:11:03, Serial0/0/0
     192.168.245.0/29 is subnetted, 1 subnets
O       192.168.245.0/29 [110/65] via 192.168.12.2, 00:11:03, Serial0/0/0
O*E2 0.0.0.0/0 [110/1] via 192.168.12.2, 00:01:34, Serial0/0/0
```

Confirmed: `O*E2 0.0.0.0/0 [110/1] via 192.168.12.2, 00:01:34, Serial0/0/0`


## Step 5
5. Examine the LSDB.  What LSAs are present?

If configured correctly. All routers should have the same LSDB
```
R1#show ip ospf database
            OSPF Router with ID (192.168.12.1) (Process ID 1)

                Router Link States (Area 0)

Link ID         ADV Router      Age         Seq#       Checksum Link count
192.168.12.1    192.168.12.1    1694        0x80000004 0x00ee82 3
192.168.34.1    192.168.34.1    1296        0x80000009 0x00ea12 2
192.168.245.2   192.168.245.2   737         0x80000009 0x005c3f 2
192.168.245.1   192.168.245.1   732         0x80000007 0x004884 3
203.0.113.1     203.0.113.1     732         0x80000005 0x00828b 1

                Net Link States (Area 0)
Link ID         ADV Router      Age         Seq#       Checksum
192.168.34.2    192.168.245.2   1576        0x80000005 0x00f326
192.168.245.3   203.0.113.1     737         0x80000002 0x00892d

                Type-5 AS External Link States
Link ID         ADV Router      Age         Seq#       Checksum Tag
0.0.0.0         203.0.113.1     154         0x80000001 0x00d2c1 1
R1#
```

Each router advertises its own LSA (Type 1)
The network link states are Type 2s. The DR of each multi-access network should generate a Type 2. 
And we can expect one type 5 AS-External Link States.

