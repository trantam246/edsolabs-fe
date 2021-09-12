import React, { useState } from 'react'
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    favoriteIcon: {
        transform: "translateY(30%)",
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'

    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [`& p`]: {
            fontSize: '1.6rem'
        }
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(200 200 250 / 90%) 0 0.7rem 2.9rem 0",
        outline: 'none',
        borderRadius: '3rem',
        padding: theme.spacing(2, 4, 3),
        maxWidth: '70%',
        position: 'relative',
        [`@media(max-width: 1023px)`]: {
            maxWidth: '90%',
            overFlow: 'scroll',
            [`& p`]: {
                fontSize: '1rem'
            }
        }
    },
    title: {
        borderBottom: '1px black solid',
        paddingBottom: '20px',
        fontSize: '2rem'
    },
    link: {
        cursor: 'pointer',
        color: '#fff',
        fontWeight: 'bold',
        textDecoration: 'underline',
        fontSize: '1.6rem',
        [`&:hover`]: {
            color: ' #64eb5f'
        }
    },
    media: {
        height: '20rem',
        width: '25%',
        float: 'left',
        backgroundSize: 'contain',
        marginRight: '6rem',
        [`@media(max-width: 767px)`]: {
            width: '100%',
            backgroundSize: 'cover',
            marginRight: 0,
            marginBottom:'1rem'
        }
    },
    footer: {
        margin: '4rem 0',
        [`& p`]: {
            fontSize: '1.6rem',
        }
    },
    btn: {
        position: 'absolute',
        bottom: '1rem',
        right: '1.4rem',
        borderRadius: '3rem',
    },
    description: {
        margin: '4rem 0'
    }
}));
const Footer = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Box mt={2} className={classes.footer}>
                <Typography align="center">
                    {"© " + new Date().getFullYear() + " by FE class. Made with "}
                    <FavoriteIcon className={classes.favoriteIcon} /> {"by "}
                    <Link className={classes.link} onClick={handleOpen}> Tran Tam </Link>
                </Typography>
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title" className={classes.title}>About me</h2>
                        <Card className={classes.root}>
                            <CardMedia

                                className={classes.media}
                                image="/images/mySchool.jpg"
                                title=" my school"
                            />
                            <div className="text">
                                <Typography gutterBottom variant="h6" component="p">
                                    Họ và tên: Trần Công Tâm
                                </Typography>
                                <Typography gutterBottom variant="h6" component="p">
                                    Năm sinh: 2000
                                </Typography>
                                <Typography gutterBottom variant="h6" component="p">
                                    Quê quán: Nam Định
                                </Typography>
                                <Typography gutterBottom variant="h6" component="p">
                                    Trường: Đại học Công Nghiệp Hà Nội
                                </Typography>
                                <Typography gutterBottom variant="h6" component="p">
                                    Ngành: Kỹ thuật phần mềm
                                </Typography>
                                <Typography gutterBottom variant="h6" component="p">
                                    Khoa: Công nghệ thông tin
                                </Typography>
                            </div>

                        </Card>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                            Tớ rất thích công việc tớ đang làm và môi trường tớ đang thực tập có những người anh chị rất là tuyệt vời. Lúc chưa bắt đầu nếm trải cảm giác thực tập, thì tớ cứ nghĩ là khi làm việc sẽ phải tự thân vận động 100% và sẽ chẳng có ai giúp đỡ mình hết. Nhưng ở Edso Labs tớ cảm nhận được mọi người đều rất gần gũi và nhiệt tình hướng dẫn mọi điều, mọi thắc mắc đều được giải đáp và còn học hỏi được nhiều hơn thế, nhiều khi tớ còn có cảm giác anh chị là bạn bè vậy, (xin lỗi anh chị khi so sánh như thế) nhưng mà kiểu dễ gần cực... Bình thường tớ hay ngồi với máy tính rất lâu để làm và học thêm những kiến thức mới, nhưng công nhận bánh cuốn thật sự, kiêu càng học cái mới, xong làm được càng hăng. Không biết sau này fix bug lòi mắt ra như nào chứ hiện tại thì rất là thích. Ngoài học tập và công việc thì tớ rất thích nghe nhạc, xem phim và đá bóng. Tớ là 1 fan chân chính của Barcelona, tớ thích CLB từ lớp 6 rồi đấy (và tất nhiên Messi là idol của tớ)... Còn rất nhiều điều có thể viết, mà thôi để dành bí mật cho bản thân vậy. À, tớ là người không thích chụp ảnh nên tớ lấy tạm ảnh 1 góc trường cấp 3 của tớ. Siêu đẹp!
                        </Typography>
                        <Button variant="contained" color="secondary" className={classes.btn}
                            onClick={handleClose} >
                            Close
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

export default Footer;
