---
title: STP & FHRP Synchronization
date: 2024-04-08 22:55:58
tags: 
categories:
  - IT
---
![](../../images/Pasted%20image%2020240408225727.png)
Configure HSRP on DSW1/DSW2, and ensure synchronization with STP.
In VLAN 10:
-DSW1 is HSRP active/STP root
-DSW2 is HSRP standby/STP secondary root

In VLAN 20:
-DSW2 is HSRP active/STP root
-DSW1 is HSRP standby/STP secondary root

---

HSRP and STP synchronization means that HSRP active is the STP root bridge, and HSRP standby is the secondary root bridge.

**Ensures traffic from the end host takes the most direct route.**

## We can see DSW1's configurations. 


```
DSW1#show standby brief
                     P indicates configured to preempt.
                     |
Interface   Grp  Pri P State    Active          Standby         Virtual IP
DSW1#show spanning-tree vlan 10
```
HSRP has not yet been configured.

```
DSW1#show spanning-tree vlan 10
VLAN0010
  Spanning tree enabled protocol ieee
  Root ID    Priority    32778
             Address     0001.C912.B090
             Cost        4
             Port        3(GigabitEthernet1/0/3)
             Hello Time  2 sec  Max Age 20 sec  Forward Delay 15 sec

  Bridge ID  Priority    32778  (priority 32768 sys-id-ext 10)
             Address     000C.856A.50BD
             Hello Time  2 sec  Max Age 20 sec  Forward Delay 15 sec
             Aging Time  20

Interface        Role Sts Cost      Prio.Nbr Type
---------------- ---- --- --------- -------- --------------------------------
Gi1/0/1          Desg FWD 4         128.1    P2p
Gi1/0/2          Desg FWD 4         128.2    P2p
Gi1/0/3          Root FWD 4         128.3    P2p
```
Spanning-tree is enabled. 

Is DSW1 the root bridge in VLAN 10?
- No. We see two designated ports, and one root port. A root bridge will have no root ports. Since the root port is connected to Gi10/03, it suggests DSW2 is the root bridge.  

Is DSW1 the root bridge in VLAN 20?
```
DSW1#show spanning-tree vlan 20
VLAN0020
  Spanning tree enabled protocol ieee
  Root ID    Priority    32788
             Address     0001.C912.B090
             Cost        4
             Port        3(GigabitEthernet1/0/3)
             Hello Time  2 sec  Max Age 20 sec  Forward Delay 15 sec

  Bridge ID  Priority    32788  (priority 32768 sys-id-ext 20)
             Address     000C.856A.50BD
             Hello Time  2 sec  Max Age 20 sec  Forward Delay 15 sec
             Aging Time  20

Interface        Role Sts Cost      Prio.Nbr Type
---------------- ---- --- --------- -------- --------------------------------
Gi1/0/1          Desg FWD 4         128.1    P2p
Gi1/0/2          Desg FWD 4         128.2    P2p
Gi1/0/3          Root FWD 4         128.3    P2p
```
Nope. Same thing. 

Given the requirements:

In VLAN 10:
-DSW1 is HSRP active/STP root
-DSW2 is HSRP standby/STP secondary root

In VLAN 20:
-DSW2 is HSRP active/STP root
-DSW1 is HSRP standby/STP secondary root

We can configure the roots as follows:

```
DSW1(config)#spanning-tree vlan 10 root primary
DSW1(config)#spanning-tree vlan 20 root secondary
```

We can confirm as follows
```
DSW1(config)#do sh spanning-tree vlan 10
VLAN0010
  Spanning tree enabled protocol ieee
  Root ID    Priority    24586
             Address     000C.856A.50BD
             This bridge is the root
             Hello Time  2 sec  Max Age 20 sec  Forward Delay 15 sec

  Bridge ID  Priority    24586  (priority 24576 sys-id-ext 10)
             Address     000C.856A.50BD
             Hello Time  2 sec  Max Age 20 sec  Forward Delay 15 sec
             Aging Time  20

Interface        Role Sts Cost      Prio.Nbr Type
---------------- ---- --- --------- -------- --------------------------------
Gi1/0/1          Desg FWD 4         128.1    P2p
Gi1/0/2          Desg FWD 4         128.2    P2p
Gi1/0/3          Desg FWD 4         128.3    P2p
```


```
DSW1(config)#do sh spanning-tree vlan 20
VLAN0020
  Spanning tree enabled protocol ieee
  Root ID    Priority    28692
             Address     000C.856A.50BD
             This bridge is the root
             Hello Time  2 sec  Max Age 20 sec  Forward Delay 15 sec

  Bridge ID  Priority    28692  (priority 28672 sys-id-ext 20)
             Address     000C.856A.50BD
             Hello Time  2 sec  Max Age 20 sec  Forward Delay 15 sec
             Aging Time  20

Interface        Role Sts Cost      Prio.Nbr Type
---------------- ---- --- --------- -------- --------------------------------
Gi1/0/1          Desg FWD 4         128.1    P2p
Gi1/0/2          Desg FWD 4         128.2    P2p
Gi1/0/3          Desg FWD 4         128.3    P2p

```
There is an issue here.  DSW1 for VLAN 20 has been made the root bridge: `This bridge is the root`; this is because DSW1 has a priority of 28692 now, which is lower than DSW2. DSW2 has not been configured yet. 

Let's configure HSRP for VLAN 10

```
DSW1(config)#int vlan 10
DSW1(config-if)#
DSW1(config-if)#standby ?
  <0-4095>  group number
  ip        Enable HSRP and set the virtual IP address
  ipv6      Enable HSRP IPv6
  preempt   Overthrow lower priority Active routers
  priority  Priority level
  timers    Hello and hold timers
  track     Priority Tracking
  version   HSRP version
DSW1(config-if)#standby version 2
DSW1(config-if)#standby 10 ?
  ip        Enable HSRP and set the virtual IP address
  ipv6      Enable HSRP IPv6
  preempt   Overthrow lower priority Active routers
  priority  Priority level
  timers    Hello and hold timers
  track     Priority Tracking
DSW1(config-if)#standby 10 ip ?
  A.B.C.D  Virtual IP address
  <cr>
DSW1(config-if)#standby 10 ip 10.0.10.254
DSW1(config-if)#
%HSRP-6-STATECHANGE: Vlan10 Grp 10 state Init -> Init

%HSRP-6-STATECHANGE: Vlan10 Grp 10 state Speak -> Standby

%HSRP-6-STATECHANGE: Vlan10 Grp 10 state Standby -> Active

DSW1(config-if)#
DSW1(config-if)#standby 10 priority ?
  <0-255>  Priority value
DSW1(config-if)#standby 10 priority 105
DSW1(config-if)#standby 10 preempt
```

For VLAN 20, we configured HSRP here. Notice that the priority is set to 95. 

```
DSW1(config-if)#int vlan 20
DSW1(config-if)#
DSW1(config-if)#
DSW1(config-if)#standby version 2
DSW1(config-if)#standby 20 ip 10.0.20.254
DSW1(config-if)#
%HSRP-6-STATECHANGE: Vlan20 Grp 20 state Init -> Init

DSW1(config-if)#
DSW1(config-if)#standby 20 priority 95
%HSRP-6-STATECHANGE: Vlan20 Grp 20 state Speak -> Standby

%HSRP-6-STATECHANGE: Vlan20 Grp 20 state Standby -> Active

DSW1(config-if)#standby 20 preempt
```


## Next for DSW2, 

Configure VLAN 10 to be secondary root.

```
DSW2(config)#do show spanning-tree vlan 10
VLAN0010
  Spanning tree enabled protocol ieee
  Root ID    Priority    24586
             Address     000C.856A.50BD
             Cost        4
             Port        3(GigabitEthernet1/0/3)
             Hello Time  2 sec  Max Age 20 sec  Forward Delay 15 sec

  Bridge ID  Priority    32778  (priority 32768 sys-id-ext 10)
             Address     0001.C912.B090
             Hello Time  2 sec  Max Age 20 sec  Forward Delay 15 sec
             Aging Time  20

Interface        Role Sts Cost      Prio.Nbr Type
---------------- ---- --- --------- -------- --------------------------------
Gi1/0/1          Desg FWD 4         128.1    P2p
Gi1/0/3          Root FWD 4         128.3    P2p
Gi1/0/2          Desg FWD 4         128.2    P2p

DSW2(config)#spannin
DSW2(config)#spanning-tree vlan 10 root secondary
DSW2(config)#do show spanning-tree vlan 10
VLAN0010
  Spanning tree enabled protocol ieee
  Root ID    Priority    24586
             Address     000C.856A.50BD
             Cost        4
             Port        3(GigabitEthernet1/0/3)
             Hello Time  2 sec  Max Age 20 sec  Forward Delay 15 sec

  Bridge ID  Priority    28682  (priority 28672 sys-id-ext 10)
             Address     0001.C912.B090
             Hello Time  2 sec  Max Age 20 sec  Forward Delay 15 sec
             Aging Time  20

Interface        Role Sts Cost      Prio.Nbr Type
---------------- ---- --- --------- -------- --------------------------------
Gi1/0/1          Desg FWD 4         128.1    P2p
Gi1/0/3          Root FWD 4         128.3    P2p
Gi1/0/2          Desg FWD 4         128.2    P2p
```
From the initial show spanning tree, looks like the priority is already secondary, but configured it anyways. 


For VLAN20, initial priority is secondary, but we will configure it to be the root bridge as per specifications.

```
DSW2(config)#do sh spanning-tree vlan 20
VLAN0020
  Spanning tree enabled protocol ieee
  Root ID    Priority    28692
             Address     000C.856A.50BD
             Cost        4
             Port        3(GigabitEthernet1/0/3)
             Hello Time  2 sec  Max Age 20 sec  Forward Delay 15 sec

  Bridge ID  Priority    32788  (priority 32768 sys-id-ext 20)
             Address     0001.C912.B090
             Hello Time  2 sec  Max Age 20 sec  Forward Delay 15 sec
             Aging Time  20

Interface        Role Sts Cost      Prio.Nbr Type
---------------- ---- --- --------- -------- --------------------------------
Gi1/0/1          Desg FWD 4         128.1    P2p
Gi1/0/3          Root FWD 4         128.3    P2p
Gi1/0/2          Desg FWD 4         128.2    P2p

DSW2(config)#spanning-tree vlan 20 root primary
DSW2(config)#do sh spanning-tree vlan 20
VLAN0020
  Spanning tree enabled protocol ieee
  Root ID    Priority    24596
             Address     0001.C912.B090
             This bridge is the root
             Hello Time  2 sec  Max Age 20 sec  Forward Delay 15 sec

  Bridge ID  Priority    24596  (priority 24576 sys-id-ext 20)
             Address     0001.C912.B090
             Hello Time  2 sec  Max Age 20 sec  Forward Delay 15 sec
             Aging Time  20

Interface        Role Sts Cost      Prio.Nbr Type
---------------- ---- --- --------- -------- --------------------------------
Gi1/0/1          Desg FWD 4         128.1    P2p
Gi1/0/3          Desg FWD 4         128.3    P2p
Gi1/0/2          Desg FWD 4         128.2    P2p
```

Next, configure HSRP.

Enter the desired VLAN configuration. 
Then match the version (2).
```
DSW2(config)#int vlan 10
DSW2(config-if)#
DSW2(config-if)#standby version 2
```

Configure the same virtual IP as DSW1 (.254 subnet)

```
DSW2(config-if)#standby 10 ip 10.0.10.254
```

Lower the priority here; not necessary since DSW1 was already configured to 105, and the default is 100. However, here's how anyways.

```
DSW2(config-if)#standby 10 priority 95
```

Enable preempt for VLAN 10

```
DSW2(config-if)#standby 10 preempt
```

Same kind of configurations for VLAN 20 given specificaitons.

```
DSW2(config-if)#int vlan 20
DSW2(config-if)#
DSW2(config-if)#standby version 2
DSW2(config-if)#
DSW2(config-if)#standby 20 ip 10.0.20.254
DSW2(config-if)#
%HSRP-6-STATECHANGE: Vlan20 Grp 20 state Init -> Init

DSW2(config-if)#
DSW2(config-if)#standby 20 priority 105 
DSW2(config-if)#standby preempt
DSW2(config-if)#
```

---

DSW1 should be active in VLAN 10, and standby in VLAN 20.
DSW2 should be standby in VLAN 10, and active in VLAN 20. 

Check configurations. 

DSW1
```
DSW1#show standby brief
                     P indicates configured to preempt.
                     |
Interface   Grp  Pri P State    Active          Standby         Virtual IP
Vl10        10   105 P Active   local           10.0.10.2       10.0.10.254    
Vl20        20   95  P Active   local           unknown         10.0.20.254 
```

DSW2
```
DSW2#show standby brief
                     P indicates configured to preempt.
                     |
Interface   Grp  Pri P State    Active          Standby         Virtual IP
Vl10        10   95  P Standby  10.0.10.1       local           10.0.10.254    
Vl20        20   105   Standby  unknown         local           10.0.20.254   
```

Spanning-tree and HSRP synchronizations ensures host in VLAN 10 have a direct path to their gateway, and hosts in VLAN 20 have a direct path to their gateway. 