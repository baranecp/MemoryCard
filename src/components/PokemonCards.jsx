import { useEffect, useState } from "react"
import "./PokemonCards.css"
import PokemonCard from "./PokemonCard";
import Modal from "./Modal";
function PokemonCards() {

    const [pokemons, setPokemons] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=12&offset=0')
            .then(response => response.json())
            .then(data => {
                const withClickState = data.results.map(pokemon => {
                    const id = pokemon.url.split("/").filter(Boolean).pop(); // extract id
                    return {
                        ...pokemon,
                        id,
                        isClicked: false
                    };
                });
                setPokemons(shuffleArray(withClickState));
            })
            .catch(err => console.log(err))
    }, [])

    //Fisher–Yates algorithm to shuffle an array
    function shuffleArray(array) {
        const shuffled = [...array]; // copy so we don’t mutate original
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // random index
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap
        }
        return shuffled;
    }

    const handlePokemonClick = (name) => {
        setPokemons((prev) => {
            const clicked = prev.find((p) => p.name === name);

            if (clicked.isClicked) {
                handleAlreadyClicked();
                return resetAndShufflePokemons(prev);
            } else {
                const newScore = score + 1;
                handleScoreUpdate(newScore, prev.length);
                return shuffleAndMarkClicked(prev, name);
            }
        });
    };

    // --- Helper functions ---

    const handleAlreadyClicked = () => {
        setHighScore((h) => Math.max(h, score));
        setScore(0);
    };

    const handleScoreUpdate = (newScore, totalPokemons) => {
        setScore(newScore);

        if (newScore === totalPokemons) {
            setHighScore((h) => Math.max(h, newScore));
            setShowModal(true);
        }
    };

    const resetAndShufflePokemons = (pokemons) => {
        return shuffleArray(pokemons.map((p) => ({ ...p, isClicked: false })));
    };

    const shuffleAndMarkClicked = (pokemons, name) => {
        return shuffleArray(
            pokemons.map((p) =>
                p.name === name ? { ...p, isClicked: true } : p
            )
        );
    };


    const handleCloseModal = () => {
        setScore(0);
        setPokemons((prev) => prev.map((p) => ({ ...p, isClicked: false })));
        setShowModal(false);
    };


    return (
        <div>
            <header>
                <h1>Pokemon Memory Game</h1>
                <div className="scoreboard">
                    <p>Score: {score}</p>
                    <p>High Score: {highScore}</p>
                </div>
            </header>
            <div className="grid">
                {pokemons.map(pokemon => (
                    <PokemonCard
                        key={pokemon.id}
                        onClick={() => handlePokemonClick(pokemon.name)}
                        alt={pokemon.name}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    />
                ))}
            </div>
            <Modal show={showModal} onClose={handleCloseModal} score={score} />
        </div>
    )


}

export default PokemonCards
