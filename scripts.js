/**
 * IKANTIK Agency - Premium Interactive Scripts
 * Handles:
 * 1. 3D Character Splitting and Hover-Spin mechanics (GPU-Accelerated)
 * 2. Gentle infinite character breathing/rotation
 * 3. Mouse-tracking ambient background glow positioning
 * 4. Magnetic UI micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Interactive Letter Spinning
    initLetterSpinning();

    // 2. Initialize Interactive Background Mouse Tracking Glows
    initMouseTrackingGlows();

    // 3. Initialize Magnetic Button/Card micro-interactions
    initMagneticElements();

    // 4. Initialize Scroll Progress Bar
    initScrollProgress();

    // 5. Initialize robust Intersection Observer Scroll-Reveal
    initScrollReveal();

    // 6. Initialize premium 3D Card Tilt Hover Perspective effects
    initCardTilt();

    // 7. Initialize Heavy Physics Canvas for Cosmic Growth Core
    initGrowthCoreCanvas();
    
    // 8. Initialize Contact Page Networking Canvas
    initContactNetworkCanvas();
    
    // 9. Initialize WhatsApp Chat Widget
    initWhatsAppWidget();
    
    // 10. Initialize Holographic Boot Sequence
    initHolographicBootSequence();

});

/**
 * Splits text of elements with the '.spin-letters' class into separate <span> characters
 * which animate on hover and load with staggered transition delays.
 */
function initLetterSpinning() {
    const elements = document.querySelectorAll('.spin-letters');
    
    elements.forEach(element => {
        // Skip if already processed or marked
        if (element.classList.contains('spin-letters-done')) return;
        element.classList.add('spin-letters-done');

        let elementCharCounter = 0;

        function recurse(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                // If it is just whitespace (e.g. spacing between elements), ignore
                if (!text.trim()) return;

                const fragment = document.createDocumentFragment();
                // Normalize multiple spaces and preserve spacing
                const normalized = text.replace(/\s+/g, ' ');
                const parts = normalized.split(/(\s+)/);

                parts.forEach(part => {
                    if (!part) return;
                    if (/^\s+$/.test(part)) {
                        // Whitespace
                        const spaceSpan = document.createElement('span');
                        spaceSpan.innerHTML = '&nbsp;';
                        spaceSpan.style.display = 'inline-block';
                        fragment.appendChild(spaceSpan);
                    } else {
                        // Word wrapper to prevent word wrapping mid-word
                        const wordSpan = document.createElement('span');
                        wordSpan.style.display = 'inline-block';
                        wordSpan.style.whiteSpace = 'nowrap';
                        
                        const chars = [...part];
                        chars.forEach((char) => {
                            const charSpan = document.createElement('span');
                            charSpan.innerText = char;
                            charSpan.classList.add('spin-char');
                            
                            const globalIdx = elementCharCounter++;
                            charSpan.style.transitionDelay = `${globalIdx * 20}ms`;
                            
                            // Add subtle continuous floating/breathing to occasional characters
                            if (globalIdx % 8 === 2) {
                                charSpan.classList.add('gentle-spin-char');
                                charSpan.style.animationDelay = `${globalIdx * 100}ms`;
                            }
                            
                            wordSpan.appendChild(charSpan);
                        });
                        fragment.appendChild(wordSpan);
                    }
                });

                node.parentNode.replaceChild(fragment, node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Ignore already processed characters
                if (node.classList.contains('spin-char') || node.classList.contains('gentle-spin-char')) return;
                
                // Recurse through all child nodes
                const children = Array.from(node.childNodes);
                children.forEach(child => recurse(child));
            }
        }

        recurse(element);
    });
}

/**
 * Tracks mouse movement to dynamically position ambient background glow blobs.
 * Gives a premium dark-cyberpunk feel.
 */
function initMouseTrackingGlows() {
    const container = document.querySelector('body');
    if (!container) return;

    // Create interactive glow element if it doesn't exist
    let interactiveGlow = document.querySelector('.interactive-mouse-glow');
    if (!interactiveGlow) {
        interactiveGlow = document.createElement('div');
        interactiveGlow.className = 'interactive-mouse-glow pointer-events-none fixed -z-10 rounded-full blur-[130px] opacity-25';
        interactiveGlow.style.width = '400px';
        interactiveGlow.style.height = '400px';
        interactiveGlow.style.background = 'radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%)';
        interactiveGlow.style.transform = 'translate(-50%, -50%)';
        interactiveGlow.style.left = '-1000px'; // Off-screen initially
        interactiveGlow.style.top = '-1000px';
        interactiveGlow.style.transition = 'opacity 0.5s ease';
        container.appendChild(interactiveGlow);
    }

    // Update glow position on mouse move
    window.addEventListener('mousemove', (e) => {
        // Only run on desktop screen sizes for performance and UI compatibility
        if (window.innerWidth > 1024) {
            interactiveGlow.style.left = `${e.clientX}px`;
            interactiveGlow.style.top = `${e.clientY}px`;
            interactiveGlow.style.opacity = '0.25';
        }
    });

    window.addEventListener('mouseout', () => {
        interactiveGlow.style.opacity = '0';
    });
}

/**
 * Magnetic element effect. Elements with '.magnetic' class attract slightly
 * to the cursor when hovered. Very premium/pro UI pattern.
 */
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const pos = this.getBoundingClientRect();
            const x = e.clientX - pos.left - pos.width / 2;
            const y = e.clientY - pos.top - pos.height / 2;
            
            // Shift element 30% towards the mouse position
            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            this.style.transition = 'transform 0.1s ease-out';
        });
        
        el.addEventListener('mouseleave', function() {
            // Smoothly snap back to original position
            this.style.transform = 'translate(0px, 0px)';
            this.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
}

/**
/**
 * Dynamically builds and tracks the scroll progress bar
 * across all premium agency sub-pages.
 */
function initScrollProgress() {
    const body = document.body;
    if (!body) return;

    // Inject Scroll Progress element if not already present
    let progressBar = document.querySelector('.progress-bar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        body.appendChild(progressBar);
    }

    // Scroll progress tracking
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                if (height > 0) {
                    const scrolled = (winScroll / height) * 100;
                    progressBar.style.width = `${scrolled}%`;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Highly-optimized GPU Scroll-Reveal engine using native Intersection Observer.
 * Elegantly reveals elements as they enter the viewport with premium animations.
 */
function initScrollReveal() {
    const revealTargets = document.querySelectorAll('.reveal-on-scroll');
    if (!revealTargets.length) return;

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -10% 0px', // slight negative bottom margin so reveal triggers when card is comfortably in viewport
        threshold: 0.05 // trigger as soon as 5% of card is visible
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                // Once revealed, add the class
                entry.target.classList.add('revealed');
                
                // Trigger dynamic counting animations for stats inside this card
                animateCounters(entry.target);
                
                obs.unobserve(entry.target); // Unobserve to release resources
            }
        });
    }, observerOptions);

    revealTargets.forEach(target => {
        observer.observe(target);
    });
}
/**
 * High-end 3D Perspective card hover tilt effect.
 * Attracts cards slightly to the mouse and tilts in 3D perspective relative to the cursor!
 */
function initCardTilt() {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            // Only active on desktop sizes for optimal performance and comfort
            if (window.innerWidth <= 1024) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // X inside card
            const y = e.clientY - rect.top;  // Y inside card
            
            // Normalized coordinate values from -0.5 to 0.5
            const xc = (x / rect.width) - 0.5;
            const yc = (y / rect.height) - 0.5;
            
            const maxRotate = 8; // Max tilt rotation in degrees
            
            // Rotate X is driven by vertical offset (inverted)
            // Rotate Y is driven by horizontal offset
            const rotateX = -yc * maxRotate;
            const rotateY = xc * maxRotate;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.015)`;
            card.style.transition = 'transform 0.05s ease-out';
        });
        
        card.addEventListener('mouseleave', () => {
            // Smooth elastic snap back to base state
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
            card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });
}

/**
 * Parses and animates numeric stat metrics when the cards reveal on scroll.
 * E.g., extracts "+450%" -> counts from 0 to 450 with ease-out, preserving copywriting exactly.
 */
function animateCounters(card) {
    const counters = card.querySelectorAll('.stat-counter');
    counters.forEach(counter => {
        const text = counter.innerText.trim();
        
        // Matches number formats with optional prefix and suffix: e.g. "+450%", "500k+", "8.5%", "$1.2M", "#1"
        const match = text.match(/^([^\d\.]*)([\d\.]+)([^\d\.]*)$/);
        if (!match) return;
        
        const prefix = match[1] || '';
        const rawNum = parseFloat(match[2]);
        const suffix = match[3] || '';
        const isDecimal = match[2].includes('.');
        const decimals = isDecimal ? match[2].split('.')[1].length : 0;
        
        let startTimestamp = null;
        const duration = 1600; // Count-up over 1.6s
        
        function step(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Premium cubic ease-out
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * rawNum;
            
            counter.innerText = `${prefix}${currentVal.toFixed(decimals)}${suffix}`;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Pin to exactly the original copywriting text to avoid formatting mismatches
                counter.innerText = text;
            }
        }
        
        window.requestAnimationFrame(step);
    });
}

/**
 * Initializes the Heavy HTML5 Canvas Particle Physics Engine for the Growth Core.
 */
function initGrowthCoreCanvas() {
    const canvas = document.getElementById('growth-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    
    let particles = [];
    const colors = ['#ff2e93', '#00f2fe', '#ff6a00']; // Fuchsia, Cyan, Orange
    const numParticles = 120;
    const connectionDistance = 140;
    
    let mouse = { x: null, y: null, radius: 200 };
    
    function resize() {
        width = canvas.parentElement.clientWidth;
        height = canvas.parentElement.clientHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    
    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.baseRadius = Math.random() * 2 + 1;
            this.radius = this.baseRadius;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            // Screen boundaries
            if (this.x > width || this.x < 0) this.vx = -this.vx;
            if (this.y > height || this.y < 0) this.vy = -this.vy;
            
            this.x += this.vx;
            this.y += this.vy;
            
            // Mouse Repel Physics
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    const repelStrength = 4;
                    
                    this.x -= forceDirectionX * force * repelStrength;
                    this.y -= forceDirectionY * force * repelStrength;
                    this.radius = this.baseRadius * 2; // glow up on hover
                } else {
                    this.radius = this.baseRadius;
                }
            } else {
                this.radius = this.baseRadius;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    function init() {
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Draw connections
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * (1 - distance/connectionDistance)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}

/**
 * Initializes the Interactive Network Canvas for the Contact Page.
 */
function initContactNetworkCanvas() {
    const canvas = document.getElementById('contact-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    
    let particles = [];
    const colors = ['#00f2fe', '#b4b6d4']; // Cyan and Slate
    const numParticles = 80;
    const connectionDistance = 150;
    
    let mouse = { x: null, y: null, radius: 200 };
    
    function resize() {
        width = canvas.parentElement.clientWidth;
        height = canvas.parentElement.clientHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    
    canvas.parentElement.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.radius = Math.random() * 2 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Screen boundaries
            if (this.x > width || this.x < 0) this.vx = -this.vx;
            if (this.y > height || this.y < 0) this.vy = -this.vy;
            
            // Magnetic attraction to mouse (Swarm effect)
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    
                    this.vx += forceDirectionX * force * 0.1;
                    this.vy += forceDirectionY * force * 0.1;
                }
            }
            
            // Friction and limits to prevent chaos
            this.vx *= 0.99;
            this.vy *= 0.99;
            if(this.vx > 3) this.vx = 3;
            if(this.vx < -3) this.vx = -3;
            if(this.vy > 3) this.vy = 3;
            if(this.vy < -3) this.vy = -3;
            
            // Base movement if completely stopped
            if(Math.abs(this.vx) < 0.1) this.vx += (Math.random() - 0.5) * 0.5;
            if(Math.abs(this.vy) < 0.1) this.vy += (Math.random() - 0.5) * 0.5;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    function init() {
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 242, 254, ${0.4 * (1 - distance/connectionDistance)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}

/**
 * ============================================
 * ULTRA-PREMIUM CINEMATIC PRELOADER ENGINE v2.0
 * ============================================
 * Features:
 * - Canvas Particle Vortex Wormhole
 * - Hex Code Rain Matrix
 * - Audio Visualizer Bars
 * - Sacred Geometry SVG Draw-In
 * - Typewriter Tagline
 * - Staggered Cinematic Element Reveals
 * - Fake Live System Metrics
 * - Electric Spark Progress
 * - Dramatic Zoom-Blur Exit
 */
function initHolographicBootSequence() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    if (sessionStorage.getItem('preloader_shown') === 'true') {
        preloader.remove();
        return;
    }

    const visualizer = document.getElementById('preloader-visualizer');
    const logo = document.getElementById('preloader-logo');
    const progressWrap = document.getElementById('preloader-progress-wrap');
    const sacredGeo = document.getElementById('sacred-geometry');
    const tagline = document.getElementById('preloader-tagline');
    const hexContainer = document.getElementById('hex-rain-container');
    
    // Restore missing variables for boot sequence
    const statusText = document.getElementById('boot-status');
    const progressBar = document.getElementById('boot-bar');
    const spark = document.getElementById('boot-spark');
    const progressText = document.getElementById('boot-progress');
    const metric1 = document.getElementById('boot-metric-1');
    const metric2 = document.getElementById('boot-metric-2');
    const metric3 = document.getElementById('boot-metric-3');

    // ============ 1. PARTICLE VORTEX CANVAS ============
    const vortexCanvas = document.getElementById('preloader-vortex-canvas');
    if (vortexCanvas) {
        const ctx = vortexCanvas.getContext('2d');
        let vW, vH;
        const vortexParticles = [];
        const numVortex = 200;
        const colors = ['#ff2e93', '#00f2fe', '#ff6a00', '#ffffff'];
        let vortexActive = true;

        function resizeVortex() {
            vW = vortexCanvas.width = window.innerWidth;
            vH = vortexCanvas.height = window.innerHeight;
        }
        resizeVortex();
        window.addEventListener('resize', resizeVortex);

        class VortexParticle {
            constructor() {
                this.reset();
            }
            reset() {
                // Start from random edge positions
                const side = Math.floor(Math.random() * 4);
                switch(side) {
                    case 0: this.x = Math.random() * vW; this.y = -10; break;
                    case 1: this.x = vW + 10; this.y = Math.random() * vH; break;
                    case 2: this.x = Math.random() * vW; this.y = vH + 10; break;
                    case 3: this.x = -10; this.y = Math.random() * vH; break;
                }
                this.size = Math.random() * 2 + 0.5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speed = Math.random() * 2 + 1;
                this.angle = Math.atan2(vH/2 - this.y, vW/2 - this.x);
                this.vx = Math.cos(this.angle) * this.speed;
                this.vy = Math.sin(this.angle) * this.speed;
                this.life = 1;
                this.decay = Math.random() * 0.005 + 0.002;
                this.spiralStrength = (Math.random() - 0.5) * 0.08;
            }
            update() {
                // Spiral towards center
                const dx = vW/2 - this.x;
                const dy = vH/2 - this.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                // Add spiral rotation
                const angle = Math.atan2(dy, dx);
                const spiralAngle = angle + Math.PI/2 * this.spiralStrength * (300 / (dist + 50));
                
                this.vx += Math.cos(spiralAngle) * 0.15;
                this.vy += Math.sin(spiralAngle) * 0.15;
                
                // Dampen
                this.vx *= 0.98;
                this.vy *= 0.98;
                
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;

                // Reset when too close to center or dead
                if (dist < 15 || this.life <= 0) {
                    this.reset();
                }
            }
            draw(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.life * 0.6;
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0;
            }
        }

        // Initialize particles
        for (let i = 0; i < numVortex; i++) {
            vortexParticles.push(new VortexParticle());
        }

        function animateVortex() {
            if (!vortexActive) return;
            ctx.fillStyle = 'rgba(2, 1, 8, 0.15)';
            ctx.fillRect(0, 0, vW, vH);

            // Draw connection lines for close particles
            for (let i = 0; i < vortexParticles.length; i++) {
                vortexParticles[i].update();
                vortexParticles[i].draw(ctx);

                // Connect nearby particles
                for (let j = i + 1; j < vortexParticles.length; j++) {
                    const dx = vortexParticles[i].x - vortexParticles[j].x;
                    const dy = vortexParticles[i].y - vortexParticles[j].y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 80) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist/80)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(vortexParticles[i].x, vortexParticles[i].y);
                        ctx.lineTo(vortexParticles[j].x, vortexParticles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Center glow
            const gradient = ctx.createRadialGradient(vW/2, vH/2, 0, vW/2, vH/2, 60);
            gradient.addColorStop(0, 'rgba(0, 242, 254, 0.15)');
            gradient.addColorStop(0.5, 'rgba(255, 46, 147, 0.05)');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(vW/2 - 60, vH/2 - 60, 120, 120);

            requestAnimationFrame(animateVortex);
        }
        animateVortex();

        // Store cleanup reference
        preloader._cleanupVortex = () => { vortexActive = false; };
    }

    // ============ 2. HEX CODE RAIN ============
    if (hexContainer) {
        const hexChars = '0123456789ABCDEF';
        const numColumns = Math.floor(window.innerWidth / 40);
        
        for (let i = 0; i < numColumns; i++) {
            const col = document.createElement('div');
            col.className = 'hex-rain-column';
            col.style.left = `${(i / numColumns) * 100}%`;
            col.style.animationDuration = `${Math.random() * 8 + 6}s`;
            col.style.animationDelay = `${Math.random() * 5}s`;
            col.style.opacity = Math.random() * 0.4 + 0.1;
            
            // Generate random hex string
            let hexStr = '';
            const len = Math.floor(Math.random() * 20 + 10);
            for (let j = 0; j < len; j++) {
                hexStr += hexChars[Math.floor(Math.random() * hexChars.length)];
                if (j % 2 === 1 && j < len - 1) hexStr += ' ';
            }
            col.textContent = hexStr;
            hexContainer.appendChild(col);
        }
    }

    // ============ 3. AUDIO VISUALIZER BARS ============
    if (visualizer) {
        const numBars = 28;
        for (let i = 0; i < numBars; i++) {
            const bar = document.createElement('div');
            bar.className = 'visualizer-bar';
            const h = Math.random() * 50 + 10;
            bar.style.height = `${h}px`;
            bar.style.setProperty('--duration', `${Math.random() * 0.5 + 0.3}s`);
            bar.style.animationDelay = `${i * 0.05}s`;
            visualizer.appendChild(bar);
        }
    }

    // ============ 4. STAGGERED REVEAL SEQUENCE ============
    const revealSequence = [
        { el: visualizer, delay: 200 },
        { el: sacredGeo, delay: 400 },
        { el: logo, delay: 800 },
        { el: progressWrap, delay: 1100 },
        { el: document.getElementById('corner-tl'), delay: 300 },
        { el: document.getElementById('corner-tr'), delay: 400 },
        { el: document.getElementById('corner-bl'), delay: 500 },
        { el: document.getElementById('corner-br'), delay: 600 },
    ];

    revealSequence.forEach(item => {
        if (item.el) {
            setTimeout(() => {
                item.el.classList.add('preloader-fade-in');
                item.el.style.opacity = '1';
            }, item.delay);
        }
    });

    // ============ 5. SACRED GEOMETRY SVG DRAW-IN ============
    if (sacredGeo) {
        setTimeout(() => {
            sacredGeo.style.opacity = '1';
            const shapes = sacredGeo.querySelectorAll('.sacred-shape');
            shapes.forEach((shape, i) => {
                setTimeout(() => {
                    shape.style.strokeDashoffset = '0';
                }, i * 300);
            });
        }, 500);
    }

    // ============ 6. TYPEWRITER TAGLINE ============
    if (tagline) {
        const tagText = 'DIGITAL MARKETING AGENCY';
        let charIdx = 0;
        setTimeout(() => {
            const typeInterval = setInterval(() => {
                charIdx++;
                tagline.textContent = tagText.substring(0, charIdx);
                if (charIdx >= tagText.length) {
                    clearInterval(typeInterval);
                }
            }, 60);
        }, 1200);
    }

    // ============ 7. BOOT MESSAGES & PROGRESS ============
    const messages = [
        "[ESTABLISHING QUANTUM LINK]",
        "[DECRYPTING NEURAL PROTOCOLS]",
        "[CALIBRATING GROWTH ENGINE]",
        "[SYNCING CREATIVE MATRIX]",
        "[LOADING BRAND ARCHITECTURE]",
        "[RENDERING VISUAL CORTEX]",
        "[OPTIMIZING PIXEL DENSITY]",
        "[ACCESS GRANTED]"
    ];
    
    let currentMsg = 0;
    const textInterval = setInterval(() => {
        if (currentMsg < messages.length && statusText) {
            statusText.textContent = messages[currentMsg];
            // Flicker effect
            statusText.style.opacity = '0.3';
            setTimeout(() => { if(statusText) statusText.style.opacity = '1'; }, 80);
            currentMsg++;
        }
    }, 300);

    // Progress with electric spark
    let progress = 0;
    let packetCount = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 8 + 2;
        if (progress > 100) progress = 100;
        packetCount += Math.floor(Math.random() * 200 + 50);

        if (progressBar) progressBar.style.width = `${progress}%`;
        if (spark) spark.style.left = `${progress}%`;
        if (progressText) progressText.textContent = `${Math.floor(progress)}%`;
        
        // Live metrics
        if (metric1) metric1.textContent = `PACKETS: ${packetCount.toLocaleString()}`;
        if (metric2) metric2.textContent = `LATENCY: ${Math.floor(Math.random() * 15 + 2)}ms`;
        if (metric3) metric3.textContent = `NODES: ${Math.min(Math.floor(progress * 1.28), 128)}/128`;

        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 120);

    // ============ 8. CINEMATIC EXIT ============
    const minBootTime = new Promise(resolve => setTimeout(resolve, 2200));
    const windowLoaded = new Promise(resolve => {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            window.addEventListener('load', resolve);
        }
    });

    Promise.all([minBootTime, windowLoaded]).then(() => {
        clearInterval(textInterval);
        
        if (statusText) {
            statusText.textContent = "[SYSTEM ONLINE]";
            statusText.style.color = 'rgba(0, 242, 254, 0.9)';
            statusText.style.textShadow = '0 0 10px rgba(0, 242, 254, 0.5)';
        }
        if (progressBar) progressBar.style.width = "100%";
        if (spark) spark.style.left = "100%";
        if (progressText) {
            progressText.textContent = "100%";
            progressText.style.color = 'rgba(0, 242, 254, 1)';
        }

        // Flash effect before exit
        setTimeout(() => {
            // Brief white flash
            const flash = document.createElement('div');
            flash.style.cssText = 'position:fixed;inset:0;background:rgba(0,242,254,0.08);z-index:999999;pointer-events:none;';
            flash.style.animation = 'preloaderFadeInUp 0.3s ease forwards reverse';
            if (preloader) preloader.appendChild(flash);
            
            setTimeout(() => {
                // Cinematic zoom-blur exit
                if (preloader) {
                    preloader.classList.add('preloader-hidden');
                    
                    // Mark as shown when preloader begins fading out
                    sessionStorage.setItem('preloader_shown', 'true');
                }
                
                // Cleanup
                if (preloader && preloader._cleanupVortex) preloader._cleanupVortex();
                
                setTimeout(() => {
                    if (preloader) preloader.remove();
                }, 1200);
            }, 400);
        }, 500);
    });
}

/**
 * Initializes the premium WhatsApp Chat Widget in the bottom-right corner.
 */
function initWhatsAppWidget() {
    // Prevent double injection if scripts load twice
    if (document.querySelector('.wa-widget-container')) return;

    const WHATSAPP_NUMBER = "918849178176";
    const DEFAULT_MESSAGE = "Hello! I would like to get a free growth audit for my brand.";

    // 1. Build and inject trigger container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'wa-widget-container';

    const pillBtn = document.createElement('div');
    pillBtn.className = 'wa-pill-btn';
    pillBtn.innerHTML = `
        <span class="wa-green-dot"></span>
        <span>Chat on WhatsApp</span>
    `;

    const circleBtn = document.createElement('div');
    circleBtn.className = 'wa-circle-btn';
    circleBtn.innerHTML = `
        <div class="wa-circle-glow"></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" class="text-white" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.116-2.887-6.98-1.865-1.864-4.343-2.887-6.982-2.889-5.44 0-9.863 4.42-9.867 9.865-.001 1.968.514 3.89 1.492 5.58l-.978 3.57 3.654-.959zM17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
    `;

    widgetContainer.appendChild(pillBtn);
    widgetContainer.appendChild(circleBtn);
    document.body.appendChild(widgetContainer);

    // 2. Build and inject Chat Window
    const chatWindow = document.createElement('div');
    chatWindow.className = 'wa-chat-window';
    chatWindow.innerHTML = `
        <div class="wa-chat-header">
            <div class="wa-header-left">
                <div class="wa-header-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20" class="text-white">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div class="wa-header-info">
                    <span class="wa-header-name">IKANTIK Support</span>
                    <span class="wa-header-status">
                        <span class="wa-status-dot"></span>
                        Typically replies in minutes
                    </span>
                </div>
            </div>
            <div class="wa-chat-close" id="wa-chat-close-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
        </div>
        
        <div class="wa-chat-body" id="wa-chat-body">
            <div class="wa-msg wa-msg-agent">
                Hi there! 👋 Welcome to IKANTIK Agency.<br><br>How can we help you scale your brand today? Choose a query below or type your message to chat with us on WhatsApp!
            </div>
        </div>
        
        <div class="wa-chips-container">
            <div class="wa-chip" data-query="Hi! I would like to get a free growth audit for my brand.">Free Audit 📊</div>
            <div class="wa-chip" data-query="Hi! I'm interested in premium website development.">Web Design 💻</div>
            <div class="wa-chip" data-query="Hi! I want to discuss Meta Ads management to scale my sales.">Meta Ads 📈</div>
        </div>
        
        <div class="wa-chat-footer">
            <div class="wa-input-wrapper">
                <input type="text" class="wa-input" id="wa-chat-input" placeholder="Type your message..." autocomplete="off">
            </div>
            <button class="wa-send-btn" id="wa-chat-send-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(45deg); margin-left: -2px; margin-top: 2px;">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            </button>
        </div>
    `;

    document.body.appendChild(chatWindow);

    // 3. Elements selector
    const chatInput = document.getElementById('wa-chat-input');
    const chatSendBtn = document.getElementById('wa-chat-send-btn');
    const closeBtn = document.getElementById('wa-chat-close-btn');
    const chips = chatWindow.querySelectorAll('.wa-chip');

    // 4. Toggle visibility
    const toggleChat = () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open')) {
            setTimeout(() => chatInput.focus(), 300);
        }
    };

    pillBtn.addEventListener('click', toggleChat);
    circleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', () => chatWindow.classList.remove('open'));

    // 5. Send message flow
    const triggerWhatsApp = (text) => {
        const message = encodeURIComponent(text || DEFAULT_MESSAGE);
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        window.open(url, '_blank');
        chatWindow.classList.remove('open');
    };

    chatInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            triggerWhatsApp(chatInput.value.trim());
            chatInput.value = '';
        }
    });

    chatSendBtn.addEventListener('click', () => {
        triggerWhatsApp(chatInput.value.trim());
        chatInput.value = '';
    });

    // 6. Click suggestion chips
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-query');
            triggerWhatsApp(query);
        });
    });
}


