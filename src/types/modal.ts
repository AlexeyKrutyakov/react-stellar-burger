import { ReactElement } from 'react';

export type Modal = {
  type: string;
  background: string;
  isActive: boolean;
};

export type ModalProps = {
  children: ReactElement;
  onCloseModal: () => void;
  forSpinner?: boolean;
};
