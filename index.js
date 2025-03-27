// Wait for DOM to fully load before executing code
document.addEventListener('DOMContentLoaded', function() {
    // ------------- VARIABLES -------------
    // Navigation
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('a.nav-link');
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    // Chat support
    const chatToggle = document.getElementById('chatToggle');
    // const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const sendMessageButton = document.getElementById('sendMessage');
    const chatBody = document.getElementById('chatBody');
    
    // Help button
    const helpToggle = document.getElementById('helpToggle');
    
    // Contact form
    const contactForm = document.querySelector('#contact form');
    
    // Product boxes
    const productBoxes = document.querySelectorAll('.product-box');
    
    // Gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // ------------- FUNCTIONS -------------
    
    // Function to handle smooth scrolling for navbar links
    function handleSmoothScroll(e) {
        if (this.hash !== '') {
            e.preventDefault();
            const hash = this.hash;
            
            window.scrollTo({
                top: document.querySelector(hash).offsetTop - 70,
                behavior: 'smooth'
            });
            
            // If mobile menu is open, close it after clicking
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        }
    }
    
    // Function to handle sticky navbar and change its appearance on scroll
    function handleNavbarOnScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
    
    // Function to handle back to top button visibility
    function handleBackToTopVisibility() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
    
    // Function to scroll back to top
    function scrollToTop(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Chat functions
    // function toggleChatWindow() {
    //     chatWindow.classList.toggle('open');
    //     if (chatWindow.classList.contains('open')) {
    //         chatInput.focus();
    //     }
    // }
    
    // function closeChatWindow() {
    //     chatWindow.classList.remove('open');
    // }
    
    // function sendChatMessage() {
    //     const messageText = chatInput.value.trim();
    //     if (messageText !== '') {
    //         // Create message element
    //         const messageDiv = document.createElement('div');
    //         messageDiv.className = 'message sent';
            
    //         const messageContent = document.createElement('div');
    //         messageContent.className = 'message-content';
    //         messageContent.textContent = messageText;
            
    //         messageDiv.appendChild(messageContent);
    //         chatBody.appendChild(messageDiv);
            
    //         // Clear input
    //         chatInput.value = '';
            
    //         // Scroll to bottom of chat
    //         chatBody.scrollTop = chatBody.scrollHeight;
            
    //         // Simulate response after a delay
    //         setTimeout(simulateChatResponse, 1000);
    //     }
    // }
    
    // function simulateChatResponse() {
    //     const responses = [
    //         "Thank you for your message. How can I assist you with our rice products?",
    //         "I'd be happy to help you with your inquiry. Could you provide more details?",
    //         "We'll get back to you shortly with more information about our products.",
    //         "Thank you for your interest in our premium rice varieties. Would you like to know about any specific type?"
    //     ];
        
    //     const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
    //     // Create message element
    //     const messageDiv = document.createElement('div');
    //     messageDiv.className = 'message received';
        
    //     const messageContent = document.createElement('div');
    //     messageContent.className = 'message-content';
    //     messageContent.textContent = randomResponse;
        
    //     messageDiv.appendChild(messageContent);
    //     chatBody.appendChild(messageDiv);
        
    //     // Scroll to bottom of chat
    //     chatBody.scrollTop = chatBody.scrollHeight;
    // }
    
    // Function to handle chat input keypress (Enter key)
    // function handleChatInputKeypress(e) {
    //     if (e.key === 'Enter') {
    //         sendChatMessage();
    //     }
    // }
    
    // Function to display help information
    function toggleHelpInfo() {
        // Create modal if it doesn't exist
        let helpModal = document.getElementById('helpModal');
        
        if (!helpModal) {
            helpModal = document.createElement('div');
            helpModal.id = 'helpModal';
            helpModal.className = 'custom-modal';
            helpModal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h5>How can we help you?</h5>
                        <span class="modal-close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <p>Looking for information about our rice products? Here's how to navigate our website:</p>
                        <ul>
                            <li>Browse our rice categories in the Categories section</li>
                            <li>See our product range in the Products section</li>
                            <li>Learn more about us in the About Us section</li>
                            <li>Contact us directly through the Contact form</li>
                        </ul>
                        <p>Still need help? Use the chat feature to talk to our support team.</p>
                    </div>
                </div>
            `;
            document.body.appendChild(helpModal);
            
            // Add close functionality
            const modalClose = helpModal.querySelector('.modal-close');
            modalClose.addEventListener('click', function() {
                helpModal.classList.remove('show');
            });
        }
        
        helpModal.classList.toggle('show');
    }
    
    // Function to handle contact form submission
    function handleContactFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        // Validate form (example validation)
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageInput = this.querySelector('textarea');
        
        let isValid = true;
        
        if (nameInput.value.trim() === '') {
            highlightInvalidField(nameInput);
            isValid = false;
        } else {
            removeInvalidHighlight(nameInput);
        }
        
        if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
            highlightInvalidField(emailInput);
            isValid = false;
        } else {
            removeInvalidHighlight(emailInput);
        }
        
        if (messageInput.value.trim() === '') {
            highlightInvalidField(messageInput);
            isValid = false;
        } else {
            removeInvalidHighlight(messageInput);
        }
        
        if (isValid) {
            // Simulate form submission
            showFormSubmissionResult(true, 'Thank you! Your message has been sent successfully.');
            this.reset();
        } else {
            showFormSubmissionResult(false, 'Please fill all required fields correctly.');
        }
    }
    
    // Helper functions for form validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function highlightInvalidField(field) {
        field.classList.add('is-invalid');
    }
    
    function removeInvalidHighlight(field) {
        field.classList.remove('is-invalid');
    }
    
    function showFormSubmissionResult(success, message) {
        // Remove any existing alert
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create new alert
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${success ? 'alert-success' : 'alert-danger'} form-alert`;
        alertDiv.textContent = message;
        
        // Insert before the form
        contactForm.parentNode.insertBefore(alertDiv, contactForm);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
    
    // Function to handle product hover effects
    function handleProductHover() {
        productBoxes.forEach(box => {
            box.addEventListener('mouseenter', function() {
                this.classList.add('product-hover');
            });
            
            box.addEventListener('mouseleave', function() {
                this.classList.remove('product-hover');
            });
        });
    }
    
    // Function to handle gallery item click to show larger image
    function handleGalleryItemClick() {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                showImageModal(imgSrc);
            });
        });
    }
    
    // Function to create and show image modal
    function showImageModal(imgSrc) {
        // Create modal if it doesn't exist
        let imageModal = document.getElementById('imageModal');
        
        if (!imageModal) {
            imageModal = document.createElement('div');
            imageModal.id = 'imageModal';
            imageModal.className = 'image-modal';
            imageModal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <img src="${imgSrc}" alt="Gallery Image">
                </div>
            `;
            document.body.appendChild(imageModal);
            
            // Add close functionality
            const modalClose = imageModal.querySelector('.modal-close');
            modalClose.addEventListener('click', function() {
                imageModal.classList.remove('show');
            });
            
            // Close on click outside
            imageModal.addEventListener('click', function(e) {
                if (e.target === imageModal) {
                    imageModal.classList.remove('show');
                }
            });
        } else {
            // Update image source if modal already exists
            imageModal.querySelector('img').src = imgSrc;
        }
        
        imageModal.classList.add('show');
    }
    
    // Function to handle section animations on scroll
    function handleScrollAnimations() {
        const sections = document.querySelectorAll('section');
        
        const animateOnScroll = function() {
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionBottom = section.getBoundingClientRect().bottom;
                const windowHeight = window.innerHeight;
                
                if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
                    section.classList.add('animate');
                }
            });
        };
        
        // Initial check
        animateOnScroll();
        
        // Check on scroll
        window.addEventListener('scroll', animateOnScroll);
    }
    
    // ------------- EVENT LISTENERS -------------
    
    // Navbar smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Scroll events
    window.addEventListener('scroll', handleNavbarOnScroll);
    window.addEventListener('scroll', handleBackToTopVisibility);
    
    // Back to top button
    backToTopButton.addEventListener('click', scrollToTop);
    
    // Chat functionality
    // chatToggle.addEventListener('click', toggleChatWindow);
    // chatClose.addEventListener('click', closeChatWindow);
    // sendMessageButton.addEventListener('click', sendChatMessage);
    // chatInput.addEventListener('keypress', handleChatInputKeypress);
    
    // Help button
    helpToggle.addEventListener('click', toggleHelpInfo);
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Initialize product hover effects
    handleProductHover();
    
    // Initialize gallery functionality
    handleGalleryItemClick();
    
    // Initialize scroll animations
    handleScrollAnimations();
    
    // ------------- CSS HELPERS -------------
    
    // Create and append CSS for dynamic elements
    function addDynamicStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* Navbar scroll effect */
            .navbar-scrolled {
                background-color: #fff;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            
            /* Product hover effect */
            .product-hover {
                transform: translateY(-5px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
            }
            
            /* Form validation styles */
            .is-invalid {
                border-color: #dc3545;
                background-color: rgba(220, 53, 69, 0.05);
            }
            
            /* Image modal styles */
            .image-modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
            }
            
            .image-modal.show {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .image-modal .modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            
            .image-modal img {
                max-width: 100%;
                max-height: 90vh;
            }
            
            .image-modal .modal-close {
                position: absolute;
                top: -30px;
                right: 0;
                color: white;
                font-size: 28px;
                cursor: pointer;
            }
            
            /* Help modal styles */
            .custom-modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
            }
            
            .custom-modal.show {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .custom-modal .modal-content {
                background-color: #fff;
                border-radius: 5px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            
            .custom-modal .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                border-bottom: 1px solid #eee;
            }
            
            .custom-modal .modal-body {
                padding: 20px;
            }
            
            .custom-modal .modal-close {
                font-size: 24px;
                cursor: pointer;
            }
            
            /* Section animation */
            section {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
            
            section.animate {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Add dynamic styles
    addDynamicStyles();
});
