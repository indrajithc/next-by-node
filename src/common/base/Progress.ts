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
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setInterval(() => {
      const size = this.size * (percentage / 100);
      process.stdout.write("\u2588");
      this.cursor++;

      if (this.cursor >= size) {
        clearTimeout(this.timer);
        if (this.cursor >= this.size) {
          process.stdout.write("\n");
        }
      }
    }, 5);
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
