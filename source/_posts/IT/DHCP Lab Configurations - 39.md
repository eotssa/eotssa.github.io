---
title: DHCP Lab Configurations
date: 2024-03-31 15:06:54
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240331150841.png)

1. Configure the following DHCP pools on R2:
POOL1: 192.168.1.0/24 (reserve .1 to .10)
     DNS 8.8.8.8
     Domain: jeremysitlab.com
     Default Gateway: R1
POOL2: 192.168.2.0/24 (reserve .1 to .10)
     DNS 8.8.8.8
     Domain: jeremysitlab.com
     Default Gateway: R2
POOL3: 203.0.113.0/30 (reserve .1)

2. Configure R1's G0/0 interface as a DHCP client.
    What IP address did it configure?

3. Configure R1 as a DHCP relay agent for the 192.168.1.0/24 subnet.
 
4. Use the CLI of PC1 and PC2 to make them request an IP address 
    from their DHCP server.

```
R2(config)#ip dhcp ?
  excluded-address  Prevent DHCP from assigning certain addresses
  pool              Configure DHCP address pools
  relay             DHCP relay agent parameters
R2(config)#ip dhcp ex
R2(config)#ip dhcp excluded-address 192.168.1.1 192.168.1.10
R2(config)#ip dhcp excluded-address 192.168.2.1 192.168.2.10
R2(config)#ip dhcp excluded-address 203.0.113.1
R2(config)#
R2(config)#ip dhcp pool POOL1
R2(dhcp-config)#network 192.168.1.0 ?
  A.B.C.D  Network mask
R2(dhcp-config)#network 192.168.1.0 255.255.255.0
R2(dhcp-config)#dns-server 8.8.8.8
R2(dhcp-config)#domain-name eotssa.com
R2(dhcp-config)#default-router 192.168.1.1
R2(dhcp-config)#
R2(dhcp-config)#
R2(dhcp-config)#ip dhcp pool POOL2
R2(dhcp-config)#network 192.168.2.0 255.255.255.0
R2(dhcp-config)#dns-server 8.8.8.8
R2(dhcp-config)#domain
R2(dhcp-config)#domain-name eotssa.com
R2(dhcp-config)#default
R2(dhcp-config)#default-router 192.168.2.1
R2(dhcp-config)#
R2(dhcp-config)#ip dhcp pool POOL3
R2(dhcp-config)#network 203.0.113.0 255.255.255.252
R2(dhcp-config)#
R2(dhcp-config)#
R2(dhcp-config)#do sh run | section dhcp
ip dhcp excluded-address 192.168.1.1 192.168.1.10
ip dhcp excluded-address 192.168.2.1 192.168.2.10
ip dhcp excluded-address 203.0.113.1
ip dhcp pool POOL1
 network 192.168.1.0 255.255.255.0
 default-router 192.168.1.1
 dns-server 8.8.8.8
 domain-name eotssa.com
ip dhcp pool POOL2
 network 192.168.2.0 255.255.255.0
 default-router 192.168.2.1
 dns-server 8.8.8.8
 domain-name eotssa.com
ip dhcp pool POOL3
 network 203.0.113.0 255.255.255.252
R2(dhcp-config)#
```

Get an IP address on R2

```
C:\>ipconfig /renew

   IP Address......................: 192.168.2.11
   Subnet Mask.....................: 255.255.255.0
   Default Gateway.................: 192.168.2.1
   DNS Server......................: 8.8.8.8

C:\>ipconfig /all

FastEthernet0 Connection:(default port)

   Connection-specific DNS Suffix..: eotssa.com
   Physical Address................: 00E0.B087.76E5
   Link-local IPv6 Address.........: FE80::2E0:B0FF:FE87:76E5
   IPv6 Address....................: ::
   IPv4 Address....................: 192.168.2.11
   Subnet Mask.....................: 255.255.255.0
   Default Gateway.................: ::
                                     192.168.2.1
   DHCP Servers....................: 192.168.2.1
   DHCPv6 IAID.....................: 
   DHCPv6 Client DUID..............: 00-01-00-01-5A-4B-7A-84-00-E0-B0-87-76-E5
   DNS Servers.....................: ::
                                     8.8.8.8

Bluetooth Connection:

   Connection-specific DNS Suffix..: eotssa.com
   Physical Address................: 00E0.8F72.3438
   Link-local IPv6 Address.........: ::
 --More-- 
```

## 2. Configure R1's G0/0 interface as a DHCP client.
    What IP address did it configure?
```
R1(config)#int g0/0
R1(config-if)#ip address dhcp
R1(config-if)#do show ip int
GigabitEthernet0/0 is administratively down, line protocol is down (disabled)
  Internet protocol processing disabled
GigabitEthernet0/1 is up, line protocol is up (connected)
  Internet address is 192.168.1.1/24
  Broadcast address is 255.255.255.255
  Address determined by setup command
  MTU is 1500 bytes
  Helper address is not set
  Directed broadcast forwarding is disabled
  Outgoing access list is not set
  Inbound  access list is not set
  Proxy ARP is enabled
  Security level is default
  Split horizon is enabled
  ICMP redirects are always sent
  ICMP unreachables are always sent
  ICMP mask replies are never sent
  IP fast switching is disabled
  IP fast switching on the same interface is disabled
  IP Flow switching is disabled
  IP Fast switching turbo vector
  IP multicast fast switching is disabled

R1(config-if)#do show ip int g0/0
GigabitEthernet0/0 is administratively down, line protocol is down (disabled)
  Internet protocol processing disabled

R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up

%DHCP-6-ADDRESS_ASSIGN: Interface GigabitEthernet0/0 assigned DHCP address 203.0.113.2, mask 255.255.255.252, hostname R1

R1(config-if)#do sh ip int g0/0
GigabitEthernet0/0 is up, line protocol is up (connected)
  Internet address is 203.0.113.2/30
  Broadcast address is 255.255.255.255
  Address determined by DHCP
  MTU is 1500 bytes
  Helper address is not set
  Directed broadcast forwarding is disabled
  Outgoing access list is not set
  Inbound  access list is not set
  Proxy ARP is enabled
  Security level is default
  Split horizon is enabled
  ICMP redirects are always sent
  ICMP unreachables are always sent
  ICMP mask replies are never sent
  IP fast switching is disabled
  IP fast switching on the same interface is disabled
  IP Flow switching is disabled
  IP Fast switching turbo vector
  IP multicast fast switching is disabled
  IP multicast distributed fast switching is disabled
  Router Discovery is disabled
```


##  3. Configure R1 as a DHCP relay agent for the 192.168.1.0/24 subnet.

```
R1(config-if)#int g0/1
R1(config-if)#ip helper-address 203.0.113.1
```

Configured.

Now let's see if PC1 can get an IP address from R2 via R1. 

```
C:\>ipconfig /renew
DHCP request failed. 

C:\>ipconfig /renew

   IP Address......................: 192.168.1.12
   Subnet Mask.....................: 255.255.255.0
   Default Gateway.................: 192.168.1.1
   DNS Server......................: 8.8.8.8

C:\>ipconfig /all

FastEthernet0 Connection:(default port)

   Connection-specific DNS Suffix..: eotssa.com
   Physical Address................: 0030.F238.8690
   Link-local IPv6 Address.........: FE80::230:F2FF:FE38:8690
   IPv6 Address....................: ::
   IPv4 Address....................: 192.168.1.12
   Subnet Mask.....................: 255.255.255.0
   Default Gateway.................: ::
                                     192.168.1.1
   DHCP Servers....................: 203.0.113.1
   DHCPv6 IAID.....................: 
   DHCPv6 Client DUID..............: 00-01-00-01-94-AE-8E-6C-00-30-F2-38-86-90
   DNS Servers.....................: ::
                                     8.8.8.8
```
