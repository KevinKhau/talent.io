module.exports = {
    getCouples,
    getCouplesWithOrdered
};

/**
 * Returns a set of couples summing to a given number.
 * Using hash for direct storage and access, this results in 0(n) time-complexity. The space complexity is O(n), since
 * additional memory is required for longer input. The worst space case is when there is no couple match.
 *
 * Note: In a naive for-loop, an existing couple is added in pathing order of every first number. It would result
 * in O(n²) time-complexity and O(n) space-complexity, because it would have to store values to avoid repetitions.
 * In the hash implementation, a couple is added only after the second number appears in the pathing order.
 * Thus the resulting array is ordered differently.
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
    const result = [];
    const addedNumbers = {};
    let end = orderedArr.length;
    for (let i = 0; i < orderedArr.length; i++) {
        const number = orderedArr[i];
        if(addedNumbers[number])   continue; // avoid repetitions
        const diff = sum - number;
        const diffIndex = binarySearch(orderedArr, diff, i, end);
        if (diffIndex >= 0) {
            end = diffIndex;
            result.push([number, orderedArr[diffIndex]]);
            addedNumbers[number] = true;
            addedNumbers[orderedArr[diffIndex]] = true;
        }
    }
    return result
}

/**
 * @return {number} found target index or -1.
 */
function binarySearch(orderedArr, target, start, end) {
    if (start > end)    return -1;

    const middle = Math.floor(start + (end - start) / 2);
    if (orderedArr[middle] === target)   return middle;
    else if (orderedArr[middle] > target)   return binarySearch(orderedArr, target, start, middle - 1);
    else    return binarySearch(orderedArr, target, middle + 1, end);
}
