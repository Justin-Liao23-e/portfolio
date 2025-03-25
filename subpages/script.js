document.addEventListener("DOMContentLoaded", () => {
    // Carousel functionality
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

        // Auto-advance carousel every 5 seconds
        let autoAdvance;
        
        function startAutoAdvance() {
            autoAdvance = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            }, 5000);
        }
        
        function stopAutoAdvance() {
            clearInterval(autoAdvance);
        }
        
        // Start auto-advancing when page loads
        startAutoAdvance();
        
        // Stop auto-advancing when user interacts with carousel
        carouselContainer.addEventListener("mouseenter", stopAutoAdvance);
        carouselContainer.addEventListener("mouseleave", startAutoAdvance);
        
        // Stop auto-advancing when user touches on mobile
        carouselContainer.addEventListener("touchstart", stopAutoAdvance, { passive: true });
        carouselContainer.addEventListener("touchend", startAutoAdvance, { passive: true });

        // Initial display
        showImage(currentIndex);
    });
    
    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById("darkModeToggle");
    
    // Only initialize dark mode if the toggle exists
    if (darkModeToggle) {
        const body = document.body;
        const icon = darkModeToggle.querySelector("i");
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            body.classList.add("dark-mode");
            if (icon) {
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            }
        }
        
        darkModeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            
            // Toggle icon if it exists
            if (icon) {
                if (body.classList.contains("dark-mode")) {
                    icon.classList.remove("fa-moon");
                    icon.classList.add("fa-sun");
                    localStorage.setItem("theme", "dark");
                } else {
                    icon.classList.remove("fa-sun");
                    icon.classList.add("fa-moon");
                    localStorage.setItem("theme", "light");
                }
            } else {
                // Just save the preference if there's no icon
                if (body.classList.contains("dark-mode")) {
                    localStorage.setItem("theme", "dark");
                } else {
                    localStorage.setItem("theme", "light");
                }
            }
        });
    }
});