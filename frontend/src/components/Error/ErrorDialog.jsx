import React from 'react';
import Modal from 'react-modal';
import './ErrorDialog.css'

const ErrorDialog = ({ isOpen, message, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Error Dialog"
            ariaHideApp={false}
            className="error-dialog__content"
            // overlayClassName="error-dialog__overlay"
        >
            <div className="error-dialog">
                <h2 className="error-dialog__header">Oops! Something went wrong :(</h2>
                <p>{message}</p>
                <button onClick={onClose} className="error-dialog__button">
                    Dismiss
                </button>
            </div>
        </Modal>
    );
};

export default ErrorDialog;
