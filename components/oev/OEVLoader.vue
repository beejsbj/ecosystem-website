<script setup>
useGsap((gsap) => {
  const timeline = gsap.timeline({ repeat: 0, repeatDelay: 0.1 });

  timeline.set("body", {
    overflowY: "hidden",
  });

  timeline.set(".oev-loader :is(#O, #V) path", {
    scale: 0.5,
    y: 100,
    opacity: 1,
  });

  //   E
  timeline.set(".oev-loader :is(#E) rect", {
    y: -100,
    scale: 0.5,
    opacity: 1,
  });

  timeline.set(".oev-loader #tilted-E", {
    rotate: 10,
  });

  timeline.to(".oev-loader :is(#O, #V) path", {
    duration: 0.75,
    y: 0,
    scale: 1,
    ease: "back.out(1.7)",
    stagger: {
      each: 0.3,
      from: "end",
    },
  });

  timeline.to(
    ".oev-loader :is(#E) rect",
    {
      duration: 1,
      y: 0,
      scale: 1,

      ease: "elastic.out(1,0.6)",
      stagger: {
        each: 0.2,
        from: "end",
      },
    },
    "-=0.7"
  );

  timeline.to(
    ".oev-loader :is(#E) rect",
    {
      duration: 0.2,
      rotate: -20,
      ease: "power2.inOut",
    },
    "-=0.6"
  );

  timeline.to(
    ".oev-loader :is(#E) rect",
    {
      duration: 0.2,
      rotate: 0,
      ease: "back.out(4)",
    },
    "-=0.35"
  );

  timeline.to(
    ".oev-loader p",
    {
      duration: 0.5,
      opacity: 1,
      ease: "power4.inOut",
    },
    "-=0.6"
  );

  //
  timeline.to(
    ".oev-loader",
    {
      duration: 0.5,
      opacity: 0,
      ease: "power4.inOut",
    },
    "-=0.3"
  );

  timeline.set(".oev-loader", {
    display: "none",
  });

  timeline.set("body", {
    overflowY: "auto",
  });
});
</script>

<template>
  <picture class="oev-loader">
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 370 128"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xml:space="preserve"
      xmlns:serif="http://www.serif.com/"
      style="
        fill-rule: evenodd;
        clip-rule: evenodd;
        stroke-linejoin: round;
        stroke-miterlimit: 2;
      "
    >
      <g transform="matrix(1,0,0,1,-3947.92,-1202.57)">
        <g transform="matrix(5.34973,0,0,32.1915,137.723,-22465.2)">
          <g transform="matrix(1,0,0,1,0.65551,-0.577318)">
            <g>
              <g
                id="E"
                transform="matrix(1.00295,0,0,1.00295,-2.19941,-2.13234)"
              >
                <g
                  transform="matrix(0.184076,-0.00540302,0.0325121,0.0305907,-56.183,720.021)"
                >
                  <rect
                    x="4102.48"
                    y="1280.45"
                    width="50.769"
                    height="14.232"
                    style="fill: rgb(235, 235, 235)"
                    id="tilted-E"
                  />
                </g>
                <g transform="matrix(0.186925,0,0,0.0310641,-25.7439,697.863)">
                  <rect
                    x="4102.48"
                    y="1280.45"
                    width="50.769"
                    height="14.232"
                    style="fill: rgb(235, 235, 235)"
                  />
                </g>

                <g transform="matrix(0.186925,0,0,0.0310641,-25.7439,698.514)">
                  <rect
                    x="4102.48"
                    y="1280.45"
                    width="50.769"
                    height="14.232"
                    style="fill: rgb(235, 235, 235)"
                  />
                </g>
              </g>
              <g
                id="V"
                transform="matrix(0.199868,0,0,0.033215,-79.9496,695.08)"
              >
                <path
                  d="M4198.82,1259.56L4219.05,1259.66L4199.24,1315.64L4177.2,1315.63L4157.46,1259.53L4177.7,1259.53L4188.2,1294.95L4198.82,1259.56Z"
                  style="fill: rgb(235, 235, 235)"
                />
              </g>
              <g
                id="O"
                transform="matrix(0.249236,0,0,0.0414192,-280.121,684.376)"
              >
                <path
                  d="M4070.6,1268.48C4083.02,1268.48 4093.1,1278.56 4093.1,1290.98C4093.1,1303.4 4083.02,1313.48 4070.6,1313.48C4058.19,1313.48 4048.11,1303.4 4048.11,1290.98C4048.11,1278.56 4058.19,1268.48 4070.6,1268.48ZM4070.6,1282.43C4075.32,1282.43 4079.15,1286.26 4079.15,1290.98C4079.15,1295.7 4075.32,1299.53 4070.6,1299.53C4065.89,1299.53 4062.05,1295.7 4062.05,1290.98C4062.05,1286.26 4065.89,1282.43 4070.6,1282.43Z"
                  style="fill: rgb(235, 235, 235)"
                />
              </g>
            </g>
            <g transform="matrix(0.371632,0,0,0.0414492,-765.76,685.694)">
              <rect
                x="3975.23"
                y="1208.78"
                width="185.615"
                height="95.93"
                style="fill: none"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
    <p>NETWORK</p>
  </picture>
</template>

<style scoped lang="scss">
.oev-loader {
  pointer-events: none;

  position: fixed;
  z-index: 1000;
  background: var(--paper);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  display: grid;
  place-content: center;

  svg {
    width: 70vmin;
  }

  rect,
  path {
    opacity: 0;
  }

  p {
    text-align: center;
    font-size: 2rem;
    color: var(--indigo, var(--blue));
    font-weight: 900;
    letter-spacing: 0.3em;
    margin-top: -3rem;

    opacity: 0;
  }
}
</style>
