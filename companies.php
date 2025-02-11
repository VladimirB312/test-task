<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="styles/companies-styles.css">
    <title>Company info</title>
</head>
<body>
<header>
    <h1>Company info</h1>
</header>
<div class="container">
    <div class="request-form">
        <div class="request-form__fields-wrapper">
            <input class="request-form__email" id="request_form_email" placeholder="Email" type="text"/>
            <input class="request-form__search-button" id="request_form_search" type="submit" value="Search"/>
            <span class="request-form__error" id="request_form_error"></span>
        </div>
    </div>
    <div class="result">
        <div class="result__name-wrapper">
            <div class="result__name-title">Company name</div>
            <div class="result__name" id="result-name"></div>
        </div>
        <div class="result__phone-wrapper">
            <div class="result__phone-title">Phone</div>
            <div class="result__phone" id="result-phone"></div>
        </div>
        <div class="result__email-wrapper">
            <div class="result__email-title">Email</div>
            <div class="result__email" id="result-email"></div>
        </div>
        <div class="result__description-wrapper">
            <div class="result__description-title">Description</div>
            <div class="result__description" id="result-description"></div>
        </div>
    </div>
</div>
<script src="scripts/search.js"></script>
</body>
</html>