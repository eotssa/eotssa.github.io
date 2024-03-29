---
title: NTP Configurations
date: 2024-03-29 10:42:41
tags:
---
![](../../images/Pasted%20image%2020240329104427.png)
ROUTING HAS BEEN PRECONFIGURED
(default route on R1, OSPF on all routers with 'network 0.0.0.0 255.255.255.255 area 0')

1. Configure the software clock on R1, R2, and R3 to 12:00:00 Dec 30 2020 (UTC).

2. Configure the time zone of R1, R2, and R3 to match your own.

3. Configure R1 to synchronize to NTP server 1.1.1.1 over the Internet.
    What stratum is 1.1.1.1?  What stratum is R1?

4. Configure R1 as a stratum 8 NTP master.
    Synchronize R2 and R3 to R1 with authentication.
   *the 'ntp source' command is not available in Packet Tracer, so just use 
    the physical interface IP addresses of R1.

5. Configure NTP to update the hardware calendars of R1, R2, and R3.
  *you can't view the calendar in Packet Tracer

## 1. Configure the software clock on R1, R2, and R3 to 12:00:00 Dec 30 2020 (UTC).

## 2. Configure the time zone of R1, R2, and R3 to match your own.

R1
```
R1>en
R1#?
Exec commands:
  <1-99>      Session number to resume
  auto        Exec level Automation
  clear       Reset functions
  clock       Manage the system clock
  configure   Enter configuration mode
  connect     Open a terminal connection
  copy        Copy from one file to another
  debug       Debugging functions (see also 'undebug')
  delete      Delete a file
  dir         List files on a filesystem
  disable     Turn off privileged commands
  disconnect  Disconnect an existing network connection
  enable      Turn on privileged commands
  erase       Erase a filesystem
  exit        Exit from the EXEC
  logout      Exit from the EXEC
  mkdir       Create new directory
  more        Display the contents of a file
  no          Disable debugging informations
  ping        Send echo messages
  reload      Halt and perform a cold restart

R1#clock ?
  set  Set the time and date
R1#clock set ?
  hh:mm:ss  Current Time
R1#clock set 12:00:00 ?
  <1-31>  Day of the month
  MONTH   Month of the year
R1#clock set 12:00:00 Dec ?
  <1-31>  Day of the month
R1#clock set 12:00:00 Dec 20 ?
  <1993-2035>  Year
R1#clock set 12:00:00 Dec 20 2020
R1#show clock detail
12:0:6.248 UTC Sun Dec 20 2020
```

EST on March 29, 2024 is 5 offset because I'm in daylight saving. 
```
R1(config)#clock timezone EST 5
R1(config)#do sh clock detail
17:30:6.963 EST Sun Dec 20 2020
Time source is user configuration
```


R2
```
R2>en
R2#clock set 12:00:00 Dec 30 2020
R2#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R2(config)#clock ?
  timezone  Configure time zone
R2(config)#clock timezone EST 5
R2(config)#do sh clock detail
17:0:18.124 EST Wed Dec 30 2020
Time source is user configuration
```

R3 
```
R3>en
R3#clock ?
  set  Set the time and date
R3#clock set 12:00:00 ?
  <1-31>  Day of the month
  MONTH   Month of the year
R3#clock set 12:00:00 Dec 30 2020
R3#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R3(config)#clock time
R3(config)#clock timezone EST 5
R3(config)#do sh clock detail
17:0:14.2 EST Wed Dec 30 2020
Time source is user configuration
```

## 3. Configure R1 to synchronize to NTP server 1.1.1.1 over the Internet. What stratum is 1.1.1.1?  What stratum is R1?

### R1
```
R1(config)#ntp server 1.1.1.1 
```

Check if configured. 

```
R1(config)#do sh ntp associations

address         ref clock       st   when     poll    reach  delay          offset            disp
 ~1.1.1.1       .INIT.          16   -        64      0      0.00           0.00              0.01
```

Notice the lack of asterisk; might take some time to happen. 

```
R1#show ntp as

address         ref clock       st   when     poll    reach  delay          offset            disp
*~1.1.1.1       127.127.1.1     1    9        16      377    0.00           0.00              0.12
 * sys.peer, # selected, + candidate, - outlyer, x falseticker, ~ configured
```

1.1.1.1's stratum is 1, which means our R1 should be stratum 2.

Confirm.

```
R1#show ntp ?
  associations  NTP associations
  status        NTP status
R1#show ntp status
Clock is synchronized, stratum 2, reference is 1.1.1.1
nominal freq is 250.0000 Hz, actual freq is 249.9990 Hz, precision is 2**24
reference time is E369656E.00000153 (23:21:18.339 UTC Tue Dec 29 2020)
clock offset is 0.00 msec, root delay is 0.00  msec
root dispersion is 82.93 msec, peer dispersion is 0.12 msec.
loopfilter state is 'CTRL' (Normal Controlled Loop), drift is - 0.000001193 s/s system poll interval is 4, last update was 12 sec ago.
R1#
```


The time source is now NTP instead of manually configured. 
```
R1#show clock ?
  detail  Display detailed information
  <cr>
R1#show clock detail
4:22:9.497 EST Wed Dec 30 2020
Time source is NTP
```

## 4. Configure R1 as a stratum 8 NTP master. Synchronize R2 and R3 to R1 with authentication.
*the 'ntp source' command is not available in Packet Tracer, so just use the physical interface IP addresses of R1.*

Why would we do this if R1 is already acting as a NTP server since it's synced to SRV1? 
- Loss of connection to SRV1 means that R1 will stop acting as an NTP server. In this case, even if the time isn't accurate, it is crucial that all devices have the same clock. R1 will be a backup clock. 
### R1
```
R1#conf t
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#ntp ?
  authenticate        Authenticate time sources
  authentication-key  Authentication key for trusted time sources
  master              Act as NTP master clock
  server              Configure NTP server
  trusted-key         Key numbers for trusted time sources
  update-calendar     Configure NTP to update the calendar.
R1(config)#ntp master ?
  <1-15>  Act as NTP master clock
  <cr>
R1(config)#ntp master
```

Default behavior of `ntp master` is stratum 8. 

Next configure auth key.

Enable auth first. 
```
R1(config)#ntp ?
  authenticate        Authenticate time sources
  authentication-key  Authentication key for trusted time sources
  master              Act as NTP master clock
  server              Configure NTP server
  trusted-key         Key numbers for trusted time sources
  update-calendar     Configure NTP to update the calendar.
R1(config)#ntp authenticate 
```

Then set the key. 
```
R1(config)#ntp authentication key ?
% Unrecognized command
R1(config)#ntp authentication-key ?
  <1-4294967295>  Key number
R1(config)#ntp authentication-key 1 ?
  md5  MD5 authentication
R1(config)#ntp authentication-key 1 md5 ?
  WORD  Authentication key
R1(config)#ntp authentication-key 1 md5 EOTSSA
```

### R2
Enable ntp authenticate. 
Then configure a key. 
Next set the key to trusted. 
Then configure the NTP server such that R2 uses key 1 to authenticate R1. 
```
R2(config)#ntp authenticate
R2(config)#ntp auth?
authenticate  authentication-key  
R2(config)#ntp authentication-key 1 md5 EOTSSA
R2(config)#ntp ?
  authenticate        Authenticate time sources
  authentication-key  Authentication key for trusted time sources
  master              Act as NTP master clock
  server              Configure NTP server
  trusted-key         Key numbers for trusted time sources
  update-calendar     Configure NTP to update the calendar.
R2(config)#ntp trusted-key 1
R2(config)#
R2(config)#ntp ?
  authenticate        Authenticate time sources
  authentication-key  Authentication key for trusted time sources
  master              Act as NTP master clock
  server              Configure NTP server
  trusted-key         Key numbers for trusted time sources
  update-calendar     Configure NTP to update the calendar.
R2(config)#ntp server 192.168.12.1 ?
  key  Configure peer authentication key
  <cr>
R2(config)#ntp server 192.168.12.1 key 1
```

*the 'ntp source' command is not available in Packet Tracer, so just use the physical interface IP addresses of R1.*

I would normally configure a loopback interface 

```
R2#show ntp as

address         ref clock       st   when     poll    reach  delay          offset            disp
 ~192.168.12.1  .AUTH.          16   -        64      0      0.00           0.00              16000.00
 * sys.peer, # selected, + candidate, - outlyer, x falseticker, ~ configured
```

Hmm... doesn't look like it's syncing? I gave it adequate time as well. What's wrong? 

Looks like I forgot to add key 1 as trusted in R1.

```
R1(config)#ntp trusted-key 1
```

R2 now looks good. 
```
R2#sh clock detail
5:6:22.544 EST Wed Dec 30 2020
Time source is NTP
```


5. Configure NTP to update the hardware calendars of R1, R2, and R3.
  *you can't view the calendar in Packet Tracer


```
R2(config)#ntp update-calendar 
R2(confog)#ntp show calendar 
```