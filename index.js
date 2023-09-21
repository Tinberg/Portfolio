// copyright
const year = new Date().getFullYear();
document.querySelector('footer p').textContent = `© Copyright ${year}. Made by Mathias Tinberg`;

document.querySelector(".form-container").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const contactInfo = document.getElementById("contactInfo").value;

    const response = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
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



// form submission serverless function
// document.getElementById('contactForm').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const data = {
//         name: formData.get('name'),
//         email: formData.get('email'),
//         message: formData.get('message'),
//     };

//     try {
//         const response = await fetch(e.target.action, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         });

//         if (response.ok) {
//             alert('Email sent successfully!');
//         } else {
//             alert('Error sending email!');
//         }
//     } catch (error) {
//         alert('An error occurred: ' + error.message);
//     }
// });
