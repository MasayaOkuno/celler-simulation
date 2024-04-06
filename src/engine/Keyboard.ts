class Keyboard {
    private _keys: { [key: string]: boolean }
    constructor() {
        this._keys = {}
        document.addEventListener("keydown", (event) => {
            this._keys[event.key.toLowerCase()] = true
        })
        document.addEventListener("keyup", (event) => {
            this._keys[event.key.toLowerCase()] = false
        })
    }
    public keys(...keys: string[]): boolean {
        return keys.every((key) => this._keys[key])
    }
}
  
export { Keyboard }
  
