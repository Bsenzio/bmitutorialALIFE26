// =====================================================
// BCI / EEG / Neural Network Background
// Bruno Senzio-Savino Website
// =====================================================

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.id = "tech-background";

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "0";
canvas.style.pointerEvents = "none";

document.body.prepend(canvas);

// =====================================================
// RESIZE
// =====================================================

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// =====================================================
// NEURAL NETWORK NODES
// =====================================================

const nodes = [];

for (let i = 0; i < 70; i++) {
    nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
    });
}

// =====================================================
// EEG SIGNALS
// =====================================================

const eegLines = [];

for (let i = 0; i < 12; i++) {
    eegLines.push({
        y: i * 120 + 50,
        phase: Math.random() * 10
    });
}

function drawEEG() {

    ctx.strokeStyle = "rgba(0,255,255,0.25)";
    ctx.lineWidth = 1;

    eegLines.forEach(line => {

        ctx.beginPath();

        for (let x = 0; x < canvas.width; x += 10) {

            const y =
                line.y +
                Math.sin(
                    x * 0.02 +
                    Date.now() * 0.003 +
                    line.phase
                ) * 15;

            if (x === 0)
                ctx.moveTo(x, y);
            else
                ctx.lineTo(x, y);
        }

        ctx.stroke();
    });
}

// =====================================================
// CIRCUIT GRID
// =====================================================

function drawCircuits() {

    ctx.strokeStyle = "rgba(0,255,150,0.12)";
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += 140) {

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += 140) {

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// =====================================================
// NEURAL NETWORK
// =====================================================

function drawNetwork() {

    nodes.forEach(node => {

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width)
            node.vx *= -1;

        if (node.y < 0 || node.y > canvas.height)
            node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#00ffff";
        ctx.fill();
    });

    for (let i = 0; i < nodes.length; i++) {

        for (let j = i + 1; j < nodes.length; j++) {

            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;

            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 140) {

                ctx.strokeStyle =
                    `rgba(0,255,255,${0.7 - dist / 200})`;

                ctx.lineWidth = 0.6;

                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }
}

// =====================================================
// DIGITAL BRAINS
// =====================================================

const brains = [];

for (let i = 0; i < 5; i++) {

    brains.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 40 + Math.random() * 30,
        phase: Math.random() * 10
    });
}

function drawBrains() {

    brains.forEach(b => {

        const pulse =
            Math.sin(Date.now() * 0.002 + b.phase) * 4;

        ctx.strokeStyle =
            "rgba(0,255,255,0.35)";

        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(
            b.x - b.size * 0.2,
            b.y,
            b.size * 0.5 + pulse,
            0,
            Math.PI * 2
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(
            b.x + b.size * 0.2,
            b.y,
            b.size * 0.5 + pulse,
            0,
            Math.PI * 2
        );
        ctx.stroke();

        for (let i = 0; i < 12; i++) {

            const x1 =
                b.x - b.size * 0.4 +
                Math.random() * b.size * 0.8;

            const y1 =
                b.y - b.size * 0.4 +
                Math.random() * b.size * 0.8;

            const x2 =
                b.x - b.size * 0.4 +
                Math.random() * b.size * 0.8;

            const y2 =
                b.y - b.size * 0.4 +
                Math.random() * b.size * 0.8;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    });
}

// =====================================================
// SYNAPSES
// =====================================================

const synapses = [];

for (let i = 0; i < 45; i++) {

    synapses.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
    });
}

function drawSynapses() {

    synapses.forEach(s => {

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;

        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;

        ctx.fillStyle = "rgba(255,0,255,0.85)";

        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fill();
    });

    for (let i = 0; i < synapses.length; i++) {

        for (let j = i + 1; j < synapses.length; j++) {

            const dx =
                synapses[i].x - synapses[j].x;

            const dy =
                synapses[i].y - synapses[j].y;

            const d =
                Math.sqrt(dx * dx + dy * dy);

            if (d < 100) {

                ctx.strokeStyle =
                    `rgba(255,0,255,${
                        0.4 - d / 250
                    })`;

                ctx.lineWidth = 0.5;

                ctx.beginPath();
                ctx.moveTo(
                    synapses[i].x,
                    synapses[i].y
                );
                ctx.lineTo(
                    synapses[j].x,
                    synapses[j].y
                );
                ctx.stroke();
            }
        }
    }
}

// =====================================================
// AR MARKERS
// =====================================================

const arMarkers = [];

for (let i = 0; i < 10; i++) {

    arMarkers.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 20 + Math.random() * 50,
        phase: Math.random() * 10
    });
}

function drawAR() {

    arMarkers.forEach(m => {

        const pulse =
            Math.sin(Date.now() * 0.002 + m.phase) * 5;

        ctx.strokeStyle =
            "rgba(0,255,255,0.25)";

        ctx.beginPath();

        ctx.rect(
            m.x - m.size / 2,
            m.y - m.size / 2,
            m.size + pulse,
            m.size + pulse
        );

        ctx.stroke();

        ctx.beginPath();

        ctx.arc(
            m.x,
            m.y,
            m.size / 2 + pulse,
            0,
            Math.PI * 2
        );

        ctx.stroke();
    });
}

// =====================================================
// XR OBJECTS
// =====================================================

const xrObjects = [];

for (let i = 0; i < 8; i++) {

    xrObjects.push({
        angle: Math.random() * Math.PI * 2,
        radius: 20 + Math.random() * 40,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
    });
}

function drawXR() {

    xrObjects.forEach(o => {

        o.angle += 0.01;

        const ox =
            o.x +
            Math.cos(o.angle) * o.radius;

        const oy =
            o.y +
            Math.sin(o.angle) * o.radius;

        ctx.strokeStyle =
            "rgba(255,0,255,0.3)";

        ctx.beginPath();
        ctx.arc(
            ox,
            oy,
            6,
            0,
            Math.PI * 2
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(o.x, o.y);
        ctx.lineTo(ox, oy);
        ctx.stroke();
    });
}

// =====================================================
// SCANNER
// =====================================================

function drawScanner() {

    const y =
        (Date.now() * 0.05) %
        canvas.height;

    ctx.strokeStyle =
        "rgba(0,255,255,0.15)";

    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
}

// =====================================================
// ANIMATION LOOP
// =====================================================

function animateBackground() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawCircuits();
    drawEEG();
    drawNetwork();
    drawBrains();
    drawSynapses();
    drawAR();
    drawXR();
    drawScanner();

    requestAnimationFrame(
        animateBackground
    );
}

animateBackground();