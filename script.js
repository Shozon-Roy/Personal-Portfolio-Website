
     document.addEventListener('DOMContentLoaded', function() {
      // Add animated entrance for elements
      const animateElements = () => {
        document.body.classList.add('loaded');
      };

      // Animate elements on page load
      setTimeout(animateElements, 300);

      // Tab navigation with smooth transitions
      const tabs = document.querySelectorAll('.tabs li');
      const tabContents = document.querySelectorAll('.tab-content');

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          // Don't do anything if the tab is already active
          if (tab.classList.contains('active')) return;

          // Remove active class from all tabs
          tabs.forEach(t => t.classList.remove('active'));

          // Fade out current content before switching
          const activeContent = document.querySelector('.tab-content.active');
          if (activeContent) {
            activeContent.style.opacity = '0';
            activeContent.style.transform = 'translateY(10px)';

            setTimeout(() => {
              tabContents.forEach(content => content.classList.remove('active'));

              // Add active class to clicked tab and corresponding content
              tab.classList.add('active');
              const tabId = tab.getAttribute('data-tab');
              const newContent = document.getElementById(tabId);
              newContent.classList.add('active');

              // Force reflow for animation
              void newContent.offsetWidth;

              // Fade in new content
              newContent.style.opacity = '';
              newContent.style.transform = '';
            }, 200);
          }
        });
      });

      // Initialize project cards for animation
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach((card, index) => {
        card.style.setProperty('--index', index + 1);
      });

      // Initialize skill tags for animation
      const skillCategories = document.querySelectorAll('.skill-category');
      skillCategories.forEach(category => {
        const skillTags = category.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
          tag.style.setProperty('--index', index + 1);
        });
      });

      // Initialize blog cards for animation
      const blogCards = document.querySelectorAll('.blog-card');
      blogCards.forEach((card, index) => {
        card.style.setProperty('--index', index + 1);
      });

      // Contact form submission
      const contactForm = document.getElementById('contactForm');
      if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();

          // Get form values
          const name = document.getElementById('name').value.trim();
          const email = document.getElementById('email').value.trim();
          const message = document.getElementById('message').value.trim();

          // Validate inputs
          if (name === '' || email === '' || message === '') {
            showNotification('Please fill all required fields', 'error');
            return;
          }

          // Simulate form submission
          const submitBtn = this.querySelector('.submit-btn');
          const originalText = submitBtn.innerHTML;
          submitBtn.disabled = true;
          submitBtn.innerHTML = ' Sending...';

          setTimeout(() => {
            // Show success notification
            showNotification('Thank you for your message! I will get back to you soon.', 'success');

            // Reset form
            contactForm.reset();

            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }, 1500);
        });
      }

      // Scroll to top functionality
      const scrollTopBtn = document.getElementById('scrollTop');

      const toggleScrollTopButton = () => {
        if (window.scrollY > 300) {
          scrollTopBtn.classList.add('visible');
        } else {
          scrollTopBtn.classList.remove('visible');
        }
      };

      window.addEventListener('scroll', toggleScrollTopButton);

      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

      // Animation on scroll for skill tags and cards
      const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-tag, .project-card, .blog-card');

        elements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const elementVisible = 150;

          if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
          }
        });
      };

      // Initial check for elements in view
      setTimeout(animateOnScroll, 500);

      // Add scroll event listener
      window.addEventListener('scroll', animateOnScroll);

      // Custom notification function
      window.showNotification = function(message, type = 'success') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
          existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
          
            
            ${message}
          
          
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
          notification.classList.add('show');
        }, 10);

        // Auto remove after 5 seconds
        const removeTimeout = setTimeout(() => {
          notification.classList.remove('show');
          setTimeout(() => {
            notification.remove();
          }, 300);
        }, 5000);

        // Close button functionality
        notification.querySelector('.close-notification').addEventListener('click', () => {
          clearTimeout(removeTimeout);
          notification.classList.remove('show');
          setTimeout(() => {
            notification.remove();
          }, 300);
        });
      }
    });
