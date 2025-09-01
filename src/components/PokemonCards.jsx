import { useEffect, useState } from "react"
import "./PokemonCards.css"
import PokemonCard from "./PokemonCard";
function PokemonCards() {

    const [pokemons, setPokemons] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

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
        setPokemons(prev => {
            const clickedPokemon = prev.find(pokemon => pokemon.name === name);
            if (clickedPokemon.isClicked) {
                setHighScore(prevHigh => Math.max(prevHigh, score))
                setScore(0)

                const resetPokemons = prev.map(pokemon => ({ ...pokemon, isClicked: false }))
                return shuffleArray(resetPokemons)
            } else {
                setScore(score + 1)
                const updated = prev.map(pokemon =>
                    pokemon.name === name
                        ? { ...pokemon, isClicked: true }
                        : pokemon
                );
                return shuffleArray(updated);
            }
        })
    }


    return (
        <div>
            <header>
                <h1>Pokémon Memory Game</h1>
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
        </div>
    )


}

export default PokemonCards
