import * as yup from 'yup';

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

/**
 * Login Form Validation Schema
 */
export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('You must enter a valid email')
        .required('You must enter a email'),
    password: yup.string().required('Please enter your password.'),
});

/**
 * Forgot password Form Validation Schema
 */
export const forgotEmailSchema = yup.object().shape({
    email: yup
        .string()
        .email('You must enter a valid email')
        .required('You must enter a email'),
});

/**
 * Patient Form Validation Schema
 */
export const patientSchema = yup.object().shape({
    name: yup.string().required('Please enter name.'),
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Please enter email.'),
    cityState: yup.string().required('Please select your Address.')
});

/**
 * Attorney Form Validation Schema
 */
export const attorneySchema = yup.object().shape({
    attorneyName: yup.string().required('Please enter name.'),
    attorneyEmail: yup
        .string()
        .email('Please enter valid email')
        .required('Please enter email.'),
    attorneyCityState: yup.string().required('Please enter city and state.'),
    attorneyAddress: yup.string().required('Please enter address.'),
    attorneyFax: yup.string().required('Please enter Fax.'),
    attorneyPhone: yup.string().required('Please enter phone.'),
    attorneyZip: yup.string().required('Please enter Zipcode.'),
});

/**
 * Insurance Form Validation Schema
 */
export const insuranceSchema = yup.object().shape({
    insuranceCompany: yup.string().required('Please enter company name.'),
    cityState: yup.string().required('Please enter city and state.'),
    address: yup.string().required('Please enter address.'),
    insuranceAdjuster: yup.string().required('Please enter Adjuster.'),
    insurancePolicyNum: yup.string().required('Please enter policy number.'),
    insuranceZip: yup.string().required('Please enter Zipcode.'),
});

/**
 * Note Form Validation Schema
 */
export const noteSchema = yup.object().shape({
    authorName: yup.string().required('Please enter name.'),
    createDate: yup.string().required('Please enter city and state.'),
    title: yup.string().required('Please enter Title.'),
    createDate: yup.date().required('Please enter date'),
});

/**
 * Agent Form Validation Schema
 */
export const agentSchema = yup.object().shape({
    Name: yup.string().required('Please enter name.'),
    Phone: yup.string().required('Please enter phone number.'),
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Please enter email.'),
    Address: yup.string().required('Please enter Address'),
});

/**
 * Doctor Form Validation Schema
 */
export const doctorSchema = yup.object().shape({
    Email: yup
        .string()
        .email('Please enter valid email')
        .required('Please enter email.'),
    Phone: yup.string().required('Please enter phone number.'),
    Address: yup.string().required('Please enter Address'),
    Description: yup.string().required('Please enter Description'),
    AvailableBook: yup.number().integer().required('Please enter Available Book'),
    Name: yup.string().required('Please enter Name'),
    Password: yup.string().required('Please enter your password.'),
});


/**
 * Patient Profile Form Validation Schema
 */
 export const patientProfileSchema = yup.object().shape({
    name: yup.string().required('Please enter name.'),
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Please enter email.'),
    phone: yup.string().required('Please enter Phone.'),   
    Address: yup.string().required('Please enter Address.'),
    Gender: yup.string().required('Please enter Gender.'),
    Zipcode: yup.string().required('Please enter Zipcode.'), 
});
