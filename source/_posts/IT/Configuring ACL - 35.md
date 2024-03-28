---
title: Configuring ACL
date: 2024-03-26 17:32:59
tags: 
categories:
  - IT
---
1. allow all traffic
```
R1(config-ext-nacl)#permit ip any any
```

2. prevent 10.0.0.16 from sending udp traffic to 192.168.1.1/32
```
R1(config-ext-nacl)#deny udp 10.0.0.16 0.0.0.0 host 192.168.1.1
```

3. prevent 127.0.0.1/32 from pinging hosts in 192.168.0.1/24
```
R1(config-ext-nacl)#deny icmp host 127.0.0.1 192.168.0.0 0.0.0.255
```

---

1. Allow traffic from 10.0.0.0/16 to access the server at 2.2.2.2 using https.
```
R1(config-ext-nacl)#permit tcp 10.0.0.0 0.0.255.255 2.2.2.2 0.0.0.0 eq 443
```


2. Prevent all hosts using source udp port numbers from 20000 to 30000 from accessing the server at 3.3.3.32.

```
R1(config-ext-nacl)#deny udp any range 20000 30000 host 3.3.3.3
```

3. Allow hosts in 172.16.1.0/24 using a TCP source port greater than 9999 to access all TCP ports on server 4.4.4.4 except port 23.

```
R1(config-ext-nacl)#permit tcp 172.16.1.0 0.0.0.255 gt 9999 host 4.4.4.4 neq 23
```

---

![](../../images/Pasted%20image%2020240326173642.png)

Requirements:
  - Hosts in 192.168.1.0/24 can't use HTTPS to access SRV1.
  - Hosts in 192.168.2.0/24 can't access 10.0.2.0/24.
  - None of the hosts in 192.168.1.0/24 or 192.168.2.0/24 can ping 10.0.1.0/24 or 10.0.2.0/24.

Hosts in 192.168.1.0/24 can't use HTTPS to access SRV1.
```
R1(config)#ip access-list extended HTTP_SRV1
R1(config-ext-nacl)#deny tcp 192.168.1.0 0.0.0.255 host 10.0.1.00 eq 443
R1(config-ext-nacl)#permit ip any any
R1(config-ext-nacl)#
R1(config-ext-nacl)#int g0/1
R1(config-if)#ip access-group HTTP_SRV1 in
```

Hosts in 192.168.2.0/24 can't access 10.0.2.0/24.
```
R1(config)#ip access-list extended BLOCK_10.0.2.0/24
R1(config-ext-nacl)#deny ip 192.168.2.0 255.255.255.0 10.0.2.0 255.255.255.0
R1(config-ext-nacl)#permit ip any any 
R1(config-ext-nacl)#
R1(config-ext-nacl)#int g0/2
R1(config-if)#ip access-group BLOCK_10.0.2.0/24 in
```


None of the hosts in 192.168.1.0/24 or 192.168.2.0/24 can ping 10.0.1.0/24 or 10.0.2.0/24.

```
R1(config)#ip access-list extended BLOCK_PING_SRV1_SRV2
R1(config-ext-nacl)#deny icmp 192.168.1.0 255.255.255.0 10.0.1.0 255.255.255.0
R1(config-ext-nacl)#deny icmp 192.168.1.0 255.255.255.0 10.0.2.0 255.255.255.0
R1(config-ext-nacl)#deny icmp 192.168.2.0 255.255.255.0 10.0.1.0 255.255.255.0
R1(config-ext-nacl)#deny icmp 192.168.2.0 255.255.255.0 10.0.2.0 255.255.255.0
R1(config-ext-nacl)#permit ip any any
R1(config-ext-nacl)#int g0/0
R1(config-if)#ip access-group BLOCK_PING_SRV1_SRV2 out
```

---

![](../../images/Pasted%20image%2020240326220257.png)

1. Configure extended ACLS to fulfill the following network policies:
      -Hosts in 172.16.2.0/24 can't communicate with PC1.
      -Hosts in 172.16.1.0/24 can't access the DNS service on SRV1.
      -Hosts in 172.16.2.0/24 can't access the HTTP or HTTPS services on SRV2.


1st and 3rd Requirement: 
```
R1(config)#ip access-list extended 101
R1(config-ext-nacl)#deny ip 172.16.2.0 0.0.0.255 host 172.16.1.1
R1(config-ext-nacl)#deny ip 172.16.2.0 0.0.0.255 ?
  A.B.C.D  Destination address
  any      Any destination host
  host     A single destination host
R1(config-ext-nacl)#deny tcp 172.16.2.0 0.0.0.255 192.168.2.100 eq 80
                                                                ^
% Invalid input detected at '^' marker.
	
R1(config-ext-nacl)#deny tcp 172.16.2.0 0.0.0.255 host 192.168.2.100 eq 80
R1(config-ext-nacl)#deny tcp 172.16.2.0 0.0.0.255 host 192.168.2.100 eq 443
R1(config-ext-nacl)#permit ip any any
R1(config-ext-nacl)#int g0/1
R1(config-if)#ip access-group 101 in
R1(config-if)#
```


2nd requirement: Hosts in 172.16.1.0/24 can't access the DNS service on SRV1.
 ```
R1(config)#ip access-list extended 100
R1(config-ext-nacl)#deny udp 172.16.1.0 0.0.0.255 host 192.168.1.100 eq 53
R1(config-ext-nacl)#deny tcp 172.16.1.0 0.0.0.255 host 192.168.1.100 eq 53
R1(config-ext-nacl)#permit ip any any
R1(config-ext-nacl)#exit
R1(config)#int g0/0
R1(config-if)#ip ?
  access-group     Specify access control for packets
  address          Set the IP address of an interface
  authentication   authentication subcommands
  flow             NetFlow Related commands
  hello-interval   Configures IP-EIGRP hello interval
  helper-address   Specify a destination address for UDP broadcasts
  mtu              Set IP Maximum Transmission Unit
  nat              NAT interface commands
  ospf             OSPF interface commands
  proxy-arp        Enable proxy ARP
  split-horizon    Perform split horizon
  summary-address  Perform address summarization
R1(config-if)#ip access-group 100 in
R1(config-if)#
```

```
R1#show access-lists 
Extended IP access list 100
    10 deny udp 172.16.1.0 0.0.0.255 host 192.168.1.100 eq domain
    20 deny tcp 172.16.1.0 0.0.0.255 host 192.168.1.100 eq domain
    30 permit ip any any
Extended IP access list 101
    10 deny ip 172.16.2.0 0.0.0.255 host 172.16.1.1
    20 deny tcp 172.16.2.0 0.0.0.255 host 192.168.2.100 eq www (37 match(es))
    30 deny tcp 172.16.2.0 0.0.0.255 host 192.168.2.100 eq 443
    40 permit ip any any (2 match(es))
```