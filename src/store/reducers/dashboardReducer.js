import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

export const getCase = createAsyncThunk(
    'dashboard/dashboard/getAuth',
    async () =>
        new Promise(async (resolve, reject) => {
            const response = await axios.get('/api/file-manager-app/files');
            const data = await response.data;

            return data;
        }),
);

const dashboardAdapter = createEntityAdapter({});

export const {
    selectAll: selectCase,
    selectEntities: selectCaseEntities,
    selectById: selectCaseById,
} = dashboardAdapter.getSelectors((state) => state.dashboard);

const dashboardSlice = createSlice({
    name: 'dashboard/dashboard',
    initialState: dashboardAdapter.getInitialState({
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
        [getCase.fulfilled]: dashboardAdapter.setAll,
    },
});

export const { setRole, setRememberMe, setUserData, loginError } =
    dashboardSlice.actions;

export default dashboardSlice.reducer;
