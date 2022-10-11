import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";

export default function AddPlacePopup({ onAddPlace, isOpen, onClose }) {

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleLinkChange(e) {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(name, link);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="add"
      title="Новое место"
      buttonText="Создать"
    >
      <input
        id="title-input"
        onChange={handleNameChange}
        value={name}
        className="popup__input popup__input_type_title"
        type="text" minLength="2"
        maxLength="30"
        required
        name="title"
        placeholder="Название" />
      <span className="popup__input-error title-input-error"></span>
      <input
        id="link-input"
        onChange={handleLinkChange}
        value={link}
        className="popup__input popup__input_type_link"
        type="url"
        required
        name="link"
        placeholder="Ссылка на картинку" />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  )
}
