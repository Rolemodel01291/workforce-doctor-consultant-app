import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { makeid } from '~/services/helpers';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { UserAPI } from '../../services/api';
import axios from 'axios';
import _, { reject } from 'lodash';

export const getCase = createAsyncThunk(
    'agent/getCase',
    async (agentId) =>
        new Promise((resolve, reject) => {
            firestore()
                .collection('Cases')
                .where('caseAgent.agentID', '==', agentId)
                .get()
                .then((snapShot) => {
                    var tempItem = [];
                    snapShot.forEach((item) => {
                        tempItem.push(item.data());
                    });
                    resolve(tempItem);
                });
        }),
);

export const getBookedCase = createAsyncThunk(
    'agent/getBookedCase',
    async (doctorId) =>
        new Promise((resolve, reject) => {
            firestore()
                .collection('PCDoctors')
                .doc(doctorId)
                .collection('BOOK')
                .get()
                .then((snapShot) => {
                    var tempItem = [];
                    snapShot.forEach((item) => {
                        tempItem.push(item.data());
                    });
                    resolve(tempItem);
                });
        }),
);

export const updateCasePatient = createAsyncThunk(
    'agent/addCasePatient',
    async (data, { dispatch }) =>
        new Promise((resolve, reject) => {
            firestore()
                .collection('Patients')
                .doc(data.patientId)
                .update({
                    ...data,
                })
                .then(async () => {
                    var patientReference = await firestore()
                        .collection('Patients')
                        .doc(data.patientId)
                        .collection('Patient')
                        .doc(data.patientId);

                    dispatch(
                        setPatientInfo({
                            ...data,
                            patientId: data.patientId,
                            patientReference: patientReference,
                        }),
                    );
                    resolve({ ...data });
                });
        }),
);

export const addCasePatient = createAsyncThunk(
    'agent/addCasePatient',
    async (data, { dispatch }) =>
        new Promise(async (resolve, reject) => {
            UserAPI.createAccount({
                email: data.email,
                displayName: data.name,
                password: '123456789',
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
                    ];
                    const response = [];
                    if (emailErrorCodes.includes(res.error.code)) {
                        response.push({
                            type: 'email',
                            message: res.error.message,
                        });
                    }

                    if (passwordErrorCodes.includes(res.error.code)) {
                        response.push({
                            type: 'password',
                            message: res.error.message,
                        });
                    }

                    dispatch(setError(response));

                    resolve({ ...res });
                } else {
                    const agent = await auth().currentUser;
                    firestore()
                        .collection('Patients')
                        .doc(res.uid)
                        .set({
                            ...data,
                            cases: [],
                            device_token: [],
                            patientId: res.uid,
                            phone: '',
                            businessId: '',
                            agentId: agent.uid,
                        })
                        .then(() => {
                            var patientReference = firestore()
                                .collection('Patients')
                                .doc(res.uid);

                            dispatch(
                                setPatientInfo({
                                    ...data,
                                    patientId: res.uid,
                                    patientReference: patientReference,
                                }),
                            );
                            resolve({ ...res });
                        });
                }
            });
        }),
);

export const addCase = createAsyncThunk(
    'agent/addCase',
    async (data, { dispatch }) =>
        new Promise(async (resolve, reject) => {
            const agent = await auth().currentUser;
            const caseId = makeid(28);
            firestore()
                .collection('Cases')
                .doc(caseId)
                .set({
                    ...data,
                    caseId,
                    agentId: agent.uid,
                })
                .then(() => {
                    firestore()
                        .collection('Patients')
                        .doc(data.patientInfo.patientId)
                        .update({
                            cases: firestore.FieldValue.arrayUnion({
                                isActive: false,
                                CaseReferance: firestore()
                                    .collection('Cases')
                                    .doc(caseId),
                                caseId,
                            }),
                        })
                        .then(() => {
                            dispatch(getCase(data.caseAgent.agentID)).then(
                                () => {
                                    resolve(true);
                                },
                            );
                        });
                });
        }),
);

export const updateCaseStatus = createAsyncThunk(
    'agent/updateCase',
    async (data, { dispatch }) =>
        new Promise(async (resolve, reject) => {
            firestore()
                .collection('Cases')
                .doc(data.caseId)
                .update({
                    caseStatus: data.caseStatus,
                })
                .then(() => {
                    dispatch(getCase(data.caseAgent.agentID)).then(() => {
                        resolve(true);
                    });
                });
        }),
);

export const updatePatientCaseFile = createAsyncThunk(
    'agent/updateCase',
    async (data, { dispatch }) =>
        new Promise(async (resolve, reject) => {
            firestore()
                .collection('Cases')
                .doc(data.caseId)
                .update({
                    patientUploadFile: firestore.FieldValue.arrayUnion(data),
                })
                .then(() => {
                    // dispatch(getCase(data.caseAgent.agentID)).then(() => {
                    resolve(true);
                    // });
                });
        }),
);

export const updatePatientFileStatus = createAsyncThunk(
    'agent/updateCase',
    async ({data, caseId}, { dispatch }) =>
        new Promise(async (resolve, reject) => {
            firestore()
                .collection('Cases')
                .doc(caseId)
                .update({
                    patientUploadFile: data,
                })
                .then(() => {
                    // dispatch(getCase(data.caseAgent.agentID)).then(() => {
                    resolve(true);
                    // });
                });
        }),
);

export const saveCaseFile = createAsyncThunk(
    'agent/saveCaseFile',
    async (data, { dispatch }) =>
        new Promise(async (resolve, reject) => {
            firestore()
                .collection('Cases')
                .doc(data.caseId)
                .update({
                    CaseFiles: data.CaseFiles,
                })
                .then(() => {
                    // dispatch(getCase(data.caseAgent.agentID)).then(() => {
                    resolve(true);
                    // });
                });
        }),
);

export const getActiveCases = createAsyncThunk(
    'agent/getActiveCases',
    () =>
        new Promise(async (resolve, reject) => {
            const uid = await auth().currentUser.uid;

            firestore()
                .collection('Cases')
                .where('agentId', '==', uid)
                .where('caseStatus', '<=', 1)
                .get()
                .then((snapshot) => {
                    var tempPatients = [];
                    console.log(uid);
                    snapshot.forEach((item) => {
                        tempPatients.push(item.data());
                    });
                    resolve(tempPatients);
                });
        }),
);

export const bookDoctors = createAsyncThunk(
    'agent/bookDoctors',
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
                        StartTime: startTime,
                        EndTime: endTime,
                        DoctorName: doctor.Name,
                        PatientId: caseItem.patientInfo.patientId,
                        AgentId: caseItem.agentId,
                        BusinessId: caseItem.businessId,
                        DoctorReference: firestore()
                            .collection('PCDoctors')
                            .doc(doctor.UID),
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
                                    StartTime: startTime,
                                    EndTime: endTime,
                                    DoctorName: doctor.Name,
                                    PatientId: caseItem.patientInfo.patientId,
                                    AgentId: caseItem.agentId,
                                    BusinessId: caseItem.businessId,
                                    DoctorReference: firestore()
                                        .collection('PCDoctors')
                                        .doc(doctor.UID),
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
                                                    CaseName: caseItem.notes[0].title,
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

export const getSchedule = createAsyncThunk(
    'agent/getSchedule',
    async () =>
        new Promise(async (resolve, reject) => {
            const agent = await auth().currentUser;
            firestore()
                .collection('Schedule')
                .where('AgentId', '==', agent.uid)
                .get()
                .then((snapShot) => {
                    var temp = [];
                    snapShot.forEach((item) => {
                        temp.push(item.data());
                    });
                    resolve(temp);
                });
        }),
);

export const getPatientFiles = createAsyncThunk(
    'agent/getSchedule',
    async (caseId) =>
        new Promise(async (resolve, reject) => {
            const agent = await auth().currentUser;
            firestore()
                .collection('Cases')
                .doc(caseId)
                .get()
                .then((snapShot) => {
                    resolve(snapShot.data().patientUploadFile);
                });
        }),
);

export const getPatient = createAsyncThunk(
    'agent/getPatient',
    async (patientId) =>
        new Promise(async (resolve, reject) => {
            
            firestore()
                .collection('Patients')
                .doc(patientId)
                .get()
                .then((snapShot) => {
                    resolve(snapShot.data());
                });
        }),
);

export const getCaseFile = createAsyncThunk(
    'agent/getCaseFile',
    async (caseId) =>
        new Promise(async (resolve, reject) => {
            
            firestore()
                .collection('Cases')
                .doc(caseId)
                .get()
                .then((snapShot) => {
                    resolve(snapShot.data());
                });
        }),
);

const agentAdapter = createEntityAdapter({
    selectId: (item) => item.caseId,
});

export const {
    selectAll: selectCase,
    selectEntities: selectCaseEntities,
    selectById: selectCaseById,
} = agentAdapter.getSelectors((state) => state.agent);

const agentSlice = createSlice({
    name: 'agent',
    initialState: agentAdapter.getInitialState({
        action: '',
        selectedCase: {},
        selectedPatient: {},
        errors: [],
        case: {
            CaseFiles: [],
            InsuranceInfo: {},
            attorneyInfo: {},
            notes: [],
            patientInfo: {},
            patientUploadFile: [],
        },
        detailNote: {},
        selectedCases: [],
        openDialog: false,
    }),
    reducers: {
        setAction: (state, action) => {
            state.action = action.payload;
        },
        setCase: (state, action) => {
            state.selectedCase = action.payload;
        },
        setPatient: (state, action) => {
            state.selectedPatient = action.payload;
        },
        setError: (state, action) => {
            state.errors = action.payload;
        },
        setCaseFile: (state, action) => {
            state.case = {
                ...state.case,
                CaseFiles: [action.payload, ...state.case.CaseFiles],
            };
            // state.selectedCase = {
            //     ...state.selectedCase,
            //     CaseFiles: [action.payload, ...state.selectedCase.CaseFiles],
            // };
        },
        setPatientCaseFile: async (state, action) => {
            state.selectedCase = {
                ...state.selectedCase,
                patientUploadFile: action.payload,
            };
        },
        setDetailCaseFile: (state, action) => {
            state.case.CaseFiles = action.payload;
        },
        setInsuranceInfo: (state, action) => {
            state.case.InsuranceInfo = action.payload;
        },
        setAttorneyInfo: (state, action) => {
            state.case.attorneyInfo = action.payload;
        },
        setNotes: (state, action) => {
            const existNote = state.case.notes.filter(
                (o) => o.authorId === action.payload.authorId,
            );
            if (existNote.length > 0) {
                _.map(state.case.notes, (stateItem, index) => {
                    if (stateItem.authorId === action.payload.authorId) {
                        state.case.notes[index] = action.payload;
                    }
                });
            } else {
                state.case.notes = [action.payload, ...state.case.notes];
            }
        },
        setPatientInfo: (state, action) => {
            state.case.patientInfo = action.payload;
        },
        setDetailNote: (state, action) => {
            state.detailNote = action.payload;
        },
        setCleanCase: (state, action) => {
            state.case = {
                CaseFiles: [],
                InsuranceInfo: {},
                attorneyInfo: {},
                notes: [],
                patientInfo: {},
            };
        },
        setSeletedCases: (state, action) => {
            state.selectedCases = action.payload;
        },
        setOpenDialog: (state, action) => {
            state.openDialog = action.payload;
        },
    },
    extraReducers: {
        [getCase.fulfilled]: agentAdapter.setAll,
    },
});

export const {
    setAction,
    setCase,
    setPatient,
    setError,
    setCaseFile,
    setInsuranceInfo,
    setAttorneyInfo,
    setNotes,
    setPatientInfo,
    setCleanCase,
    setDetailCaseFile,
    setDetailNote,
    setPatientCaseFile,
    setSeletedCases,
    setOpenDialog,
} = agentSlice.actions;

export default agentSlice.reducer;
