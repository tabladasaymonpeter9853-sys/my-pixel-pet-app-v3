import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePet } from '../../context/PetContext';
import dogGif from '../../assets/Dog.gif';
import forestBg from '../../assets/360_F_879758638_L7zSI7pV2PLcifhQpaPqlLM8p9kfILci.jpg';
import './home-page.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { selectedPet } = usePet();

  const handlePlay = () => {
    // Wireframe behavior: Play goes to Pet page.
    // If no pet is selected yet, we route to the Pet Menu first.
    navigate(selectedPet ? '/pet' : '/select');
  };

  return (
    <div className="homeScreen" style={{ backgroundImage: `url(${forestBg})` }}>
      <header className="homeScreen__header">
        <h1 className="homeScreen__title">MY PIXEL PET</h1>
      </header>

      <main className="homeScreen__stage" aria-label="Pixel pet preview">
        <img className="homeScreen__pet" src={dogGif} alt="Pixel dog" />
      </main>

      <nav className="homeScreen__menu" aria-label="Main menu">
        <button className="pixel-button pixel-button--dark homeScreen__btn" onClick={handlePlay} type="button">
          PLAY
        </button>
        <button
          className="pixel-button pixel-button--dark homeScreen__btn"
          onClick={() => navigate('/select')}
          type="button"
        >
          PETS
        </button>
        <button
          className="pixel-button pixel-button--dark homeScreen__btn"
          onClick={() => navigate('/')}
          type="button"
          aria-disabled="true"
        >
          EXIT
        </button>
      </nav>
    </div>
  );
};

export default HomePage;
