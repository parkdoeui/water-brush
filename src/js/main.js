const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

const palette = {
    red: {
        id: 'red',
        range: 45,
        startPoint: 305,
    },
    green: {
        id: 'green',
        range: 45,
        startPoint:65,
    },
    blue: {
        id: 'blue',
        range: 45,
        startPoint: 185,
    },
    rainbow: {
        id: 'rainbow',
        range: 360,
        startPoint: 0,
    }, 
}

let brushConfig = {
    size: 30,
    density: 3,
    color: palette["blue"],
    scatter: 2,
    trails: 300,
}

let spawnRange = brushConfig.size * brushConfig.scatter * 0.7;

let mouse = {
    x: null,
    y: null,
}

let pmouse = {
    x: null,
    y: null,
}

let colorCounter = 0;

let mousePressed = false;

for (const r of document.querySelectorAll(".button")) {
    r.addEventListener("click", function (e) {
        if (e.target.className === 'button reset') {
            particles.length = 0;
        }
    })
}

for (const s of document.querySelectorAll(".slider")) {
    s.addEventListener("change", function (e) {
        brushConfig[e.target.id] = e.target.value;
        if (e.target.id === 'scatter') {
            spawnRange = brushConfig.size * brushConfig.scatter * 0.7;
        }
    });
}

const setPalleteColor = () => {
    for (const p of document.querySelectorAll(".palette")) {
        if (p.id === brushConfig.color.id) {
            p.classList.add('active');
        } else {
            p.classList.remove('active');
        }
    }
}

for (const p of document.querySelectorAll(".palette")) {
    p.addEventListener("click", function (e) {
        brushConfig.color = palette[e.target.id];
        setPalleteColor();
    });
}

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

canvas.addEventListener('mousemove', function (e) {
    pmouse = { ...mouse }
    mouse.x = e.x;
    mouse.y = e.y;
})
 
canvas.addEventListener('mousedown', function () {
    mousePressed = true;
})

canvas.addEventListener('mouseup', function () { 
    mousePressed = false;
})

const generateParticles = () => {
    if (mousePressed) {
        const densityCap = map(brushConfig.size, 20, 80, 2, 8)

        for (let i = 0; i < Math.min(parseInt(densityCap), brushConfig.density); i++) {
            particles.push(new Particle(mouse, pmouse))
        }
        colorCounter += 0.01;
    }
    if (particles.length > brushConfig.trails) {
        particles.shift();
        particles.shift();
        particles.shift();
    }
}

const renderParticles = () => {
    for (const i in particles) {
        particles[i].update();
        particles[i].draw();
    }
}

const animate = () => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '000';
    ctx.arc(mouse.x, mouse.y, brushConfig.size, 0, Math.PI * 2);
    generateParticles();
    renderParticles();
    requestAnimationFrame(animate);

}

class Particle {
    constructor(m, pm) {
        this.position = {
            x: getRandom(pm.x - spawnRange, pm.x + spawnRange),
            y: getRandom(pm.y - spawnRange, pm.y + spawnRange),
        }
        
        this.targetPosition = { 
            x: getRandom(m.x - spawnRange, m.x + spawnRange),
            y: getRandom(m.y - spawnRange, m.y + spawnRange),
        }
        this.velocity = {
            x: 0.0,
            y: 0.0,
        
        }
        this.col = 'hsla('+ ( Math.sin(colorCounter%Math.PI) * brushConfig.color.range + brushConfig.color.startPoint) +',70%, 35%, 0.3)';
        this.topSpeed = 1;
        this.size = Math.random() * brushConfig.size + 15;
        this.f = 0;
    }


    update() {
        const accl = sub(this.targetPosition, this.position);
        const maggedAccl = setMag(accl, 0.005);
        this.velocity = add(maggedAccl, this.velocity);
        this.velocity = decay(this.velocity);
        this.velocity = limit(this.velocity, this.topSpeed);
        this.position = add(this.velocity, this.position);
    }

    draw() {
        ctx.fillStyle = this.col;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

animate();
