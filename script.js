// --- MESSAGE DATA (ENGLISH) ---
const messages = [
    "Under this night sky...",
    "I just want to say...",
    "thank you for being with me",
    "thank you for your patience",
    "thank you for being the light",
    "in my darkest days",
    "I love you to the moon & back, Ayaa 🌙"
];

// --- ICONS FOR SEQUENCE ---
const sequenceIcons = [
    "🌌", 
    "✨", 
    "🐻", 
    "🤍", 
    "🌟", 
    "🌑", 
    "💖" 
];

// --- VARIABLES ---
const envelope = document.getElementById('envelope');
const introScreen = document.getElementById('intro-screen');
const textContainer = document.getElementById('text-sequence-container');
const textElement = document.getElementById('sequence-text');
const mainContent = document.getElementById('main-content');
const finalCard = document.getElementById('final-card');
const music = document.getElementById('bg-music'); 

let currentIndex = 0;

// --- EVENT LISTENER ---
envelope.addEventListener('click', openEnvelope);

// --- FUNCTIONALITY ---

function openEnvelope() {
    envelope.classList.add('open');

    // 🎵 MUSIC LOGIC: Start 02:55 + Fade In 5s 🎵
    if(music) {
        music.currentTime = 175; // 2 menit 55 detik = 175 detik
        music.volume = 0; // Mulai dari volume 0 (mute)
        
        music.play().then(() => {
            // Logika Fade In
            let vol = 0;
            const targetVolume = 0.6; // Volume target (60%)
            const fadeDuration = 5000; // 5 Detik
            const intervalTime = 100; 
            const step = targetVolume / (fadeDuration / intervalTime);

            const fadeInterval = setInterval(() => {
                if (vol < targetVolume) {
                    vol += step;
                    music.volume = Math.min(vol, targetVolume); 
                } else {
                    clearInterval(fadeInterval); 
                }
            }, intervalTime);
            
        }).catch(error => {
            console.log("Music play prevented by browser:", error);
        });
    }

    // Sequence Animasi Visual
    setTimeout(() => {
        introScreen.style.opacity = 0;
        
        setTimeout(() => {
            introScreen.style.display = 'none';
            textContainer.style.display = 'flex';
            
            setTimeout(() => {
                textContainer.style.opacity = 1;
                playNextMessage(); 
            }, 100);

        }, 1000); 

    }, 1500);
}

function playNextMessage() {
    if (currentIndex < messages.length) {
        const icon = sequenceIcons[currentIndex] || sequenceIcons[0];
        const text = messages[currentIndex];

        // Masukkan HTML (Ikon + Teks)
        textElement.innerHTML = `
            <div class="seq-icon">${icon}</div>
            <div class="seq-message">${text}</div>
        `;
        
        // Reset Animasi
        textElement.classList.remove('pop-in');
        void textElement.offsetWidth; 
        textElement.classList.add('pop-in');

        setTimeout(playNextMessage, 3500); 
        currentIndex++;
    } else {
        finishSequence();
    }
}

function finishSequence() {
    textContainer.style.opacity = 0;

    setTimeout(() => {
        textContainer.style.display = 'none';
        mainContent.style.display = 'flex';
        
        setTimeout(() => {
            mainContent.style.opacity = 1;
            
            finalCard.style.transform = 'translateY(20px)';
            setTimeout(() => {
                finalCard.style.transition = 'transform 0.5s ease-out';
                finalCard.style.transform = 'translateY(0)';
            }, 100);

            startNightConfetti();
        }, 100);
    }, 1000);
}

function startNightConfetti() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        const emojis = ['✨', '🌙', '💜', '🌃', '🌠', '🤍']; 
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 20 + 15 + "px";
        heart.style.animationDuration = Math.random() * 3 + 3 + "s"; 
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }, 400);
}