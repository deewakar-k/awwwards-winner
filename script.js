let timeout;

const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});

const pageOne = () => {
  let tl = gsap.timeline();
  tl.from(".nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })

    .to(".belem", {
      y: 0,
      duration: 2,
      delay: -1,
      ease: Expo.easeInOut,
      stagger: 0.2,
    })

    .from(".hero-footer", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
};

const cursorSkew = () => {
  let xscale = 1;
  let yscale = 1;

  let xprev = 0;
  let yprev = 0;

  window.addEventListener("mousemove", (details) => {
    clearTimeout(timeout);
    let xdiff = details.clientX - xprev;
    let ydiff = details.clientY - yprev;

    xprev = details.clientX;
    yprev = details.clientY;

    let xscale = gsap.utils.clamp(0.8, 2, xdiff);
    let yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

    cursorFollower(xscale, yscale);
    timeout = setTimeout(() => {
      document.querySelector(".cursor").style.transform =
        `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
    }, 100);
  });
};

const cursorFollower = (xscale, yscale) => {
  window.addEventListener("mousemove", (details) => {
    document.querySelector(".cursor").style.transform =
      `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;
  });
};

cursorSkew();
cursorFollower();
pageOne();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power2,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});

