/**
 * Returns true is a string has a regular alphabetical character in it.
 * Else, returns false.
 */
 const hasLetter = ( val: string ) => {
    return /[a-zA-Z]/.test( val );
}

export default hasLetter;