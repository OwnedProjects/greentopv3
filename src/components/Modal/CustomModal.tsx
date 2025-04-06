import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  useDisclosure,
} from "@heroui/react";
import { useEffect } from 'react';

type CustomModalProps = {
  size?:
    | '5xl'
    | 'md'
    | 'xs'
    | 'sm'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | 'full'
    | undefined;
  openModal: boolean;
  handleModalClose?: () => void;
  title?: string;
  showFooter?: boolean;
  showActionBtn?: boolean;
  showCloseBtn?: boolean;
} & ModalProps;

const CustomModal = ({
  size = '5xl',
  openModal = false,
  title = 'Modal',
  handleModalClose,
  showFooter = false,
  showActionBtn = false,
  showCloseBtn = false,
  children,
  ...rest
}: CustomModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (openModal) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  const handleClose = () => {
    onClose();
    handleModalClose && handleModalClose();
  };

  return (
    <>
      <Modal size={size} isOpen={isOpen} onClose={handleClose} {...rest}>
        <ModalContent>
          {(handleClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <Divider />
              <ModalBody>{children}</ModalBody>
              {showFooter && (
                <ModalFooter>
                  {showCloseBtn && (
                    <Button
                      color="danger"
                      variant="light"
                      onPress={handleClose}
                    >
                      Close
                    </Button>
                  )}
                  {showActionBtn && (
                    <Button color="primary" onPress={handleClose}>
                      Action
                    </Button>
                  )}
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
