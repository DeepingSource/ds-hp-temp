# Model demo clips (`/technology/models`)

Per-model demo videos for the Vision Models catalog (feedback #9.1). Wiring is already
in place — a model shows a looping demo clip instead of its static image as soon as a
file lands here **and** the model name is added to `MODEL_DEMOS`.

## How to add a demo

1. Export a short (~3–8s), muted, looping clip of the model's real output.
2. Save it here as `<model-name>.mp4` — the name must match the model id in
   `src/components/corporate/views/ModelsView.tsx` (e.g. `person-detect.mp4`,
   `pose-estimate.mp4`, `mtmc-track.mp4`).
3. Add `<model-name>` to the `MODEL_DEMOS` set in `ModelsView.tsx`.

That's it. The card renders `LoopVideo` (poster-first, lazy, autoplay-on-scroll,
respects `prefers-reduced-motion`). The poster reuses the existing still at
`public/images/models/<model-name>.webp`, so no separate poster is needed.

## Encoding guidance

- **Format**: H.264 MP4, `-movflags +faststart`. Optionally add a `.webm` (VP9) sibling
  and pass it as `webm=` if you want smaller files — LoopVideo already supports it.
- **Size**: 4:3 crop (cards are `aspect-[4/3]`), ≤ ~1200px wide, aim for < 2 MB.
- **No audio** (clips play muted). Keep them loop-seamless.

## Model ids

count/recognition/space/flow/generation models — the full list lives in the `ko`/`en`/`jp`
`models` arrays in `ModelsView.tsx`. Filenames are the lowercase-hyphen `name` field
(e.g. `face-anon`, `reid-embed`, `flow-density`, `queue-detect`, `scene-caption`).
