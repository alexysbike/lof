// http://www.dbs.ifi.lmu.de/Publikationen/Papers/LOF.pdf
// v0.1.2
import euclideanDistance from "euclidean-distance";
import normalize from 'array-normalize';
import merc from 'mercator-projection';

export const toPoint = dataset => {
    return dataset.map(([lat, lng]) => {
      const { x, y } = merc.fromLatLngToPoint({ lat, lng });
      return [x, y];
    });
};

export const normalizeDataset = dataset => {
    const aplanned = dataset.reduce((acum, item) => [...acum, ...item], []);
    const normalized = normalize(aplanned, 2);
    const mapped = [];
    for (let i = 0, j = 1; j < normalized.length; i += 2, j += 2) {
        mapped.push([normalized[i], normalized[j]]);
    }
    return mapped;
};

// k-Nearest Neighbors (naive)
export const knn = (k, dataset, pIndex) => {
    return dataset
        // calculate the distance from selected index to the others
        .map((data, index) => [index, euclideanDistance(data, dataset[pIndex])])
        // filter the self point
        .filter(([index, distance]) => index !== pIndex)
        // sort by nearest
        .sort(([index1, distance1], [index2, distance2]) => distance1 - distance2)
        // get the K-neighbor
        .slice(0, k);
};

// distanceToKthNearestNeighbor
export const kd = (k, dataset, pIndex) => {
    const kNeighbors = knn(k, dataset, pIndex);
    const [index, distance] = kNeighbors.reduce((acc, dis) => acc[1] > dis[1] ? acc : dis);
    // returning the bigger distance in the neighbors
    return distance;
};

// Reachability Distance of point p and point o (used by lrd only)
export const rd = (k, dataset, pIndex, oIndex) => {
    // getting the bigger between neighbors of current index and  distance between selected index and current index
    return Math.max(kd(k, dataset, oIndex), euclideanDistance(dataset[pIndex], dataset[oIndex]));
};

const sigmaRdCalc = (nearestArray, k, dataset, pIndex) => nearestArray
  // reachDistance: getting the max value between the Kth distance and the distance between selected index and current index for each item
  .map(([oIndex, distance]) => rd(k, dataset, pIndex, oIndex))
  // getting the sum of reachDistances
  .reduce((d1, d2) => d1 + d2);

// Local Reachability Density of point p
export const lrd = (k, dataset, pIndex) => {
    // getting distances
    const nearestArray = knn(k, dataset, pIndex);
    const sigmaRd = sigmaRdCalc(nearestArray, k, dataset, pIndex);
    // was using the bigger distance in neighbors, instead I used length of pIndex neighbors (kNearestSetCount)
    return nearestArray.length / sigmaRd;
};

// Local Outlier Factor
export const lof = (k, rawDataset, pIndex, normalize = true, toMercator = false) => {
    const pointDataset = !toMercator ? rawDataset : toPoint(rawDataset);
    const dataset = !normalize ? pointDataset : normalizeDataset(pointDataset);
    const nearestArray = knn(k, dataset, pIndex);
    const sigmaLrdFraction = nearestArray
      .map(([oIndex]) => lrd(k, dataset, oIndex) / lrd(k, dataset, pIndex))
      .reduce((d1, d2) => d1 + d2);
    return (sigmaLrdFraction) / (nearestArray.length);
};

export default lof;
