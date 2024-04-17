---
title: Eotssa's CCNA Configuration Files (Compiled)
date: 2024-04-16 16:42:52
tags:
---
# Configuring IP Address - 8

![](../../images/Pasted%20image%2020240225105423.png)

## 1. How do you change the host name of a router?

```
Router>en
Router#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
Router(config)#host ?
  WORD  This system's network name
Router(config)#hostname R1
R1(config)#$
```

## 2. Use a 'show' command to view a lsit of R1's interfaces, their IP addresses, status, etc.

- Note that show command doesn't work in config mode, as indicated below. 
```
R1(config)#show ip ?
% Unrecognized command
R1(config)#show ip interface brief
            ^
% Invalid input detected at '^' marker.
	
R1(config)#do show ip interface brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     unassigned      YES unset  administratively down down 
GigabitEthernet0/1     unassigned      YES unset  administratively down down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
```

## 3. Configure the appropriate IP addresses on R1's interfaces, and enable the interfaces. Then, configure appropriate interface descriptions.

- Entered each interface using shortcut. 
- Edit the IP address for each interface, gave description, and turned off shutdown. 
- 

```
R1(config)#int g 0/0
R1(config-if)#ip address 15.255.255.254 ?
  A.B.C.D  IP subnet mask
R1(config-if)#ip address 15.255.255.254 255.0.0.0
R1(config-if)#desc ## R1 to SW 1 ##
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up

R1(config-if)#int g0/1
R1(config-if)#ip address 182.98.255.254 255.255.0.0
R1(config-if)#desc ## R1 to SW 2 ##
R1(config-if)#no shut

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up

R1(config-if)#int g0/2
R1(config-if)#ip address 201.191.20.0 255.255.255.0
Bad mask /24 for address 201.191.20.0
R1(config-if)#ip address 201.191.20.254 255.255.255.0
R1(config-if)#desc ## R1 to SW3 ##
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/2, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/2, changed state to up

```

## 4. Use a 'show' command to verify R1's interfaces again.

```
R1(config-if)#end
R1#
%SYS-5-CONFIG_I: Configured from console by console

R1#show ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     15.255.255.254  YES manual up                    up 
GigabitEthernet0/1     182.98.255.254  YES manual up                    up 
GigabitEthernet0/2     201.191.20.254  YES manual up                    up 
Vlan1                  unassigned      YES unset  administratively down down
```

## 5. View the running config to confirm the configuration changes, then save the config

```
R1#
R1#show running-config
Building configuration...

Current configuration : 829 bytes
!
version 15.1
no service timestamps log datetime msec
no service timestamps debug datetime msec
no service password-encryption
!
hostname R1
!
!
!
!
!
!
!
!
ip cef
no ipv6 cef
!
!
!
!
license udi pid CISCO2911/K9 sn FTX1524NMDP-
!
!
!
!
!
!
!
!
!
!
!
spanning-tree mode pvst
!
!
!
!
!
!
interface GigabitEthernet0/0
 description ## R1 to SW 1 ##
 ip address 15.255.255.254 255.0.0.0
 duplex auto
 speed auto
!
interface GigabitEthernet0/1
 description ## R1 to SW 2 ##
 ip address 182.98.255.254 255.255.0.0
 duplex auto
 speed auto
!
interface GigabitEthernet0/2
 description ## R1 to SW3 ##
 ip address 201.191.20.254 255.255.255.0
 duplex auto
 speed auto
!
interface Vlan1
 no ip address
 shutdown
!
ip classless
!
ip flow-export version 9
!
 --More-- 

R1#write
Building configuration...
[OK]
```



## 6. Configure the IP addresses of PC1, PC2, and PC3

- PC's default gateway should be configured to R1's IP addresses for their respective interfaces. 
	- For example, in PC1, the default gateway should be 15.255.255.254. 
	- Press "FastEthernet0" and configure the IP address. 
		- Subnet masks are automatically configured since Cisco can recognize a Class A address.
	

## 7. Ping from PC1 to PC2 and PC3 to test connectivity


```
Cisco Packet Tracer PC Command Line 1.0
C:\>ping 182.98.0.1

Pinging 182.98.0.1 with 32 bytes of data:

Request timed out.
Reply from 182.98.0.1: bytes=32 time<1ms TTL=127
Reply from 182.98.0.1: bytes=32 time<1ms TTL=127
Reply from 182.98.0.1: bytes=32 time<1ms TTL=127

Ping statistics for 182.98.0.1:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms

C:\>ping 201.191.20.1

Pinging 201.191.20.1 with 32 bytes of data:

Request timed out.
Reply from 201.191.20.1: bytes=32 time<1ms TTL=127
Reply from 201.191.20.1: bytes=32 time<1ms TTL=127
Reply from 201.191.20.1: bytes=32 time=9ms TTL=127

Ping statistics for 201.191.20.1:
    Packets: Sent = 4, Received = 3, Lost = 1 (25% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 9ms, Average = 3ms
```


# Configuring Interfaces Packet Tracer - 9

![](../../images/Pasted%20image%2020240226161004.png)

## 1. Configure the hostname of R1, SW1, and SW2

## 2. Configure the appropriate IP addresses on R1, PC1, PC2, PC3, PC4

## 3. Manually configure the speed and duplex on interfaces connected to other networking devices (not end hosts)

## 4. Configure appropriate descriptions on each interface

## 5. Disable interfaces which are not connected to other devices

## 6. Save the Configurations

### R1 (Steps 1 - 6)

```
Router>
Router>en
Router#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
Router(config)#hostname R1
R1(config)#do show ip interface brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     unassigned      YES unset  administratively down down 
GigabitEthernet0/1     unassigned      YES unset  administratively down down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R1(config)#int g0/0
R1(config-if)#ip address 172.16.255.254 255.255.0.0
R1(config-if)#do show ip interface brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     172.16.255.254  YES manual administratively down down 
GigabitEthernet0/1     unassigned      YES unset  administratively down down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up

R1(config-if)#do show ip interface brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     172.16.255.254  YES manual up                    up 
GigabitEthernet0/1     unassigned      YES unset  administratively down down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R1(config-if)#speed 1000
R1(config-if)#duplex full
R1(config-if)#
%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to down

R1(config-if)#desc ## to SW1 ##
R1(config-if)#do show ip interface brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     172.16.255.254  YES manual up                    down 
GigabitEthernet0/1     unassigned      YES unset  administratively down down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R1(config-if)#interface range g0/1-2
R1(config-if-range)#desc ## NOT IN USE ##
R1(config-if-range)#do sh run 
Building configuration...

Current configuration : 785 bytes
!
version 15.1
no service timestamps log datetime msec
no service timestamps debug datetime msec
no service password-encryption
!
hostname R1
!
!
!
!
!
!
!
!
ip cef
no ipv6 cef
!
!
!
!
license udi pid CISCO2911/K9 sn FTX1524P566-
!
!
!
!
!
!
!
!
!
!
!
spanning-tree mode pvst
!
!
!
!
!
!
interface GigabitEthernet0/0
 description ## to SW1 ##
 ip address 172.16.255.254 255.255.0.0
 duplex full
 speed 1000
!
interface GigabitEthernet0/1
 description ## NOT IN USE ##
 no ip address
 duplex auto
 speed auto
 shutdown
!
interface GigabitEthernet0/2
 description ## NOT IN USE ##
 no ip address
 duplex auto
 speed auto
 shutdown
!
interface Vlan1
 no ip address
 shutdown
!
ip classless
!
ip flow-export version 9
!
!
!
!
!

R1(config-if-range)#end
R1#
%SYS-5-CONFIG_I: Configured from console by console

R1#write
Building configuration...
[OK]
R1#show startup-config
Using 785 bytes
!
version 15.1
no service timestamps log datetime msec
no service timestamps debug datetime msec
no service password-encryption
!
hostname R1
!
!
!
!
!
!
!
!
ip cef
no ipv6 cef
!
!
!
!
license udi pid CISCO2911/K9 sn FTX1524P566-
!
!
!
!
!
!
!
!
!
!
!
spanning-tree mode pvst
!
!
!
!
!
!
interface GigabitEthernet0/0
 description ## to SW1 ##
 ip address 172.16.255.254 255.255.0.0
 duplex full
 speed 1000
!
interface GigabitEthernet0/1
 description ## NOT IN USE ##
 no ip address
 duplex auto
 speed auto
 shutdown
!
interface GigabitEthernet0/2
 description ## NOT IN USE ##
 no ip address
 duplex auto
 speed auto
 shutdown
!
interface Vlan1
 no ip address
 shutdown
!
ip classless
!
ip flow-export version 9
!
!
!
```
- Protocol here is down, but it's a Packet Tracer Problem. 


### SW2 Steps 1 - 6

```
Switch>
Switch>en
Switch#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
Switch(config)#host SW2
SW2(config)#do show int status
Port      Name               Status       Vlan       Duplex  Speed Type
Fa0/1                        connected    1          auto    auto  10/100BaseTX
Fa0/2                        connected    1          auto    auto  10/100BaseTX
Fa0/3                        notconnect   1          auto    auto  10/100BaseTX
Fa0/4                        notconnect   1          auto    auto  10/100BaseTX
Fa0/5                        notconnect   1          auto    auto  10/100BaseTX
Fa0/6                        notconnect   1          auto    auto  10/100BaseTX
Fa0/7                        notconnect   1          auto    auto  10/100BaseTX
Fa0/8                        notconnect   1          auto    auto  10/100BaseTX
Fa0/9                        notconnect   1          auto    auto  10/100BaseTX
Fa0/10                       notconnect   1          auto    auto  10/100BaseTX
Fa0/11                       notconnect   1          auto    auto  10/100BaseTX
Fa0/12                       notconnect   1          auto    auto  10/100BaseTX
Fa0/13                       notconnect   1          auto    auto  10/100BaseTX
Fa0/14                       notconnect   1          auto    auto  10/100BaseTX
Fa0/15                       notconnect   1          auto    auto  10/100BaseTX
Fa0/16                       notconnect   1          auto    auto  10/100BaseTX
Fa0/17                       notconnect   1          auto    auto  10/100BaseTX
Fa0/18                       notconnect   1          auto    auto  10/100BaseTX
Fa0/19                       notconnect   1          auto    auto  10/100BaseTX
Fa0/20                       notconnect   1          auto    auto  10/100BaseTX
Fa0/21                       notconnect   1          auto    auto  10/100BaseTX
Fa0/22                       notconnect   1          auto    auto  10/100BaseTX
Fa0/23                       notconnect   1          auto    auto  10/100BaseTX
Fa0/24                       notconnect   1          auto    auto  10/100BaseTX
Gig0/1                       notconnect   1          auto    auto  10/100BaseTX
Gig0/2                       notconnect   1          auto    auto  10/100BaseTX

SW2(config)#
SW2(config)#
SW2(config)#int g0/1
SW2(config-if)#speed 1000
SW2(config-if)#duplex full
SW2(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up

SW2(config-if)#desc ## TO SWITCH 1 ##
SW2(config-if)#int range f0/1 - 2
SW2(config-if-range)#desc ## TO END HOST ##
SW2(config-if-range)#int range range g0/2, f0/3 - 24
                      ^
% Invalid input detected at '^' marker.
	
SW2(config-if-range)#int range g0/2, f0/3 -24
SW2(config-if-range)#desc ## NOT IN USE ##
SW2(config-if-range)#shutdown

%LINK-5-CHANGED: Interface GigabitEthernet0/2, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/3, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/4, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/5, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/6, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/7, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/8, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/9, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/10, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/11, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/12, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/13, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/14, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/15, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/16, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/17, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/18, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/19, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/20, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/21, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/22, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/23, changed state to administratively down

%LINK-5-CHANGED: Interface FastEthernet0/24, changed state to administratively down
SW2(config-if-range)#
SW2(config-if-range)#do show int status
Port      Name               Status       Vlan       Duplex  Speed Type
Fa0/1     ## TO END HOST ##  connected    1          auto    auto  10/100BaseTX
Fa0/2     ## TO END HOST ##  connected    1          auto    auto  10/100BaseTX
Fa0/3     ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/4     ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/5     ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/6     ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/7     ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/8     ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/9     ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/10    ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/11    ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/12    ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/13    ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/14    ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/15    ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/16    ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/17    ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/18    ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/19    ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/20    ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/21    ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/22    ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/23    ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Fa0/24    ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX
Gig0/1    ## TO SWITCH 1 ##  connected    1          a-full  a-100010/100BaseTX
Gig0/2    ## NOT IN USE ##   disabled 1          auto    auto  10/100BaseTX

SW2(config-if-range)#end
SW2#
%SYS-5-CONFIG_I: Configured from console by console

SW2#write
Building configuration...
[OK]
SW2#show startup-config
```


### PC 1 to PC 4 (Steps 1 - 6)

- Default gateway is configured to be R1's IP address.
![](../../images/Pasted%20image%2020240226163047.png)
- FastEthernet0 is configured to be PC1's IP address (with its respective subnet mask), etc.
![](../../images/Pasted%20image%2020240226163116.png)



