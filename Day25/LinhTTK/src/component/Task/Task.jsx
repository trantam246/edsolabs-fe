import React from 'react';
import { ListTasked, ListItem, ContentBox, GroupBtn, Button } from './style';
import { FaTags } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { deleteData, getData } from '../../api/axiosClient';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Task = ({ handleClickListsDelete, dayTask, LsTag }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);
  const deleteDatas = async (id) => {
    await deleteData('tasks', id);
    const dataGet = await getData('tasks');
    handleClickListsDelete(dataGet.data);
  };

  const Tasks = dayTask.map((item) => {
    return (
      <ListTasked key={item.id}>
        <h3>{item.description == null ? 'null' : item.description}</h3>
        <ListItem>
          <FaTags />
          {item.tags.length > 0
            ? item.tags.map((item) => {
                // eslint-disable-next-line array-callback-return
                return LsTag.map((e, index) => {
                  if (e.id === item) return <span key={index}>{e.name}</span>;
                });
              })
            : 'null'}
          <span>
            {item.start_time == null ? 'null' : item.start_time.split(' ')[0]} -{' '}
            {item.end_time == null ? 'null' : item.end_time.split(' ')[0]}
          </span>
          <span>{item.time_spent == null ? 'null' : item.time_spent}</span>
          <HiDotsVertical onClick={handleClick} />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem disabled onClick={handleClose}>
              Start
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleOpenModal();
              }}
            >
              Delete
            </MenuItem>
          </Menu>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModal}>
              <ContentBox>
                <h4>Confimation</h4>
                <span>Are you sure to delete this item?</span>
                <GroupBtn>
                  <Button
                    border="left"
                    onClick={() => {
                      handleCloseModal();
                    }}
                  >
                    No
                  </Button>
                  <Button
                    border="right"
                    onClick={() => {
                      handleCloseModal();
                      deleteDatas(item.id);
                    }}
                  >
                    Yes
                  </Button>
                </GroupBtn>
              </ContentBox>
            </Fade>
          </Modal>
        </ListItem>
      </ListTasked>
    );
  });
  return [Tasks];
};

Task.propTypes = {};
export default Task;
