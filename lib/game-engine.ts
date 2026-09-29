export function processTransaction(decision: string, cash: number, shares: number, execPrice: number) {
  if (decision === 'BUY') {
    const maxSharesToBuy = Math.floor(cash / execPrice);
    if (maxSharesToBuy > 0) {
      return {
        newCash: cash - (maxSharesToBuy * execPrice),
        newShares: shares + maxSharesToBuy
      };
    }
  } else if (decision === 'SELL') {
    if (shares > 0) {
      return {
        newCash: cash + (shares * execPrice),
        newShares: 0
      };
    }
  }
  // HOLD or invalid
  return { newCash: cash, newShares: shares };
}

export function calculateWealth(cash: number, shares: number, currentPrice: number) {
  return cash + (shares * currentPrice);
}