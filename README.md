<div align="center">
 <h1>SUPERVISORY CONTROL AND DATA ACQUISITION IN POWER SYSTEM</h1>
 <h3>ĐIỀU KHIỂN GIÁM SÁT VÀ THU THẬP DỮ LIỆU TRONG HỆ THỐNG ĐIỆN</h3>
</div>

## Contents
- [<code>Introduce</code>](#-installation)
- [<code>Power Supply Design for An Industrial Plant</code>](#-music-management)
- [<code>Control Panel Design</code>](#-playlist-management)
- [<code>SCADA for Power System</code>](#-controls)
- [<code>Demonstration</code>](#-configuration)
- [<code>Requirements</code>](#-cache)
- [<code>References</code>](#-update)

# INTRODUCE
$${\color{#AC3097}Install \space \color{#56565E}Retro}$$ 
```sh
wget https://github.com/XORbit01/retro/releases/download/v0.0.46/installer.tar.gz
tar -xvf installer.tar.gz
chmod +x installer.sh
./installer.sh
```
this installer is for linux of `systemd` based systems, if you are using other systems you can install it manually by compiling the source code then run the server as you like with `make build`.

$${\color{#AC3097}Uninstall \space \color{#56565E}Retro}$$
```sh
~/.local/bin/uninstall_retro.sh
```

# DESIGNING A POWER SUPPLY FOR AN INDUSTRIAL PLANT
$${\color{#AC3097}Play \space \color{#56565E} Music}$$
```sh
retro play "Despacito - Luis Fonsi"                      # you can search and play music by name
```
*play command is smart enough to play music from different sources, you can play music by name, url, file path, directory path, queue, and playlist.*
```sh
retro play "https://www.youtube.com/watch?v=kJQP7kiw5Fk" # you can play music by url
retro play queue_music                                   # you can play music from queue, you can do this with music index in the queue
retro play ~/Music/Despacito.mp3                         # you can play music by file path 
retro play ~/Music/                                      # you can play music by directory path, it will play all music in the directory
retro play queue_music                                   # it prioritize music in queue and play it first you can do this with music index in the queue
retro play playlist_name                                 # you can play music from playlist
```

