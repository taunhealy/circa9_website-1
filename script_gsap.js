document.addEventListener("DOMContentLoaded", function () {
  const workItems = document.querySelectorAll(".work-item");
  const work = document.querySelector(".work");
  const overlay = document.querySelector(".overlay");
  const prevElements = document.querySelectorAll(".prev");

  function handleHover(index) {
    const positions = [
      { top: "50%", left: "50%" },
      { top: "0%", left: "13.25%" },
      { top: "-50%", left: "-23.5%" },
    ];

    const position = positions[index];

    gsap.to(overlay, { top: position.top, left: position.left, duration: 1 });

    work.style.transition = "background-color 0.5s";
    work.style.backgroundColor = ["#f4D160", "#58A3BC", "#28527A"][index];

    prevElements.forEach((prev, i) => {
      const scale = i === index ? 1.2 : 0.9; // Scale down the non-hovered elements
      gsap.to(prev, { scale: scale, duration: 0.5 });

      const rotation = i === index ? 9 : -7; // Slight rotation for the hovered element, different rotation for non-hovered
      gsap.to(prev, { rotation: rotation, duration: 1.2, ease: "power3.out" });
    });

    workItems.forEach((item, i) => {
      const scale = i === index ? 1 : 0.95; // Scale down the non-hovered elements
      gsap.to(item, { scale: scale, duration: 0.5 });
    });
  }

  function handleHoverOut() {
    gsap.to(overlay, { top: "0%", left: "13.25%", duration: 1 });

    work.style.transition = "background-color 0.5s";
    work.style.backgroundColor = "#141414";

    gsap.to(workItems, { scale: 1, duration: 0.5 }); // Reset scale for all work items
    gsap.to(prevElements, { scale: 1, rotation: 0, duration: 0.5 }); // Reset scale and rotation for all prev elements
  }

  workItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      handleHover(index);
    });

    item.addEventListener("mouseleave", () => {
      handleHoverOut();
    });
  });

  handleHoverOut(); // Initialize with the hover out styling
});
