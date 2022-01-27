---
title: FTP Client (Ubuntu)
description: Download multiple files from authenticated FTP server in Ubuntu.
category: tech,ubuntu
date: 31-08-2010
minutesToRead: 2
---
Today was about to download multiple files from an authenticated FTP server. The native ftp client of Ubuntu didn't help me as expected. I was trying to log into the FTP server and was constantly getting disconnected when trying to perform some operation. When browsed for some alternative found this ncftp client. This actually worked instantly and was pretty easy in installing.

**_Install NCFTP:_**  
`sudo apt-get install ncftp`

**_Log into FTP server:_ **  
`ncftp -u username hostname -p`

it will prompt for password enter it. Type '?' in the terminal for the list of commands and there you go :)

Check out the NCFTP client for other platforms.
