// Function to smoothly scroll to sections
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Get elements
const signInBtn = document.getElementById('signInBtn');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closeBtn');
const loginBtn = document.getElementById('loginBtn');

// Show popup when Sign In button is clicked
signInBtn.addEventListener('click', () => {
    popup.style.display = 'flex';
});

// Close popup when the close button or login button is clicked
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

loginBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission for demo purposes
    popup.style.display = 'none';
});
