import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-input"
        ref={avatarRef}
        className="popup__input popup__input_type_avatar"
        type="url"
        required
        name="avatar"
        placeholder="Ссылка на аватар" />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  )
}
