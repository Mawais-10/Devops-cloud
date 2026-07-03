# Ports & Protocols

## What is a Port?
- A logical endpoint (0–65535) used to identify a specific process/service on a device
- IP address gets you to the device; **port** gets you to the specific application on that device

## Port Ranges
| Range | Category |
|-------|----------|
| 0 – 1023 | Well-known ports (reserved for common services) |
| 1024 – 49151 | Registered ports |
| 49152 – 65535 | Dynamic/private ports (ephemeral, used by client side) |

## Common Well-Known Ports
| Port | Service | Protocol |
|------|---------|----------|
| 20/21 | FTP | TCP |
| 22 | SSH | TCP |
| 23 | Telnet | TCP |
| 25 | SMTP | TCP |
| 53 | DNS | TCP/UDP |
| 80 | HTTP | TCP |
| 110 | POP3 | TCP |
| 143 | IMAP | TCP |
| 443 | HTTPS | TCP |
| 3306 | MySQL | TCP |
| 3389 | RDP | TCP |
| 8080 | HTTP alternate | TCP |

## TCP vs UDP
| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented (handshake required) | Connectionless |
| Reliability | Reliable, guarantees delivery | No guarantee, best effort |
| Order | Maintains packet order | No order guarantee |
| Speed | Slower (overhead of handshake, ACKs) | Faster, lightweight |
| Use case | Web browsing, email, file transfer | Video streaming, gaming, DNS queries |

## Why Ports Matter in Cloud/DevOps
- Security Groups and NACLs in AWS control traffic **based on ports**
- Example: opening port 22 for SSH access, port 443 for HTTPS
- Misconfigured ports = major security risk (e.g. leaving 22 open to 0.0.0.0/0)

## Key Takeaways
- IP = "which device", Port = "which application on that device"
- TCP = reliable, ordered; UDP = fast, no guarantees
- Understanding ports is essential for configuring firewalls, security groups, and NACLs
