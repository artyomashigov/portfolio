if (window.AOS) {
    AOS.init();
}

const footer = document.querySelector('footer');
const backToTopButton = document.querySelector('.back-to-top');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const pageSections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        footer.style.opacity = '1';
    } else {
        footer.style.opacity = '0';
    }

    backToTopButton.classList.toggle('is-visible', window.scrollY > 500);
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const filterButtons = document.querySelectorAll('.project-filter');
const projectCards = document.querySelectorAll('.project');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach((filterButton) => {
            filterButton.classList.remove('active');
            filterButton.setAttribute('aria-pressed', 'false');
        });

        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        projectCards.forEach((project) => {
            const projectTags = Array.from(project.querySelectorAll('span'))
                .map((tag) => tag.textContent.trim());
            const isFeaturedProject = project.dataset.featured === 'true';
            const shouldHideProject = selectedFilter === 'Featured'
                ? !isFeaturedProject
                : selectedFilter !== 'All' && !projectTags.includes(selectedFilter);

            project.classList.toggle('is-hidden', shouldHideProject);
        });

        if (window.AOS) {
            AOS.refreshHard();
        }
    });
});

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
    });
}, {
    rootMargin: '-35% 0px -55% 0px'
});

pageSections.forEach((section) => navObserver.observe(section));
