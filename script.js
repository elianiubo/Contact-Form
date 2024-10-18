document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById("contact-form").addEventListener("submit", (event) => {
        const contactForm = event.target;
        event.preventDefault();
        const isValid = validateContactForm(contactForm);

        if (!isValid) {
            displayError(contactForm);
        } else {
            succesMessage();//success message displayer
        }
    });

    // Function to validate email addresses
    function isValidEmail(email) {
        // Define the JS Regex pattern for a valid email address
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        // Test the email against the pattern and return the result (true or false)
        console.log("email incorrect");
        return emailRegex.test(email);

    }
    function succesMessage(){
        const successPopup = document.querySelector(".success");
        successPopup.classList.remove("hidden");
        successPopup.setAttribute("aria-hidden", "false");
        setTimeout(() => {
            successPopup.classList.add("hidden");
            successPopup.setAttribute("aria-hidden", "true");
        }, 3000);
    }
    // Function to validate the contact form
    function validateContactForm(contactForm) {
        clearErrors();
        let isValid = true;

        // Campos a validar
        const fields = [
            { name: "name", errorId: "errorName" },
            { name: "surname", errorId: "errorSurname" },
            { name: "email", errorId: "errorEmail", validateEmail: true },
            { name: "message", errorId: "errorMessage" },
            { name: "queryType", errorId: "errorQueryType" },
            { name: "checkbox", errorId: "errorConsent", isCheckbox: true },
        ];

        fields.forEach(({ name, errorId, validateEmail, isCheckbox }) => {

            const field = contactForm[name];

            if (isCheckbox) {
                if (!field?.checked) {
                    displayError(errorId, field);
                    isValid = false;
                }
            } else {
                if (!field?.value.trim()) {
                    displayError(errorId, field);
                    isValid = false;
                }
            }
            if (validateEmail && !isValidEmail(field?.value)) {
                displayError(errorId, field);
                isValid = false;
            }
        });
        if (!contactForm.querySelector('input[name="queryType"]:checked')) {
            displayError("errorQueryType");
            isValid = false;
        }

        return isValid;


    }
    // Function to display an error message on the web page
    function displayError(errorId, inputElement) {
        document.getElementById(errorId).style.display = "block";
        // if (inputElement && inputElement.type !== "checkbox") {
        //     inputElement.classList.add("input-error");
        // }



    }
    function clearErrors() {
        document.querySelectorAll(".errorMessage").forEach(el => {
            el.style.display = "none"; // Oculta el mensaje de error
            // document.querySelectorAll(".form-control").forEach(input => input.classList.remove("input-error"));

        });
    }

    //give color to backgound color when radio is selected
    const radioButtons = document.querySelectorAll('input[type="radio"][name="queryType"]');

    // Add event listeners to each radio button
    radioButtons.forEach((radio) => {
        radio.addEventListener('change', () => {
            // Remove 'active' class from all .form-input-query containers
            document.querySelectorAll('.form-input-query').forEach((el) => el.classList.remove('active'));

            // Add 'active' class to the parent container of the selected radio button
            radio.closest('.form-input-query').classList.add('active');
        });
    });
    
    document.getElementById("check-label").addEventListener('change', () => {
        
        let checkbox = document.getElementById("checkbox");
        //checked wether is checkd or not and changes it
        checkbox.checked = !checkbox.checked;
        

    });


});