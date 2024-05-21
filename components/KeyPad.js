import React, { useState, useEffect } from 'react';

export default function KeyPad({ keys, usedKeys }) {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        setLetters(keys);
    }, [keys]);

    return (
        <div className="keypad">
            {letters.map((l) => {
                const color = usedKeys[l.key];
                return (
                    <div key={l.key} className={color}>{l.key}</div>
                );
            })}
        </div>
    );
}
