# Routers & Traffic Flow (Layer 1 to Layer 7)

## What is a Router?
- A networking device that forwards data packets between different networks
- Operates primarily at **Layer 3 (Network Layer)** of the OSI model
- Uses IP addresses and routing tables to determine the best path for data

## How Routers Work
- Maintains a **routing table**: maps destination networks to the next hop
- Uses routing protocols (static routes or dynamic like OSPF, BGP) to learn paths
- Performs **NAT (Network Address Translation)** to allow private IPs to access the internet via a public IP

## Traffic Flow Through OSI Layers (End-to-End Example)
Sending a request from your laptop to a website:

1. **Layer 7 (Application)** – Browser generates an HTTP request
2. **Layer 6 (Presentation)** – Data formatted/encrypted (e.g. TLS/SSL for HTTPS)
3. **Layer 5 (Session)** – Session established between client and server
4. **Layer 4 (Transport)** – TCP breaks data into segments, adds port numbers, handshake occurs
5. **Layer 3 (Network)** – IP header added, source/destination IP addresses attached, router determines path
6. **Layer 2 (Data Link)** – MAC addresses added, frame prepared for physical transmission (switches operate here)
7. **Layer 1 (Physical)** – Data converted to electrical/optical/radio signals and transmitted over the medium

On the receiving end, this process happens in **reverse** (Layer 1 → Layer 7).

## Router vs Switch
| Device | Layer | Function |
|--------|-------|----------|
| Switch | Layer 2 | Connects devices within the same network using MAC addresses |
| Router | Layer 3 | Connects different networks using IP addresses |

## Default Gateway
- The router that a device sends traffic to when the destination is outside its local network
- Every device on a network is configured with a default gateway IP

## Key Takeaways
- Routers operate at Layer 3, forward traffic between networks using IP
- Data traverses all 7 OSI layers when sent from source to destination
- Understanding traffic flow helps in troubleshooting connectivity issues (e.g. is it a DNS, TCP, or routing problem?)
