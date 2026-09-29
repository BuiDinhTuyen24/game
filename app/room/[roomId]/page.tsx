'use client';

import { useState, useEffect } from 'react';
import { GAME_EVENTS } from '../../../lib/events';
import { processTransaction, calculateWealth } from '../../../lib/game-engine';

export default function GameRoom() {
  const [roundIdx, setRoundIdx] = useState(0);
  const [cash, setCash] = useState(10000);
  const [shares, setShares] = useState(20);
  const [decision, setDecision] = useState<string | null>(null);
  const [gameState, setGameState] = useState<'DECIDING' | 'REVEALED' | 'FINISHED'>('DECIDING');
  const [timer, setTimer] = useState(20);

  const currentEvent = GAME_EVENTS[roundIdx];
  const currentWealth = calculateWealth(cash, shares, gameState === 'REVEALED' ? currentEvent?.reveal_price : currentEvent?.execution_price);

  useEffect(() => {
    if (gameState === 'DECIDING' && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (gameState === 'DECIDING' && timer === 0) {
      handleLockDecision(decision || 'HOLD');
    }
  }, [timer, gameState, decision]);

  const handleLockDecision = (selected: string) => {
    const { newCash, newShares } = processTransaction(selected, cash, shares, currentEvent.execution_price);
    setCash(newCash);
    setShares(newShares);
    setDecision(selected);
    setGameState('REVEALED');
  };

  const handleNextRound = () => {
    if (roundIdx < GAME_EVENTS.length - 1) {
      setRoundIdx(roundIdx + 1);
      setGameState('DECIDING');
      setDecision(null);
      setTimer(20);
    } else {
      setGameState('FINISHED');
    }
  };

  if (gameState === 'FINISHED') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-bold text-green-500 mb-6">GAME OVER</h1>
        <p className="text-2xl mb-4">Final Wealth: ${currentWealth.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        <p className="text-gray-400">Cảm ơn bạn đã tham gia khóa học đầu tư Netflix!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <header className="flex justify-between items-center border-b border-gray-700 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">{currentEvent.title} - {currentEvent.date}</h1>
          <p className="text-gray-400">Mã CK: NFLX</p>
        </div>
        <div className="text-right">
          <p className="text-lg">Portfolio: <span className="font-bold text-green-400">${currentWealth.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></p>
          <p className="text-sm text-gray-400">Tiền mặt: ${cash.toLocaleString('en-US', { minimumFractionDigits: 2 })} | Cổ phiếu: {shares}</p>
        </div>
      </header>

      <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-blue-400">Tình hình thị trường</h2>
        <p className="text-lg leading-relaxed">{currentEvent.event_text}</p>
        
        <div className="mt-6 p-4 bg-gray-900 rounded-lg flex justify-between items-center">
          <span className="text-gray-400">Giá khớp lệnh:</span>
          <span className="text-2xl font-bold">${currentEvent.execution_price.toFixed(2)}</span>
        </div>
      </div>

      {gameState === 'DECIDING' ? (
        <div className="text-center">
          <div className="text-3xl font-bold mb-6 text-red-400">Thời gian: {timer}s</div>
          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => handleLockDecision('BUY')} className="bg-green-600 hover:bg-green-500 py-4 rounded-xl text-xl font-bold transition">BUY</button>
            <button onClick={() => handleLockDecision('HOLD')} className="bg-gray-600 hover:bg-gray-500 py-4 rounded-xl text-xl font-bold transition">HOLD</button>
            <button onClick={() => handleLockDecision('SELL')} className="bg-red-600 hover:bg-red-500 py-4 rounded-xl text-xl font-bold transition">SELL</button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">Kết quả thị trường</h2>
          <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg mb-4">
            <span className="text-gray-400">Giá trị thực tế sau sự kiện:</span>
            <span className="text-3xl font-bold text-green-400">${currentEvent.reveal_price.toFixed(2)}</span>
          </div>
          <div className="p-4 border-l-4 border-blue-500 bg-blue-900/20 mb-6">
            <p className="text-blue-200">{currentEvent.trick}</p>
          </div>
          <div className="text-center">
            <button onClick={handleNextRound} className="bg-blue-600 hover:bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold">
              Sang vòng tiếp theo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}