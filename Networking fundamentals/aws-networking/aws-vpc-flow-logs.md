# AWS VPC Flow Logs

## What are VPC Flow Logs?
- A feature that captures information about the **IP traffic** going to and from network interfaces in a VPC
- Helps with monitoring, troubleshooting, and security analysis

## What Flow Logs Capture
- Source and destination IP address
- Source and destination port
- Protocol used
- Number of packets and bytes transferred
- Action taken: `ACCEPT` or `REJECT`
- Timestamps (start/end of capture window)

## Where Flow Logs Can Be Created
1. **VPC level** – captures traffic for all network interfaces in the VPC
2. **Subnet level** – captures traffic for all interfaces in a specific subnet
3. **Network Interface (ENI) level** – captures traffic for a single interface

## Flow Log Destinations
- **Amazon CloudWatch Logs** – for real-time monitoring and alerting
- **Amazon S3** – for long-term storage and later analysis
- **Amazon Kinesis Data Firehose** – for streaming to analytics tools

## Sample Flow Log Record Format
```
version account-id interface-id srcaddr dstaddr srcport dstport protocol packets bytes start end action log-status
2 123456789010 eni-1235b8ca 172.31.16.139 172.31.16.21 20641 22 6 20 4249 1418530010 1418530070 ACCEPT OK
```

## Common Use Cases
- **Troubleshooting connectivity issues**: check if traffic is being rejected by a Security Group/NACL
- **Security monitoring**: detect unusual traffic patterns, port scanning, or unauthorized access attempts
- **Compliance & auditing**: maintain records of network traffic for audits
- **Cost/traffic analysis**: understand traffic patterns between resources

## Important Notes
- Flow logs do **not** capture:
  - DNS traffic from the AWS-provided DNS resolver
  - DHCP traffic
  - Traffic to the reserved IP for the VPC router
- Enabling flow logs does not impact network throughput or latency

## Key Takeaways
- VPC Flow Logs = visibility into network traffic within your VPC
- Essential tool for debugging "why is my traffic being blocked" issues
- Can be sent to CloudWatch or S3 depending on the use case (real-time vs long-term storage)
