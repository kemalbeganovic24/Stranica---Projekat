document.addEventListener('DOMContentLoaded', () => {
    // Fade-in efekti
    const fadeInElements = document.querySelectorAll('.fade-in');
    const handleScroll = () => {
        fadeInElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top <= windowHeight - 50) {
                element.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Galerija modal
    const galleryImages = document.querySelectorAll('.gallery img');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.getElementById('close');
    const prevArrow = document.getElementById('prev');
    const nextArrow = document.getElementById('next');

    let currentIndex = 0;

    const openModal = (index) => {
        if (!modal || !modalImg) return;
        currentIndex = index;
        modalImg.src = galleryImages[currentIndex].src;
        modal.style.display = 'flex';
    };

    const closeModalHandler = () => {
        if (modal) modal.style.display = 'none';
    };

    const showPrevImage = () => {
        if (!modalImg) return;
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        modalImg.src = galleryImages[currentIndex].src;
    };

    const showNextImage = () => {
        if (!modalImg) return;
        currentIndex = (currentIndex + 1) % galleryImages.length;
        modalImg.src = galleryImages[currentIndex].src;
    };

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });

    if (closeModal) closeModal.addEventListener('click', closeModalHandler);
    if (prevArrow) prevArrow.addEventListener('click', showPrevImage);
    if (nextArrow) nextArrow.addEventListener('click', showNextImage);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalHandler();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (modal && modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'Escape') {
                closeModalHandler();
            }
        }
    });

    // Navbar efekat na scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('transparent');
        } else {
            navbar.classList.remove('transparent');
        }
    });

    // Smooth scroll + aktivni linkovi
    const links = document.querySelectorAll('.navbar a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetHref = link.getAttribute('href');

            if (targetHref.startsWith('#')) {
                e.preventDefault();

                links.forEach(link => link.classList.remove('active'));
                link.classList.add('active');

                const targetSection = document.querySelector(targetHref);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
