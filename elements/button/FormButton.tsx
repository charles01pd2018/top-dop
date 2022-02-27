// elements
import Ripple from './Ripple';
import { Chevron } from '../icon';

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
    size='sm',
    color='blue',
    fill,
    isRounded=true,
    hover='glimmer',
    click='ripple',
}: Props ) => {

    /* CONTENT */
    const { text } = content;

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
            type={type} disabled={disabled} title={text}>
                <Chevron ariaLabel={text} />
            {
                click === 'ripple' && (
                    <Ripple />
                )
            }
        </button>
    );
}

export default FormButton;