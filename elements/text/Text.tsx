// types
import type { JSXElementConstructor } from 'react';

/* TYPES */
interface Content {
    text: string;
}

interface Props {
    className?: string;
    Component: string | JSXElementConstructor<any>;
    content: Content;
}

const Text = ( {
    className='',
    Component,
    content: {
        text,
    }
}: Props ) => {

    const textClasses = `
        text-wrapper
        ${className}
    `;

    return (
        <Component className={textClasses}>
            {text}
        </Component>
    )
}

export default Text;