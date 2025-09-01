import "./Modal.css";

function Modal({ show, onClose, score }) {
    if (!show) return null; // don't render if not visible

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>🎉 You Won!</h2>
                <p>You scored {score} points!</p>
                <button onClick={onClose}>Play Again</button>
            </div>
        </div>
    );
}

export default Modal;
