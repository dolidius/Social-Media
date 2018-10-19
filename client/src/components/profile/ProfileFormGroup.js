import React from 'react';
import styles from '../../CSS-Modules/profile/EditProfile.module.css';

const ProfileFormGroup = ({
    name,
    label,
    value,
    onChange
}) => {
    return (
        <div className={styles.formGroup}>
            <input value={value} onChange={onChange} type="text" name={name} placeholder={label} className={styles.input} />
            <label className={styles.label} htmlFor={name}>{label}</label>
        </div>
    )
}

export default ProfileFormGroup;