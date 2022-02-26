// dependencies
import { ReactNode, isValidElement } from 'react';

/* TYPES */
export type Element = 'primitive' | 'HTMLElement' | 'JSXElement';

export interface Options {
    // when provided, the HTML tag of the child is checked to match the element names array
    // if a match is found, the element name will be returned
    // by default when elementNames is not speciifed, all JSXElement names will be returned
    // overrides match Element array
    elementNames?: string[] | undefined;
    // array of potential element children that are allowed to be rendered
    match?: Element[];
}

/**
 * Validates that a child is valid.
 * Ensures that a configuration object can be passed to a custom JSX Element when elementNames is provided.
 */
const validateChild = (
    child: ReactNode,
    options: Options={},
): ( boolean | string ) => {

    /* CONTENT */
    const { elementNames, match=[ 'HTMLElement', 'JSXElement' ] } = options;

    /* PRIMITIVES */
    if ( typeof child === 'string' || typeof child === 'number' )
        return match.includes( 'primitive' ) ? true : false;

    if ( isValidElement( child ) ) {
        const type = child.type;

        /* HTML ELEMENT */
        if ( typeof type === 'string' ) 
            return match.includes( 'HTMLElement' ) ? true : false;
        
        /* JSX ELEMENT */
        if ( typeof type === 'function' ) {
            const displayName = type.name;
            
            if ( elementNames ) {
                if ( elementNames.includes( displayName ) )
                    return elementNames.includes( displayName ) ? displayName : false;
            }
            else if ( match.includes( 'JSXElement' ) )
                return displayName;
        }
    }

    // the child is either null or undefined value
    return false;
}

export default validateChild;