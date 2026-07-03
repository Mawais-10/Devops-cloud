# DNS (Domain Name System)

## What is DNS?
- DNS translates human-readable domain names (e.g. `google.com`) into IP addresses (e.g. `142.250.190.14`)
- Often called the "phonebook of the internet"

## Why DNS is Needed
- Humans remember names easily, not IP addresses
- Allows IPs to change behind the scenes without users needing to know the new IP

## DNS Resolution Flow (Step by Step)
1. User types `www.example.com` in browser
2. Browser checks local **cache** first
3. If not cached, request goes to **Recursive Resolver** (usually provided by ISP)
4. Resolver queries a **Root DNS Server** → returns address of TLD server (.com, .org, etc.)
5. Resolver queries the **TLD Server** → returns address of the Authoritative Name Server
6. Resolver queries the **Authoritative Name Server** → returns the actual IP address
7. Resolver sends IP back to browser
8. Browser connects directly to the IP address of the server

## DNS Hierarchy
```
Root Server
   └── TLD Server (.com, .net, .org)
         └── Authoritative Name Server (example.com)
```

## Common DNS Record Types
| Record | Purpose |
|--------|---------|
| A | Maps domain to IPv4 address |
| AAAA | Maps domain to IPv6 address |
| CNAME | Maps domain/subdomain to another domain (alias) |
| MX | Mail exchange server for the domain |
| TXT | Text records (verification, SPF, DKIM) |
| NS | Specifies authoritative name servers for the domain |
| SOA | Start of Authority — admin info about the DNS zone |

## DNS Caching & TTL
- **TTL (Time to Live)**: how long a DNS record is cached before it must be re-queried
- Reduces load on DNS servers and speeds up repeated lookups

## DNS in AWS
- **Route 53** is AWS's managed DNS service
- Used to route traffic to AWS resources (EC2, Load Balancers, S3, CloudFront)
- Supports routing policies: simple, weighted, latency-based, failover, geolocation

## Key Takeaways
- DNS = name-to-IP translation system
- Resolution involves Root → TLD → Authoritative server chain
- Understanding DNS is critical for troubleshooting connectivity issues in cloud environments
