# Planning

## Starting point

The initial idea:

> Frog eating flies

We want to add at least 5 new features of varying complexity to the base Frogfrogfrog game.

## Ideas

- scoring system
- random fly speed
- random fly size
- random fly flight pattern (straight, wave, random)
- wasps stun frog for a time
- add tongue sfx
- improved frog visuals
    - eyes
    - mouth
    - tongue
- visually bringing the fly back to the frog’s mouth on capture
- keep frog within bounds of canvas
- control tongue length based on click duration (if pressed => extend, if released => retract)
- more than 1 bug at once
- bugs coming from both sides
- frog boss battle
- title screen
- game over screen

## Selected & expanded ideas

MVP (* => lower priority):
1. scoring system
    - eating a fly fills stomach some amount
    - stomach gradually empties with time
    - start game at certain fill
    - visual: stomach icon that gets bigger/smaller or color fills up/down
    - visual: game over screen shows restart btn, *time, *# of eaten flies
2. improve flies
    - random flight speed
    - add wave flight pattern
    - *coming in either from left or right
    - *multiple flies at once
3. add wasps
    - if eaten, stuns the frog for a time and can't extend tongue
    - can appear at same time as fly
    - visual: bigger than flies, yellow, pointy
    - visual: tongue disappears immediately/doesn't retract like with the flies
4. improved frog visuals
    - eyes; normal, stunned, game over
    - mouth; different-colored line
    - tongue; circle at the end
    - on lilypad
5. QoL
    - frog stays within bounds of canvas
    - *title screen
    - *frog tongue sfx

Bonus:
1. Modified tongue controls
    - if mousePress, extend (up to canvas height)
    - if MouseRelease, retract (down to frog's y coordinate)
2. QoL
    - visually bringing the fly back to the frog’s mouth on capture
3. Evil Frog boss battle
    - dis/appears on some interval at the top of the screen
    - random x coordinate based on player's current position?
    - if its tongue hits you, your stomach empties by some amount