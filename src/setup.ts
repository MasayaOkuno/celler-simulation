import { Canvas, Keyboard, Mouse } from "./engine"

const canvas = new Canvas()
const keyboard = new Keyboard()
const mouse = new Mouse(canvas)

function gameloop(execute: () => void) {
    execute()
    requestAnimationFrame(() => gameloop(execute))
}

export { canvas, keyboard, mouse, gameloop }
