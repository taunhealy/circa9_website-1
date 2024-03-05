document.addEventListener("DOMContentLoaded", function () {
  const workItems = document.querySelectorAll(".work-item");
  const work = document.querySelector(".work");
  const overlay = document.querySelector(".overlay");
  const prevElements = document.querySelectorAll(".prev");
  const h1Elements = document.querySelectorAll(".work-item h1");

  function handleHover(index) {
    const positions = [
      { top: "50%", left: "50%" },
      { top: "0%", left: "13.25%" },
      { top: "-50%", left: "-23.5%" },
    ];

    const position = positions[index];

    gsap.to(overlay, { top: position.top, left: position.left, duration: 1 });

    h1Elements.forEach((h1, i) => {
      gsap.to(h1Elements, { color: "blue", opacity: "50%" });
    });

    work.style.transition = "background-color 0.5s";
    work.style.backgroundColor = ["#f4D160", "#58A3BC", "#28527A"][index];

    prevElements.forEach((prev, i) => {
      const rotation = i === index + 1 ? "rotate(22.5deg)" : "rotate(9deg)";
      gsap.to(prev, { transform: rotation + " scale(1)", duration: 0.5 });
    });

    gsap.to(workItems[index], {
      color: "red",
      duration: 1,
      ease: "linear",
    });
  }

  function handleHoverOut() {
    gsap.to(overlay, { top: "0%", left: "13.25%", duration: 1 });

    work.style.transition = "background-color 0.5s";
    work.style.backgroundColor = "#141414";

    workItems.forEach((item) => {
      gsap.to(item, { color: "#fff", duration: 0.5 }); // Reset text color
    });

    prevElements.forEach((prev) => {
      gsap.to(prev, { transform: "rotate(10deg) scale(1)", duration: 0.5 });
    });
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
