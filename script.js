function adjustMainContentPadding() {
    const navBar = document.querySelector('.nav-bar');
    const mainContent = document.querySelector('.main-content');
    if (navBar && mainContent) {
        const navHeight = navBar.offsetHeight;
        mainContent.style.paddingTop = `${navHeight + 10}px`;
    }
}

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

function setupMusicCards() {
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const card = button.closest('.music-card');
            const category = card.getAttribute('data-category');
            openPopup(category);
        });
    });

    const trackTiles = document.querySelectorAll('.track-tile');
    trackTiles.forEach((tile) => {
        tile.addEventListener('click', () => {
            const category = tile.closest('.popup').id.split('-')[0];
            const videoId = tile.getAttribute('data-video');
            const trackName = tile.textContent;
            playTrack(category, videoId, trackName);
        });
    });

    const logButtons = document.querySelectorAll('.log-button');
    logButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const popup = button.closest('.popup');
            const category = popup.id.split('-')[0];
            const trackName = popup.querySelector('.track-tile.active')?.textContent || 'Unknown Track';
            const today = new Date('2025-04-27').toISOString().split('T')[0];
            const trackKey = `track-${today}`;
            let tracks = JSON.parse(localStorage.getItem(trackKey)) || [];
            tracks.push({ name: trackName, category: category.charAt(0).toUpperCase() + category.slice(1), timestamp: new Date().toISOString() });
            localStorage.setItem(trackKey, JSON.stringify(tracks));
            analyzeMusicTrends();
            button.textContent = 'Logged!';
            button.disabled = true;
            button.style.backgroundColor = '#A9A9A9';
        });
    });
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
    track
