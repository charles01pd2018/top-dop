// types
import type { MutableRefObject } from 'react';
import type { SetFormData, FormData, UpdateCache } from 'types';
import type { CheckValid } from './checkValid';
import type { OnSubmit as FormOnSubmit } from './Form';
import type { InputCache } from 'elements/form/types';


// key represents the name of parent input element that other input elements rely on
// the value represents an array of disabled elements IF the given key is inValid
// all disabled elements are considered child inputs and MUST COME AFTER than the key specified (parent)
type ConditionalDisabled = {
    [ name: string ]: string[];
}

type InitialValues = {
    [ name: string ]: string;
}

type DisabledInputs = Set<string>;

type CheckFormStatus = ( checkDisabled: boolean ) => void;

type FocusedInput = MutableRefObject<HTMLInputElement| null>;


interface Cache {
    updateCache?: UpdateCache<FormData>;
    cacheFormData?: FormData;
}

interface Content {
    label?: string;
    value?: string;
    placeholder?: string;
}

interface TextInputConfig {
    onChange?: SetFormData;
    content: Content;
    checkFormStatus: CheckFormStatus;
    checkValid: CheckValid;
    isValid: boolean;
    cache?: InputCache;
    focusedInput?: FocusedInput;
    disabled?: boolean;
    isParentDisabled?: boolean;
    autoFocus?: boolean;
    resetTouched?: true;
}

export type {
    ConditionalDisabled,
    InitialValues,
    DisabledInputs,
    CheckFormStatus,
    TextInputConfig,
    CheckValid,
    FormOnSubmit,
    FocusedInput,
    Cache,
    UpdateCache,
}