# GeoGuessr Game Setup Instructions

## Overview
The GeoGuessr page is now set up as the fifth page of your application. Here's how to configure it:

## Required Images
Place these images in `/web/public/images/`:

1. **map.jpg** - The main map that users will click on to place their guesses
2. **round1.jpg** - The location image for round 1
3. **round2.jpg** - The location image for round 2
4. **round3.jpg** - The location image for round 3
5. **round4.jpg** - The location image for round 4
6. **round5.jpg** - The location image for round 5

## Setting Up Correct Answers

1. **Run the development server** (it should already be running)
2. **Navigate to the fifth page** by scrolling down through all pages
3. **For each round**, look at the location image and click on the map where you think that location should be
4. **Check the browser console** - you'll see debug messages like:
   ```
   PIN DROPPED: x: 245, y: 187
   ```
5. **Copy these coordinates** and update the `correctAnswer` values in the `gameRounds` array in `GeoGuessrPage.jsx`

## Example Configuration

```javascript
const gameRounds = [
  {
    id: 1,
    image: 'round1.jpg',
    correctAnswer: { x: 245, y: 187 }, // Update with your coordinates
    description: 'Round 1'
  },
  // ... etc for other rounds
];
```

## Game Features

- **5 rounds total** with different location images
- **Interactive map clicking** to place pins
- **Pin movement** - users can click multiple times to adjust their guess
- **Scoring system** - 0-5000 points per round based on distance from correct answer
- **Visual feedback** - shows both user pin (red) and correct answer (green) after submission
- **Final score** - displays total score out of 25000 with round breakdown
- **Play again** functionality to restart the game

## Scoring Algorithm

- **Perfect guess** (within 10px): 5000 points
- **Maximum distance** (500px or more): 0 points
- **Between**: Linear interpolation between 5000 and 0 points

## Debug Console Messages

While playing, you'll see helpful debug information:
- Pin placement coordinates for setting up correct answers
- Distance calculations and scores for each round

Enjoy setting up your personalized GeoGuessr game!
