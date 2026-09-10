# BOTHER brand system and motion completion

## Scope

- Preserve the existing coded `Wordmark` exactly as-is.
- Keep all existing page copy, routes, forms, video placements, metadata, and structured data intact.
- Complete and verify the already-started cinematic motion layer while replacing the previous plum/ochre visual system across the whole site.

## Brand system

- Replace the global palette with the exact paper, ink, amber, muted amber, deep teal, and charged teal roles from the playbook.
- Remove the utility-blue token and remap every old plum/ochre use by purpose: deep teal for dense structural surfaces, amber for precise interruption details, muted amber for tactile panels, and charged teal only for release/success feedback.
- Update borders, focus states, selection, buttons, cards, forms, portraits, cursor, page wipe, video treatment, and shared route surfaces to use the new roles.
- Keep Space Grotesk for display type, load and use Inter for body copy, and add IBM Plex Mono only for labels, navigation controls, pricing eyebrows, captions, and statuses.

## Morphing navigation

- Replace the current header links with a persistent wordmark plus a top-right `MENU` pill.
- Animate that same pill into a right-side, full-height deep-teal panel using shared layout animation; use 40% desktop width and full mobile width.
- Add staggered Space Grotesk links for Home, Signal, Carry, Systems, Work, About, and Contact, with precise amber hover marks and a short charged-teal release flash before navigation.
- Add quiet IBM Plex Mono utility links for Careers, Legal, and Terms.
- Implement keyboard focus trapping, Escape-to-close, trigger-focus restoration, scroll locking, and instant show/hide behavior for reduced motion.

## Motion and visual devices

- Retain and verify the already-wired Home/About scroll highlights, Home clip-line headline, global cursor and page wipe, magnetic primary actions, and founder portrait reveal/parallax/duotone/tilt treatment.
- Refine the Home problems-to-paths flow as one pinned authored sequence and ensure work/case cards receive staggered entry plus crop-shift hover behavior.
- Add three minimal reusable SVG devices: paired rails between Home problems and paths, route-line markers near pricing actions, and one interrupted line beside the Systems workflow-brief explanation.
- Coordinate menu link release feedback with route wipes so the animations occur in sequence rather than overlap.
- Preserve all reduced-motion and keyboard-accessible end states.

## Technical details

- Update shared styles and shared templates first, then adjust route-specific exceptions and legacy color classes found in remaining pages.
- Load Inter and IBM Plex Mono from document-head stylesheet links with `display=swap`; remove the Satoshi stylesheet link.
- Keep semantic tokens as the only color source in page and component code.
- Validate with focused source searches for removed tokens/fonts, TypeScript checks, a production build, and Playwright checks at desktop and mobile sizes for menu behavior, focus handling, Home, About, Systems, and work-card motion.

## Completion report

- Report what is fully wired, any genuinely blocked partial work, build status, and explicit confirmation that `Wordmark.tsx` was not modified.
