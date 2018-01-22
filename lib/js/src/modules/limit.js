class Limit {
  constructor(min, max) {
    this.min = (min) ? min : 0;
    this.max = (max) ? max : 0;
  }

  set(min, max) {
    this.min = min;
    this.max = max;
  }

  collision(value) {
    // check if inside limit

    return (value >= this.min && value <= this.max);
  }

  clamp(value) {
    // clamp value inside limit

    return Math.min(this.max, Math.max(this.min, value));
  }
}

export default Limit;
