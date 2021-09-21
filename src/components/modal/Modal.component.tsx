import { Modal } from "@fluentui/react";
import { FC } from "react";

import "./modal.css";

interface IModalWindowProps {
  isModalOpen: boolean;
  isBlocking?: boolean;
  hideModal: () => void;
}

export const ModalWindow: FC<IModalWindowProps> = ({
  children,
  isModalOpen,
  hideModal,
  isBlocking,
}) => {
  return (
    <Modal
      titleAriaId={"ty"}
      isOpen={isModalOpen}
      onDismiss={hideModal}
      isBlocking={isBlocking}
    >
      {children}
    </Modal>
  );
};
