document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll(".carousel-container");
  
    carousels.forEach((carouselContainer) => {
      const images = carouselContainer.querySelectorAll(".carousel-image");
      const prevButton = carouselContainer.querySelector(".prev-button");
      const nextButton = carouselContainer.querySelector(".next-button");
      let currentIndex = 0;
  
      function showImage(index) {
        images.forEach((img, idx) => {
          img.classList.toggle("active", idx === index);
        });
      }
  
      prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        showImage(currentIndex);
      });
  
      nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      });
  
      // Initial display
      showImage(currentIndex);
    });
  });  