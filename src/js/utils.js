function add(v1, v2) {
    return { x: v1.x + v2.x, y: v1.y + v2.y }
}

function limit(v1, limit) {
    
    const min = limit * -1
    const max = limit * 1;
    
    return {
        x: v1.x > max ? max : v1.x < min ? min : v1.x,
        y: v1.y > max ? max : v1.y < min ? min : v1.y,
    }
}

function setMag(v1, num) {
    return {x: v1.x * num, y: v1.y * num}
}

function sub(v1, v2) {
    return { x: v1.x - v2.x, y: v1.y - v2.y }
} 

function decay(v1) {
    const nx = v1.x > 0 ? 1 : -1;
    const ny = v1.y > 0 ? 1 : -1;
    const rate = 0.006;
    return { x: v1.x - rate * nx, y: v1.y - rate * ny }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}