// copyright
const year = new Date().getFullYear();
document.querySelector('footer p').textContent = `© Copyright ${year}. Made by Mathias Tinberg`;

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
        alert("Email sent!");
    } else {
        alert("Error sending email.");
    }
});



