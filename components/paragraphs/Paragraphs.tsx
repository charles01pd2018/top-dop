
/* TYPES */
interface Content {
    text: string;
}

interface Props {
    id: string;
    className?: string;
    content: Content;
}

const Paragraphs = ( {
    id,
    className='',
    content: {
        text,
    }
}: Props ) => {
    
    const paragraphsClasses = `
        paragraphs-wrapper
        ${className}
    `;

    return (
        <section id={id} className={paragraphsClasses}>
            <p>{`Regular: ${text}`}</p>
            <p className='text-norm'>{`Text Normal: ${text}`}</p>
            <p className='text-sm'>{`Text Small: ${text}`}</p>
            <p className='text-xs'>{`Text Extra Small: ${text}`}</p>
            <p className='text-xxs'>{`Text Extra Extra Small: ${text}`}</p>
        </section>
    );
}

export default Paragraphs;