---
title: Mapping a Topology with CDP or LLDP - 36
date: 2024-03-28 18:18:16
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240328182243.png)

1. Use CDP (and other commands) to identify and label the missing IP addresses
    and interface IDs of the devices in the network.

2. Disable CDP on the switch interfaces currently connected to PCs.

3. Disable CDP globally on each network device.

4. Enable LLDP globally on each network device, and enable Tx/Rx on the interfaces
    connected to other network devices.
   *Tx/Rx are currently disabled on all interfaces



## 1. Use CDP (and other commands) to identify and label the missing IP addresses and interface IDs of the devices in the network.

PC1
```
C:\>ipconfig

FastEthernet0 Connection:(default port)

   Connection-specific DNS Suffix..: 
   Link-local IPv6 Address.........: FE80::201:63FF:FE8A:B6E0
   IPv6 Address....................: ::
   IPv4 Address....................: 192.168.1.1
   Subnet Mask.....................: 255.255.255.0
   Default Gateway.................: ::
                                     192.168.1.254

Bluetooth Connection:

   Connection-specific DNS Suffix..: 
   Link-local IPv6 Address.........: ::
   IPv6 Address....................: ::
   IPv4 Address....................: 0.0.0.0
   Subnet Mask.....................: 0.0.0.0
   Default Gateway.................: ::
                                     0.0.0.0
```

PC1's LAN is 192.168.1.1 with a subnet mask of 255.255.255.0. 

Therefore, the network address is 192.168.1.0/24. 

Furthermore, default gateway will indicate R1's IP address: 192.168.1.254


### SW1

```
SW1#show cdp neighbors 
Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge
                  S - Switch, H - Host, I - IGMP, r - Repeater, P - Phone
Device ID    Local Intrfce   Holdtme    Capability   Platform    Port ID
R1           Gig 0/1          174            R       C2900       Gig 0/2
```
SW1's G0/1 is connected to R1's G0/2.

But what about SW1 to PC1? PCs don't use CDP. 

PC1's MAC address
```
C:\>ipconfig /all

FastEthernet0 Connection:(default port)

   Connection-specific DNS Suffix..: 
   Physical Address................: 0001.638A.B6E0
   Link-local IPv6 Address.........: FE80::201:63FF:FE8A:B6E0
   IPv6 Address....................: ::
   IPv4 Address....................: 192.168.1.1
   Subnet Mask.....................: 255.255.255.0
   Default Gateway.................: ::
                                     192.168.1.254
   DHCP Servers....................: 0.0.0.0
   DHCPv6 IAID.....................: 
   DHCPv6 Client DUID..............: 00-01-00-01-D3-72-13-00-00-01-63-8A-B6-E0
   DNS Servers.....................: ::
                                     0.0.0.0

Bluetooth Connection:

   Connection-specific DNS Suffix..: 
   Physical Address................: 00E0.B022.A5B6
   Link-local IPv6 Address.........: ::
   IPv6 Address....................: ::
   IPv4 Address....................: 0.0.0.0
   Subnet Mask.....................: 0.0.0.0
   Default Gateway.................: ::
                                     0.0.0.0
   DHCP Servers....................: 0.0.0.0
   DHCPv6 IAID.....................: 
   DHCPv6 Client DUID..............: 00-01-00-01-D3-72-13-00-00-01-63-8A-B6-E0
   DNS Servers.....................: ::
                                     0.0.0.0
```

Now check SW1's mac address table

```
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----

   1    0010.119d.2503    DYNAMIC     Gig0/1
```

Not showing...? Probably because we need to initiate some activity. 

PC1 pings PC2. 

```
SW1#show mac address-table
          Mac Address Table
-------------------------------------------

Vlan    Mac Address       Type        Ports
----    -----------       --------    -----

   1    0001.638a.b6e0    DYNAMIC     Fa0/10
   1    0010.119d.2503    DYNAMIC     Gig0/1
```

`0001.638a.b6e0 ` matches PC1's MAC address, so SW1 is connected to Fa0/10.

Rinse and repeat for the rest.

### R1

We can identify what is connected to what CDP enabled interfaces. 
```
R1#show cdp neighbors 
Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge
                  S - Switch, H - Host, I - IGMP, r - Repeater, P - Phone
Device ID    Local Intrfce   Holdtme    Capability   Platform    Port ID
SW1          Gig 0/2          144            S       2960        Gig 0/1
R2           Gig 0/1          144            R       C2900       Gig 0/0
R3           Gig 0/0          144            R       C2900       Gig 0/1
R1#
```

`show ip int brief` shows the IP of each interface, but not the subnet mask...
```
R1#show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     10.0.13.1       YES manual up                    up 
GigabitEthernet0/1     10.0.12.1       YES manual up                    up 
GigabitEthernet0/2     192.168.1.254   YES manual up                    up 
Vlan1                  unassigned      YES unset  administratively down down
```

We can identify the IP addresses and subnet of each R1's interface as follows:
```
GigabitEthernet0/0 is up, line protocol is up (connected)
  Hardware is CN Gigabit Ethernet, address is 0010.119d.2501 (bia 0010.119d.2501)
  Internet address is 10.0.13.1/30
  MTU 1500 bytes, BW 1000000 Kbit, DLY 10 usec,
     reliability 255/255, txload 1/255, rxload 1/255
  Encapsulation ARPA, loopback not set
  Keepalive set (10 sec)
  Full-duplex, 100Mb/s, media type is RJ45
  output flow-control is unsupported, input flow-control is unsupported
  ARP type: ARPA, ARP Timeout 04:00:00, 
  Last input 00:00:08, output 00:00:05, output hang never
  Last clearing of "show interface" counters never
  Input queue: 0/75/0 (size/max/drops); Total output drops: 0
  Queueing strategy: fifo
  Output queue :0/40 (size/max)
  5 minute input rate 104 bits/sec, 0 packets/sec
  5 minute output rate 102 bits/sec, 0 packets/sec
     529 packets input, 31794 bytes, 0 no buffer
     Received 0 broadcasts, 0 runts, 0 giants, 0 throttles
     0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored, 0 abort
     0 watchdog, 1017 multicast, 0 pause input
     0 input packets with dribble condition detected
     529 packets output, 31805 bytes, 0 underruns
     0 output errors, 0 collisions, 1 interface resets
     0 unknown protocol drops
     0 babbles, 0 late collision, 0 deferred
     0 lost carrier, 0 no carrier
     0 output buffer failures, 0 output buffers swapped out
GigabitEthernet0/1 is up, line protocol is up (connected)
  Hardware is CN Gigabit Ethernet, address is 0010.119d.2502 (bia 0010.119d.2502)
  Internet address is 10.0.12.1/30
  MTU 1500 bytes, BW 1000000 Kbit, DLY 10 usec,
     reliability 255/255, txload 1/255, rxload 1/255
  Encapsulation ARPA, loopback not set
  Keepalive set (10 sec)
  Full-duplex, 100Mb/s, media type is RJ45
  output flow-control is unsupported, input flow-control is unsupported
  ARP type: ARPA, ARP Timeout 04:00:00, 
  Last input 00:00:08, output 00:00:05, output hang never
  Last clearing of "show interface" counters never
  Input queue: 0/75/0 (size/max/drops); Total output drops: 0
  Queueing strategy: fifo
  Output queue :0/40 (size/max)
  5 minute input rate 104 bits/sec, 0 packets/sec
  5 minute output rate 104 bits/sec, 0 packets/sec
     534 packets input, 32249 bytes, 0 no buffer
     Received 0 broadcasts, 0 runts, 0 giants, 0 throttles
     0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored, 0 abort
     0 watchdog, 1017 multicast, 0 pause input
     0 input packets with dribble condition detected
     530 packets output, 32108 bytes, 0 underruns
     0 output errors, 0 collisions, 1 interface resets
     0 unknown protocol drops
     0 babbles, 0 late collision, 0 deferred
     0 lost carrier, 0 no carrier
     0 output buffer failures, 0 output buffers swapped out
GigabitEthernet0/2 is up, line protocol is up (connected)
  Hardware is CN Gigabit Ethernet, address is 0010.119d.2503 (bia 0010.119d.2503)
  Internet address is 192.168.1.254/24
  MTU 1500 bytes, BW 1000000 Kbit, DLY 10 usec,
     reliability 255/255, txload 1/255, rxload 1/255
  Encapsulation ARPA, loopback not set
  Keepalive set (10 sec)
  Full-duplex, 100Mb/s, media type is RJ45
  output flow-control is unsupported, input flow-control is unsupported
  ARP type: ARPA, ARP Timeout 04:00:00, 
  Last input 00:00:08, output 00:00:05, output hang never
  Last clearing of "show interface" counters never
  Input queue: 0/75/0 (size/max/drops); Total output drops: 0
  Queueing strategy: fifo
  Output queue :0/40 (size/max)
  5 minute input rate 0 bits/sec, 0 packets/sec
  5 minute output rate 104 bits/sec, 0 packets/sec
     4 packets input, 512 bytes, 0 no buffer
     Received 0 broadcasts, 0 runts, 0 giants, 0 throttles
     0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored, 0 abort
     0 watchdog, 1017 multicast, 0 pause input
     0 input packets with dribble condition detected
     526 packets output, 31764 bytes, 0 underruns
     0 output errors, 0 collisions, 1 interface resets
     0 unknown protocol drops
     0 babbles, 0 late collision, 0 deferred
     0 lost carrier, 0 no carrier
     0 output buffer failures, 0 output buffers swapped out
Vlan1 is administratively down, line protocol is down
  Hardware is CPU Interface, address is 0060.3ecc.d406 (bia 0060.3ecc.d406)
  MTU 1500 bytes, BW 100000 Kbit, DLY 1000000 usec,
     reliability 255/255, txload 1/255, rxload 1/255
  Encapsulation ARPA, loopback not set
  ARP type: ARPA, ARP Timeout 04:00:00
  Last input 21:40:21, output never, output hang never
  Last clearing of "show interface" counters never
  Input queue: 0/75/0/0 (size/max/drops/flushes); Total output drops: 0
  Queueing strategy: fifo
  Output queue: 0/40 (size/max)
  5 minute input rate 0 bits/sec, 0 packets/sec
  5 minute output rate 0 bits/sec, 0 packets/sec
     1682 packets input, 530955 bytes, 0 no buffer
     Received 0 broadcasts (0 IP multicast)
     0 runts, 0 giants, 0 throttles
     0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored
     563859 packets output, 0 bytes, 0 underruns
     0 output errors, 23 interface resets
     0 output buffer failures, 0 output buffers swapped out
```

Identify neighbor ID details with CDP as well.

```
R1#show cdp neigh
R1#show cdp neighbors ?
  detail  Show detailed information
  <cr>
R1#show cdp neighbors detail

Device ID: SW1
Entry address(es): 
Platform: cisco 2960, Capabilities: Switch
Interface: GigabitEthernet0/2, Port ID (outgoing port): GigabitEthernet0/1
Holdtime: 166

Version :
Cisco IOS Software, C2960 Software (C2960-LANBASE-M), Version 12.2(25)FX, RELEASE SOFTWARE (fc1)
Copyright (c) 1986-2005 by Cisco Systems, Inc.
Compiled Wed 12-Oct-05 22:05 by pt_team

advertisement version: 2
Duplex: full
---------------------------

Device ID: R2
Entry address(es): 
  IP address : 10.0.12.2
Platform: cisco C2900, Capabilities: Router
Interface: GigabitEthernet0/1, Port ID (outgoing port): GigabitEthernet0/0
Holdtime: 166

Version :
Cisco IOS Software, C2900 Software (C2900-UNIVERSALK9-M), Version 15.1(4)M4, RELEASE SOFTWARE (fc2)
Technical Support: http://www.cisco.com/techsupport
Copyright (c) 1986-2012 by Cisco Systems, Inc.
Compiled Thurs 5-Jan-12 15:41 by pt_team

advertisement version: 2
Duplex: full
---------------------------

Device ID: R3
Entry address(es): 
  IP address : 10.0.13.2
Platform: cisco C2900, Capabilities: Router
Interface: GigabitEthernet0/0, Port ID (outgoing port): GigabitEthernet0/1
Holdtime: 166

Version :
Cisco IOS Software, C2900 Software (C2900-UNIVERSALK9-M), Version 15.1(4)M4, RELEASE SOFTWARE (fc2)
Technical Support: http://www.cisco.com/techsupport
Copyright (c) 1986-2012 by Cisco Systems, Inc.
Compiled Thurs 5-Jan-12 15:41 by pt_team

advertisement version: 2
Duplex: full

```

## 2. Disable CDP on the switch interfaces currently connected to PCs.

```
SW1(config)#int f0/10
SW1(config-if)#do sh cdp int f0/10
FastEthernet0/10 is up, line protocol is up
  Sending CDP packets every 60 seconds
  Holdtime is 180 seconds
SW1(config-if)#
SW1(config-if)#
SW1(config-if)#no cdp enable
SW1(config-if)#do sh cdp int f0/10
SW1(config-if)#
```

![](../../images/Pasted%20image%2020240328191057.png)

## 3. Disable CDP globally on each network device.

## 4. Enable LLDP globally on each network device, and enable Tx/Rx on the interfaces connected to other network devices. Tx/Rx are currently disabled on all interfaces

```
R3(config)#
R3(config)#no cdp run
R3(config)#lldp run
R3(config)#int range g0/0 - 2
R3(config-if-range)#lldp transmit
R3(config-if-range)#lldp receive
```

```
SW3(config)#no cdp run
SW3(config)#
SW3(config)#lldp run
SW3(config)#
SW3(config)#int g0/1
SW3(config-if)#lldp rec
SW3(config-if)#lldp receive >?
% Unrecognized command
SW3(config-if)#lldp receive ?
  <cr>
SW3(config-if)#lldp receive
SW3(config-if)#lldp ?
  receive   Enable LLDP reception on interface
  transmit  Enable LLDP transmission on interface
SW3(config-if)#lldp transmit
SW3(config-if)#
```