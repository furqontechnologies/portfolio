
// script.js

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Lazy loading
const lazyLoad = () => {
    const lazyImages = document.querySelectorAll('[data-src]');

    lazyImages.forEach(image => {
        if (image.getBoundingClientRect().top < window.innerHeight) {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
        }
    });
};

document.addEventListener('DOMContentLoaded', lazyLoad);
document.addEventListener('scroll', lazyLoad);

// Scroll animations
const scrollAnimations = () => {
    const elements = document.querySelectorAll('.animate');

    elements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('animated');
        }
    });
};

document.addEventListener('DOMContentLoaded', scrollAnimations);
document.addEventListener('scroll', scrollAnimations);

// Form validation
const form = document.querySelector('.contact-form');
const nameInput = form.querySelector('input[type="text"]');
const emailInput = form.querySelector('input[type="email"]');
const messageInput = form.querySelector('textarea');
const submitButton = form.querySelector('button');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    if (nameValue === '') {
        showError(nameInput, 'Name is required');
    } else {
        showSuccess(nameInput);
    }

    if (emailValue === '') {
        showError(emailInput, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        showError(emailInput, 'Please enter a valid email address');
    } else {
        showSuccess(emailInput);
    }

    if (messageValue === '') {
        showError(messageInput, 'Message is required');
    } else {
        showSuccess(messageInput);
    }

    if (nameValue !== '' && emailValue !== '' && isValidEmail(emailValue) && messageValue !== '') {
        // Form submission logic goes here
        // For demonstration, we're just logging the values to console
        console.log('Name:', nameValue);
        console.log('Email:', emailValue);
        console.log('Message:', messageValue);

        // Clear form inputs
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';

        // Optionally, show a success message
        alert('Message sent successfully!');
    }
});

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const errorMessage = formControl.querySelector('small');
    errorMessage.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isValidEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}


// Function to generate random linear gradient colors
function generateRandomGradient() {
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 = (hue1 + 180) % 360;
    const saturation = Math.floor(Math.random() * 50) + 50;
    const lightness = Math.floor(Math.random() * 30) + 60;

    return `linear-gradient(${hue1}deg, hsl(${hue1}, ${saturation}%, ${lightness}%), hsl(${hue2}, ${saturation}%, ${lightness}%))`;
}

// Apply random gradients to sections
document.querySelectorAll('.section').forEach(section => {
    section.style.backgroundImage = generateRandomGradient();
});


document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.formspree_ajax');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Optionally, display a success message or perform other actions
                alert('Message sent successfully!');
                this.reset();
            } else {
                // Handle errors, if any
                console.error('Error submitting form:', response.statusText);
            }
        });
    });
});

