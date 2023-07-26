---
title: Multi architecture builds of Docker images
description: It is possible to build a docker image for multiple architectures using the same Dockerfile. In this article, will be explaining why you need to do this, how to do it and where to use it.
category: tech, docker
date: 26-07-2023
minutesToRead: 4
---

***"Build once and run anywhere"*** sounds like the perfect way to explain Docker to the newbies. But unfortunately this is not true always. Docker images are architecture specific. You can't run an image built for `amd64` architecture on a `arm64` machine. Let's understand the problem here,

## Why do we need different images for different architectures?

There are a few reasons why we need to have different Docker images for different architectures:

- **Differences in instruction sets:** For example, an x86_64 machine has a different instruction set than an ARM machine. This means that the same Docker image cannot be run on both architectures without being compiled for each architecture.
- **Differences in hardware capabilities:** For example, an ARM machine may have less RAM than an x86_64 machine. This means that a Docker image that is designed to run on an ARM machine may not be able to run on an x86_64 machine without being modified.
- **Differences in operating systems:** For example, a Docker image that is designed to run on Linux cannot be run on Windows without being modified.

By creating separate Docker images for different architectures and operating systems, we can ensure that our images are portable and that they can be run on a wide variety of platforms. This makes it easier for us to deploy our applications and to reach a wider audience.

## Is this a common practice? Does all images are built for multiple architectures?

Generally, the web applications (that most of us work on) aren't built for multiple architectures. Because most of these are typically servers and they are built for `amd64` architecture because most of the servers are `amd64` architecture.

But, if you are building an application for IoT devices, then you need to build for multiple architectures. Because IoT devices are built for different architectures. Example, Raspberry Pi is built for `arm64` architecture. So, if you are building an application for Raspberry Pi, then you need to build for `arm64` architecture.

Applications like Redis, MySQL, nginx etc. are built for multiple architectures. Because these applications are used in servers and IoT devices. So, they need to be built for multiple architectures.

## How to build a Docker image for multiple architectures?

Docker has a feature called [buildx](https://docs.docker.com/buildx/working-with-buildx/) which allows you to build images for multiple architectures. You can use the `buildx` command to build images for multiple architectures.

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t <image-name> .
```

This command will build the image for both `amd64` and `arm64` architectures. You can also build for other architectures like `arm/v7`, `arm/v6`, `s390x`, `ppc64le` etc.

## How to run an architecture specific docker image?

In general, docker pulls in the image based on the architecture. For example, if you are running on Mac M1/M2(apple processors) docker automatically pulls in `arm64` images. If you are running on a Linux machine, docker pulls in `amd64` images. However, if you want to run a specific architecture image, you can do so by specifying the platform.

```bash
docker run --platform linux/arm64 <image-name>
```
or in the docker base image you can specify the platform.

```dockerfile
FROM --platform=linux/arm64 alpine
```

*Note:* Likely the images won't be working as expected in a different architecture. So, it is not a good idea to run an image built for `amd64` architecture on a `arm64` machine.
