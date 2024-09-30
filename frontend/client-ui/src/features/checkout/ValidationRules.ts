import * as yup from 'yup';

export const ValidationRules = [
    yup.object({
        firstName: yup.string().required('O primeiro nome é obrigatório'),
        lastName: yup.string().required('O sobrenome é obrigatório'),
        address1: yup.string().required('Endereço1 é obrigatório'),
        address2: yup.string().optional(),
        city: yup.string().required('Nome da Cidade é obrigatório'),
        state: yup.string().required('Estado é obrigatório'),
        zip: yup.string().required('CEP é obrigatório'),
        country: yup.string().required('País é obrigatório'),
    }),
    yup.object(),
    yup.object({
        cardName: yup.string().required(),
        cardNumber: yup.string().required(),
        expDate: yup.string().required(),
        cvv: yup.string().required()
    })
]