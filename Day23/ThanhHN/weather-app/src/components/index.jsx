import React from 'react';
import { WIDGET_EXPAND } from '../constants';
import styles from './AppUI.module.scss';
import { FooterComponent } from './FooterComponent';
import { HeaderComponent } from './HeaderComponent';
import { Next5DayComponent } from './Next5DayComponent';
import { Widget } from './Widget';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Modal } from './Modal';

export const AppUI = ({
    city,
    displayListCity,
    searchCityData,
    todayWeather,
    forecast,
    loading = false,
    showModal = false,
    onChange,
    onSearch,
    onKeyUp,
    onFocus,
    onBlur,
    onCityClick,
    onClickModal,
    onClickMyName
}) => {

    const dayArr = forecast.map(item => {
        const d = new Date(item.date);
        const day = d.toString().slice(0,4);
        return day
    })

    return (
        <>
            <div className={styles.wrapper}>
                <HeaderComponent
                    city={city} 
                    onChange={onChange}
                    onSearch={onSearch} 
                    onKeyUp={onKeyUp}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    displayListCity={displayListCity}
                    searchCityData={searchCityData}
                    onCityClick={onCityClick}
                />

                {
                    Object.keys(todayWeather).length > 0 && forecast.length > 0 
                    ? 
                    <>
                    {/* weather */}
                        <div className={styles.todayWeatherComponent}>
                            <Widget todayWeather={todayWeather} type={WIDGET_EXPAND} />
                        </div>
                        <Next5DayComponent forecast={forecast} dayArr={dayArr}/> 
                    </> 
                    : loading && <div className={styles.progressWrapper}>
                                    <CircularProgress className={styles.progress} color="secondary"/>Getting information, please wait ...
                                </div> 
                }

                <FooterComponent onClickMyName={onClickMyName}/>
            </div>
            {
                showModal && <Modal onClickModal={onClickModal}/>
            }
        </>
    );
}