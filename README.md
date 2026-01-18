# ![Project Name](/assets/projectname.svg)

A compact homelab with 2 Raspberry Pis, a TP-Link TL-SG105S switch, and a custom web dashboard.

## Features
- 3D Printed Modular Case
- 3.5-inch GPIO Screen
- Web Dashboard for system stats
- Power Hub
- Custom Stickers!

## Hardware Specs

| Device                | RAM   | Storage                                | Role                                |
|-----------------------|-------|----------------------------------------|-------------------------------------|
| Raspberry Pi 3B+      | 1GB   | 32GB SD Card                           | Web dashboard & GPIO display        |
| Raspberry Pi 4B       | 2GB   | 8TB HDD, 256GB SSD, 32GB SD Card       | Main homelab processes, NAS         |
| TP-Link TL-SG105S     | N/A   | N/A                                    | Network switch (Cat6 Ethernet)      |

## Services Running

### Raspberry Pi 3B+ (1GB)
- Cloudflare Tunnel (dashboard)
- Python scripts (gathers stats from both Pis, outputs JSON)
- pygame (runs 3.5-inch GPIO screen)

### Raspberry Pi 4B (2GB)
- Samba NAS
  - 8TB HDD (permanent storage)
  - 256GB SSD (removable)

### TP-Link TL-SG105S
- Network switch connecting everything

## Case Model
- **Model:** [Microlab by CB4D](https://makerworld.com/en/models/1062225-microlab-mini-modular-home-server-rack)  
- 3D printed modular design for neat rack organization

<div align="center">
  <img src="/assets/logo.svg">
</div>
