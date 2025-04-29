function adjustMainContentPadding() {
    const navBar = document.querySelector('.nav-bar');
    const mainContent = document.querySelector('.main-content');
    if (navBar && mainContent) {
        mainContent.style.paddingTop = `${navBar.offsetHeight + 10}px`;
    }
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
                Happy: 'Keep the positivity flowing! Try our <a href="activities.html#gratitude">Gratitude Notes</a> or listen to our <a href="music.html#upbeat">Upbeat Playlist</a>.',
                Sad: 'We’re here for you. Try <a href="activities.html#journaling">Mindful Journaling</a> or our <a href="music.html#calm">Calm Playlist</a>.',
                Anxious: 'Let’s calm those nerves. Try a <a href="activities.html#breathing">Breathing Exercise</a>.',
                Angry: 'Channel that energy with a <a href="activities.html#meditation">Guided Meditation</a>.',
                Tired: 'Time for a reset. Try a <a href="activities.html#meditation">Guided Meditation</a>.'
            };

            recommendationText.innerHTML = `<h2>Recommendations for You</h2><p>${recommendations[mood]}</p>`;
        });
    });

    const savedMood = localStorage.getItem(moodKey);
    if (savedMood) {
        recommendationText.innerHTML = `<h2>Today's Mood: ${savedMood}</h2><p>Based on your logged mood: ${recommendations[savedMood]}</p>`;
    }
}

// Blog.html Specific Scripts
function setupBlogSearch() {
    if (!window.location.pathname.includes('blog.html')) return;
    const posts = document.querySelectorAll('.post');
    const searchInput = document.getElementById('blogSearch');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        posts.forEach(post => {
            post.style.display = post.textContent.toLowerCase().includes(query) ? 'block' : 'none';
        });
    });
}

// Calendar.html Specific Scripts
function setupMoodCalendar() {
    if (!window.location.pathname.includes('calendar.html')) return;
    const calendar = document.getElementById('moodCalendar');
    const clearData = document.getElementById('clearData');

    function generateCalendar() {
        calendar.innerHTML = '';
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day header';
            dayHeader.textContent = day;
            calendar.appendChild(dayHeader);
        });

        const today = new Date('2025-04-27');
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day empty';
            calendar.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const mood = localStorage.getItem(`mood-${dateStr}`);
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            if (mood) dayDiv.classList.add(`mood-${mood.toLowerCase()}`);
            dayDiv.textContent = day;
            calendar.appendChild(dayDiv);
        }
    }

    clearData.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all mood data?')) {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('mood-')) localStorage.removeItem(key);
            });
            generateCalendar();
        }
    });

    generateCalendar();
}

// Activities.html Specific Scripts
function setupActivities() {
    if (!window.location.pathname.includes('activities.html')) return;
    const activityCards = document.querySelectorAll('.activity-card');

    activityCards.forEach(card => {
        card.addEventListener('click', () => {
            const activity = card.dataset.activity;
            const popup = document.createElement('div');
            popup.className = 'activity-popup';
            const overlay = document.createElement('div');
            overlay.className = 'popup-overlay';

            const content = {
                breathing: `
                    <h3>Breathing Exercise</h3>
                    <p>Follow this 4-7-8 breathing exercise: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.</p>
                    <button onclick="saveActivity('breathing')">Complete</button>
                    <button onclick="closePopup()">Close</button>
                `,
                journaling: `
                    <h3>Mindful Journaling</h3>
                    <textarea placeholder="Write your thoughts..."></textarea>
                    <button onclick="saveActivity('journaling')">Save</button>
                    <button onclick="closePopup()">Close</button>
                `,
                meditation: `
                    <h3>Guided Meditation</h3>
                    <p>Find a quiet space and focus on your breath for 5 minutes.</p>
                    <button onclick="saveActivity('meditation')">Complete</button>
                    <button onclick="closePopup()">Close</button>
                `,
                gratitude: `
                    <h3>Gratitude Note</h3>
                    <textarea placeholder="What are you grateful for?"></textarea>
                    <button onclick="saveActivity('gratitude')">Save</button>
                    <button onclick="closePopup()">Close</button>
                `
            };

            popup.innerHTML = content[activity];
            document.body.appendChild(overlay);
            document.body.appendChild(popup);
            popup.classList.add('active');
            overlay.classList.add('active');
        });
    });

    window.saveActivity = function(activity) {
        alert(`Activity "${activity}" completed!`);
        closePopup();
    };

    window.closePopup = function() {
        const popup = document.querySelector('.activity-popup');
        const overlay = document.querySelector('.popup-overlay');
        if (popup) popup.remove();
        if (overlay) overlay.remove();
    };
}

document.addEventListener('DOMContentLoaded', () => {
    adjustMainContentPadding();
    setupMoodButtons();
    setupBlogSearch();
    setupMoodCalendar();
    setupActivities();
    window.addEventListener('resize', adjustMainContentPadding);
});
