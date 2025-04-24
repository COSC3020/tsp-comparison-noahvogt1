const { performance } = require('perf_hooks');
const { plot } = require('nodeplotlib');

// Held-Karp implementation
function heldKarp(distance_matrix) {
    let minDist = Infinity;

    for (let start = 0; start < distance_matrix.length; start++) {
        let visited = new Set([start]);
        let dist = rec_hk(distance_matrix, start, visited);
        if (dist < minDist) minDist = dist;
    }
    return minDist === Infinity ? 0 : minDist;
}

function rec_hk(matrix, current, visited, memoization = {}) {
    let key = current + "|" + [...visited].sort();

    if (memoization[key] != undefined) return memoization[key];
    if (visited.size === matrix.length) return 0;

    let minDist = Infinity;

    for (let i = 0; i < matrix.length; i++) {
        if (!visited.has(i) && matrix[current][i] !== 0) {
            visited.add(i);
            let dist = matrix[current][i] + rec_hk(matrix, i, visited, memoization);
            if (dist < minDist) minDist = dist;
            visited.delete(i);
        }
    }

    memoization[key] = minDist;
    return minDist;
}

// Local Search
function localSearch(distance_matrix) {
    let n = distance_matrix.length;

    if (n <= 1) return 0;

    let route = [...Array(n).keys()];
    let totalDistance = 0;

    for (let i = 0; i < n - 1; i++) {
        totalDistance += distance_matrix[route[i]][route[i + 1]];
    }
    totalDistance += distance_matrix[route[n - 1]][route[0]]; // close loop

    let improvement = 0;
    while (improvement < 10) {
        let i = 1 + Math.floor(Math.random() * (n - 3));
        let k = i + Math.floor(Math.random() * (n - i - 1));

        let oldDist = distance_matrix[route[i - 1]][route[i]] + distance_matrix[route[k]][route[(k + 1) % n]];
        let newDist = distance_matrix[route[i - 1]][route[k]] + distance_matrix[route[i]][route[(k + 1) % n]];
        let change = newDist - oldDist;

        if (change < 0) {
            let start = route.slice(0, i);
            let reversed = route.slice(i, k + 1).reverse();
            let end = route.slice(k + 1);
            route = start.concat(reversed, end);

            totalDistance += change;
            improvement = 0;
        } else {
            improvement++;
        }
    }

    return totalDistance;
}

// Distance matrix generator
function generateDistanceMatrix(n) {
    const points = Array.from({ length: n }, () => [Math.random(), Math.random()]);
    return Array.from({ length: n }, (_, i) =>
        Array.from({ length: n }, (_, j) =>
            Math.hypot(points[i][0] - points[j][0], points[i][1] - points[j][1])
        )
    );
}

// Run experiments
const inputSizes = [5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18]; // Adjust upper bound if needed
const hkTimes = [], lsTimes = [];

for (const n of inputSizes) {
    const distMatrix = generateDistanceMatrix(n);

    if (n <= 18) {
        const hkStart = performance.now();
        heldKarp(distMatrix);
        hkTimes.push((performance.now() - hkStart) / 1000);
    }

    const lsStart = performance.now();
    localSearch(distMatrix);
    lsTimes.push((performance.now() - lsStart) / 1000);
}

// Plot only runtime comparison
plot([
    { x: inputSizes, y: hkTimes, type: 'line', name: 'Held-Karp' },
    { x: inputSizes, y: lsTimes, type: 'line', name: 'Local Search' }
], {
    title: 'Runtime vs Number of Cities',
    xaxis: { title: 'Number of Cities' },
    yaxis: { title: 'Time (seconds)' }
});
