import React from 'react';
import styles from '../../CSS-Modules/profile/Profile.module.css';

const Info = ({
    info,
    value
}) => {
    return (    
        <div className={styles.info}>
            <strong>{info}</strong> {value}
        </div>
    )
}

export default Info;