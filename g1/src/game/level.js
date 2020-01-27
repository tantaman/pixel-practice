/*
Levels are automatically generated
But going backwards should recall what was already generated rather than creating something entirely new

The generation algorithm could thus be deterministic based upon x input coordinate.
Or we can cache what was generated.

Lets go with determinism:
Benefits:
1. Less memory (but there is plenty of memory)
2. Slightly less complicated? pure functions rather than look-aside & function
3. can re-create the same level again

Drawbacks:
1. Player can go forward then back then forward and forward stays the same rather than being new
2. quick save / quick load and play through means seeing the same stuff again
3. more complicated? have to figure out how to make functions consistent rather than just memoizing them.

Seems like a tossup.

Technically we have to cache the current screen +/- N of the world so it is always available for re-drawing without re-calculation.
*/

type GameSeed = {
  time: number
};

type Point = {
  x: number,
  y: number
};

type TileType =
  | "PLATFORM_TOP_CENTER"
  | "PLATFORM_TOP_LEFT_CORNER"
  | "PLATFORM_TOP_RIGHT_CORNER"
  | "PLATFORM_LEFT_BODY"
  | "PLATFORM_CENTER_BODY"
  | "PLATFORM_RIGHT_BODY"
  | "PLATFORM_BOTTOM_CENTER"
  | "PLATFORM_BOTTOM_LEFT_CORNER"
  | "PLATFORM_BOTTOM_RIGHT_CORNER"
  | "SKY"
  | "WATER";

type Tile = {
  type: TileType,
  position: Point
};

type GenerativeTile = {
  type: TileType,
  seed: GameSeed,
  position: Point,

  // needs to take in all adjacent tiles in order to generate another one.
  topTile: () => GenerativeTile,
  bottomTile: () => GenerativeTile,
  leftTile: () => GenerativeTile,
  rightTile: () => GenerativeTile,
  asTile: () => Tile
};

// we have some assumptions on how the level must be generated. We should add tests that enforce those assumptions and document them.
class Level {
  _tileCache: TileCache,

  constructor(seed: GameSeed, viewport: Viewport) {
    this._seed = seed;
    this._placeFirstTile(seed);
  }

  getTiles(viewport: Viewport): Tile {
    // instead of the prior algorithm
    // lets get all the tiles required to fill the viewport. For tiles that do not exist
    // we'll return "UngeneratedTiles" which will know of their neighbors
    // and which we can then generate into real tiles.
    // since the player can move in random patterns, we need a quad tree to save tiles.
    // https://github.com/timohausmann/quadtree-js

    const tile = this._tileCache.getTile(point);
    if (tile != null) {
      return tile;
    }

    this._generateNewTilesAndCache(position);
    return this._tileCache.getTileX(point);
  }

  _generateNewTilesAndCache(viewport: Viewport, point: Point): void {
    // We have to have an existing tile from which to begin generation
    const startingTile = this._getStartingTile(viewport, point);

    // now we can generate outward from the starting tile to fill the viewport
  }
}

// or just use a quad tree instead?
class TileCache {
  _position: Point,
  _width: number,
  _height: number

  constructor() {
    
  }

  getTile: (position: Point) => Tile;
  getAdjacentTile: (position: Point) => Tile;
}

