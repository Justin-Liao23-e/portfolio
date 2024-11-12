// Theme Switching with Persistence
const body = document.body;
// Remove the reference to discoMusic from the HTML
// const discoMusic = document.getElementById('disco-music');
let discoMusic; // Now discoMusic will be created dynamically
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

// Theme switcher event listeners
document.getElementById('light-mode').addEventListener('click', () => setTheme('light-mode'));
document.getElementById('dark-mode').addEventListener('click', () => setTheme('dark-mode'));
document.getElementById('disco-mode').addEventListener('click', () => setTheme('disco-mode'));

// Music Playback Functions
function startDiscoMusic() {
  if (!discoMusic) {
    // Create the audio element dynamically
    discoMusic = new Audio('Assets/music.mp3'); //music file path
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

// Load More Functionality for Projects and Interests
const projects = [
  // 5 initial projects
  {
    image: '',
    name: 'Task AI [in progress...]',
    date: 'Oct. 20, 2024 - Present',
    description: 'An innovative solution for modern challengesAn innovative solution for modern challengesAnAn innovative solution for modern challengesAn innovative solution for modern challengesAnAn innovative solution for modern challengesAn innovative solution for modern challengesAnAn innovative solution for modern challengesAn innovative solution for modern challengesAnAn innovative solution for modern challengesAn innovative solution for modern challengesAn innovative solution for modern challengesAn innovative solution for modern challenges',
    url: 'https://github.com/Justin-Liao23-e/Task-AI'
  },
  {
    image: 'Assets/media/profiles/',
    name: 'Python Web Scraper [in progress...]',
    date: 'Oct. 20, 2024 - Present',
    description: 'An innovative solution for modern challengesAn innovative solution for modern challengesAn innovative solution for modern challengesAn innovative solution for modern challenges',
    url: 'https://github.com/Justin-Liao23-e/Web-Data-Scraper'
  },
  {
    image: 'Assets/media/portfolio/...',
    name: 'Desktop Organizing Script',
    date: 'Oct 24, 2024 - Nov 7, 2024',
    description: 'An innovative solution for modern challengesAn innovative solution for modern challengesAn innovative solution for modern challengesAn innovative solution for modern challenges',
    url: 'https://github.com/Justin-Liao23-e/Desktop-Organizer'
  },
  {
    image: 'Assets/media/portfolio/...',
    name: 'Stock Market Browser Extension',
    date: 'Oct 18, 2024 - Oct 24, 2024',
    description: 'An innovative solution for modern challengesAn innovative solution for modern challengesAn innovative solution for modern challengesAn innovative solution for modern challenges',
    url: 'https://github.com/Justin-Liao23-e/Stock-Market-Browser-Extension'
  },
  {
    image: 'Assets/media/portfolio/...',
    name: 'C++ TikTakToe',
    date: 'Apr 2, 2024',
    description: 'A cutting-edge platform for seamless integration.',
    url: 'https://github.com/Justin-Liao23-e/TikTakToe'
  },
  {
    image: 'Assets/media/portfolio/...',
    name: 'C$ Stalker',
    date: 'Nov 8, 2024 - Nov 25, 2024',
    description: 'Revolutionizing the way we interact with technology.',
    url: 'https://github.com/ethan-leonard/CS_Stalkers'
  },
  {
    image: 'Assets/media/portfolio/...',
    name: 'Converters: Decimal to Binary, Octal, and Hexadecimal',
    date: 'March 2021',
    description: 'Bridging gaps with next-gen solutions.',
    url: 'https://github.com/Justin-Liao23-e/Binary-to-Decimal-Converter'
  },
];

const interests = [
  // 5 initial interests
  {
    image: 'Assets/media/...',
    name: 'Arts',
    description: 'Capturing the world one frame at a time.',
    url: 'https://github.com/Justin-Liao23-e/Justin-Liao23-e.github.io_OLD/blob/main/index.html'
  },
  {
    image: 'Assets/media/...',
    name: 'Piano & Singing',
    description: 'Exploring new cultures and destinations.',
    url: 'https://github.com/Justin-Liao23-e/Justin-Liao23-e.github.io_OLD/blob/main/index.html'
  },
  {
    image: 'images/interest3.jpg',
    name: 'Family & Friends',
    description: 'Experimenting with flavors and cuisines.',
    url: 'https://github.com/Justin-Liao23-e/Justin-Liao23-e.github.io_OLD/blob/main/index.html'
  },
  {
    image: 'images/interest4.jpg',
    name: 'Reading',
    description: 'Appreciating rhythms and melodies.',
    url: 'https://github.com/Justin-Liao23-e/Justin-Liao23-e.github.io_OLD/blob/main/index.html'
  },
  {
    image: 'images/interest5.jpg',
    name: 'Investing',
    description: 'Diving into different worlds through books.',
    url: 'https://github.com/Justin-Liao23-e/Justin-Liao23-e.github.io_OLD/blob/main/index.html'
  },
  {
    image: 'images/interest7.jpg',
    name: 'Fitness',
    description: 'Boxing and jogging and gym and golf.',
    url: 'https://github.com/Justin-Liao23-e/Justin-Liao23-e.github.io_OLD/blob/main/index.html'
  },
];

let projectsExpanded = false;
let interestsExpanded = false;

function loadProjects() {
  const projectList = document.getElementById('project-list');
  projectList.innerHTML = ''; // Clear existing items
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

    // Add event listener for "View More" button within this loop
    const viewMoreButton = projectItem.querySelector('.view-more');
    const description = projectItem.querySelector('.project-description');
    viewMoreButton.addEventListener('click', () => {
      description.classList.toggle('expanded');
      viewMoreButton.textContent = description.classList.contains('expanded') ? 'View Less' : 'View More';
    });
  }

  // Update button text
  const loadMoreButton = document.getElementById('load-more-projects');
  loadMoreButton.textContent = projectsExpanded ? 'Load Less' : 'Load More';
}

function toggleProjects() {
  projectsExpanded = !projectsExpanded;
  loadProjects();
}

function loadInterests() {
  const interestList = document.getElementById('interest-list');
  interestList.innerHTML = ''; // Clear existing items
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

  // Update button text
  const loadMoreButton = document.getElementById('load-more-interests');
  loadMoreButton.textContent = interestsExpanded ? 'Load Less' : 'Load More';
}

function toggleInterests() {
  interestsExpanded = !interestsExpanded;
  loadInterests();
}

// Carousel Functionality with Infinite Looping
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

// Ensure music continues playing across page navigations
window.addEventListener('beforeunload', () => {
  if (discoMusic && !discoMusic.paused) {
    localStorage.setItem('isDiscoMusicPlaying', 'true');
  } else {
    localStorage.setItem('isDiscoMusicPlaying', 'false');
  }
});
