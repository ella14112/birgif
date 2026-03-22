const cursor = document.querySelector('.cursor');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

const greetingText = "You will always be part of my tapestry";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 85);
    }
}

const floatingElements = ['💖', '✨', '🌸', '💫', '🦋', '🌙'];

function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.fontSize = (Math.random() * 18 + 18) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -420,
        x: Math.random() * 120 - 60,
        rotation: Math.random() * 180,
        duration: Math.random() * 4 + 5,
        opacity: 1,
        ease: "none",
        onComplete: () => element.remove()
    });
}

window.addEventListener('load', () => {
    gsap.to('h1', {
        opacity: 1,
        duration: 1,
        y: 16,
        ease: "power3.out"
    });

    gsap.to('.cta-button', {
        opacity: 1,
        duration: 1,
        y: -12,
        ease: "back.out(1.7)"
    });

    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3
    });

    gsap.from('.hero-badge', {
        opacity: 0,
        y: -12,
        duration: 0.8
    });

    typeGreeting();
    setInterval(createFloating, 1200);
});

document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.05,
            duration: 0.25
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.25
        });
    });

    button.addEventListener('click', () => {
        gsap.to('body', {
            opacity: 0,
            duration: 0.9,
            onComplete: () => {
                window.location.href = 'cause.html';
            }
        });
    });
});