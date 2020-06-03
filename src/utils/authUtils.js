const translation = {
        username: 'usuario',
        email: 'email',
        password: 'contraseña',
        repeatedPassword: ''
    },
    errorMessages = {
        empty: 'El campo <field> es requerido.',
        format: 'Formato incorrecto para el campo <field>.',
        invalid: 'El campo <field> es inválido.'
    },
    specialErrorMessages = {
        username: 'El campo usuario no puede tener espacios.',
        password: 'La contraseña debe tener min 6 caracteres, un valor numérico, una letra minúscula, ' +
            'una letra mayúscula.',
        repeatedPassword: 'Ambos campos deben coincidir.'
    },
    validation = {
        password: (password) => {
            const passwordRegex =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
    
            return password && passwordRegex.test(password);
        },
        repeatedPassword: (repeatedPassword, data) => {
            return repeatedPassword && data &&
                data.password && data.password === repeatedPassword;
        },
        email: (email) => {
            const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/;

            return email && emailRegex.test(email);
        },
        username: (username) => {
            const usernameRegex = /^([A-z])*[^\s]\1*$/;

            return username && usernameRegex.test(username);
        }
    };

import _ from 'lodash';

export default {
    checkForm (data, validate = true) {
        const isInvalid = {},
            error = {},
            specialMessages = {};

        for (const key in data) {
            const fieldName = translation[key],
                validateFunc = validation[key];

            if (!data[key]) {
                error[key] = errorMessages.empty.replace('<field>', fieldName);
                isInvalid[key] = true;
            } else if (validate && !validateFunc(data[key], data)) {
                error[key] = errorMessages.format.replace('<field>', fieldName);
                specialMessages[key] = specialErrorMessages[key];
                isInvalid[key] = true;
            } else {
                isInvalid[key] = false;
            }
        }

        return {
            isInvalid,
            error,
            specialMessages
        }
   },

   isValidForm (isInvalid) {
        return _.chain(isInvalid)
            .values()
            .every(val => !val)
            .value();
   },

   getLoginError (data) {
        const error = {},
            isInvalid = {};

        for (const key in data) {
            const fieldName = translation[key];
            error[key] = errorMessages.invalid.replace('<field>', fieldName);
            isInvalid[key] = true;
        }

        return {
            error,
            isInvalid
        }
   }
}