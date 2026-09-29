# Đừng Để Tiền Rơi - Stock Market Edition (MVP1)

Web game based on the Stock Market Edition concept.

Built with:
- Next.js App Router
- React
- Tailwind CSS
- Client-side state for the current MVP
- `localStorage` for the demo leaderboard

## 1. Product concept

This is a multiplayer-style stock market decision game inspired by the format of **Đừng Để Tiền Rơi**.

Each player:
- Enters a name before starting.
- Receives the same starting portfolio.
- Plays through 9 real historical events involving one company: Netflix (NFLX).
- Makes one investment decision per event: BUY / HOLD / SELL.
- Can choose the number of shares to buy or sell.
- Has a limited amount of time to make each decision.
- Sees the real historical market reaction after locking the decision.
- Finishes with a final portfolio value and ranking.

The current MVP is primarily a gameplay/UI prototype. The leaderboard is not yet a shared real-time leaderboard across different devices.

---

## 2. Current game rules

### Starting portfolio

Every player starts with:
- Cash: `$10,000`
- NFLX shares: `20`

All players must receive the same starting portfolio.

### Rounds

There are exactly 9 rounds.

Each round contains:
1. A historical event.
2. A player decision.
3. A market-price reveal.
4. A portfolio update.
5. A short explanation of the outcome.

### Decision options

#### BUY
The player chooses how many shares to buy.

The game must prevent:
- Buying more shares than the available cash allows.
- Invalid or negative quantities.

#### SELL
The player chooses how many shares to sell.

The game must prevent:
- Selling more shares than the player owns.
- Invalid or negative quantities.

#### HOLD
No transaction is made.

### Recommended decision timer

**Current MVP:** 30 seconds per question.

**Recommended next revision:** increase to **45 seconds per question**.

Reason:
- 9 × 30 seconds = only 4 minutes 30 seconds of decision time.
- With reveals and transitions, the game is still very fast.
- The questions are deliberately designed to contain historical context and tricky information.
- Players need enough time to read the event, understand the situation, decide how many shares to trade, and confirm the decision.

Recommended target:

```text
45 seconds × 9 rounds = 6 minutes 45 seconds
```

This should produce a more comfortable game length without making the game feel slow.

When changing the timer, update the **single source of truth** for the round duration rather than manually changing multiple UI components.

---

## 3. Question-writing rules

The historical questions are a major part of the game and should be written for a general audience, not only finance students.

### Questions should be friendly

Avoid overly technical wording such as:

> "Subscriber additions missed consensus estimates."

Prefer:

> "Netflix added fewer subscribers than Wall Street expected. The company was still growing quickly, but investors were starting to wonder whether that growth was slowing down."

### Every question should explain the situation

A good event should make the player understand:
- What happened?
- Why did it matter?
- What was the market worried or excited about?
- What information was available at that exact moment?

### Do not use hindsight

Never include information that became public after the decision date.

The player must make the decision using only information that would have been available at that historical moment.

### Keep the decision genuinely tricky

Avoid questions where the answer is obviously BUY or SELL.

Good events should contain mixed signals, for example:
- Strong revenue but weak subscriber growth.
- Strong growth but increasing competition.
- Great company results after a large stock-price rally.
- Bad results after a major stock-price decline.
- A negative headline with an important positive signal underneath.
- A positive headline where expectations were already extremely high.

The purpose is to test decision-making under uncertainty, not memorization.

---

## 4. Result / reveal UX

After a player locks a decision, the market result should be extremely easy to understand.

### Price movement

If the stock price rises:
- Use **green** for the price movement.
- Show a clear positive percentage.
- Example: `$100 → $112 (+12%)`

If the stock price falls:
- Use **red** for the price movement.
- Show a clear negative percentage.
- Example: `$100 → $82 (-18%)`

This color convention must remain consistent throughout the application.

### Important distinction

Green and red should primarily communicate **market direction**:

- Green = stock increased.
- Red = stock decreased.

Do not use color alone to communicate every piece of information. Important text should also explicitly say "increased" or "decreased" so the interface remains readable and accessible.

### Decision result

After the reveal, clearly state the outcome of the player's decision.

Possible states:

#### Good decision

Use a green visual treatment:

> 🟢 Quyết định sáng suốt

Explain why.

Example:
> You bought shares before the stock increased. Your position gained value.

#### Bad decision

Use a red visual treatment:

> 🔴 Quyết định sai

Explain why.

Example:
> You bought additional shares before the stock fell. Your portfolio lost value.

#### Neutral / limited impact

Use a neutral visual treatment:

> ⚪ Quyết định không tạo nhiều khác biệt

Use this when the decision had little or no meaningful effect on the player's final portfolio.

The result screen should show:
- Decision made.
- Number of shares bought/sold.
- Price before.
- Price after.
- Cash before.
- Cash after.
- Shares before.
- Shares after.
- Portfolio value before.
- Portfolio value after.
- Profit/loss from the event.
- Short explanation of why the decision worked or failed.

---

## 5. Visual design requirements

The current MVP can feel too dark and visually heavy.

### New visual direction

The interface should become:

- Bright.
- Clean.
- High contrast.
- Easy to scan.
- Friendly enough for non-finance users.
- Suitable for a game rather than a financial dashboard.

### Background

Prefer:
- White.
- Very light gray.
- Very light neutral backgrounds.

Avoid making the entire page dark.

Dark colors can still be used for:
- Headers.
- Navigation.
- Small labels.
- Strong contrast elements.

### Cards

Use bright cards with:
- White or very light backgrounds.
- Subtle borders.
- Small shadows.
- Rounded corners.
- Clear spacing.

Avoid excessive gradients and heavy shadows.

### Typography

**Use one consistent font family across the entire application.**

Do not mix several unrelated fonts between:
- Headings.
- Question text.
- Buttons.
- Numbers.
- Leaderboard.
- Result screens.

Recommended approach:
- Define the font once in the global CSS/theme.
- Use consistent font weights.
- Use a clear hierarchy:
  - Large bold heading.
  - Medium section heading.
  - Normal body text.
  - Smaller supporting text.

The interface should prioritize readability over decorative typography.

---

## 6. Color system

Keep the color system simple.

### Market colors

These are semantic colors and must remain consistent:

```text
GREEN = stock increased / positive market movement
RED   = stock decreased / negative market movement
```

Do not change the meaning of these colors between screens.

### Neutral UI colors

Use neutral colors for:
- Backgrounds.
- Cards.
- Borders.
- Secondary text.
- Disabled states.

### BUY / SELL / HOLD

Do not make the entire UI aggressively red or green just because the player is choosing an action.

The action buttons can have distinct visual identities, but the **market result colors must remain the strongest semantic signal**.

### Accessibility

Never communicate information using color alone.

For example:

Good:
```text
$112
+12%
↑ Increased
```

Better than:
```text
$112
```

with only green text.

Likewise:

```text
$82
-18%
↓ Decreased
```

---

## 7. Suggested screen hierarchy

### Start screen

```text
ĐỪNG ĐỂ TIỀN RƠI
STOCK MARKET EDITION

What's your name?

[ Your name ]

[ START GAME ]
```

Keep this screen simple.

### Game screen

Recommended order:

```text
ROUND 4 / 9
NETFLIX (NFLX)

Time remaining: 00:45

Cash
$8,500

Shares
35

Portfolio
$12,400

--------------------------------

WHAT HAPPENED?

[ Friendly historical event ]

--------------------------------

WHAT WILL YOU DO?

BUY
[ quantity ]

HOLD

SELL
[ quantity ]

[ LOCK DECISION ]
```

The player should never need to scroll excessively to understand the current decision.

### Reveal screen

Recommended order:

```text
MARKET REVEAL

$100 → $112
+12%
↑ Stock increased

YOUR DECISION
BUY 10 SHARES

PORTFOLIO RESULT
Before: $10,000
After:  $11,200

+$1,200

🟢 QUYẾT ĐỊNH SÁNG SUỐT

[ Explanation ]

[ NEXT ROUND ]
```

The most important information should be visible immediately.

---

## 8. Leaderboard

After round 9:

```text
FINAL LEADERBOARD

1. Minh       $21,450
2. Nam        $20,180
3. Tuyen      $18,740
4. An         $17,920
...
```

For the current player:

```text
YOU
#3
Tuyen
$18,740
```

The final screen should clearly separate:
- Final cash.
- Final shares.
- Final portfolio value.
- Total profit/loss.
- Final rank.

### Current MVP limitation

The current leaderboard uses:

```text
localStorage
```

Therefore it is only a **same-browser demo leaderboard**.

It does not automatically create a shared leaderboard between 30 different devices.

For the real multiplayer version, move:
- Room state.
- Player state.
- Decisions.
- Timer state.
- Final scores.
- Leaderboard.

to a shared backend/database.

Possible future options:
- Upstash Redis
- Supabase
- PostgreSQL
- Another realtime/shared database

---

## 9. Vercel deployment

The intended deployment workflow is:

```text
Local development
        ↓
GitHub
        ↓
Vercel
        ↓
Public game URL
```

Basic workflow:

```bash
npm install
npm run dev
```

After local testing:

```bash
git add .
git commit -m "update game"
git push
```

Then Vercel can deploy the latest GitHub commit.

For a real 30-player game, do not rely on browser-only state or in-memory server variables as the source of truth.

The server/backend must control:
- Current round.
- Round timer.
- Event.
- Price.
- Player decision.
- Player portfolio.
- Final ranking.

---

## 10. Important rules for future developers

When modifying the project:

### Do

- Keep all players on the same 9-event sequence.
- Keep historical events chronological.
- Keep event information historically accurate.
- Keep BUY/SELL quantity validation.
- Keep the market color convention consistent.
- Keep the decision result explicit.
- Keep the interface readable on desktop and laptop screens.
- Test the full 9-round flow after major changes.
- Test edge cases such as:
  - Buying zero shares.
  - Buying more than available cash.
  - Selling zero shares.
  - Selling more shares than owned.
  - Timer reaching zero.
  - Refreshing during a round.
  - Completing round 9.
  - Leaderboard sorting.

### Do not

- Do not reveal future information in a historical question.
- Do not silently change the starting portfolio.
- Do not mix different meanings for green/red.
- Do not introduce a different font for individual components without a strong reason.
- Do not make the entire UI dark again.
- Do not make the questions shorter just to save screen space if doing so removes important context.
- Do not treat the localStorage leaderboard as a real multiplayer leaderboard.
- Do not put the authoritative multiplayer game state only in the browser.

---

## 11. Recommended next MVP revision

Priority order:

### P0 — Gameplay

1. Increase timer from **30 → 45 seconds**.
2. Verify BUY/SELL quantity validation.
3. Verify all 9 historical events.
4. Verify result calculation after every decision.
5. Verify round 9 correctly transitions to the final screen.

### P1 — UI

1. Standardize the font.
2. Move from dark-heavy styling to a bright/light interface.
3. Improve contrast and spacing.
4. Make the question text easier to read.
5. Make market movement immediately recognizable:
   - Green = increase.
   - Red = decrease.
6. Make the decision result impossible to miss.

### P2 — Multiplayer

1. Shared room.
2. Shared 30-player state.
3. Server-controlled timer.
4. Realtime decisions.
5. Shared leaderboard.
6. Reconnect handling.

### P3 — Production polish

1. Mobile/responsive layout.
2. Animations for market reveal.
3. Sound effects.
4. Host/admin controls.
5. Game history/replay.
6. Persistent game results.

---

## 12. Core design principle

The game should feel like:

> **"I have limited time, incomplete information, and real money-like stakes. What would I actually do?"**

It should NOT feel like:

> "I am taking a finance multiple-choice quiz."

The difficulty should come from the **uncertainty of the real historical event**, not from complicated financial terminology.
