import { Canvas } from "./Canvas"

class Mouse {
    canvas: Canvas
    x: number
    y: number
    left: boolean
    middle: boolean
    right: boolean
    debug: boolean

    constructor(canvas: Canvas) {
        this.canvas = canvas
        this.x = 0
        this.y = 0
        this.left = false
        this.middle = false
        this.right = false
        this.debug = false

        document.addEventListener("mousemove", (event) => {
            // console.log("I am moving!")
            this.x = event.clientX - this.canvas.width / 2
            this.y = -(event.clientY - this.canvas.height / 2)
        })
        document.addEventListener("mousedown", (event) => {
            if (event.button === 0)
                this.left = true
            else if (event.button === 1)
                this.middle = true
            else if (event.button === 2)
                this.right = true
            if (this.debug)
                console.log('Mouse pressed:', event.button)
        })
        document.addEventListener("mouseup", (event) => {
            if (event.button === 0)
                this.left = false
            else if (event.button === 1)
                this.middle = false
            else if (event.button === 2)
                this.right = false
            if (this.debug)
                console.log('Mouse released:', event.button)
        })
        document.addEventListener("contextmenu", (event) => {
            event.preventDefault()
        })
    }
}

export { Mouse }

