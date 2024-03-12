document.addEventListener("DOMContentLoaded", function () {
  const workItems = document.querySelectorAll(".work-item");
  const overlay = document.querySelector(".overlay");
  const prevElements = document.querySelectorAll(".prev");
  const underlay = document.querySelector(".underlay"); // Select the underlay element
  const gradientImages = document.querySelectorAll(".gradient img");

  // Function to preload all gradient images
  function preloadImages(images) {
    images.forEach((img) => {
      const src = img.getAttribute("src");
      new Image().src = src;
    });
  }

  // Preload gradient images
  preloadImages(gradientImages);

  // Function to get a random integer between min and max (inclusive)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleHover(index) {
    const positions = [
      { top: "50%", left: "50%" },
      { top: "0%", left: "13.25%" },
      { top: "-50%", left: "-23.5%" },
    ];

    const position = positions[index];

    gsap.to(overlay, { top: position.top, left: position.left, duration: 1 });

    const randomGradientIndex = getRandomInt(0, gradientImages.length - 1);
    const randomGradient = gradientImages[randomGradientIndex].src;

    underlay.style.backgroundImage = `url('${randomGradient}')`;
    gsap.set(".gradient", { opacity: 0 });
    gsap.to(".gradient", { opacity: 1, duration: 1, scale: 1.5 });

    prevElements.forEach((prev, i) => {
      const scale = i === index ? 1.3 : 1.1;
      const rotation = i === index ? 9 : -7;
      gsap.to(prev, {
        scale: scale,
        rotation: rotation,
        duration: 1,
        ease: "power.out4",
      });
    });

    workItems.forEach((item, i) => {
      const scale = i === index ? 1 : 0.99;
      gsap.to(item, { scale: scale, duration: 0.7 });
    });
  }

  function handleHoverOut() {
    gsap.to(overlay, { top: "0%", left: "13.25%", duration: 1 });
    gsap.to(".gradient", { opacity: 0, duration: 1 });

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

  handleHover(getRandomInt(0, workItems.length - 1)); // Set initial background to a random gradient
});
