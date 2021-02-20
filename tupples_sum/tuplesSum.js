module.exports = {
    getCouples,
    getCouplesWithOrdered
};

/**
 * Returns a set of couples summing to a given number.
 * Using hash for direct storage and access, this results in 0(n) time-complexity.
 *
 * Note: In a naive for-loop resulting in O(n²) time-complexity, an existing couple is added in pathing order of every
 * first number. In the hash implementation, a couple is added only after the second number appears in the
 * pathing order. Thus the resulting array will be ordered differently.
 *
 * @param arr array of integers to search in.
 * @param sum wanted sum.
 * @return all couples of elements summing to a given number.
 */
function getCouples(arr, sum) {
    const couples = [];
    const hash = {};

    for (let i = 0; i < arr.length; i++) {
        const n = arr[i];
        if (hash[n] === false) { // avoid repetitions
            continue;
        }
        const diff = sum - n;
        if (sum / 2 === n) couples.push([n, n]);
        else if (hash[diff] === true) {
            couples.push([diff, n]);
            hash[n] = false; // set to further avoid repetitions
        }
        else    hash[n] = true; // candidate for couple
    }

    return couples;
}

/**
 * Returns a set of couples summing to s, searching in an ordered array.
 *
 * While the time complexity would remain O(n), we can still optimize and reduce the number of instructions
 * by using binary searches. The more single elements, the more cost-saving solution.
 *
 * @param orderedArr ordered array of integers to search in.
 * @param sum wanted sum.
 */
function getCouplesWithOrdered(orderedArr, sum) {
    return getCouples(orderedArr, sum);
}
