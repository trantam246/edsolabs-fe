import React, { useState } from 'react';
import styles from './TaskToChooseComponent.module.scss';

export const TaskToChooseComponent = ({
  title = '',
  id = 0,
  onAddTag = () => {},
}) => {
  const [status, setStatus] = useState(false);
  const handleAddTag = () => {
    setStatus(true);
    onAddTag(id);
  };

  return (
    <div className={styles.wrapper} onClick={handleAddTag}>
      {status ? '✓  ' : ''}
      {title}
    </div>
  );
};
