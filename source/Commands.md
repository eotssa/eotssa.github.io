## Native VLAN on a Router (ROAS)

Method 1
```
R1(config)#int g0/0.10
R1(config-subif)#encapsulation dot1q VLAN-ID native
R1(config-subif)#
```
