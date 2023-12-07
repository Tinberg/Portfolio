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

    formMessageElement.classList.remove("error-message", "success-message");
    formMessageElement.textContent = "";

    const spinLoader = document.getElementById("loader");
    spinLoader.style.display = "block";
    // Validate Name
    const name = document.getElementById("name").value;
    if (name.length <= 5) {
      document.getElementById("errorName").textContent =
        "Name should be more than 5 characters.";
      hasError = true;
    } else {
      document.getElementById("errorName").textContent = "";
    }

    // Validate Email
    const email = document.getElementById("contactInfo").value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      document.getElementById("errorEmail").textContent =
        "Please enter a valid email address.";
      hasError = true;
    } else {
      document.getElementById("errorEmail").textContent = "";
    }

    // Validate Message
    const message = document.getElementById("message").value;
    if (message.length <= 10) {
      document.getElementById("errorMessage").textContent =
        "Your message should be more than 10 characters.";
      hasError = true;
    } else {
      document.getElementById("errorMessage").textContent = "";
    }

    // If there are errors, stop the function
    if (hasError) {
      formMessageElement.textContent =
        "Please correct the errors before submitting.";
      formMessageElement.classList.add("error-message");
      spinLoader.style.display = "none";
      return;
    }

    //  Nodemailer logic
    try {
      const response = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        body: JSON.stringify({ name, email, message, contactInfo }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        formMessageElement.textContent =
          "Thank you for your message! I'll get back to you as soon as possible.";
        formMessageElement.classList.remove("error-message");
        formMessageElement.classList.add("success-message");
        form.reset();
      } else {
        formMessageElement.textContent =
          "Something went wrong while sending your message. Please try again later.";
        formMessageElement.classList.add("error-message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      formMessageElement.textContent =
        "Something went wrong while sending your message. Please try again later.";
      formMessageElement.classList.add("error-message");
    } finally {
      // Hide the loader after the form submission is complete
      spinLoader.style.display = "none";
    }
  });
});

//Scroll reveal
// For h1, h2, h3, and p elements
ScrollReveal().reveal(
  "h1, h2, h3, p, .button-container a, .contact-links a, .about-tech-stack, .submit-button ",
  {
    origin: "top",
    distance: "40px",
    easing: "ease-in",
    interval: 200, 
    beforeReveal: function (el) {
      el.style.transform = "translateY(0)";
      el.style.transition = "transform 0.5s ease";
    },
    afterReveal: function (el) {
      el.style.transition =
        "background-color 0.2s ease-in-out, box-shadow 0.3s ease-in-out";
    },
  }
);

// For project-card img, project-text, and project-h3 elements
ScrollReveal().reveal(".project-card img, .project-text, .project-h3", {
  origin: "top",
  distance: "40px",
  easing: "ease-in",
  interval: 100, 
  beforeReveal: function (el) {
    el.style.transform = "translateY(0)";
    el.style.transition = "transform 0.5s ease";
  },
});

// For li elements
ScrollReveal().reveal("li:not(header li), li:not(header li) a", {
  origin: "top",
  distance: "40px",
  easing: "ease-in",
  interval: 100, 
  beforeReveal: function (el) {
    el.style.transform = "translateY(0)";
    el.style.transition = "transform 0.5s ease";
  },
  afterReveal: function (el) {
    el.style.transition =
      "background-color 0.2s ease-in-out";
  },
});

