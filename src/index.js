// http://www.dbs.ifi.lmu.de/Publikationen/Papers/LOF.pdf

import euclideanDistance from "euclidean-distance";
import {zip, sum} from "lodash";

// k-Nearest Neighbors (naive)
export const knn = (k, dataset, pIndex) => {
    return dataset
        .map((data, index) => [index, euclideanDistance(data, dataset[pIndex])])
        .filter(([index, distance]) => index !== pIndex)
        .sort(([index1, distance1], [index2, distance2]) => distance1 - distance2)
        .slice(0, k);
};

// k-distance
export const kd = (k, dataset, pIndex) => {
    const kNeighbors = knn(k, dataset, pIndex);
    const [index, distance] = kNeighbors.reduce((acc, dis) => acc[1] > dis[1] ? acc : dis);
    return distance;
};

// Reachability Distance of point p and point o
export const rd = (k, dataset, pIndex, oIndex) => {
    return Math.max(kd(k, dataset, oIndex), euclideanDistance(dataset[pIndex], dataset[oIndex]));
};

// Local Reachability Density of point p
export const lrd = (k, dataset, pIndex) => {
    const sigmaRd = knn(k, dataset, pIndex)
        .map(([oIndex, distance]) => rd(k, dataset, pIndex, oIndex))
        .reduce((d1, d2) => d1 + d2);
    kd(k, dataset, pIndex) / sigmaRd(k, dataset, pIndex);
};

// Local Outlier Factor
export const lof = (k, dataset, pIndex) => {
    const sigmaLrdFraction = knn(k, dataset, pIndex)
        .map(([oIndex]) => lrd(k, dataset, oIndex) / lrd(k, dataset, pIndex))
        .reduce((d1, d2) => d1 + d2);
    return sigmaLrdFraction / kd(k, dataset, pIndex);
};

export default lof;
