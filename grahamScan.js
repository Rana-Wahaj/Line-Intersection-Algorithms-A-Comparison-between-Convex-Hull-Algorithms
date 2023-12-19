////////////////////////////////////////GRAHAM SCAN///////////////////////////////////
// ... (previous code)

// Function to find the pivot (point with the lowest y-coordinate)
function findPivot() {
    let pivot = points[0];
    for (let i = 1; i < points.length; i++) {
        if (points[i].y < pivot.y || (points[i].y === pivot.y && points[i].x < pivot.x)) {
            pivot = points[i];
        }
    }
    return pivot;
}

// Graham Scan algorithm
function grahamScan() {
    const n = points.length;
    if (n < 3) {
        return "Convex hull not possible with less than 3 points.";
    }

    // Sort points by polar angle
    const pivot = findPivot();
    points.sort((a, b) => {
        const angleA = Math.atan2(a.y - pivot.y, a.x - pivot.x);
        const angleB = Math.atan2(b.y - pivot.y, b.x - pivot.x);

        return angleA - angleB;
    });

    const hull = [points[0], points[1]]; // Initialize the hull with the first two sorted points

    for (let i = 2; i < n; i++) {
        while (hull.length > 1 && orientation(hull[hull.length - 2], hull[hull.length - 1], points[i]) !== 2) {
            hull.pop();
        }
        hull.push(points[i]);
    }

    // Ensure that the last point is included in the convex hull
    hull.push(points[0]);

    return hull;
}

function visualizeGrahamScan() {
    const grahamHull = grahamScan();

    clearCanvas();
    drawPoints();

    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;

    // Numbering and visualizing points
    for (let i = 0; i < points.length; i++) {
        ctx.fillStyle = '#3498db';
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.fillText(i + 1, points[i].x - 5, points[i].y - 10);
    }

    // Draw the closing edge
    ctx.beginPath();
    ctx.moveTo(grahamHull[grahamHull.length - 1].x, grahamHull[grahamHull.length - 1].y);
    ctx.lineTo(grahamHull[0].x, grahamHull[0].y);
    ctx.stroke();

    // Animation of the Graham Scan algorithm
    animateGrahamScan(grahamHull);
}

function animateGrahamScan(grahamHull) {
    let stack = [];
    let computing = document.getElementById('computing');
    let incorrectPaths = [];

    // Helper function to visualize the stack and incorrect paths
    function visualizeStack() {
        clearCanvas();
        drawPoints();

        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 2;

        // Draw the closing edge
        ctx.beginPath();
        ctx.moveTo(grahamHull[grahamHull.length - 1].x, grahamHull[grahamHull.length - 1].y);
        ctx.lineTo(grahamHull[0].x, grahamHull[0].y);
        ctx.stroke();

        // Draw incorrect paths
        ctx.strokeStyle = '#3498db';
        for (let path of incorrectPaths) {
            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);
            ctx.lineTo(path[1].x, path[1].y);
            ctx.stroke();
        }

        // Draw the points on the convex hull
        for (let i = 1; i < stack.length; i++) {
            ctx.beginPath();
            ctx.moveTo(stack[i - 1].x, stack[i - 1].y);
            ctx.lineTo(stack[i].x, stack[i].y);
            ctx.stroke();
        }

        // Draw the current point being considered
        const currentPoint = stack[stack.length - 1];
        if (currentPoint) {
            ctx.fillStyle = '#e74c3c';
            ctx.beginPath();
            ctx.arc(currentPoint.x, currentPoint.y, 5, 0, 2 * Math.PI);
            ctx.fill();
        }


        // Number the points on the convex hull
        for (let i = 0; i < stack.length; i++) {
            ctx.fillStyle = '#000';
            ctx.font = '12px Arial';
            ctx.fillText(i + 1, stack[i].x - 5, stack[i].y - 10);
        }

        // Request the next frame
        requestAnimationFrame(visualizeStack);
    }

    // Animation loop
    function animate() {
        if (grahamHull.length > 0) {
            const currentPoint = grahamHull.shift();
            stack.push(currentPoint);

            // Check if the last three points make a left turn
            while (stack.length > 2 && orientation(stack[stack.length - 3], stack[stack.length - 2], currentPoint) !== 2) {
                // Remove the last incorrect path
                incorrectPaths.pop();
                stack.pop();
            }

            // Add the current path to the incorrect paths
            if (stack.length > 1) {
                incorrectPaths.push([stack[stack.length - 2], currentPoint]);
            }

            visualizeStack();
            setTimeout(animate, 1000); // Adjust the delay as needed
        } else {
            computing.innerHTML = 'Computing: Done';
            visualizeConvexHullFinal(stack); // Call visualizeConvexHullFinal here
        }
    }

    // Start the animation
    animate();
}

// Function to visualize the final convex hull
function visualizeConvexHullFinal(finalHull) {
    console.log("Final Convex Hull Length:", finalHull.length);
    console.log("Final Convex Hull Points:", finalHull);
    console.log("Final Convex Hull Length:", finalHull.length);
    clearCanvas();
    drawPoints();

    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;

    // Draw the edges of the convex hull
    for (let i = 0; i < finalHull.length; i++) {
        ctx.beginPath();
        ctx.moveTo(finalHull[i].x, finalHull[i].y);
        ctx.lineTo(finalHull[(i + 1) % finalHull.length].x, finalHull[(i + 1) % finalHull.length].y);
        ctx.stroke();
    }

    // Number the points on the convex hull
    for (let i = 0; i < finalHull.length; i++) {
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.fillText(i + 1, finalHull[i].x - 5, finalHull[i].y - 10);
    }
}
