---
title: SSH Configuration
date: 2024-04-02 21:25:19
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240402213040.png)


SW2 has been newly added to the network, but has not yet been configured.  

1.Connect Laptop1 to SW2's console port to perform the following configurations:
Host name: SW2
Enable secret: ccna
Username/PW: jeremy/ccna
VLAN1 SVI: 192.168.2.253/24
Default gateway: R2

2. Configure the following console line security settings on SW2:
Authentication: Local user
Exec timeout: 5 minutes

3. Configure SW2 for remote access via SSH:
Domain name: jeremysitlab.com
RSA key size: 2048 bits
Authentication: Local user
Exec timeout: 5 minutes
Protocols: SSH only
+Limit access to PC1 ONLY


## 1.Connect Laptop1 to SW2's console port to perform the following configurations:
Host name: SW2
Enable secret: ccna

```
Switch>en
Switch#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
Switch(config)#host SW2
SW2(config)#
SW2(config)#
SW2(config)#
SW2(config)#enabl
SW2(config)#enable sec
SW2(config)#enable secret ccna
```

Username/PW: jeremy/ccna
```
SW2(config)#username jeremy secret ccna
```

VLAN1 SVI: 192.168.2.253/24
```
SW2(config)#int ?
  Ethernet         IEEE 802.3
  FastEthernet     FastEthernet IEEE 802.3
  GigabitEthernet  GigabitEthernet IEEE 802.3z
  Port-channel     Ethernet Channel of interfaces
  Vlan             Catalyst Vlans
  range            interface range command
SW2(config)#int vlan 1 ?
  <cr>
SW2(config)#int vlan 1
SW2(config-if)#?
Interface configuration commands:
  arp          Set arp type (arpa, probe, snap) or timeout
  description  Interface specific description
  exit         Exit from interface configuration mode
  ip           Interface Internet Protocol config commands
  no           Negate a command or set its defaults
  shutdown     Shutdown the selected interface
  standby      HSRP interface configuration commands
SW2(config-if)#ip address 192.168.2.253 255.255.255.0
SW2(config-if)#no shutdown

SW2(config-if)#
%LINK-5-CHANGED: Interface Vlan1, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface Vlan1, changed state to up
```

Default gateway: R2

```
SW2(config)#ip def
SW2(config)#ip default-gateway 192.168.2.254 ?
  <cr>
SW2(config)#ip default-gateway 192.168.2.254 
```


## 2. Configure the following console line security settings on SW2:
Authentication: Local user
Exec timeout: 5 minutes
```
SW2(config)#line console 0
SW2(config-line)#?
Line configuration commands:
  access-class  Filter connections based on an IP access list
  accounting    Accounting parameters
  databits      Set number of data bits per character
  default       Set a command to its defaults
  exec-timeout  Set the EXEC timeout
  exit          Exit from line configuration mode
  flowcontrol   Set the flow control
  history       Enable and control the command history function
  logging       Modify message logging facilities
  login         Enable password checking
  motd-banner   Enable the display of the MOTD banner
  no            Negate a command or set its defaults
  parity        Set terminal parity
  password      Set a password
  privilege     Change privilege level for line
  speed         Set the transmit and receive speeds
  stopbits      Set async line stop bits
  transport     Define transport protocols for line
SW2(config-line)#login ?
  authentication  authenticate using aaa method list
  local           Local password checking
  <cr>
SW2(config-line)#login local
SW2(config-line)#exec?
exec-timeout  
SW2(config-line)#exec
SW2(config-line)#exec-timeout 5
```


## 3. Configure SW2 for remote access via SSH:
Domain name: jeremysitlab.com
RSA key size: 2048 bits
Authentication: Local user
Exec timeout: 5 minutes
Protocols: SSH only
+Limit access to PC1 ONLY

```
SW2(config)#ip ?
  access-list      Named access-list
  arp              IP ARP global configuration
  default-gateway  Specify default gateway (if not routing IP)
  dhcp             Configure DHCP server and relay parameters
  domain           IP DNS Resolver
  domain-lookup    Enable IP Domain Name System hostname translation
  domain-name      Define the default domain name
  ftp              FTP configuration commands
  host             Add an entry to the ip hostname table
  name-server      Specify address of name server to use
  scp              Scp commands
  ssh              Configure ssh options
SW2(config)#ip domain-name jeremysitlab.com
SW2(config)#crypto ?
  key  Long term key operations
SW2(config)#crypto key ?
  generate  Generate new keys
  zeroize   Remove keys
SW2(config)#crypto key generate ?
  rsa  Generate RSA keys
SW2(config)#crypto key generate rsa ?
  general-keys  Generate a general purpose RSA key pair for signing and
                encryption
  <cr>
SW2(config)#crypto key generate rsa
The name for the keys will be: SW2.jeremysitlab.com
Choose the size of the key modulus in the range of 360 to 4096 for your
  General Purpose Keys. Choosing a key modulus greater than 512 may take
  a few minutes.

How many bits in the modulus [512]: 2048
% Generating 2048 bit RSA keys, keys will be non-exportable...[OK]

SW2(config)#
*Feb 28 10:38:5.462: %SSH-5-ENABLED: SSH 1.99 has been enabled
SW2(config)#access-list ?
  <1-99>     IP standard access list
  <100-199>  IP extended access list
SW2(config)#access-list 1 ?
  deny    Specify packets to reject
  permit  Specify packets to forward
  remark  Access list entry comment
SW2(config)#access-list 1 permit host 192.168.1.1
SW2(config)#line vty 0 15
SW2(config-line)#
SW2(config-line)#login local
SW2(config-line)#exec
SW2(config-line)#exec-timeout 5
SW2(config-line)#trans?
transport  
SW2(config-line)#transport ?
  input   Define which protocols to use when connecting to the terminal server
  output  Define which protocols to use for outgoing connections
SW2(config-line)#transport input ?
  all     All protocols
  none    No protocols
  ssh     TCP/IP SSH protocol
  telnet  TCP/IP Telnet protocol
SW2(config-line)#transport input ssh
SW2(config-line)#acl-?
% Unrecognized command
SW2(config-line)#access?
access-class  
SW2(config-line)#access
SW2(config-line)#access-class ?
  <1-199>  IP access list
  WORD     Access-list name
SW2(config-line)#access-class 1 ?
  in   Filter incoming connections
  out  Filter outgoing connections
SW2(config-line)#access-class 1 in
```


Confirm.

As we can see, R2 can ping SW2 but cannot SSH into SW2. 

```
R2>
R2>ping 192.168.2.253

Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 192.168.2.253, timeout is 2 seconds:
..!!!
Success rate is 60 percent (3/5), round-trip min/avg/max = 0/0/0 ms

R2>ssh -l ?
  WORD  Login name
R2>ssh -l jeremy ?
  -v    Specify SSH Protocol Version
  WORD  IP address or hostname of a remote system
R2>ssh -l jeremy 192.168.2.253

% Connection refused by remote host
R2>
```

PC1 is allowed as per the ACL configurations to VTY 0 - 15

```
C:\>ping 192.168.2.253

Pinging 192.168.2.253 with 32 bytes of data:

Request timed out.
Reply from 192.168.2.253: bytes=32 time<1ms TTL=253
Reply from 192.168.2.253: bytes=32 time<1ms TTL=253
Reply from 192.168.2.253: bytes=32 time<1ms TTL=253

Ping statistics for 192.168.2.253:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms

C:\>ssh -l jeremy 192.168.2.253

Password: 



SW2>
SW2>
SW2>en
Password: 
SW2#
SW2#
```