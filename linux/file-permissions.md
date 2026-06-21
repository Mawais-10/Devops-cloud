# File Permissions Management in Linux

## Introduction to File Permissions

Linux file permissions determine who can read, write, or execute files and directories. Each file and directory has three permission categories:

* **Owner (User)** – The creator or owner of the file.
* **Group** – Users belonging to the assigned group.
* **Others** – All other users on the system.

### Permission Types

| Permission | Symbol | Value | Description             |
| ---------- | ------ | ----- | ----------------------- |
| Read       | `r`    | 4     | View file contents      |
| Write      | `w`    | 2     | Modify file contents    |
| Execute    | `x`    | 1     | Run scripts or programs |

### Checking File Permissions

Use the following command to view file permissions:

```bash
ls -l filename
```

Example output:

```bash
-rwxr--r-- 1 user group 1234 Mar 28 10:00 myfile.sh
```

---

## Changing Permissions with `chmod`

The `chmod` command is used to modify file and directory permissions.

### Using Symbolic Mode

Permissions can be added (`+`), removed (`-`), or assigned (`=`).

#### Examples

```bash
chmod u+x filename
```

Add execute permission for the owner.

```bash
chmod g-w filename
```

Remove write permission from the group.

```bash
chmod o=r filename
```

Set read-only permission for others.

```bash
chmod u=rwx,g=rx,o= filename
```

Grant full access to the owner, read and execute access to the group, and no access to others.

---

### Using Numeric (Octal) Mode

Each permission is represented by a number:

| Permission | Value |
| ---------- | ----- |
| Read       | 4     |
| Write      | 2     |
| Execute    | 1     |

#### Common Examples

```bash
chmod 755 filename
```

* User: `rwx`
* Group: `r-x`
* Others: `r-x`

```bash
chmod 644 filename
```

* User: `rw-`
* Group: `r--`
* Others: `r--`

```bash
chmod 700 filename
```

* User: `rwx`
* Group: `---`
* Others: `---`

---

## Changing Ownership with `chown`

The `chown` command changes the owner and group of a file.

### Change Owner

```bash
chown newuser filename
```

### Change Owner and Group

```bash
chown newuser:newgroup filename
```

### Change Only Group

```bash
chown :newgroup filename
```

### Change Ownership Recursively

```bash
chown -R newuser:newgroup directory/
```

---

## Changing Group Ownership with `chgrp`

Use `chgrp` to change the group assigned to a file or directory.

### Change Group

```bash
chgrp newgroup filename
```

### Change Group Recursively

```bash
chgrp -R newgroup directory/
```

---

## Special Permissions

### SetUID (Set User ID)

Allows users to execute a file with the permissions of the file owner.

```bash
chmod u+s filename
```

**Example:** `/usr/bin/passwd` allows users to change their passwords using elevated privileges.

---

### SetGID (Set Group ID)

For files, users execute the file with the group's permissions.

For directories, newly created files inherit the directory's group.

```bash
chmod g+s filename
```

```bash
chmod g+s directory/
```

---

### Sticky Bit

Used on shared directories so that only the file owner can delete their files.

```bash
chmod +t directory/
```

**Example:** `/tmp`

---

## Default Permissions with `umask`

The `umask` command defines default permissions for newly created files and directories.

### View Current Umask

```bash
umask
```

### Set a New Umask

```bash
umask 022
```

Default permissions become:

* Directories: `755`
* Files: `644`

---

