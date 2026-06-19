# Plus Agent (store agent) UI kit

A pixel-leaning recreation of the Plus Agent chat surface — the conversational analytics product in the SAAI family. The kit is intentionally cosmetic-only: components are factored cleanly but state is fake, and there is no real chart engine wired up.

## What's here

| Component | Role |
|---|---|
| `Sidebar.jsx` | Fixed left rail — brand, "New chat", store selector, history grouped by Today / Yesterday / Earlier, footer actions. |
| `ChatTitleBar.jsx` | Sticky top bar — store pill, page title, more menu. Translucent over chat content with `backdrop-filter`. |
| `EmptyState.jsx` | Centered SAAI symbol + "Ask anything about your store" + composer. Shown on a new chat. |
| `MessageThread.jsx` | Stack of user (grey-25 pill) + bot (flat) messages. Bot supports an inline chart-card embed with a Show chart CTA. |
| `Composer.jsx` | Pill-shaped input + send. Send icon flips from grey → blue when input has text. |
| `Recommendations.jsx` | Suggested-question list with a Refresh suggestions button. |
| `IconButton.jsx`, `Icon.jsx` | Tiny primitives. Icon resolves to `/assets/icons/icon-<name>.svg`. |
| `index.html` | Stitches all of the above into an interactive click-thru of the product. |

## Click-thru flow inside `index.html`

1. Lands on the empty state — symbol + "Ask anything about your store".
2. Click any recommendation **or** type and press send.
3. The empty state collapses, your message renders as a user bubble, a streaming bot reply types in, then a "Show chart" inline card appears.
4. Click "Show chart" to reveal a faux chart panel (image placeholder) sliding in from the right.
5. Click "New chat" in the sidebar at any time to reset.

State is local only; nothing persists across reload.
