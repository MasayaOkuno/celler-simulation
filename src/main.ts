import { Canvas, Mouse } from "./engine";
import { canvas, gameloop, keyboard, mouse } from "./setup"

// let cellsize = 11.5;
// const left = - canvas.width / 2 + cellsize;
// const top = canvas.height / 2 - cellsize;


// also, the simulation should contain the "world", the grid of cells


// what we are doing now is organizing our code better.
// it will be cleaner code, if it is organized into separate classes.

class Simulation {
    width: number
    height: number
    cellsize: number
    grid: (1 | 0)[][]
    // xSize: number
    // ySize: number

    constructor(width: number, height: number, cellsize: number) {
        this.width = width
        this.height = height
        this.cellsize = cellsize

        this.grid = []
        for (let y = 0; y < height / cellsize; y++) {
            this.grid.push([])
            for (let x = 0; x < width / cellsize; x++) {
                this.grid[y].push(0);
            }
        }
        this.grid[1][1] = 1
    }
    // this function should draw the grid.
    render(canvas: Canvas) {
        // for (let y = 0; y < this.height / 2; y++) {
        //     for (let x = 0; x < this.width / 2; x++) {
        //         canvas.strokeRectangle(
        //             x * this.cellsize - canvas.width / 2,
        //             y * this.cellsize - canvas.height / 2, this.cellsize, this.cellsize, "black")
        //     }
        // }
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                if (this.grid[y][x] == 1) {
                    canvas.fillRectangle(
                        (x * this.cellsize - canvas.width / 2) + this.cellsize / 2,
                        (0 + canvas.height / 2) - (y * this.cellsize) - this.cellsize / 2, this.cellsize, this.cellsize, "black")
                } else {
                    canvas.strokeRectangle(
                        (x * this.cellsize - canvas.width / 2) + this.cellsize / 2,
                        (0 + canvas.height / 2) - (y * this.cellsize) - this.cellsize / 2, this.cellsize, this.cellsize, "black")
                }
            }
        }
    }
    applyRules() {
        // const last_grid = [...this.grid]

        // we are going to create functions, but then wait until the end to use them

        let functions: (() => void)[] = []
        console.log("TEST")
        console.log(this.grid[1][1])
        console.log("Grid")
        for (let y = 1; y < 2; y++) {
            for (let x = 1; x < 4; x++) {
                console.log("x" + x)
                console.log("y" + y)
                let neighbors = {
                    topLeft: this.grid[y - 1][x - 1],
                    topMiddle: this.grid[y - 1][x],
                    topRight: this.grid[y - 1][x + 1],
                    middleLeft: this.grid[y][x - 1],
                    middleRight: this.grid[y][x + 1],
                    bottomLeft: this.grid[y + 1][x - 1],
                    bottomMiddle: this.grid[y + 1][x],
                    bottomRight: this.grid[y + 1][x + 1]
                }

                let liveCellCount = Object.values(neighbors).reduce(
                    (acc: number, val: 0 | 1) => acc + val, 0)
                console.log("neighbors: ", neighbors)
                console.log("liveCellCount" + liveCellCount)

                if (liveCellCount < 2)
                    functions.push(() => this.grid[y][x] = 0)
                else if (liveCellCount > 3)
                    functions.push(() => this.grid[y][x] = 0)
                else if (liveCellCount == 3)
                    functions.push(() => this.grid[y][x] = 1)
            }
            for (const fn of functions) {
                fn()
            }
        }

    }

    changecell(positionX: number, positionY: number) {
        console.log("positionX: ", positionX + canvas.width / 2)
        console.log(this.cellsize)
        const cellX = (positionX + canvas.width / 2) % this.cellsize
        console.log("cellX: " + cellX)
        positionX = (positionX + canvas.width / 2) / this.cellsize;
        positionY = (positionY + canvas.height / 2) / this.cellsize;
        let cellXNumber = Math.ceil(positionX) - 1
        let cellYNumber = Math.ceil(positionY) - 1
        // console.log("X" + cellXNumber);
        // console.log("Y" + cellYNumber);
        this.grid[cellYNumber][cellXNumber] = this.grid[cellYNumber][cellXNumber] === 0 ? 1 : 0

    }

    getCellValue(positionY: number, positionX: number) {
        if (positionY >= 0 && positionX >= 0) {
            // console.log("YY" + positionY);
            // console.log("XX" + positionX);
            return this.grid[positionY] ? this.grid[positionY][positionX] : 0
        } else {
            return 0
        }
    }
}





const sim = new Simulation(canvas.width, canvas.height, 200)

let pause: boolean = true
let clickInterval: boolean = true

let count = 0
gameloop(() => {
    count += 1
    canvas.erase()

    if (keyboard.keys("enter"))
        pause = false
    if (mouse.left)
        pause = true

    // if paused, do not start applying rules
    sim.render(canvas)

    // console.log(mouse.x)
    // canvas.strokeCircle(mouse.x, mouse.y, 10, "blue")
    // let cellXNumber = (mouse.x + canvas.width / 2) % sim.cellsize
    // let cellYNumber = (mouse.y + canvas.height / 2) % sim.cellsize
    // canvas.fillText(cellXNumber.toString(), mouse.x, mouse.y, "red", 20)
    // canvas.fillText(cellYNumber.toString(), mouse.x - 50, mouse.y, "red", 20)

    if (mouse.left && clickInterval) {
        clickInterval = false;
        sim.changecell(mouse.x, mouse.y)
        setTimeout(() => { clickInterval = true }, 100);
    }


    if (!pause) {
        if (count % 25 == 0) {
            sim.applyRules()
            console.log("applyRules")
            throw new Error("STOP!")
        }
    }
    // funny way to make the loop take longer.


    // how can you know if your mouse is above a cell?

    // you need to do math, division.
    // to figure out which cell you are touching.


    // our code only detects when your mouse is 

    // const world: number[][] = []
    // for (let y = 0; y < ySize; y++) {
    //     world.push([])
    //     for (let x = 0; x < xSize; x++) {
    //         world[y].push(0);
    //     }
    // }
    // for (let y = 0; y < ySize; y++) {
    //     for (let x = 0; x < xSize; x++) {
    //         canvas.strokeRectangle(
    //             x * cellsize - canvas.width / 2,

    //             y * cellsize - canvas.height / 2, cellsize, cellsize, "black")
    //     }
    // }

    // canvas.fillRectangle(0, 0, 50, 50, "black")
    // canvas.fillRectangle(0, 0, 50, 50, "black")


    //    ```
    // <2 == death or stay dead
    //     >= 2 == live or stay alive


    //    Any live cell with fewer than two live neighbors dies, as if by underpopulation.
    //    Any live cell with two or three live neighbors lives on to the next generation.

    //    Any live cell with more than three live neighbors dies, as if by overpopulation.
    //    Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    //    ```


    // make a 2d array representing the world grid
    // let the content of the innermost array be 1 or 0
    // const world = [
    //     [0, 0, 0],
    //     [0, 0, 0],
    //     [0, 0, 0]
    // ];


})

