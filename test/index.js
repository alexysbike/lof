import assert from "assert";
import lof, {knn, kd} from "../src";

const nearlyEqual = (a, b) => Math.abs(a - b) < 0.00000001;

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

describe("kd", () => {
    it("should returns max distance of k-nearest-neighbors", () => {
        const testDataset = [{
            k: 3,
            dataset: [[0],[3.2],[3.3],[1],[2],[3],[3.1],[4],[5]],
            sourceIndex: 0,
            // nearest point of [0] is [1],[2],[3]
            expected: 3
        }, {
            k: 2,
            dataset: [[0],[3.2],[3.3],[1],[2],[3],[3.1],[4],[5]],
            sourceIndex: 7,
            // nearest point of [4] is [3.3], [3.2]
            expected: 0.8
        }, {
            k: 1,
            dataset: [[0],[3.2],[3.3],[1],[2],[3],[3.1],[4],[5]],
            sourceIndex: 8,
            // nearest point of [5] is [4]
            expected: 1
        }];
        for (const {k, dataset, sourceIndex, expected} of testDataset) {
            assert.ok(nearlyEqual(kd(k, dataset, sourceIndex), expected));
        };
    });
});

// describe("lof function", () => {
//     it("should return anomaly values of dataset (1d)", () => {
//         const k = 3;
//         const dataset = [1,2,1,0,0,1,0,-1,-1,0,2,-1,5,-2,1,0];
//
//         for (const i of dataset.keys()) {
//         }
//     });
// });
