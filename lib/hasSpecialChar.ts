/**
 * Returns true is a string contains a special character
 * Else, returns false.
 */
 const hasSpecialChar = ( val: string ) => {
    return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test( val );
}

export default hasSpecialChar;