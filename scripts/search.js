document.addEventListener("DOMContentLoaded", () => {
    const searchData = {
        email: '',
    };

    const requestField = document.getElementById('request_form_email')
    const requestErrorMessage = document.getElementById('request_form_error')
    const searchButton = document.getElementById('request_form_search')
    const companyNameField = document.getElementById('result-name')
    const companyPhoneField = document.getElementById('result-phone')
    const companyEmailField = document.getElementById('result-email')
    const companyDescriptionField = document.getElementById('result-description')

    const validateEmail = (email) => {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        return EMAIL_REGEXP.test(email)
    }

    const isValidData = () => {
        if (!validateEmail(searchData.email)) {
            requestField.classList.add('request-form__email_highlight-error')
            requestErrorMessage.classList.add('request-form__error_show')
            requestErrorMessage.textContent = 'Некорректный формат email!'
            return false
        }

        return true
    }

    const clearFields = () => {
        companyNameField.textContent = ''
        companyPhoneField.textContent = ''
        companyEmailField.textContent = ''
        companyDescriptionField.textContent = ''
    }

    async function getJsonData(data) {
        const response = await fetch("../api/getCompanyData.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            let result;
            try {
                result = await response.json()
                return result
            } catch (e) {
                throw e
            }
        } else {
            throw new Error(`Ошибка запроса, ${response.status}`)
        }
    }

    const handleResponseData = (data) => {
        console.log(data)
        if (data.company_name && data.description && data.email && data.phone) {
            companyNameField.textContent = data.company_name
            companyPhoneField.textContent = data.phone
            companyEmailField.textContent = data.email
            companyDescriptionField.textContent = data.description
        } else {
            clearFields()
            requestErrorMessage.textContent = 'Компания не найдена!'
            requestErrorMessage.classList.add('request-form__error_show')
        }
    }
    const handleSubmitButton = async (event) => {
        event.preventDefault()

        if (isValidData()) {
            try {
                const data = await getJsonData(searchData)
                handleResponseData(data)
            } catch (error) {
                console.log(error.message)
            }
        } else {

        }
    }

    const handleEmailChange = (event) => {
        searchData.email = requestField.value
        requestErrorMessage.textContent = ''
        requestErrorMessage.classList.remove('request-form__error_show')
        requestField.classList.remove('request-form__email_highlight-error')
    }

    const initEventListeners = () => {
        requestField.addEventListener('input', handleEmailChange)
        searchButton.addEventListener('click', handleSubmitButton)
    }

    initEventListeners()
});