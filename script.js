/************************************************************
 * =============== ORIGINAL CODE (Unchanged) ===============
 * 1) THEME SWITCHING & MUSIC
************************************************************/
const body = document.body;
let discoMusic; // Created dynamically (was in original code)
const musicControl = document.getElementById('music-control');
const muteButton = document.getElementById('mute-button');

// Function to set theme
function setTheme(theme) {
  body.classList.remove('light-mode', 'dark-mode', 'disco-mode');
  body.classList.add(theme);
  localStorage.setItem('theme', theme);

  if (theme === 'disco-mode') {
    startDiscoMusic();
  } else {
    stopDiscoMusic();
  }
}

// Load saved theme and music state
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light-mode';
  setTheme(savedTheme);

  // Initialize Projects and Interests
  if (document.getElementById('load-more-projects')) {
    loadProjects();
    document.getElementById('load-more-projects').addEventListener('click', toggleProjects);
  }

  if (document.getElementById('load-more-interests')) {
    loadInterests();
    document.getElementById('load-more-interests').addEventListener('click', toggleInterests);
  }

  // Initialize Carousel (if present)
  if (typeof showImage === 'function') {
    showImage(currentIndex);
  }

  // Check if music was playing before page reload
  if (localStorage.getItem('isDiscoMusicPlaying') === 'true' && localStorage.getItem('theme') === 'disco-mode') {
    startDiscoMusic();
  }
});

// Theme switcher event listeners for DESKTOP
// (unchanged; these are the "Light Mode", "Dark Mode", "Disco Mode" buttons)
document.getElementById('light-mode').addEventListener('click', () => setTheme('light-mode'));
document.getElementById('dark-mode').addEventListener('click', () => setTheme('dark-mode'));
document.getElementById('disco-mode').addEventListener('click', () => setTheme('disco-mode'));

// Music Playback Functions
function startDiscoMusic() {
  if (!discoMusic) {
    // Create the audio element dynamically
    discoMusic = new Audio('Assets/music.mp3'); // music file path
    discoMusic.loop = true;

    // Check if music was muted
    const savedMutedState = localStorage.getItem('isDiscoMusicMuted');
    isMuted = savedMutedState === 'true';
    discoMusic.muted = isMuted;

    // Update mute button text
    if (muteButton) {
      muteButton.textContent = isMuted ? 'Unmute Music' : 'Mute Music';
    }

    // Listen for music events to save state
    discoMusic.addEventListener('play', () => {
      localStorage.setItem('isDiscoMusicPlaying', 'true');
    });
    discoMusic.addEventListener('pause', () => {
      localStorage.setItem('isDiscoMusicPlaying', 'false');
    });
  }

  discoMusic.play();
  if (musicControl) {
    musicControl.style.display = 'block';
  }
}

function stopDiscoMusic() {
  if (discoMusic) {
    discoMusic.pause();
    discoMusic.currentTime = 0;
  }
  if (musicControl) {
    musicControl.style.display = 'none';
  }
}

// Mute/Unmute Button
let isMuted = false;
if (muteButton) {
  muteButton.addEventListener('click', () => {
    if (discoMusic) {
      isMuted = !isMuted;
      discoMusic.muted = isMuted;
      muteButton.textContent = isMuted ? 'Unmute Music' : 'Mute Music';
      localStorage.setItem('isDiscoMusicMuted', isMuted.toString());
    }
  });
}

/************************************************************
 * 2) PROJECTS & INTERESTS (ORIGINAL CODE)
************************************************************/
const projects = [
  // 5 initial projects (unchanged)...
  {
    image: 'Assets/media/portfolio/ip.png',
    name: 'Task AI [in progress...]',
    date: 'Oct. 20, 2024 - Present',
    description: 'tbd...',
    url: 'https://github.com/Justin-Liao23-e/Task-AI'
  },
  {
    image: 'Assets/media/portfolio/ip.png',
    name: 'Python Web Scraper [in progress...]',
    date: 'Oct. 20, 2024 - Present',
    description: 'tbd...',
    url: 'https://github.com/Justin-Liao23-e/Web-Data-Scraper'
  },
  {
    image: 'Assets/media/portfolio/desk.png',
    name: 'Desktop Organizing Script',
    date: 'Oct 24, 2024 - Nov 7, 2024',
    description: 'I built this Python script to keep my desktop clean by automatically organizing files from the Downloads folder into categorized folders on my Desktop...',
    url: 'https://github.com/Justin-Liao23-e/Desktop-Organizer'
  },
  {
    image: 'Assets/media/portfolio/stock.png',
    name: 'Stock Market Browser Extension',
    date: 'Oct 18, 2024 - Oct 24, 2024',
    description: 'I developed this browser extension...',
    url: 'https://github.com/Justin-Liao23-e/Stock-Market-Browser-Extension'
  },
  {
    image: 'Assets/media/portfolio/ttt.png',
    name: 'C++ TikTakToe',
    date: 'Apr 2, 2024',
    description: 'This console-based Tik-Tak-Toe game challenges two players...',
    url: 'https://github.com/Justin-Liao23-e/TikTakToe'
  },
  {
    image: 'Assets/media/portfolio/c$.png',
    name: 'C$ Stalker',
    date: 'Nov 8, 2024 - Nov 25, 2024',
    description: 'This is a web app that simulates real-time stock trading...',
    url: 'https://github.com/ethan-leonard/CS_Stalkers'
  },
  {
    image: 'Assets/media/portfolio/binary.png',
    name: 'Converters: Decimal to Binary, Octal, and Hexadecimal',
    date: 'March 2021',
    description: 'My coding journey began with this Binary Decimal Converter...',
    url: 'https://github.com/Justin-Liao23-e/Binary-to-Decimal-Converter'
  },
];

const interests = [
  // 5 initial interests (unchanged)...
  {
    image: 'Assets/media/...',
    name: 'Arts',
    description: 'Capturing the world one frame at a time.',
    url: 'https://github.com/...'
  },
  {
    image: 'Assets/media/...',
    name: 'Piano & Singing',
    description: 'Exploring new cultures and destinations.',
    url: 'https://github.com/...'
  },
  {
    image: 'images/interest3.jpg',
    name: 'Family & Friends',
    description: 'Experimenting with flavors and cuisines.',
    url: 'https://github.com/...'
  },
  {
    image: 'images/interest4.jpg',
    name: 'Reading',
    description: 'Appreciating rhythms and melodies.',
    url: 'https://github.com/...'
  },
  {
    image: 'images/interest5.jpg',
    name: 'Investing',
    description: 'Diving into different worlds through books.',
    url: 'https://github.com/...'
  },
  {
    image: 'images/interest7.jpg',
    name: 'Fitness',
    description: 'Boxing and jogging and gym and golf.',
    url: 'https://github.com/...'
  },
];

let projectsExpanded = false;
let interestsExpanded = false;

function loadProjects() {
  const projectList = document.getElementById('project-list');
  if (!projectList) return; // if element not present, skip
  projectList.innerHTML = '';
  let itemsToLoad = projectsExpanded ? projects.length : 5;

  for (let i = 0; i < itemsToLoad && i < projects.length; i++) {
    const project = projects[i];
    const projectItem = document.createElement('div');
    projectItem.classList.add('project-item');
    projectItem.innerHTML = `
      <img src="${project.image}" alt="${project.name}">
      <div class="content">
        <a href="${project.url}" class="project-name" target="_blank"><h2>${project.name}</h2></a>
        <p class="project-date">${project.date}</p>
        <p class="project-description">${project.description}</p>
        <span class="view-more">View More</span>
      </div>
    `;
    projectList.appendChild(projectItem);

    // View More toggle inside each project
    const viewMoreButton = projectItem.querySelector('.view-more');
    const description = projectItem.querySelector('.project-description');
    viewMoreButton.addEventListener('click', () => {
      description.classList.toggle('expanded');
      viewMoreButton.textContent = description.classList.contains('expanded') ? 'View Less' : 'View More';
    });
  }

  const loadMoreButton = document.getElementById('load-more-projects');
  if (loadMoreButton) {
    loadMoreButton.textContent = projectsExpanded ? 'Load Less' : 'Load More';
  }
}

function toggleProjects() {
  projectsExpanded = !projectsExpanded;
  loadProjects();
}

function loadInterests() {
  const interestList = document.getElementById('interest-list');
  if (!interestList) return;
  interestList.innerHTML = '';
  let itemsToLoad = interestsExpanded ? interests.length : 5;

  for (let i = 0; i < itemsToLoad && i < interests.length; i++) {
    const interest = interests[i];
    const interestItem = document.createElement('div');
    interestItem.classList.add('interest-item');
    interestItem.innerHTML = `
      <img src="${interest.image}" alt="${interest.name}">
      <div class="content">
        <h2>${interest.name}</h2>
        <p>${interest.description}</p>
      </div>
    `;
    interestList.appendChild(interestItem);
  }

  const loadMoreButton = document.getElementById('load-more-interests');
  if (loadMoreButton) {
    loadMoreButton.textContent = interestsExpanded ? 'Load Less' : 'Load More';
  }
}

function toggleInterests() {
  interestsExpanded = !interestsExpanded;
  loadInterests();
}

/************************************************************
 * 3) CAROUSEL (ORIGINAL CODE)
************************************************************/
let currentIndex = 0;
const images = document.querySelectorAll('.carousel-image');
const totalImages = images.length;

const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

function showImage(index) {
  images.forEach((img) => {
    img.classList.remove('active');
  });
  images[index].classList.add('active');
}

if (prevButton && nextButton) {
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
    showImage(currentIndex);
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex);
  });
}

/************************************************************
 * 4) ENSURE MUSIC CONTINUES ACROSS PAGE NAVIGATIONS
************************************************************/
window.addEventListener('beforeunload', () => {
  if (discoMusic && !discoMusic.paused) {
    localStorage.setItem('isDiscoMusicPlaying', 'true');
  } else {
    localStorage.setItem('isDiscoMusicPlaying', 'false');
  }
});


/************************************************************
 * =============== NEW CODE FOR MOBILE DROPDOWNS ============
 * (Replacing old sidebars with a top-down approach)
************************************************************/

// Mobile icon elements
const mobileHamburger = document.querySelector('.mobile-hamburger');
const mobileThemeBtn = document.querySelector('.mobile-theme-btn');

// Dropdown containers
const mobileNavDropdown = document.getElementById('mobile-nav-dropdown');
const mobileThemeDropdown = document.getElementById('mobile-theme-dropdown');

// Hamburger logic
if (mobileHamburger) {
  mobileHamburger.addEventListener('click', () => {
    // If the nav is already open, close it
    if (mobileNavDropdown.classList.contains('show')) {
      mobileNavDropdown.classList.remove('show');
    } else {
      // If theme dropdown is open, close it first
      mobileThemeDropdown.classList.remove('show');
      // Then open nav
      mobileNavDropdown.classList.add('show');
    }
  });
}

// Theme button logic
if (mobileThemeBtn) {
  mobileThemeBtn.addEventListener('click', () => {
    // If the theme dropdown is already open, close it
    if (mobileThemeDropdown.classList.contains('show')) {
      mobileThemeDropdown.classList.remove('show');
    } else {
      // If nav dropdown is open, close it first
      mobileNavDropdown.classList.remove('show');
      // Then open theme
      mobileThemeDropdown.classList.add('show');
    }
  });
}

// Mobile theme selection
const lightMobile = document.getElementById('light-mobile');
const darkMobile = document.getElementById('dark-mobile');
const discoMobile = document.getElementById('disco-mobile');

if (lightMobile) {
  lightMobile.addEventListener('click', () => {
    setTheme('light-mode');
    mobileThemeDropdown.classList.remove('show');
  });
}
if (darkMobile) {
  darkMobile.addEventListener('click', () => {
    setTheme('dark-mode');
    mobileThemeDropdown.classList.remove('show');
  });
}
if (discoMobile) {
  discoMobile.addEventListener('click', () => {
    setTheme('disco-mode');
    mobileThemeDropdown.classList.remove('show');
  });
}