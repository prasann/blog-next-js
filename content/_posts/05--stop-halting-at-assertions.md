---
title: Stop halting at Assertions
description: Generally assertions cause the test to halt. But sometimes we need to continue further and evaluate all the asserts and expect a comprehensive report of all the asserts.
category: tech,testing
date: 05-03-2010
minutesToRead: 2
---

When I was writing functional tests i stepped into a scenario where i have to continue with the test even after an assertion failure. The idea here is that you find an assertion failing, still you may need to go ahead and check out all the assertions as these tests generally take long time to complete. At the end of the test it will be good to have the summary of all the failures along with the stack trace. I was looking for some testing framework to help out with this functionality but unfortunately cant find any.

Finally using TestNg I implemented this feature. All you need is to write a listener that listens whenever a test fails and simply logs the stack trace without failing the test. There is a neat step by step tutorial given [here ](http://seleniumexamples.com/blog/guide/using-soft-assertions-in-testng)

Though this example has some specific information for Selenium based tests, it works fine with normal functional tests too.

Happy Testing :)
