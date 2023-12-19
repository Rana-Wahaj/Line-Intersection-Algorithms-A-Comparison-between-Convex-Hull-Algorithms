// lineIntersection.js

const canvas = document.getElementById("convexHullCanvas");
const ctx = canvas.getContext("2d");

let points = []; // Array to store randomly generated points

function generateRandomPoints() {
    const numPoints = parseInt(document.getElementById("numPoints").value, 10);
    points = []; // Clear existing points

    for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        points.push({ x, y });
    }

    // Call a function to redraw the canvas with the new points
    redrawCanvas();
}

function runAlgorithm(algorithm) {
    switch (algorithm) {
        case 'JarvisMarch':
            convexHull = jarvisMarch(points);
            break;
        // Add other cases for different convex hull algorithms as needed
        // case 'GrahamScan':
        //     convexHull = grahamScan(points);
        //     break;
        // case 'QuickHull':
        //     convexHull = quickHull(points);
        //     break;
        // ...

        default:
            console.error('Invalid algorithm');
    }

    // Call a function to redraw the canvas with the convex hull and other elements
    // Call a function to redraw the canvas with the convex hull and other elements
    redrawCanvas();
}

function restart() {
    // Implement logic to reset the visualization
    // ...

    // Call a function to redraw the canvas with the initial state
    redrawCanvas();
}

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw points
    for (const point of points) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.stroke();
    }

    // Draw convex hull
    ctx.beginPath();
    if (convexHull.length > 0) {
        ctx.moveTo(convexHull[0].x, convexHull[0].y);
        for (const point of convexHull) {
            ctx.lineTo(point.x, point.y);
        }
        ctx.closePath();
        ctx.strokeStyle = "red";
        ctx.stroke();
    }

    // Draw lines connecting convex hull points
    ctx.beginPath();
    ctx.strokeStyle = "green";
    for (let i = 0; i < convexHull.length - 1; i++) {
        ctx.moveTo(convexHull[i].x, convexHull[i].y);
        ctx.lineTo(convexHull[i + 1].x, convexHull[i + 1].y);
    }
    if (convexHull.length > 1) {
        ctx.moveTo(convexHull[convexHull.length - 1].x, convexHull[convexHull.length - 1].y);
        ctx.lineTo(convexHull[0].x, convexHull[0].y);
    }
    ctx.stroke();

    // Draw other elements (lines, intersections, etc.) if needed
    // Example: Draw line intersections
    ctx.beginPath();
    ctx.fillStyle = "orange";
    for (let i = 0; i < convexHull.length - 1; i++) {
        for (let j = i + 1; j < convexHull.length; j++) {
            // Check for line intersection logic and draw a point if there is an intersection
            // ...

            // Example: Drawing points at the intersection of lines
            const intersectionPoint = findIntersection(convexHull[i], convexHull[i + 1], convexHull[j], convexHull[(j + 1) % convexHull.length]);
            if (intersectionPoint) {
                ctx.arc(intersectionPoint.x, intersectionPoint.y, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
            }
        }
    }
    // ...

    // Update the canvas
    ctx.stroke();
}

function findIntersection(p1, q1, p2, q2) {
const det = (q1.x - p1.x) * (q2.y - p2.y) - (q1.y - p1.y) * (q2.x - p2.x);

    if (det === 0) {
        // Lines are parallel, no intersection
        return null;
    }

    const t = ((p1.x - p2.x) * (q2.y - p2.y) - (p1.y - p2.y) * (q2.x - p2.x)) / det;
    const u = -((p1.x - p2.x) * (q1.y - p1.y) - (p1.y - p2.y) * (q1.x - p1.x)) / det;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        // Intersection point is within the line segments
        const intersectionX = p1.x + t * (q1.x - p1.x);
        const intersectionY = p1.y + t * (q1.y - p1.y);

        return { x: intersectionX, y: intersectionY };
    }

    // Lines do not intersect
    return null;
}
