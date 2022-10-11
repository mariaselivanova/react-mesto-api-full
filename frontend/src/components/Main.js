import Card from "./Card";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  const cardsElements = cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  ))

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <div
            className="profile__wrap"
            onClick={onEditAvatar}>
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__avatar" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              type="button"
              aria-label="Изменить профиль"
              className="profile__edit-button"></button>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={onAddPlace} type="button" aria-label="Добавить" className="profile__add-button"></button>
      </section>
      <section className="elements">
        {cardsElements}
      </section>
    </main>
  )
}

export default Main
