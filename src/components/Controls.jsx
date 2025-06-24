import React from "react";
import "./Controls.css";

export default function Controls({
    spin,
    bonusBuy,
    balance,
    winAmount,
    freeSpinsLeft,
    inBonus,
    isSpinning
}) {
    return (
        <div className="controls-card">
            <div className="info">
                <span role="img" aria-label="coin">💰</span> Balance: ${balance.toFixed(2)}
            </div>
            <div className="info">
                <span role="img" aria-label="win">🎉</span> Win: ${winAmount.toFixed(2)}
            </div>
            {inBonus && (
                <div className="info">
                    <span role="img" aria-label="spins">🧭</span> Free Spins Left: {freeSpinsLeft}
                </div>
            )}
            <button
                className="spin-button"
                onClick={spin}
                disabled={isSpinning}
            >
                🔄 Spin
            </button>
            <button
                className="buy-button"
                onClick={bonusBuy}
                disabled={isSpinning || balance < 100}
            >
                🎁 Buy Bonus ($100)
            </button>
        </div>
    );
}
