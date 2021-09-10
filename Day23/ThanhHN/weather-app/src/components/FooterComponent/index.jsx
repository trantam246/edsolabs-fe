import React from 'react';
import styles from './FooterComponent.module.scss';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Modal } from '../Modal';


export const FooterComponent = ({
  onClickMyName = () => {}
}) => {
    return (
      <>
        <div className={styles.wrapper}>
            @ 2021 by FE class. Made with <FavoriteIcon className={styles.heart}/> by <span onClick={onClickMyName}>{process.env.REACT_APP_MY_NAME}</span>
        </div>

        {/* <Modal /> */}
      </>
    );
}