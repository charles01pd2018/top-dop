// dependencies
import { useState, useRef, ChangeEvent, useEffect } from 'react';
// hooks
import { useAfterEffect } from '../../hooks';
// lib
import { toTitleCase } from '../../lib';
// elements
import Blurb from './Blurb';
// partials
import Required from './Required';
import { handleTextInputValidityMsgs } from './handleValidityMsgs';
// constants
import { EMAIL_VALIDATION, PASSWORD_VALIDATION,
    USERNAME_VALIDATION } from 'lib';
// types
import type { SetFormData } from 'types';
import type { TextInputTypes, Match, InputCache } from './types';
import type { CheckValid, FocusedInput } from 'components/form/types';


/* TYPES */
// TO-DO - implement Conditional Props
// TO-DO - implement Pick keyword to show that either cache of onChange needs to be specified
export interface Content {
    label?: string;
    value?: string;
    placeholder?: string;
}

export interface Props {
    // customization
    id?: string;
    className?: string;
    name?: string;
    content?: Content;
    type: TextInputTypes;
    // event handlers
    onChange?: SetFormData;
    checkFormStatus?: ( checkDisabled: boolean ) => void;
    checkValid?: CheckValid;
    cache?: InputCache;
    // states
    isValid?: boolean;
    required?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    isParentDisabled?: boolean; // whether other input relies on this input for its disabled attribute
    match?: Match; // if match is specfied, this input MUST equal the match value
    resetTouched?: true;
    focusedInput?: FocusedInput;
    // limitations
    pattern?: RegExp; // will override default pattern checking from type specification
    maxLength?: number;
    // styling
    isRounded?: boolean;
    animate?: boolean; // toggle animate to disabled ALL animations
    animateInput?: boolean;
    animateNotValid?: boolean;
    animateLabel?: boolean;
    showValid?: boolean;
    showRequired?: boolean;
}

/**
 * Text Input.
 */
const TextInput = ( {
    id,
    className='',
    content={},
    name,
    type,
    onChange,
    checkFormStatus,
    checkValid,
    cache,
    required,
    isValid,
    disabled=false,
    autoFocus=false,
    isParentDisabled,
    match,
    resetTouched,
    focusedInput,
    pattern,
    maxLength=100,
    isRounded=true,
    animate=true,
    animateInput=true,
    animateNotValid=true,
    animateLabel=true,
    showValid=true,
    showRequired=true,
    ...rest
}: Props ) => {

    // look into datalist
    /* CONTENT */
    const { label, placeholder='', value='' } = content;

    // by default we assume parameters for type='text'
    let inputID = id;
    let inputType = type;
    let inputName = name;
    let inputLabel = label;
    let inputPlaceholder  = placeholder;
    let inputRequired = required;
    let inputPattern = pattern;

    if ( type === 'username' || type === 'email' || type ==='password' ) {
        inputID = id !== undefined ? id : type;
        inputType = type === 'username' ? 'text' : type;
        inputName = name !== undefined ? name : type;
        inputLabel = label !== undefined ? label : toTitleCase( type );
        inputRequired = required !== undefined ? required : true;

        if ( type === 'username' ) {
            inputPlaceholder = 'doggie69'
            inputPattern = pattern !== undefined ? pattern : USERNAME_VALIDATION;
        }
        else if ( type === 'email' ) {
            inputPlaceholder = 'example@website.com'
            inputPattern = pattern !== undefined ? pattern : EMAIL_VALIDATION;
        }
        else if ( type === 'password' ) {
            inputPattern = pattern !== undefined ? pattern : PASSWORD_VALIDATION;
            inputPlaceholder = '********';
        }
    }
    else if ( type === 'text' ) {
        inputID = id !== undefined ? id : name;
        inputRequired = required !== undefined ? required : false;
    }

    /* ERRORS - these can be removed in production */ 
    if ( inputID === undefined )
        throw( SyntaxError( 'If type is text, an ID must be provided for the input' ) );

    if ( inputName === undefined )
        throw( SyntaxError( 'If type is text, a name must be provided for the input' ) );
        
    if ( inputLabel === undefined )
        throw( SyntaxError( 'If type is text, a name must be provided for the input for accessibility purposes' ) );

    if ( onChange === undefined && cache === undefined )
        throw( SyntaxError( 'onChange function or cache not specified - use built in Form OR CacheForm wrapper component' ) );

    if ( checkFormStatus === undefined )
        throw( SyntaxError( 'checkFormStatus function not specified - use built in Form wrapper component' ) );
    
    if ( checkValid === undefined )
        throw( SyntaxError( 'checkValid function not specified - use built in Form wrapper component' ) );

    if ( isValid === undefined )
        throw( SyntaxError( 'isValid value not specified - use built in Form wrapper component' ) );

    /* FUNCTIONS */
    const setFormState = ( 
        newValid: boolean,
        newValue?: string,
    ) => {
        const newInputData = {
            [ inputName as string ]: {
                value: typeof newValue === 'string' ? newValue : value,
                isValid: newValid,
            }
        }

        if ( onChange )
            onChange( ( state ) => {
                return {
                    ...state,
                    ...newInputData,
                }
            } );

        if ( cache )
            cache.updateCache( {
                ...cache.formData,
                ...newInputData,
            } );
    }

    const handleChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        const newValue = event.target.value;
        const newValid = inputRequired ? 
            checkValid( newValue, inputPattern, { match } ) : true;

        setFormState( newValid, newValue );
    }
    
    const handleBlur = () => {
        setTouched( true );
        setFocused( false );
        setActualPlaceholder( originalPlaceholder.current );
    }

    const handleFocus = () => {
        setFocused( true );
        setActualPlaceholder( '' );
        if ( focusedInput )
            focusedInput.current = inputRef.current;
    }

    const handleValidityMsgs = () => {
        if ( inputRequired && !isValid ) {
            const target = inputRef.current as HTMLInputElement;
            const content = { value, type, name: inputName as string };
            handleTextInputValidityMsgs( target, content, { match } );
        }
    }

    /* HOOKS */
    const inputRef = useRef<HTMLInputElement>( null );
    const originalPlaceholder = useRef<string>( inputPlaceholder );
    const [ touched, setTouched ] = useState<boolean | null>( false ); 
    const [ focused, setFocused ] = useState<boolean>( autoFocus ? true : false );
    const [ actualPlaceholder, setActualPlaceholder ] = useState<string>( 
        originalPlaceholder.current );

    /* CLASSNAMES */
    const isValidClasses = isValid ? 'valid' : 'not-valid';

    const textInputWrapperClasses = `
        input-wrapper
        text-input-wrapper
        ${animate && animateInput ? 'animate' : ''}
        ${isRounded ? 'rounded' : ''}
        ${disabled ? 'disabled' : 'not-disabled'}
        ${touched ? 'touched' : 'not-touched'}
        ${inputRequired ? 'required' : 'not-required'}
        ${isValidClasses}
        ${isParentDisabled ? 'parent-conditional' : ''}
        ${focused ? 'focused' : 'not-focused'}
        ${className}
    `;

    const textInputClasses = `
        input
        text-input
        ${animate && animateNotValid ? 'animate' : ''}
        ${inputType}
    `;

    const labelClasses = `
        label
        text-input-label
        ${animate && animateLabel ? 'animate' : ''}
    `;

    // check the form status everytime isValid changes EXCEPT on initial render
    useAfterEffect( () => {
        checkFormStatus( isParentDisabled ? isParentDisabled : false );

        if ( isValid )
            inputRef.current?.setCustomValidity( '' );
    }, [ isValid ] );

    useAfterEffect( () => {
        if ( resetTouched )
            setTouched( false );
    }, [ resetTouched ] );

    useEffect( () => {
        handleValidityMsgs();
    } );

    useEffect( () => {
        if ( autoFocus && focusedInput )
            focusedInput.current = inputRef.current;
    }, [] );

    if ( match ) {
        useAfterEffect( () => {
            const newValid = inputRequired ? checkValid( value, inputPattern, { match } ) : true;

            if ( newValid !== isValid )
                setFormState( newValid );
        } );
    }
   
    return (
        <div className={textInputWrapperClasses}>
            <label className={labelClasses} htmlFor={inputID}>
                <div className='text'>
                    {inputLabel}
                    {
                        showRequired && inputRequired && (
                            <Required />
                        )
                    }
                </div>
                {
                    animate && showValid && (
                        <div className='valid-icon' role='presentation' 
                            aria-label={`${inputName} ${isValidClasses} icon`} 
                            aria-hidden={!touched && !focused}>
                            {isValid ? ' ✓' : ' ✖'}
                            {
                                inputRef.current?.validationMessage !== '' &&
                                !isValid && (
                                    <Blurb className='text-input-blurb' 
                                        color={isValid ? 'green' : 'pink'}>
                                        {inputRef.current?.validationMessage}
                                    </Blurb>
                                )
                            }
                        </div>
                    )
                }
            </label>
            <input ref={inputRef} id={inputID} className={textInputClasses} type={inputType}
                onChange={handleChange} onBlur={() => handleBlur()}
                onFocus={() => handleFocus()} placeholder={actualPlaceholder}
                name={inputName} value={value} required={inputRequired}
                disabled={disabled} autoFocus={autoFocus} maxLength={maxLength}
                autoComplete='off' {...rest} />
        </div>
    )
}

export default TextInput;