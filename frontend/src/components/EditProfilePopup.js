import PopupWithForm from "./PopupWithForm"
import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        value={name || ""}
        onChange={handleNameChange}
        className="popup__input popup__input_type_name"
        type="text"
        minLength="2"
        maxLength="40"
        required
        name="userName"
        placeholder="Имя" />
      <span className="popup__input-error name-input-error"></span>
      <input
        id="profession-input"
        value={description || ""}
        onChange={handleDescriptionChange}
        className="popup__input popup__input_type_profession"
        type="text"
        minLength="2"
        maxLength="200"
        required
        name="userInfo"
        placeholder="О себе" />
      <span className="popup__input-error profession-input-error"></span>
    </PopupWithForm>
  )
}
