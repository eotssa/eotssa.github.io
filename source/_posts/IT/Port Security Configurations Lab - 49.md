---
title: Port Security Configurations
date: 2024-04-05 21:48:39
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240405214958.png)

*ACCIDENTALLY STARTED THE CONFIGURATION WITH SW1's G0/1 port-security enabled.*

1. Configure port security on the following interfaces:
#SW1 F0/1, F0/2, F0/3#
Violation mode: Shutdown
Maximum addresses: 1
Sticky learning: Disabled
Aging time: 1 hour

#SW2 G0/1#
Violation mode: Restrict
Maximum addresses: 4
Sticky learning: Enabled

2. Trigger port security violations on SW1 and SW2 (for example by 
    connecting another PC) and observe the actions taken by each switch.

---

## 1. Configure port security on the following interfaces:
#SW1 F0/1, F0/2, F0/3#
Violation mode: Shutdown
Maximum addresses: 1
Sticky learning: Disabled
Aging time: 1 hour


We set the aging time for all 3 interfaces. 
```
SW1(config)#
SW1(config)#int range f0/1 - 3
SW1(config-if-range)#switchport 
SW1(config-if-range)#switchport port
SW1(config-if-range)#switchport port-security ?
  aging        Port-security aging commands
  mac-address  Secure mac address
  maximum      Max secure addresses
  violation    Security violation mode
  <cr>
SW1(config-if-range)#switchport port-security aging ?
  time  Port-security aging time
SW1(config-if-range)#switchport port-security aging time ?
  <1-1440>  Aging time in minutes. Enter a value between 1 and 1440
SW1(config-if-range)#switchport port-security aging time 60
SW1(config-if-range)#
SW1(config-if-range)#switchport port-security
Command rejected: FastEthernet0/1 is a dynamic port.
Command rejected: FastEthernet0/2 is a dynamic port.
Command rejected: FastEthernet0/3 is a dynamic port.
```
port-security is not enabled because all ports are still dynamic. 

```
SW1(config-if-range)#switchport mode access
SW1(config-if-range)#switchport port-security
SW1(config-if-range)#
SW1(config-if-range)#do sh port-security 
Secure Port MaxSecureAddr CurrentAddr SecurityViolation Security Action
               (Count)       (Count)        (Count)
--------------------------------------------------------------------
        Fa0/1        1          0                 0         Shutdown
        Fa0/2        1          0                 0         Shutdown
        Fa0/3        1          0                 0         Shutdown
       Gig0/1        1          1                 0         Shutdown
----------------------------------------------------------------------
SW1(config-if-range)#
```

Violation mode: Shutdown
Maximum addresses: 1
Sticky learning: Disabled

Settings specified are all default settings of port-security.


For SW2:

#SW2 G0/1#
Violation mode: Restrict
Maximum addresses: 4
Sticky learning: Enabled

```
SW2(config)#int g0/1
SW2(config-if)#
SW2(config-if)#switchport mode ac
SW2(config-if)#switchport port
SW2(config-if)#switchport port-security 
SW2(config-if)#switchport port-security ?
  aging        Port-security aging commands
  mac-address  Secure mac address
  maximum      Max secure addresses
  violation    Security violation mode
  <cr>
SW2(config-if)#switchport port-security violation ?
  protect   Security violation protect mode
  restrict  Security violation restrict mode
  shutdown  Security violation shutdown mode
SW2(config-if)#switchport port-security violation restrict ?
  <cr>
SW2(config-if)#switchport port-security violation restrict
SW2(config-if)#switchport port-security maximum ?
  <1-132>  Maximum addresses
SW2(config-if)#switchport port-security maximum 4
SW2(config-if)#switchport port-security mac-address ?
  H.H.H   48 bit mac address
  sticky  Configure dynamic secure addresses as sticky
SW2(config-if)#switchport port-security mac-address sticky
```

Check configs

```
SW2#show port-security 
Secure Port MaxSecureAddr CurrentAddr SecurityViolation Security Action
               (Count)       (Count)        (Count)
--------------------------------------------------------------------
       Gig0/1        4          1                 0         Restrict
----------------------------------------------------------------------
SW2#show port-security int g0/1
Port Security              : Enabled
Port Status                : Secure-up
Violation Mode             : Restrict
Aging Time                 : 0 mins
Aging Type                 : Absolute
SecureStatic Address Aging : Disabled
Maximum MAC Addresses      : 4
Total MAC Addresses        : 1
Configured MAC Addresses   : 0
Sticky MAC Addresses       : 0
Last Source Address:Vlan   : 0060.471C.1D19:1
Security Violation Count   : 0
```

Check for sticky.

PC1, PC2, and PC3 will all ping R1. 
SW2 should learn the MAC address of SW1 g0/1 due to CDP. 

We can see Total MAC addresses Learned: 4
```
SW2#show port-security int g0/1
Port Security              : Enabled
Port Status                : Secure-down
Violation Mode             : Restrict
Aging Time                 : 0 mins
Aging Type                 : Absolute
SecureStatic Address Aging : Disabled
Maximum MAC Addresses      : 4
Total MAC Addresses        : 1
Configured MAC Addresses   : 0
Sticky MAC Addresses       : 1
Last Source Address:Vlan   : 0001.0001.0001:1
Security Violation Count   : 0
```

... But my MAC addresses are currently not sticky? Why...? 

Running config on SW2 shows that PC1 made it on here, but nothing else. I can see that pings from PC2 and PC3 failed, but PC1 works. 
```
SW2#
SW2#show run | sec sticky
 switchport port-security mac-address sticky 
 switchport port-security mac-address sticky 0001.0001.0001
```


Double checked configurations; looks correct.

SW1 is showing g0/1 as err-disabled. 
```
SW1#show port-security 
Secure Port MaxSecureAddr CurrentAddr SecurityViolation Security Action
               (Count)       (Count)        (Count)
--------------------------------------------------------------------
        Fa0/1        1          1                 0         Shutdown
        Fa0/2        1          1                 0         Shutdown
        Fa0/3        1          1                 0         Shutdown
       Gig0/1        1          0                 1         Shutdown
----------------------------------------------------------------------
SW1#
```

I'm not sure why this happened...but the fix is simple.

```
SW1(config)#int g0/1
SW1(config-if)#
SW1(config-if)#shutdown

%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to administratively down
SW1(config-if)#
SW1(config-if)#no shutdown

SW1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up

SW1(config-if)#
SW1(config-if)#exit
SW1(config)#
SW1(config)#exit
SW1#
%SYS-5-CONFIG_I: Configured from console by console

SW1#show port
SW1#show port-security 
Secure Port MaxSecureAddr CurrentAddr SecurityViolation Security Action
               (Count)       (Count)        (Count)
--------------------------------------------------------------------
        Fa0/1        1          1                 0         Shutdown
        Fa0/2        1          1                 0         Shutdown
        Fa0/3        1          1                 0         Shutdown
       Gig0/1        1          1                 0         Shutdown
----------------------------------------------------------------------
SW1#
```

Let's try pinging PC2 to 10.0.0.254 (R1) again. 

No... it doesn't work. The g0/1 interface shutdowns when this happens. 

OH... I accidentally enabled port-security on g0/1 prior to the lab when I was messing around with the commands. 

```
SW1(config)#int g0/1
SW1(config-if)#
SW1(config-if)#no switchport port-security
SW1(config-if)#
```

Should be fixed now.

Nope...pings still fail; resetting the port should do it.

```
SW1#show port-security 
Secure Port MaxSecureAddr CurrentAddr SecurityViolation Security Action
               (Count)       (Count)        (Count)
--------------------------------------------------------------------
        Fa0/1        1          1                 0         Shutdown
        Fa0/2        1          1                 0         Shutdown
        Fa0/3        1          1                 0         Shutdown
----------------------------------------------------------------------
SW1#int g0/1
        ^
% Invalid input detected at '^' marker.
	
SW1#
SW1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
SW1(config)#
SW1(config)#int g0/1
SW1(config-if)#
SW1(config-if)#shutdown

%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to administratively down
SW1(config-if)#
SW1(config-if)#no shutdown
```

Yup. Fixed.

I ping PC2, PC3 to R1. Works.

As we can see in SW2, the running conf is sticky; dynamically learned MAC addresses are converted to static secure MAC addresses.
```
SW2#sh run | sec sticky
 switchport port-security mac-address sticky 
 switchport port-security mac-address sticky 0001.0001.0001
 switchport port-security mac-address sticky 0002.0002.0002
 switchport port-security mac-address sticky 0003.0003.0003
```

Use `show mac address-table` to see the TYPE of each MAC address.

Not sure why SW1's MAC address isn't here, but...


## 2. Trigger port security violations on SW1 and SW2 (for example by connecting another PC) and observe the actions taken by each switch.

### SW2 Violation 
Instead of connecting another PC, we can create an switch virtual interface (SVI) on SW1 as follows, and ping the interface. SW1 SVI should have its own separate MAC address. 

```
SW1(config)#int vlan 1
SW1(config-if)#ip address 10.0.0.10 255.255.255.0
SW1(config-if)#no shutdown

SW1(config-if)#
%LINK-5-CHANGED: Interface Vlan1, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface Vlan1, changed state to up

SW1(config-if)#do ping 10.0.0.254

Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 10.0.0.254, timeout is 2 seconds:
.....
Success rate is 0 percent (0/5)
```

Ping fails because SW2's g0/1 port security is configured for a maximum allowable of 4 MAC addresses. 

As seen in SW2: plenty of security violations, but since violation mode is `restrict`, interface remains up. 
```
SW2#show port-security int g0/1
Port Security              : Enabled
Port Status                : Secure-up
Violation Mode             : Restrict
Aging Time                 : 0 mins
Aging Type                 : Absolute
SecureStatic Address Aging : Disabled
Maximum MAC Addresses      : 4
Total MAC Addresses        : 4
Configured MAC Addresses   : 0
Sticky MAC Addresses       : 4
Last Source Address:Vlan   : 0060.471C.1D19:1
Security Violation Count   : 6
```


### SW1 Violation 

We can trigger a violation for SW1 f0/1 by changing the MAC address of PC1, and then ping R1. Ping shouldn't work, and the interface should shutdown. 



