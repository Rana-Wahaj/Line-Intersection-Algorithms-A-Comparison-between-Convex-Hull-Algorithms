// Function to run the Quick Elimination convex hull algorithm
async function quickEliminationConvexHull() {
    const n = points.length;
    if (n < 3) {
        return "Convex hull not possible with less than 3 points.";
    }

    // Sort points by x-coordinate (for simplicity in visualization)
    points.sort((a, b) => a.x - b.x);

    // Draw all edges in blue
    drawAllEdges('#3498db');

    // Find and draw the convex hull edges in red
    let convexHull = quickElimination(points);
    drawConvexHullEdges(convexHull, '#e74c3c');
}

// Function to find the convex hull using Quick Elimination algorithm
function quickElimination(points) {
    const n = points.length;
    if (n < 3) {
        return points; // Convex hull is all points if there are less than 3
    }

    // Sort points by x-coordinate (for simplicity in visualization)
    points.sort((a, b) => a.x - b.x);

    // Initialize the convex hull with the leftmost and rightmost points
    let convexHull = [points[0], points[n - 1]];

    // Recursively find the convex hull on the left and right of the line formed by the leftmost and rightmost points
    findQuickEliminationConvexHull(points, points[0], points[n - 1], convexHull);

    return convexHull;
}

// Recursive function to find the convex hull using Quick Elimination algorithm
function findQuickEliminationConvexHull(points, leftmost, rightmost, convexHull) {
    const n = points.length;
    if (n < 3) {
        return; // Convex hull is all points if there are less than 3
    }

    // Find points on the left and right of the line formed by the leftmost and rightmost points
    let leftSet = [];
    let rightSet = [];

    for (let i = 0; i < n; i++) {
        if (orientation(leftmost, rightmost, points[i]) === 1) {
            leftSet.push(points[i]);
        } else if (orientation(leftmost, rightmost, points[i]) === -1) {
            rightSet.push(points[i]);
        }
    }

    // If leftSet has points, find the point farthest from the line formed by the leftmost and rightmost points
    if (leftSet.length > 0) {
        let farthestPoint = findFarthestPoint(leftmost, rightmost, leftSet);
        convexHull.push(farthestPoint);

        // Recursively find the convex hull on the left of the line formed by the leftmost and farthest points
        findQuickEliminationConvexHull(leftSet, leftmost, farthestPoint, convexHull);
    }

    // If rightSet has points, find the point farthest from the line formed by the leftmost and rightmost points
    if (rightSet.length > 0) {
        let farthestPoint = findFarthestPoint(leftmost, rightmost, rightSet);
        convexHull.push(farthestPoint);

        // Recursively find the convex hull on the right of the line formed by the farthest and rightmost points
        findQuickEliminationConvexHull(rightSet, farthestPoint, rightmost, convexHull);
    }
}

// Function to find the point farthest from the line formed by two points
function findFarthestPoint(pointA, pointB, pointSet) {
    let maxDistance = 0;
    let farthestPoint = null;

    for (let i = 0; i < pointSet.length; i++) {
        let distance = perpendicularDistance(pointA, pointB, pointSet[i]);
        if (distance > maxDistance) {
            maxDistance = distance;
            farthestPoint = pointSet[i];
        }
    }

    return farthestPoint;
}

// Function to calculate the perpendicular distance from a point to a line formed by two other points
function perpendicularDistance(pointA, pointB, pointC) {
    return Math.abs(
        (pointC.y - pointA.y) * (pointB.x - pointA.x) -
        (pointB.y - pointA.y) * (pointC.x - pointA.x)
    ) / Math.sqrt(Math.pow(pointB.y - pointA.y, 2) + Math.pow(pointB.x - pointA.x, 2));
}
