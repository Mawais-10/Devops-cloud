# Hands-on Projects — Networking & AWS VPC

## Project 1: Build a Custom VPC from Scratch

### Goal
Create a VPC with public and private subnets, and verify connectivity.

### Steps
1. Create a VPC with CIDR block `10.0.0.0/16`
2. Create a **public subnet**: `10.0.1.0/24`
3. Create a **private subnet**: `10.0.2.0/24`
4. Create and attach an **Internet Gateway** to the VPC
5. Create a **Route Table** for the public subnet:
   - Add route `0.0.0.0/0 → Internet Gateway`
   - Associate this route table with the public subnet
6. Launch an EC2 instance in the public subnet
   - Verify it can be reached via SSH/HTTP from the internet
7. Launch an EC2 instance in the private subnet
   - Verify it is NOT reachable directly from the internet

### Expected Outcome
- Public EC2 instance is accessible from the internet
- Private EC2 instance is isolated, only reachable from within the VPC

---

## Project 2: Enable Outbound Internet Access for Private Subnet (NAT Gateway)

### Goal
Allow the private subnet EC2 instance to access the internet for updates, without being publicly reachable.

### Steps
1. Allocate an **Elastic IP**
2. Create a **NAT Gateway** in the public subnet, attach the Elastic IP
3. Update the **private subnet's route table**:
   - Add route `0.0.0.0/0 → NAT Gateway`
4. From the private EC2 instance, test outbound access:
   - `sudo yum update` or `ping 8.8.8.8` (if ICMP allowed)
5. Confirm the private instance still cannot be accessed directly from the internet

### Expected Outcome
- Private instance can reach the internet (outbound only)
- No inbound internet traffic can reach the private instance directly

---

## Project 3: Configure Security Groups and NACLs

### Goal
Practice layered security using both Security Groups and NACLs.

### Steps
1. Create a Security Group allowing:
   - Inbound SSH (22) only from your IP
   - Inbound HTTP (80) from anywhere
2. Attach this SG to the public EC2 instance
3. Create a custom NACL for the public subnet:
   - Allow inbound 80 and 22 (with matching rule numbers)
   - Allow outbound ephemeral ports (1024–65535) for return traffic
   - Deny a specific IP range you choose (test rule)
4. Test access before and after applying the deny rule

### Expected Outcome
- Understand how SG (stateful) and NACL (stateless) rules interact
- See how a NACL deny rule blocks traffic even if SG allows it

---

## Project 4: VPC Flow Logs for Traffic Analysis

### Goal
Enable and analyze VPC Flow Logs to debug connectivity.

### Steps
1. Enable Flow Logs at the VPC level, destination: CloudWatch Logs
2. Generate some traffic (successful and blocked, e.g. try connecting on a closed port)
3. Go to CloudWatch Logs and inspect the flow log entries
4. Identify `ACCEPT` vs `REJECT` entries and match them to your SG/NACL rules

### Expected Outcome
- Comfortable reading flow log records
- Able to diagnose "why can't I connect" issues using flow logs

---

## Key Takeaways
- These projects tie together CIDR, subnetting, routing, IGW, NAT, SG, NACL, and Flow Logs
- Practicing hands-on in the AWS Console (or via Terraform/CLI later) solidifies the theory
- Recommended next step: automate this VPC setup using Infrastructure as Code (Terraform)
