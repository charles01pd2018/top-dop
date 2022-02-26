// dependencies
import { useEffect, useRef } from 'react';

/**
 * Extenstion of the useEffect hook.
 * Skips initial component mounting when a non-empty dependency array is specified.
 * Otherwise, useAfterEffect functions the same as useEffect.
 */
const useAfterEffect = ( 
    fn: ( ...args: any ) => void,
    dep: ( any[] | undefined )=undefined,
) => {
    
    /* HOOKS */
    const isFirstRender = useRef<boolean>( true );

    if ( Array.isArray( dep ) && dep.length === 0 )
        useEffect( fn, dep );
    else
        useEffect( () => {
            if ( isFirstRender.current )
                isFirstRender.current = false;
            else 
                fn();
        }, dep );
}

export default useAfterEffect;