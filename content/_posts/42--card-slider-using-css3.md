---
title: Card slider using CSS Keyframes
description: Slider animation using css keyframes
category: css
date: 26-05-2017
minutesToRead: 2
---

[CSS Keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/%40keyframes) is a powerful feature to create animations in CSS.

Below is a small snippet I created for slider like animation.

```html
<div id="card">Click me to animate</div>
```

```css
.animate {
  opacity: 1;
  animation: slider 1s linear;
}

@keyframes slider {
  0% {
    margin-left: 0;
    opacity: 1;
  }
  25% {
    margin-left: -200px;
    opacity: 0;
  }
  50% {
    margin-left: 200px;
    opacity: 0;
  }
  100% {
    margin-left: 0;
    opacity: 1;
  }
}

#card {
  background: #1f1f1f;
  margin: 10px;
  display: block;
  border: 1px dashed white;
  height: 200px;
  width: 200px;
  color: white;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  cursor: pointer;
}
```

```js
$("#card").on("click", () => {
  $("#card").addClass("animate");
  setTimeout(() => $("#card").removeClass("animate"), 1000);
});
```

Here is the [link to the codepen](https://codepen.io/prasann/pen/ppNLNL)

Most of the browsers do support keyframes now. [Here](https://caniuse.com/#feat=css-animation) is the "Can I Use" page for keyframes.
