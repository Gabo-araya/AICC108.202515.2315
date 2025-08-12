// Cyber Effects JavaScript for Ethical Hacking Course
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation to cards when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = Math.random() * 0.3 + 's';
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all cards for animations
    document.querySelectorAll('.card-hover, .glass-card').forEach(card => {
        observer.observe(card);
    });

    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Matrix rain effect (optional, resource-intensive)
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-rain';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(10, 15, 35, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        // Only enable matrix effect on desktop for performance
        if (window.innerWidth > 1024) {
            setInterval(draw, 35);
        }
    }

    // Glitch effect for text elements
    function glitchText(element) {
        const originalText = element.textContent;
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        
        let iteration = 0;
        const maxIterations = 10;
        
        const glitch = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
                
            if (iteration >= originalText.length) {
                clearInterval(glitch);
                element.textContent = originalText;
            }
            
            iteration += 1 / 3;
        }, 50);
    }

    // Add cyber sound effects (optional)
    function playClickSound() {
        // Create a subtle click sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    // Add click sound to buttons
    document.querySelectorAll('.btn-gradient, .btn-outline-gradient').forEach(btn => {
        btn.addEventListener('click', playClickSound);
    });

    // Particle system for hero section
    function createParticleSystem() {
        const heroSection = document.querySelector('.hero-section');
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 1;
        `;
        
        heroSection.appendChild(particleContainer);
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #00d4ff;
                border-radius: 50%;
                opacity: 0;
                animation: particleFloat ${3 + Math.random() * 4}s linear infinite;
            `;
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 7000);
        }
        
        // Create particles periodically
        if (window.innerWidth > 768) {
            setInterval(createParticle, 500);
        }
    }
    
    // Add CSS animations for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) scale(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-10vh) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes animate-fade-in {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-fade-in {
            animation: animate-fade-in 0.8s ease-out forwards;
        }
        
        .particle {
            box-shadow: 0 0 6px #00d4ff, 0 0 12px #00d4ff;
        }
    `;
    document.head.appendChild(style);

    // Initialize effects
    createParticleSystem();
    
    // Console message for developers
    console.log('%c🔰 ETHICAL HACKING COURSE INITIALIZED 🔰', 
        'background: linear-gradient(45deg, #00d4ff, #39ff14); color: #000; font-size: 16px; padding: 10px; border-radius: 5px; font-weight: bold;');
    console.log('%cRemember: Use these techniques for defensive purposes only!', 
        'color: #ff6600; font-size: 14px; font-weight: bold;');
        
    // API Status indicator
    fetch('/api/course-info')
        .then(response => response.json())
        .then(data => {
            console.log('%c✅ API Connection Active', 'color: #39ff14; font-weight: bold;');
            console.log('Course Info:', data);
        })
        .catch(error => {
            console.log('%c❌ API Connection Failed', 'color: #ff6600; font-weight: bold;');
        });
});