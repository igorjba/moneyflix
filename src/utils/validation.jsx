function validateName(name) {
    if (!name) {
        return { isValid: false, message: "Este campo deve ser preenchido" };
    }

    if (name[0] === " ") {
        return { isValid: false, message: "Nome inválido" };
    }

    const specialCharacters = ["!", "@", "#", "$", "%", "&", "*", "(", ")", "+", "=", "{", "}", "[", "]", ";", ":", "<", ">", "?", "/", "|", "~", "^", "`"];
    const nameArray = name.split("");
    const containsSpecialCharacter = nameArray.some(character => specialCharacters.includes(character));

    if (containsSpecialCharacter) {
        return { isValid: false, message: "Nome válido" };
    }

    return { isValid: true, message: "Nome válido" };
}

function validateEmail(email) {
    if (!email || email.trim() === '') {
        return { isValid: false, message: 'Este campo deve ser preenchido' };
    }

    if (email !== email.trim()) {
        return { isValid: false, message: 'E-mail inválido' };
    }

    if (!email.includes('@') || !email.includes('.')) {
        return { isValid: false, message: 'E-mail inválido' };
    }

    if (email[0] === '.' || email[email.length - 1] === '.') {
        return { isValid: false, message: 'E-mail inválido' };
    }

    const atIndex = email.indexOf('@');
    const dotIndex = email.indexOf('.', atIndex);

    if (dotIndex === 0 || dotIndex === email.length - 1) {
        return { isValid: false, message: 'E-mail inválido' };
    }

    for (let i = 1; i < email.length - 1; i++) {
        if (email[i] === '.' && email[i - 1] === '.') {
            return { isValid: false, message: 'E-mail inválido' };
        }
        if (email[i] === '.' || email[i] === '@') {
            if (email[i - 1] === '.' || email[i - 1] === '@' || email[i + 1] === '.' || email[i + 1] === '@') {
                return { isValid: false, message: 'E-mail inválido' };
            }
        }
    }

    return { isValid: true };
}

function validatePassword(password) {
    if (!password || password === '') {
        return { isValid: false, message: 'Este campo deve ser preenchido' };
    }

    if (password.length < 6) {
        return { isValid: false, message: 'Senha deve ter pelo menos 6 caracteres.' };
    }

    return { isValid: true };
}

export { validateName, validateEmail, validatePassword };