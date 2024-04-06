import { describe, expect, test } from 'vitest'
import { Vector } from '../src/Vector'

describe('Vector', () => {
    test('construction', () => {
        const vector = new Vector(3, 4)
        expect(vector.x).toBe(3)
        expect(vector.y).toBe(4)
        expect(vector.magnitude).toBe(5)
        expect(vector.angle).toBe(0.9272952180016122) // radians
    })
    test('add', () => {
        const vector1 = new Vector(1, 2)
        const vector2 = new Vector(3, 5)
        const result = vector1.add(vector2)
        expect(result.x).toBe(4)
        expect(result.y).toBe(7)
        //      Wallaby
        expect(vector1.x).toBe(1)
        expect(vector1.y).toBe(2)
    })
    test('subtract', () => {
        const vector1 = new Vector(1, 2)
        const vector2 = new Vector(3, 5)
        const result = vector1.subtract(vector2)
        expect(result.x).toBe(-2)
        expect(result.y).toBe(-3)
    }) // npx vitest
    test('multiply', () => {
        const vector = new Vector(3, 4)
        const result = vector.multiply(2)
        expect(result.x).toBe(6)
        expect(result.y).toBe(8)
    })
    test('limit', () => {
        const vector = new Vector(3, 4)
        expect(vector.magnitude).toBe(5)

        // do you want mutate to mutate original value, or only return a new copy?
        const result = vector.limit(2) 
        expect(result.magnitude).toBe(2)
        expect(vector.magnitude).toBe(2)
    })
})

// npx vitest