// http://www.dbs.ifi.lmu.de/Publikationen/Papers/LOF.pdf

const sum = (arr) => arr.reduce((a, v) => a + v);

export const euclideanDistance = (p1, p2) => Math.sqrt(sum(zip(p1, p2).map((c1, c2) => Math.pow(c1 - c2), 2)))

// k-Nearest Neighbors (naive)
export const knn = (k, dataset, sourceIndex) => {
    const kNeighbors = dataset
        .map((data, index) => [index, euclideanDistance(data, sourceData)])
        .filter([index, distance] => index !== sourceIndex)
        .sort(([index1, distance1], [index2, distance2]) => distance1 - distance2)
        .slice(0, k)
    return kNeighbors;
};

// Local Reachability Distance?
export const lrd = (kNeighbors, source) => kNeighbors.map((nn) => euclideanDistance(nn, source)).reduce(Math.max);

// Mean of lrd
export const mlrd = (k, kNeighbors, source) => lrd(kNeighbors, source) / k;

// Local Outlier Factor
export const lof = (k, dataset, sourceIndex) => {
    const mlrdFraction = knn(k, dataset, sourceIndex).map([kNeighborIndex, kNeighborDistance] => {
        return mlrd(k, knn(k, dataset, sourceIndex), dataset[sourceIndex]) / mlrd(k, knn(k, dataset, kNeighborIndex), dataset[kNeighborIndex]);
    });
    return mlrdFraction / k;
};
