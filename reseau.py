RTA(config)# hostname RTA
RTA(config)# enable secret Ciscoenpa55
RTA(config)# line console 0
RTA(config-line)# password Ciscolinepa55
RTA(config-line)# login
RTA(config-line)# exit
RTA(config)# banner motd #Message de bannière du jour#


RTA(config)# interface GigabitEthernet0/0
RTA(config-if)# description Connexion à Commutateur1
RTA(config-if)# ip address 10.10.10.1 255.255.255.0
RTA(config-if)# no shutdown
RTA(config-if)# exit

RTA(config)# interface GigabitEthernet0/1
RTA(config-if)# description Connexion à SW2
RTA(config-if)# ip address 10.10.20.1 255.255.255.0
RTA(config-if)# no shutdown
RTA(config-if)# exit

RTA(config)# end
RTA# copy running-config startup-config


SW1(config)# interface vlan 1
SW1(config-if)# ip address 10.10.10.2 255.255.255.0
SW1(config-if)# no shutdown
SW1(config-if)# exit

SW1(config)# enable secret Ciscoenpa55
SW1(config)# line console 0
SW1(config-line)# password Ciscolinepa55
SW1(config-line)# login
SW1(config-line)# exit
SW1(config)# line vty 0 15
SW1(config-line)# password Ciscolinepa55
SW1(config-line)# login
SW1(config-line)# exit
SW1(config)# ip default-gateway 10.10.10.1

SW1(config)# end
SW1# copy running-config startup-config



ipconfig /all
ipconfig /release
ipconfig /renew
ping 10.10.10.1
ping 10.10.10.2 (pour tester la connectivité avec SW1)
ping 10.10.20.1 (pour tester la connectivité avec RTA)
