/**
 * Documentation Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initDocsTabs();
    initSidebarNavigation();
    initTableOfContents();
    initCodeCopy();
    initSearchShortcut();
});

/**
 * Tabs functionality in docs
 */
function initDocsTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.tab;

            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update visible content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetId) {
                    content.classList.add('active');
                }
            });
        });
    });
}

/**
 * Sidebar navigation - active state based on scroll
 */
function initSidebarNavigation() {
    const sections = document.querySelectorAll('.docs-section');
    const sidebarLinks = document.querySelectorAll('.sidebar-section a');

    const observerOptions = {
        rootMargin: '-100px 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Update URL without jumping
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

/**
 * Table of contents - highlight current section
 */
function initTableOfContents() {
    const tocLinks = document.querySelectorAll('.docs-toc a');
    const sections = document.querySelectorAll('.docs-section');

    const observerOptions = {
        rootMargin: '-100px 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Code copy functionality
 */
function initCodeCopy() {
    const copyBtns = document.querySelectorAll('.copy-code-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const codeBlock = btn.closest('.code-block-docs').querySelector('code');
            const code = codeBlock.textContent;

            try {
                await navigator.clipboard.writeText(code);

                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                btn.style.color = '#22c55e';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
}

/**
 * Search shortcut (Cmd/Ctrl + K)
 */
function initSearchShortcut() {
    const searchInput = document.getElementById('docsSearch');

    if (searchInput) {
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }

            if (e.key === 'Escape') {
                searchInput.blur();
            }
        });
    }
}
