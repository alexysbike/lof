// http://www.dbs.ifi.lmu.de/Publikationen/Papers/LOF.pdf

import {zip, sum} from "lodash";

export const euclideanDistance = (p1, p2) => {
    console.log("@p1,p2", p1,p2);
    const zpd = zip(p1, p2).map(([c1, c2]) => Math.pow(c1 - c2, 2));
    console.log("@zpd", zpd);
    return Math.sqrt(sum(zpd));
};

// k-Nearest Neighbors (naive)
export const knn = (k, dataset, sourceIndex) => {
    const kNeighbors = dataset
        .map((data, index) => [index, euclideanDistance(data, dataset[sourceIndex])])
        .filter(([index, distance]) => index !== sourceIndex)
        .sort(([index1, distance1], [index2, distance2]) => distance1 - distance2)
        .slice(0, k);
    return kNeighbors;
};

// Local Reachability Distance?
export const lrd = (kNeighbors, source) => kNeighbors.map((nn) => {
    return euclideanDistance(nn, source);
}).reduce(Math.max);

// Mean of lrd
export const mlrd = (k, kNeighbors, source) => lrd(kNeighbors, source) / k;

// Local Outlier Factor
export const lof = (k, dataset) => {
    return dataset.map((source, sourceIndex) => {
        const mlrdFraction = knn(k, dataset, sourceIndex).map(([kNeighborIndex, kNeighborDistance]) => {
            const v = mlrd(k, knn(k, dataset, sourceIndex), source) / mlrd(k, knn(k, dataset, kNeighborIndex), dataset[kNeighborIndex]);
            console.log("@v", lrd(dataset, source));
            return v;
        });
        return mlrdFraction / k;
    });
};

export default lof;
