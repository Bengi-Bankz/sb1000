import React from "react";
import "./SymbolTile.css";

export default function SymbolTile({ symbol }) {
    const symbolMap = {
        heart: "/1.png",
        purple: "/2.png",
        green: "/3.png",
        blue: "/4.png",
        apple: "/5.png",
        plum: "/6.png",
        melon: "/7.png",
        grape: "/8.png",
        banana: "/9.png",
        scatter: "/10.png",
        bomb: "/11.png",
    };

    return (
        <div className="symbol-tile drop-in">
            <img
                src={symbolMap[symbol]}
                alt={symbol}
                className="symbol-img"
            />
        </div>
    );
}
