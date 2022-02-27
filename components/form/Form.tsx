// dependencies
import { FC, FormEvent, Children, cloneElement, ReactElement, 
    useMemo, useState, useEffect, useRef } from 'react';
// lib
import { validateChild, isObjectEmpty, PASSWORD } from 'lib';
// utils
import checkValid from './checkValid';
// partial functions
import initForm from './initForm';
import transformData from './transformData';
// types
import type { FormData, TransformedFormData } from 'types';
import type { TextInputConfig, ConditionalDisabled, DisabledInputs,
    InitialValues, FocusedInput, Cache } from './types';
import type { TextInputProps } from 'elements/form/types';


/* TYPES */
export type OnSubmit<T extends object = any> =
    ( input: TransformedFormData<T> ) => 
    ( Promise<boolean | undefined | void> ) | ( boolean | undefined | void );

interface ButtonProps {
    buttonContent: {
        text: string;
    };
    buttonAriaLabel: string;
    buttonClassName?: string;
    size?: 'sm' | 'md' | 'lg';
    color?: 'brand-blue' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink';
    fill?: 'gradient';
    isRounded?: boolean;
    hover?: 'lift' | 'press' | 'pulse' | 'glimmer';
    click?: 'ripple';
}

export interface Props {
    id: string;
    className?: string;
    name: string;
    // data
    initialValues?: InitialValues; // overrides any values placed in input child content prop
    conditionalDisabled?: ConditionalDisabled;
    onSubmit: OnSubmit;
    cache?: Cache;
    // styling
    showSubmitAnimation?: boolean;
    buttonProps: ButtonProps;
    // customization
    autoFocus?: string; // which input element to focus (based off DOM structure)
    keepFocus?: boolean; // keeps focus on the last focused input element after the form is submitted
}

/**
 * Form wrapper component.
 * Handles form data to submit. 
 * EVERY CHILD NAME ATTRIBUTE MUST BE UNIQUE AS THEY ACT AS THE KEY WITHIN THE OBJECT.
 */
const Form: FC<Props> = ( {
    children,
    id,
    className='',
    name,
    initialValues={},
    onSubmit,
    cache={},
    showSubmitAnimation=true,
    buttonProps,
    conditionalDisabled={},
    autoFocus,
    keepFocus,
} ) => {
    /* CONTENT */
    const { buttonContent, 
        buttonAriaLabel, 
        buttonClassName='',
        ...restButtonProps
    } = buttonProps;

    const { updateCache, cacheFormData } = cache;

    // TO-DO - this is being run EVERYTIME - causing us to map through the input children twice every time
    const { initialFormData, 
        canFormSubmit, 
        initialDisabled,
        expandedConditionalDisabled,
    } = useMemo( () => initForm( children, { 
        initialValues,
        conditionalDisabled,
        cacheFormData,
    } ), [] );

    /* ERRORS */
    // TO-DO - implement conditionalDisabled errors check
    // should not have the key within the disabled input array -> i.e: { 0: [ 0, 1 ] }

    /* HOOKS */
    // form states
    const focusedInput = useRef<HTMLInputElement>( null ) as FocusedInput;
    const [ formData, setFormData ] = useState<FormData>( initialFormData );
    const [ isFormComplete, setIsFormComplete ] = useState<boolean>( canFormSubmit );
    const [ disabledInputs, setDisabledInputs ] = useState<DisabledInputs>( initialDisabled );
    // submitting states
    const [ isSubmitting, setIsSubmitting ] = useState<boolean>( false );
    const [ formReturn, setFormReturn ] = useState<'success' | 'fail' | null>( null );

    /* FUNCTIONS */
    const disableAllInputs = () => {
        // getting all the formData keys and adding them to a new array
        const formElementsArray = 
            ( Object.keys( cacheFormData ? cacheFormData : formData ) )
            .map( ( key ) => {
            return key;
        } );

        setDisabledInputs( new Set( formElementsArray ) );

        return disabledInputs;
    }

    const clearForm = ( resetValues: boolean=true ) => {
        const { initialFormData: resetFormData, 
            canFormSubmit,
            initialDisabled, 
        } = initForm( children, {
                initialValues,
                ignoreChildValues: true,
                conditionalDisabled,
                setTouched: true,
            } );

        if ( resetValues ) {
            if ( updateCache )
                updateCache( resetFormData );
            else
                setFormData( resetFormData );

            setIsFormComplete( canFormSubmit );
        }

        setDisabledInputs( initialDisabled );
    }

    const onFormSubmit = async ( event: FormEvent, data: FormData ) => {
        event.preventDefault();

        setIsSubmitting( true );
        const prevDisabled = disableAllInputs();

        const didFormSubmit = await onSubmit( transformData( data ) );

        if ( didFormSubmit === false )
            setDisabledInputs( prevDisabled );
        else
            clearForm();

        if ( showSubmitAnimation ) {
            setFormReturn( didFormSubmit ? 'success' : 'fail' );
            setTimeout( () => setFormReturn( null ), 1000 );
        }

        if ( keepFocus ) {
            const input = focusedInput.current;

            if ( input )
                input.focus();
        }

        setIsSubmitting( false );
    }

    const checkFormStatus = ( 
        checkDisabled: boolean,
    ) => {
        let canSubmit = true;
        const newDisabledInputs: Set<string> = new Set();

        ( Object.entries( cacheFormData ? cacheFormData : formData ) )
            .forEach( ( [ name, rawInput ] ) => {
            const isValid = rawInput.isValid;
            const childInputs = expandedConditionalDisabled[ name ];

            if ( !isValid ) {
                canSubmit = false; 
                if ( checkDisabled && childInputs )
                    childInputs.forEach( input => newDisabledInputs.add( input ) );
            }
        } );

        setIsFormComplete( canSubmit );
        if ( checkDisabled )
            setDisabledInputs( newDisabledInputs );
    }

    /* CLASSNAMES */
    const formClasses = `
        form
        ${className}
    `;
    
    // check form status on initial render - this is for if default values are specificed
    useEffect( () => {
        checkFormStatus( !isObjectEmpty( conditionalDisabled ) );
    }, [] );
    
    return (
        <form id={id} className={formClasses} name={name}
            onSubmit={( event: FormEvent ) => onFormSubmit( event, formData )}>
            {
                Children.map( children, ( child ) => {
                    const actualFormData = cacheFormData ? cacheFormData : formData;
                    console.log("cache " + cacheFormData);
                    console.log("actual form " + actualFormData);

                        const inputChild = child as ReactElement<TextInputProps>;
        
                        const type = inputChild.props.type;
                        if ( updateCache && type === PASSWORD )
                            throw( SyntaxError( 'Password inputs are not allowed to be in cached forms' ) );
                        console.log("check1: " + formData[inputChild.props.name || type]);
                        const name = inputChild.props.name || type;
                        const prevContent = inputChild.props.content;
                        const inputData = actualFormData[ name ];
                        console.log( inputData );
                        const resetTouched = inputData?.resetTouched;
        
                        const config: TextInputConfig = {
                            content: {
                                ...prevContent,
                                value: inputData.value,
                            },
                            checkFormStatus,
                            checkValid,
                            isValid: inputData.isValid,
                        }

                        if ( updateCache )
                            config.cache = {
                                updateCache,
                                formData: actualFormData,
                            }
                        else
                            config.onChange = setFormData;
                        if ( resetTouched )
                            config.resetTouched = true;
                        if ( keepFocus )
                            config.focusedInput = focusedInput;
                        if ( disabledInputs.has( name ) )
                            config.disabled = true;
                        if ( conditionalDisabled[ name ] )
                            config.isParentDisabled = true;
                        if ( autoFocus === name )
                            config.autoFocus = true;

                        return cloneElement( inputChild, config );
                } )
            }
        </form>
    )
}

export default Form;