import { Modal } from "@fluentui/react";
import { FC } from "react";

import "./modal.css";

interface IModalWindowProps {
  isModalOpen: boolean;
  hideModal: () => void;
}

export const ModalWindow: FC<IModalWindowProps> = ({
  children,
  isModalOpen,
  hideModal,
}) => {
  return (
    <Modal
      titleAriaId={"ty"}
      isOpen={isModalOpen}
      onDismiss={hideModal}
      isBlocking={false}
      containerClassName="modal-container"
    >
      {children}
    </Modal>
  );
};
