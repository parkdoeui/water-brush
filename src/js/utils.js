export const add = (v1, v2) => {
    return { x: v1.x + v2.x, y: v1.y + v2.y }
}

export const limit = (v1, limit) => {

    const min = limit * -1
    const max = limit * 1;

    return {
        x: v1.x > max ? max : v1.x < min ? min : v1.x,
        y: v1.y > max ? max : v1.y < min ? min : v1.y,
    }
}

export const setMag = (v1, num) => {
    return { x: v1.x * num, y: v1.y * num }
}

export const sub = (v1, v2) => {
    return { x: v1.x - v2.x, y: v1.y - v2.y }
}

export const decay = (v1) => {
    const nx = v1.x > 0 ? 1 : -1;
    const ny = v1.y > 0 ? 1 : -1;
    const rate = 0.006;
    return { x: v1.x - rate * nx, y: v1.y - rate * ny }
}

export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const map = (value, low1, high1, low2, high2) => {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}