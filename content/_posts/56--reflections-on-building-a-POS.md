---
title: Reflections on building an Enterprise POS
description: I was part of a team that built and rolled out POS machines to around 1000 stores. Sharing some of my key take aways from that engagement.
category: tech
date: 03-06-2022
minutesToRead: 7
---

### Why build and not buy?

There are big players like NCR and Diebold that manufacture POS hardware units and combine them with software. These are very useful to start with, mostly they are windows based and will have close integration with the hardware and peripherals. And also to top it, they have maintenance plan to take care of the hardware/software and peripherals.

Now, it makes a lot of sense to buy them directly if you have to manage a small amount of POS (~100s)

However, for a bigger organisations this might not be sustainable. Certainly cost will be a factor, but more than cost the interoperability with other system is a key thing. If you are an organisation that will be managing 1000s of POS, then certainly you have your own systems/platform to orchestrate your business. And also POS will be one of the main revenue channel for the business and hence it needs to be embedded with the other channel of delivery to offer a greater customer experience as-well make the system management lot easier.

### Drawing parallels with POS architecture

Technical architecture for the point of sale systems will be a hybrid of mobile app architecture and of cloud services.

**Mobile client vs POS**

POS has an advantage over mobile architecture, in terms of storage and computation power. And also POS are usually single purpose machines unlike mobile phones.

Where it varies is that is on the fact that they aren't personally owned/managed devices. A POS will have lots of end users using the system, and hence an increased sense of security is needed here and another desired aspect of POS is that, when stuck they needs to be restored (automatically) without a human intervention.

One of the huge difference i felt is the need for our POS to support end users even when it's offline.

**Cloud service vs POS**

Very likely we will need to run a full blown server inside a POS system to get the required features running. It will have certainly lots of components, that need to co-ordinate with each other to make it possible. For ex, an automatic updater, hardware/peripheral integrators.

Another significant challenge here is that you will have to run and manage N such servers (where N is the number of POS you support). this is certainly an operation nightmare with regards to monitoring.

### Key decisions that we had to take

- **How to deliver data**
  - POS are built as offline first servers. It will need lots of amount of product/pricing and promotions data upfront. They can store them there will be enough storage, however to deliver them efficiently will be a key factor.
  - Serve data that's needed for that POS and not the universal data
  - Most of the e-commerce apps on mobile aren't offline first. We can demand the user to have good/decent internet. However in case of POS it's store network and the expectation we can't close the store just because it's not having a good network.
  - Try to look out for "Download once and share" technique. Alternate could be torrent like mechanism (p2p downloads)
- **How to deliver software and upgrades**
  - Decide on a mechanism to deliver the software, upgrades and the security patches.
  - What's the difference? Need to make sure that the terminals are upgraded. Unlike mobile, these aren't personal devices and hence need to control them automatically.
  - Delivery mechanism shouldn't physical (or manual). Remote upgrades only. convenient to apply patches
  - again lookout for "Download once and share" techniques.
- **Securing server**
  - You are exposing a server in front of the end user.
  - These aren't personal devices and hence more concern about security.
  - What if POS is shop lifted? can't compromise all the data inside it. can't allow it to transact.
- **Integration with hardware**
  - huge concern, due to the availability of range of hardwares and
  - options: build an unified hardware interface so you can mock it while testing the rest.
- **Monitoring Driven development**
  - Monitoring is key, need to know how many systems are rolled out, and which versions they are running.
  - Monitors for errors. Use metrics as smoke detector and logs on demand forwarding.
