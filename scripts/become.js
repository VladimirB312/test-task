document.addEventListener("DOMContentLoaded", () => {
    const companyData = {
        name: '',
        phone: '',
        email: '',
        description: '',
    }

    const nameField = document.getElementById('company_field')
    const phoneField = document.getElementById('phone_field')
    const emailField = document.getElementById('email_field')
    const descriptionField = document.getElementById('brief_field')
    const submitButton = document.getElementById('submit_button')

    const validatePhoneNumber = (input) => {
        const phonePattern = /^\+?[1-9]\d{1,14}$/;
        return phonePattern.test(input);
    }

    const validateEmail = (email) => {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        return EMAIL_REGEXP.test(email)
    }

    const isValidCompanyData = () => {
        const isValidData = {valid: true}

        if (companyData.name.length < 1) {
            isValidData.valid = false
            nameField.classList.add('red-outline-error')
        }

        if (!validatePhoneNumber(companyData.phone)) {
            isValidData.valid = false
            phoneField.classList.add('red-outline-error')
        }

        if (!validateEmail(companyData.email)) {
            isValidData.valid = false
            emailField.classList.add('red-outline-error')
        }

        if (companyData.description.length < 5) {
            isValidData.valid = false
            descriptionField.classList.add('red-outline-error')
        }

        return isValidData.valid
    }

    const clearFields = () => {
        nameField.value = ''
        phoneField.value = ''
        emailField.value = ''
        descriptionField.value = ''
    }

    async function postJSON(data) {
        const response = await fetch("../api/become.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            let result;
            try {
                result = await response.json()
                if (result && result.type) {
                    throw result.type
                } else {
                    throw new Error(result)
                }
            } catch (e) {
                throw e
            }
        }
    }

    const handleSubmitButton = async (event) => {
        event.preventDefault()

        if (isValidCompanyData()) {
            try {
                await postJSON(companyData)
                clearFields()
            } catch (error) {
                if (error === 'email_exists') {
                    alert('Email уже существует!')
                    emailField.classList.add('red-outline-error')
                } else {
                    console.log(error.message)
                }
            }
        }
    }

    const handleNameChange = (event) => {
        companyData.name = nameField.value
        nameField.classList.remove('red-outline-error')
    }

    const handlePhoneChange = (event) => {
        companyData.phone = phoneField.value
        phoneField.classList.remove('red-outline-error')
    }

    const handleEmailChange = (event) => {
        companyData.email = emailField.value
        emailField.classList.remove('red-outline-error')
    }

    const handleDescriptionChange = (event) => {
        companyData.description = descriptionField.value
        descriptionField.classList.remove('red-outline-error')
    }

    const initEventListeners = () => {
        nameField.addEventListener('input', handleNameChange)
        phoneField.addEventListener('input', handlePhoneChange)
        emailField.addEventListener('input', handleEmailChange)
        descriptionField.addEventListener('input', handleDescriptionChange)
        submitButton.addEventListener('click', handleSubmitButton)
    }

    initEventListeners()
});