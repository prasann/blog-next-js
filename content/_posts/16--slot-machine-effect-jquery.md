---
title: Slot machine effect using jQuery
description: A cool widget that looks like a slot machine. Small piece of code and a nice trick to animate the numbers to achieve a slot machine effect.
category: javascript,tricks,Tech
date: 25-09-2011
minutesToRead: 2
---

**Slot Machine Effect:**

**Requisite:**

- jQuery 1.5+

**Idea:**

- Create an element to display the animation.
- Next create an empty element say <div></div> and set its position: 'fixed'
- Set the position of the empty element to the Start Value of the slot.
- Now use jQuery animate to move the empty element from Start value to the specified End Value in a given duration.
- jQuery animate has a step() method which gives you the current position of the div for every unit of time.
- Now inside this step() method set the display element's text to the current position value of the empty element.
- Since empty element moves from start value to end value, you will see the numbers changing from start value to end value in the display area.

**Javascript Code:**

```js
$('#animate\_btn').click(function() {
    cashFlow($('.value'), $('#startVal').val(), $('#endVal').val(),
        $('#duration').val() \* 1000, $('#decimal').val());
});

cashFlow = function(elem, from, to, duration, decimal) {
    var magicObject;
    if (typeof magicObject === 'undefined') {
        magicObject = $('<div></div>').appendTo('body');
    }
    magicObject.css({
        position: "fixed",
        left: from
    }).animate({
        left: to
    }, {
        duration: duration,
        step: function(currentLeft) {
            elem.html(Number(currentLeft).toFixed(decimal));
        },
        complete: function() {
            magicObject.remove();
        }
    });
};

```
