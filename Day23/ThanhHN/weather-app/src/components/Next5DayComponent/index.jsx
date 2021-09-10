import React from 'react';
import { Widget } from '../Widget';
import styles from './Next5DayComponent.module.scss';

export const Next5DayComponent = ({
    forecast = [],
    dayArr = []
}) => {

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.header}>
                Next 5 day  forecast
            </h2>

            <div className={styles.wrapperList}>

                {
                    forecast.map((item, index) => {
                        return (
                            <div key={item.date_epoch} className={styles.widgetItem}>
                                <Widget dayWeather={item} dayForecast={dayArr[index]}/>
                            </div>
                        )
                    })
                }
                
                <div className={styles.widgetItem}>
                    <Widget />
                </div>

                <div className={styles.widgetItem}>
                    <Widget />
                </div>
            </div>
        </div>
    );
}