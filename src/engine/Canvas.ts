class Canvas {
    width: number
    height: number
    protected loadedImages: { [key: string]: HTMLImageElement } = {}
    protected ctx: CanvasRenderingContext2D
  
    constructor() {
        var canvas = document.querySelector("canvas") as HTMLCanvasElement
        this.width = canvas.width = window.innerWidth
        this.height = canvas.height = window.innerHeight
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        this.setup()
    }
    protected centerOrigin() {
        this.ctx.translate(this.width / 2, this.height / 2)
    }
    protected flipYAxis() {
        this.ctx.scale(1, -1)
    }
    protected setup() {
        this.centerOrigin()
        this.flipYAxis()
        this.ctx.save()
    }
    erase() {
        this.ctx.clearRect(
            0 - this.width / 2,
            0 - this.height / 2,
            this.width * 2,
            this.height * 2
        )
    }
    fillText(text: string, x: number, y: number, color: string, size: number) {
        this.ctx.fillStyle = color
        this.ctx.font = `${size}px Arial`
        this.ctx.save()
        this.flipYAxis()
        this.ctx.fillText(text, x, -y)
        this.ctx.restore()
    }
    fillRectangle(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string
    ) {
        this.ctx.fillStyle = color
        this.ctx.fillRect(x - width / 2, y - height / 2, width, height)
    }
    strokeRectangle(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string
    ) {
        this.ctx.strokeStyle = color
        this.ctx.strokeRect(x - width / 2, y - height / 2, width, height)
    }
    fillCircle(x: number, y: number, radius: number, color: string) {
        this.ctx.fillStyle = color
        this.ctx.beginPath()
        this.ctx.arc(x, y, radius, 0, Math.PI * 2, false)
        this.ctx.fill()
        this.ctx.closePath()
    }
    displayImage(filepath: string, x: number, y: number, scale: number = 1) {
        let image = this.loadedImages[filepath]
        if (!image)
            image = new Image(); image.src = filepath
        this.ctx.save()
        this.flipYAxis()
        this.ctx.drawImage(image, x, -y, image.width * scale, image.height * scale)
        this.ctx.restore()
    }
    strokeCircle(x: number, y: number, radius: number, color: string) {
        this.ctx.strokeStyle = color
        this.ctx.beginPath()
        this.ctx.arc(x, y, radius, 0, Math.PI * 2, false)
        this.ctx.stroke()
        this.ctx.closePath()
    }
    line(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        color: string,
        thickness: number,
        dash: number[] = []
    ) {
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = thickness
        this.ctx.beginPath()
        this.ctx.setLineDash(dash)
        this.ctx.moveTo(x1, y1)
        this.ctx.lineTo(x2, y2)
        this.ctx.stroke()
        this.ctx.closePath()
    }
    drawXAxis(interval = 30, notchSize = 10, color = "black") {
        this.line(-this.width / 2, 0, this.width / 2, 0, color, 1)
        for (var i = -this.width / 2; i < this.width / 2; i += interval) {
            this.line(i, -notchSize / 2, i, notchSize / 2, color, 1)
        }
        this.ctx.fillStyle = color
        this.ctx.font = "50px Arial"
        this.ctx.fillText("x", -this.width / 2, 40)
        this.ctx.fillText("-", -this.width / 2 + 5, -6)
        this.ctx.fillText("+", this.width / 2 - 43, -6)
    }
    drawYAxis(interval = 30, notchSize = 10, color = "black") {
        this.line(0, -this.height / 2, 0, this.height / 2, color, 1)
        for (var i = -this.height / 2; i < this.height / 2; i += interval) {
            this.line(-notchSize / 2, i, notchSize / 2, i, color, 1)
        }
        this.ctx.fillStyle = color
        this.ctx.font = "50px Arial"
        this.ctx.save()
        this.flipYAxis()
        this.ctx.fillText("y", -38, -this.height / 2 + 50)
        this.ctx.fillText("+", 10, -this.height / 2 + 58)
        this.ctx.fillText("-", 10, this.height / 2 - 14)
        this.ctx.restore()
    }
    drawAxes(interval = 30, notchSize = 10, color = "black") {
        this.drawXAxis(interval, notchSize, color)
        this.drawYAxis(interval, notchSize, color)
    }
}
  
export { Canvas }
