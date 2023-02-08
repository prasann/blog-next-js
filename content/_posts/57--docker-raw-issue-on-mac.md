---
title: Huge docker raw file on mac
description: Docker desktop on Mac creates a huge file (`docker.raw`) in it's data folder. I spent some time in unravelling the mystery, so documenting for future me.
category: tech, docker
date: 08-11-2022
minutesToRead: 3
---

When you run [Docker desktop On Mac](https://www.docker.com/products/docker-desktop/),  you will notice a single huge `docker.raw` file inside the data directory (`~/Library/Containers/com.docker.docker/Data/vms/0/data`) of Docker. 

The size of this file is defined in the user settings. 

> Settings -> Resources -> Virtual disk limit

**What is this docker.raw?**

Recently, the [docker faq](https://docs.docker.com/desktop/faqs/macfaqs/#where-does-docker-desktop-store-linux-containers-and-images) section is updated with this explanation

> *" Docker Desktop stores Linux containers and images in a single, large “disk image” file in the Mac filesystem."*

**What's strange about this?**

When you do `ls -alh` inside this directory, you will see the size of the file to be this maximum 
size that's defined in the docker desktop preferences. It will be a constant number, and doesn't depend on the number of local containers and images you have in there. 

```shell
32G  Docker.raw
```
 
Even a fresh installation of Docker without any images or containers will also have the same effect and running `docker system prune` will have no impact on the size you see here.

However, if you check the disk usage,  it will be much lesser.

`du -h .`

In my case, it was

```shell
1.7G Docker.raw
```

This is the actual space used by the local images and containers. If this number is equal or almost close to the max size, you can run the `docker system prune` to reclaim the space.

**What's the issue here?**

Docker team claims that, this is perfectly normal and blame the tools that reports incorrectly in their docs.

However, Mac will use the maximum allotted space for the disk space calculation and warns you that you are low on storage when you hit the limits.

I'm not sure who is to blame here, docker team or the Mac Osx. Since it happens only with docker, I guess docker is doing something wrong here.

Here is the whole [mega Github thread](https://github.com/docker/for-mac/issues/2297) on this issue

**What can I do about this?**

Docker FAQs suggest that you can reduce the size in the settings page or move this file to an external mounted storage.

Keeping this number to a small means, there will be lesser containers cached in your local system.