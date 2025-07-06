# 🎮 How to Add Swipe Controls to Your Games

Well honey, integrating swipe controls into your existing games is easier than pie! Here's how to get your games workin' with touch swipes:

## 📋 Step 1: Include the Script

First things first, sugar - add the swipe controls script to your game HTML file:

```html
<!-- Add this before your closing </body> tag -->
<script src="../swipe-controls.js"></script>
```

That's it! The script will automatically initialize and start converting swipes to arrow keys.

## 🎯 Step 2: Your Games Already Work!

Since your games (like Pac-Man) already listen for arrow key events, they'll automatically work with swipes! The script translates:

- 👆 **Swipe Up** → Arrow Up Key
- 👇 **Swipe Down** → Arrow Down Key
- 👈 **Swipe Left** → Arrow Left Key
- 👉 **Swipe Right** → Arrow Right Key

## ⚙️ Step 3: Customize (Optional)

Want to get fancy? You can customize the swipe settings:

```html
<script>
  // Wait for the page to load, then customize
  document.addEventListener("DOMContentLoaded", () => {
    // The global swipeControls instance is automatically created
    // You can access it and modify settings if needed

    // Or create your own custom instance
    const customSwipeControls = new SwipeToArrowKeys({
      minSwipeDistance: 40, // Shorter swipes needed
      maxSwipeTime: 600, // Longer time allowed for swipes
      element: document.getElementById("gameArea"), // Target specific element
    });
  });
</script>
```

## 🔧 Step 4: Example Integration

Here's how you'd add it to your Pac-Man game:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Your existing head content -->
  </head>
  <body>
    <!-- Your existing game content -->

    <!-- Add the swipe controls script -->
    <script src="../swipe-controls.js"></script>

    <!-- Your existing game script -->
    <script>
      // Your game code here...
      // It already listens for arrow keys, so swipes will work automatically!
    </script>
  </body>
</html>
```

## 🎮 Step 5: Test It Out!

Open your game on a mobile device or tablet and start swiping! The swipes will be converted to arrow key presses that your game already understands.

**Pro tip:** You can test on desktop too by clicking and dragging with your mouse!

## 🛠️ Advanced Usage

For more control, you can listen to the actual keyboard events that get fired:

```javascript
// Listen for the translated arrow key events
document.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
    console.log(`Arrow key detected: ${event.key}`);
    // Your game logic here
  }
});

// Or disable the automatic swipe controls and handle manually
if (window.swipeControls) {
  window.swipeControls.destroy();
}

// Create custom handler
const customControls = new SwipeToArrowKeys({
  element: document.getElementById("my-game-area"),
});
```

## 💡 Tips & Tricks

- **Sensitivity:** Adjust `minSwipeDistance` for shorter/longer swipes
- **Speed:** Change `maxSwipeTime` for faster/slower swipe recognition
- **Area:** Set `element` to limit swipes to a specific game area
- **Debug:** Check the browser console to see swipe detection messages

[Try the Demo](https://jlambert23.github.io/odyc-projects/utils/swipe-controls/swipe-demo.html)
