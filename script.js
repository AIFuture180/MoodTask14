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
                Happy: 'Keep the positivity flowing! Try our <a href="activities.html#gratitude">Gratitude Notes</a> or listen to our <a href="music.html#upbeat">Upbeat Playlist</a>.',
                Sad: 'We’re here for you. Try <a href="activities.html#journaling">Mindful Journaling</a> or our <a href="music.html#calm">Calm Playlist</a>.',
                Anxious: 'Let’s calm those nerves. Try a <a href="activities.html#breathing">Breathing Exercise</a> or our <a href="music.html#relax">Relaxation Playlist</a>.',
                Angry: 'Channel that energy with <a href="activities.html#reframing">Cognitive Reframing</a> or our <a href="music.html#energetic">Energetic Playlist</a>.',
                Tired: 'Time for a reset. Try a <a href="activities.html#meditation">Guided Meditation</a> or our <a href="music.html#sleep">Sleep Playlist</a>.'
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
function setupBlogPagination() {
    if (!window.location.pathname.includes('blog.html')) return;
    const posts = document.querySelectorAll('.post');
    const searchInput = document.getElementById('blogSearch');
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');
    const postsPerPage = 5;
    let currentPage = 1;
    let filteredPosts = Array.from(posts);

    function displayPosts() {
        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        posts.forEach(post => post.style.display = 'none');
        filteredPosts.slice(start, end).forEach(post => post.style.display = 'block');

        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPage.disabled = currentPage === 1;
        nextPage.disabled = currentPage === totalPages;
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        filteredPosts = Array.from(posts).filter(post =>
            post.textContent.toLowerCase().includes(query)
        );
        currentPage = 1;
        displayPosts();
    });

    prevPage.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPosts();
        }
    });

    nextPage.addEventListener('click', () => {
        if (currentPage < Math.ceil(filteredPosts.length / postsPerPage)) {
            currentPage++;
            displayPosts();
        }
    });

    displayPosts();
}

// Calendar.html Specific Scripts
function setupMoodCalendar() {
    if (!window.location.pathname.includes('calendar.html')) return;
    const calendar = document.getElementById('moodCalendar');
    const moodFilter = document.getElementById('moodFilter');
    const exportCSV = document.getElementById('exportCSV');
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
            emptyDay.className = ' time empty';
            calendar.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const mood = localStorage.getItem(`mood-${dateStr}`);
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            if (mood) dayDiv.classList.add(`mood-${mood.toLowerCase()}`);
            dayDiv.textContent = day;
            dayDiv.setAttribute('title', mood ? `Mood: ${mood}` : 'No mood logged');
            calendar.appendChild(dayDiv);
        }
    }

    moodFilter.addEventListener('change', () => {
        const filter = moodFilter.value.toLowerCase();
        const days = document.querySelectorAll('.day:not(.header):not(.empty)');
        days.forEach(day => {
            const mood = day.className.includes('mood-') ? day.className.split('mood-')[1] : '';
            day.style.display = filter && mood !== filter ? 'none' : 'block';
        });
    });

    exportCSV.addEventListener('click', () => {
        const moods = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('mood-')) {
                moods.push({ date: key.replace('mood-', ''), mood: localStorage.getItem(key) });
            }
        }
        const csv = 'Date,Mood\n' + moods.map(m => `${m.date},${m.mood}`).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mood-data.csv';
        a.click();
        URL.revokeObjectURL(url);
    });

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

// Music.html Specific Scripts
function setupMusicControls() {
    if (!window.location.pathname.includes('music.html')) return;
    const shuffleBtn = document.getElementById('shuffle');
    const loopBtn = document.getElementById('loop');
    const musicCards = document.querySelectorAll('.music-card iframe');
    const recentlyPlayedList = document.getElementById('recentlyPlayedList');
    let loop = false;

    shuffleBtn.addEventListener('click', () => {
        const cards = Array.from(musicCards);
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        const musicGrid = document.getElementById('musicGrid');
        musicGrid.innerHTML = '';
        cards.forEach(card => musicGrid.appendChild(card.parentElement));
    });

    loopBtn.addEventListener('click', () => {
        loop = !loop;
        loopBtn.textContent = loop ? 'Loop On' : 'Loop Off';
        musicCards.forEach(iframe => {
            const src = iframe.src;
            iframe.src = loop ? src.includes('loop') ? src : `${src}&loop=1` : src.replace('&loop=1', '');
        });
    });

    musicCards.forEach((iframe, index) => {
        iframe.addEventListener('load', () => {
            const title = iframe.parentElement.querySelector('h3').textContent;
            let recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
            recentlyPlayed = [title, ...recentlyPlayed.filter(t => t !== title)].slice(0, 5);
            localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
            recentlyPlayedList.innerHTML = recentlyPlayed.map(t => `<li>${t}</li>`).join('');
        });
    });

    const recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
    recentlyPlayedList.innerHTML = recentlyPlayed.map(t => `<li>${t}</li>`).join('');
}

// Activities.html Specific Scripts
function setupActivities() {
    if (!window.location.pathname.includes('activities.html')) return;
    const activityCards = document.querySelectorAll('.activity-card');
    const toggleSummaryBtn = document.getElementById('toggleSummary');
    const activitiesGrid = document.getElementById('activitiesGrid');
    const activitySummary = document.getElementById('activitySummary');
    const summaryText = document.getElementById('summaryText');
    const streakText = document.getElementById('streakText');

    function calculateStreak() {
        let streak = 0;
        const today = new Date('2025-04-27');
        const activities = JSON.parse(localStorage.getItem('activities') || '{}');
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            if (Object.keys(activities).includes(dateStr)) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    }

    function analyzeActivityTrends() {
        const activities = JSON.parse(localStorage.getItem('activities') || '{}');
        const activityCounts = {};
        Object.values(activities).forEach(day => {
            Object.keys(day).forEach(activity => {
                activityCounts[activity] = (activityCounts[activity] || 0) + day[activity];
            });
        });

        const total = Object.values(activityCounts).reduce((sum, count) => sum + count, 0);
        if (total === 0) {
            summaryText.textContent = 'No activities logged yet.';
        } else {
            const mostFrequent = Object.entries(activityCounts).sort((a, b) => b[1] - a[1])[0];
            summaryText.textContent = `You've completed ${total} activities. Your most frequent activity is ${mostFrequent[0]} (${mostFrequent[1]} times).`;
        }

        const streak = calculateStreak();
        streakText.textContent = `Streak: ${streak} days`;
    }

    toggleSummaryBtn.addEventListener('click', () => {
        activitiesGrid.classList.toggle('active');
        activitySummary.classList.toggle('active');
        toggleSummaryBtn.textContent = activitiesGrid.classList.contains('active') ? 'View Activity Insights' : 'Back to Activities';
        if (activitySummary.classList.contains('active')) {
            analyzeActivityTrends();
        }
    });

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
                    <p>Follow the timer for a 4-7-8 breathing exercise.</p>
                    <div id="breathingTimer">Inhale (4s)</div>
                    <button onclick="startBreathingTimer()">Start</button>
                    <button onclick="closePopup()">Close</button>
                `,
                journaling: `
                    <h3>Mindful Journaling</h3>
                    <textarea placeholder="Write your thoughts..."></textarea>
                    <button onclick="saveActivity('journaling')">Save</button>
                    <button onclick="closePopup()">Close</button>
                `,
                reframing: `
                    <h3>Cognitive Reframing</h3>
                    <p>Reframe a negative thought:</p>
                    <textarea placeholder="Negative thought..."></textarea>
                    <textarea placeholder="Positive reframe..."></textarea>
                    <button onclick="saveActivity('reframing')">Save</button>
                    <button onclick="closePopup()">Close</button>
                `,
                meditation: `
                    <h3>Guided Meditation</h3>
                    <p>Find a quiet space and follow this 5-minute meditation guide.</p>
                    <button onclick="saveActivity('meditation')">Complete</button>
                    <button onclick="closePopup()">Close</button>
                `,
                doodle: `
                    <h3>Doodle</h3>
                    <canvas id="doodleCanvas" width="400" height="300" style="border:1px solid #ccc;"></canvas>
                    <button onclick="saveActivity('doodle')">Save</button>
                    <button onclick="closePopup()">Close</button>
                `,
                dance: `
                    <h3>Dance Break</h3>
                    <p>Put on your favorite song and dance for 3 minutes!</p>
                    <button onclick="saveActivity('dance')">Complete</button>
                    <button onclick="closePopup()">Close</button>
                `,
                'color-focus': `
                    <h3>Color Focus</h3>
                    <p>Focus on this calming color for 1 minute:</p>
                    <div style="width:100%;height:100px;background:#6BCB77;"></div>
                    <button onclick="saveActivity('color-focus')">Complete</button>
                    <button onclick="closePopup()">Close</button>
                `,
                worry: `
                    <h3>Worry Shredder</h3>
                    <textarea placeholder="Write your worry..."></textarea>
                    <button onclick="shredWorry()">Shred</button>
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

            if (activity === 'doodle') {
                const canvas = document.getElementById('doodleCanvas');
                const ctx = canvas.getContext('2d');
                let drawing = false;

                canvas.addEventListener('mousedown', () => drawing = true);
                canvas.addEventListener('mouseup', () => drawing = false);
                canvas.addEventListener('mousemove', (e) => {
                    if (drawing) {
                        ctx.lineTo(e.offsetX, e.offsetY);
                        ctx.stroke();
                    } else {
                        ctx.beginPath();
                        ctx.moveTo(e.offsetX, e.offsetY);
                    }
                });
            }
        });
    });

    window.startBreathingTimer = function() {
        const timer = document.getElementById('breathingTimer');
        let step = 0;
        const steps = [
            { text: 'Inhale (4s)', duration: 4000 },
            { text: 'Hold (7s)', duration: 7000 },
            { text: 'Exhale (8s)', duration: 8000 }
        ];

        function nextStep() {
            if (step >= steps.length) {
                step = 0;
                saveActivity('breathing');
            }
            timer.textContent = steps[step].text;
            setTimeout(nextStep, steps[step].duration);
            step++;
        }

        nextStep();
    };

    window.shredWorry = function() {
        const textarea = document.querySelector('.activity-popup textarea');
        textarea.value = '';
        saveActivity('worry');
        alert('Your worry has been shredded!');
    };

    window.saveActivity = function(activity) {
        const today = new Date('2025-04-27').toISOString().split('T')[0];
        let activities = JSON.parse(localStorage.getItem('activities') || '{}');
        activities[today] = activities[today] || {};
        activities[today][activity] = (activities[today][activity] || 0) + 1;
        localStorage.setItem('activities', JSON.stringify(activities));
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
    setupNavigation();
    setupDarkMode();
    setupBackToTop();
    setupMoodButtons();
    setupBlogPagination();
    setupMoodCalendar();
    setupMusicControls();
    setupActivities();
    window.addEventListener('resize', adjustMainContentPadding);
});
