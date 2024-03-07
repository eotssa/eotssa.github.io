---
title: VLANs (2) - Packet Tracer
date: 2024-03-06 23:19:35
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240306231940.png)

1. Configure the switch interfaces connected to PCs as access ports in the correct VLAN.

2. Configure the connection between SW1 and SW2 as a trunk, allowing only the necessary VLANs.
    Configure an unused VLAN as the native VLAN.
    **Make sure all necessary VLANs exist on each switch**

3. Configure the connection between SW2 and R1 using 'router on a stick'.
     Assign the last usable address of each subnet to R1's subinterfaces.

4. Test connectivity by pinging between PCs.  All PCs should be able to reach each other.

---

## 1. Configure the switch interfaces connected to PCs as access ports in the correct VLAN.

For switch 1, I configured SW1's interfaces with their respective VLANs. 

```
SW1>
SW1>en
SW1>enable
SW1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
SW1(config)#
SW1(config)#int range f0/1 - 2
SW1(config-if-range)#switchport mode access
SW1(config-if-range)#switchport access vlan 10
% Access VLAN does not exist. Creating vlan 10
SW1(config-if-range)#
SW1(config-if-range)#
SW1(config-if-range)#int range f0/3-4
SW1(config-if-range)#swi
SW1(config-if-range)#switchport mode ac
SW1(config-if-range)#switchport mode access 
SW1(config-if-range)#sw
SW1(config-if-range)#switchport access vlan 30
% Access VLAN does not exist. Creating vlan 30
SW1(config-if-range)#
SW1(config-if-range)#
SW1(config-if-range)#exit
SW1(config)#do show vlan brief

VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Fa0/5, Fa0/6, Fa0/7, Fa0/8
                                                Fa0/9, Fa0/10, Fa0/11, Fa0/12
                                                Fa0/13, Fa0/14, Fa0/15, Fa0/16
                                                Fa0/17, Fa0/18, Fa0/19, Fa0/20
                                                Fa0/21, Fa0/22, Fa0/23, Fa0/24
                                                Gig0/1, Gig0/2
10   VLAN0010                         active    Fa0/1, Fa0/2
30   VLAN0030                         active    Fa0/3, Fa0/4
1002 fddi-default                     active    
1003 token-ring-default               active    
1004 fddinet-default                  active    
1005 trnet-default                    active    
```

The same is done for SW2.

```
SW2>
SW2>en
SW2#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
SW2(config)#
SW2(config)#switchport 
SW2(config)#switchport mode
SW2(config)#switchport mode ac
SW2(config)#int f0/1
SW2(config-if)#swi
SW2(config-if)#switchport mode ac
SW2(config-if)#swi
SW2(config-if)#switchport access vlan 20
% Access VLAN does not exist. Creating vlan 20
SW2(config-if)#
SW2(config-if)#
SW2(config-if)#int range f0/2-3
SW2(config-if-range)#switchport mode ac
SW2(config-if-range)#switchport access vlan 10
% Access VLAN does not exist. Creating vlan 10
SW2(config-if-range)#
SW2(config-if-range)#
SW2(config-if-range)#exit
SW2(config)#
SW2(config)#do show vlan brief

VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Fa0/4, Fa0/5, Fa0/6, Fa0/7
                                                Fa0/8, Fa0/9, Fa0/10, Fa0/11
                                                Fa0/12, Fa0/13, Fa0/14, Fa0/15
                                                Fa0/16, Fa0/17, Fa0/18, Fa0/19
                                                Fa0/20, Fa0/21, Fa0/22, Fa0/23
                                                Fa0/24, Gig0/1, Gig0/2
10   VLAN0010                         active    Fa0/2, Fa0/3
20   VLAN0020                         active    Fa0/1
1002 fddi-default                     active    
1003 token-ring-default               active    
1004 fddinet-default                  active    
1005 trnet-default                    active    
SW2(config)#
```


## 2. Configure the connection between SW1 and SW2 as a trunk, allowing only the necessary VLANs. Configure an unused VLAN as the native VLAN. **Make sure all necessary VLANs exist on each switch**

Configure SW1 G0/1. It should only allow VLAN 10 and VLAN 30 as a trunk port. 

```
SW1(config)#
SW1(config)#int g0/1
SW1(config-if)#switchport mode ?
  access   Set trunking mode to ACCESS unconditionally
  dynamic  Set trunking mode to dynamically negotiate access or trunk mode
  trunk    Set trunking mode to TRUNK unconditionally
SW1(config-if)#switchport mode trunk

SW1(config-if)#
%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to down

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up

SW1(config-if)#
SW1(config-if)#switchport trunk ?
  allowed  Set allowed VLAN characteristics when interface is in trunking mode
  native   Set trunking native characteristics when interface is in trunking
           mode
SW1(config-if)#switchport trunk allowed ?
  vlan  Set allowed VLANs when interface is in trunking mode
SW1(config-if)#switchport trunk allowed vlan 10,30
SW1(config-if)#
SW1(config-if)#
SW1(config-if)#do show int trunk
Port        Mode         Encapsulation  Status        Native vlan
Gig0/1      on           802.1q         trunking      1

Port        Vlans allowed on trunk
Gig0/1      10,30

Port        Vlans allowed and active in management domain
Gig0/1      10,30

Port        Vlans in spanning tree forwarding state and not pruned
Gig0/1      10,30

SW1(config-if)#
```


Configure SW2. Similarly, it should only allow VLAN 10 and 30 in G0/1. The reason why VLAN20 isn't allowed on G0/1 is because router on a stick is going to be set up. All VLAN20 source traffic will be sent to R1. 


```
SW2(config)#
SW2(config)#int g0/1
SW2(config-if)#switchport mode trunk
SW2(config-if)#switch
SW2(config-if)#switchport trunk allowed ?
  vlan  Set allowed VLANs when interface is in trunking mode
SW2(config-if)#switchport trunk allowed vlan 10, 30
                                                 ^
% Invalid input detected at '^' marker.
	
SW2(config-if)#
SW2(config-if)#switchport trunk allowed vlan 10,30
SW2(config-if)#
SW2(config-if)#do show int trunk
Port        Mode         Encapsulation  Status        Native vlan
Gig0/1      on           802.1q         trunking      1

Port        Vlans allowed on trunk
Gig0/1      10,30

Port        Vlans allowed and active in management domain
Gig0/1      10

Port        Vlans in spanning tree forwarding state and not pruned
Gig0/1      10

SW2(config-if)#vlan 30
SW2(config-vlan)#
SW2(config-vlan)#exit
SW2(config)#do show int trunk
Port        Mode         Encapsulation  Status        Native vlan
Gig0/1      on           802.1q         trunking      1

Port        Vlans allowed on trunk
Gig0/1      10,30

Port        Vlans allowed and active in management domain
Gig0/1      10,30

Port        Vlans in spanning tree forwarding state and not pruned
Gig0/1      10,30
```



### Configure an unused VLAN as the native VLAN.

SW1 

```
int g0/1
SW1(config-if)#switchport trunk native vlan 1001
```


SW2
```
SW2(config-if)#int g0/2
SW2(config-if)#switchport mode trunk
SW2(config-if)#switchport trunk ?
  allowed  Set allowed VLAN characteristics when interface is in trunking mode
  native   Set trunking native characteristics when interface is in trunking
           mode
SW2(config-if)#switchport trunk allowed vlan 10,20,30
```
### 3. Configure the connection between SW2 and R1 using 'router on a stick'. Assign the last usable address of each subnet to R1's subinterfaces.

#### SW2's G0/2

```
SW2(config-if)#int g0/2
SW2(config-if)#switchport mode trunk
SW2(config-if)#switchport trunk ?
  allowed  Set allowed VLAN characteristics when interface is in trunking mode
  native   Set trunking native characteristics when interface is in trunking
           mode
SW2(config-if)#switchport trunk allowed vlan 10,20,30
```


### Setting Up R1 as a ROAS

```
R1>
R1>en
R1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#int g0/0
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up

R1(config-if)#int g0/0.10
R1(config-subif)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0.10, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0.10, changed state to up

R1(config-subif)#?
  arp            Set arp type (arpa, probe, snap) or timeout
  bandwidth      Set bandwidth informational parameter
  delay          Specify interface throughput delay
  description    Interface specific description
  encapsulation  Set encapsulation type for an interface
  exit           Exit from interface configuration mode
  ip             Interface Internet Protocol config commands
  ipv6           IPv6 interface subcommands
  mtu            Set the interface Maximum Transmission Unit (MTU)
  no             Negate a command or set its defaults
  shutdown       Shutdown the selected interface
  standby        HSRP interface configuration commands
R1(config-subif)#encap
R1(config-subif)#encapsulation dot1q 10
R1(config-subif)#
R1(config-subif)#(00)000000 =?
% Unrecognized command
R1(config-subif)#(00)000000 => (00)111111 => 255 - 192 = 63 broadcast => 62
                 ^
% Invalid input detected at '^' marker.
	
R1(config-subif)#ip address 10.0.0.62 255.255.255.192
R1(config-subif)#
R1(config-subif)#
R1(config-subif)#int g0/0.20
R1(config-subif)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0.20, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0.20, changed state to up

R1(config-subif)#en
R1(config-subif)#encapsulation d
R1(config-subif)#encapsulation dot1Q 20
R1(config-subif)#
R1(config-subif)#(01)000000 => (01)111111 => 127 broadc => 126 
                 ^
% Invalid input detected at '^' marker.
	
R1(config-subif)#
R1(config-subif)#ip address 10.0.0126 255.255.255.192
                            ^
% Invalid input detected at '^' marker.
	
R1(config-subif)#
R1(config-subif)#ip address 10.0.0.126 255.255.255.192
R1(config-subif)#
R1(config-subif)#int g0/0.30
R1(config-subif)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0.30, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0.30, changed state to up

R1(config-subif)#en
R1(config-subif)#encapsulation do
R1(config-subif)#encapsulation dot1Q 30
R1(config-subif)#
R1(config-subif)#(10)000000 => (10)111111 => 255 - 64 => 191b => 190
                 ^
% Invalid input detected at '^' marker.
	
R1(config-subif)#
R1(config-subif)#ip address 10.0.0.190 255.255.255.192
R1(config-subif)#
R1(config-subif)#
R1(config-subif)#exit
```



### Ping to Check

```

Pinging 10.0.0.1 with 32 bytes of data:

Reply from 10.0.0.1: bytes=32 time<1ms TTL=128
Reply from 10.0.0.1: bytes=32 time<1ms TTL=128
Reply from 10.0.0.1: bytes=32 time<1ms TTL=128
Reply from 10.0.0.1: bytes=32 time<1ms TTL=128

Ping statistics for 10.0.0.1:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms

C:\>ping 10.0.0.129

Pinging 10.0.0.129 with 32 bytes of data:

Request timed out.
Reply from 10.0.0.129: bytes=32 time<1ms TTL=127
Reply from 10.0.0.129: bytes=32 time<1ms TTL=127
Reply from 10.0.0.129: bytes=32 time=11ms TTL=127

Ping statistics for 10.0.0.129:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 11ms, Average = 3ms

C:\>ping 10.0.0.65

Pinging 10.0.0.65 with 32 bytes of data:

Request timed out.
Reply from 10.0.0.65: bytes=32 time<1ms TTL=127
Reply from 10.0.0.65: bytes=32 time<1ms TTL=127
Reply from 10.0.0.65: bytes=32 time=12ms TTL=127

Ping statistics for 10.0.0.65:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 12ms, Average = 4ms
```