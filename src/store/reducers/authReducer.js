import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import { Routes } from '../../app-config/constants';

export const getAuth = createAsyncThunk('auth/getAuth', async () => {
    const response = await axios.get('/api/file-manager-app/files');
    const data = await response.data;

    return data;
});

export const signIn = createAsyncThunk(
    'auth/signIn',
    ({ email, password, role, fcmToken }, { dispatch }) =>
        new Promise((resolve, reject) => {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then((user) => {
                    console.log(user.user.uid);

                    switch (role) {
                        case Routes.AGENT:
                            firestore()
                                .collection('Agents')
                                .doc(user.user.uid)
                                .collection('BusinessAgent')
                                .doc(user.user.uid)
                                .get()
                                .then((snapshot) => {
                                    if (snapshot.exists) {
                                        firestore()
                                            .collection('Agents')
                                            .doc(user.user.uid)
                                            .collection('BusinessAgent')
                                            .doc(user.user.uid)
                                            .update({
                                                fcmToken,
                                            })
                                            .then(() => {
                                                dispatch(
                                                    setUserData({
                                                        ...snapshot.data(),
                                                        uid: user.user.uid,
                                                    }),
                                                );
                                                resolve(true);
                                            });
                                    } else {
                                        dispatch(
                                            loginError([
                                                {
                                                    type: 'password',
                                                    message:
                                                        "This Agent doesn't exist",
                                                },
                                            ]),
                                        );
                                        resolve({
                                            error: "Doesn't exist Agent",
                                        });
                                    }
                                });
                            break;
                        case Routes.PATIENT:
                            firestore()
                                .collection('Patients')
                                .doc(user.user.uid)
                                .get()
                                .then((snapshot) => {
                                    if (snapshot.exists) {
                                        firestore()
                                            .collection('Patients')
                                            .doc(user.user.uid)
                                            .update({
                                                fcmToken,
                                            })
                                            .then(() => {
                                                dispatch(
                                                    setUserData({
                                                        avatar: snapshot.data()
                                                            .avatar,
                                                        email: snapshot.data()
                                                            .email,
                                                        uid: user.user.uid,
                                                        agentId:
                                                            snapshot.data()
                                                                .agentId,
                                                        businessId:
                                                            snapshot.data()
                                                                .businessId,
                                                        name: snapshot.data()
                                                            .name,
                                                        cityState:
                                                            snapshot.data()
                                                                .cityState,
                                                        phone: snapshot.data()
                                                            .phone,
                                                        Address:
                                                            snapshot.data()
                                                                .Address,
                                                        DOB: snapshot.data()
                                                            .DOB,
                                                        Gender: snapshot.data()
                                                            .Gender,
                                                        Zipcode:
                                                            snapshot.data()
                                                                .Zipcode,
                                                        SSN: snapshot.data()
                                                            .SSN,
                                                    }),
                                                );
                                                resolve(true);
                                            });
                                    } else {
                                        dispatch(
                                            loginError([
                                                {
                                                    type: 'password',
                                                    message:
                                                        "This Patient doesn't exist",
                                                },
                                            ]),
                                        );
                                        resolve({
                                            error: "Doesn't exist Agent",
                                        });
                                    }
                                });
                            break;
                        case Routes.DOCTOR:
                            firestore()
                                .collection('PCDoctors')
                                .doc(user.user.uid)
                                .get()
                                .then((snapshot) => {
                                    if (snapshot.exists) {
                                        firestore()
                                            .collection('PCDoctors')
                                            .doc(user.user.uid)
                                            .update({ fcmToken })
                                            .then(() => {
                                                dispatch(
                                                    setUserData({
                                                        ...snapshot.data(),
                                                        uid: user.user.uid,
                                                    }),
                                                );
                                                resolve(true);
                                            });
                                    } else {
                                        dispatch(
                                            loginError([
                                                {
                                                    type: 'password',
                                                    message:
                                                        "This Doctor doesn't exist",
                                                },
                                            ]),
                                        );
                                        resolve({
                                            error: "Doesn't exist Agent",
                                        });
                                    }
                                });
                            break;
                    }
                })
                .catch((error) => {
                    const emailErrorCodes = [
                        'auth/email-already-in-use',
                        'auth/invalid-email',
                        'auth/operation-not-allowed',
                        'auth/user-not-found',
                        'auth/user-disabled',
                        'auth/too',
                        'auth/too-many-requests',
                    ];
                    const passwordErrorCodes = [
                        'auth/weak-password',
                        'auth/wrong-password',
                    ];
                    const response = [];
                    if (emailErrorCodes.includes(error.code)) {
                        response.push({
                            type: 'email',
                            message: error.message,
                        });
                    }

                    if (passwordErrorCodes.includes(error.code)) {
                        response.push({
                            type: 'password',
                            message: error.message,
                        });
                    }

                    dispatch(loginError(response));

                    resolve({ error });
                });
        }),
);

export const signOut = createAsyncThunk(
    'auth/userLoggedOut',
    async (status, { dispatch }) =>
        new Promise(async (resolve) => {
            auth()
                .signOut()
                .then(() => {
                    dispatch(loginError([]));
                    dispatch(setUserData({}))
                    dispatch(setRememberMe(false))
                    resolve(true);
                });
        }),
);

const authAdapter = createEntityAdapter({});

export const {
    selectAll: selectAuth,
    selectEntities: selectAuthEntities,
    selectById: selectAuthById,
} = authAdapter.getSelectors((state) => state.auth);

const authSlice = createSlice({
    name: 'auth',
    initialState: authAdapter.getInitialState({
        role: '',
        language: 'en-US',
        checked: false,
        userData: {},
        success: false,
        errors: [],
    }),
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setRememberMe: (state, action) => {
            state.checked = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        loginError: (state, action) => {
            state.success = false;
            state.errors = action.payload;
        },
    },
    extraReducers: {
        [getAuth.fulfilled]: authAdapter.setAll,
    },
});

export const { setRole, setRememberMe, setUserData, loginError } =
    authSlice.actions;

export default authSlice.reducer;
