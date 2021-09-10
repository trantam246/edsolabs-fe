import React from 'react';
import styles from './HeaderComponent.module.scss';
import {TextField} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { ListCityWaiting } from '../ListCityWaiting';

export const HeaderComponent = ({
    city = '',
    searchCityData,
    displayListCity = false,
    onChange = () => {},
    onSearch = () => {},
    onKeyUp = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onCityClick
}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                Edsolabs 5-Day Forecast
            </div>

            <div className={styles.search}>
                <div onClick={onSearch}>
                    <SearchIcon className={styles.searchIcon}/>
                </div>

                <TextField placeholder={"Nhập thành phố bạn muốn xem"} 
                    id="standard-search" 
                    type="search" fullWidth variant="outlined" 
                    onChange={onChange}
                    value={city}
                    onKeyUp={onKeyUp}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />

                {
                    displayListCity ? 
                        <ListCityWaiting 
                            searchCityData={searchCityData} 
                            onCityClick={onCityClick}
                        /> 
                    : ''
                }
            </div>
        </div>
    );
}