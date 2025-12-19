import chokidar from "chokidar";
import { isCursorActive } from "./activeApp.js";
import { triggerBrainrot } from "./trigger.js";

const WATCH_DIR = process.cwd();
let cooldown = false;

const watcher = chokidar.watch(WATCH_DIR, {
  ignored: /node_modules|\.git/,
  persistent: true,
});

watcher.on("change", async () => {
  if (cooldown) return;

  const cursorActive = await isCursorActive();
  if (!cursorActive) return;

  cooldown = true;
  triggerBrainrot();

  setTimeout(() => {
    cooldown = false;
  }, 12000);
});

console.log("cursor-brainrot running. Ctrl+C to escape.");
