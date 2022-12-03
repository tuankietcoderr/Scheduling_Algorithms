const $ = (id) => {
  return document.getElementById(id);
};

const $q = (query) => {
  return document.querySelector(query);
};

const $qa = (query) => {
  return document.querySelectorAll(query);
};

const $c = (el) => {
  return document.createElement(el);
};

const source = [
  {
    name: "Round Robin",
    href: "https://educativesite.com/round-robin-rr-scheduling-algorithm-program-code-in-c-and-c-with-gantt-chart/",
    js_src: "./rr.js",
  },
  {
    name: "FCFS (First Come First Serve)",
    href: "https://educativesite.com/first-come-first-serve-fcfs-scheduling-algorithm-program-code-in-c-with-gantt-chart/",
    js_src: "./fcfs.js",
  },
  {
    name: "SJF (Shortest Job First)",
    href: "https://educativesite.com/shortest-job-first-sjf-scheduling-algorithm-in-c-and-c-with-gantt-chart/",
    js_src: "./sjf.js",
  },
  {
    name: "SRTF (Shortest Remaining Time First)",
    href: "#",
    js_src: "./srtf.js",
  },
  {
    name: "PS (Priority Scheduling) | Non Preemptive",
    href: "https://educativesite.com/priority-scheduling-algorithm-c-and-c-programming-code-with-gantt-chart/",
    js_src: "./ps.js",
  },
  {
    name: "PS (Priority Scheduling) | Preemptive",
    href: "#",
    js_src: "./psp.js",
  },
];

const header = $c("header");
header.innerHTML = `<header>
<nav>
  <ul>
    <li>
      <a href="./RR.html">Round Robin</a>
    </li>
    <li>
      <a href="./FCFS.html">FCFS (First Come First Serve)</a>
    </li>
    <li>
      <a href="./SJF.html">SJF (Shortest Job First)</a>
    </li>
    <li>
      <a href="./SRTF.html">SRTF (Shortest Remaining Time First)</a>
    </li>
    <li>
      <a href="./PSNP.html">PS (Priority Scheduling) | Non Preemptive</a>
    </li>
    <li>
      <a href="./PSP.html">PS (Priority Scheduling) | Preemptive</a>
    </li>
  </ul>
</nav>
</header>`;

const link_css = $c("link");
link_css.rel = "stylesheet";
link_css.href = "./style.css";
document.head.appendChild(link_css);

const body = document.getElementsByTagName("body")[0];
body.firstChild.before(header);

const a = $qa("a");
for (let i = 0; i < a.length; i++) {
  if (a[i].href == location.href) {
    a[i].classList.add("active");
    const footer = $c("footer");
    footer.innerHTML = `<footer>
    <a href=${source[i].href} target="Blank" title=${source[i].name}>Nguồn tham khảo - ${source[i].name}</a></footer>`;
    body.appendChild(footer);
    const script = $c("script");
    script.src = source[i].js_src;
    body.appendChild(script);
    document.title = source[i].name;
  }
}
