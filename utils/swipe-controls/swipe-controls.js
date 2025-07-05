/**
 * Swipe Controls to Arrow Keys Translator
 * A sassy little script that converts touch swipes and mouse drags into arrow key events
 *
 * Usage: Just include this script and it'll automatically start working!
 * Works on touch devices (swipes) and desktop (mouse drags), translating gestures to keyboard arrow events.
 * Quick taps/clicks generate Enter key events for action buttons.
 */

class SwipeToArrowKeys {
  constructor(options = {}) {
    // Configuration with some sensible defaults
    this.minSwipeDistance = options.minSwipeDistance || 50;
    this.maxSwipeTime = options.maxSwipeTime || 300;
    this.maxTapTime = options.maxTapTime || 200; // Quick tap for Enter key
    this.element = options.element || document;

    // Touch tracking variables
    this.startX = 0;
    this.startY = 0;
    this.startTime = 0;
    this.isTracking = false;

    // Mouse tracking variables
    this.mouseDown = false;

    // Bind them methods so they don't lose their context
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.init();
  }

  init() {
    // Add touch event listeners
    this.element.addEventListener("touchstart", this.handleTouchStart, {
      passive: false,
    });
    this.element.addEventListener("touchend", this.handleTouchEnd, {
      passive: false,
    });
    this.element.addEventListener("touchmove", this.handleTouchMove, {
      passive: false,
    });

    // Add mouse event listeners for desktop support
    this.element.addEventListener("mousedown", this.handleMouseDown, {
      passive: false,
    });
    this.element.addEventListener("mouseup", this.handleMouseUp, {
      passive: false,
    });
    this.element.addEventListener("mouseleave", this.handleMouseLeave, {
      passive: false,
    });

    console.log(
      "🎮 Swipe controls are locked and loaded! Touch and mouse support enabled."
    );
  }

  handleTouchStart(event) {
    const touch = event.touches[0];
    this.startX = touch.clientX;
    this.startY = touch.clientY;
    this.startTime = Date.now();
    this.isTracking = true;
  }

  handleTouchMove(event) {
    if (!this.isTracking) return;

    // Prevent default scrolling behavior
    event.preventDefault();
  }

  handleTouchEnd(event) {
    if (!this.isTracking) return;

    const touch = event.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    const endTime = Date.now();

    // Calculate the distance and time
    const deltaX = endX - this.startX;
    const deltaY = endY - this.startY;
    const deltaTime = endTime - this.startTime;

    // Reset tracking
    this.isTracking = false;

    // Check if this counts as a valid swipe
    if (deltaTime > this.maxSwipeTime) {
      return; // Too slow
    }

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // Check for quick tap (Enter key)
    if (deltaTime <= this.maxTapTime && absX < this.minSwipeDistance && absY < this.minSwipeDistance) {
      this.fireArrowKey("Enter", "Quick tap detected! Enter key fired! 👆");
      return;
    }

    if (absX < this.minSwipeDistance && absY < this.minSwipeDistance) {
      return; // Not far enough
    }

    // Determine swipe direction and fire the appropriate arrow key
    if (absX > absY) {
      // Horizontal swipe
      if (deltaX > 0) {
        this.fireArrowKey("ArrowRight", "Right swipe detected! 👉");
      } else {
        this.fireArrowKey("ArrowLeft", "Left swipe detected! 👈");
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        this.fireArrowKey("ArrowDown", "Down swipe detected! 👇");
      } else {
        this.fireArrowKey("ArrowUp", "Up swipe detected! 👆");
      }
    }
  }

  handleMouseDown(event) {
    this.mouseDown = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startTime = Date.now();
    console.log("🖱️ Mouse down detected, tracking drag...");
    event.preventDefault();
  }

  handleMouseUp(event) {
    if (!this.mouseDown) return;

    const endX = event.clientX;
    const endY = event.clientY;
    const endTime = Date.now();

    // Calculate the distance and time
    const deltaX = endX - this.startX;
    const deltaY = endY - this.startY;
    const deltaTime = endTime - this.startTime;

    // Reset tracking
    this.mouseDown = false;

    console.log(
      `🖱️ Mouse up - deltaX: ${deltaX}, deltaY: ${deltaY}, deltaTime: ${deltaTime}`
    );

    // Check if this counts as a valid swipe
    if (deltaTime > this.maxSwipeTime) {
      console.log("🖱️ Mouse drag too slow, ignoring");
      return; // Too slow
    }

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // Check for quick tap (Enter key)
    if (deltaTime <= this.maxTapTime && absX < this.minSwipeDistance && absY < this.minSwipeDistance) {
      this.fireArrowKey("Enter", "Quick mouse tap detected! Enter key fired! 🖱️");
      return;
    }

    if (absX < this.minSwipeDistance && absY < this.minSwipeDistance) {
      console.log("🖱️ Mouse drag too short, ignoring");
      return; // Not far enough
    }

    // Determine swipe direction and fire the appropriate arrow key
    if (absX > absY) {
      // Horizontal swipe
      if (deltaX > 0) {
        this.fireArrowKey("ArrowRight", "Right mouse drag detected! 👉");
      } else {
        this.fireArrowKey("ArrowLeft", "Left mouse drag detected! 👈");
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        this.fireArrowKey("ArrowDown", "Down mouse drag detected! 👇");
      } else {
        this.fireArrowKey("ArrowUp", "Up mouse drag detected! 👆");
      }
    }
  }

  handleMouseLeave(event) {
    this.mouseDown = false;
    console.log("🖱️ Mouse left the area, stopping tracking");
  }

  fireArrowKey(keyCode, message) {
    console.log(message);

    // Create and dispatch keyboard events
    const keydownEvent = new KeyboardEvent("keydown", {
      key: keyCode,
      code: keyCode,
      keyCode: this.getKeyCodeNumber(keyCode),
      which: this.getKeyCodeNumber(keyCode),
      bubbles: true,
      cancelable: true,
    });

    const keyupEvent = new KeyboardEvent("keyup", {
      key: keyCode,
      code: keyCode,
      keyCode: this.getKeyCodeNumber(keyCode),
      which: this.getKeyCodeNumber(keyCode),
      bubbles: true,
      cancelable: true,
    });

    // Fire the events on the document or specified element
    const target = this.element === document ? document.body : this.element;
    target.dispatchEvent(keydownEvent);

    // Small delay between keydown and keyup for realism
    setTimeout(() => {
      target.dispatchEvent(keyupEvent);
    }, 50);
  }

  getKeyCodeNumber(keyName) {
    const keyCodes = {
      ArrowUp: 38,
      ArrowDown: 40,
      ArrowLeft: 37,
      ArrowRight: 39,
      Enter: 13,
    };
    return keyCodes[keyName] || 0;
  }

  // Method to remove event listeners if needed
  destroy() {
    this.element.removeEventListener("touchstart", this.handleTouchStart);
    this.element.removeEventListener("touchend", this.handleTouchEnd);
    this.element.removeEventListener("touchmove", this.handleTouchMove);
    this.element.removeEventListener("mousedown", this.handleMouseDown);
    this.element.removeEventListener("mouseup", this.handleMouseUp);
    this.element.removeEventListener("mouseleave", this.handleMouseLeave);
    console.log("👋 Swipe controls have been disabled!");
  }
}

// Auto-initialize when the page loads, because we're helpful like that
document.addEventListener("DOMContentLoaded", () => {
  // Create a global instance for easy access
  window.swipeControls = new SwipeToArrowKeys({
    minSwipeDistance: 30, // Minimum pixels for a swipe
    maxSwipeTime: 500, // Maximum time in milliseconds
    maxTapTime: 200, // Maximum time for a quick tap (Enter key)
    element: document, // Listen on the whole document
  });
});

// Also provide a way to customize it if folks want to get fancy
window.SwipeToArrowKeys = SwipeToArrowKeys;
