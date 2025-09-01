import "./PokemonCard.css"

function PokemonCard({ alt, src, onClick }) {

    return (
        <img className="pokemon-image" src={src} alt={alt} onClick={onClick} />
    )
}

export default PokemonCard
