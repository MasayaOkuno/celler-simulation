class Vector {
    private _x: number
    private _y: number
    private _magnitude: number
    private _angle: number

    get x() { return this._x }
    get y() { return this._y }
    get magnitude() { return this._magnitude }
    get angle() { return this._angle }
    set x(value: number) {
        this._x = value
        this._magnitude = Math.sqrt(this.x * this.x + this.y * this.y)
        this._angle = Math.atan2(this.y, this.x)
    }
    set y(value: number) {
        this._y = value
        this._magnitude = Math.sqrt(this.x * this.x + this.y * this.y)
        this._angle = Math.atan2(this.y, this.x)
    }
    set magnitude(value: number) {
        this._magnitude = value;
        this._x = this._magnitude * Math.cos(this._angle);
        this._y = this._magnitude * Math.sin(this._angle);
    }
    set angle(value: number) {
        this._angle = value;
        this._x = this._magnitude * Math.cos(this._angle);
        this._y = this._magnitude * Math.sin(this._angle);
    }

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
        this._magnitude = Math.sqrt(x * x + y * y)
        this._angle = Math.atan2(y, x)
        // this.x = 5;
    }
    add(other: Vector | number) {
        if (other instanceof Vector)
            return new Vector(this.x + other.x, this.y + other.y)
        else
            return new Vector(this.x + other, this.y + other)
    }
    subtract(other: Vector | number) {
        if (other instanceof Vector)
            return new Vector(this.x - other.x, this.y - other.y)
        else
            return new Vector(this.x - other, this.y - other)
    }
    multiply(other: Vector | number) {
        if (other instanceof Vector)
            return new Vector(this.x * other.x, this.y * other.y)
        else
            return new Vector(this.x * other, this.y * other)
    }
    divide(other: Vector | number) {
        if (other instanceof Vector)
            return new Vector(this.x / other.x, this.y / other.y)
        else
            return new Vector(this.x / other, this.y / other)
    }
    limit(maximum: number): Vector {
        if (this.magnitude > maximum) { // If TOO Big
            this.magnitude = maximum
            return this
        } else {
            return this
        }
    }
    distance(other: Vector): number {
        return Math.sqrt((other.x - this._x) ** 2 + (other.y - this._y) ** 2)
    }
}


export { Vector }
