import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
    email: localStorage.getItem('email') || null,
    isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, role, email } = action.payload;
            state.token = token;
            state.role = role;
            state.email = email;
            state.isAuthenticated = true;
            
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('email', email);
        },
        logout: (state) => {
            state.token = null;
            state.role = null;
            state.email = null;
            state.isAuthenticated = false;
            
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('email');
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
