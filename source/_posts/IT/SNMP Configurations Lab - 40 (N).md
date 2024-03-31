---
title: SNMP Configurations
date: 2024-03-31 15:45:34
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240331193349.png)

## SNMP functionality is VERY limited in Packet Tracer! ##

1. Configure the following SNMP communities on R1:
read-only: Cisco1
read/write: Cisco2

2. Use SNMP 'Get' messages via the MIB browser on PC1 to check the following:
-How long has R1 been running? (system uptime)
-What is the currently configured hostname on R1?
-How many interfaces does R1 have?
-What are those interfaces?

+check what other information you can learn about R1 via SNMP Get messages.
 
3. Use an SNMP 'Set' message from PC1 to change the hostname of R1.



## 1. Configure the following SNMP communities on R1:
read-only: Cisco1
read/write: Cisco2

```
Enter configuration commands, one per line.  End with CNTL/Z.
R1(config)#sn
R1(config)#snmp-server ?
  community  Enable SNMP; set community string and access privs
R1(config)#snmp-server community Cisco1 ro
%SNMP-5-WARMSTART: SNMP agent on host R1 is undergoing a warm start
R1(config)#snmp-server community Cisco2 rw
```