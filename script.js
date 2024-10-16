// Theme Switching
const body = document.body;
const discoMusic = document.getElementById('disco-music');
const musicControl = document.getElementById('music-control');
const muteButton = document.getElementById('mute-button');

document.getElementById('light-mode').addEventListener('click', () => {
    body.classList.remove('dark-mode', 'disco-mode');
    body.classList.add('light-mode');
    stopDiscoMusic();
});

document.getElementById('dark-mode').addEventListener('click', () => {
    body.classList.remove('light-mode', 'disco-mode');
    body.classList.add('dark-mode');
    stopDiscoMusic();
});

document.getElementById('disco-mode').addEventListener('click', () => {
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add('disco-mode');
    startDiscoMusic();
});

// Music Playback Functions
function startDiscoMusic() {
    if (discoMusic) {
        discoMusic.play();
        musicControl.style.display = 'block';
    }
}

function stopDiscoMusic() {
    if (discoMusic) {
        discoMusic.pause();
        discoMusic.currentTime = 0;
        musicControl.style.display = 'none';
    }
}

// Mute/Unmute Button
let isMuted = false;
muteButton.addEventListener('click', () => {
    if (discoMusic) {
        isMuted = !isMuted;
        discoMusic.muted = isMuted;
        muteButton.textContent = isMuted ? 'Unmute Music' : 'Mute Music';
    }
});

// Load More Functionality for Projects and Interests
const projects = [
    // Add your project objects here
    {
        image: 'images/project1.jpg',
        name: 'Project One',
        description: 'An innovative solution for problem X using technology Y.',
        url: 'https://project-one-url.com'
    },
    {
        image: 'images/project2.jpg',
        name: 'Project Two',
        description: 'A mobile app that simplifies task A for users.',
        url: 'https://project-two-url.com'
    },
    // Add more project objects
];

const interests = [
    // Add your interest objects here
    {
        image: 'images/interest1.jpg',
        name: 'Photography',
        description: 'Capturing moments through the lens is one of my passions.'
    },
    {
        image: 'images/interest2.jpg',
        name: 'Traveling',
        description: 'Exploring new places and cultures inspires my creativity.'
    },
    // Add more interest objects
];

let projectsLoaded = 0;
let interestsLoaded = 0;
const itemsPerLoad = 6;

function loadProjects() {
    const projectList = document.getElementById('project-list');
    for (let i = projectsLoaded; i < projectsLoaded + itemsPerLoad && i < projects.length; i++) {
        const project = projects[i];
        const projectItem = document.createElement('div');
        projectItem.classList.add('project-item');
        projectItem.innerHTML = `
            <img src="${project.image}" alt="${project.name}">
            <h2>${project.name}</h2>
            <p>${project.description}</p>
            <a href="${project.url}" target="_blank">View Project</a>
        `;
        projectList.appendChild(projectItem);
    }
    projectsLoaded += itemsPerLoad;
    if (projectsLoaded >= projects.length) {
        const loadMoreButton = document.getElementById('load-more-projects');
        if (loadMoreButton) {
            loadMoreButton.style.display = 'none';
        }
    }
}

function loadInterests() {
    const interestList = document.getElementById('interest-list');
    for (let i = interestsLoaded; i < interestsLoaded + itemsPerLoad && i < interests.length; i++) {
        const interest = interests[i];
        const interestItem = document.createElement('div');
        interestItem.classList.add('interest-item');
        interestItem.innerHTML = `
            <img src="${interest.image}" alt="${interest.name}">
            <h2>${interest.name}</h2>
            <p>${interest.description}</p>
        `;
        interestList.appendChild(interestItem);
    }
    interestsLoaded += itemsPerLoad;
    if (interestsLoaded >= interests.length) {
        const loadMoreButton = document.getElementById('load-more-interests');
        if (loadMoreButton) {
            loadMoreButton.style.display = 'none';
        }
    }
}

// Carousel Functionality
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

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
    showImage(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
    showImage(currentIndex);
});

// DOMContentLoaded Event
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Theme
    if (!body.classList.contains('light-mode') && !body.classList.contains('dark-mode') && !body.classList.contains('disco-mode')) {
        body.classList.add('light-mode');
    }

    // Initialize Projects and Interests
    if (document.getElementById('load-more-projects')) {
        loadProjects();
        document.getElementById('load-more-projects').addEventListener('click', loadProjects);
    }

    if (document.getElementById('load-more-interests')) {
        loadInterests();
        document.getElementById('load-more-interests').addEventListener('click', loadInterests);
    }

    // Initialize Carousel
    if (images.length > 0) {
        showImage(currentIndex);
    }
});

// Ensure music stops when page is unloaded
window.addEventListener('beforeunload', () => {
    if (discoMusic) {
        discoMusic.pause();
    }
});