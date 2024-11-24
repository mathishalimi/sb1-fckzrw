import { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useGameStore } from '../../store/gameStore';

interface Props {
  onClose: () => void;
  onComplete: (winnerId: string) => void;
}

type Board = (string | null)[];

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
  [0, 4, 8], [2, 4, 6]             // Diagonales
];

export default function TicTacToe({ onClose, onComplete }: Props) {
  const { players } = useGameStore();
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const symbols = { [players[0]]: '❌', [players[1]]: '⭕' };

  const checkWinner = (boardState: Board) => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return players[boardState[a] === symbols[players[0]] ? 0 : 1];
      }
    }
    return null;
  };

  const checkDraw = (boardState: Board) => {
    return boardState.every(cell => cell !== null);
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = symbols[players[currentPlayer]];
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    const draw = checkDraw(newBoard);

    if (newWinner) {
      setWinner(newWinner);
      setTimeout(() => onComplete(newWinner), 1500);
    } else if (draw) {
      setIsDraw(true);
      // En cas d'égalité, on considère que le joueur 2 perd
      setTimeout(() => onComplete(players[0]), 1500);
    } else {
      setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="glass-card rounded-xl p-8 max-w-md w-full text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white/90"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-4">
          Morpion
        </h2>

        <div className="space-y-6">
          {!winner && !isDraw && (
            <p className="text-lg text-white/80">
              Tour de {players[currentPlayer]} ({symbols[players[currentPlayer]]})
            </p>
          )}

          <div className="grid grid-cols-3 gap-2 max-w-[300px] mx-auto">
            {board.map((cell, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: cell ? 1 : 1.05 }}
                whileTap={{ scale: cell ? 1 : 0.95 }}
                onClick={() => handleCellClick(index)}
                className={`h-24 flex items-center justify-center text-4xl ${
                  cell ? 'bg-white/20' : 'bg-white/10 hover:bg-white/15'
                } rounded-lg transition`}
                disabled={!!cell || !!winner || isDraw}
              >
                {cell}
              </motion.button>
            ))}
          </div>

          {(winner || isDraw) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold text-white"
            >
              {winner ? `${winner} gagne !` : "Match nul !"}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}