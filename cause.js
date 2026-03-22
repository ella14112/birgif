const reasons = [
    {
        text: "你像一轮月亮，把温柔、勇敢和细腻，都藏在光里",
        emoji: "🌙",
        gif: "gif1.gif"
    },
    {
        text: "不论你想去做什么，我都会站在你身后。一直相信支持你。",
        emoji: "🫂",
        gif: "gif2.gif"
    },
    {
        text: "音乐一直在把我们连接在一起。以后也想继续把喜欢的歌都分享给你。",
        emoji: "🎵",
        gif: "gif3.gif"
    },
    {
        text: "不论未来怎样，只是觉得，如果那里面有你，就已经很好了",
        emoji: "❤️",
        gif: "gif4.gif"
    }
];

let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
const endingText = document.querySelector('.ending-text');
const teddyHug = document.querySelector('.teddy-hug');
let isTransitioning = false;
let finalModeEnabled = false;

function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';

    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;

    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="memory gif">`;

    card.appendChild(text);
    card.appendChild(gifOverlay);

    gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.55,
        ease: "back.out(1.7)"
    });

    return card;
}

function enableFinalMode() {
    if (finalModeEnabled) return;
    finalModeEnabled = true;

    gsap.to(teddyHug, {
        scale: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.6)"
    });

    gsap.to(endingText, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.15
    });

    gsap.to(shuffleButton, {
        scale: 1.06,
        duration: 0.45,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
            shuffleButton.textContent = "进入我们的故事线 💫";
            shuffleButton.classList.add('story-mode');
        }
    });
}

function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);

        reasonCounter.textContent = `第 ${currentReasonIndex + 1} 句 / 共 ${reasons.length} 句`;
        currentReasonIndex++;

        if (currentReasonIndex === reasons.length) {
            enableFinalMode();
        }

        createFloatingElement();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
        return;
    }

    gsap.to('body', {
        opacity: 0,
        duration: 0.9,
        onComplete: () => {
            window.location.href = 'last.html';
        }
    });
}

shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.94,
        duration: 0.12,
        yoyo: true,
        repeat: 1
    });

    displayNewReason();
});

function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐', '🌙', '🎶'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 18 + 14) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -420,
        x: Math.random() * 60 - 30,
        duration: Math.random() * 6 + 8,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

const cursor = document.querySelector('.custom-cursor');
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 15,
            y: e.clientY - 15,
            duration: 0.18
        });
    });
}

setInterval(createFloatingElement, 2000);

window.addEventListener('load', () => {
    gsap.from('.container', {
        opacity: 0,
        y: 24,
        duration: 0.9
    });

    gsap.from('.intro-text', {
        opacity: 0,
        y: 16,
        duration: 0.8,
        delay: 0.2
    });
});