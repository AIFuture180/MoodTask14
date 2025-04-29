function adjustMainContentPadding() {
    const navBar = document.querySelector('.nav-bar');
    const mainContent = document.querySelector('.main-content');
    if (navBar && mainContent) {
        const navHeight = navBar.offsetHeight;
        mainContent.style.paddingTop = `${navHeight + 10}px`;
    }
}

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

    // Save the mood to localStorage for tracking on the dashboard
    const today = new Date().toISOString().split('T')[0]; // e.g., 2025-04-29
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

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-bar .nav-links a');
    const mainContent = document.querySelector('.main-content');
    const moodButton = document.getElementById('moodButton');
    const moodGrid = document.getElementById('moodGrid');

    mainContent.classList.add('fade-in');
    adjustMainContentPadding();

    // Check sessionStorage to determine initial state
    const buttonClicked = sessionStorage.getItem('moodButtonClicked');
    if (buttonClicked === 'true') {
        moodButton.classList.add('hidden');
        moodGrid.classList.add('active');
        console.log('Mood grid shown on page load (sessionStorage flag present)');
    } else {
        console.log('Mood button shown on page load (no sessionStorage flag)');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            mainContent.classList.remove('fade-in');
            mainContent.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = link.href;
            }, 500);
        });
    });

    if (moodButton) {
        moodButton.addEventListener('click', toggleMoodGrid);
        moodButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMoodGrid();
            }
        });
        console.log('Mood button event listener attached');
    } else {
        console.error('Mood button not found');
    }

    const moodOptions = document.querySelectorAll('.mood-option');
    if (moodOptions.length > 0) {
        moodOptions.forEach(option => {
            option.addEventListener('click', () => {
                const mood = option.dataset.mood;
                showRecommendation(mood);
            });
            option.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const mood = option.dataset.mood;
                    showRecommendation(mood);
                }
            });
        });
        console.log('Mood option event listeners attached:', moodOptions.length);
    } else {
        console.error('No mood options found');
    }

    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.recommendation').forEach(rec => {
                rec.classList.remove('active');
            });
            scrollToMoodGrid();
        });
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                document.querySelectorAll('.recommendation').forEach(rec => {
                    rec.classList.remove('active');
                });
                scrollToMoodGrid();
            }
        });
    });

    const adPlayer = document.getElementById('adPlayer');
    if (adPlayer) {
        console.log('Ad player initialized with autoplay and loop');
        adPlayer.addEventListener('click', (e) => {
            if (e.target.tagName === 'VIDEO') {
                console.log('Ad player video clicked, redirecting to affiliate link');
            }
        });
        const video = adPlayer.querySelector('video');
        if (video) {
            video.play().catch(error => {
                console.error('Autoplay failed:', error);
            });
        }
    } else {
        console.error('Ad player element not found');
    }

    window.addEventListener('resize', adjustMainContentPadding);
});
