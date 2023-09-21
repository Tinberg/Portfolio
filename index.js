// copyright
const year = new Date().getFullYear();
document.querySelector('footer p').textContent = `© Copyright ${year}. Made by Mathias Tinberg`;

//dark/light mode
const themeSwitch = document.getElementById("themeSwitch");
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    
    if (currentTheme === 'dark') {
        themeSwitch.checked = true;
    }
}

themeSwitch.addEventListener("change", function() {
    if (themeSwitch.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// nodemailer 
document.querySelector(".form-container").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const contactInfo = document.getElementById("contactInfo").value;

    const response = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        body: JSON.stringify({ name, email, message, contactInfo }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        alert("Your message has been sent successfully!");
    } else {
        alert("An error occurred while sending your message. Please try again later.");
    }
});

