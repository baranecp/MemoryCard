import "./PokemonCard.css"

function PokemonCard({ alt, src, onClick }) {

    return (
        <div className="card" onClick={onClick}>
            <img src={src} alt={alt} />
            <p>{alt}</p>
        </div>
    )
}

export default PokemonCard
