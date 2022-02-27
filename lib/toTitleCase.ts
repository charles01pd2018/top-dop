/**
 * Converts a string to title case (first letter capitilized)
 */
 const toTitleCase = ( value: string ) => {
    let titleCaseString: string = '';
    const stringArray = value.split( ' ' );

    stringArray.forEach( ( val ) => {
        titleCaseString += val.charAt( 0 ).toUpperCase() + val.slice( 1 );
    } );

    return titleCaseString;
}

export default toTitleCase;