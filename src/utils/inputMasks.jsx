function cpfMask(value) {
    value = value.replace(/\D/g, '');
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    let cpf = '';
    cpf += value.slice(0, 3);
    if (value.length > 3) {
        cpf += '.' + value.slice(3, 6);
    }
    if (value.length > 6) {
        cpf += '.' + value.slice(6, 9);
    }
    if (value.length > 9) {
        cpf += '-' + value.slice(9, 11);
    }
    return cpf;
}

function cpfUnmask(value) {
    return value.replace(/\D/g, '');
}

function cepMask(value) {
    value = value.replace(/\D/g, '');

    if (value.length > 5) {
        value = `${value.slice(0, 5)}-${value.slice(5, 8)}`;
    }

    return value;
}

function cepMaskSecond(value) {
    let cep = ''

    if (value.length > 5) {
        cep = `${value.slice(0, 5)}-${value.slice(5, 8)}`;
    }

    return cep;
}

function cepUnmask(value) {
    return value.replace(/\D/g, '');
}

function cellPhoneMask(value) {
    value = value.replace(/\D/g, '');
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    let phone = '';
    phone += '(' + value.slice(0, 2) + ')';
    if (value.length > 2) {
        phone += ' ' + value.slice(2, 3) + ' ' + value.slice(3, 7);
    }
    if (value.length > 7) {
        phone += '-' + value.slice(7, 11);
    }
    return phone;
}

function cellPhoneUnmask(value) {
    return value.replace(/\D/g, '');
}

function moneyMask(value) {
    value = value.replace(/\D/g, '');
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100);
}

function moneyUnmask(value) {
    let number = Number(value.replace(/[^0-9,-]+/g, "").replace(',', '.'));
    return Math.round(number * 100);
}
//`${extract.data.slice(8, 10)}/${extract.data.slice(5, 7)}/${extract.data.slice(0, 4)}`
function dateDDMMYYYYMask(value) {
    let data = new Date(value);
    return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}


function FullName(value) {
    value = value.toLocaleLowerCase();
    value = value.split(' ')

    let nameCompleted = ''

    value.forEach(element => {
        let name = element.replace(element[0], element[0].toUpperCase())
        nameCompleted = nameCompleted.concat(`${name} `)
    })

    return nameCompleted.trimEnd()
}

function removeSpace(value) {
    value = value.split(' ')

    let noSpace = ''

    value.forEach(element => {
        if (element === '') {
            return
        } else {
            noSpace = noSpace.concat(` ${element}`)
        }
    })

    return noSpace.trimStart();
}

function completedName(value) {
    value = value.split(' ')

    let noSpace = ''

    value.forEach(element => {
        if (element === '') {
            return
        } else {
            noSpace = noSpace.concat(` ${element}`)
        }
    })

    noSpace = noSpace.trimStart();

    noSpace = noSpace.toLocaleLowerCase();
    noSpace = noSpace.split(' ')

    let nameCompleted = ''

    noSpace.forEach(element => {
        let name = element.replace(element[0], element[0].toUpperCase())
        nameCompleted = nameCompleted.concat(`${name} `)
    })

    return nameCompleted.trimEnd()
}

export { cpfMask, cellPhoneMask, moneyMask, cpfUnmask, cellPhoneUnmask, moneyUnmask, cepUnmask, cepMask, dateDDMMYYYYMask, cepMaskSecond, FullName, removeSpace, completedName };
