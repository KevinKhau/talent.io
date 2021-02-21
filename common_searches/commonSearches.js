module.exports = {
    getRanking,
    getRankingByCompany,
    groupBy
};

/**
 * Ranks combinations of position and technology, by how often they were searched.
 *
 * @param {*[]} searches an array of searches.
 * Each search contains the following fields:
 * - recruiter_id [Integer] Which recruiter made the search
 * - company_id [Integer] Which company the recruiters belongs to
 * - week [Integer] Week during which the search was made
 * - technologies [Array] Which technologies the recruiter searched (1 or more)
 * - positions [Array] Which positions the recruiter searched (1 or more)
 * - count [Integer] How many times that search was made during this week by that recruiter
 A combination can only contain 1 position and 1 technology.
 *
 * @param {string[]} keys Array of keys to search for.
 *
 * @return {*[]} an array of objects with the following properties:
 * - technology [String]
 * - position [String]
 * - count [Integer] Total number of times the combination appeared in a search. Must be greater than 10
 * - nb_of_recruiters [Integer] The number of distinct recruiters who searched for that combination
 * - nb_of_companies [Integer] The number of distinct companies who searched for that combination
 * - rank [Integer] Rank of the search in the ranking. Starts with 1. In case of equality of "count", assign the same rank
 * The ranking should be ordered by rank. In case of equality, order records by alphabetical order on the technology, then position.
 */
function getRanking(searches, keys = ['technologies', 'positions']) {
    const groupedBy = groupBy(searches, keys);
}

/**
 * Group searches by the given array keys.
 *
 * @return an object whose keys are values of searched keys
 */
function groupBy(searches, keys = ['technologies', 'positions']) {
    return searches.reduce((obj, search) => {
        buildTree(obj, search, keys);
        return obj;
    }, {});
}

/**
 * Helper to apply a function to a variable which may be an Array.
 * @param {string|array} mayBeArray
 * @param {function} func Applied to given `mayBeArray` param
 */
function apply(mayBeArray, func) {
    if (Array.isArray(mayBeArray))   mayBeArray.forEach(func);
    else    mayBeArray(mayBeArray);
}

/**
 * Adds the search to the branch tree.
 * @param branch tree or branch (subtree)
 * @param search search to parse
 * @param {string[]} keys keys or remaining keys to search for
 */
function buildTree(branch, search, keys) {
    const key = keys[0];
    const value = search[key];

    if (keys.length === 1) {
        function setLeaf(value) {
            if (branch[value]) {
                branch[value].push(search);
            } else {
                branch[value] = [search];
            }
        }
        apply(value, setLeaf);
        return;
    }

    function buildBranch(value) {
        if (!branch[value]) {
            branch[value] = {}
        }
        buildTree(branch[value], search, keys.slice(1, keys.length));
    }
    apply(value, buildBranch);
}

/**
 * @param searches
 * @return ranking of searched grouped by company.
 */
function getRankingByCompany(searches) {

}
