// dependencies
import { forwardRef, ReactNode } from 'react';

 /* TYPES */
export interface Props {
    children?: ReactNode;
    className?: string;
    color?: string;
    style?: { [ key: string ]: string } | {};
}

/**
 * Blurb.
 * Useful for showing more information on hover. 
 */
const Blurb = forwardRef<HTMLDivElement, Props>( ( {
    children,
    className='',
    color='green',
    style,
}, ref ) => {

    /* CLASSNAMES */
    const blurbClasses = `
        blurb
        ${color}
        ${className}
    `;

    return (
        <div ref={ref} className={blurbClasses} style={style}>
            {children}
        </div>
    )
});

export default Blurb;