# Real-World DevOps Shell Scripts

Practical automation scripts combining everything from previous modules — the kind of scripts used daily in DevOps roles.

| Script | Purpose |
|---|---|
| [backup.sh](./backup.sh) | Backs up a directory with timestamp, keeps last N backups |
| [health_check.sh](./health_check.sh) | Checks disk, memory, and CPU usage, alerts if thresholds exceeded |
| [log_cleanup.sh](./log_cleanup.sh) | Deletes log files older than N days |
| [user_management.sh](./user_management.sh) | Creates a Linux user with a home directory and group |
| [service_monitor.sh](./service_monitor.sh) | Checks if a service is running, restarts it if not |
| [deploy.sh](./deploy.sh) | Simple deployment script: pull latest code, restart app |

Each script is self-contained, commented, and safe to read through — run with `bash <script>.sh` (some need root/sudo for real system changes).
