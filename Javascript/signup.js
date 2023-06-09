function validator(options) {
    
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector('.form-message');
        var errorMessage = rule.test(inputElement.value);
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }

    var formElement = document.querySelector(options.form)
    if (formElement) {
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                inputElement.onclick = function () {
                    var errorElement = inputElement.parentElement.querySelector('.form-message');
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }
}

validator.isRequired = function (selector){
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined :'Enter your name';
        }
    }
}

validator.isEmail = function (selector){
    return {
        selector: selector,
        test: function (value) {
            var regex = /@./;
            return regex.test(value) ? undefined :'Invalid email';
        }
    }   
}

validator.isPass = function (selector, min){
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined :`Length must be >= ${min}`;
        }
    }
}

validator.isSamePass = function (selector,password){
    return {
        selector: selector,
        test: function (value) {
            return value === password() ? undefined :'Not match with password';
        }
    }
}