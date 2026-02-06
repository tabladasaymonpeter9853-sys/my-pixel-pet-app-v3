import { Link, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { usePet } from '../../context/PetContext';
import forestBg from '../../assets/360_F_828985134_K5CljQcTHZvgIs9XheaQj61qPWE7duDV.jpg';
import './pet-page.css';

export default function PetPage() {
    const navigate = useNavigate();
    // Grab the Global State from the Cloud
    const { selectedPet, bondingLevel, incrementBond, petName, bondTarget, savePetName } = usePet();
    const [tempName, setTempName] = useState('');

    // Guard Clause: If they came here directly without picking a pet
    if (!selectedPet) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>No Pet Selected!</h2>
                <Link to="/select">
                    <button>Go Select a Pet</button>
                </Link>
            </div>
        );
    }

    const isReadyToName = bondingLevel >= bondTarget;
    const isNamed = !!petName;

    const percent = useMemo(() => {
        if (!bondTarget) return 0;
        return Math.max(0, Math.min(100, Math.round((bondingLevel / bondTarget) * 100)));
    }, [bondingLevel, bondTarget]);

    const speak = useMemo(() => {
        const type = selectedPet.type || 'pet';
        if (type === 'cat') return percent < 35 ? '...' : percent < 70 ? 'meow...' : 'purr!';
        if (type === 'dog') return percent < 35 ? '...' : percent < 70 ? 'woof!' : 'yay!';
        return '...';
    }, [selectedPet.type, percent]);

    const handleNameSubmit = () => {
        if (tempName.trim()) {
            savePetName(tempName.trim());
            setTempName('');
        }
    };

    return (
        <div className="petPage" style={{ backgroundImage: `url(${forestBg})` }}>
            <header className="petPage__top">
                <div className="petPage__topRight">
                    <button
                        className="pixel-button pixel-button--sm pixel-button--dark"
                        onClick={() => navigate('/')}
                        type="button"
                    >
                        HOME
                    </button>
                    <button
                        className="pixel-button pixel-button--sm pixel-button--dark"
                        onClick={() => navigate('/select')}
                        type="button"
                    >
                        MENU
                    </button>
                </div>
            </header>

            <main className="petPage__stage" aria-label="Pet stage">
                <div className="petPage__speech" role="note" aria-label="Pet speech bubble">
                    {speak}
                </div>

                <button className="petPage__petBtn" type="button" onClick={incrementBond} aria-label="Bond with your pet">
                    <img
                        className="petPage__petSprite"
                        src={selectedPet.img}
                        alt={petName ? `${petName} the ${selectedPet.name}` : `${selectedPet.name} sprite`}
                    />
                </button>

                <div className="petPage__name">
                    {petName || selectedPet.name}
                </div>
            </main>

            <footer className="petPage__hud" aria-label="Bond meter">
                <button className="petPage__heart" type="button" onClick={incrementBond} aria-label="Tap to bond">
                    <span className="petPage__heartIcon" aria-hidden="true">❤️</span>
                    <span className="petPage__heartPct">{percent}%</span>
                </button>
            </footer>

            {!isNamed && isReadyToName && (
                <div className="petPage__modalBackdrop" role="dialog" aria-modal="true" aria-label="Name your pet">
                    <div className="petPage__modal">
                        <h2 className="petPage__modalTitle">Name your companion</h2>
                        <div className="petPage__modalRow">
                            <input
                                className="petPage__input"
                                type="text"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                placeholder="Enter name..."
                            />
                            <button className="pixel-button pixel-button--dark" onClick={handleNameSubmit} type="button">
                                SAVE
                            </button>
                        </div>
                        <p className="petPage__modalHint">You bonded enough! Pick a name to unlock “Forever Bonded”.</p>
                        <Link className="petPage__link" to="/" onClick={(e) => e.preventDefault()}>
                            {/* keeps layout stable if you later add more */}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}