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

show ipv6 int brief

```

Switch
```
show ip interface brief
show interfaces status

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
R1(config)#ipv6 unicast-routing         // enables ipv6 routing ; enables ipv6 forwarding; does not affect R's ability to send and recieve its own ipv6 traffic 
R1(config)#int g0/0
R1(config-if)#ipv6 address 2001:db8:0:0::1/64
R1(config-if)#no shutdown
R1(config-if)#
R1(config-if)#int g0/1
R1(config-if)#ipv6 address 2001:db8:0:1::1/64
R1(config-if)#no shutdown
```

```
R1#show ipv6 neighbor  // displays ipv6 neighbor table 
```

SLAAC
```
ipv6 address autoconfig // dont need to enter prefix; NDP is used to learn the prefix used on the local link, and devices will use eui-64 to generate the interface ID (or randomly generate depending)
```

IPv6 Static routing
```
R1#show ipv6 route // shows connected and local; does not show link-local
```

```
ipv6 route destination/prefix-length (next-hop | exit-interface [next-hop]) [ad]

Directly attached static route: Only the exit interface is specified. // NOT USABLE for ethernet interfaces in IPv6
    ipv6 route destination/prefix-length exit-interface
	    R1(config)# ipv6 route 2001:db8:0:3::/64 g0/0

Recursive static route: Only the next hop is specified.
    ipv6 route destination/prefix-length next-hop
        R1(config)# ipv6 route 2001:db8:0:3::/64 2001:db8:0:12::2

Fully specified static route: Both the exit interface and next hop are specified.
	ipv6 route destination/prefix-length exit-interface next-hop
        R1(config)# ipv6 route 2001:db8:0:3::/64 g0/0 2001:db8:0:12::2
```

```
Network route:  
	R1(config)# ipv6 route 2001:db8:0:3::/64 2001:db8:0:12::2

Host route:

    R2(config)# ipv6 route 2001:db8:0:1::100/128 2001:db8:0:12::1
    R2(config)# ipv6 route 2001:db8:0:3::100/128 2001:db8:0:23::2

Default route:  
	R3(config)# ipv6 route ::/0 2001:db8:0:23::1

Floating static route:
	Configure the route using AD higher than the protocol being used. 

Link-Local Next Hops:
	Configure the route with a fully-specified static route. 
```



## ACL

### Numbered ACL
```
R1(config)#access-list NUMBER {deny | permit} ip wildcard-mask
```

By default, the ACL is configured /32 if a wildcard-mask is not given. 
```
//Specifies wildcard /32 mask 
access-list 1 deny 1.1.1.1 0.0.0.0

//Implict /32 is not specified
R1(config)#access-list 1 deny 1.1.1.1 

//Same, but older method
R1(config)#access-list 1 deny host 1.1.1.1
```

Implicit allow
```
R1(config)#access-list 1 permit any

//Same 
R1(config)#access-list 1 permit 0.0.0.0 255.255.255.255
```

Remark
```
R1(config)#access-list 1 remark DESCRIPTION 
```

Show
```
//Displays all kinds of ACLs
R1#show access-lists

//Displays IP ACL's only
R1#show ip access-lists

R1#show running-config | include access-list
```

Apply to an interface
```
R1(config-if)#ip access-group NUMBER {in | out}
```

### Standard Named ACLs
Configuration
```
R1(config)#ip access-list standard acl-name
R1(config-std-nacl)# [entry-number] {deny | permit} ip wildcard-mask
```


Show
```
// Shows all ACLs
R1#show access-list

// Running-Config Pipe difference (piping via access-list will not show the internals)
R1#show running-config | section access-list
```

### Another way to configure numbered ACL (in named ACL config mode)
Works similarly to named ACL; advantage is ability to delete rules by number. 
Also, global config ACL deletion will delete the entire ACL, not individual entries. 
```
R1(config)#ip access-list standard NUMBER
R1(config-std-nacl)#deny ip-address
R1(config-std-nacl)#permit any
```

### Resequencing ACL

```
R1(config)#ip access-list resequence acl-id start-seq-num increment
```
For example, ACL 1 may be numbered 1,2,3,4,5. If we wanted to insert a rule in-between, there are no integers left. 
Resequencing as follows like such `ip access-list resequence 1 10 10` changes the first entry to 10, and increments 10 after--resulting in 10,20,30,40,50. Now, we can add a rule in-between.


### Extended ACL

`number` range: 100-199, 2000-2699
```
R1(config)#access-list number [permit | deny] protocol src-ip dest-ip
```

Extended Named ACL
```
R1(config)#access-list extended {name | number}
R1(config-ext-nacl)#[seq-num] [permit | deny] protocol src-ip dest-ip

R1(config)#ip access-list extended EXAMPLE
R1(config-ext-nacl)#deny ?
	<0-255>                                     An IP protocol number  // 1: ICMP, 6: TCP, 17: UDP, 88: EIGRP, 89: OSPF
	ahp                                         Authentication Header Protocol
	eigrp                                       Cisco's EIGRP routing protocol
	esp                                         Encapsulation Security Payload
	gre                                         Cisco's GRE tunneling
	icmp                                        Internet Control Message Protocol
	igmp                                        Internet Gateway Message Protocol
	ip                                          Any Internet Protocol
	ipinip                                      IP in IP tunneling
	nos                                         KA9Q NOS compatible IP over IP tunneling
	object-group                                Service object group
	ospf                                        OSPF routing protocol
	pcp                                         Payload Compression Protocol
	pim                                         Protocol Independent Multicast
	sctp                                        Stream Control Transmission Protocol
	tcp                                         Transmission Control Protocol
	udp                                         User Datagram Protocol

R1(config-ext-nacl)#deny tcp any ?
	A.B.C.D                                   Source address
	any                                       Any source host
	host                                      A single source host // specify a host for a /32 instead of a wildcard mask
	object-group                              Source network object group

```

Specifying Port Ranges

```
R1(config-ext-nacl)#deny tcp src-ip [eq | gt | lt | neq | range num num2] src-port-num dest-ip [eq | gt | lt | neq | range num num2] dst-port-num

//For example,
R1(config-ext-nacl)#
```

Show
```
R1#show ip interface INTERFACE-ID
```

## CDP and LLDP
Enables neighbors to share information directly with each other. 
### CDP

```
//Shows basic information about CDP (timers, version)
R1#show cdp

//Shows how many CDP messages have been sent and recieved
R1#show cdp traffic

//Displays which interfaces CDP is enabled on
R1#show cdp interface

//lists CDP neighbors and some basic information about each neighbor
R1#show cdp neighbors

//lists each CDP neighbor with more detailed information (IP address, etc)
R1#show cdp neighbors detail

//same as detailed neighbors, but specific 
R1#show cdp entry NAME
```
### LLDP

LLDP Configurations 
```
//LLDP is globally disabled by default. Enable globally deault
R1#lldp run

//Enable LLDP on specific interfaces (tx)
R1#lldp transmit

//Enable LLDP on a specific interfaqce (rx)
R1#lldp recieve

//Configure LLDP timer
R1#lldp timer SECONDS

//Configure LLDP holdtime
R1#lldp holdtime seconds

//Configure LLDP reinit timer
R1#lldp reinit
```

show commands
```
//Shows LLDP configuration information
R1(config)#show lldp

//Shows statistics about frames
R1(config)#show lldp traffic

//Shows if LLDP are enabled on every interface 
R1(config)#show lldp interface

//Shows all neighbors 
R1(config)#show lldp neighbors

//Shows more detail for neighbors // shows device capabilities
R1(config)#show lldp neighbors detail

//Shows specific neighbor
R1(config)#show lldp entry NAME
```

## NTP

```
//Default timezone is UTC
R1#show clock

//asterisk * means time is not authoritative; does not consider accurate 
R1#show clock detail

//Manual time configuration
R1#clock set ? 

//Hardware clock
R1#calendar set hh:mm:ss {day|month} {month|day} year

//Synchronize calendar to clock
R1#clock update-calendar

//Sync clock to calendar
R1#clock read-calendar


//Configure timezone
R1(config)#clock timezone NAME HOURS-OFFSET [MINUTES-OFFSET]

//Daylight Savings Time (Summer Time)
R1(config)#clock summer-time recurring NAME START END [OFFSET]
R1(config)#clock summer-time EDT recurring 2 Sunday March 02:00 1 Sunday November 02:00
```

NTP Configuration, Syncing to Google's Time
```WINDOWS
nslookup time.google.com
dns.google
```

```
R1(config)#ntp server 216.239.35.0
R1(config)#ntp server 216.239.35.4
R1(config)#ntp server 216.239.35.8

//can set prefer 
R1(config)#ntp server 216.239.35.12 prefer

//See all configured NTP servers; * is best server
R1#show ntp associations

//status
R1#show ntp status

//See clock information; NTP uses UTC timezone by default
R1#show clock detail

```

NTP Configuration to a LAN device; R1 acts as a server for R2

Configure R1 first
```
//Set R1's loopback interface (not required, but good practice)
R1(config)#interface loopback0
R1(config-if)#ip address 10.1.1.1 255.255.255.255
R1(config-if)#exit
R1(config)#ntp source loopback0
```

R2 is as follows:
```
R1(config)#ntp server 10.1.1.1
R1(config)#do show ntp associations
R1(config)#do show ntp status
```

NTP Configuration even when there is no external server; 
```
// Uses default stratum level of 8 // will configure a loopback addresses (127.x.x.x)
R1(config)#ntp master ?
```

```
//ConfigureNTP symmetric active mode
R2(config)#ntp peer IP-ADDRESS-OF-R3
```

```
R3(config)#ntp peer IP-ADDRESS-OF-R2
```

NTP Authentication
```
//Enable NTP auth
ntp authenciate
//create the NTP auth key(s)
ntp authentication-key KEY-NUM md5 KEY
//specify which key is trusted
ntp trusted-key KEY-NUM
//speicfy which key to use for the server
ntp server IP-ADDRESS key KEY-NUM
```

```
R1(config)#ntp authenticate
R1(config)#ntp authentication-key 1 md5 jeremysitlab
R1(config)#ntp trusted-key 1
-------------------
R2(config)#ntp authenticate
R2(config)#ntp authentication-key 1 md5 jeremysitlab
R2(config)#ntp trusted-key 1
R2(config)#ntp server 10.0.12.1 key 1
R2(config)#ntp peer 10.0.23.2 key 1
-------------------
R3( config)#ntp authenticate
R3(config)#ntp authentication-key 1 md5 jeremysitlab
R3(config)#ntp trusted-key 1
R3(config)#ntp server 10.0.12.1 key 1
R2(config)#ntp peer 10.0.23.1 key 1
```


```
!Basic Configuration Commands
R1(config)# ntp server ip-address [prefer]
R1(config)# ntp peer ip-address
R1(config)# ntp update-calendar

R1(config)# ntp master [stratum]
R1(config)# ntp source interface

!Basic Show Commands

R1# show ntp associations
R1# show ntp status

! Basic Authentication Commands

R1(config)# ntp authenticate
R1(config)# ntp authentication-key key-number md5 key
R1(config)# ntp trusted-key key-number

R1(config)# ntp server ip-address key key-number
R1(config)# ntp peer ip-address key key-number
```