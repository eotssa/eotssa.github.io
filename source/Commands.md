## `show` commands

Router
```
show running-config 
show startup-config

show ip interface brief
show ip route
show interfaces status
show vlan brief
show interfaces INTERFACE-ID switchport 

show vtp status 

show ip protocols 
show ip protocols brief (?)

show ip ospf ? 
show ip ospf database ## shows LSA(s) in LSDB
show ip ospf neighbor ## shows OSPF neighbors 
show ip ospf interface ## views all interface details on ospf 
show ip ospf interface INTERFACE-ID
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



sh int f0/1 switchport // checks specific interfaces for dtp/vtp
```


## STP

```
show spanning-tree ?
```


```
SW(config-if)#spanning-tree portfast
```

```
//enables spanning-tree on all access ports, but not trunk ports
SW1(config)#spanning-tree portfast default

```

```
//BPDU guard for interface-specific
SW(config-if)#spanning-tree bpuguard enable
```

```
//BPDU guard for all portfast enabled interfaces // global enable
SW1(config)#spanning-tree portfast bpduguard default 

//to renable the switch, do shutdown then no shutdown -- 
```

```
SW1(config)#spanning-tree mode ?
	mst 
	pvst // classic spanning tree with p-
	rapid-pvst // improved pvst // modern and most switches run 
```


```
//configure Root bridge
SW1(config)#spanning-tree vlan VLAN-NUMBER root primary

//show info
SW1(config)#do show spanning-tree

// set 2ndary root priority
SW1(config)#spanning-tree vlan VLAN-NUMBER root secondary

```

```STP Port Settings
SW1(config)#spanning-tree vlan 1 ?
	cost
	port-priority

```


## EtherChannel Load Balancing

![](images/Pasted%20image%2020240312015856.png)



## OSPF
```
show ip ospf interface brief 

show ip ospf int INTERFACE-ID

//checks neighbors for adj
show ip ospf neighbor
```

```
R2# configure terminal
R2(config)# router ospf 1
R2(config-router)# network 192.168.12.0 0.0.0.3 area 0 
R2(config-router)# exit
R2(config)# interface s0/0/0
R2(config-if)# ip ospf 1 area 0
```

```CHANGING COST
// changes the cost of OSFP ; default reference bandwidth cost: 100
// configure all routers to have the same osfp reference-bandwidth 
R1(config-router)#auto-cost reference-bandwidth <1-4294967 (Mbps)>

//change specific interface cost, takes precedence over auto-cost
R1(config-router)#ip ospf cost <1-65535>

//change specific interface cost via bandwidth command (NOT RECOMMENDED)
R1(config-router)#bandwidth ?
R1(config-router)#bandwidth <NUM kilobits/sec>
```

```
//activate osfp on an interface without the `network` command
R1(config-if)#ip ospf PROCESS-ID area AREA-ID

//configure all interfaces to be passive-intefaces
R1(config-if)#router ospf PROCESS-ID
//then select certain interfaces to enable
R1(config-if)#no passive-interace INTERFACE-ID
```

![](images/Pasted%20image%2020240318163715.png)
```
//Change interface priority for DR/DBR designation
R1(config)#int g0/0
R1(config-if)#ip ospf priority <0-255>

//configure the OSPF network type
R1(config-if)#ip ospf network ?
	broadcast
	non-broadcast
	point-to-multipoint
	point-to-point
```

![](images/Pasted%20image%2020240318212830.png)

### OSPF Neighbor Requirements
1. Area Numbers must match
2. Interfaces must be in the same subnet
3. OSPF process must not be shutdown
4. OSPF router ID's must be unique 

5. Set OSPF hello and dead timers
```
//sets hello-interval
R1(config-if)#ip osp hello-interval SEC

//sets dead-interval
R1(config-if)#ip ospf dead-interval SEC
```

6. Set OSPF password
```
//set passwords -- OSPF adj must have the same password
R1(config-if)#ip ospf authentication-key PASSWORD

//must enable 
R1(config-if)#ip ospf authentication 
```

7. Configure IP MTU (OSPF will still be on if not matching neighbors, but won't work properly)
```
R1(config-if)#ip mtu <68-1500>
```

8. OSPF Network Type must match 
	- If we configure a loopback address, and then change the physical interface; might be an issue and still display FULL. 
```
R1(config-if)# 
```



Serial Interface's
```SERIAL INTERFACES
//Default encapsulation is HDLC
//Can configure to ppp
R1(config-if)#encaosulation ppp

//One side is DCE, one side is DTE; Identify which with
R1(config-if)#show ocntrollers INTERFACE-ID

//Configure clock-rate with DCE side
R1(config-if)#clock rate BITS-PER-SEC
```


## IPv6 Routing

Configure IPv6 on Router Interfaces
```
R1(config)#ipv6 unicast-routing         // enables ipv6 routing
R1(config)#int g0/0
R1(config-if)#ipv6 address 2001:db8:0:0::1/64
R1(config-if)#no shutdown
R1(config-if)#
R1(config-if)#int g0/1
R1(config-if)#ipv6 address 2001:db8:0:1::1/64
R1(config-if)#no shutdown
```

