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
    discoMusic = new Audio('music.mp3'); // Replace with your audio file path
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
    image: 'images/project1.jpg',
    name: 'Project Alpha',
    description: 'An innovative solution for modern challenges.',
    url: '#'
  },
  {
    image: 'images/project2.jpg',
    name: 'Project Beta',
    description: 'A cutting-edge platform for seamless integration.',
    url: '#'
  },
  {
    image: 'images/project3.jpg',
    name: 'Project Gamma',
    description: 'Revolutionizing the way we interact with technology.',
    url: '#'
  },
  {
    image: 'images/project4.jpg',
    name: 'Project Delta',
    description: 'Bridging gaps with next-gen solutions.',
    url: '#'
  },
  {
    image: 'images/project5.jpg',
    name: 'Project Epsilon',
    description: 'Empowering users through intuitive design.',
    url: '#'
  },
  // 2 additional projects to load after clicking "Load More"
  {
    image: 'images/project6.jpg',
    name: 'Project Zeta',
    description: 'Enhancing productivity with AI-driven tools.',
    url: '#'
  },
  {
    image: 'images/project7.jpg',
    name: 'Project Eta',
    description: 'A new approach to collaborative work.',
    url: '#'
  }
];

const interests = [
  // 5 initial interests
  {
    image: 'images/interest1.jpg',
    name: 'Photography',
    description: 'Capturing the world one frame at a time.'
  },
  {
    image: 'images/interest2.jpg',
    name: 'Traveling',
    description: 'Exploring new cultures and destinations.'
  },
  {
    image: 'images/interest3.jpg',
    name: 'Cooking',
    description: 'Experimenting with flavors and cuisines.'
  },
  {
    image: 'images/interest4.jpg',
    name: 'Music',
    description: 'Appreciating rhythms and melodies.'
  },
  {
    image: 'images/interest5.jpg',
    name: 'Reading',
    description: 'Diving into different worlds through books.'
  },
  // 2 additional interests to load after clicking "Load More"
  {
    image: 'images/interest6.jpg',
    name: 'Gaming',
    description: 'Immersing in interactive adventures.'
  },
  {
    image: 'images/interest7.jpg',
    name: 'Fitness',
    description: 'Pursuing a healthy and active lifestyle.'
  }
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
        <h2>${project.name}</h2>
        <p>${project.description}</p>
        <a href="${project.url}" class="view-more">View Project</a>
      </div>
    `;
    projectList.appendChild(projectItem);
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
