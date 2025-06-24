import React from "react";
import SymbolTile from "./SymbolTile";

export default function SlotGrid({ grid }) {
    return (
        <div className="slot-grid">
            {grid.map((col, colIdx) => (
                <div key={colIdx} className="slot-column">
                    {col.map((symbol, rowIdx) => (
                        <SymbolTile key={`${colIdx}-${rowIdx}`} symbol={symbol} />
                    ))}
                </div>
            ))}
        </div>
    );
}
