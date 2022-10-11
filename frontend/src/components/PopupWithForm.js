import React from "react";
import Popup from "./Popup";

function PopupWithForm({ name, isOpen, title, onSubmit, children, buttonText, onClose }) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose} type='form'>
      <h2 className="popup__title">{title}</h2>
      <form
        className="popup__form"
        onSubmit={onSubmit}
        name={name}>
        {children}
        <button
          className="popup__save"
          type="submit">
          {buttonText}
        </button>
      </form>
    </Popup>
  )
}

export default PopupWithForm
