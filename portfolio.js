document.addEventListener('DOMContentLoaded',function(event){
  const preloader = document.querySelector(".preloader-title")
  const preText = new SplitType("#preloader-title")

  function timeoutFunction(callback, delay) {
    setTimeout(callback, delay);
  }

  
  
  //beginTypeWriter()

  function backwards(){
    if(counter < 2){
      counter++
      gsap.fromTo(preText.chars.reverse(),{
        y:0
      },{
        y:115,
        stagger: 0.1,
        delay: 0.4,
        duration: 0.8,
        ease: "sine.in",
        onComplete: forwards
      })
    }
    else if(counter == 2){
      checkScreen(bigScreens)
    }
  }

  function forwards(){
    if(counter < 2){
      counter++
      gsap.fromTo(preText.chars.reverse(),{
        y: 115
        },
        {y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "sine.out",
        onComplete: backwards
      },)
    }
    else if(counter == 2){
      checkScreen(bigScreens)
    }
    
  }
  var counter = 0
  function runSequence() {
    gsap.to('#preloader-title',{
      opacity:1,
    })
    gsap.to(preText.chars,
        {y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 0.4,
        duration: 0.8,
        ease: "sine.out",
        onComplete: backwards
    },)
  }

// setTimeout(runSequence, 2000)
   
  runSequence()
  
  var pageLoad = 0
  // setTimeout(function() {
  //   const mainContent = document.querySelector('.about')
  //   mainContent.style.display = "initial"
  // }, 4000);
    //pageRevealMobile()
});

//media query

function checkScreen(x) {
  if (x.matches) { 
    pageReveal()
  } else {
    pageRevealMobile()
    //services animation
gsap.from(".web-dev", {
  scrollTrigger: {
  trigger: ".web-dev",
  start: 'top center',
  //markers:true
  },
  x:-400,
  ease: "easeInSine",
  //delay: 0.4,
  duration: 1
});

gsap.from(".maintenance", {
  scrollTrigger: {
  trigger: ".maintenance",
  start: 'top center',
  //markers:true
  },
  x:-400,
  ease: "easeInSine",
  //delay: 0.4,
  duration: 1
})

gsap.from(".seo", {
  scrollTrigger: {
  trigger: ".maintenance",
  start: 'center 55%',
  //markers:true
  },
  x:-400,
  ease: "easeInSine",
  //delay: 0.4,
  duration: 1
})
  }
}


var bigScreens = window.matchMedia("(min-width: 768px)")






// page reveal

function pageReveal(){
  gsap.to(".hero", {
    duration: 2,
    delay:0.4,
    clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "power3.inOut",
    onStart: () => {
      gsap.fromTo(".hero",
      {
        transform: "scale(0.7)"
      }, 
      {
      transform: "scale(1)",
      duration: 2.25,
      ease: "power3.inOut",
      delay: 0.4,
      });

      gsap.to("#preloader",{
        clipPath: "polygon(0 45%, 100% 45%, 100% 45%, 0 45%);",
        duration: 1,
        ease: "power3.in",

        })
    },onComplete: () =>{
      gsap.to(".position",{
        opacity:1,
        delay: 0.4,
        onStart: beginTypeWriter
      })

      gsap.to("nav",{
        opacity:1,
        duration:0.6,
        ease: "sine.in",
        delay: 0.5,
        top: "2rem"
      })

      gsap.fromTo(".cta",{
        x: 100
      },
      {
        x:0,
        opacity:1,
        duration:0.6,
        delay: 0.5,
        ease: "sine.in",
      })
      gsap.to(".arrow-container",{
        opacity:1,
        duration:0.6,
        delay: 0.5,
        ease: "sine.in",
      })
    }
  })
}

//counter animation
gsap.from(".tools", {
  scrollTrigger: {
  trigger: ".tools",
  start: 'top center',
  //markers:true
  },
  onStart: ()=>{
    const counters = document.querySelectorAll('.tool-proficiency');

    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-percentage');
        const count = +counter.innerText.replace('%', '');
        const increment = target / 100; // Adjust this value to control the speed

        if (count < target) {
          counter.innerText = Math.ceil(count + increment) + '%';
          setTimeout(updateCount, 100); // Adjust this value to control the speed
        } else {
          counter.innerText = target + '%';
        }
      };

      updateCount();
    });
  }
});




//revealing text on scroll
const splitCustom = document.querySelectorAll('.scroll-reveal-custom')
splitCustom.forEach((char, i) => {
  const text = new SplitType(char, { types: 'words'})
  gsap.from(text.words, {
    scrollTrigger: {
    trigger: char,
    start: 'center 80%',
    end: 'top 20%',
    scrub: true,
    },
    opacity: 0.2,
    stagger: 0.2
  })
})

const splitText = document.querySelectorAll('.scroll-reveal')
splitText.forEach((char, i) => {
  const text = new SplitType(char, { types: 'words'})
  gsap.from(text.words, {
    scrollTrigger: {
    trigger: char,
    start: 'top 80%',
    end: 'bottom 80%',
    scrub: true,
    },
    opacity: 0.2,
    stagger: 0.2
  })
})

const splitChars = document.querySelectorAll('.character-scroll-reveal')
splitChars.forEach((char, i) => {
  const text = new SplitType(char, { types: 'char'})
  gsap.from(text.chars, {
    scrollTrigger: {
    trigger: char,
    start: 'top 80%',
    end: 'top 60%',
    scrub: true,
    },
    opacity: 0.2,
    stagger: 0.2
  })
})


// smooth scroll
const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

function easeOutSine(x) {
  return Math.sin((x * Math.PI) / 2);
}


// scroll to link smoothly
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        lenis.scrollTo(targetElement,{
          duration: 2,
          easing: easeOutSine,
          offset: 50,
          immediate: false,
          lock: true
        });
      });
});


//menu animation
const menuToggler = document.querySelector('.menu-toggle');
let body = document.querySelector('body');

const links = document.querySelectorAll('.title')
links.forEach(l =>{
  l.addEventListener('click', function(){
    body.classList.toggle('open');
  })
})

menuToggler.addEventListener('click', function(){
  body.classList.toggle('open');
});

//page reveal mobile
function pageRevealMobile(){
  gsap.to(".hero", {
    duration: 2,
    delay:0.4,
    clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "power3.inOut",
    onStart: () => {
      gsap.fromTo(".hero", 
      {
      duration: 2.25,
      ease: "power3.inOut",
      delay: 0.4,
      });

      gsap.to("#preloader",{
        clipPath: "polygon(0 45%, 100% 45%, 100% 45%, 0 45%);",
        duration: 1,
        ease: "power3.in",

        })
    },onComplete: () =>{
      gsap.fromTo(".position",{
        x: -300
      },{
        opacity:1,
        delay: 0.4,
        duration: 0.6,
        ease:"sine-in",
        x:0,
        onStart: beginTypeWriter
      })

      gsap.to("#preloader",{
        display: "none"
      })

      gsap.fromTo(".menu-toggle",{
        y:-100
      },{
        opacity:1,
        duration:0.6,
        ease: "sine.in",
        delay: 0.4,
        y: 0
      })

      gsap.fromTo(".mobile-logo",{
        y:-100
      },{
        opacity:1,
        duration:0.6,
        ease: "sine.in",
        delay: 0.4,
        y: 0
      })

      gsap.to(".cta",{
        opacity:1,
        duration:0.6,
        ease: "sine.in",
        delay: 0.4
      })

      gsap.to(".arrow-container",{
        opacity:1,
        duration:0.6,
        delay: 0.5,
        ease: "sine.in",
        onComplete: ()=>{
          gsap.to(".hero",{
            clipPath: "none",
          })

          
        }
      })
    }
  })
}


// type writer effect

function beginTypeWriter(){
  var dataText = [ "Full-Stack Developer", "who loves design"];
        
        
    function typeWriter(text, i, fnCallback) {
        if (i < (text.length)) {
        document.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span class="caret" aria-hidden="true"></span>';

            setTimeout(function() {
            typeWriter(text, i + 1, fnCallback)
            }, 250);
        }
        else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 700);
        }
    }
    function StartTextAnimation(i) {
        if (typeof dataText[i] == 'undefined'){
            setTimeout(function() {
            StartTextAnimation(0);
            }, 20000);
        }
        if (i < dataText[i].length) {
        typeWriter(dataText[i], 0, function(){
        StartTextAnimation(i + 1);
        });
        }
    }
    StartTextAnimation(0);
}



// carousel 
const wrapper = document.querySelector(".wrapper");
const boxes = gsap.utils.toArray(".box");
console.clear();


let activeElement;
if(bigScreens.matches){
  const loop = horizontalLoop(boxes, {
    paused: true, 
    draggable: true, // make it draggable
    center: true, // active element is the one in the center of the container rather than th left edge
    onChange: (element, index) => { // when the active element changes, this function gets called.
      activeElement && activeElement.classList.remove("active");
      element.classList.add("active");
      activeElement = element;
    }
  });
  
  boxes.forEach((box, i) => box.addEventListener("click", () => loop.toIndex(i, {duration: 0.8, ease: "power1.inOut"})));
}







/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot.
 */
function horizontalLoop(items, config) {
  let timeline;
  items = gsap.utils.toArray(items);
  config = config || {};
  gsap.context(() => { // use a context so that if this is called from within another context or a gsap.matchMedia(), we can perform proper cleanup like the "resize" event handler on the window
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({repeat: config.repeat, onUpdate: onChange && function() {
          let i = tl.closestIndex();
          if (lastIndex !== i) {
            lastIndex = i;
            onChange(items[i], i);
          }
        }, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      spaceBefore = [],
      xPercents = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      timeOffset = 0,
      container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
      totalWidth,
      getTotalWidth = () => items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + spaceBefore[0] + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0),
      populateWidths = () => {
        let b1 = container.getBoundingClientRect(), b2;
        items.forEach((el, i) => {
          widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
          xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100 + gsap.getProperty(el, "xPercent"));
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
          b1 = b2;
        });
        gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
          xPercent: i => xPercents[i]
        });
        totalWidth = getTotalWidth();
      },
      timeWrap,
      populateOffsets = () => {
        timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0;
        center && times.forEach((t, i) => {
          times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
        });
      },
      getClosest = (values, value, wrap) => {
        let i = values.length,
          closest = 1e10,
          index = 0, d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) {
            d = wrap - d;
          }
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      },
      populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = xPercents[i] / 100 * widths[i];
          distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
          distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
          tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
            .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      },
      refresh = (deep) => {
        let progress = tl.progress();
        tl.progress(0, true);
        populateWidths();
        deep && populateTimeline();
        populateOffsets();
        deep && tl.draggable ? tl.time(times[curIndex], true) : tl.progress(progress, true);
      },
      onResize = () => refresh(true),
      proxy;
    gsap.set(items, {x: 0});
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);
    function toIndex(index, vars) {
      vars = vars || {};
      (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = {time: timeWrap};
      }
      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);    
      return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
    }
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.closestIndex = setCurrent => {
      let index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
    tl.next = vars => toIndex(tl.current()+1, vars);
    tl.previous = vars => toIndex(tl.current()-1, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    if (config.draggable && typeof(Draggable) === "function") {
      proxy = document.createElement("div")
      let wrap = gsap.utils.wrap(0, 1),
        ratio, startProgress, draggable, dragSnap, lastSnap, initChangeX, wasPlaying,
        align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
        syncIndex = () => tl.closestIndex(true);
      typeof(InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: "x",
        onPressInit() {
          let x = this.x;
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          initChangeX = (startProgress / -ratio) - x;
          gsap.set(proxy, {x: startProgress / -ratio});
        },
        onDrag: align,
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(value) {
          //note: if the user presses and releases in the middle of a throw, due to the sudden correction of proxy.x in the onPressInit(), the velocity could be very large, throwing off the snap. So sense that condition and adjust for it. We also need to set overshootTolerance to 0 to prevent the inertia from causing it to shoot past and come back
          if (Math.abs(startProgress / -ratio - this.x) < 10) {
            return lastSnap + initChangeX
          }
          let time = -(value * ratio) * tl.duration(),
            wrappedTime = timeWrap(time),
            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
            dif = snapTime - wrappedTime;
          Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          draggable.isThrowing && (indexIsDirty = true);
        },
        onThrowComplete: () => {
          syncIndex();
          wasPlaying && tl.play();
        }
      })[0];
      tl.draggable = draggable;
    }
    tl.closestIndex(true);
    lastIndex = curIndex;
    onChange && onChange(items[curIndex], curIndex);
    timeline = tl;
    return () => window.removeEventListener("resize", onResize); // cleanup
  });
  return timeline;
}