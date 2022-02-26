// types
import type { SetState } from './setState';

interface FormDataValues {
    value: string;
    isValid: boolean;
    resetTouched?: true;
}

type SetFormData = SetState<FormData>;

type FormData<T extends object = any> = {
    [ key: string ]: FormDataValues;
} & Record<keyof T, FormDataValues>;

type TransformedFormData<T extends object = any> = {
    [ key: string ]: string;
} & Record<keyof T, string>;

export type {
    FormData,
    SetFormData,
    TransformedFormData,
    FormDataValues,
} 