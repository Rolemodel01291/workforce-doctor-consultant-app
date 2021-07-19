import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import { UserAPI } from '../../services/api';
import moment from 'moment';

export const getDoctor = createAsyncThunk(
    'doctor/getDoctor',
    async () =>
        new Promise(async (resolve, reject) => {
            const agent = await auth().currentUser;
            console.log('=========', agent);
            firestore()
                .collection('PCDoctors')
                // .where('AgentId', '==', agent.uid)
                .get()
                .then((snapshot) => {
                    var tempDoctors = [];

                    snapshot.forEach((item) => {
                        tempDoctors.push(item.data());
                    });
                    resolve(tempDoctors);
                });
        }),
);

export const getDoctorProfile = createAsyncThunk(
    'doctor/getDoctor',
    async (uid) =>
        new Promise(async (resolve, reject) => {
            firestore()
                .collection('PCDoctors')
                .doc(uid)
                .get()
                .then((snapshot) => {
                    resolve(snapshot.data());
                });
        }),
);

export const getDoctorSchedule = createAsyncThunk(
    'doctor/getDoctorSchedule',
    async (doctorId, { dispatch }) =>
        new Promise(async (resolve, reject) => {
            console.log('--------aas--------', doctorId);
            firestore()
                .collection('PCDoctors')
                .doc(doctorId)
                .collection('Schedule')
                .get()
                .then((snapshot) => {
                    var tempSchedule = [];

                    snapshot.forEach((item) => {
                        tempSchedule.push(item.data());
                    });

                    dispatch(setSchedules(tempSchedule));
                    resolve(tempSchedule);
                });
        }),
);

export const addDoctor = createAsyncThunk(
    'doctor/addDoctor',
    async (data, { dispatch }) =>
        new Promise(async (resolve, reject) => {
            UserAPI.createAccount({
                email: data.Email,
                displayName: data.Name,
                password: data.Password,
            }).then(async (res) => {
                if (res.error) {
                    const emailErrorCodes = [
                        'auth/email-already-in-use',
                        'auth/invalid-email',
                        'auth/operation-not-allowed',
                        'auth/user-not-found',
                        'auth/user-disabled',
                        'auth/too',
                        'auth/too-many-requests',
                        'auth/email-already-exists',
                    ];
                    const passwordErrorCodes = [
                        'auth/weak-password',
                        'auth/wrong-password',
                        'auth/invalid-password',
                    ];
                    const response = [];
                    if (emailErrorCodes.includes(res.error.code)) {
                        response.push({
                            type: 'Email',
                            message: res.error.message,
                        });
                    }

                    if (passwordErrorCodes.includes(res.error.code)) {
                        response.push({
                            type: 'Password',
                            message: res.error.message,
                        });
                    }

                    dispatch(setError(response));

                    resolve({ ...res });
                } else {
                    const agent = await auth().currentUser;
                    firestore()
                        .collection('PCDoctors')
                        .doc(res.uid)
                        .set({
                            ...data,
                            UID: res.uid,
                            AgentId: agent.uid,
                            AvailableBook: parseInt(data.AvailableBook),
                        })
                        .then(() => {
                            dispatch(getDoctor()).then(() => {
                                resolve({ ...res });
                            });
                        });
                }
            });
        }),
);

export const getSchedule = createAsyncThunk(
    'doctor/getTodaySchedule',
    async ({ uid }) =>
        new Promise((resolve, reject) => {
            firestore()
                .collection('PCDoctors')
                .doc(uid)
                .collection('Schedule')
                .get()
                .then((snapshot) => {
                    let temp = [];

                    snapshot.forEach((item) => {
                        temp.push(item.data());
                    });
                    resolve(temp);
                });
        }),
);

export const getCaseDetail = createAsyncThunk(
    'doctor/getCaseDetail',
    async ({ caseId }) =>
        new Promise((resolve, reject) => {
            
            firestore()
                .collection('Cases')
                .doc(caseId)                
                .get()
                .then((snapshot) => {
                    console.log('===================',snapshot.data())
                    resolve(snapshot.data());
                });
        }),
);

export const addDoctorNotes = createAsyncThunk(
    'doctor/addDoctorNotes',
    async (data) =>
        new Promise((resolve, reject) => {
            console.log()
            firestore()
                .collection('Cases')
                .doc(data.caseId)                
                .update({
                    notes: firestore.FieldValue.arrayUnion(data)
                })
                .then(()=>{
                    resolve(true)
                })
        }),
);



export const getDoctorCaseHistory = createAsyncThunk(
    'doctor/getDoctorCaseHistory',
    async (doctorUID) => new Promise((resolve, reject) => {
        firestore()
        .collection('Cases')
        .where('pcDoctorInfo.UID','==', doctorUID)
        .where('caseStatus','>',2)
        .get()
        .then(snapshot=>{
            var temp = []
            snapshot.forEach(item=>{
                temp.push(item.data())
            })
            resolve(temp)
        })
    }),
);

const doctorAdapter = createEntityAdapter({
    selectId: (item) => item.UID,
});

export const {
    selectAll: selectDoctor,
    selectEntities: selectDoctorEntities,
    selectById: selectDoctorById,
} = doctorAdapter.getSelectors((state) => state.doctor);

const weekItems = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

const doctorSlice = createSlice({
    name: 'doctor',
    initialState: doctorAdapter.getInitialState({
        errors: [],
        selectedDoctor: {},
        action: '',
        booking: [],
        schedules: [],
        selectedWeekDay: weekItems[moment(new Date()).day()],
    }),
    reducers: {
        setAction: (state, action) => {
            state.action = action.payload;
        },
        setDoctorData: (state, action) => {
            state.selectedDoctor = action.payload;
        },
        setError: (state, action) => {
            state.errors = action.payload;
        },
        setSchedules: (state, action) => {
            state.schedules = action.payload;
        },
        setBooking: (state, action) => {
            state.booking = action.payload;
        },
        setWeekDay: (state, action) => {
            state.selectedWeekDay = action.payload;
        },
    },
    extraReducers: {
        [getDoctor.fulfilled]: doctorAdapter.setAll,
    },
});

export const {
    setAction,
    setDoctorData,
    setError,
    setWeekDay,
    setSchedules,
    setBooking,
} = doctorSlice.actions;

export default doctorSlice.reducer;
