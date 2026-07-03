# TCP 3-Way Handshake

## What is the TCP Handshake?
- A process used to establish a reliable connection between a client and a server before data transfer begins
- Ensures both sides are ready to communicate and agree on initial sequence numbers

## The 3 Steps

### Step 1: SYN (Synchronize)
- Client sends a `SYN` packet to the server
- Says: "I want to connect, here's my initial sequence number"

### Step 2: SYN-ACK (Synchronize-Acknowledge)
- Server responds with `SYN-ACK`
- Says: "I acknowledge your request, here's my sequence number too"

### Step 3: ACK (Acknowledge)
- Client sends back `ACK`
- Says: "Acknowledged, connection established"

```
Client                     Server
  |------ SYN --------------->|
  |<---- SYN-ACK -------------|
  |------ ACK --------------->|
        Connection Established
```

## Why 3 Steps? (Not 2 or 4)
- 2-way wouldn't confirm both directions are open
- 3-way is the minimum needed for **both sides** to confirm they can send AND receive

## Connection Termination (4-Way)
Closing a TCP connection uses a 4-step process:
1. Client sends `FIN` (finish)
2. Server sends `ACK`
3. Server sends its own `FIN`
4. Client sends final `ACK`

## Why TCP Handshake Matters
- Ensures reliable, ordered delivery of data (unlike UDP)
- Relevant for understanding load balancer behavior, security group rules, and network troubleshooting
- SYN floods (many SYNs with no ACK) are a common DDoS attack technique

## Key Takeaways
- TCP handshake = SYN → SYN-ACK → ACK
- Establishes a reliable, two-way connection before actual data transfer
- Termination is a separate 4-step FIN/ACK process
