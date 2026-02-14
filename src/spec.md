# Specification

## Summary
**Goal:** Build a kid-friendly learning game where children can practice Letters, Numbers, and Colors through short multiple-choice rounds, with saved progress per category.

**Planned changes:**
- Create a home screen as the default view with category selection (Letters, Numbers, Colors) and a clear Start action.
- Implement the game loop: one prompt at a time, 3–4 large answer choices, immediate correct/incorrect feedback, a 10-question round, and an end-of-round summary with stars earned.
- Add a built-in question bank for Letters, Numbers, and Colors, with random selection and no repeats within a round when possible.
- Add per-category progress tracking (best score, total rounds played) persisted on the backend when the user principal is available, and display progress on the home screen (or a simple Progress view).
- Apply a consistent playful children’s theme (warm/bright palette, rounded UI, large typography) without a blue/purple primary palette.
- Add and render required static generated images (mascot, background, category icons) from `frontend/public/assets/generated`.

**User-visible outcome:** A child can pick a category, play a 10-question multiple-choice round with instant feedback and a star reward summary, and see saved best scores/rounds played per category when signed in.
