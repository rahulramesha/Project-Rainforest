const strings = {
    NOT_EMAIL: 'This field expects valid email',
    NULL_OR_EMPTY: 'This field cannot be left empty',
    NOT_ALPHABETIC: 'This needs to be alphabetic',
    MIN_REQ_LENGTH: 'This should have a minimun required length of ',
    NOT_NUMERIC: 'This field should be only numbers',
    NOT_REQ_LENGTH: 'Go ahead, enter some more characters'
}

export const getString = (key) => {
    
    if(key.includes('|')) {
        const [stringKey, length] = key.split('|')
        return strings[stringKey] + length
    }

    return strings[key]

}