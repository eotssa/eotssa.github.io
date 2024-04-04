---
title: Voice VLAN Configuration
date: 2024-04-04 17:09:46
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240404171118.png)
**Telephony configurations have been pre-configured on R1**
1. Configure SW1's interfaces in the appropriate VLANs.

2. Configure ROAS for the connection between SW1 and R1.

3. In simulation mode, ping PC2 from PC1.
    Is the traffic tagged with a VLAN ID?

4. In simulation mode, call PH1 from PH2.  Is the traffic tagged with a VLAN ID?


## 1. Configure SW1's interfaces in the appropriate VLANs.

```
SW1(config)#int range g1/0/2-3
SW1(config-if-range)#switchport mode access
SW1(config-if-range)#switchport access vlan 10
% Access VLAN does not exist. Creating vlan 10
SW1(config-if-range)#switchport ?
  access         Set access mode characteristics of the interface
  mode           Set trunking mode of the interface
  nonegotiate    Device will not engage in negotiation protocol on this
                 interface
  port-security  Security related command
  protected      Configure an interface to be a protected port
  trunk          Set trunking characteristics of the interface
  voice          Voice appliance attributes
  <cr>
SW1(config-if-range)#switchport voice ?
  vlan  Vlan for voice traffic
SW1(config-if-range)#switchport voice vlan 20
% Voice VLAN does not exist. Creating vlan 20
```


## 2. Configure ROAS for the connection between SW1 and R1.

SW1

Note that specifying encapsulation type might be necessary first depending if the switch supports Cisco's ISL.
```
SW1(config)#int g1/0/1
SW1(config-if)#switchport mode trunk
```
R1

Configure sub interfaces. 
```
R1(config)#
R1(config)#int f0/0
R1(config-if)#
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface FastEthernet0/0, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/0, changed state to up

R1(config-if)#int f0/0.10
R1(config-subif)#
%LINK-5-CHANGED: Interface FastEthernet0/0.10, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/0.10, changed state to up

R1(config-subif)#encapsulation ?
  dot1Q  IEEE 802.1Q Virtual LAN
R1(config-subif)#encapsulation dot1q ?
  <1-4094>  IEEE 802.1Q VLAN ID
R1(config-subif)#encapsulation dot1q 10
R1(config-subif)#ip address 192.168.10.1 255.255.255.0
R1(config-subif)#
R1(config-subif)#int f0/0.20
R1(config-subif)#
%LINK-5-CHANGED: Interface FastEthernet0/0.20, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/0.20, changed state to up

R1(config-subif)#encapsulation dot1q 20
R1(config-subif)#ip address 192.168.20.1 255.255.255.0
```


3. In simulation mode, ping PC2 from PC1.
    Is the traffic tagged with a VLAN ID?

There is no dot1q in the ethernet header. Lack of TPID:0x8100

![](../../images/Pasted%20image%2020240404172554.png)


## 4. In simulation mode, call PH1 from PH2.  Is the traffic tagged with a VLAN ID?

Yes. Packet indicates a dot1q frame.

![](../../images/Pasted%20image%2020240404172937.png)

Also TCI: 0x0014 = VLAN 20. 