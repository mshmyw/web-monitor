let posX = 0;
let speedX = 10;
/**
 * 基于时间的更新
 * 位置更新 s2 = s1 + speed * intervalMsec*1
 * @param intervalMsec 时间间隔
 */
const update = (intervalMsec: number) => {
  let t: number = intervalMsec / 1000.0;
  posX += speedX*t;
  console.log("cur posX " + posX);
}

const render = (ctx: CanvasRenderingContext2D|null):void => {
  console.log("render ", ctx);
}

// let start = 0;
let lastTime = 0;
let count = 0;
export const step = (timestamp: number): void => {
  // if(!start) start = timestamp;
  if(!lastTime) lastTime = timestamp;

  // let elapsedMsec = timestamp - start;
  let intervalMsec = timestamp - lastTime;
  lastTime = timestamp;
  count++;
  if(count > 10) {
    return;
  }
  console.log(`$${count} timestamp = ${timestamp}`);
  // console.log(`$${count} elapsedMsec = ${elapsedMsec}`);
  console.log(`$${count} intervalMsec = ${intervalMsec}`);
  update(intervalMsec);
  render(null);
  requestAnimationFrame(step);
}

