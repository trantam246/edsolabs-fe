import React from 'react';
import styles from './Modal.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';

export const Modal = ({
    onClickModal = () => {}
}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3>About me</h3>
                    <div className={styles.close} onClick={onClickModal}>
                        <CloseIcon />
                    </div>
                </div>

                <div className={styles.myself}>
                    <img className={styles.image} src="images/myselfImg.jpg" alt="my self" />
                    <div className={styles.information}>
                        <h3>
                            Xin chào, Mình là Hoàng Ngọc Thành. Mình quê ở Vĩnh Phúc.
                            Hiện tại mình đang là thực tập sinh Web Front end tại Hà Nội, công việc của mình là
                            tạo ra các trang web phục vụ nhu cầu cuộc sống của con người trong thời đại 4.0, đòi hỏi Nó đòi hỏi khả năng tư duy logic, tính chuyên nghiệp
                            cũng như sự tập trung cao độ trong công việc. 
                        </h3>

                        <h3 className={styles.interests}>
                            Mình rất thích công việc này
                            nhiều vì nó là một phần giúp mình thỏa mãn
                            niềm đam mê bất tận cho việc phát triển web cũng như mang lại
                            thu nhập cho cuộc sống.
                        </h3>
                    </div>
                </div>
                <h3 className={styles.lastInfo}>
                    Để trở thành một nhà phát triển web, mình còn cần phải học hỏi rất nhiều
                    và rèn luyện kỹ năng. Có hai kỹ năng quan trọng cần phải học
                    trong phát triển web. Đầu tiên là
                    tư duy logic, ... Thứ hai là tư duy sản phẩm là một
                    một phần rất quan trọng của sự phát triển mà bạn muốn. nếu bạn có cả hai kỹ năng này, thì điều đó thật tuyệt vời . 
                    thank you !
                </h3>
                <div className={styles.btnClose} onClick={onClickModal}>
                    <Button size="small" variant="outlined">Close</Button>
                </div>
            </div>
        </div>
    );
}