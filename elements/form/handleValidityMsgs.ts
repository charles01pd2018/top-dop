// types
import type { Match } from './types';
// lib
import { aOrAn, toTitleCase, hasNumber, hasLetter,
    hasSpecialChar } from '../../lib';

/* TYPES */
export interface Options {
    match?: Match;
}

interface Content {
    value: string;
    type: string;
    name: string;
}

const handleTextInputValidityMsgs = (
    target: HTMLInputElement,
    content: Content,
    options: Options={},
) => {
    /* CONTENT */
    const { value, type, name } = content;
    const { match } = options;

    if ( value === '' )
        target.setCustomValidity( "Don't forget to fill this out!" );
    else if ( type === 'email' ) {
        if ( value.includes( '@' ) )
            target.setCustomValidity( `What comes after ${value} ?!` );
        else
            target.setCustomValidity( `Hmmm... ${value} does not have an @ in it...?` );
    }
    else if ( type === 'username' ) {
        if ( value.includes( '@' ) )
            target.setCustomValidity( "Usernames can't have the '@' symbol!" );
    }
    else if ( type === 'password' ) {
        if ( value.length < 8 )
            target.setCustomValidity( 'Password must be at least 8 characters!' );
        else if ( !hasNumber( value ) )
            target.setCustomValidity( 'Password must have at least one number!' );
        else if ( !hasLetter( value ) )
            target.setCustomValidity( 'Password must contain at least one letter!' );
        else if ( !hasSpecialChar( value ) )
            target.setCustomValidity( 'Password must contain as least one special character!' );
    }
    else if ( type === 'text' )
        target.setCustomValidity( `This dosen't look like ${aOrAn(name)} ${toTitleCase(name)}!`);
    else if ( match )
        target.setCustomValidity( `Input must match previous ${toTitleCase(match.name)} input!` )
}

export {
    handleTextInputValidityMsgs,
}