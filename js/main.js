/**
 * INTEGRICATE - UAS Programming Platform
 * Main JavaScript File
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCodeTabs();
    initCopyButtons();
    initAPIDemo();
    initScrollAnimations();
    initNavbarScroll();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Mobile dropdown toggle
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && !navMenu.contains(e.target) && !mobileToggle?.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileToggle?.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu after clicking
                    navMenu?.classList.remove('active');
                    mobileToggle?.classList.remove('active');
                }
            }
        });
    });
}

/**
 * Code tabs in hero section
 */
function initCodeTabs() {
    const tabs = document.querySelectorAll('.window-tabs .tab');
    const codeBlocks = document.querySelectorAll('.code-block');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update visible code block
            codeBlocks.forEach(block => {
                block.classList.remove('active');
                if (block.id === targetId) {
                    block.classList.add('active');
                }
            });
        });
    });
}

/**
 * Copy to clipboard functionality
 */
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const textToCopy = button.dataset.copy;

            try {
                await navigator.clipboard.writeText(textToCopy);

                // Visual feedback
                const originalHTML = button.innerHTML;
                button.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" fill="none"/></svg>';
                button.style.color = '#22c55e';

                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
}

/**
 * API Demo interactive functionality
 */
function initAPIDemo() {
    const endpoints = document.querySelectorAll('.endpoint');
    const requestCode = document.getElementById('requestCode');
    const responseCode = document.getElementById('responseCode');
    const statusCode = document.getElementById('statusCode');
    const responseTime = document.getElementById('responseTime');
    const sendBtn = document.getElementById('sendRequest');

    const apiData = {
        takeoff: {
            request: `{
  "altitude": 30,
  "speed": 5,
  "heading": null
}`,
            response: `{
  "success": true,
  "drone_id": "drone-alpha-01",
  "command": "takeoff",
  "status": "executing",
  "telemetry": {
    "altitude": 0,
    "target_altitude": 30,
    "battery": 94,
    "gps_fix": true,
    "satellites": 14
  },
  "eta_seconds": 12
}`,
            status: '200 OK',
            time: '124ms'
        },
        waypoint: {
            request: `{
  "waypoint": {
    "latitude": 47.3977,
    "longitude": 8.5456,
    "altitude": 50,
    "speed": 15,
    "action": "hover"
  },
  "index": 1
}`,
            response: `{
  "success": true,
  "mission_id": "mission-2024-001",
  "waypoint_added": {
    "index": 1,
    "lat": 47.3977,
    "lon": 8.5456,
    "alt": 50
  },
  "total_waypoints": 4,
  "estimated_duration": "8m 32s"
}`,
            status: '201 Created',
            time: '89ms'
        },
        telemetry: {
            request: `// GET request - no body required
// Query params:
// ?drone_id=drone-alpha-01
// &include=gps,battery,imu`,
            response: `{
  "drone_id": "drone-alpha-01",
  "timestamp": "2024-01-15T14:32:18Z",
  "gps": {
    "latitude": 47.3977,
    "longitude": 8.5456,
    "altitude": 45.2,
    "satellites": 14,
    "fix_type": "3D"
  },
  "battery": {
    "voltage": 22.4,
    "current": 12.8,
    "remaining": 78,
    "temperature": 32
  },
  "imu": {
    "roll": 0.5,
    "pitch": -1.2,
    "yaw": 142.8
  }
}`,
            status: '200 OK',
            time: '45ms'
        },
        camera: {
            request: `{
  "action": "capture",
  "camera_id": "main",
  "settings": {
    "resolution": "4K",
    "format": "jpeg",
    "geotag": true
  }
}`,
            response: `{
  "success": true,
  "image_id": "IMG_20240115_143218",
  "url": "/api/v1/media/IMG_20240115_143218",
  "metadata": {
    "resolution": "3840x2160",
    "format": "jpeg",
    "size_kb": 4892,
    "geotag": {
      "lat": 47.3977,
      "lon": 8.5456,
      "alt": 45.2
    },
    "timestamp": "2024-01-15T14:32:18Z"
  }
}`,
            status: '200 OK',
            time: '312ms'
        },
        land: {
            request: `{
  "mode": "precision",
  "target": {
    "latitude": 47.3970,
    "longitude": 8.5450
  },
  "disarm_on_land": true
}`,
            response: `{
  "success": true,
  "drone_id": "drone-alpha-01",
  "command": "land",
  "status": "executing",
  "landing_zone": {
    "lat": 47.3970,
    "lon": 8.5450,
    "distance_m": 12.4
  },
  "eta_seconds": 28,
  "post_land_action": "disarm"
}`,
            status: '200 OK',
            time: '156ms'
        }
    };

    // Endpoint selection
    endpoints.forEach(endpoint => {
        endpoint.addEventListener('click', () => {
            const key = endpoint.dataset.endpoint;
            const data = apiData[key];

            // Update active state
            endpoints.forEach(e => e.classList.remove('active'));
            endpoint.classList.add('active');

            // Update request
            if (requestCode) {
                requestCode.textContent = data.request;
            }

            // Update response
            if (responseCode) {
                responseCode.textContent = data.response;
            }

            if (statusCode) {
                statusCode.textContent = data.status;
                statusCode.style.background = data.status.includes('2')
                    ? 'rgba(34, 197, 94, 0.2)'
                    : 'rgba(239, 68, 68, 0.2)';
                statusCode.style.color = data.status.includes('2')
                    ? '#22c55e'
                    : '#ef4444';
            }

            if (responseTime) {
                responseTime.textContent = data.time;
            }
        });
    });

    // Send request button animation
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            sendBtn.disabled = true;
            sendBtn.innerHTML = `
                <svg class="spin" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="30 70"/>
                </svg>
                Sending...
            `;

            // Simulate API call
            setTimeout(() => {
                sendBtn.disabled = false;
                sendBtn.innerHTML = `
                    <svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                    Send Request
                `;

                // Flash response panel
                const responsePanel = document.querySelector('.response-panel');
                if (responsePanel) {
                    responsePanel.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.3)';
                    setTimeout(() => {
                        responsePanel.style.boxShadow = '';
                    }, 500);
                }
            }, 800);
        });
    }
}

/**
 * Scroll-based animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .step, .testimonial-card, .pricing-card, .integration-item'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add CSS for animated state
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .spin {
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Navbar scroll behavior
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        }

        lastScroll = currentScroll;
    });
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Logo carousel duplication for infinite scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const logoTrack = document.querySelector('.logo-track');
    if (logoTrack) {
        const logos = logoTrack.innerHTML;
        logoTrack.innerHTML = logos + logos;
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toString();
}

// Initialize stat counters when visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value');
            if (statValue && !statValue.dataset.animated) {
                const text = statValue.textContent;
                let target;

                if (text.includes('K')) {
                    target = parseFloat(text) * 1000;
                } else if (text.includes('M')) {
                    target = parseFloat(text) * 1000000;
                } else if (text.includes('%')) {
                    target = parseFloat(text);
                    animatePercentage(statValue, target);
                    statValue.dataset.animated = 'true';
                    return;
                }

                if (target) {
                    animateCounter(statValue, target);
                    statValue.dataset.animated = 'true';
                }
            }
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

function animatePercentage(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = current.toFixed(1) + '%';
        }
    }, 16);
}

document.querySelectorAll('.stat').forEach(stat => {
    statObserver.observe(stat);
});
