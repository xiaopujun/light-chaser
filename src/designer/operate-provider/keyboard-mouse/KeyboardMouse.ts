import eventManager from "../core/EventManager";

class KMMap {
    A: boolean = false;
    B: boolean = false;
    C: boolean = false;
    D: boolean = false;
    E: boolean = false;
    F: boolean = false;
    G: boolean = false;
    H: boolean = false;
    I: boolean = false;
    J: boolean = false;
    K: boolean = false;
    L: boolean = false;
    M: boolean = false;
    N: boolean = false;
    O: boolean = false;
    P: boolean = false;
    Q: boolean = false;
    R: boolean = false;
    S: boolean = false;
    T: boolean = false;
    U: boolean = false;
    V: boolean = false;
    W: boolean = false;
    X: boolean = false;
    Y: boolean = false;
    Z: boolean = false;
    Digit0: boolean = false;
    Digit1: boolean = false;
    Digit2: boolean = false;
    Digit3: boolean = false;
    Digit4: boolean = false;
    Digit5: boolean = false;
    Digit6: boolean = false;
    Digit7: boolean = false;
    Digit8: boolean = false;
    Digit9: boolean = false;
    Minus: boolean = false;
    Equal: boolean = false;
    BracketLeft: boolean = false;
    BracketRight: boolean = false;
    Backslash: boolean = false;
    Semicolon: boolean = false;
    Quote: boolean = false;
    Backquote: boolean = false;
    Comma: boolean = false;
    Period: boolean = false;
    Slash: boolean = false;
    Escape: boolean = false;
    Enter: boolean = false;
    Tab: boolean = false;
    Backspace: boolean = false;
    Insert: boolean = false;
    Delete: boolean = false;
    ArrowUp: boolean = false;
    ArrowDown: boolean = false;
    ArrowLeft: boolean = false;
    ArrowRight: boolean = false;
    PageUp: boolean = false;
    PageDown: boolean = false;
    Home: boolean = false;
    End: boolean = false;
    CapsLock: boolean = false;
    ScrollLock: boolean = false;
    NumLock: boolean = false;
    Pause: boolean = false;
    ShiftLeft: boolean = false;
    ShiftRight: boolean = false;
    ControlLeft: boolean = false;
    ControlRight: boolean = false;
    AltLeft: boolean = false;
    AltRight: boolean = false;
    MetaLeft: boolean = false;
    MetaRight: boolean = false;
    Space: boolean = false;
    // 鼠标按键
    LeftClick: boolean = false;
    RightClick: boolean = false;
    MiddleClick: boolean = false;
    Back: boolean = false;
    Forward: boolean = false;
    ScrollUp: boolean = false;
    ScrollDown: boolean = false;
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
            if (key in this.keys) {
                this.keys[key as keyof KMMap] = true;
            }
        });
        eventManager.register('keyup', (e: KeyboardEvent) => {
            let key = e.key.toUpperCase()
            if (key in this.keys) {
                this.keys[key as keyof KMMap] = false;
            }
        });
    }
}

const keyboardMouse = new KeyboardMouse();
export default keyboardMouse.keys;