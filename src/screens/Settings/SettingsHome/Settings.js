import { Routes } from '../../../app-config/constants';

export const settings = [
    {
        title: 'Language Page Settings',
        description: 'You can change language',
        items: [
            {
                title: 'Change Language',
                router: Routes.LANGUAGE,
                items: [],
                type: 'LINK',
                open: false,
            },
            {
                title: 'Font',
                router: Routes.FONT,
                items: [],
                type: 'LINK',
                open: false,
            },
        ],
    },
    // {
    //     title: 'Account Settings',
    //     description: 'You can change sign-in mode',
    //     items: [
    //         {
    //             title: 'Enable Biometries Sign-in',
    //             router: 'SIGNINSETTING',
    //             items: [
    //                 {
    //                     title: 'IOS: face ID',
    //                     router: '',
    //                     type: 'SWITCH',
    //                     items: [],
    //                     open: false,
    //                 },
    //                 {
    //                     title: 'Android: Touch ID',
    //                     router: '',
    //                     type: 'SWITCH',
    //                     items: [],
    //                     open: false,
    //                 },
    //             ],
    //             type: 'DROPDOWN',
    //             open: false,
    //         },
    //     ],
    // },
    {
        title: 'Privacy Settings',
        description: 'Third most important settings',
        items: [
            {
                title: 'User Agreement',
                router: Routes.USERAGREEMENT,
                items: [],
                type: 'LINK',
                open: false,
            },
            {
                title: 'Privacy',
                router: Routes.PRIVACY,
                items: [],
                type: 'LINK',
                open: false,
            },
            {
                title: 'Contact US',
                router: Routes.CONTACTUS,
                items: [],
                type: 'LINK',
                open: false,
            },
        ],
    },
];

export const languages = [
    'English',
    'Chinese',
    'Spanish',
    'Franch'
];

export const fonts = [
    'SF Pro Display',
    'Bio Sans',
    'Poppings',
    'Roboto'
]

export const privacy = `Wikipedia is the best thing ever. Anyone in the world can write anything they want about any subject. So you know you are getting the best possible information.

And I knew exactly what to do. But in a much more real sense, I had no idea what to do.
Okay, too many different words from coming at me from too many different sentences.
And I knew exactly what to do. But in a much more real sense, I had no idea what to do.
Okay, too many different words from coming at me from too many different sentences.
And I knew exactly what to do. But in a much more real sense, I had no idea what to do.
Okay, too many different words from coming at me from too many different sentences.
`;

export const agreement = `Wikipedia is the best thing ever. Anyone in the world can write anything they want about any subject. So you know you are getting the best possible information.

And I knew exactly what to do. But in a much more real sense, I had no idea what to do.
Okay, too many different words from coming at me from too many different sentences.
`;
