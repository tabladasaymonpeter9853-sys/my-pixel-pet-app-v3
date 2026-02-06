import { useNavigate } from 'react-router-dom';
import { usePet } from '../../context/PetContext';
import cat1 from '../../assets/Cat_1.png';
import cat2 from '../../assets/Cat_2.png';
import cat3 from '../../assets/Cat_3.png';
import cat4 from '../../assets/Cat_4.png';
import cat5 from '../../assets/Cat_5.png';
import dog1 from '../../assets/Dog_1.png';
import dog2 from '../../assets/Dog_2.png';
import dog3 from '../../assets/Dog_3.png';
import dog4 from '../../assets/Dog_4.png';
import dog5 from '../../assets/Dog_5.png';
import cardboardBg from '../../assets/9nlGN0.gif';
import './pet-selection.css';

export default function PetSelection() {
    const navigate = useNavigate();
    const { selectThePet } = usePet();

    // Pet Menu Page (wireframe): show a grid of pixel pets
    const pets = [
        { id: 'cat-1', name: 'Cat', img: cat1, type: 'cat' },
        { id: 'cat-2', name: 'Cat', img: cat2, type: 'cat' },
        { id: 'cat-3', name: 'Cat', img: cat3, type: 'cat' },
        { id: 'cat-4', name: 'Cat', img: cat4, type: 'cat' },
        { id: 'cat-5', name: 'Cat', img: cat5, type: 'cat' },
        { id: 'dog-1', name: 'Dog', img: dog1, type: 'dog' },
        { id: 'dog-2', name: 'Dog', img: dog2, type: 'dog' },
        { id: 'dog-3', name: 'Dog', img: dog3, type: 'dog' },
        { id: 'dog-4', name: 'Dog', img: dog4, type: 'dog' },
        { id: 'dog-5', name: 'Dog', img: dog5, type: 'dog' },
    ];

    const handleSelect = (pet) => {
        // 1. Tell the Cloud "We picked this one!"
        selectThePet(pet);
        // 2. Move to the next room
        navigate('/pet');
    };

    return (
        <div className="petMenu" style={{ backgroundImage: `url(${cardboardBg})` }}>
            <header className="petMenu__top">
                <button className="pixel-button pixel-button--sm pixel-button--dark petMenu__homeBtn" onClick={() => navigate('/')} type="button">
                    HOME
                </button>
                <h1 className="petMenu__title">Choose Your Pet</h1>
                <div className="petMenu__spacer" />
            </header>

            <main className="petMenu__grid" aria-label="Pet menu grid">
                {pets.map((pet) => (
                    <button
                        className="petMenu__card"
                        key={pet.id}
                        onClick={() => handleSelect(pet)}
                        type="button"
                    >
                        <img className="petMenu__sprite" src={pet.img} alt={`${pet.name} sprite`} />
                    </button>
                ))}
            </main>
        </div>
    );
}