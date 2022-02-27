
/* TYPES */
interface Props {
    className?: string;
    title?: string;
    ariaLabel?: string;
}

/**
 * Required symbol for input elements.
 */
const Required = ( {
    className='',
    title='This input is required!',
    ariaLabel='required symbol',
}: Props ) => {

    /* CLASSNAMES */
    const requiredClasses = `
        required
        ${className}
    `;

    return (
        <abbr title={title} aria-label={ariaLabel} 
            className={requiredClasses}>
            *
        </abbr>
    );
}

export default Required;