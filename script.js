// ========================================
// InversLab - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            this.classList.toggle('active');

            // Create mobile nav if it doesn't exist
            let mobileNav = document.querySelector('.mobile-nav');
            if (!mobileNav) {
                mobileNav = document.createElement('div');
                mobileNav.className = 'mobile-nav';
                mobileNav.innerHTML = `
                    <a href="index.html">Home</a>
                    <a href="about.html">About Us</a>
                    <a href="workspace.html">Workspace</a>
                    <a href="blog.html">Blog</a>
                    <a href="contact.html">Contact Us</a>
                `;
                document.body.appendChild(mobileNav);

                // Close menu when clicking links
                mobileNav.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileNav.classList.remove('active');
                        mobileMenuBtn.classList.remove('active');
                    });
                });
            }

            mobileNav.classList.toggle('active');
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (email) {
                alert('Thank you for subscribing with: ' + email);
                this.reset();
            }
        });
    }

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.stat-item, .feature-card, .pricing-card, .space-card, .faq-item');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    const elementsToAnimate = document.querySelectorAll('.stat-item, .feature-card, .pricing-card, .space-card, .faq-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Testimonial slider (basic)
    const testimonialNav = document.querySelector('.testimonial-nav');
    if (testimonialNav) {
        const prevBtn = testimonialNav.querySelector('.nav-arrow:first-child');
        const nextBtn = testimonialNav.querySelector('.nav-arrow:last-child');

        // Sample testimonials data
        const testimonials = [
            {
                quote: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."',
                name: 'Anik Deb',
                location: 'Sylhet, Bangladesh',
                rating: 4,
                image: 'images/customer1.webp'
            },
            {
                quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."',
                name: 'Sarah Ahmed',
                location: 'Dhaka, Bangladesh',
                rating: 5,
                image: 'images/Nadia Islam.webp'
            },
            {
                quote: '"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur voluptatem."',
                name: 'John Smith',
                location: 'Chittagong, Bangladesh',
                rating: 4,
                image: 'images/Karim Hassan.webp'
            }
        ];

        let currentIndex = 0;

        const updateTestimonial = () => {
            const testimonial = testimonials[currentIndex];
            const card = document.querySelector('.testimonial-card');
            const imgWrapper = document.querySelector('.testimonial-img-wrapper img'); // Select image

            if (card) {
                const quote = card.querySelector('.testimonial-quote p');
                const name = card.querySelector('.author-name');
                const location = card.querySelector('.author-location');
                const stars = card.querySelector('.author-rating');

                // Fade out
                card.style.opacity = '0';
                card.style.transform = 'translateX(20px)';
                if (imgWrapper) imgWrapper.style.opacity = '0'; // Fade image too

                setTimeout(() => {
                    quote.textContent = testimonial.quote;
                    name.textContent = testimonial.name;
                    location.textContent = testimonial.location;
                    if (imgWrapper) imgWrapper.src = testimonial.image; // Update image

                    // Update stars
                    const fullStars = '★'.repeat(testimonial.rating);
                    const emptyStars = '☆'.repeat(5 - testimonial.rating);
                    stars.innerHTML = `<span class="stars">${fullStars}</span><span class="star-empty">${emptyStars}</span>`;

                    // Fade in
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0)';
                    if (imgWrapper) imgWrapper.style.opacity = '1';
                }, 300);
            }
        };

        // Set transition
        const card = document.querySelector('.testimonial-card');
        if (card) {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                updateTestimonial();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                updateTestimonial();
            });
        }
    }

    // Counter animation for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');

        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            // Check if element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(counter);
        });
    };

    // Article TOC Generator
    const articleContent = document.getElementById('article-content');
    const tocBody = document.getElementById('toc-body');
    const tocToggle = document.getElementById('toc-toggle');
    const tocContainer = document.querySelector('.toc-container');

    if (articleContent && tocBody) {
        const headers = articleContent.querySelectorAll('h2, h3');

        if (headers.length > 0) {
            const ul = document.createElement('ul');
            ul.className = 'toc-list';

            headers.forEach((header, index) => {
                // Add ID if missing
                if (!header.id) {
                    header.id = 'heading-' + index;
                }

                const li = document.createElement('li');
                if (header.tagName === 'H3') {
                    li.className = 'toc-h3';
                }

                const a = document.createElement('a');
                a.href = '#' + header.id;
                a.textContent = header.textContent;

                li.appendChild(a);
                ul.appendChild(li);
            });

            tocBody.appendChild(ul);
        } else {
            if (tocContainer) tocContainer.style.display = 'none';
        }

        if (tocToggle && tocContainer) {
            tocToggle.addEventListener('click', function () {
                tocContainer.classList.toggle('collapsed');
            });
        }
    }

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollToTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    animateCounters();
});
