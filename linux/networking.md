# Networking Commands

## Introduction

Networking commands in Linux help administrators and users diagnose network issues, verify connectivity, inspect network interfaces, monitor connections, and transfer data over the internet.

---

## 1. ping

Checks connectivity to a remote server or host.

```bash id="p1c9vq"
ping google.com
```

### Purpose

* Verifies internet connectivity
* Tests communication with a remote server
* Measures network response time (latency)

### Example Output

```bash id="f5v6gg"
64 bytes from google.com: icmp_seq=1 ttl=117 time=25.3 ms
```

---

## 2. ifconfig

Displays network interface information.

```bash id="f4mqku"
ifconfig
```

### Purpose

* Shows network interfaces
* Displays IP addresses
* Provides network statistics

### Note

`ifconfig` is deprecated on many modern Linux distributions. Use `ip a` instead.

---

## 3. ip a

Displays detailed information about network interfaces and IP addresses.

```bash id="8j9n4f"
ip a
```

### Purpose

* Shows IPv4 and IPv6 addresses
* Displays interface status
* Shows MAC addresses

### Example

```bash id="gtvflz"
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP>
```

---

## 4. netstat

Displays active network connections and listening ports.

```bash id="fph43q"
netstat -tulnp
```

### Option Breakdown

* `-t` = TCP connections
* `-u` = UDP connections
* `-l` = Listening ports
* `-n` = Show numerical addresses
* `-p` = Show process IDs

### Purpose

* View open ports
* Monitor active connections
* Identify services listening on ports

---

## 5. curl

Fetches content from a URL.

```bash id="rjlwm4"
curl https://example.com
```

### Purpose

* Retrieve webpage content
* Test APIs
* Download data from servers

### Example

```bash id="6xm2fr"
curl https://api.github.com
```

---

## 6. wget

Downloads files from the internet.

```bash id="4nto0f"
wget https://example.com/file.zip
```

### Purpose

* Download files
* Resume interrupted downloads
* Retrieve web content

### Example

```bash id="4f5ny5"
wget https://example.com/software.tar.gz
```

---

# Summary Table

| Command                             | Description                                 |
| ----------------------------------- | ------------------------------------------- |
| `ping google.com`                   | Checks connectivity to a remote server      |
| `ifconfig`                          | Displays network interfaces (deprecated)    |
| `ip a`                              | Shows IP addresses and interface details    |
| `netstat -tulnp`                    | Displays open network connections and ports |
| `curl https://example.com`          | Fetches webpage or API content              |
| `wget https://example.com/file.zip` | Downloads files from the internet           |

---

