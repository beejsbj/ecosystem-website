<script setup>
function animateIntro(gsap) {
  //   const pageLoad = gsap.timeline();
  const curvesPath = document.querySelectorAll(".feed-decoration path");

  const curvesLength = curvesPath[0].getTotalLength();

  const duration = 3;
  const easing = "linear";

  let context = gsap.context(() => {
    const timeline = gsap.timeline();

    timeline.set(curvesPath, {
      strokeDashoffset: 1 * curvesLength,
      strokeDasharray: curvesLength,
    });

    timeline.to(curvesPath, {
      duration: duration,
      strokeDashoffset: 0,
      ease: easing,
    });
  });

  setTimeout(() => {
    context.kill();
  }, 2000);
}

useGsap((gsap) => {
  //   animateIntro(gsap);
  return;

  const timeline = gsap.timeline({
    repeat: -1,
  });

  timeline.fromTo(
    ".feed-decoration path",
    {
      y: 10,
    },
    {
      duration: 5,
      y: -10,
      transformOrigin: "center center",
      ease: "power1.inOut",
      stagger: { each: 0.5, repeat: "-1", from: "start", yoyo: true },
    }
  );
});
</script>

<template>
  <picture class="feed-decoration">
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1440 1382"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5">
        <path
          opacity="0.0183673"
          d="M2023.74 309.803C1589.76 97.1145 1323.75 362.733 1050.94 760.959C778.125 1159.18 170.126 1200.19 -57.3002 1094.61"
          stroke="url(#paint0_linear_874_15574)"
        />
        <path
          opacity="0.0367347"
          d="M2022.1 299.58C1588.12 86.8918 1322.11 352.51 1049.3 750.736C776.487 1148.96 168.487 1189.96 -58.9389 1084.39"
          stroke="url(#paint1_linear_874_15574)"
        />
        <path
          opacity="0.055102"
          d="M2020.46 289.358C1586.48 76.6692 1320.47 342.288 1047.66 740.513C774.847 1138.74 166.847 1179.74 -60.5785 1074.16"
          stroke="url(#paint2_linear_874_15574)"
        />
        <path
          opacity="0.0734694"
          d="M2018.82 279.135C1584.84 66.4465 1318.83 332.065 1046.02 730.291C773.208 1128.52 165.209 1169.52 -62.2172 1063.94"
          stroke="url(#paint3_linear_874_15574)"
        />
        <path
          opacity="0.0918367"
          d="M2017.18 268.912C1583.2 56.2239 1317.19 321.842 1044.38 720.068C771.569 1118.29 163.569 1159.29 -63.8568 1053.72"
          stroke="url(#paint4_linear_874_15574)"
        />
        <path
          opacity="0.110204"
          d="M2015.55 258.69C1581.56 46.0012 1315.55 311.62 1042.74 709.846C769.93 1108.07 161.93 1149.07 -65.4955 1043.5"
          stroke="url(#paint5_linear_874_15574)"
        />
        <path
          opacity="0.128571"
          d="M2013.91 248.467C1579.92 35.7786 1313.92 301.397 1041.1 699.623C768.29 1097.85 160.291 1138.85 -67.1352 1033.27"
          stroke="url(#paint6_linear_874_15574)"
        />
        <path
          opacity="0.146939"
          d="M2012.27 238.244C1578.28 25.5559 1312.28 291.174 1039.46 689.4C766.652 1087.63 158.652 1128.63 -68.7738 1023.05"
          stroke="url(#paint7_linear_874_15574)"
        />
        <path
          opacity="0.165306"
          d="M2010.63 228.022C1576.64 15.3332 1310.64 280.952 1037.82 679.178C765.012 1077.4 157.012 1118.4 -70.4135 1012.83"
          stroke="url(#paint8_linear_874_15574)"
        />
        <path
          opacity="0.183673"
          d="M2008.99 217.799C1575 5.11058 1309 270.729 1036.19 668.955C763.373 1067.18 155.374 1108.18 -72.0521 1002.61"
          stroke="url(#paint9_linear_874_15574)"
        />
        <path
          opacity="0.202041"
          d="M2007.35 207.576C1573.36 -5.11207 1307.36 260.506 1034.55 658.732C761.734 1056.96 153.734 1097.96 -73.6918 992.383"
          stroke="url(#paint10_linear_874_15574)"
        />
        <path
          opacity="0.220408"
          d="M2005.71 197.354C1571.73 -15.3347 1305.72 250.284 1032.91 648.51C760.095 1046.74 152.095 1087.74 -75.3305 982.16"
          stroke="url(#paint11_linear_874_15574)"
        />
        <path
          opacity="0.238776"
          d="M2004.07 187.131C1570.09 -25.5574 1304.08 240.061 1031.27 638.287C758.455 1036.51 150.456 1077.51 -76.9701 971.937"
          stroke="url(#paint12_linear_874_15574)"
        />
        <path
          opacity="0.257143"
          d="M2002.43 176.908C1568.45 -35.78 1302.44 229.838 1029.63 628.064C756.817 1026.29 148.817 1067.29 -78.6088 961.715"
          stroke="url(#paint13_linear_874_15574)"
        />
        <path
          opacity="0.27551"
          d="M2000.79 166.686C1566.81 -46.0027 1300.8 219.616 1027.99 617.842C755.177 1016.07 147.178 1057.07 -80.2484 951.492"
          stroke="url(#paint14_linear_874_15574)"
        />
        <path
          opacity="0.293878"
          d="M1999.15 156.463C1565.17 -56.2254 1299.16 209.393 1026.35 607.619C753.538 1005.84 145.539 1046.85 -81.8871 941.269"
          stroke="url(#paint15_linear_874_15574)"
        />
        <path
          opacity="0.312245"
          d="M1997.51 146.24C1563.53 -66.448 1297.52 199.17 1024.71 597.396C751.899 995.622 143.899 1036.62 -83.5268 931.047"
          stroke="url(#paint16_linear_874_15574)"
        />
        <path
          opacity="0.330612"
          d="M1995.88 136.018C1561.89 -76.6707 1295.89 188.948 1023.07 587.174C750.26 985.4 142.261 1026.4 -85.1654 920.824"
          stroke="url(#paint17_linear_874_15574)"
        />
        <path
          opacity="0.34898"
          d="M1994.24 125.795C1560.25 -86.8933 1294.25 178.725 1021.43 576.951C748.62 975.177 140.621 1016.18 -86.8051 910.601"
          stroke="url(#paint18_linear_874_15574)"
        />
        <path
          opacity="0.367347"
          d="M1992.6 115.572C1558.61 -97.116 1292.61 168.502 1019.79 566.728C746.982 964.954 138.982 1005.95 -88.4437 900.379"
          stroke="url(#paint19_linear_874_15574)"
        />
        <path
          opacity="0.385714"
          d="M1990.96 105.35C1556.97 -107.339 1290.97 158.28 1018.15 556.506C745.342 954.732 137.343 995.732 -90.0834 890.156"
          stroke="url(#paint20_linear_874_15574)"
        />
        <path
          opacity="0.404082"
          d="M1989.32 95.1271C1555.33 -117.561 1289.33 148.057 1016.52 546.283C743.703 944.509 135.704 985.509 -91.7221 879.933"
          stroke="url(#paint21_linear_874_15574)"
        />
        <path
          opacity="0.422449"
          d="M1987.68 84.9045C1553.69 -127.784 1287.69 137.834 1014.88 536.06C742.064 934.286 134.064 975.287 -93.3617 869.711"
          stroke="url(#paint22_linear_874_15574)"
        />
        <path
          opacity="0.440816"
          d="M1986.04 74.6818C1552.06 -138.007 1286.05 127.612 1013.24 525.838C740.425 924.064 132.426 965.064 -95.0004 859.488"
          stroke="url(#paint23_linear_874_15574)"
        />
        <path
          opacity="0.459184"
          d="M1984.4 64.4592C1550.42 -148.229 1284.41 117.389 1011.6 515.615C738.785 913.841 130.786 954.841 -96.64 849.265"
          stroke="url(#paint24_linear_874_15574)"
        />
        <path
          opacity="0.477551"
          d="M1982.76 54.2365C1548.78 -158.452 1282.77 107.166 1009.96 505.392C737.147 903.618 129.147 944.619 -98.2787 839.043"
          stroke="url(#paint25_linear_874_15574)"
        />
        <path
          opacity="0.495918"
          d="M1981.12 44.0138C1547.14 -168.675 1281.13 96.9438 1008.32 495.17C735.507 893.396 127.508 934.396 -99.9184 828.82"
          stroke="url(#paint26_linear_874_15574)"
        />
        <path
          opacity="0.514286"
          d="M1979.48 33.7912C1545.5 -178.897 1279.49 86.7211 1006.68 484.947C733.868 883.173 125.869 924.173 -101.557 818.597"
          stroke="url(#paint27_linear_874_15574)"
        />
        <path
          opacity="0.532653"
          d="M1977.85 23.5685C1543.86 -189.12 1277.85 76.4984 1005.04 474.724C732.229 872.95 124.229 913.951 -103.197 808.375"
          stroke="url(#paint28_linear_874_15574)"
        />
        <path
          opacity="0.55102"
          d="M1976.21 13.3459C1542.22 -199.343 1276.22 66.2758 1003.4 464.502C730.59 862.728 122.591 903.728 -104.835 798.152"
          stroke="url(#paint29_linear_874_15574)"
        />
        <path
          opacity="0.569388"
          d="M1974.57 3.12322C1540.58 -209.565 1274.58 56.0531 1001.76 454.279C728.951 852.505 120.951 893.506 -106.475 787.929"
          stroke="url(#paint30_linear_874_15574)"
        />
        <path
          opacity="0.587755"
          d="M1972.93 -7.09944C1538.94 -219.788 1272.94 45.8305 1000.12 444.056C727.312 842.282 119.312 883.283 -108.114 777.707"
          stroke="url(#paint31_linear_874_15574)"
        />
        <path
          opacity="0.606122"
          d="M1971.29 -17.3221C1537.3 -230.011 1271.3 35.6078 998.485 433.834C725.672 832.06 117.673 873.06 -109.753 767.484"
          stroke="url(#paint32_linear_874_15574)"
        />
        <path
          opacity="0.62449"
          d="M1969.65 -27.5447C1535.66 -240.233 1269.66 25.3852 996.846 423.611C724.034 821.837 116.034 862.838 -111.392 757.261"
          stroke="url(#paint33_linear_874_15574)"
        />
        <path
          opacity="0.642857"
          d="M1968.01 -37.7674C1534.02 -250.456 1268.02 15.1625 995.206 413.388C722.394 811.614 114.394 852.615 -113.032 747.039"
          stroke="url(#paint34_linear_874_15574)"
        />
        <path
          opacity="0.661224"
          d="M1966.37 -47.9901C1532.39 -260.678 1266.38 4.93985 993.568 403.166C720.755 801.392 112.756 842.392 -114.67 736.816"
          stroke="url(#paint35_linear_874_15574)"
        />
        <path
          opacity="0.679592"
          d="M1964.73 -58.2127C1530.75 -270.901 1264.74 -5.28281 991.928 392.943C719.116 791.169 111.116 832.17 -116.31 726.593"
          stroke="url(#paint36_linear_874_15574)"
        />
        <path
          opacity="0.697959"
          d="M1963.09 -68.4354C1529.11 -281.124 1263.1 -15.5055 990.289 382.721C717.477 780.946 109.477 821.947 -117.949 716.371"
          stroke="url(#paint37_linear_874_15574)"
        />
        <path
          opacity="0.716327"
          d="M1961.45 -78.658C1527.47 -291.346 1261.46 -25.7281 988.65 372.498C715.837 770.724 107.838 811.724 -119.588 706.148"
          stroke="url(#paint38_linear_874_15574)"
        />
        <path
          opacity="0.734694"
          d="M1959.81 -88.8807C1525.83 -301.569 1259.82 -35.9508 987.011 362.275C714.199 760.501 106.199 801.502 -121.227 695.926"
          stroke="url(#paint39_linear_874_15574)"
        />
        <path
          opacity="0.753061"
          d="M1958.18 -99.1033C1524.19 -311.792 1258.18 -46.1734 985.371 352.053C712.559 750.279 104.559 791.279 -122.867 685.703"
          stroke="url(#paint40_linear_874_15574)"
        />
        <path
          opacity="0.771429"
          d="M1956.54 -109.326C1522.55 -322.014 1256.55 -56.3961 983.733 341.83C710.92 740.056 102.921 781.056 -124.505 675.48"
          stroke="url(#paint41_linear_874_15574)"
        />
        <path
          opacity="0.789796"
          d="M1954.9 -119.549C1520.91 -332.237 1254.91 -66.6187 982.093 331.607C709.281 729.833 101.281 770.834 -126.145 665.258"
          stroke="url(#paint42_linear_874_15574)"
        />
        <path
          opacity="0.808163"
          d="M1953.26 -129.771C1519.27 -342.46 1253.27 -76.8414 980.454 321.385C707.642 719.611 99.6423 760.611 -127.784 655.035"
          stroke="url(#paint43_linear_874_15574)"
        />
        <path
          opacity="0.826531"
          d="M1951.62 -139.994C1517.63 -352.682 1251.63 -87.0641 978.815 311.162C706.002 709.388 98.0027 750.388 -129.423 644.812"
          stroke="url(#paint44_linear_874_15574)"
        />
        <path
          opacity="0.844898"
          d="M1949.98 -150.217C1515.99 -362.905 1249.99 -97.2867 977.176 300.939C704.364 699.165 96.364 740.166 -131.062 634.59"
          stroke="url(#paint45_linear_874_15574)"
        />
        <path
          opacity="0.863265"
          d="M1948.34 -160.439C1514.35 -373.128 1248.35 -107.509 975.536 290.717C702.724 688.943 94.7244 729.943 -132.702 624.367"
          stroke="url(#paint46_linear_874_15574)"
        />
        <path
          opacity="0.881633"
          d="M1946.7 -170.662C1512.72 -383.35 1246.71 -117.732 973.898 280.494C701.085 678.72 93.0857 719.72 -134.34 614.144"
          stroke="url(#paint47_linear_874_15574)"
        />
        <path
          opacity="0.9"
          d="M1945.06 -180.885C1511.08 -393.573 1245.07 -127.955 972.259 270.271C699.446 668.497 91.447 709.497 -135.979 603.921"
          stroke="url(#paint48_linear_874_15574)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_874_15574"
          x1="1833.9"
          y1="137.258"
          x2="102.743"
          y2="1033.46"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_874_15574"
          x1="1832.27"
          y1="127.035"
          x2="101.105"
          y2="1023.24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_874_15574"
          x1="1830.63"
          y1="116.812"
          x2="99.4651"
          y2="1013.02"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_874_15574"
          x1="1828.99"
          y1="106.59"
          x2="97.8264"
          y2="1002.79"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_874_15574"
          x1="1827.35"
          y1="96.3671"
          x2="96.1868"
          y2="992.572"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_874_15574"
          x1="1825.71"
          y1="86.1444"
          x2="94.5481"
          y2="982.35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_874_15574"
          x1="1824.07"
          y1="75.9218"
          x2="92.9085"
          y2="972.127"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_874_15574"
          x1="1822.43"
          y1="65.6991"
          x2="91.2698"
          y2="961.904"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_874_15574"
          x1="1820.79"
          y1="55.4765"
          x2="89.6302"
          y2="951.682"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_874_15574"
          x1="1819.15"
          y1="45.2538"
          x2="87.9915"
          y2="941.459"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_874_15574"
          x1="1817.51"
          y1="35.0311"
          x2="86.3518"
          y2="931.236"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_874_15574"
          x1="1815.87"
          y1="24.8085"
          x2="84.7132"
          y2="921.014"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint12_linear_874_15574"
          x1="1814.23"
          y1="14.5858"
          x2="83.0735"
          y2="910.791"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint13_linear_874_15574"
          x1="1812.6"
          y1="4.36318"
          x2="81.4348"
          y2="900.568"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint14_linear_874_15574"
          x1="1810.96"
          y1="-5.85948"
          x2="79.7952"
          y2="890.346"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint15_linear_874_15574"
          x1="1809.32"
          y1="-16.0821"
          x2="78.1565"
          y2="880.123"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint16_linear_874_15574"
          x1="1807.68"
          y1="-26.3048"
          x2="76.5169"
          y2="869.9"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint17_linear_874_15574"
          x1="1806.04"
          y1="-36.5274"
          x2="74.8782"
          y2="859.678"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint18_linear_874_15574"
          x1="1804.4"
          y1="-46.7501"
          x2="73.2386"
          y2="849.455"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint19_linear_874_15574"
          x1="1802.76"
          y1="-56.9728"
          x2="71.5999"
          y2="839.232"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint20_linear_874_15574"
          x1="1801.12"
          y1="-67.1954"
          x2="69.9602"
          y2="829.01"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint21_linear_874_15574"
          x1="1799.48"
          y1="-77.4181"
          x2="68.3216"
          y2="818.787"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint22_linear_874_15574"
          x1="1797.84"
          y1="-87.6407"
          x2="66.6819"
          y2="808.564"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint23_linear_874_15574"
          x1="1796.2"
          y1="-97.8634"
          x2="65.0432"
          y2="798.342"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint24_linear_874_15574"
          x1="1794.56"
          y1="-108.086"
          x2="63.4036"
          y2="788.119"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint25_linear_874_15574"
          x1="1792.93"
          y1="-118.309"
          x2="61.7649"
          y2="777.897"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint26_linear_874_15574"
          x1="1791.29"
          y1="-128.531"
          x2="60.1253"
          y2="767.674"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint27_linear_874_15574"
          x1="1789.65"
          y1="-138.754"
          x2="58.4866"
          y2="757.451"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint28_linear_874_15574"
          x1="1788.01"
          y1="-148.977"
          x2="56.847"
          y2="747.229"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint29_linear_874_15574"
          x1="1786.37"
          y1="-159.199"
          x2="55.2083"
          y2="737.006"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint30_linear_874_15574"
          x1="1784.73"
          y1="-169.422"
          x2="53.5686"
          y2="726.783"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint31_linear_874_15574"
          x1="1783.09"
          y1="-179.645"
          x2="51.93"
          y2="716.561"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint32_linear_874_15574"
          x1="1781.45"
          y1="-189.867"
          x2="50.2903"
          y2="706.338"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint33_linear_874_15574"
          x1="1779.81"
          y1="-200.09"
          x2="48.6516"
          y2="696.115"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint34_linear_874_15574"
          x1="1778.17"
          y1="-210.313"
          x2="47.012"
          y2="685.893"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint35_linear_874_15574"
          x1="1776.53"
          y1="-220.535"
          x2="45.3733"
          y2="675.67"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint36_linear_874_15574"
          x1="1774.89"
          y1="-230.758"
          x2="43.7337"
          y2="665.447"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint37_linear_874_15574"
          x1="1773.26"
          y1="-240.981"
          x2="42.095"
          y2="655.225"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint38_linear_874_15574"
          x1="1771.62"
          y1="-251.203"
          x2="40.4554"
          y2="645.002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint39_linear_874_15574"
          x1="1769.98"
          y1="-261.426"
          x2="38.8167"
          y2="634.779"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint40_linear_874_15574"
          x1="1768.34"
          y1="-271.649"
          x2="37.177"
          y2="624.557"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint41_linear_874_15574"
          x1="1766.7"
          y1="-281.871"
          x2="35.5384"
          y2="614.334"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint42_linear_874_15574"
          x1="1765.06"
          y1="-292.094"
          x2="33.8987"
          y2="604.111"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint43_linear_874_15574"
          x1="1763.42"
          y1="-302.317"
          x2="32.26"
          y2="593.889"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint44_linear_874_15574"
          x1="1761.78"
          y1="-312.539"
          x2="30.6204"
          y2="583.666"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint45_linear_874_15574"
          x1="1760.14"
          y1="-322.762"
          x2="28.9817"
          y2="573.443"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint46_linear_874_15574"
          x1="1758.5"
          y1="-332.984"
          x2="27.3421"
          y2="563.221"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint47_linear_874_15574"
          x1="1756.86"
          y1="-343.207"
          x2="25.7034"
          y2="552.998"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
        <linearGradient
          id="paint48_linear_874_15574"
          x1="1755.23"
          y1="-353.43"
          x2="24.0647"
          y2="542.775"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A473C" />
          <stop offset="0.494792" stop-color="#48E8C0" />
          <stop offset="1" stop-color="#1A473C" />
        </linearGradient>
      </defs>
    </svg>
  </picture>
</template>
