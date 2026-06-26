# Linux System Monitoring

## Introduction to System Monitoring

Monitoring system resources is essential to ensure optimal performance, detect issues, and troubleshoot problems in Linux. Various tools allow us to monitor CPU, memory, disk usage, network activity, and running processes.

---

# Index of Commands Covered

## CPU and Memory Monitoring

* `top` – Real-time system monitoring
* `htop` – Interactive process viewer (requires installation)
* `vmstat` – Report system performance statistics
* `free -m` – Show memory usage

## Disk Monitoring

* `df -h` – Check disk space usage
* `du -sh /path` – Show disk usage of a specific directory
* `iostat` – Display CPU and disk I/O statistics

## Network Monitoring

* `ifconfig` – Show network interfaces (deprecated, use `ip a`)
* `ip a` – Show network interface details
* `netstat -tulnp` – Show active connections and listening ports
* `ss -tulnp` – Alternative to netstat for socket statistics
* `ping hostname` – Test network connectivity
* `traceroute hostname` – Show network path to a host
* `nslookup domain` – Get DNS resolution details

## Log Monitoring

* `tail -f /var/log/syslog` – Live monitoring of system logs
* `journalctl -f` – Live system logs for systemd-based distributions
* `dmesg | tail` – View kernel logs

---

# CPU and Memory Monitoring

## Using `top`

To view real-time CPU and memory usage:

```bash
top
```

Press `q` to quit.

### Features

* Displays CPU utilization
* Shows memory and swap usage
* Lists running processes
* Updates in real-time

---

## Using `htop`

A user-friendly alternative to `top`:

```bash
htop
```

### Features

* Colorful and interactive interface
* Easy process navigation
* Supports mouse interaction
* Allows process management

Use arrow keys to navigate and `F9` to kill processes.

---

## Using `vmstat`

To check CPU, memory, and I/O statistics:

```bash
vmstat 1 5
```

### Explanation

* `1` = Update every 1 second
* `5` = Show 5 updates

Useful for analyzing system performance over time.

---

## Checking Memory Usage

```bash
free -m
```

### Features

* Shows total memory
* Displays used memory
* Displays free memory
* Values are shown in megabytes (MB)

---

# Disk Monitoring

## Using `df`

Check available disk space:

```bash
df -h
```

### Explanation

* `-h` = Human-readable format (KB, MB, GB)

Useful for monitoring filesystem storage usage.

---

## Using `du`

Find the size of a specific directory:

```bash
du -sh /var/log
```

### Explanation

* `-s` = Summary only
* `-h` = Human-readable output

Helps identify directories consuming large amounts of storage.

---

## Using `iostat`

Check disk and CPU statistics:

```bash
iostat
```

### Features

* CPU utilization statistics
* Disk read/write activity
* Input/output performance metrics

---

# Network Monitoring

## Checking Network Interfaces

Display IP addresses and network interfaces:

```bash
ip a
```

### Information Displayed

* IP addresses
* Network adapters
* Interface status
* MAC addresses

---

## Viewing Open Ports and Connections

### Using netstat

```bash
netstat -tulnp
```

### Using ss

```bash
ss -tulnp
```

### Purpose

* Show listening ports
* Display active network connections
* Identify running network services

---

## Testing Connectivity

### Using ping

```bash
ping google.com
```

Tests internet and network connectivity.

### Using traceroute

```bash
traceroute google.com
```

Shows the path packets take from your system to the destination host.

---

## Checking DNS Resolution

```bash
nslookup example.com
```

### Purpose

* Resolve domain names
* Verify DNS functionality
* View DNS server responses

---

# Log Monitoring

## Live Monitoring of System Logs

### Using tail

```bash
tail -f /var/log/syslog
```

### Explanation

* `-f` = Follow log updates in real-time

Useful for troubleshooting and monitoring system activity.

---

### Using journalctl

```bash
journalctl -f
```

Displays live logs on systemd-based Linux distributions.

---

## Checking Kernel Logs

```bash
dmesg | tail
```

### Purpose

* View recent kernel messages
* Check hardware-related events
* Diagnose boot and driver issues

---
