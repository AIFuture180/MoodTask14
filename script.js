function adjustMainContentPadding() {
    const navBar = document.querySelector('.nav-bar');
    const mainContent = document.querySelector('.main-content');
    if (navBar && mainContent) {
        mainContent.style.paddingTop = `${navBar.offsetHeight + 10}px`;
    }
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-bar .nav-links a');
    const mainContent = document.querySelector('.main-content');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.classList.contains('active') || link.parentElement.classList.contains('dropdown')) return;
            e.preventDefault();
            mainContent.classList.remove('fade-in');
            mainContent.classList.add('fade-out');
            setTimeout(() => window.location.href = link.href, 500);
        });
    });
}

function setupDarkMode() {
    const darkMode = localStorage.getItem('darkMode') === 'enabled';
    if (darkMode) document.body.classList.add('dark-mode');
}

function setupBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to Top');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Index.html Specific Scripts
function setupMoodButtons() {
    if (!window.location.pathname.includes('index.html')) return;
    const moodButtons = document.querySelectorAll('.mood-button');
    const recommendationText = document.getElementById('recommendations');
    const today = new Date('2025-04-27').toISOString().split('T')[0];
    const moodKey = `mood-${today}`;

    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mood = button.dataset.mood;
            localStorage.setItem(moodKey, mood);

            const recommendations = {
                Happy: 'Keep the positivity flowing! Try our <a href="activities.html#gratitude">Gratitude Notes</a> or listen to our <a href="music.html#upbeat">Upbeat Playlist</a> to maintain your good vibes.',
                Sad: 'We’re here for you. A <a href="activities.html#journaling">Mindful Journaling</a> session might help you process your feelings, or try our <a href="music.html#calm">Calm Playlist</a> to soothe your mind.',
                Anxious: 'Let’s calm those nerves. Try a <a href="activities.html#breathing">Breathing Exercise</a> or listen to our <a href="music.html#relax">Relaxation Playlist</a> to ease your anxiety.',
                Angry: 'Let’s channel that energy. A <a href="activities.html#reframing">Cognitive Reframing</a> exercise can help shift your perspective, or try our <a href="music.html#energetic">Energetic Playlist</a> to release tension.',
                Tired: 'Time for a reset. A quick <a href="activities.html#meditation">Guided Meditation</a> can help you recharge, or relax with our <a href="music.html#sleep">Sleep Playlist</a>.'
            };

            recommendationText.innerHTML = `<h2>Recommendations for You</h2><p>${recommendations[mood]}</p>`;
        });
    });

    const savedMood = localStorage.getItem(moodKey);
    if (savedMood) {
        recommendationText.innerHTML = `<h2>Today's Mood: ${savedMood}</h2><p>Based on your logged mood, here are some suggestions: ${recommendations[savedMood]}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    adjustMainContentPadding();
    setupNavigation();
    setupDarkMode();
    setupBackToTop();
    setupMoodButtons();
    window.addEventListener('resize', adjustMainContentPadding);
});
