---
title: '[CCNA] CLI Part 1'
categories: IT
date: 2024-02-22 17:32:48
tags:
---

## Privileged EXEC Mode
Provides complete access to view device configuration, restart the device, etc.

Cannot change the configuration, but can change the time on the device, save configuration files, and more.
```
Router>enable
Router#
## '#' indicates privileged EXEC mode
```


## How to Enter Global Configuration Mode

```
Router>enable
Router#configure terminal
## conf t
```

## Enable Password
```
Router(config)#enable password LINE

Router(config)#exit
Router#exit
## Now I am logged out of the device
Router>
Router>enable
Password:
Router#
```

## Running-Config / Startup Config

```
Router#show running-config
## shows our current config, if any changes were made
```

```
Router#show startup-config
startup-config is not present
## Why? 
## Running config isn't saved yet, so default config will be loaded.
```

## Saving the Running Configuration

```BASH
Router#write

Router#write memory 

Router#copy cunning-config startup-config
```

# Service password-encryption

- Changes the way passwords are displayed. 
- If enabled, current passwords will be encrypted.
	- Future passwords will be encrypted.
	- `enable secrets` will not be affected
- If you disable `servie password-encryption`:
	- current passwords will not be decrypted

```
Router# conf t

Router(config)#service password-encryption
```

## Enable Secret Command 

```
Router(config)#enable secret Cisco
Router(config)#do sh run
```
- Uses MD5 encryption, but a little tougher to crack than regular password encryption. 
- `enable secret` does not require the `password-encryption` command to be enabled. 


## Canceling Commands
- Use `no`
```
Router(config)#no service password-encryption
```


## Overview
- `Router>` = user EXEC mode
- `Router#` = privileged EXEC mode
- `Router(config)#` = global configuration mode

```
Router>enable
## used to enter privileged EXEC mode

Router#configure terminal
## used to enter global configuration mode

Router(config)#enable password LINE
## configures a password to protect previliege EXEC mode

Router(config)#service password-encryption
## encrypts the enable password (and other passwords)

Router(config)#enable secret LINE
## configures a more secure, always-encrypted enable password.

Router(config)#run privileged-exec-level [command]
## run is used to escalate previleges to global configuration mode

Router(config)#no [command]
## removes the command

Router(config)#show running-config
## displays current, active config file

Router(config)#show startup-config
## displays the saved config file which will be loaded if the device is restarted

-------------
## Below are all three to save running config 
Router#write

Router#write memory 

Router#copy cunning-config startup-config
```
