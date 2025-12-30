// --- VARIABLES ---
const envelope = document.getElementById('envelope');
const introScreen = document.getElementById('intro-screen');
const textContainer = document.getElementById('text-sequence-container');
const textElement = document.getElementById('sequence-text');
const gallery = document.getElementById('memory-gallery'); 
const mainContent = document.getElementById('main-content');
const finalCard = document.getElementById('final-card');
const music = document.getElementById('bg-music'); 
const continueBtn = document.getElementById('continue-btn'); 
const backToGalleryBtn = document.getElementById('back-to-gallery'); 
const spamLoveBtn = document.getElementById('spam-love-btn');
const spamLoveContainer = document.getElementById('spam-love-container');
const reasonBtn = document.getElementById('reason-btn');
const reasonText = document.getElementById('reason-text');
const moonTrigger = document.getElementById('moon-trigger');

const messages = ["Under this night sky...", "I just want to say...", "thank you for being with me", "thank you for your patience", "thank you for being the light", "in my darkest days", "I love you to the moon & back, Ayaa 🌙"];
const sequenceIcons = ["🌌", "✨", "🐻", "🤍", "🌟", "🌑", "💖"];
let currentIndex = 0;

// --- EVENT LISTENER ---
envelope.addEventListener('click', openEnvelope);

// 1. OPEN ENVELOPE
function openEnvelope() {
    envelope.classList.add('open');
    if(music) {
        music.currentTime = 0; music.volume = 0; 
        music.play().then(() => {
            let vol = 0; const targetVolume = 0.6; 
            const fadeInterval = setInterval(() => {
                if (vol < targetVolume) { vol += (targetVolume / 50); music.volume = Math.min(vol, targetVolume); } 
                else { clearInterval(fadeInterval); }
            }, 100);
        }).catch(e => console.log(e));
    }
    setTimeout(() => {
        introScreen.style.opacity = 0;
        setTimeout(() => {
            introScreen.style.display = 'none'; textContainer.style.display = 'flex';
            setTimeout(() => { textContainer.style.opacity = 1; playNextMessage(); }, 100);
        }, 1000); 
    }, 1500);
}

// 2. TEXT SEQUENCE
function playNextMessage() {
    if (currentIndex < messages.length) {
        const icon = sequenceIcons[currentIndex] || sequenceIcons[0];
        const text = messages[currentIndex];
        textElement.innerHTML = `<div class="seq-icon">${icon}</div><div class="seq-message">${text}</div>`;
        textElement.classList.remove('pop-in'); void textElement.offsetWidth; textElement.classList.add('pop-in');
        setTimeout(playNextMessage, 3500); currentIndex++;
    } else { finishSequence(); }
}

// 3. SHOW GALLERY (AUTO)
function finishSequence() {
    textContainer.style.opacity = 0;
    setTimeout(() => {
        textContainer.style.display = 'none';
        gallery.style.display = 'flex';
        setTimeout(() => { gallery.style.opacity = 1; }, 100);
    }, 1000);
}

// 4. GO TO FINAL CARD (PLUS FIREWORKS & FEATURES)
if (continueBtn) {
    continueBtn.addEventListener('click', () => {
        gallery.style.opacity = 0;
        setTimeout(() => {
            gallery.style.display = 'none';
            mainContent.style.display = 'flex';
            
            // Show Spam Love Button
            spamLoveContainer.style.display = 'block';

            // Fix GIF Reload
            const gifImage = document.querySelector('.photo-frame img');
            if (gifImage) { gifImage.src = 'icon.gif?t=' + new Date().getTime(); }
            
            setTimeout(() => {
                mainContent.style.opacity = 1;
                finalCard.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    finalCard.style.transition = 'transform 0.5s ease-out';
                    finalCard.style.transform = 'translateY(0)';
                }, 100);
                startNightConfetti();
                startFireworks(); // 🎆 START FIREWORKS 🎆
            }, 100);
        }, 500); 
    });
}

// 5. GO BACK TO GALLERY
if (backToGalleryBtn) {
    backToGalleryBtn.addEventListener('click', () => {
        mainContent.style.opacity = 0;
        spamLoveContainer.style.display = 'none'; // Hide Spam Love
        setTimeout(() => {
            mainContent.style.display = 'none';
            gallery.style.display = 'flex';
            setTimeout(() => { gallery.style.opacity = 1; }, 100);
        }, 500);
    });
}

// --- FEATURES ---

// 🎰 RANDOM REASON GENERATOR
const reasons = [
    "Because you feel like home 🏠", "Your smile heals me ✨", 
    "You are my favorite person 🤍", "Because you are strong 💪",
    "I love your laugh 😂", "Everything is better with you 🌟",
    "You understand me ❤️", "Just because... you are you 🥺"
];
if(reasonBtn) {
    reasonBtn.addEventListener('click', () => {
        const random = reasons[Math.floor(Math.random() * reasons.length)];
        reasonText.innerText = random;
        reasonText.style.animation = "none";
        void reasonText.offsetWidth; 
        reasonText.style.animation = "popIn 0.5s forwards";
    });
}

// ❤️ SPAM LOVE
if(spamLoveBtn) {
    spamLoveBtn.addEventListener('click', () => {
        const heart = document.createElement('div');
        heart.classList.add('flying-heart');
        heart.innerText = "❤️";
        heart.style.left = (Math.random() * 50 + 25) + "%"; 
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1500);
    });
}

// 🤫 HIDDEN MESSAGE
if(moonTrigger) {
    moonTrigger.addEventListener('click', () => {
        alert("🤫 Psst! You are my moon, my sun, and my stars. Love you! 💖");
    });
}

// 🎆 FIREWORKS LOGIC (SIMPLE JS)
function startFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];

    function createParticle(x, y) {
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: x, y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 100,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, index) => {
            p.x += p.vx; p.y += p.vy;
            p.life--;
            p.vy += 0.2; // Gravity
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, 3, 3);
            if (p.life <= 0) particles.splice(index, 1);
        });
        
        if (Math.random() < 0.05) { // Random launch
            createParticle(Math.random() * canvas.width, Math.random() * canvas.height / 2);
        }
        requestAnimationFrame(animate);
    }
    animate();
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