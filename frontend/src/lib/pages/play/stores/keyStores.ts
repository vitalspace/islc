// src/controls/keyboard.ts
import { writable } from 'svelte/store';

export const keys = writable({
  a: { isPressed: false },
  d: { isPressed: false },
  w: { isPressed: false },
  s: { isPressed: false },
  space: { isPressed: false },
  e: { isPressed: false },
});

function updateKey(code: number, down: boolean) {
  keys.update(k => {
    switch (code) {
      case 65: k.a.isPressed = down; break;
      case 68: k.d.isPressed = down; break;
      case 87: k.w.isPressed = down; break;
      case 83: k.s.isPressed = down; break;
      case 32: k.space.isPressed = down; break;
      case 69: k.e.isPressed = down; break;
    }
    return k;
  });
}

export function initKeyboard() {
  const onDown = (e: KeyboardEvent) => { e.preventDefault(); updateKey(e.keyCode, true); };
  const onUp = (e: KeyboardEvent) => { e.preventDefault(); updateKey(e.keyCode, false); };
  window.addEventListener('keydown', onDown);
  window.addEventListener('keyup', onUp);
  return () => {
    window.removeEventListener('keydown', onDown);
    window.removeEventListener('keyup', onUp);
  };
}

// folio
// 66722332