// script to generate random password with options
function generatePassword(length, includeUppercase, includeNumbers, includeSpecial, includeLowercase) {
    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSpecial) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

// Add toggle functionality for buttons
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

// Add event listener for form submission
document.getElementById('password-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const length = parseInt(document.getElementById('length').value);
    const includeUppercase = document.querySelector('[data-option="uppercase"]').classList.contains('active');
    const includeNumbers = document.querySelector('[data-option="numbers"]').classList.contains('active');
    const includeSpecial = document.querySelector('[data-option="special"]').classList.contains('active');
    const includeLowercase = document.querySelector('[data-option="lowercase"]').classList.contains('active');
    
    // Validate at least one character type is selected
    if (!includeUppercase && !includeNumbers && !includeSpecial && !includeLowercase) {
        alert('Please select at least one character type.');
        return;
    }
    
    const password = generatePassword(length, includeUppercase, includeNumbers, includeSpecial, includeLowercase);
    document.getElementById('generated-password').textContent = password;
    document.getElementById('copy-btn').style.display = 'block';
});

// Copy password to clipboard
function copyPassword() {
    const password = document.getElementById('generated-password').textContent;
    navigator.clipboard.writeText(password).then(() => {
        const copyBtn = document.getElementById('copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });
}
