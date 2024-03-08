document.addEventListener("DOMContentLoaded", function () {
  // Wait for the DOM content to be fully loaded

  const workItems = document.querySelectorAll(".work-item");
  const overlay = document.querySelector(".overlay");
  const prevElements = document.querySelectorAll(".prev");
  const underlay = document.querySelector(".underlay"); // Select the underlay element

  // Set initial background to gradient-1
  underlay.style.backgroundImage = `url('${
    document.querySelector("#gradient-1 img").src
  }')`;

  function handleHover(index) {
    const positions = [
      { top: "50%", left: "50%" },
      { top: "0%", left: "13.25%" },
      { top: "-50%", left: "-23.5%" },
    ];

    const position = positions[index];

    gsap.to(overlay, { top: position.top, left: position.left, duration: 1 });

    const gradient = document.querySelector(`#gradient-${index + 1}`);
    gsap.to(gradient, { opacity: 1, duration: 1.8, scale: 1.5 });

    underlay.style.backgroundImage = `url('${
      gradient.querySelector("img").src
    }')`;

    prevElements.forEach((prev, i) => {
      const scale = i === index ? 1.3 : 1.1;
      gsap.to(prev, { scale: scale, duration: 0.9 });

      const rotation = i === index ? 9 : -7;
      gsap.to(prev, { rotation: rotation, duration: 1, ease: "power.out4" });
    });

    workItems.forEach((item, i) => {
      const scale = i === index ? 1 : 0.99;
      gsap.to(item, { scale: scale, duration: 0.7 });
    });
  }

  function handleHoverOut() {
    gsap.to(overlay, { top: "0%", left: "13.25%", duration: 1 });
    gsap.to(".gradient", { opacity: 0, duration: 1.8 });

    underlay.style.backgroundImage = `url('${
      document.querySelector("#gradient-1 img").src
    }')`;

    gsap.to(workItems, { scale: 1, duration: 0.5 });
    gsap.to(prevElements, { scale: 1, duration: 0.3, ease: "power.out" });
  }

  workItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      handleHover(index);
    });

    item.addEventListener("mouseleave", () => {
      handleHoverOut();
    });
  });

  handleHoverOut(); // Set initial background to gradient-1
});
