// dependencies
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
// types
import { MouseEvent } from 'react';

/* TYPES */
interface Props {
    className?: string;
    duration?: number;
}

/**
 * Ripple effect for FormButton OnClick
 */
const Ripple = ( {
    className,
    duration=500,
 }: Props ) => {
   
    /* TYPES */
    interface Styles {
        top: string;
        left: string;
        width: string;
        height: string;
    };

    /* HOOKS */
    const [ styles, setStyles ] = useState<Styles[]>( [] );

    /* CLASSNAMES */
    const rippleClasses = `
        ripple-wrapper
        ${className}
    `;

    /* FUNCTIONS */
    const handleRippleClick = ( event: MouseEvent<HTMLDivElement> ) => {
        const target = event.currentTarget as HTMLDivElement;

        const rippleContainer = target.getBoundingClientRect();
        const { width, height } = rippleContainer;
        // idk what this does
        const size = width > height ? width : height;
        // x and y clicks relative to the ripple div
        const xClick = event.pageX - rippleContainer.x - ( size / 2 );
        const yClick = event.pageY - rippleContainer.y - ( size / 2 );

        const newStyles = {
            top: yClick + 'px',
            left: xClick + 'px',
            width: size + 'px',
            height: size + 'px',
            animationDuration: duration + 'ms',
        };

        // push new click onto the styles state
        setStyles( ( styles ) => {
            return [ ...styles, newStyles ];
        } );
    }

    const cleanupRipples = useDebouncedCallback( 
        () => setStyles( [] ),
        duration * 1.5,
    )

    return (
        <div className={rippleClasses} 
            role='presentation' tabIndex={-1}
            onClick={handleRippleClick}
            onPointerUp={cleanupRipples}>
            {
                styles.length > 0 && (
                    styles.map( ( style, index ) => {
                        return (
                            // DO NOT CHANGE THE KEY - having it as index is vital
                            <span key={index} className='ripple' 
                                style={style} />
                        )
                    } )
                )
            }
        </div>
    )
}

export default Ripple;