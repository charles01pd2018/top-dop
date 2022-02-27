
interface Props {
    // customization
    wrapperClassName?: string;
    className?: string;
    // styling
    isRounded?: boolean;
    direction?: 'left' | 'right' | 'up' | 'down';
    transition?: 'flip' | 'x-out';
    // states
    isActive?: boolean;
    // accessibility
    ariaLabel: string;
}

/**
 * Chevron Icon
 */
const Chevron = ( {
    wrapperClassName='',
    className='',
    isRounded=true,
    transition='flip',
    direction='up',
    isActive,
    ariaLabel,
}: Props ) => {

    const chevronWrapperClasses = `
        chevron-wrapper
        ${wrapperClassName}
    `;

    const chevronClasses = `
        chevron
        ${isRounded ? 'rounded' : ''}
        ${transition}
        ${direction}
        ${isActive ? 'active': 'not-active'}
        ${className}
    `;

    return (
        <div className={chevronWrapperClasses}>
            <span className={chevronClasses} 
                role='presentation' aria-label={ariaLabel} />
        </div>
    )
}

export default Chevron;