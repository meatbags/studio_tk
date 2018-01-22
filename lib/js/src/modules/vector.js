class Vector {
  constructor(x, y) {
    this.x = (x) ? x : 0;
    this.y = (y) ? y : 0;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default Vector;
