# IP Addressing & CIDR

## What is an IP Address?
- IP (Internet Protocol) address is a unique identifier assigned to a device on a network.
- Allows devices to locate and communicate with each other.
- Two versions: **IPv4** (32-bit) and **IPv6** (128-bit).

## IPv4 Structure
- Written as 4 octets separated by dots: `192.168.1.1`
- Each octet = 8 bits, range 0–255
- Total 32 bits = 2^32 ≈ 4.3 billion addresses

## Types of IP Addresses
| Type | Description |
|------|-------------|
| Public IP | Globally unique, routable on the internet |
| Private IP | Used within local networks, not routable on internet |
| Static IP | Manually assigned, doesn't change |
| Dynamic IP | Assigned automatically (DHCP), can change |

## Private IP Ranges (RFC 1918)
- `10.0.0.0 – 10.255.255.255` (10.0.0.0/8)
- `172.16.0.0 – 172.31.255.255` (172.16.0.0/12)
- `192.168.0.0 – 192.168.255.255` (192.168.0.0/16)

## IP Address Classes (legacy concept)
| Class | Range | Default Subnet Mask |
|-------|-------|---------------------|
| A | 1.0.0.0 – 126.255.255.255 | 255.0.0.0 |
| B | 128.0.0.0 – 191.255.255.255 | 255.255.0.0 |
| C | 192.0.0.0 – 223.255.255.255 | 255.255.255.0 |
| D | 224.0.0.0 – 239.255.255.255 | Multicast |
| E | 240.0.0.0 – 255.255.255.255 | Experimental |

## What is CIDR?
- **CIDR** = Classless Inter-Domain Routing
- Replaces the old class-based system with flexible-length subnet masking
- Written as `IP/prefix` e.g. `192.168.1.0/24`
- The number after `/` = how many bits are fixed for the network portion

## CIDR Examples
| CIDR | Subnet Mask | Total IPs | Usable IPs |
|------|-------------|-----------|------------|
| /32 | 255.255.255.255 | 1 | 1 |
| /24 | 255.255.255.0 | 256 | 254 |
| /16 | 255.255.0.0 | 65,536 | 65,534 |
| /8 | 255.0.0.0 | 16,777,216 | 16,777,214 |

## Why CIDR Matters (especially for AWS)
- Used to define VPC and subnet address ranges in AWS
- Smaller CIDR (e.g. /28) = fewer IPs = smaller subnet
- Larger CIDR (e.g. /16) = more IPs = larger network

## Key Takeaways
- IP = device identity on a network
- CIDR = flexible way to represent network size
- Private IPs are used for internal communication; NAT/Gateway needed for internet access
