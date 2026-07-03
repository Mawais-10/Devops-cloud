# AWS Security Groups vs NACL

## Two Layers of Network Security in AWS VPC
1. **Security Groups (SG)** – operate at the instance level
2. **Network ACLs (NACL)** – operate at the subnet level

## Security Groups (SG)

### Key Characteristics
- Acts as a **virtual firewall for EC2 instances** (and other resources)
- **Stateful**: if inbound traffic is allowed, the outbound return traffic is automatically allowed (and vice versa)
- Only supports **Allow** rules (no explicit Deny)
- Evaluates **all rules** before deciding (no ordering)
- Can reference other security groups as a source/destination

### Example SG Rule
| Type | Protocol | Port | Source |
|------|----------|------|--------|
| SSH | TCP | 22 | My IP |
| HTTPS | TCP | 443 | 0.0.0.0/0 |

## Network ACL (NACL)

### Key Characteristics
- Acts as a **firewall at the subnet level** — applies to all resources in that subnet
- **Stateless**: inbound and outbound rules must be defined separately; return traffic is NOT automatically allowed
- Supports both **Allow** and **Deny** rules
- Rules are evaluated **in order** (by rule number, lowest first) — first match wins
- Default NACL allows all traffic; custom NACLs deny all by default until rules are added

### Example NACL Rules
| Rule # | Type | Protocol | Port | Source | Allow/Deny |
|--------|------|----------|------|--------|------------|
| 100 | HTTP | TCP | 80 | 0.0.0.0/0 | ALLOW |
| 200 | SSH | TCP | 22 | 203.0.113.0/24 | ALLOW |
| * | ALL | ALL | ALL | 0.0.0.0/0 | DENY |

## Security Group vs NACL Comparison
| Feature | Security Group | NACL |
|---------|-----------------|------|
| Level | Instance level | Subnet level |
| State | Stateful | Stateless |
| Rule types | Allow only | Allow & Deny |
| Rule evaluation | All rules evaluated | Ordered, first match wins |
| Applies to | Individual resources (attached explicitly) | All resources in the subnet automatically |

## Why Use Both?
- Security Groups: fine-grained control per resource (e.g. only allow SSH from your IP to a specific EC2)
- NACLs: broad subnet-level protection (e.g. explicitly block a malicious IP range from an entire subnet)
- Together they form a **defense-in-depth** strategy

## Key Takeaways
- SG = stateful, instance-level, allow-only
- NACL = stateless, subnet-level, allow + deny, rule order matters
- Use SGs for day-to-day access control, NACLs for broader subnet-level security policies
