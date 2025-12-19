import activeWin from "active-win";

export async function isCursorActive() {
  const win = await activeWin();
  if (!win) return false;

  return win.owner.name.toLowerCase().includes("cursor");
}
