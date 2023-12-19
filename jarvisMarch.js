/////////////////////////////////////////////JARVIS MARCH///////////////////////////////////

function jarvisMarch() {
    if (points.length < 3) {
        console.error('Convex hull not possible with less than 3 points.');
        return;
    }

    let hull = [];
    let leftmost = points.reduce((min, point) => point.x < min.x ? point : min, points[0]);
    hull.push(leftmost);

    let endpoint = points[0];

    function visualizeNextEdge() {
        endpoint = points[0];

        for (let i = 1; i < points.length; i++) {
            if (points[i] === hull[hull.length - 1]) {
                continue;
            }

            if (endpoint === hull[hull.length - 1] || orientation(hull[hull.length - 1], endpoint, points[i]) === 2) {
                endpoint = points[i];
            }
        }

        hull.push(endpoint);
        setTimeout(() => {
            visualizeConvexHullStep(endpoint, hull);
            // visualizeConvexHullFinal(hull);
        }, 1000);
        

        if (endpoint !== leftmost) {
            setTimeout(visualizeNextEdge, 500);
        } else {
            setTimeout(() => {
                visualizeConvexHullFinal(hull);
            }, 1000);
        }
    }

    visualizeNextEdge();
}

function visualizeConvexHull(finalHull) {
    clearCanvas();
    drawPoints();

    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;

    for (let i = 1; i < finalHull.length; i++) {
        ctx.beginPath();
        ctx.moveTo(finalHull[i - 1].x, finalHull[i - 1].y);
        ctx.lineTo(finalHull[i].x, finalHull[i].y);
        ctx.stroke();
    }

    // Draw the closing edge
    ctx.beginPath();
    ctx.moveTo(finalHull[finalHull.length - 1].x, finalHull[finalHull.length - 1].y);
    ctx.lineTo(finalHull[0].x, finalHull[0].y);
    ctx.stroke();
}

function visualizeConvexHullStep(currentPoint, intermediateHull) {
    clearCanvas();
    drawPoints();

    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;

    for (let i = 1; i < intermediateHull.length; i++) {
        ctx.beginPath();
        ctx.moveTo(intermediateHull[i - 1].x, intermediateHull[i - 1].y);
        ctx.lineTo(intermediateHull[i].x, intermediateHull[i].y);
        ctx.stroke();
    }

    // Draw the edge being calculated with counter-clockwise animation
    const startAngle = Math.atan2(intermediateHull[intermediateHull.length - 1].y - currentPoint.y, intermediateHull[intermediateHull.length - 1].x - currentPoint.x);
    const endAngle = Math.atan2(currentPoint.y - intermediateHull[intermediateHull.length - 1].y, currentPoint.x - intermediateHull[intermediateHull.length - 1].x);

    // Adjust the number of frames for smoother or slower animation
    const numFrames = 60; // You can experiment with this value

    // Perform the rotation animation using a loop
    for (let frame = 1; frame <= numFrames; frame++) {
        const currentAngle = startAngle + (frame / numFrames) * (endAngle - startAngle);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPoints();

        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;

        for (let i = 1; i < intermediateHull.length; i++) {
            ctx.beginPath();
            ctx.moveTo(intermediateHull[i - 1].x, intermediateHull[i - 1].y);
            ctx.lineTo(intermediateHull[i].x, intermediateHull[i].y);
            ctx.stroke();
        }

        // Draw the edge being calculated with counter-clockwise animation
        ctx.beginPath();
        ctx.arc(intermediateHull[intermediateHull.length - 1].x, intermediateHull[intermediateHull.length - 1].y, Math.hypot(intermediateHull[intermediateHull.length - 1].x - currentPoint.x, intermediateHull[intermediateHull.length - 1].y - currentPoint.y), startAngle, currentAngle, true);
        ctx.stroke();
    }

    // Add a delay to visualize the animation (increased delay for better visibility)
    setTimeout(() => {
        // clearCanvas();
        // drawPoints();
        visualizeConvexHull(intermediateHull);
    }, 1000); // Adjust the delay as needed
}

// Function to visualize the final convex hull
function visualizeConvexHullFinal(finalHull) {
    clearCanvas();
    drawPoints();

    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;

    for (let i = 1; i < finalHull.length; i++) {
        ctx.beginPath();
        ctx.moveTo(finalHull[i - 1].x, finalHull[i - 1].y);
        ctx.lineTo(finalHull[i].x, finalHull[i].y);
        ctx.stroke();
    }

    // Draw the closing edge
    ctx.beginPath();
    ctx.moveTo(finalHull[finalHull.length - 1].x, finalHull[finalHull.length - 1].y);
    ctx.lineTo(finalHull[0].x, finalHull[0].y);
    ctx.stroke();

}
