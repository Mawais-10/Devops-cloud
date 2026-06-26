# Disk and Storage Management in Linux

## Introduction to Disk and Storage Management

Managing disks and storage efficiently is crucial for system performance and stability. Linux provides various commands to monitor, partition, format, mount, and manage disk storage.

---

# Index of Commands Covered

## Viewing Disk Information

* `lsblk` – Display block devices
* `fdisk -l` – List disk partitions
* `blkid` – Show UUIDs of devices
* `df -h` – Check disk space usage
* `du -sh /path` – Show size of a directory

## Partition Management

* `fdisk /dev/sdX` – Create and manage partitions
* `parted /dev/sdX` – Alternative to fdisk for GPT disks
* `mkfs.ext4 /dev/sdX1` – Format a partition as ext4
* `mkfs.xfs /dev/sdX1` – Format a partition as XFS

## Mounting and Unmounting

* `mount /dev/sdX1 /mnt` – Mount a partition
* `umount /mnt` – Unmount a partition
* `mount -o remount,rw /mnt` – Remount a partition as read-write

## Logical Volume Management (LVM)

* `pvcreate /dev/sdX` – Create a physical volume
* `vgcreate vg_name /dev/sdX` – Create a volume group
* `lvcreate -L 10G -n lv_name vg_name` – Create a logical volume
* `mkfs.ext4 /dev/vg_name/lv_name` – Format an LVM partition
* `mount /dev/vg_name/lv_name /mnt` – Mount an LVM partition

## Swap Management

* `mkswap /dev/sdX` – Create a swap partition
* `swapon /dev/sdX` – Enable swap space
* `swapoff /dev/sdX` – Disable swap space

---

# Viewing Disk Information

## Using lsblk

List all block devices:

```bash
lsblk
```

### Purpose

* Displays available disks
* Shows partitions
* Displays mount points
* Helps identify storage devices

### Example Output

```text
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0 100G  0 disk
├─sda1   8:1    0  96G  0 part /
└─sda2   8:2    0   4G  0 part [SWAP]
sdb      8:16   0  20G  0 disk
```

---

## Using fdisk

View partition details:

```bash
sudo fdisk -l
```

### Purpose

* Lists all disks
* Displays partition information
* Shows partition sizes and types

---

## Using blkid

Display UUID information:

```bash
sudo blkid
```

### Purpose

* Shows UUIDs of partitions
* Useful for configuring `/etc/fstab`
* Identifies filesystems

---

## Using df

Check available disk space:

```bash
df -h
```

### Explanation

* `-h` = Human-readable format

### Purpose

* Shows free disk space
* Displays used storage
* Monitors filesystem capacity

---

## Using du

Find the size of a directory:

```bash
du -sh /var/log
```

### Explanation

* `-s` = Summary
* `-h` = Human-readable

### Purpose

* Identify large directories
* Analyze storage consumption

---

# Partition Management

## Creating a Partition with fdisk

```bash
sudo fdisk /dev/sdX
```

### Common Commands Inside fdisk

| Key | Action                 |
| --- | ---------------------- |
| n   | Create a new partition |
| d   | Delete a partition     |
| p   | Print partition table  |
| w   | Save changes and exit  |
| q   | Exit without saving    |

After creating a partition:

```bash
lsblk
```

Verify that the new partition exists.

---

## Using parted

Alternative partition management tool for GPT disks:

```bash
sudo parted /dev/sdX
```

### Features

* Supports GPT partition tables
* Handles large disks
* Interactive partition management

---

## Formatting a Partition

### Format as ext4

```bash
sudo mkfs.ext4 /dev/sdX1
```

### Format as XFS

```bash
sudo mkfs.xfs /dev/sdX1
```

### Purpose

* Creates a filesystem
* Prepares a partition for use
* Erases existing data

---

# Mounting and Unmounting

## Mount a Partition

```bash
sudo mount /dev/sdX1 /mnt
```

### Purpose

* Makes the filesystem accessible
* Connects storage to the Linux directory tree

---

## Unmount a Partition

```bash
sudo umount /mnt
```

### Purpose

* Safely disconnects the filesystem
* Prevents data corruption

---

## Remount a Partition

```bash
sudo mount -o remount,rw /mnt
```

### Purpose

* Changes mount options without unmounting
* Enables read-write access

---

# Logical Volume Management (LVM)

## Create a Physical Volume

```bash
sudo pvcreate /dev/sdX
```

### Purpose

* Converts a disk into an LVM physical volume

---

## Create a Volume Group

```bash
sudo vgcreate vg_name /dev/sdX
```

### Purpose

* Combines one or more physical volumes
* Creates a storage pool

---

## Create a Logical Volume

```bash
sudo lvcreate -L 10G -n lv_name vg_name
```

### Explanation

* `-L 10G` = Size of logical volume
* `-n lv_name` = Logical volume name

---

## Format the Logical Volume

```bash
sudo mkfs.ext4 /dev/vg_name/lv_name
```

---

## Mount the Logical Volume

```bash
sudo mount /dev/vg_name/lv_name /mnt
```

### Purpose

* Makes LVM storage accessible

---

# Swap Management

## Create a Swap Partition

```bash
sudo mkswap /dev/sdX
```

### Purpose

* Prepares a partition for swap usage

---

## Enable Swap

```bash
sudo swapon /dev/sdX
```

### Purpose

* Activates swap memory

---

## Disable Swap

```bash
sudo swapoff /dev/sdX
```

### Purpose

* Deactivates swap memory

---

# Additional Notes - When to Use fdisk, mount, or Both

## Check Available Disks

Before creating or mounting anything, always check available block devices:

```bash
lsblk
```

### Example Output

```text
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0 100G  0 disk
├─sda1   8:1    0  96G  0 part /
└─sda2   8:2    0   4G  0 part [SWAP]
sdb      8:16   0  20G  0 disk
```

### Interpretation

* `sda` → Existing disk already partitioned
* `sdb` → New disk with no partitions

---

## When to Use fdisk

Use `fdisk` when:

* The disk is brand new
* No partitions exist
* You need to create `/dev/sdb1`, `/dev/sdb2`, etc.

Example:

```bash
sudo fdisk /dev/sdb
```

Inside fdisk:

```text
n → Create a new partition
w → Save changes
```

Verify:

```bash
lsblk
```

---

## When to Use mount

Use `mount` when:

* The partition already exists
* The partition is formatted
* You simply want access to the storage

Example:

```bash
sudo mkdir /mnt/mydisk
sudo mount /dev/sdb1 /mnt/mydisk
```

The disk becomes accessible through:

```text
/mnt/mydisk
```

---

## When to Use fdisk + mkfs + mount

Use this complete process when:

* The disk is completely new
* It has never been partitioned
* It needs to be prepared for use

### Full Setup Example

```bash
# 1. Check available disks
lsblk

# 2. Create partition
sudo fdisk /dev/sdb

# 3. Format the partition
sudo mkfs.ext4 /dev/sdb1

# 4. Create mount point
sudo mkdir /data

# 5. Mount the partition
sudo mount /dev/sdb1 /data
```

---

