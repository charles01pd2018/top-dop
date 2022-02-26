// types
import type { FC } from 'react';

/* TYPES */
interface Props {
    id: string;
    className?: string;
}

const Container: FC<Props> = ( {
    children,
    id,
    className='',
} ) => {

    const containerClasses = `
        container-wrapper
        container
        ${className}
    `;

    return (
        <section id={id} className={containerClasses} >
            {children}
        </section>
    )
}

export default Container;