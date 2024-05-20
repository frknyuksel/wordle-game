import React from 'react';
import Row from "./Row";

export default function Grid({ guesses, currentGuess, turn }) {
    return (
        <div className="grid">
            {guesses.map((g, i) => {
                if (turn === i) {
                    return <Row key={i} currentGuess={currentGuess} />;
                }
                return <Row key={i} guess={g} />;
            })}
            {/* Boş satırlar döndürülüyor */}
            {[...Array(6 - guesses.length)].map((_, i) => (
                <Row key={i + guesses.length} />
            ))}
        </div>
    );
}
