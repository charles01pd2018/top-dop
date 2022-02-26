// elements
import Ripple from './Ripple';


/* TYPES */
export interface Content {
    text: string;
}

interface Props {
    // customization
    className?: string;
    content: Content;
    // button states / accessibility
    isDisabled?: boolean;
    ariaLabel?: string;
    // styling
    type?: 'submit' | 'reset';
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    fill?: 'gradient';
    isRounded?: boolean;
    hover?: 'lift' | 'press' | 'pulse' | 'glimmer';
    click?: 'ripple';
}

/**
 * Submit and Reset Button for Forms.
 */
const FormButton = ( {
    className='',
    content,
    isDisabled=false,
    ariaLabel,
    type='submit',
    size='md',
    color='blue',
    fill,
    isRounded=true,
    hover='glimmer',
    click='ripple',
}: Props ) => {

    /* CONTENT */
    const { text } = content;

    /* ACCESSIBILITY */
    const loaderAriaLabel = `${ariaLabel} loader`;
    const successAriaLabel = `${ariaLabel} submitted`;
    const failAriaLabel = `${ariaLabel} failed to submit`;

    const disabled = isDisabled;

    /* CLASSNAMES */
    const buttonClasses = `
        button-wrapper
        form-button-wrapper
        ${className}
        ${color}
        button--${size}
        ${disabled ? 'disabled' : ''}
        ${fill}
        ${isRounded ? 'rounded' : ''}
        ${hover}
        ${click !== 'ripple' && click}
    `;

    return (
        <button className={buttonClasses} aria-label={ariaLabel}
            type={type} disabled={disabled}>
            <span className='form-button-text'>{text}</span>
            {
                click === 'ripple' && (
                    <Ripple />
                )
            }
        </button>
    );
}

export default FormButton;