// --- MESSAGE DATA ---
const messages = [
    "Under this night sky...",
    "I just want to say...",
    "thank you for being with me",
    "thank you for your patience",
    "thank you for being the light",
    "in my darkest days",
    "I love you to the moon & back, Ayaa 🌙"
];

const sequenceIcons = ["🌌", "✨", "🐻", "🤍", "🌟", "🌑", "💖"];

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

// --- LOGIKA UTAMA ---
function openEnvelope() {
    envelope.classList.add('open');

    // 🎵 MUSIK (02:55 Start + 5s Fade In) 🎵
    if(music) {
        music.currentTime = 175; 
        music.volume = 0; 
        
        music.play().then(() => {
            let vol = 0;
            const targetVolume = 0.6; 
            const fadeDuration = 5000; 
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
            console.log("Music prevented:", error);
        });
    }

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

        textElement.innerHTML = `<div class="seq-icon">${icon}</div><div class="seq-message">${text}</div>`;
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
        
        // --- FIX GIF RELOAD (HP FREEZE FIX) ---
        const gifImage = document.querySelector('.photo-frame img');
        if (gifImage) {
            gifImage.src = 'icon.gif?t=' + new Date().getTime();
        }
        
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

// --- LOGIKA GALERI INTERAKTIF ---
const galleryBtn = document.getElementById('gallery-btn');
const gallery = document.getElementById('memory-gallery');
const closeGalleryBtn = document.getElementById('close-gallery');

if (galleryBtn) {
    galleryBtn.addEventListener('click', () => {
        gallery.style.display = 'flex';
        setTimeout(() => { gallery.style.opacity = 1; }, 50);
    });
}
if (closeGalleryBtn) {
    closeGalleryBtn.addEventListener('click', () => {
        gallery.style.opacity = 0;
        setTimeout(() => { gallery.style.display = 'none'; }, 500);
    });
}