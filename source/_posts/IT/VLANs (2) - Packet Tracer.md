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
SW1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
SW1(config)#int range f0/1 - 2
SW1(config-if-range)#sw
SW1(config-if-range)#switchport mode ac
SW1(config-if-range)#switchport mode access 
SW1(config-if-range)#sw ac vlan 10
% Access VLAN does not exist. Creating vlan 10
SW1(config-if-range)#int range f0/3 - 4
SW1(config-if-range)#switchport mode access
SW1(config-if-range)#sw ac vlan 30
% Access VLAN does not exist. Creating vlan 30
```

The same is done for SW2.

```
SW2>en
SW2#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
SW2(config)#int f0/1
SW2(config-if)#switchport mode access
SW2(config-if)#sw ac vlan 20
% Access VLAN does not exist. Creating vlan 20
SW2(config-if)#int f0/2, f0/3
                ^
% Invalid input detected at '^' marker.
	
SW2(config-if)#int range f0/2, f0/3
SW2(config-if-range)#sw
SW2(config-if-range)#switchport mode ac
SW2(config-if-range)#switchport mode access 
SW2(config-if-range)#sw ac vlan 10
% Access VLAN does not exist. Creating vlan 10
```


## 2. Configure the connection between SW1 and SW2 as a trunk, allowing only the necessary VLANs. Configure an unused VLAN as the native VLAN. **Make sure all necessary VLANs exist on each switch**

Configure SW1 G0/1. It should only allow VLAN 10 and VLAN 30 as a trunk port. 

```
SW1(config)#
SW1(config)#
SW1(config)#int g0/1
SW1(config-if)#switc
SW1(config-if)#switchport mode ?
  access   Set trunking mode to ACCESS unconditionally
  dynamic  Set trunking mode to dynamically negotiate access or trunk mode
  trunk    Set trunking mode to TRUNK unconditionally
SW1(config-if)#switchport mode trunk

SW1(config-if)#
%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to down

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up

SW1(config-if)#
SW1(config-if)#swi
SW1(config-if)#switchport trunk ?
  allowed  Set allowed VLAN characteristics when interface is in trunking mode
  native   Set trunking native characteristics when interface is in trunking
           mode
SW1(config-if)#switchport trunk allowed ?
  vlan  Set allowed VLANs when interface is in trunking mode
SW1(config-if)#switchport trunk allowed vlan 10,30
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
SW1(config-if)#swi
SW1(config-if)#switchport trunk 
SW1(config-if)#switchport trunk ?
  allowed  Set allowed VLAN characteristics when interface is in trunking mode
  native   Set trunking native characteristics when interface is in trunking
           mode
SW1(config-if)#switchport trunk native ?
  vlan  Set native VLAN when interface is in trunking mode
SW1(config-if)#switchport trunk native vlan 1001
SW1(config-if)#
SW1(config-if)#
SW1(config-if)#do show int trunk
Port        Mode         Encapsulation  Status        Native vlan
Gig0/1      on           802.1q         trunking      1001

Port        Vlans allowed on trunk
Gig0/1      10,30

Port        Vlans allowed and active in management domain
Gig0/1      10,30

Port        Vlans in spanning tree forwarding state and not pruned
Gig0/1      10,30

SW1(config-if)#
%CDP-4-NATIVE_VLAN_MISMATCH: Native VLAN mismatch discovered on GigabitEthernet0/1 (1001), with SW2 GigabitEthernet0/1 (1).
```


Configure SW2. Similarly, it should only allow VLAN 10 and 30 in G0/1. The reason why VLAN20 isn't allowed on G0/1 is because router on a stick is going to be set up. All VLAN20 source traffic will be sent to R1. 


```

```


### 3. Configure the connection between SW2 and R1 using 'router on a stick'. Assign the last usable address of each subnet to R1's subinterfaces.

#### SW2's G0/1