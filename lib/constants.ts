export const EMAIL_VALIDATION = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
// Minimum eight characters,
// at least one letter, 
// at least one number, 
// and at least one special character
export const PASSWORD_VALIDATION = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
// not allowed to have the '@' symbol
export const USERNAME_VALIDATION = /^[^@]*$/;

export const CONFIRM_PASSWORD = 'confirm-password';
export const PASSWORD = 'password';