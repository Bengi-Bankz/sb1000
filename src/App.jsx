import React, { useState, useEffect } from "react";
import SlotGrid from "./components/SlotGrid";
import Controls from "./components/Controls";
import "./App.css";

const startingBalance = 1000;
const betAmount = 20;

export default function App() {
  const [grid, setGrid] = useState([]);
  const [balance, setBalance] = useState(startingBalance);
  const [winAmount, setWinAmount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [freeSpinsLeft, setFreeSpinsLeft] = useState(0);
  const [inBonus, setInBonus] = useState(false);

  // SYMBOLS + payouts per match count
  const symbols = [
    "heart", "purple", "green", "blue",
    "apple", "plum", "melon", "grape", "banana",
    "scatter"
  ];

  const payoutTable = {
    heart: { "8": 10, "10": 25, "12": 50 },
    purple: { "8": 2.5, "10": 10, "12": 25 },
    green: { "8": 2, "10": 5, "12": 15 },
    blue: { "8": 1.5, "10": 2, "12": 12 },
    apple: { "8": 1, "10": 1.5, "12": 10 },
    plum: { "8": 0.8, "10": 1.2, "12": 8 },
    melon: { "8": 0.5, "10": 1, "12": 5 },
    grape: { "8": 0.4, "10": 0.9, "12": 4 },
    banana: { "8": 0.25, "10": 0.75, "12": 2 },
    scatter: { "4": 3, "5": 5, "6": 100 }
  };

  const getRandomSymbol = () =>
    symbols[Math.floor(Math.random() * symbols.length)];

  const generateGrid = () => {
    const newGrid = Array(6)
      .fill()
      .map(() => Array(5).fill().map(getRandomSymbol));
    setGrid(newGrid);
  };

  const countMatches = (flatGrid) => {
    const counts = {};
    flatGrid.forEach((sym) => {
      counts[sym] = (counts[sym] || 0) + 1;
    });
    return counts;
  };

  const calculateWin = (matchCounts) => {
    let total = 0;
    Object.entries(matchCounts).forEach(([sym, count]) => {
      if (sym === "scatter") return; // scatter handled separately
      if (count >= 8) {
        if (count >= 12 && payoutTable[sym]["12"]) total += payoutTable[sym]["12"];
        else if (count >= 10 && payoutTable[sym]["10"]) total += payoutTable[sym]["10"];
        else if (payoutTable[sym]["8"]) total += payoutTable[sym]["8"];
      }
    });
    return total;
  };

  const countScatters = (flatGrid) =>
    flatGrid.filter((sym) => sym === "scatter").length;

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinAmount(0);

    if (freeSpinsLeft === 0) {
      setBalance((prev) => prev - betAmount);
    }

    generateGrid();

    setTimeout(() => {
      const flatGrid = grid.flat();
      const matches = countMatches(flatGrid);
      const win = calculateWin(matches);
      const scatters = countScatters(flatGrid);

      if (scatters >= 4) {
        setFreeSpinsLeft(10);
        setInBonus(true);
      }

      const bombMultiplier = Math.random() < 0.25 ? Math.floor(Math.random() * 98 + 2) : 1;
      const finalWin = win * bombMultiplier;

      setBalance((prev) => prev + finalWin);
      setWinAmount(finalWin);

      if (freeSpinsLeft > 0) {
        setFreeSpinsLeft((prev) => prev - 1);
        if (freeSpinsLeft === 1) setInBonus(false);
      }

      setIsSpinning(false);
    }, 500);
  };

  const bonusBuy = () => {
    if (balance < 100) return;
    setBalance((b) => b - 100);
    setFreeSpinsLeft(10);
    setInBonus(true);
    spin();
  };

  return (
    <div className="app">
      <h1>Sweet Bonanza 1000 </h1>
      <SlotGrid grid={grid} />
      <Controls
        spin={spin}
        bonusBuy={bonusBuy}
        balance={balance}
        winAmount={winAmount}
        freeSpinsLeft={freeSpinsLeft}
        inBonus={inBonus}
        isSpinning={isSpinning}
      />
    </div>
  );
}
