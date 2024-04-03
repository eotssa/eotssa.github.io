---
title: Syslog Configurations
date: 2024-04-02 19:48:04
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240402194848.png)

R1 username: jeremy, PW: ccna, enable PW: ccna
1. Connect to R1's console port using PC2:
     -Shut down the G0/0 interface
     -After you receive a syslog message, re-enable the interface.
     -What is the severity level of the syslog messages?
     -Enable timestamps for logging messages

2. Telnet from PC1 to R1's G0/0 interface (watch the video to learn how!)
     -Enable the unused G0/1 interface
     -Why does no syslog message appear?
     -Enable logging to the VTY lines for the current session.
  *there is no 'logging monitor' command in packet tracer, 
    but it's enabled by default

3. Enable logging to the buffer, and configure the buffer size to 8192 bytes.

4. Enable logging to the syslog server SRV1 with a level of 'debugging'.

## R1 username: jeremy, PW: ccna, enable PW: ccna
1. Connect to R1's console port using PC2:
     -Shut down the G0/0 interface
 ```
 R1(config)#int g0/0
R1(config-if)#shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to administratively down

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to down

R1(config-if)#
R1(config-if)#do sh ip int brief
Interface              IP-Address      OK? Method Status                Protocol 
GigabitEthernet0/0     192.168.1.1     YES manual administratively down down 
GigabitEthernet0/1     unassigned      YES unset  administratively down down 
GigabitEthernet0/2     unassigned      YES unset  administratively down down 
Vlan1                  unassigned      YES unset  administratively down down
R1(config-if)#
```
  

After you receive a syslog message, re-enable the interface.
What is the severity level of the syslog messages?
```
R1(config-if)#no shutdown

R1(config-if)#
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up

%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up

R1(config-if)#
```
		 
Enable timestamps for logging messages

```
R1(config-if)#exit
R1(config)#service ?
  dhcp                 Enable DHCP server and relay agent
  nagle                Enable Nagle's congestion control algorithm
  password-encryption  Encrypt system passwords
  timestamps           Timestamp debug/log messages
R1(config)#service timestamps log datetime
% Incomplete command.
R1(config)#service timestamps ?
  debug  Timestamp debug messages
  log    Timestamp log messages
R1(config)#service timestamps log ?
  datetime  Timestamp with date and time
R1(config)#service timestamps log datetime ?
  msec  Include milliseconds in timestamp
R1(config)#service timestamps log datetime msec
R1(config)#
R1(config)#exit
R1#
*Feb 28, 10:09:04.099: SYS-5-CONFIG_I: Configured from console by console
R1#
```


## 2. Telnet from PC1 to R1's G0/0 interface (watch the video to learn how!)
Enable the unused G0/1 interface
Why does no syslog message appear?

 ```
 C:\>telnet 192.168.1.1
Trying 192.168.1.1 ...Open


User Access Verification

Username: jeremy
Password: 
R1>en
Password: 
R1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#int g0/1
R1(config-if)#no shutdown

R1(config-if)#
```
Logging messages are not displayed by default via the VTY lines.


Enable logging to the VTY lines for the current session. There is no `logging monitor` command in packet tracer, but it's enabled by default. 

```
R1(config)#exit
R1#terminal ?
  history  Enable and control the command history function
  monitor  Enable logging on the terminal line.
  no       Negate a command
R1#terminal monitor
```

```
R1(config)#int g0/1
R1(config-if)#shutdown
R1(config-if)#
*Feb 28, 10:13:42.1313: %LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to administratively down
```

## 3. Enable logging to the buffer, and configure the buffer size to 8192 bytes.

```
R1#
R1#show logging
Syslog logging: enabled (0 messages dropped, 0 messages rate-limited,
          0 flushes, 0 overruns, xml disabled, filtering disabled)

No Active Message Discriminator.


No Inactive Message Discriminator.


    Console logging: level debugging, 10 messages logged, xml disabled,
          filtering disabled
    Monitor logging: level debugging, 2 messages logged, xml disabled,
          filtering disabled
    Buffer logging:  disabled, xml disabled,
          filtering disabled

    Logging Exception size (4096 bytes)
    Count and timestamp logging messages: disabled
    Persistent logging: disabled

No active filter modules.


R1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#logging buffered 8192 ?
  <cr>
R1(config)#logging buffered 8192
R1(config)#do sh logging
Syslog logging: enabled (0 messages dropped, 0 messages rate-limited,
          0 flushes, 0 overruns, xml disabled, filtering disabled)

No Active Message Discriminator.


No Inactive Message Discriminator.


    Console logging: level debugging, 10 messages logged, xml disabled,
          filtering disabled
    Monitor logging: level debugging, 2 messages logged, xml disabled,
          filtering disabled
    Buffer logging:  level debugging, 0 messages logged, xml disabled,
          filtering disabled

    Logging Exception size (4096 bytes)
    Count and timestamp logging messages: disabled
    Persistent logging: disabled

No active filter modules.

ESM: 0 messages dropped
    Trap logging: level informational, 10 message lines logged
Log Buffer (8192 bytes):
```


## 4. Enable logging to the syslog server SRV1 with a level of 'debugging'.

```
R1(config)#logging 192.168.1.100
R1(config)#logging ?
  A.B.C.D   IP address of the logging host
  buffered  Set buffered logging parameters
  console   Set console logging parameters
  host      Set syslog server IP address and parameters
  on        Enable logging to all enabled destinations
  trap      Set syslog server logging level
  userinfo  Enable logging of user info on privileged mode enabling
R1(config)#logging trap ?
  debugging  Debugging messages                (severity=7)
  <cr>
R1(config)#logging trap debugging
```

Check Syslogs in SRV1 via Services.

![](../../images/Pasted%20image%2020240402200212.png)