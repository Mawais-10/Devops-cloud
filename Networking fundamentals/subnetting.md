# Subnetting

## What is Subnetting?
- Process of dividing a large network into smaller, manageable sub-networks (subnets)
- Improves network performance, security, and IP management

## Why Subnet?
- Reduces broadcast traffic
- Isolates network segments (e.g. public vs private resources)
- Efficient use of IP address space
- Required for structuring AWS VPCs (public subnet / private subnet)

## Subnet Mask
- Defines which part of an IP is the **network** portion and which is the **host** portion
- Example: `255.255.255.0` = /24 → first 24 bits = network, last 8 bits = host

## How to Calculate Hosts in a Subnet
- Formula: **2^(32 - prefix) - 2**
- The "-2" accounts for Network Address and Broadcast Address (not assignable to hosts)

### Example: /24 subnet
- 2^(32-24) = 2^8 = 256 total addresses
- 256 - 2 = 254 usable host addresses

### Example: /28 subnet
- 2^(32-28) = 2^4 = 16 total addresses
- 16 - 2 = 14 usable host addresses

## Subnetting Example Walkthrough
Given: `192.168.1.0/24` → divide into 4 subnets

- Borrow 2 bits from host portion → new prefix = /26
- Each subnet size = 2^(32-26) = 64 addresses

| Subnet | Network Address | Usable Range | Broadcast Address |
|--------|------------------|---------------|--------------------|
| 1 | 192.168.1.0/26 | .1 – .62 | 192.168.1.63 |
| 2 | 192.168.1.64/26 | .65 – .126 | 192.168.1.127 |
| 3 | 192.168.1.128/26 | .129 – .190 | 192.168.1.191 |
| 4 | 192.168.1.192/26 | .193 – .254 | 192.168.1.255 |

## Network Address vs Broadcast Address
- **Network Address**: first IP in subnet, identifies the subnet itself (not assignable)
- **Broadcast Address**: last IP in subnet, used to send data to all hosts (not assignable)

## Subnetting in AWS VPC Context
- A VPC is given a CIDR block (e.g. `10.0.0.0/16`)
- That CIDR is split into smaller subnets (e.g. `10.0.1.0/24` for public, `10.0.2.0/24` for private)
- AWS reserves **5 IPs** per subnet (not just 2):
  - Network address
  - VPC router
  - DNS server
  - Future use
  - Broadcast address

## Key Takeaways
- Subnetting = breaking a network into smaller pieces
- More bits borrowed for subnet = smaller subnets, more of them
- Essential skill for designing AWS VPC architecture
