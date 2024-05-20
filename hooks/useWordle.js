import { useState } from 'react';

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});

    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((l) => {
            return { key: l, color: "grey" };
        });

        formattedGuess.forEach((l, i) => {
            if (solution[i] === l.key) {
                formattedGuess[i].color = "green";
                solutionArray[i] = null;
            }
        });

        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== "green") {
                formattedGuess[i].color = "yellow";
                solutionArray[solutionArray.indexOf(l.key)] = null;
            }
        });

        return formattedGuess;
    };

    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true);
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        });
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess];
        });
        setTurn((prevTurn) => {
            return prevTurn + 1;
        });

        setUsedKeys((prevUsedKeys) => {
            formattedGuess.forEach((l) => {
                const currentColor = prevUsedKeys[l.key];
                if (l.color === 'green') {
                    prevUsedKeys[l.key] = 'green';
                    return;
                }
                if (l.color === 'yellow' && currentColor !== 'green') {
                    prevUsedKeys[l.key] = 'yellow';
                    return;
                }
                if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                    prevUsedKeys[l.key] = 'grey';
                    return;
                }
            });
            return prevUsedKeys;
        });

        setCurrentGuess("");
    };

    const handleKeyup = ({ key }) => {
        if (key === "Enter") {
            if (turn > 5) {
                console.log("You used all guesses!");
                return;
            }
            if (history.includes(currentGuess)) {
                console.log("You already tried that word");
                return;
            }
            if (currentGuess.length !== 5) {
                console.log("Word must be 5 chars.");
                return;
            }
            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        if (key === "Backspace") {
            setCurrentGuess((prev) => prev.slice(0, -1));
            return;
        }
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => prev + key);
            }
        }
    };

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
}

export default useWordle;
