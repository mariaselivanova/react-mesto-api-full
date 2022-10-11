import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? "element__delete-button_active" : "element__delete-button"}`
  );
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked ? "element__like-button_active" : "element__like-button"}`
  );

  function handleImageClick() {
    onCardClick(card)
  };

  function handleLikeClick() {
    onCardLike(card)
  };

  function handleDeleteClick() {
    onCardDelete(card)
  };

  return (
    <div className="element">
      <img
        alt={card.name}
        src={card.link}
        className="element__image"
        onClick={handleImageClick} />
      <button
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}></button>
      <div className="element__caption">
        <h2 className="element__paragraph">{card.name}</h2>
        <div className="element__info">
          <button
            type="button"
            onClick={handleLikeClick}
            aria-label="Лайк"
            className={cardLikeButtonClassName}></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
