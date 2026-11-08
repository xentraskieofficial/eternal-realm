# Eternal Realm — Tactical 5v5

A browser-based tactical FPS prototype inspired by competitive hero shooters, built with Three.js.

## Current build

- First-person 3D arena with A and B bomb sites, cover, buildings, lighting, and fog.
- 5v5 match structure: player plus four allied AI agents versus five enemy AI agents.
- Basic bot combat: target selection, line-of-sight checks, movement, firing, and damage.
- Round scoring, attack/defense win conditions, player health and armor.
- Spike planting interaction at either site and a timed detonation objective.
- Buy phase with Classic, Spectre, Vandal, Phantom, Operator, and heavy shield.
- Desktop controls and touch controls for mobile browsers.
- Practice mode.

## Controls

**Desktop:** WASD move, mouse aim, left click fire, R reload, E hold to plant, B opens buy phase, Shift sprint, Space jump, Esc releases mouse.

**Mobile:** left joystick move, drag the right side to aim, FIRE to shoot, R to reload, USE to plant.

## Run locally

Open `index.html` through a local web server. Three.js is loaded from jsDelivr, so an internet connection is required.

## Notes

This is an evolving single-player-vs-AI prototype. It is not an online multiplayer game yet. Bot navigation and combat are foundational systems and will need further balancing and pathfinding improvements.
