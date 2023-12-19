

async function bruteForceConvexHull() {
    const n = points.length;
    if (n < 3) {
        return "Convex hull not possible with less than 3 points.";
    }

    // Sort points by x-coordinate (for simplicity in visualization)
    points.sort((a, b) => a.x - b.x);

    // Draw all edges in blue
    drawAllEdges('#3498db');

    // Find and draw the convex hull edges in red
    let convexHull = findConvexHull(points);
    drawConvexHullEdges(convexHull, '#e74c3c');
}

function drawAllEdges(color) {
    const n = points.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            drawEdge(points[i], points[j], color);
        }
    }
}

function findConvexHull(points) {
    const n = points.length;
    if (n < 3) {
        return points; // Convex hull is all points if there are less than 3
    }

    // Placeholder for the convex hull
    let hull = [];

    // Find the leftmost point as the starting point of the convex hull
    let startPoint = points[0];

    // Initialize the current point to the starting point
    let currentPoint = startPoint;

    // Iterate to find the convex hull
    do {
        hull.push(currentPoint);

        // Find the next point in the convex hull
        let nextPoint = points[0];
        for (let i = 1; i < n; i++) {
            if (
                nextPoint === currentPoint ||
                orientation(currentPoint, nextPoint, points[i]) === 1
            ) {
                nextPoint = points[i];
            }
        }

        // Update the current point for the next iteration
        currentPoint = nextPoint;
    } while (currentPoint !== startPoint);

    return hull;
}

function drawConvexHullEdges(convexHull, color) {
    const hullLength = convexHull.length;
    for (let i = 0; i < hullLength; i++) {
        drawEdge(convexHull[i], convexHull[(i + 1) % hullLength], color);
    }
}

function drawEdge(startPoint, endPoint, color) {
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}
