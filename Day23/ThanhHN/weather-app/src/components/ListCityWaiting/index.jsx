import React from 'react';
import styles from './ListCityWaiting.module.scss';

export const ListCityWaiting = ({searchCityData = [], onCityClick = () => {} }) => {
    return (
        <div className={styles.wrapper}>
            <h4 className={styles.header}>Địa điểm bạn tìm thấy</h4>
            {searchCityData.map(item => {
                return (
                    <p  key={item.id} 
                        className={styles.city} 
                        onClick={() => {onCityClick(item.url)}}>{item.name}
                    </p>
                )
            })}
        </div>
    );
}