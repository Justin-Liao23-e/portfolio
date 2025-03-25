const body = document.body;
let discoMusic; // Created dynamically
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
// "Light Mode", "Dark Mode", "Disco Mode" buttons
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

// 2) PROJECTS & INTERESTS
const projects = [
  {
    image: 'https://media.licdn.com/dms/image/v2/D562DAQGBCi1809PsKg/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1721053754347?e=1743480000&v=beta&t=lfRl8ny2z9bMUWrg1wdtreaTNZ9kXOjEYqTd-vMU0Q0',
    name: 'VolunTier',
    date: 'Mar 1, 2025 - Present',
    description: 'A startup project working in Stealth, expected launch date: end of Spring 25.',
    url: 'https://volun-tier.com/'
  },
  {
    image: 'https://media.licdn.com/dms/image/v2/D562DAQGBCi1809PsKg/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1721053754347?e=1743480000&v=beta&t=lfRl8ny2z9bMUWrg1wdtreaTNZ9kXOjEYqTd-vMU0Q0',
    name: 'Reunify AI',
    date: 'Jun 1, 2024 - Present',
    description: 'A startup project working in Stealth, expected launch date: end of Summer 25.',
    url: 'https://reunify.tech/'
  },
  {
    image: 'Assets/media/portfolio/ip.png',
    name: 'UWB Innovators Hub Website',
    date: '',
    description: '',
    url: 'https://innovatorshubus.my.canva.site/'
  },
  {
    image: 'Assets/media/portfolio/desk.png',
    name: 'Desktop Organizing Script',
    date: 'Oct 24, 2024 - Nov 7, 2024',
    description: 'I built this Python script to keep my desktop clean by automatically organizing files from the Downloads folder into categorized folders on my Desktop. Using the watchdog library, the script monitors Downloads for new files and instantly sorts them into folders based on type, such as Images, Videos, Documents...etc. It’s a continuous process that runs in the background, making file management hands-free and time-efficient. This project taught me about file handling, automation, and real-time monitoring with the Watchdog API, creating a streamlined workspace.',
    url: 'https://github.com/Justin-Liao23-e/Desktop-Organizer'
  },
  {
    image: 'Assets/media/portfolio/stock.png',
    name: 'Stock Market Browser Extension',
    date: 'Oct 18, 2024 - Oct 24, 2024',
    description: 'I developed this browser extension to track real-time stock prices and display key data from daily to yearly changes. Using JavaScript, HTML, and CSS, the extension pulls data from the Alpha Vantage API and ensures that the stock list is saved using the Chrome Storage API, even after closing the browser. It features automatic updates every 30 minutes during market hours and a manual refresh button for instant updates. Through this project, I gained experience with API integration, persistent data storage, and UI/UX improvements. Feel free to try it out on my GitHub repo.',
    url: 'https://github.com/Justin-Liao23-e/Stock-Market-Browser-Extension'
  },
  {
    image: 'Assets/media/portfolio/ttt.png',
    name: 'C++ TikTakToe',
    date: 'Apr 2, 2024',
    description: 'This console-based Tik-Tak-Toe game challenges two players to face off! Built as part of a Codecademy challenge, it was my first real dive into C++. I learned how to manage game logic, update grids dynamically, and use vectors to track moves. This project was a great intro to the low-level structure of C++ and strengthened my confidence in the language’s basics.',
    url: 'https://github.com/Justin-Liao23-e/TikTakToe'
  },
  {
    image: 'Assets/media/portfolio/c$.png',
    name: 'C$ Stalker',
    date: 'Nov 8, 2023 - Nov 25, 2023',
    description: 'This is a web app that simulates real-time stock trading using mainly Python and Flask. I co-developed with Ethan Leonard, I focused on front-end enhancements to create an engaging and user-friendly experience. Using IEX API, the app lets users simulate stock trading in a dynamic environment with auto-updating charts, while integrated AI chatbots by ChatGPT offer instant insights and guidance for the user.',
    url: 'https://github.com/ethan-leonard/CS_Stalkers'
  },
  {
    image: 'https://acm-website-storage.s3.us-west-2.amazonaws.com/BC_ACM_Logo_Dark_Mode.png',
    name: 'BC Computer Programming Club Website - V1',
    date: 'Apr 1, 2023 - Mar 1, 2024',
    description: 'I co-developed the club website for BC Computer Programming Club (now BC ACM), starting as a member in April 2023 and later being promoted to VP in July 2023. Collaborating with four leaders, I built our first ACM club website from scratch using HTML, CSS, JavaScript, Node.js, and Express.js, which increased club membership to over 250 students. I handled the front-end development and implemented the back-end for the contact page, while also guiding students in setting up collaborative Git environments and creating their portfolio websites.',
    url: 'https://www.bccomputerprogramingclub.com/'
  },
  {
    image: 'Assets/media/portfolio/binary.png',
    name: 'Converters: Decimal to Binary, Octal, and Hexadecimal',
    date: 'March 2021',
    description: 'My coding journey began with this Binary Decimal Converter, a Python tool I created to convert between binary and decimal with flexible precision settings. Developed during my first Python bootcamp back in Taiwan, I expanded to binary-to-octal and binary-to-hexadecimal conversions as I dove deeper into the logic of base conversions. This project sharpened my mathematical thinking, problem-solving, and sparked my passion for programming.',
    url: 'https://github.com/Justin-Liao23-e/Binary-to-Decimal-Converter'
  },
];

let projectsExpanded = false;

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

// 3) CAROUSEL (ORIGINAL CODE)
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

// 4) ENSURE MUSIC CONTINUES ACROSS PAGE NAVIGATIONS
window.addEventListener('beforeunload', () => {
  if (discoMusic && !discoMusic.paused) {
    localStorage.setItem('isDiscoMusicPlaying', 'true');
  } else {
    localStorage.setItem('isDiscoMusicPlaying', 'false');
  }
});



// MOBILE DROPDOWNS
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

// Function to detect scrollable content areas and add appropriate class
function detectScrollableContent() {
  const contentDivs = document.querySelectorAll('.interest-item .content');
  
  contentDivs.forEach(div => {
    // Check if content exceeds container height
    if (div.scrollHeight > div.clientHeight) {
      div.classList.add('scrollable');
    } else {
      div.classList.remove('scrollable');
    }
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
  detectScrollableContent();
  
  // Also run when window is resized to handle responsive changes
  window.addEventListener('resize', detectScrollableContent);
});