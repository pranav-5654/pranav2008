// app.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navActions = document.getElementById('navActions');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navActions.classList.toggle('active');

            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navActions.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Subtly reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Auth Modal Logic
    const authModal = document.getElementById('authModal');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const closeModal = document.getElementById('closeModal');
    const roleTabs = document.querySelectorAll('.role-tab');
    const authTitle = document.getElementById('authTitle');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const authSwitchText = document.getElementById('authSwitchText');

    let currentMode = 'signup'; // 'login' or 'signup'
    let currentRole = 'Tourist';

    function openModal(mode) {
        currentMode = mode;
        updateAuthUI();
        authModal.classList.add('active');
    }

    if (loginBtn && signupBtn && authModal) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('login');
        });

        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('signup');
        });

        closeModal.addEventListener('click', () => {
            authModal.classList.remove('active');
        });

        window.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.classList.remove('active');
            }
        });

        roleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                roleTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentRole = tab.textContent.trim();
                updateAuthUI();
            });
        });

        function updateAuthUI() {
            if (currentMode === 'login') {
                authTitle.textContent = 'Welcome Back';
                authSubmitBtn.textContent = `Log In as ${currentRole}`;
                authSwitchText.innerHTML = `Don't have an account? <a href="#" id="switchAuthMode">Sign up</a>`;
            } else {
                authTitle.textContent = 'Join HEMPRAVIG Groups';
                authSubmitBtn.textContent = `Sign Up as ${currentRole}`;
                authSwitchText.innerHTML = `Already have an account? <a href="#" id="switchAuthMode">Log in</a>`;
            }

            document.getElementById('switchAuthMode').addEventListener('click', (e) => {
                e.preventDefault();
                currentMode = currentMode === 'login' ? 'signup' : 'login';
                updateAuthUI();
            });
        }

        document.getElementById('authForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert(`${currentMode === 'login' ? 'Logging in' : 'Signing up'} as ${currentRole} - Feature coming soon!`);
            authModal.classList.remove('active');
        });
    }
});
