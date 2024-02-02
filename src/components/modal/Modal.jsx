import { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';

const Modal = forwardRef(function RefModal(
  { className, modalContent: ModalContent, onClose, onNext },
  ref,
) {
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        setIsOpen(true);
        dialog.current.showModal();
      },
      close() {
        setIsOpen(false);
        dialog.current.close();
      },
    };
  });
  return createPortal(
    <dialog className={className} ref={dialog}>
      {isOpen && (
        <ModalContent handleModalClose={onClose} handleNextAction={onNext} />
      )}
    </dialog>,
    document.getElementById('modal'),
  );
});

export default Modal;
