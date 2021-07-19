import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import { setUserData } from './authReducer';

export const getPatient = createAsyncThunk(
    'patient/getAuth',
    async () =>
        new Promise(async (resolve, reject) => {
            const agent = await auth().currentUser;
            firestore()
                .collection('Patients')
                .where('agentId', '==', agent.uid)
                .get()
                .then((snapshot) => {
                    var tempCases = [];
                    snapshot.forEach((item) => {
                        tempCases.push(item.data());
                    });
                    resolve(tempCases);
                });
        }),
);

export const getPatientProfile = createAsyncThunk(
    'patient/getPatientProfile',
    async (uid) =>
        new Promise(async (resolve, reject) => {
            firestore()
                .collection('Patients')
                .doc(uid)
                .get()
                .then((snapshot) => {
                    resolve(snapshot.data());
                });
        }),
);

export const getCaseHistory = createAsyncThunk(
    'patient/getCaseHistory',
    () =>
        new Promise(async (resolve, reject) => {
            const uid = await auth().currentUser.uid;
            firestore()
                .collection('Cases')
                .where('patientInfo.patientId', '==', uid)
                .where('caseStatus', '>', 1)
                .get()
                .then((snapshot) => {
                    var tempPatients = [];
                    snapshot.forEach((item) => {
                        tempPatients.push(item.data());
                    });
                    resolve(tempPatients);
                });
        }),
);

export const getActiveCases = createAsyncThunk(
    'patient/getActiveCases',
    () =>
        new Promise(async (resolve, reject) => {
            const uid = await auth().currentUser.uid;
            firestore()
                .collection('Cases')
                .where('patientInfo.patientId', '==', uid)
                .where('caseStatus', '<=', 1)
                .get()
                .then((snapshot) => {
                    var tempPatients = [];
                    snapshot.forEach((item) => {
                        tempPatients.push(item.data());
                    });
                    resolve(tempPatients);
                });
        }),
);

export const bookDoctors = createAsyncThunk(
    'patient/bookDoctors',
    ({ doctor, cases, startTime, endTime }) =>
        new Promise(async (resolve, reject) => {
            cases.map((caseItem) => {
                firestore()
                    .collection('PCDoctors')
                    .doc(doctor.UID)
                    .collection('Schedule')
                    .doc(caseItem.caseId)
                    .set({
                        CaseReference: firestore()
                            .collection('Cases')
                            .doc(caseItem.caseId),
                        PatientAvatar: caseItem.patientInfo.avatar,
                        PatientName: caseItem.patientInfo.name,
                        PatientReference: firestore()
                            .collection('Patients')
                            .doc(caseItem.patientInfo.patientId),
                        CaseName: caseItem.notes[0].title,
                        DoctorReference: firestore()
                            .collection('PCDoctors')
                            .doc(doctor.UID),
                        StartTime: startTime,
                        EndTime: endTime,
                        DoctorName: doctor.Name,
                        PatientId: caseItem.patientInfo.patientId,
                        AgentId: caseItem.agentId,
                        BusinessId: caseItem.businessId,
                    })
                    .then(() => {
                        firestore()
                            .collection('Cases')
                            .doc(caseItem.caseId)
                            .update({
                                caseStatus: 2,
                                pcDoctorInfo: {
                                    ...doctor,
                                    DoctorReference: firestore()
                                        .collection('PCDoctors')
                                        .doc(doctor.UID),
                                },
                                schedule: {
                                    PatientAvatar: caseItem.patientInfo.avatar,
                                    PatientName: caseItem.patientInfo.name,
                                    PatientReference: firestore()
                                        .collection('Patients')
                                        .doc(caseItem.patientInfo.patientId),
                                    CaseName: caseItem.notes[0].title,
                                    DoctorReference: firestore()
                                        .collection('PCDoctors')
                                        .doc(doctor.UID),
                                    StartTime: startTime,
                                    EndTime: endTime,
                                    DoctorName: doctor.Name,
                                    PatientId: caseItem.patientInfo.patientId,
                                    AgentId: caseItem.agentId,
                                    BusinessId: caseItem.businessId,
                                },
                            })
                            .then(() => {
                                firestore()
                                    .collection('Patients')
                                    .doc(caseItem.patientInfo.patientId)
                                    .update({
                                        Schedule:
                                            firestore.FieldValue.arrayUnion(
                                                firestore()
                                                    .collection('PCDoctors')
                                                    .doc(doctor.UID)
                                                    .collection('Schedule')
                                                    .doc(caseItem.caseId),
                                            ),
                                    })
                                    .then(() => {
                                        firestore()
                                            .collection('Schedule')
                                            .doc(caseItem.caseId)
                                            .set({
                                                CaseReference: firestore()
                                                    .collection('Cases')
                                                    .doc(caseItem.caseId),
                                                PatientAvatar:
                                                    caseItem.patientInfo.avatar,
                                                PatientName:
                                                    caseItem.patientInfo.name,
                                                PatientReference: firestore()
                                                    .collection('Patients')
                                                    .doc(
                                                        caseItem.patientInfo
                                                            .patientId,
                                                    ),
                                                DoctorReference: firestore()
                                                    .collection('PCDoctors')
                                                    .doc(doctor.UID),
                                                CaseName:
                                                    caseItem.notes[0].title,
                                                StartTime: startTime,
                                                EndTime: endTime,
                                                DoctorName: doctor.Name,
                                                PatientId:
                                                    caseItem.patientInfo
                                                        .patientId,
                                                AgentId: caseItem.agentId,
                                                BusinessId: caseItem.businessId,
                                            })
                                            .then(() => {
                                                resolve(true);
                                            });
                                    });
                            });
                    });
            });
        }),
);

export const updatePatient = createAsyncThunk(
    'patient/updatePatient',
    async (data, { dispatch }) =>
        new Promise(async (resolve, reject) => {
            const patient = await auth().currentUser;
            firestore()
                .collection('Patients')
                .doc(patient.uid)
                .update({
                    ...data,
                })
                .then(() => {
                    // dispatch(setUserData(data));
                    resolve(true);
                });
        }),
);

export const getPatientSchedule = createAsyncThunk(
    'patient/getPatientSchedule',
    async (patientId, { dispatch }) =>
        new Promise(async (resolve, reject) => {
            firestore()
                .collection('Patients')
                .doc(patientId)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) resolve(snapshot.data().Schedule);
                });
        }),
);

const patientAdapter = createEntityAdapter({
    selectId: (item) => item.patientId,
});

export const {
    selectAll: selectPatient,
    selectEntities: selectPatientEntities,
    selectById: selectPatientById,
} = patientAdapter.getSelectors((state) => state.patient);

const patientSlice = createSlice({
    name: 'patient',
    initialState: patientAdapter.getInitialState({
        role: '',
        language: 'en-US',
        checked: false,
        userData: {},
        success: false,
        errors: [],
        startTime: '',
        endTime: '',
    }),
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setRememberMe: (state, action) => {
            state.checked = action.payload;
        },
        loginError: (state, action) => {
            state.success = false;
            state.errors = action.payload;
        },
        setTimeSlot: (state, action) => {
            state.startTime = action.payload.startTime;
            state.endTime = action.payload.endTime;
        },
    },
    extraReducers: {
        [getPatient.fulfilled]: patientAdapter.setAll,
    },
});

export const { setRole, setRememberMe, loginError, setTimeSlot } =
    patientSlice.actions;

export default patientSlice.reducer;
