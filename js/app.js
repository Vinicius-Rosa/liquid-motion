const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let shade = 173;
let randomColour = 'hsl(' + shade + ', 99%, 35%)';
let reached = false;

const timer = setInterval(function () {
    if (shade >= 173 && shade <= 250 && reached === false) {
        shade++;
        if (shade === 250) reached = true
    } else {
        shade--;
        if (shade === 173) reached = false;
    }

    randomColour = 'hsl(' + shade + ', 99%, 35%)';
}, 200);


const mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// ======================== PARTICLE ========================
class Particle {
    constructor(x, y, size, weight) {
        this.x = x;
        this.baseX = x;
        this.y = y;
        this.size = size;
        this.weight = weight;
        this.flowingRight = false;
        this.color = randomColour;
    }
    update() {
        if (
            this.x + this.size > mouse.x - 50 &&
            this.x + this.size < mouse.x &&
            this.y + this.size > mouse.y - 5 &&
            this.y + this.size < mouse.y + 5
        ) {
            this.x -= this.weight;
            this.y += this.weight;
        } else if (
            this.x < mouse.x + 50 &&
            this.x > mouse.x &&
            this.y > mouse.y - 5 &&
            this.y < mouse.y + 5
        ) {
            this.x += this.weight;
            this.y += this.weight;
            this.flowingRight = true;
        }

        for (let i = 0; i < buttons.length; i++) {
            if (
                this.x - this.size < buttons[i].x + buttons[i].width &&
                this.x + this.size > buttons[i].x &&
                this.y + this.size < buttons[i].y + buttons[i].height &&
                this.y + this.size > buttons[i].y
            ) {
                this.weight = 0;

                if (!this.flowingRight) {
                    this.x -= 2;
                } else {
                    this.x += 3;
                }

            } else {
                this.weight += 0.02;
            }
        }
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            // this.x = window.innerWidth / 2 + ((Math.random() * 50) - 25);
            this.x = this.baseX + ((Math.random() * 50) - 25);
            this.weight = (Math.random() * 0.005) + 0.001;
            this.flowingRight = false;
            this.color = randomColour;
        }
        this.y += this.weight;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
}

const numberOfParticles = 1060;
let particleArray = [];

function createParticles() {
    particleArray = [];
    for (i = 0; i < numberOfParticles; i++) {
        // const x = this.x = window.innerWidth / 2 + ((Math.random() * 10) - 25);
        const x = this.x = window.innerWidth - 150 + ((Math.random() * 10) - 25);
        const y = Math.random() * canvas.height;
        const size = (Math.random() * 10) + 3;
        const weight = (Math.random() * 2) + 0.1;
        particleArray.push(new Particle(x, y, size, weight, x));
    }
}

createParticles();



// ======================================================

let particles = [];

function middleParticles() {
    particles = [];
    for (i = 0; i < 1000; i++) {
        const x = this.x = window.innerWidth / 2 - 80 + ((Math.random() * 10) - 25);
        const y = Math.random() * canvas.height;
        const size = (Math.random() * 10) + 3;
        const weight = (Math.random() * 3) + 0.1;
        particles.push(new Particle(x, y, size, weight, x));
    }
}

middleParticles();

// ======================================================

let particlesInitial = [];
function initialParticles() {
    particlesInitial = [];
    for (i = 0; i < 2000; i++) {
        const x = this.x = ((Math.random() * 10) - 25);
        const y = Math.random() * canvas.height;
        const size = (Math.random() * 10) + 3;
        const weight = (Math.random() * 3) + 0.1;
        particlesInitial.push(new Particle(x, y, size, weight, x));
    }
}

initialParticles();

// ======================== BUTTON ========================
class Button {
    constructor(x, y, width, height, baseX) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.baseX = x;
    }
    update() {
        let directionX = 2.2;
        if ((mouse.x < this.x + this.width && mouse.x > this.x && mouse.y < this.y + this.height && mouse.y > this.y) && (this.x > this.baseX - 50)) {
            this.x -= directionX;
            this.width += directionX;
        } else if (this.x < this.baseX) {
            this.x += directionX;
            this.width -= directionX;
        }
    }
    draw() {
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    }
}

let buttons = [];
function createButtons() {
    buttons = [];
    for (let i = 0; i < 3; i++) {
        let topMargin = window.document.body.clientHeight / 2 + 245; //300;
        let buttonMargin = 5;
        let x = window.innerWidth - 200;
        let y = topMargin + ((50 + buttonMargin) * i);
        let width = 200;
        let height = 50;
        buttons.push(new Button(x, y, width, height))
    }

    let topMargin = window.document.body.clientHeight / 2 + 200; //300;
    let buttonMargin = 5;
    let axisx = (window.innerWidth / 2) - 150;
    let axisy = topMargin + ((35 + buttonMargin)) + 75;

    buttons.push(new Button(axisx, axisy, 310, 75))

}
createButtons();

function drawButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].update();
        // buttons[i].draw();
    }
}

function animate() {
    // ctx.fillStyle = 'rgba(255,255,255,0.01)';
    ctx.clearRect(0, 0, canvas.width + 100, canvas.height + 100);
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesInitial.length; i++) {
        particlesInitial[i].update();
        particlesInitial[i].draw();
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].update();
    }
    drawButtons();
    requestAnimationFrame(animate);
}

animate();
// setTimeout(() => {
// }, 200);