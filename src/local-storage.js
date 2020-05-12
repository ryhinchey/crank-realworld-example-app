export const getAuthToken = () => localStorage.getItem('jwt');
export const setAuthToken = token => localStorage.setItem('jwt', token);