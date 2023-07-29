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
        return { isValid: false, message: "O nome não pode conter caracteres especiais" };
    }

    return { isValid: true, message: "Nome válido" };
}

// //=== usando a resposta da função validateName ===

// import React, { useState } from 'react';
// import { validateName } from './validation';

// function NameInput() {
//     const [name, setName] = useState('');
//     const [error, setError] = useState('');

//     const handleBlur = () => {
//         const validation = validateName(name);
//         if (!validation.isValid) {
//             setError(validation.message);
//         } else {
//             setError('');
//         }
//     };
//         <div>
//             <input
//                 type="text"
//                 value={name}
//                 onBlur={handleBlur}
//                 onChange={e => setName(e.target.value)}
//             />
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//         </div>


function validateEmail(email) {
    if (!email || email.trim() === '') {
        return { isValid: false, message: 'Este campo deve ser preenchido' };
    }

    if (email !== email.trim()) {
        return { isValid: false, message: 'E-mail inválido' };
    }

    if (!email.includes('@') || !email.includes('.')) {
        return { isValid: false, message: 'Email deve incluir um "@" e um ".".' };
    }

    return { isValid: true };
}

// //=== usando a resposta da função validateEmail ===

// import React, { useState } from 'react';
// import { validateEmail } from './validation';

// function EmailInput() {
//     const [email, setEmail] = useState('');
//     const [error, setError] = useState('');

//     const handleBlur = () => {
//         const validation = validateEmail(email);
//         if (!validation.isValid) {
//             setError(validation.message);
//         } else {
//             setError('');
//         }
//     };

//     return (
//         <div>
//             <input
//                 type="email"
//                 value={email}
//                 onBlur={handleBlur}
//                 onChange={e => setEmail(e.target.value)}
//             />
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//         </div>
//     );
// }


function validatePassword(password) {
    if (!password || password === '') {
        return { isValid: false, message: 'Este campo deve ser preenchido' };
    }

    if (password.length < 8) {
        return { isValid: false, message: 'Senha deve ter pelo menos 8 caracteres.' };
    }

    return { isValid: true };
}

// //=== usando a resposta da função validatePassword ===

// import React, { useState } from 'react';
// import { validatePassword } from './validation';

// function PasswordInput() {
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleBlur = () => {
//         const validation = validatePassword(password);
//         if (!validation.isValid) {
//             setError(validation.message);
//         } else {
//             setError('');
//         }
//     };

//     return (
//         <div>
//             <input
//                 type="password"
//                 value={password}
//                 onBlur={handleBlur}
//                 onChange={e => setPassword(e.target.value)}
//             />
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//         </div>
//     );
// }




export { validateName, validateEmail, validatePassword };