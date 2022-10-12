import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "../utils/Auth";
import successful from "./../images/sign-successful.svg";
import unsuccessful from "./../images/sign-unsuccessful.svg";
import InfoTooltip from "./InfoTooltip";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [signupImage, setSignupImage] = useState("");
  const [signupText, setSignupText] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      api._headers.authorization = `Bearer ${localStorage.getItem('jwt')}`
      Promise.all([api.getAllCards(), api.handleUserInfo()])
        .then(([cards, userInfo]) => {
          setCards(cards);
          setCurrentUser(userInfo);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);


  useEffect(() => {
    handleTokenCheck()
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      Auth.checkToken(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUserEmail(res.email);
          setCurrentUser(res);
          navigate('/');
        }
      })
        .catch((err) => console.log(err))
    }
  }

  function handleLogin(password, email) {
    Auth.authorize(password, email)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        Auth.checkToken(data.token)
          .then((res) => {
            setIsLoggedIn(true);
            setUserEmail(res.email);
            setCurrentUser(res);
            navigate('/');
          })
      })
      .catch((err) => console.log(err))
  }

  function handleRegister(password, email) {
    Auth.register(password, email).then((data) => {
      if (data) {
        setSignupImage(successful);
        setSignupText("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      }
    }).catch(() => {
      setSignupImage(unsuccessful);
      setSignupText("Что-то пошло не так! Попробуйте ещё раз.");
    })
      .finally(handleInfoTooltip);
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setIsLoggedIn(false);

  }

  function handleCardLike(card) {
    const likes = card.likes;
    const checkIfLiked = (c) => c === currentUser._id;
    const isLiked = likes.some(checkIfLiked);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id))
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(name, link) {
    api.addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function openEditProfilePopup() {
    setIsEditProfilePopupOpen(true);
  };

  function openAddPlacePopup() {
    setIsAddPlacePopupOpen(true);
  };

  function openEditAvatarPopup() {
    setIsEditAvatarPopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
    setInfoTooltip(false)
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleUpdateUser(user) {
    api.changeUserInfo(user.name, user.about)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  };

  function handleUpdateAvatar(user) {
    api.changeUserAvatar(user.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route exact path="/"
            element={
              <>
                <ProtectedRoute
                  component={Main}
                  onEditProfile={openEditProfilePopup}
                  onEditAvatar={openEditAvatarPopup}
                  onAddPlace={openAddPlacePopup}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  loggedIn={isLoggedIn}
                />
                <Footer />
              </>
            }
          />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup
          isOpen={selectedCard}
          onClose={closeAllPopups}
          card={selectedCard} />
        <InfoTooltip
          signupImage={signupImage}
          signupText={signupText}
          isOpen={infoTooltip}
          onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;


