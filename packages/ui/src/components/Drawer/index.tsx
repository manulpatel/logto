import classNames from 'classnames';
import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';

import CloseIcon from '@/assets/icons/close-icon.svg';

import * as modalStyles from '../../scss/modal.module.scss';
import IconButton from '../Button/IconButton';
import * as styles from './index.module.scss';

type Props = {
  className?: string;
  isOpen?: boolean;
  children: ReactNode;
  onClose: () => void;
};

const Drawer = ({ className, isOpen = false, children, onClose }: Props) => {
  return (
    <ReactModal
      shouldCloseOnOverlayClick
      role="popup"
      isOpen={isOpen}
      className={classNames(styles.drawer, className)}
      overlayClassName={modalStyles.overlay}
      appElement={document.querySelector('main') ?? undefined}
      closeTimeoutMS={300}
      onRequestClose={onClose}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {children}
      </div>
    </ReactModal>
  );
};

export default Drawer;
