import type { Props as TextInputProps,
    Content as TextInputContent } from './TextInput';
import type { SetState, FormData, UpdateCache } from 'types';


type TextInputTypes = 'email' | 'username' | 'password' | 'text';

type FlexOnChange = SetState<any>;

interface Match {
    value: string;
    name: string;
}

interface InputCache {
    updateCache: UpdateCache<FormData>;
    formData: FormData;
}

export type {
    TextInputTypes,
    TextInputProps,
    TextInputContent,
    Match,
    FlexOnChange,
    InputCache,
}