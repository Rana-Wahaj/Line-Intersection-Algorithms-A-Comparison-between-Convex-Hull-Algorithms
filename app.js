const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');



let points = [];
let numPointsInput = document.getElementById('numPoints');

canvas.width = 1000;
canvas.height = 500;

function drawLines() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < lines.length; i++) {
      context.beginPath();
      context.moveTo(lines[i].start.x, lines[i].start.y);
      context.lineTo(lines[i].end.x, lines[i].end.y);
      context.stroke();
    }
    runAlgorithm('findIntersection'); // This will trigger the line intersection algorithm after drawing lines
}

function orientation(p, q, r) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

    if (val === 0) return 0;  // Collinear points
    return (val > 0) ? 1 : 2; // Clockwise or counterclockwise
}


function generateRandomPoints() {
    points = [];
    const numPoints = parseInt(numPointsInput.value, 10);

    for (let i = 0; i < numPoints; i++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);
        points.push({ x, y });
    }

    clearCanvas();
    drawPoints();
}

function drawPoints() {
    ctx.fillStyle = '#3498db';
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clearConvexHull() {
    clearCanvas();
    drawPoints();
}

// Function to restart the algorithm
function restart() {
    clearConvexHull();
}

function runAlgorithm(algorithm) {
    console.log('Running Algorithm:', algorithm);
    // Call the appropriate algorithm function and visualize the result
    clearCanvas();
    drawPoints();

    switch (algorithm) {
        case 'BruteForce':
            bruteForceConvexHull();
            // Implement Brute Force algorithm and visualize
            break;
        case 'JarvisMarch':
            jarvisMarch();
            break;
        case 'GrahamScan':
            visualizeGrahamScan();
            // Implement Graham Scan algorithm and visualize
            break;
        case 'QuickElimination':
            quickEliminationConvexHull();

            // Implement Quick Elimination algorithm and visualize
            break;
         case 'findIntersection':
            findIntersection();
    
                // Implement Quick Elimination algorithm and visualize
            break;    

        default:
            console.error('Invalid algorithm');
    }
}





