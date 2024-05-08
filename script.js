function checkPassword() {
    const passwordInput = document.getElementById("password").value;
    const customMinLength = parseInt(document.getElementById("customMinLength").value);
    const customUpperCase = parseInt(document.getElementById("customUpperCase").value);
    const customSpecialChars = parseInt(document.getElementById("customSpecialChars").value);
    const customMinNumbers = parseInt(document.getElementById("customMinNumbers").value);
    
    const meetsRequirements = checkPasswordRequirements(passwordInput, customMinLength, customUpperCase, customSpecialChars, customMinNumbers);

    if (meetsRequirements) {
        document.getElementById("result").innerText = "Congrats! Password meets all the requirements.";
        const strength = calculatePasswordStrength(passwordInput);
        document.getElementById("result").innerText += "\nPassword Strength: " + strength;

        const complexity = calculatePasswordComplexity(passwordInput, customMinLength, customUpperCase, customSpecialChars, customMinNumbers);
        document.getElementById("complexity").innerText = "Password Complexity for these requirements is: " + complexity;
    } else {
        document.getElementById("result").innerText = "Password does not meet requirements. Generating suggestion...";
        const suggestionPassword = generateRandomPassword();
        document.getElementById("result").innerText += "\nSuggested password: " + suggestionPassword;
        document.getElementById("complexity").innerText = ""; // Reset complexity when password doesn't meet requirements
    }
}

function calculatePasswordComplexity(password, minLength = 10, minUpperCase = 2, minSpecialChars = 2, minNumbers = 1) {
    // Calculate complexity based on number of characters that satisfy requirements
    let complexity = 0;
    if (password.length >= minLength) complexity++;
    if (minUpperCase > 0 && (password.match(/[A-Z]/g) || []).length >= minUpperCase) complexity++;
    if (minSpecialChars > 0 && (password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length >= minSpecialChars) complexity++;
    if (minNumbers > 0 && (password.match(/\d/g) || []).length >= minNumbers) complexity++;

    return complexity;
}



function checkPasswordRequirements(password, minLength = 10, minUpperCase = 2, minSpecialChars = 2, minNumbers = 1) {
    // Check if the password has at least the specified length
    if (password.length < minLength) {
        return false;
    }
    
    // Check if the password contains at least the specified number of uppercase letters
    if ((password.match(/[A-Z]/g) || []).length < minUpperCase) {
        return false;
    }
    
    // Check if the password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return false;
    }
    
    // Check if the password contains at least the specified number of special characters
    if ((password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length < minSpecialChars) {
        return false;
    }
    
    // Check if the password contains at least the specified number of digits
    if ((password.match(/\d/g) || []).length < minNumbers) {
        return false;
    }
    
    // If all the conditions are met, the password is valid
    return true;
}

function generateRandomPassword() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(),.?":{}|<>';
    let password = '';
    for (let i = 0; i < 10; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

function calculatePasswordStrength(password) {
    let strength = 0;
    
    // Add points for length
    const lengthPoints = Math.min(Math.floor(password.length / 4), 5); // Maximum 5 points for length
    strength += lengthPoints;
    
    // Add points for character diversity
    const characterDiversityPoints = Math.min(new Set(password).size / 2, 5); // Maximum 5 points for character diversity
    strength += characterDiversityPoints;
    
    return strength;
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const showPasswordCheckbox = document.getElementById("showPassword");

    if (showPasswordCheckbox.checked) {
        passwordInput.type = "text";
        passwordInput.style.width = "calc(100% - 20px)"; // Adjust width when showing password
        passwordInput.style.padding = "10px";
        passwordInput.style.marginBottom = "20px"; // converted from margin-bottom to marginBottom
        passwordInput.style.border = "1px solid #ccc";
        passwordInput.style.borderRadius = "4px"; // converted from border-radius to borderRadius
        passwordInput.style.fontSize = "16px"; // converted from font-size to fontSize

    } else {
        passwordInput.type = "password";
        passwordInput.style.width = ""; // Reset width when hiding password
    }
}
function refreshPage() {
    location.reload(); // Reload the page to reset to default state
}


