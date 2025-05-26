
export interface Player {
    id: string,
    position: {
        x: number,
        y: number,
        z: number
    }
    rotation: {
        x: number,
        y: number,
        z: number,
        w: number
    }
    health: number,
    currentRoom: string;
}

export interface DinamicObject {
    id: string,
    position: {
        x: number,
        y: number,
        z: number
    }
    rotation: {
        x: number,
        y: number,
        z: number,
        w: number
    }
}
