import React from 'react';

const TextFieldGroup = ({
    groupClass,
    inputClass,
    onChange,
    placeholder,
    type,
    name,
    value,
    error,
    errorClass
}) => {
    return (
        <div className={groupClass}>

            <input 
            className={inputClass} 
            onChange={onChange} 
            placeholder={placeholder} 
            type={type}
            name={name} 
            value={value} />

            {error && <span className={errorClass}>{error}</span>}
        </div>
    )
}

export default TextFieldGroup;