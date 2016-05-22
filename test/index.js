import assert from "assert";
import lof, {euclideanDistance, knn, lrd} from "../src";

describe("euclideanDistance", () => {
    it("should return distance of 2 points (1d)", () => {
        const dataset = [
            // p1, p2, distance
            [[0], [1], 1],
            [[-1], [1], 2],
            [[0], [10], 10],
            [[-5], [5], 10],
            [[0], [0], 0],
            [[1], [1], 0]
        ];

        for (const [p1, p2, distance] of dataset) {
            assert.strictEqual(euclideanDistance(p1, p2), distance);
        }
    });
    it("should return distance of 2 points (2d)", () => {
        const dataset = [
            // p1, p2, distance
            [[0,0], [0,1], 1],
            [[0,0], [0,10], 10],
            [[0,0], [3,4], 5],
            [[-3,-4], [3,4], 10],
            [[10, 20], [10, 100], 80]
        ];

        for (const [p1, p2, distance] of dataset) {
            assert.strictEqual(euclideanDistance(p1, p2), distance);
        }
    });
    it("should return distance of 2 points (3d)", () => {
        const dataset = [
            // p1, p2, distance
            [[0,0,0], [0,1,0], 1],
            [[1,1,1], [2,2,2], Math.sqrt(3)],
            [[-5,-5,-5], [5,5,5], Math.sqrt(3) * 10]
        ];

        for (const [p1, p2, distance] of dataset) {
            // nearly equals
            assert.ok(Math.abs(euclideanDistance(p1, p2) - distance) < 0.00000001);
        }
    });
});

describe("knn", () => {
    it("returning data size should be k", () => {
        const dataset = [[0],[0],[1],[-1],[1],[0],[2],[-1],[5],[0]];

        for (const _k of Array.from(Array(5).keys())) {
            const k = _k + 1; // k >= 1
            assert.strictEqual(knn(k, dataset, 0).length, k);
        }
    });
    it("returning data size should be (dataset size - 1) when k is bigger than dataset size", () => {
        const dataset = [[0],[0],[1],[0]];

        for (const _k of Array.from(Array(5).keys())) {
            const k = _k + 10;
            assert.strictEqual(knn(k, dataset, 0).length, dataset.length - 1);
        }
    });
    it("should returns sorted neighbors data", () => {
        const dataset = [[0],[3.2],[3.3],[1],[2],[3],[3.1],[4],[5]];

        const results = knn(5, dataset, 0);
        const expected = [
            // [index, distance]
            [3, 1],
            [4, 2],
            [5, 3],
            [6, 3.1],
            [1, 3.2]
        ];
        assert.deepEqual(results, expected);
    });
});

describe("lrd", () => {
    it("should returns max distance of k-nearest-neighbors", () => {
        const dataset = [[0],[3.2],[3.3],[1],[2],[3],[3.1],[4],[5]];

        assert.strictEqual(lof(3, dataset));
    });
});

describe("lof function", () => {
    it("should return anomaly values of dataset (1d)", () => {
        const k = 3;
        const dataset = [1,2,1,0,0,1,0,-1,-1,0,2,-1,5,-2,1,0];

        for (const i of dataset.keys()) {
        }
    });
});
