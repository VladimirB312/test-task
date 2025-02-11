document.addEventListener("DOMContentLoaded", () => {
    const subscribeData = {
        email: '',
    };

    const subscribeField = document.getElementById('subscribe_form_email')
    const subscribeButton = document.getElementById('subscribe_form_submit')

    const validateEmail = (email) => {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        return EMAIL_REGEXP.test(email)
    }

    const isValidData = () => {
        if (!validateEmail(subscribeData.email)) {
            subscribeField.classList.add('red-outline-error')
            return false
        }

        return true
    }

    const clearFields = () => {
        subscribeField.value = ''
    }

    async function postJSON(data) {
        const response = await fetch("../api/subscribe.php", {
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

        if (isValidData()) {
            try {
                await postJSON(subscribeData)
                clearFields()
            } catch (error) {
                if (error === 'email_exists') {
                    alert('Вы уже подписаны!')
                    subscribeField.classList.add('red-outline-error')
                } else {
                    console.log(error.message)
                }
            }
        }
    }

    const handleEmailChange = (event) => {
        subscribeData.email = subscribeField.value
        subscribeField.classList.remove('red-outline-error')
    }

    const initEventListeners = () => {
        subscribeField.addEventListener('input', handleEmailChange)
        subscribeButton.addEventListener('click', handleSubmitButton)
    }

    initEventListeners()
});