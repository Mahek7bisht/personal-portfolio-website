
document.addEventListener("DOMContentLoaded", () => {
    initThemeEngine();
    initFormValidator();
    initInteractiveShowcase();
    initSkillTracker();
});

/*
   1. Feature 1: Theme Engine (Dark/Light Switcher)
   */
function initThemeEngine() {
    const themeBtn = document.getElementById("theme-switcher");
    if (!themeBtn) return;

    themeBtn.addEventListener("click", () => {
        // Toggle global class on body element
        document.body.classList.toggle("dark-brutalist-theme");
        
        // Dynamic Content Update via DOM
        if (document.body.classList.contains("dark-brutalist-theme")) {
            themeBtn.textContent = "LIGHT MODE";
        } else {
            themeBtn.textContent = "DARK MODE";
        }
    });
}

/* ==========================================================================
   2. Feature 2: Contact Form Validation Logic
   ========================================================================== */
function initFormValidator() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        // Stop default browser page reload
        event.preventDefault(); 
        
        // Grab values cleanly
        const nameVal = document.getElementById("name").value.trim();
        const emailVal = document.getElementById("email").value.trim();
        const msgVal = document.getElementById("message").value.trim();

        // Clear existing errors if any
        removeExistingErrors();

        let isFormValid = true;

        // Validation Assertions
        if (nameVal.length < 2) {
            displayInputError("name", "Name must be at least 2 characters long.");
            isFormValid = false;
        }

        if (!validateEmailFormat(emailVal)) {
            displayInputError("email", "Please provide a valid email format.");
            isFormValid = false;
        }

        if (msgVal.length < 10) {
            displayInputError("message", "Your message is a bit short. Drop at least 10 characters!");
            isFormValid = false;
        }

        // Action on Successful Validation
        if (isFormValid) {
            handleFormSuccess(form, nameVal);
        }
    });
}

// Reusable Helper: Email Regex Checker
function validateEmailFormat(email) {
    const expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expression.test(email);
}

// Reusable Helper: Dynamic Error Injector
function displayInputError(fieldId, messageString) {
    const targetInput = document.getElementById(fieldId);
    
    // Create an error element node natively
    const errorNode = document.createElement("p");
    errorNode.className = "brutalist-error-msg";
    errorNode.style.color = "#c84b31";
    errorNode.style.fontSize = "0.85rem";
    errorNode.style.marginTop = "4px";
    errorNode.style.fontFamily = "Arial, sans-serif";
    errorNode.style.fontWeight = "bold";
    errorNode.textContent = messageString;
    
    // Append it straight under the targeted input wrapper container
    targetInput.parentNode.appendChild(errorNode);
    targetInput.style.borderColor = "#c84b31";
}

// Reusable Helper: Clear state
function removeExistingErrors() {
    const errorMessages = document.querySelectorAll(".brutalist-error-msg");
    errorMessages.forEach(msg => msg.remove());
    
    const inputs = document.querySelectorAll(".input-block input, .input-block textarea");
    inputs.forEach(input => input.style.borderColor = "#000000");
}

function handleFormSuccess(formElement, userName) {
    // Dynamic Feedback to UI
    formElement.innerHTML = `
        <div style="border: 3px solid #000; padding: 20px; background: var(--panel-green);">
            <h3 style="font-size: 1.5rem; margin-bottom: 8px;">🚀 THANK YOU, ${userName.toUpperCase()}!</h3>
            <p style="font-family: Arial, sans-serif;">Your message was validated and sent successfully.</p>
        </div>
    `;
}

/* ==========================================================================
   3. Feature 3: Interactive Project Info Modal (Dynamic Popup)
   ========================================================================== */
function initInteractiveShowcase() {
    const targetCards = document.querySelectorAll(".showcase-column");
    
    targetCards.forEach(card => {
        // Change cursor to imply clickability
        card.style.cursor = "pointer";
        
        card.addEventListener("click", () => {
            const projectTitle = card.querySelector("h3").textContent;
            const projectDesc = card.querySelector("p").textContent;
            
            triggerDynamicModal(projectTitle, projectDesc);
        });
    });
}

function triggerDynamicModal(title, body) {
    // Build Modal Structure via JavaScript DOM injection
    const modalBackground = document.createElement("div");
    modalBackground.className = "brutalist-modal-overlay";
    
    modalBackground.innerHTML = `
        <div class="brutalist-modal-box" style="background:#fff; border:3px solid #000; padding:30px; max-width:500px; width:90%; position:relative; box-shadow: 8px 8px 0px #000;">
            <h3 style="font-size:2rem; margin-bottom:15px; border-bottom: 2px solid #000;">${title.toUpperCase()}</h3>
            <p style="font-family:Arial, sans-serif; color:#2d2d2d; margin-bottom:20px;">${body}</p>
            <button class="brutalist-btn close-modal-btn">CLOSE WINDOW</button>
        </div>
    `;
    
    // Quick Overlay Styles
    Object.assign(modalBackground.style, {
        position: "fixed",
        top: 0, left: 0, width: "100vw", height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex", justifyContent: "center", alignItems: "center",
        zIndex: 9999
    });

    document.body.appendChild(modalBackground);

    // Event listener attached directly inside container creation closure
    modalBackground.querySelector(".close-modal-btn").addEventListener("click", () => {
        modalBackground.remove();
    });
}

/* ==========================================================================
   4. Feature 4: Skills Interactive Counter
   ========================================================================== */
function initSkillTracker() {
    const skillElements = document.querySelectorAll(".skills-brutalist-list li");
    let interactionCounter = 0;
    
    skillElements.forEach(item => {
        item.addEventListener("mouseenter", () => {
            item.style.transform = "translateX(10px)";
            item.style.color = "#c84b31";
        }, { once: true }); // triggers only on the first touch instance
    });
}