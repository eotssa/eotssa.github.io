---
title: QoS Configurations
date: 2024-04-04 22:11:43
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240404221212.png)

Configure the following QoS settings on R1
and apply them outbound on interface G0/0/0:

1. Mark HTTPS traffic as AF31
*--Provide minimum 10% bandwidth as a priority queue

2. Mark HTTP traffic as AF32
*--Provide minimum 10% bandwidth

3. Mark ICMP traffic as CS2
*--Provide minimum 5% bandwidth

4. Use simulation mode to view the DSCP markings of packets:
   -when pinging jeremysitlab.com from PC1
   -when accessing jeremysitlab.com from PC1 via HTTP
   -when accessing jeremysitlab.com from PC1 via HTTPS

---

Initial traffic when pinging server 1 10.0.0.100, when examined, shows that its IP header has a DSCP value of 0x00. This is because QoS has not yet been configured.
## 1. Mark HTTPS traffic as AF31
*--Provide minimum 10% bandwidth as a priority queue

Create a class map to identify HTTP traffic.

```
R1(config)#class-map ?
  WORD       class-map name
  match-all  Logical-AND all matching statements under this classmap
  match-any  Logical-OR all matching statements under this classmap
  type       type of the class-map
R1(config)#class-map HTTPS_MAP
R1(config-cmap)#match protocol ?
  arp     IP ARP
  bgp     Border Gateway Protocol
  cdp     Cisco Discovery Protocol
  dhcp    Dynamic Host Configuration
  dns     Domain Name Server lookup
  eigrp   Enhanced Interior Gateway Routing Protocol
  ftp     File Transfer Protocol
  gre     Generic Routing Encapsulation
  h323    H323 Protocol
  http    Hypertext Transfer Protocol
  https   Secure Hypertext Transfer Protocol
  icmp    ICMP
  ip      IP
  ipsec   IP Security Protocol (ESP/AH)
  ipv6    IPV6
  ntp     Network Time Protocol
  ospf    Open Shortest Path First
  pop3    Post Office Protocol
  rip     Routing Information Protocol
  rtp     Real Time Protocol
  skinny  Skinny Call Control Protocol
  smtp    Simple Mail Transfer Protocol

R1(config-cmap)#match protocol https
```


```
R1(config)#policy ?
  WORD  policy-map name
  type  type of the policy-map
R1(config)#policy-map ?
  WORD  policy-map name
  type  type of the policy-map
R1(config)#policy-map G0/0/0_OUT
R1(config-pmap)#?
  class  policy criteria
  exit   Exit from policy-map configuration mode
  no     Negate or set default values of a command
R1(config-pmap)#class HTTPS_MAP
R1(config-pmap-c)#?
  bandwidth       Bandwidth
  exit            Exit from class action configuration mode
  no              Negate or set default values of a command
  priority        Strict Scheduling Priority for this Class
  queue-limit     Queue Max Threshold for Tail Drop
  random-detect   Enable Random Early Detection as drop policy
  service-policy  Configure Flow Next
  set             Set QoS values
  shape           Traffic Shaping
R1(config-pmap-c)#set ip dscp ?
  <0-63>   Differentiated services codepoint value
  af11     Match packets with AF11 dscp (001010)
  af12     Match packets with AF12 dscp (001100)
  af13     Match packets with AF13 dscp (001110)
  af21     Match packets with AF21 dscp (010010)
  af22     Match packets with AF22 dscp (010100)
  af23     Match packets with AF23 dscp (010110)
  af31     Match packets with AF31 dscp (011010)
  af32     Match packets with AF32 dscp (011100)
  af33     Match packets with AF33 dscp (011110)
  af41     Match packets with AF41 dscp (100010)
  af42     Match packets with AF42 dscp (100100)
  af43     Match packets with AF43 dscp (100110)
  cs1      Match packets with CS1(precedence 1) dscp (001000)
  cs2      Match packets with CS2(precedence 2) dscp (010000)
  cs3      Match packets with CS3(precedence 3) dscp (011000)
  cs4      Match packets with CS4(precedence 4) dscp (100000)
  cs5      Match packets with CS5(precedence 5) dscp (101000)
  cs6      Match packets with CS6(precedence 6) dscp (110000)
  cs7      Match packets with CS7(precedence 7) dscp (111000)
  default  Match packets with default dscp (000000)
  ef       Match packets with EF dscp (101110)

R1(config-pmap-c)#set ip dscp af31
R1(config-pmap-c)#priority ?
  <8-2000000>  Kilo Bits per second
  percent      % of total bandwidth
R1(config-pmap-c)#priority percent 10
```

## 2. Mark HTTP traffic as AF32
*--Provide minimum 10% bandwidth

```
R1(config)#class-map HTTP_MAP
R1(config-cmap)#match protocol ?
  arp     IP ARP
  bgp     Border Gateway Protocol
  cdp     Cisco Discovery Protocol
  dhcp    Dynamic Host Configuration
  dns     Domain Name Server lookup
  eigrp   Enhanced Interior Gateway Routing Protocol
  ftp     File Transfer Protocol
  gre     Generic Routing Encapsulation
  h323    H323 Protocol
  http    Hypertext Transfer Protocol
  https   Secure Hypertext Transfer Protocol
  icmp    ICMP
  ip      IP
  ipsec   IP Security Protocol (ESP/AH)
  ipv6    IPV6
  ntp     Network Time Protocol
  ospf    Open Shortest Path First
  pop3    Post Office Protocol
  rip     Routing Information Protocol
  rtp     Real Time Protocol
  skinny  Skinny Call Control Protocol
  smtp    Simple Mail Transfer Protocol

R1(config-cmap)#match protocol http
```

## 3. Mark ICMP traffic as CS2
*--Provide minimum 5% bandwidth

```
R1(config)#class-map ICMP_MAP
R1(config-cmap)#?
  description  Class-Map description
  exit         Exit from class-map configuration mode
  match        classification criteria
  no           Negate or set default values of a command
R1(config-cmap)#match protocol ?
  arp     IP ARP
  bgp     Border Gateway Protocol
  cdp     Cisco Discovery Protocol
  dhcp    Dynamic Host Configuration
  dns     Domain Name Server lookup
  eigrp   Enhanced Interior Gateway Routing Protocol
  ftp     File Transfer Protocol
  gre     Generic Routing Encapsulation
  h323    H323 Protocol
  http    Hypertext Transfer Protocol
  https   Secure Hypertext Transfer Protocol
  icmp    ICMP
  ip      IP
  ipsec   IP Security Protocol (ESP/AH)
  ipv6    IPV6
  ntp     Network Time Protocol
  ospf    Open Shortest Path First
  pop3    Post Office Protocol
  rip     Routing Information Protocol
  rtp     Real Time Protocol
  skinny  Skinny Call Control Protocol
  smtp    Simple Mail Transfer Protocol
  snmp    Simple Network Management Protocol
  ssh     Secured Shell
  syslog  System Logging Utility
  tcp     TCP
  telnet  Telnet

R1(config-cmap)#match protocol icmp
```

We set the QoS via a policy-map as follows; with the type of dscp and priority.

```
R1(config)#do sh run | section class-map
class-map match-all HTTPS_MAP
 match protocol https
class-map match-all HTTP_MAP
 match protocol http
class-map match-all ICMP_MAP
 match protocol icmp
R1(config)#policy ?
  WORD  policy-map name
  type  type of the policy-map
R1(config)#policy-map ?
  WORD  policy-map name
  type  type of the policy-map
R1(config)#policy-map G0/0/0_OUT
R1(config-pmap)#?
  class  policy criteria
  exit   Exit from policy-map configuration mode
  no     Negate or set default values of a command
R1(config-pmap)#class HTTPS_MAP
R1(config-pmap-c)#?
  bandwidth       Bandwidth
  exit            Exit from class action configuration mode
  no              Negate or set default values of a command
  priority        Strict Scheduling Priority for this Class
  queue-limit     Queue Max Threshold for Tail Drop
  random-detect   Enable Random Early Detection as drop policy
  service-policy  Configure Flow Next
  set             Set QoS values
  shape           Traffic Shaping
R1(config-pmap-c)#set ip dscp ?
  <0-63>   Differentiated services codepoint value
  af11     Match packets with AF11 dscp (001010)
  af12     Match packets with AF12 dscp (001100)
  af13     Match packets with AF13 dscp (001110)
  af21     Match packets with AF21 dscp (010010)
  af22     Match packets with AF22 dscp (010100)
  af23     Match packets with AF23 dscp (010110)
  af31     Match packets with AF31 dscp (011010)
  af32     Match packets with AF32 dscp (011100)
  af33     Match packets with AF33 dscp (011110)
  af41     Match packets with AF41 dscp (100010)
  af42     Match packets with AF42 dscp (100100)
  af43     Match packets with AF43 dscp (100110)
  cs1      Match packets with CS1(precedence 1) dscp (001000)
  cs2      Match packets with CS2(precedence 2) dscp (010000)
  cs3      Match packets with CS3(precedence 3) dscp (011000)
  cs4      Match packets with CS4(precedence 4) dscp (100000)
  cs5      Match packets with CS5(precedence 5) dscp (101000)
  cs6      Match packets with CS6(precedence 6) dscp (110000)
  cs7      Match packets with CS7(precedence 7) dscp (111000)
  default  Match packets with default dscp (000000)
  ef       Match packets with EF dscp (101110)

R1(config-pmap-c)#set ip dscp af31
R1(config-pmap-c)#priority ?
  <8-2000000>  Kilo Bits per second
  percent      % of total bandwidth
R1(config-pmap-c)#priority percent 10
R1(config-pmap-c)#
R1(config-pmap-c)#
R1(config-pmap)#class HTTP_MAP
R1(config-pmap-c)#set ip dscp af32
R1(config-pmap-c)#priority percent 10
R1(config-pmap-c)#
R1(config-pmap-c)#class ICMP_MAP
R1(config-pmap-c)#set ip dscp cs2
R1(config-pmap-c)#priority percent 5
R1(config-pmap-c)#
```

Check our policy map
```
R1#sh running | sect policy-map
policy-map G0/0/0_OUT
 class HTTPS_MAP
  priority percent 10
  set ip dscp af31
 class HTTP_MAP
  priority percent 10
  set ip dscp af32
 class ICMP_MAP
  priority percent 5
  set ip dscp cs2
R1#
```

Now apply it to G0/0/0 via `service-policy`

```
R1(config)#int g0/0/0
R1(config-if)#service
R1(config-if)#service-policy ?
  input   Assign policy-map to the input of an interface
  output  Assign policy-map to the output of an interface
R1(config-if)#service-policy output G0/0/0_OUT
```

If we ping 10.0.0.100, the outbound PDU details in R1 should indicate DSCP:0x10, which is decimal 16. 

This is correct because we configured ICMP to be DSCP: CS2 => 16