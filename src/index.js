// http://www.dbs.ifi.lmu.de/Publikationen/Papers/LOF.pdf

import euclideanDistance from "euclidean-distance";
import {zip, sum} from "lodash";

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

// k-distance
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
    // return kd(k, dataset, pIndex) / sigmaRd;
    // was using the bigger distance in neighbors, instead I used length of pIndex neighbors (kNearestSetCount)
    return nearestArray.length / sigmaRd;
};

// Local Outlier Factor
export const lof = (k, dataset, pIndex) => {
    const nearestArray = knn(k, dataset, pIndex);
    // changing for other formula (https://medium.com/@hornbd96/local-outlier-factor-example-by-hand-b57cedb10bd1)
    // const sigmaLrdFraction = nearestArray
    //     .map(([oIndex]) => lrd(k, dataset, oIndex) / lrd(k, dataset, pIndex))
    //     .reduce((d1, d2) => d1 + d2);
    //
    const sigmaLrdFraction = nearestArray
      .map(([oIndex]) => lrd(k, dataset, oIndex))
      .reduce((d1, d2) => d1 + d2);
    return (sigmaLrdFraction * sigmaRdCalc(nearestArray, k, dataset, pIndex)) / nearestArray.length * nearestArray.length;
};

export default lof;
