import eventManager from "../core/EventManager";

class KMMap {
    Space: boolean = false;
    // 鼠标按键
    LeftClick: boolean = false;
    RightClick: boolean = false;
    MiddleClick: boolean = false;
}


class KeyboardMouse {
    keys: KMMap = new KMMap();

    constructor() {
        eventManager.register('pointerdown', (e: PointerEvent) => {
            if (e.button === 0)
                this.keys.LeftClick = true;
            else if (e.button === 2)
                this.keys.RightClick = true;
        });
        eventManager.register('pointerup', (e: PointerEvent) => {
            if (e.button === 0)
                this.keys.LeftClick = false;
            else if (e.button === 2)
                this.keys.RightClick = false;
        });
        eventManager.register('keydown', (e: KeyboardEvent) => {
            let key = e.key.toUpperCase()
            if (key === ' ') {
                this.keys.Space = true;
                return;
            }
            if (key in this.keys) {
                this.keys[key as keyof KMMap] = true;
            }
        });
        eventManager.register('keyup', (e: KeyboardEvent) => {
            let key = e.key.toUpperCase()
            if (key === ' ') {
                this.keys.Space = false;
                return;
            }
            if (key in this.keys) {
                this.keys[key as keyof KMMap] = false;
            }
        });
    }
}

const keyboardMouse = new KeyboardMouse();
export default keyboardMouse.keys;