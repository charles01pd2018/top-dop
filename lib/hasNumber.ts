/**
 * Returns true is a string has a number in it, else false
 */
 const hasNumber = ( val: string ) => {
    return /\d/.test( val );
}

export default hasNumber;