module.exports = {
    getCouples,
    getCouplesWithOrdered
};

/**
 * Returns a set of couples summing to s.
 * Using hash for direct access, this will result in 0(n) time-complexity.
 *
 * @param arr integers
 * @param sum wanted sum
 * @return all couples of elements summing to a given number
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
        else    hash[n] = true;
    }

    return couples;
}

/**
 * Returns a set of couples summing to s, searching in an ordered array.
 *
 * @param orderedArr
 * @param sum wanted sum
 */
function getCouplesWithOrdered(orderedArr, sum) {

}
