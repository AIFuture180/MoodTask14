function adjustMainContentPadding() {
    const navBar = document.querySelector('.nav-bar');
    const mainContent = document.querySelector('.main-content');
    if (navBar && mainContent) {
        const navHeight = navBar.offsetHeight;
        mainContent.style.paddingTop = `${navHeight + 10}px`;
    }
}

// Index.html specific functions
function toggleMoodGrid() {
    const grid = document.getElementById('moodGrid');
    const moodButton = document.getElementById('moodButton');
    if (grid && moodButton) {
        grid.classList.add('active');
        moodButton.classList.add('hidden');
        sessionStorage.setItem('moodButtonClicked', 'true');
        console.log('Mood grid displayed and button hidden');
    } else {
        console.error('Mood grid or button element not found');
    }
}

function showRecommendation(mood) {
    document.querySelectorAll('.mood-option').forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.mood === mood) {
            option.classList.add('selected');
        }
    });

    document.querySelectorAll('.recommendation').forEach(rec => {
        rec.classList.remove('active');
    });
    const recommendation = document.getElementById(mood + 'Recommendation');
    if (recommendation) {
        recommendation.classList.add('active');
        recommendation.scrollIntoView({ behavior: 'smooth', block: 'start' });
        console.log('Showing recommendation for mood:', mood);
    } else {
        console.error('Recommendation element not found for mood:', mood);
    }

    const today = new Date('2025-04-29').toISOString().split('T')[0];
    const storedMood = localStorage.getItem(`mood-${today}`);
    if (!storedMood) {
        localStorage.setItem(`mood-${today}`, mood);
        console.log(`Mood "${mood}" saved for ${today}. This will be reflected on the dashboard.`);
    } else {
        console.log(`Mood already saved for ${today}: ${storedMood}. No changes made.`);
    }
}

function scrollToMoodGrid() {
    const moodGrid = document.getElementById('moodGrid');
    if (moodGrid) {
        moodGrid.classList.add('active');
        moodGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Music.html specific functions
function toggleMusicGrid() {
    const grid = document.getElementById('musicGrid');
    const summary = document.getElementById('musicSummary');
    if (!grid || !summary) return;
    grid.classList.toggle('active');
    summary.classList.toggle('active');
    if (grid.classList.contains('active')) {
        analyzeMusicTrends();
    }
}

function openPopup(category) {
    const popup = document.getElementById(`${category}-popup`);
    popup.style.display = 'flex';
    const logButton = popup.querySelector('.log-button');
    logButton.classList.add('active');
    logButton.textContent = 'Log Track';
    logButton.disabled = false;
    logButton.style.backgroundColor = '#6BCB77';
}

function closePopup(category) {
    const popup = document.getElementById(`${category}-popup`);
    popup.style.display = 'none';
    const player = document.getElementById(`${category}-player`);
    player.classList.remove('active');
    player.src = '';
    backToTracks(category);
}

function playTrack(category, videoId, trackName) {
    const tiles = document.getElementById(`${category}-tiles`);
    const player = document.getElementById(`${category}-player`);
    const backButton = document.getElementById(`${category}-back`);
    tiles.style.display = 'none';
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    player.classList.add('active');
    backButton.style.display = 'inline-flex';
    const trackTiles = tiles.querySelectorAll('.track-tile');
    trackTiles.forEach(tile => {
        tile.classList.remove('active');
        if (tile.textContent === trackName) {
            tile.classList.add('active');
        }
    });
}

function backToTracks(category) {
    const tiles = document.getElementById(`${category}-tiles`);
    const player = document.getElementById(`${category}-player`);
    const
