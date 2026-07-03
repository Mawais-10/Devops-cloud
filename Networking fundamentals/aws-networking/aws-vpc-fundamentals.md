# AWS VPC Fundamentals

## What is a VPC?
- **VPC (Virtual Private Cloud)** = a logically isolated virtual network within AWS
- Lets you define your own IP address range, subnets, route tables, and gateways
- Foundation for almost all AWS networking

## Key Components of a VPC

### 1. CIDR Block
- Defines the IP address range for the VPC (e.g. `10.0.0.0/16`)
- All subnets within the VPC come from this range

### 2. Subnets
- Subdivisions of the VPC CIDR block
- **Public Subnet**: has a route to the Internet Gateway (resources can be reached from internet)
- **Private Subnet**: no direct route to internet (used for databases, internal services)

### 3. Internet Gateway (IGW)
- Attached to the VPC to allow communication between VPC resources and the internet
- Required for any public subnet to have internet access

### 4. NAT Gateway
- Allows resources in a **private subnet** to initiate outbound internet connections (e.g. for updates)
- Does NOT allow inbound connections from the internet
- Placed in a public subnet

### 5. Route Tables
- Set of rules (routes) that determine where network traffic is directed
- Each subnet is associated with a route table
- Example: `0.0.0.0/0 → Internet Gateway` (send all internet-bound traffic to IGW)

## Basic VPC Architecture
```
VPC (10.0.0.0/16)
 ├── Public Subnet (10.0.1.0/24) → Route Table → IGW
 │      └── EC2 instance (web server)
 └── Private Subnet (10.0.2.0/24) → Route Table → NAT Gateway
        └── RDS Database
```

## VPC Traffic Flow Example (Public EC2 to Internet)
1. EC2 instance in public subnet sends request
2. Route table sends traffic to Internet Gateway
3. IGW translates and routes to the internet
4. Response follows the same path back

## VPC Traffic Flow Example (Private EC2 to Internet - Outbound Only)
1. EC2 instance in private subnet needs to download an update
2. Route table sends traffic to NAT Gateway (in public subnet)
3. NAT Gateway forwards request to Internet Gateway using its own public IP
4. Response returns via NAT Gateway back to the private instance

## Default VPC vs Custom VPC
- AWS provides a **default VPC** in every region with default subnets and IGW already configured
- Production environments typically use a **custom VPC** for more control over architecture and security

## Key Takeaways
- VPC = your own isolated network inside AWS
- Public subnet = internet-facing, Private subnet = internal only
- IGW enables two-way internet access; NAT Gateway enables one-way (outbound) access for private resources
