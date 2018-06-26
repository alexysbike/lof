import assert from "assert";
import lof, {knn, kd, lrd} from "../src";
import euclideanDistance from "euclidean-distance";

// const nearlyEqual = (a, b) => Math.abs(a - b) < 0.00000001;
//
// describe("knn", () => {
//     it("returning data size should be k", () => {
//         const dataset = [[0],[0],[1],[-1],[1],[0],[2],[-1],[5],[0]];
//
//         for (const _k of Array.from(Array(5).keys())) {
//             const k = _k + 1; // k >= 1
//             assert.strictEqual(knn(k, dataset, 0).length, k);
//         }
//     });
//     it("returning data size should be (dataset size - 1) when k is bigger than dataset size", () => {
//         const dataset = [[0],[0],[1],[0]];
//
//         for (const _k of Array.from(Array(5).keys())) {
//             const k = _k + 10;
//             assert.strictEqual(knn(k, dataset, 0).length, dataset.length - 1);
//         }
//     });
//     it("should returns sorted neighbors data", () => {
//         const dataset = [[0],[3.2],[3.3],[1],[2],[3],[3.1],[4],[5]];
//
//         const results = knn(5, dataset, 0);
//         const expected = [
//             // [index, distance]
//             [3, 1],
//             [4, 2],
//             [5, 3],
//             [6, 3.1],
//             [1, 3.2]
//         ];
//         assert.deepEqual(results, expected);
//     });
// });
//
// describe("kd", () => {
//     it("should returns max distance of k-nearest-neighbors", () => {
//         const testDataset = [{
//             k: 3,
//             dataset: [[0],[3.2],[3.3],[1],[2],[3],[3.1],[4],[5]],
//             sourceIndex: 0,
//             // nearest point of [0] is [1],[2],[3]
//             expected: 3
//         }, {
//             k: 2,
//             dataset: [[0],[3.2],[3.3],[1],[2],[3],[3.1],[4],[5]],
//             sourceIndex: 7,
//             // nearest point of [4] is [3.3], [3.2]
//             expected: 0.8
//         }, {
//             k: 1,
//             dataset: [[0],[3.2],[3.3],[1],[2],[3],[3.1],[4],[5]],
//             sourceIndex: 8,
//             // nearest point of [5] is [4]
//             expected: 1
//         }];
//         for (const {k, dataset, sourceIndex, expected} of testDataset) {
//             assert.ok(nearlyEqual(kd(k, dataset, sourceIndex), expected));
//         };
//     });
// });

describe('testing lof', () => {
  it('should return lof and be a number with k of 2', () => {
    // const raw = [{"delay":0,"coordinates":[-33.451110392781,-70.812081545591]},{"delay":300,"coordinates":[-34.174431,-70.746095]},{"delay":300,"coordinates":[-34.182793,-70.770022]},{"delay":300,"coordinates":[-34.181455,-70.737295]},{"delay":300,"coordinates":[-34.173969,-70.742247]},{"delay":300,"coordinates":[-34.173756,-70.714255]},{"delay":300,"coordinates":[-34.181089,-70.741827]},{"delay":300,"coordinates":[-34.170693,-70.729641]},{"delay":300,"coordinates":[-34.183057,-70.73126]},{"delay":300,"coordinates":[-34.124135,-70.738878]},{"delay":300,"coordinates":[-34.178646,-70.736963]},{"delay":300,"coordinates":[-34.170082,-70.740729]},{"delay":300,"coordinates":[-34.173969,-70.742247]},{"delay":300,"coordinates":[-34.183057,-70.720274]},{"delay":300,"coordinates":[-34.164916,-70.7423]},{"delay":300,"coordinates":[18.08255,-63.052251]},{"delay":300,"coordinates":[-34.176755,-70.763049]},{"delay":300,"coordinates":[-34.128122,-70.740849]},{"delay":300,"coordinates":[-34.169424,-70.736753]},{"delay":300,"coordinates":[-34.168678,-70.747911]},{"delay":300,"coordinates":[-34.189427,-70.728419]},{"delay":300,"coordinates":[-34.155788,-70.720274]},{"delay":300,"coordinates":[-34.159325,-70.722356]},{"delay":300,"coordinates":[-34.162981,-70.69432]},{"delay":300,"coordinates":[-34.150788,-70.73415]},{"delay":300,"coordinates":[-33.42552,-70.566315]},{"delay":300,"coordinates":[-34.135728,-70.737914]},{"delay":300,"coordinates":[-34.183057,-70.742247]},{"delay":300,"coordinates":[-34.178777,-70.724169]},{"delay":300,"coordinates":[-34.183821,-70.748073]},{"delay":300,"coordinates":[-34.197805,-70.784669]}];
    // const dataset = raw.map(item => item.coordinates);

    const dataset = [
      [0, 0],
      [0, 1],
      [1, 1],
      [3, 0],
    ];

    dataset.forEach((item, index) => {
      const result = lof(2, dataset, index);
      console.log(result);
      assert.equal(typeof result, 'number');
    });
  });
});

// describe("lof function", () => {
// //     it("should return anomaly values of dataset (1d)", () => {
// //         const k = 3;
// //         const dataset = [1,2,1,0,0,1,0,-1,-1,0,2,-1,5,-2,1,0];
// //
// //         for (const i of dataset.keys()) {
// //         }
// //     });
// // });
