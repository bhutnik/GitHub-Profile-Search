import './style.css'


const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const profileCard = document.getElementById('profile-card');
const errorMsg = document.getElementById('error-msg');

// DOM Elements to update
const avatar = document.getElementById('avatar');
const nameEl = document.getElementById('name');
const usernameEl = document.getElementById('username');
const dateEl = document.getElementById('date');
const bioEl = document.getElementById('bio');
const reposEl = document.getElementById('repos');
const followersEl = document.getElementById('followers');
const followingEl = document.getElementById('following');

// Fetch user data from GitHub API
async function fetchUser(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            throw new Error('User not found');
        }
        
        const data = await response.json();
        updateDOM(data);
    } catch (error) {
        showError();
    }
}

// Format the date (e.g., "Joined 25 Jan 2021")
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
}

// Update UI with the fetched data
function updateDOM(user) {
    // Hide error, show the profile card
    errorMsg.classList.add('hidden');
    profileCard.classList.remove('hidden');

    // Populate profile data
    avatar.src = user.avatar_url;
    // Fallback to login name if the user hasn't set a real name
    nameEl.textContent = user.name || user.login; 
    usernameEl.textContent = `@${user.login}`;
    usernameEl.href = user.html_url;
    dateEl.textContent = `Joined ${formatDate(user.created_at)}`;
    
    // Handle empty bios cleanly
    bioEl.textContent = user.bio || 'This profile has no bio.';
    bioEl.className = user.bio ? 'text-slate-300 mb-6 leading-relaxed' : 'text-slate-500 mb-6 italic';

    reposEl.textContent = user.public_repos;
    followersEl.textContent = user.followers;
    followingEl.textContent = user.following;
}

// Hide the card and show the error state
function showError() {
    profileCard.classList.add('hidden');
    errorMsg.classList.remove('hidden');
}

// Listen for the form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = input.value.trim();
    
    if (username) {
        fetchUser(username);
    }
});

