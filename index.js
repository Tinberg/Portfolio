//-------- copyright --------//
const year = new Date().getFullYear();
document.querySelector(
  "#copyRight"
).textContent = `© Copyright ${year}. Made by Mathias Tinberg`;

//-------- hamburger menu --------//
document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menuIcon");
  const menuItems = document.getElementById("menuItems");
  const menuLinks = document.querySelectorAll("#menuItems li a");

  menuIcon.addEventListener("click", function () {
    menuItems.classList.toggle("active");
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuItems.classList.remove("active");
    });
  });
});

//--------dark/light mode--------//
document.addEventListener("DOMContentLoaded", function () {
  const themeSwitch = document.getElementById("themeSwitch");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
      themeSwitch.checked = true;
    }
  }

  themeSwitch.addEventListener("change", function () {
    if (themeSwitch.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });
});

//--------Form --------//

// Validation and nodmailer serverless function to send email.
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const formMessageElement = document.getElementById("formMessage");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    let hasError = false;

    // Clear existing messages and classes
    formMessageElement.textContent = '';
    formMessageElement.classList.remove("error-message", "success-message");

    // Retrieve values from form
    const name = document.getElementById("name").value;
    const user_email = document.getElementById("contactInfo").value; // User's email
    const serverEmail = document.getElementById("email").value; // Email for serverless function
    const message = document.getElementById("message").value;

    console.log(`Name: ${name}, User Email: ${user_email}, Server Email: ${serverEmail}, Message: ${message}`);


    // Validate Name
    if (name.length <= 5) {
      document.getElementById("errorName").textContent = "Name should be more than 5 characters.";
      hasError = true;
    } else {
      document.getElementById("errorName").textContent = "";
    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(user_email)) {
      document.getElementById("errorEmail").textContent = "Please enter a valid email address.";
      hasError = true;
    } else {
      document.getElementById("errorEmail").textContent = "";
    }

    // Validate Message
    if (message.length <= 10) {
      document.getElementById("errorMessage").textContent = "Your message should be more than 10 characters.";
      hasError = true;
    } else {
      document.getElementById("errorMessage").textContent = "";
    }

    // If there are errors, stop the function
    if (hasError) {
      formMessageElement.textContent = "Please correct the errors before submitting.";
      formMessageElement.classList.add("error-message");
      return;
    }

    // Nodemailer logic
    try {
      const response = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        body: JSON.stringify({
          name, 
          user_email: serverEmail, // Email for serverless function
          email, // User's email address
          message 
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        formMessageElement.textContent = "Thank you for your message! I'll get back to you as soon as possible.";
        formMessageElement.classList.remove("error-message");
        formMessageElement.classList.add("success-message");
        form.reset();
      } else {
        formMessageElement.textContent = "Something went wrong while sending your message. Please try again later.";
        formMessageElement.classList.add("error-message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      formMessageElement.textContent = "Something went wrong while sending your message. Please try again later.";
      formMessageElement.classList.add("error-message");
    }
  });
});

