import React from "react";
import Popup from "./Popup";

function InfoTooltip({ isOpen, onClose, signupImage, signupText }) {
  return (
    <Popup onClose={onClose} isOpen={isOpen} type='form'>
      <img
        src={signupImage}
        className="popup__img"
        alt=""
      />
      <h2 className="popup__text">
        {signupText}
      </h2>
    </Popup>
  );
}

export default InfoTooltip;
