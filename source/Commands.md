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

Configure NTP servers to connect
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

//Configure R1 as a server by using `ntp source
R1(config)#ntp source loopback0
```

R2 is as follows:
```
R1(config)#ntp server 10.1.1.1
R1(config)#do show ntp associations
R1(config)#do show ntp status
```

NTP Configuration even when there is no external server; Set peers.
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

## DNS
Window DNS Commands

```
ipconfig /all 
nslookup NAME
ipconfig /displaydns
ipconfig /flushdns
ping ip-address -n NUMBER
```

Configuring R1 as a DNS server -and- client 
```
//Configures router to act as a DNS server
R1(config)#ip dns server

//Build a host table 
R1(config)#ip host R1 192.168.0.1
R1(config)#ip host PC1 192.168.0.101
R1(config)#ip host PC2 192.168.0.102
R1(config)#ip host PC3 192.168.0.103

//Configure an external server. After checking its own server, it'll query the external DNS. 
R1(config)#ip name-server 8.8.8.8

//Configures R1 to act as a DNS client
//Enables R1 to perform DNS queries; enabled by default. 
R1(config)#ip domain lookup
```

```
R1#show hosts
```

Set the domain name
```
//e.g., ping pc1 => ping pc1.NAME.COM
R1(config)#ip domain name NAME.COM
```

## DHCP

```
ipconfig /release 

// DHCP discover, DHCP Offer, DHCP Request, DHCP Ack (DORA)
ipconfig /renew 
```

DHCP Sever Configuration in IOS
```
//Specify a range of addresses that won't be given to DHCP clients
R1(config)#ip dhcp excluded-address 192.168.1.1 192.168.1.10

//Create DHCP pool (subnet of address that can be assigned to DHCP clients)
R1(config)#ip dhcp pool LAB_POOL 

//Configure range of pools to be assigned 
R1#(dhcp-config)#network ?
	/nn or A.B.C.D Network mask or prefix length
	<cr>
R1(dhcp-config)#network 192.168.1.0/24

//Configure the DNS server the client should use 
R1(dhcp-config)#dns-server 8.8.8.8 

//Configure domain name of the network; tells all DHCP clients that it's inside this domain
R1(dhcp-config)#domain-name EXAMPLE.COM

//Default gateway - tells clients to use this 
R1(dhcp-config)#default-router 192.168.1.1 

//lease DAYS HOURS MINUTES or lease infinite 
R1(dhcp-config)#lease 0 5 30 
```

Show Configurations
```
R1#show ip dhcp binding
```

DHCP Replay Agent Configuration
```
//Configure the interface connected to the subnet of the client devices
R1(config)#interface g0/1

//Configure the IP address of the DHCP server as the 'helper' address (the actual address of the DHCP server) + ensure the relay agent has a route to the DHCP server 
R1(config-if)#ip helper-address 192.168.10.10

R1(config-if)#do show ip interface g0/1
	GigabitEthernet0/1 is up, line protocol is up
	Internet address is 192.168.1.1/24
	Broadcast address is 255.255.255.255
	Address determined by non-volatile memory
	MTU is 1500 bytes
	Helper address is 192.168.10.10      // CHECK HERE
	
[output omitted]
```

DHCP Client (Use of DHCP to Configure the IP address of its interfaces); rare
```
//Choose the interface
R2(config)#interface g0/1

//Enable it. That's it. 
R2(config-if)#ip address dhcp

R2(config-if)#do sh ip interface g0/1
	GigabitEthernet0/1 is up, line protocol is up
	Internet address is 192.168.10.1/24
	Broadcast address is 255.255.255.255
	Address determined by DHCP          // HERE 
[output omitted]
```

![](images/Pasted%20image%2020240329222238.png)

## SNMPv2c Configurations (N)
```
//Optional Information 
R1(config)#snmp-server contact EMAIL/NUMBER/ETC
R1(config)#snmp-server location STRING

//Configure the SNMP community strings (passwords); ro = read only, rw = write only 
R1(config)#snmp-server community Jeremy1 ro                 
R1(config)#snmp-server community Jeremy2 rw                  
                                                             

//Specify address, NMS, version, and community (which dictates function)
R1(config)#snmp-server host 192.168.1.1 version 2c Jeremy1

//Specify traps; interface up or down traps, and config traps (notify)
R1(config)#snmp-server enable traps snmp linkdown linkup
R1(config)#snmp-server enable traps config
```



## Syslog (N)

Enable logging on different systems
```
//configure logging into the console line (can use number or keyword (informational)) -- enables for gt 6
R1(config)#logging console SEVERITY

//configure logging to the vty lines
R1(config)#logging monitor SEVERITY
R1(config)#terminal monitor     // enables Syslog messages in SSH or Telnet; required per connection 

//configure logging to the buffer
R1(config)#logging buffered SIZE SEVERITY

//configure logging to an external server // both commands are same
R1(config)#logging SERVER-IP
OR 
R1(config)#logging host SERVER-IP

R1(config)#logging trap SEVERITY         // specifies the level of logging on external server
```

QOL Configurations
```
//prevents logs from truncating current typing
R1(config)#line console 0
R1(config-line)#logging sycnhronous
```

Service timestamps/Service sequence numbers
```
//Configure and enable the timestamp
R1(config)#service timestamps log [datetime / uptime]

//Enable sequence numbers
R1(config)#service sequence-numbers
```


## SSH, Console Line, Telnet

Console Port Security - login 
```
R1(config)#line console 0
R1(config-line)#password PASSWORD
R1(config-line)#login                  // required to tell user to enter the configured pwd
R1(config-line)#end
R1#exit

R1 con0 is now available
Press RETURN to get started.

User Access Verification
Password:
R1>
```

Console Port Security - login local
```
R1(config)#username NAME secret PASSWORD
R1(config)#line console 0
R1(config-line)#login local             // requires device to require a user and pwd to login. 
R1(config-line)#end
R1#exit

R1 con0 is now available
Press RETURN to get started.
User Access Verification
Username: NAME
Password:
R1>
```

Log the user out after X amount of inactivity
```
line con 0 
exec-timeout MINUTE SECOND 
```

### Layer 2 Switch - IP management
![](images/Pasted%20image%2020240402201939.png)

Assign an IP address to an SVI to allow remote connections to the CLI of the switch. 
Recall switches do not have a routing table, and are not routing IP aware. 
```
SW1(config)#interface vlan1
SW1(config-if)#ip address 192.168.1.253 255.255.255.0
SW1(config-if)#no shutdown

SW1(config-if)#exit

SW1(config)#ip default-gateway 192.168.1.254           // if not in the same LAN, send to a router 
```


### Telnet Configuration

```
//Required for telnet 
SW1(config)#enable secret PASSWORD
//Optional: 
SW1(config)#username NAME secret PASSWORD

//Optional: configure ACL to limit which devices can connect to VTY lines
SW1(config)#access-list 1 permit host 192.168.2.1    

//Telnet/SSH is configured on VTY lines; 16 lines available, so 16 users can be connected at once. 
SW1(config)#line vty 0 15                //recommended so all lines have same config

//typical access configuration
SW1(config-line)#login local
SW1(config-line)#exec-timeout 50

//transport input ? -- specifies certain types of connections 
SW1(config-line)#transport input telnet

//Optional: apply ACL to VTY lines only *note the access-class*
SW1(config-line)#access-class 1 in
```


### SSH

Check SSH Support
```
// check ios image name for K9; NPE ISO images to countries with encryption restrictions
show version 

// will tell you if it's supported here
show ip ssh
```

Generate RSA Keys
- Must configure router host name and domain name. 
```
//First, configure the domain name has RSA keys require the FQDN (host + domain) to generate
SW1(config)#ip domain name EXAMPLE.COM

//Generate key (will be SW1.EXAMPLE.COM), choose size of the key (2048)
SW1(config)#crypto key generate rsa
//cryto key generate rsa modulus LENGTH // alternative 

```

Configure SSH
```
//Configure secret, username, and ACL (optional)
SW1(config)#enable secret PASSWORD
SW1(config)#username NAME secret PASSWORD2
SW1(config)#access-list 1 permit host IP-ADDRESS

//optional, recommended
SW1(config)#ip ssh version 2

//Used to access all 16 VTY lines 
SW1(config)#line vty 0 15

//Only login local works (unlike Telnet)
SW1(config-line)#login local

//Configure timeout (optional)
SW1(config-line)#exec-timeout 50

//Limit the VTY line connection to SSH only, recommended. 
SW1(config-line)#transport input ssh

//Apply ACL to all VTY lines (not input or output)
SW1(config-line)#access-class 1 in
```

Connect via SSH
```
ssh -l USERNAME IP-ADDRESS 

OR

ssh USERNAME@IP-ADDRESS
```

## FTP and TFTP


TFTP: Upgrading Cisco ISO

```
//Check version, see crytographic support, etc
R1#show version

//view contents of flash 
R1#show flash 

//How to copy file from TFTP
R1#copy tftp: flash:
Address or name of remote host []? ENTER THE TFTP SERVER IP
Source filename []? ENTER NAME OF DESIRED FILE
Destination filename []? Enter name you want //(default: same name as in server)

R1(config)#boot system flash:NAME_OF_FILE  // default - use first IOS file it finds 
R1(config)#exit
R1#write memory               // SAVE CONFIGURATION
R1#reload                     // restarts device
R1#show version               // ensure version is correct, no issues
R1#delete flash:FILE_PATH     // delete filepath

```


FTP: Copying Files 
```
//Configure username and password R1 will use when connecting to FTP server
R1(config)#ip ftp username cisco

R1(config)#ip ftp password cisco

R1(config)#exit
R1#copy ftp: flash:
Address or name of remote host []? ENTER THE TFTP SERVER IP
Source filename []? ENTER NAME OF DESIRED FILE
Destination filename []? Enter name you want //(default: same name as in server)

//Rest is same as TFTP
```



## NAT 

### Static Nat 
Static NATs are a 1 to 1 mapping. 
```
//Define the 'inside' interface(s) connected to the internal network
R1(config)#int g0/1
R1(config-if)#ip nat inside

//Define the 'outside' interface(s) connected to the external network. 
R1(config-if)#int g0/0
R1(config-if)#ip nat outside
R1(config-if)#exit

//Configure the one-to-one IP address mappings; `ip nat inside sorce static INSIDE-LOCAL-IP INSIDE-GLOBAL-IP`
R1(config)#ip nat inside source static INSIDE-LOCAL-IP INSIDE-GLOBAL-IP
R1(config)#ip nat inside source static INSIDE-LOCAL-IP INSIDE-GLOBAL-IP
R1(config)#exit
```

```
//Show NAT translations
R1#show ip nat translations 

//Clear all NAT translations; only clears dynamic, not static
R1#clear ip nat translations

//
R1#show ip nat statistics
```

### Dynamic NAT Configuration
Configure Dynamic NAT

```
//Define the 'inside' interface(s) connected to the internal network
R1(config)#int g0/1
R1(config-if)#ip nat inside

//Define the 'outside' interface(s) connected to the external network. 
R1(config-if)#int g0/0
R1(config-if)#ip nat outside
R1(config-if)#exit

//Define ACL for NAT; if not applied to an interface, it will NOT drop packets if no match. 
R1(config)#access-list 1 permit IP-ADDRESS WILDCARD-MASK

//Define Pool of isnide global IP addresses
R1(config)#ip nat pool pool-name start-ip end-ip [prefix-length prefix-length | netmask subnet-mask]

//Map the ACL to the Pool
R1(config)#ip nat inside source list 1 pool POOL1
```

### PAT (NAT Overload)

Configure PAT (almost same as Dynamic NAT with 1 difference: `overload`)

```
//Define the 'inside' interface(s) connected to the internal network
R1(config)#int g0/1
R1(config-if)#ip nat inside

//Define the 'outside' interface(s) connected to the external network. 
R1(config-if)#int g0/0
R1(config-if)#ip nat outside
R1(config-if)#exit

//Define ACL for NAT; if not applied to an interface, it will NOT drop packets if no match. 
R1(config)#access-list 1 permit IP-ADDRESS WILDCARD-MASK

//Define Pool of isnide global IP addresses
R1(config)#ip nat pool pool-name start-ip end-ip [prefix-length prefix-length | netmask subnet-mask]

//Map the ACL to the Pool
R1(config)#ip nat inside source list 1 pool POOL1 overload
```

More common way to configure PAT

```
//Define the 'inside' interface(s) connected to the internal network
R1(config)#int g0/1
R1(config-if)#ip nat inside

//Define the 'outside' interface(s) connected to the external network. 
R1(config-if)#int g0/0
R1(config-if)#ip nat outside
R1(config-if)#exit

//Define ACL for NAT; if not applied to an interface, it will NOT drop packets if no match. 
R1(config)#access-list 1 permit IP-ADDRESS WILDCARD-MASK

//Instead of specifying a pool and overload, just specify interface and overload 
R1(config)#ip nat inside source list 1 interface INTERFACE-ID overload

```

## QoS | PoE and VoIP

```

```