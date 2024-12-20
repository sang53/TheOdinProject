This project is an extension of the original project requirements outlined by The Odin Project.

This Project tests & benchmarks two different algorithms of searching: BFS & A*.

The default estimation function for A* algorithm is the distance formula (xDiff ** 2 + yDiff ** 2).
However this can be changed to others or from user input.

Options:
  Calculate:
    Takes user input start & end positions
    Displays answer from A* algorithm on the board
    Benchmarks both algorithms according to multiples
    
  Stress Test:
    Benchmarks both algorithms on every possible combination of start & end positions on current board size

Customisables:
  Board Size (default 8): 
    How many squares are on each side of the board
    The board must be a square
    Must be an integer between 8 & 20

  Multiples (default 1):
    How many times each algorithm is ran to benchmark
    Must be an integer between 1 & 999

  Start & End Position:
    Start and End positions of the chess piece used in calculations
    Must be of the pattern "x, y" - where 0 < x && y < board size - 1 and integers

  Estimation Function:
    Estimation function to be used for heap comparator in A* algorithm
    Must accept (x, y) parameters
    this.endPos = [x, y] of End Position;
    Min Heap - smaller values will be popped first
    Click radio buttons to fill textarea with selected function
    Note: estimation function seems to get slower (~15%?) after first change - perhaps due to how functions are evaluated from strings? || how function objects are created?

  Can be added:
    Piece (currently only knight) - most other chess pieces can be moved to another square in 1-2 moves. However, other moving patterns can be added easily