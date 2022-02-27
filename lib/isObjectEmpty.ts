/**
 * Checks if a given object is empty.
 * Returns true is object is empty, else false.
 */
 const isObjectEmpty = ( object: { [ key: string | number ]: any } ) => {
    return Object.keys( object ).length === 0 &&
    Object.getPrototypeOf( object ) === Object.prototype;
}

export default isObjectEmpty;