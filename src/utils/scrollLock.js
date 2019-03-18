if (typeof document !== "undefined" && typeof window !== "undefined") {
  const div = document.createElement("div");
  div.style.overflowY = "scroll";
  div.style.width = "50px";
  div.style.height = "50px";
  div.style.visibility = "hidden";
  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);

  var body = document.getElementsByTagName("body")[0];
  var html = document.getElementsByTagName("html")[0];
  var locked = false;
  var bodyScrollTop = null;
}

export function getScrollSize() {
  return scrollWidth;
}

export function getBodyScrollTop() {
  return typeof window.pageYOffset !== "undefined"
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
}

export function lockScroll() {
  if (!locked) {
    window.lockScrollEvents = true;
    if (body.offsetHeight < body.scrollHeight) {
      body.style.paddingRight = "" + scrollWidth + "px";
    }
    bodyScrollTop = getBodyScrollTop();
    console.log("bodyScrollTop", bodyScrollTop);
    body.classList.add("scroll-locked");
    window.scrollTo(bodyScrollTop, 0);
    html.style.background = "#fff";
    body.style.top = `-${bodyScrollTop}px`;

    locked = true;
    setTimeout(function() {
      window.lockScrollEvents = false;
    }, 100);
  }
}

export function unlockScroll() {
  if (locked) {
    bodyScrollTop = getBodyScrollTop();
    window.lockScrollEvents = true;
    body.classList.remove("scroll-locked");
    body.style.top = null;
    html.style.background = null;
    body.style.paddingRight = "";
    locked = false;
    window.scrollTo(0, bodyScrollTop);
    setTimeout(function() {
      window.lockScrollEvents = false;
    }, 100);
  }
}

function onWheel(e) {
  e = e || window.event;
  e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

export function toggleLockWheelScroll(lock) {
  if (document.addEventListener) {
    if ("ontouchmove" in document) {
      if (lock) {
        document.addEventListener("ontouchmove", onWheel);
      } else {
        document.removeEventListener("ontouchmove", onWheel);
      }
    }
    if ("onwheel" in document) {
      // IE9+, FF17+, Ch31+
      if (lock) {
        document.addEventListener("wheel", onWheel);
      } else {
        document.removeEventListener("wheel", onWheel);
      }
    } else if ("onmousewheel" in document) {
      // устаревший вариант события
      if (lock) {
        document.addEventListener("mousewheel", onWheel);
      } else {
        document.removeEventListener("mousewheel", onWheel);
      }
    } else {
      // Firefox < 17
      if (lock) {
        document.addEventListener("MozMousePixelScroll", onWheel);
      } else {
        document.removeEventListener("MozMousePixelScroll", onWheel);
      }
    }
  } else {
    // IE8-
    document.attachEvent("onmousewheel", onWheel);
  }
}
