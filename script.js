// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission is now handled by FormSubmit
// The form will be submitted to ohs@edgerunnersclub.com automatically

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe reference cards
const referenceCards = document.querySelectorAll('.reference-card');
referenceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe stat items
const statItems = document.querySelectorAll('.stat-item');
statItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Animated counter for stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.dataset.suffix || '');
        }
    }, 16);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const number = parseInt(text.replace(/\D/g, ''));
                
                stat.dataset.suffix = hasPlus ? '+' : hasPercent ? '%' : '';
                stat.textContent = '0' + stat.dataset.suffix;
                
                setTimeout(() => {
                    animateCounter(stat, number);
                }, 300);
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
});

// Add CSS class for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--text-primary);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

console.log('Edge Runners Club - Website initialized');

// Neural Network Animation
const canvas = document.getElementById('neuralNetwork');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    
    // Set canvas size
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class (Nodes)
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.2; // Reduced speed from 0.5 to 0.2
            this.vy = (Math.random() - 0.5) * 0.2; // Reduced speed from 0.5 to 0.2
            this.radius = 2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Keep within bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#000000';
            ctx.fill();
        }
    }
    
    // Edge Runner class (particles running along edges)
    class EdgeRunner {
        constructor(start, end, connectionList) {
            this.start = start;
            this.end = end;
            this.connectionList = connectionList;
            this.progress = Math.random(); // Random starting position
            this.speed = 0.008 + Math.random() * 0.008; // Slower speed
            this.radius = 3;
            this.lifetime = 0;
            this.maxLifetime = 200; // Will pick new path after this many frames
        }
        
        update() {
            this.progress += this.speed;
            this.lifetime++;
            
            if (this.progress >= 1) {
                this.progress = 0;
                this.lifetime = 0;
                
                // Find a new valid connection from current end point
                const validConnections = this.connectionList.filter(conn => 
                    (conn[0] === this.end || conn[1] === this.end)
                );
                
                if (validConnections.length > 0) {
                    const newConnection = validConnections[Math.floor(Math.random() * validConnections.length)];
                    this.start = this.end;
                    this.end = newConnection[0] === this.start ? newConnection[1] : newConnection[0];
                } else {
                    // No valid connection, reverse direction
                    const temp = this.start;
                    this.start = this.end;
                    this.end = temp;
                }
            }
        }
        
        isValid() {
            // Check if both start and end points still exist
            return particles.includes(this.start) && particles.includes(this.end);
        }
        
        draw() {
            if (!this.isValid()) return;
            
            const x = this.start.x + (this.end.x - this.start.x) * this.progress;
            const y = this.start.y + (this.end.y - this.start.y) * this.progress;
            
            ctx.beginPath();
            ctx.arc(x, y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#000000';
            ctx.fill();
            
            // Glow effect
            ctx.beginPath();
            ctx.arc(x, y, this.radius + 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fill();
        }
    }
    
    let edgeRunners = [];
    
    // Create particles
    function initParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Draw connections between nearby particles and create edge runners
    function drawConnections() {
        const maxDistance = 120;
        const activeConnections = [];
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.3;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    
                    activeConnections.push([particles[i], particles[j]]);
                }
            }
        }
        
        // Create edge runners if needed (only 3 at a time for less clutter)
        if (edgeRunners.length < 3 && activeConnections.length > 0 && Math.random() < 0.02) {
            const randomConnection = activeConnections[Math.floor(Math.random() * activeConnections.length)];
            edgeRunners.push(new EdgeRunner(randomConnection[0], randomConnection[1], activeConnections));
        }
        
        // Update connection list for existing runners
        edgeRunners.forEach(runner => {
            runner.connectionList = activeConnections;
        });
        
        // Clean up invalid runners
        edgeRunners = edgeRunners.filter(runner => runner.isValid());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections first (behind particles)
        drawConnections();
        
        // Update and draw particles (nodes)
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Update and draw edge runners
        edgeRunners.forEach(runner => {
            runner.update();
            runner.draw();
        });
        
        animationFrameId = requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    initParticles();
    animate();
    
    // Pause animation when not visible (performance optimization)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate();
            } else {
                cancelAnimationFrame(animationFrameId);
            }
        });
    });
    
    observer.observe(canvas);
}
