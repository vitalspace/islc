// InputManager.ts
// Clase para manejar los inputs del usuario de forma reutilizable

// Interfaz para definir el estado de una tecla
export interface KeyState {
    isPressed: boolean;
    justPressed: boolean;
    justReleased: boolean;
  }
  
  // Interfaz para el mapa de teclas
  export interface KeyMap {
    [key: string]: KeyState;
  }
  
  // Clase para manejar las entradas del teclado
  export class InputManager {
    keys: KeyMap = {};
    
    // Método para inicializar las teclas que queremos monitorear
    initKeys(keyList: string[]) {
      for (const key of keyList) {
        this.keys[key] = {
          isPressed: false,
          justPressed: false,
          justReleased: false,
        };
      }
    }
  
    // Método para activar los event listeners
    activate() {
      document.addEventListener("keydown", this.handleKeyDown.bind(this));
      document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }
  
    // Método para desactivar los event listeners
    deactivate() {
      document.removeEventListener("keydown", this.handleKeyDown.bind(this));
      document.removeEventListener("keyup", this.handleKeyUp.bind(this));
    }
  
    // Handler para keydown
    private handleKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (this.keys[key]) {
        if (!this.keys[key].isPressed) {
          this.keys[key].justPressed = true;
        }
        this.keys[key].isPressed = true;
        e.preventDefault();
      }
    }
  
    // Handler para keyup
    private handleKeyUp(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (this.keys[key]) {
        this.keys[key].isPressed = false;
        this.keys[key].justReleased = true;
        e.preventDefault();
      }
    }
  
    // Método para actualizar el estado de las teclas (llamar en cada frame)
    update() {
      for (const key in this.keys) {
        // Resetear justPressed y justReleased después de un frame
        if (this.keys[key].justPressed) {
          this.keys[key].justPressed = false;
        }
        if (this.keys[key].justReleased) {
          this.keys[key].justReleased = false;
        }
      }
    }
  
    // Método para verificar si una tecla está presionada
    isKeyPressed(key: string): boolean {
      return this.keys[key]?.isPressed || false;
    }
  
    // Método para verificar si una tecla fue recién presionada
    isKeyJustPressed(key: string): boolean {
      return this.keys[key]?.justPressed || false;
    }
  
    // Método para verificar si una tecla fue recién liberada
    isKeyJustReleased(key: string): boolean {
      return this.keys[key]?.justReleased || false;
    }
  
    // Método para obtener el mapa de teclas directamente
    getKeyMap(): KeyMap {
      return this.keys;
    }
  }
  
  // Singleton para usar en toda la aplicación
  export const inputManager = new InputManager();