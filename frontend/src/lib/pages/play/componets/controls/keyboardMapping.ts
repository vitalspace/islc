// KeyboardMapping.ts
// Define mapeos de teclas para diferentes acciones del juego

import { inputManager } from './inputManager';

// Tipo para acciones del juego
export type GameAction =
  | 'moveForward'
  | 'moveBackward'
  | 'moveLeft'
  | 'moveRight'
  | 'jump'
  | 'sprint'
  | 'crouch'
  | 'interact';

// Mapa de acciones a teclas
export interface ActionMapping {
  [action: string]: string[];
}

// Clase que permite mapear acciones a teclas
export class KeyboardMapping {
  private mapping: ActionMapping = {};

  constructor() {
    // Configuración por defecto
    this.setDefaultMapping();
  }

  // Establece el mapeo predeterminado
  private setDefaultMapping() {
    this.mapping = {
      moveForward: ['w', 'arrowup'],
      moveBackward: ['s', 'arrowdown'],
      moveLeft: ['a', 'arrowleft'],
      moveRight: ['d', 'arrowright'],
      jump: [' '],
      sprint: ['shift'],
      crouch: ['control', 'c'],
      interact: ['e', 'f'],
    };

    // Inicializa todas las teclas en el input manager
    const allKeys = this.getAllKeys();
    inputManager.initKeys(allKeys);
  }

  // Obtiene todas las teclas usadas
  private getAllKeys(): string[] {
    const keys = new Set<string>();

    for (const action in this.mapping) {
      for (const key of this.mapping[action]) {
        keys.add(key);
      }
    }

    return Array.from(keys);
  }

  // Cambia el mapeo para una acción
  remapAction(action: GameAction, keys: string[]) {
    this.mapping[action] = keys;

    // Re-inicializar el input manager con las nuevas teclas
    const allKeys = this.getAllKeys();
    inputManager.initKeys(allKeys);
  }

  // Verifica si una acción está siendo ejecutada
  isActionActive(action: GameAction): boolean {
    if (!this.mapping[action]) return false;

    for (const key of this.mapping[action]) {
      if (inputManager.isKeyPressed(key)) {
        return true;
      }
    }

    return false;
  }

  // Verifica si una acción acaba de ser activada
  isActionJustActivated(action: GameAction): boolean {
    if (!this.mapping[action]) return false;

    for (const key of this.mapping[action]) {
      if (inputManager.isKeyJustPressed(key)) {
        return true;
      }
    }

    return false;
  }

  // Verifica si una acción acaba de ser desactivada
  isActionJustDeactivated(action: GameAction): boolean {
    if (!this.mapping[action]) return false;

    for (const key of this.mapping[action]) {
      if (inputManager.isKeyJustReleased(key)) {
        return true;
      }
    }

    return false;
  }

  // Devuelve el mapeo actual
  getMapping(): ActionMapping {
    return { ...this.mapping };
  }
}

// Singleton para usar en toda la aplicación
export const keyboardMapping = new KeyboardMapping();