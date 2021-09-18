import React from 'react';
import styles from './Widget.module.scss';
import { WIDGET_COLLAPSE } from '../../constants';

export const Widget = ({
    type=WIDGET_COLLAPSE,  //default type when not have props type 
    temperature = "demo...",  // demo data for collapse item
    dayForecast = '', // demo data for collapse item
    dayOfMonth = 'loading...', // demo data for collapse item
    todayWeather = {},
    dayWeather = {}
}) => {

    return (
        <div className={`${styles.wrapper} ${styles[type]}`}>

            {/*component when type = expand*/}
            
            <div className={`${styles.header} ${styles.itemExpand}`}>
               TODAY'S WEATHER IN {todayWeather.location?.name}, {todayWeather.location?.country}
            </div>

            <div className={styles.contentWeather}>

                <div className={`${styles.weather} ${styles.itemExpand}`}>
                    <div className={styles.imageWeather}>
                        <img src={todayWeather?.current?.condition?.icon} alt="thời tiết hôm nay" />
                    </div>

                    <div className={styles.contentImage}>
                        <p>{todayWeather?.current?.condition?.text}</p>
                        <h2>{todayWeather?.current?.temp_c}&deg;C</h2>
                    </div>
                </div>

                <div className={`${styles.content} ${styles.itemExpand}`}>
                    <p>wind: {todayWeather?.current?.wind_kph} kmph</p>
                    <p>Precip: {todayWeather?.current?.precip_mm} mm</p>
                    <p>Pressure: {todayWeather?.current?.pressure_mb} mb</p>
                </div>           
            </div>


            {/* component when type = collapse*/}

            <div className={`${styles.header} ${styles.itemCollapse}`}>
                <p>{dayForecast || 'loading'}</p>
                <p>{dayWeather.date?.slice(6).split('-').join('/') || dayOfMonth}</p>
            </div>

            <div className={`${styles.weatherCollapse} ${styles.itemCollapse}`}>
                <img src={dayWeather.day?.condition.icon || 'https://www.accuweather.com/images/weathericons/02.svg'} alt="5 days item" />
            </div>

            <h2 className={`${styles.temperatureCollapse} ${styles.itemCollapse}`}>
                {dayWeather.day?.avgtemp_c || temperature}&deg;C
            </h2>
        </div>
    );
}