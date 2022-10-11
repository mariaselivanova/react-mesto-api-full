import React from "react";
import Popup from "./Popup";

function ImagePopup({ card, onClose, isOpen }) {
  return (
    <Popup onClose={onClose} isOpen={isOpen} type='image'>
      <img alt={card && card.name} src={card && card.link} className="popup__image" />
      <h2 className="popup__caption">{card && card.name}</h2>
    </Popup>
  )
}

export default ImagePopup
