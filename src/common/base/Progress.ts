/**
 * Progress bar
 */

import process from "process";
import rdl from "readline";

class Progress {
  cursor: number;
  timer?: NodeJS.Timeout;

  constructor(readonly size: number) {
    this.cursor = 0;
    this.timer = undefined;
  }

  goto(percentage: number) {
    rdl.cursorTo(process.stdout, this.cursor);
    const size = this.size * (percentage / 100);

    let count = this.cursor;

    while (count < size) {
      process.stdout.write("\u2588");
      count++;
    }
    this.cursor = count;

    if (this.cursor >= this.size) {
      process.stdout.write("\n");
    }
  }

  start() {
    process.stdout.write("\x1B[?25l");
    for (let i = 0; i < this.size; i++) {
      process.stdout.write("\u2591");
    }
  }

  stop() {
    this.goto(100);
  }
}

export default Progress;
