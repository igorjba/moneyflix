function validateName(name) {
    if (!name) {
        return { isValid: false, message: "Este campo deve ser preenchido" };
    }

    if (name[0] === " " || name[name.length - 1] === " ") {
        return { isValid: false, message: "Nome inválido" };
    }

    const specialCharacters = ["!", "@", "#", "$", "%", "&", "*", "(", ")", "+", "=", "{", "}", "[", "]", ";", ":", "<", ">", "?", "/", "|", "~", "^", "`"];
    const nameArray = name.split("");
    const containsSpecialCharacter = nameArray.some(character => specialCharacters.includes(character));

    if (containsSpecialCharacter) {
        return { isValid: false, message: "Nome inválido" };
    }

    const namesArray = name.split(" ");
    const hasMultipleSpaces = namesArray.some(namePart => namePart === "");

    if (hasMultipleSpaces) {
        return { isValid: false, message: "Nome inválido" };
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

function validateCPF(cpf) {
    if (!cpf || cpf === '') {
        return { isValid: false, message: 'Este campo deve ser preenchido' };
    }
    if (cpf) {
        let result = 0;
        let countCPF = 0;
        for (let index = 10; index > 1; index--) {
            let Consultarcpf = Number(cpf.slice([countCPF], [countCPF + 1]))
            result = (Consultarcpf * index) + result;
            countCPF++;
        }
        result = (result % 11)
        result = (11 - result)
        if (result === 11 || result === 10) {
            result = 0
        }
        if (result !== Number(cpf.slice(9, 10))) {
            return { isValid: false, message: "Entre com CPF válido 1" }
        }
        result = 0;
        countCPF = 0;
        for (let index = 11; index > 1; index--) {
            let Consultarcpf = Number(cpf.slice([countCPF], [countCPF + 1]))
            result = (Consultarcpf * index) + result;
            countCPF++;
        }
        result = (result % 11)
        result = (11 - result)
        if (result !== Number(cpf.slice(10, 11))) {
            return { isValid: false, message: "Entre com CPF válido" }
        }

        return { isValid: true };
    }
}

function validateCPFLength(cpf) {
    if (cpf) {
        let result = 0;
        let countCPF = 0;
        for (let index = 10; index > 1; index--) {
            let Consultarcpf = Number(cpf.slice([countCPF], [countCPF + 1]))
            result = (Consultarcpf * index) + result;
            countCPF++;
        }
        result = (result % 11)
        result = (11 - result)
        if (result === 11 || result === 10) {
            result = 0
        }
        if (result !== Number(cpf.slice(9, 10))) {
            return { isValid: false, message: "Entre com CPF válido 1" }
        }
        result = 0;
        countCPF = 0;
        for (let index = 11; index > 1; index--) {
            let Consultarcpf = Number(cpf.slice([countCPF], [countCPF + 1]))
            result = (Consultarcpf * index) + result;
            countCPF++;
        }
        result = (result % 11)
        result = (11 - result)
        if (result !== Number(cpf.slice(10, 11))) {
            return { isValid: false, message: "Entre com CPF válido" }
        }

        return { isValid: true };
    }
}

function validatePhone(phone) {
    if (!phone || phone === '') {
        return { isValid: false, message: 'Este campo deve ser preenchido' };
    }

    if (phone[0] === ' ' || phone[phone.length - 1] === ' ' || phone.includes('  ')) {
        return { isValid: false, message: 'Telefone inválido.' };
    }

    const phoneDigits = phone.replace(/\D/g, '');

    if (phoneDigits.length < 10) {
        return { isValid: false, message: 'Telefone inválido.' };
    }

    return { isValid: true };
}

function validatePhoneLength(phone) {
    const phoneDigits = phone.replace(/\D/g, '');

    if (phoneDigits.length < 10) {
        return { isValid: false, message: 'Telefone inválido.' };
    }

    return { isValid: true };
}

export { validateName, validateEmail, validatePassword, validateCPF, validatePhone, validateCPFLength, validatePhoneLength };