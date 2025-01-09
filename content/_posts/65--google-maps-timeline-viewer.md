---
title: View your Google timeline information on the Web in 2025
description: Learn how to view your Google Maps timeline and places information on the web.
date: 02-01-2025
minutesToRead: 4
---

## Google Maps Timeline

If you use an Android phone, Google Maps is probably your default location service. In 2023, Google [announced](https://blog.google/products/maps/updates-to-location-history-and-new-controls-coming-soon-to-maps/) that timeline information would be stored on the device itself to protect user privacy.

After this update, timeline information is no longer stored on Google servers but only on your mobile device. This means you can't view your timeline on the web anymore.

If you use timeline information to remember places you've visited, you now have to do this within the mobile app. While this can be inconvenient, it enhances user privacy, which is a positive step.

## What is Timeline Information?

There are two types of timeline data:

1. **Google Takeout Data**: Includes your timeline edits, contributions to Google Maps (like reviews and photos), favorited places, and created collections. It doesn't include the timeline paths showing where you visited and when.

2. **Mobile App Data**: Includes the coordinates of places you visited, the times you visited them, and the modes of transport you used. This helps track your visits and correlate them with your photos and notes.

To download this data on your Android phone, go to Location -> Location Services -> Timeline -> Export Timeline Data. This file will be large and contains sensitive information, so handle it carefully.

## Workaround for the Web

I got the idea of using [Kepler](https://kepler.gl/demo) to visualize timeline data on the web from this [gist](https://gist.github.com/devdattaT/018f7fc153d9a82d83775351576965f3). However, at the time of writing this article, the gist didn't work with the new data format.

Instead, you can use the [Google Maps Timeline Parser](https://github.com/prasann/google-timeline-parser) repository to parse the recent data format and output CSV files.

There are two outputs that you get out of the scripts in the repository.

1. **Timeline Path**: Contains all the paths Google thinks you have taken. Plotting this on Kepler gives you many points, showing a cluster of paths.
2. **Places**: Contains all the places you have visited. Plotting this on Kepler gives you a clear picture of the places you have visited.

Using the script in the repo, generate the csv files and upload them to [Kepler](https://kepler.gl/demo). You can now visualize your timeline data on the web.
