## `show` commands

Router
```
show ip interface brief
show ip route
show interfaces status
show vlan brief
show interfaces INTERFACE-ID switchport 

show vtp status 
```


## Native VLAN on a Router (ROAS)

Method 1: For sub-interfaces
```
R1(config)#int g0/0.10
R1(config-subif)#encapsulation dot1q VLAN-ID native
R1(config-subif)#
```

Method 2: Simple configuration; configure the IP address for the native VLAN on the rouyter's physical interface 
```
// If sub-interface is enabled, delete
R1(config)#no interface g0/0.10

R1(config)#interface g0/0
R1(config-if)# ip address IP-ADDRESS SUBNET-MASK
```

## Multilayer Switches (Layer 3)
- Introduces switch virtual interfaces (SVI). 
- Each PC should be configured to use the SVI (not the router) as their gateway address.
- In addition to SVI, we can also configure switch interfaces to act like router interfaces. 

### Point-to-Point Link for Switch and Router

Router Configuration for Point-to-Point
```
// disable router's ROAS configuration if available. 
// for example
R1(config)#no interface g0/0.10
R1(config)#no interface g0/0.20
R1(config)#no interface g0/0.30

// set interface to default settings
R1(config)#default interface INTERFACE
```

```
R1(config)#interface g0/0
R1(config-if)#ip address IP-ADDRESS SUBNET-MASK 
```

Switch Configuration for Point-to-Point
- Here, we enable `ip routing` on a switch for layer 3 functionality, and also change a switch port to a "routed port (router port)"
```
SW2(config)#default interface INTERFACE-ID

// enables Layer 3 routing on the switch ; DO NOT FORGET
SW2(config)#ip routing

// configures the interface as a "routed port" instead of a switch port
SW2(config)#interface INTERFACE-ID
SW2(config-if)#no switchport

// now we can configure an IP address on the interface like a regular router interface 
SW2(config-if)#ip address IP-ADDRESS SUBNET-MASK
```

- Configure a default route so that traffic meant for the internet is sent to the router (given that SW and R are P2P)
```
SW2(config)#ip route 0.0.0.0 0.0.0.0 NEXT-HOP
```


### SVI Configuration 

```
// creates SVI for VLAN 10 // SVI's are shutdown by default; to enable use 'no shutdown'
SW2(config)#interface vlan 10
SW2(config-if)#ip address IP-ADDRESS SUBNET-MASK
SW2(config-if)#no shutdown

SW2(config)#interface vlan 20
SW2(config-if)#ip address IP-ADDRESS SUBNET-MASK
SW2(config-if)#no shutdown

SW2(config)#interface vlan 30
SW2(config-if)#ip address IP-ADDRESS SUBNET-MASK
SW2(config-if)#no shutdown
```
1. The VLAN must exist on the switch. SVI's do not automatically create a VLAN on the switch. 
2. The switch must have at least one access port in the VLAN up/up state, AND/OR one trunk port that allows the VLAN that is in an up/up state. 
3. The VLAN must not be shutdown. 
4. The SVI must not be shutdown. 



## DTP/VTP

Switched
```
switchport mode dynamic
switchport mode dynamic auto
switchport nonegotiate
switchport mode access 
```


```
vtp mode client
vtp mode transparent
vtp domain NAME
show vtp status


vtp version NUMBER(1/2/3)
```