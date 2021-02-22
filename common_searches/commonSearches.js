const pluralize = require('pluralize');

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
    const searchesGroupedBy = groupBy(searches, keys);
    let ranking = [];
    digTree(ranking, keys, searchesGroupedBy, []);
    ranking.sort((result, other) => {
        const countDiff = other['count'] - result['count'];
        return countDiff !== 0 ? countDiff : other['nb_of_recruiters'] - result['nb_of_recruiters'];
    });
    setRanks(ranking);
    return ranking;
}

/**
 * Digs the resulting searches tree grouped by given keys.
 *
 * @param ranking Ranking array.
 * @param keys Remaining search keys.
 * @param branch Current branch
 * @param entries Key/Value pairs of dug branches.
 */
function digTree(ranking, keys, branch, entries) {
    if (!keys.length) {
        aggregate(ranking, entries, branch);
        return;
    }
    for (const [left, right] of Object.entries(branch)) {
        let newEntry = {};
        newEntry[keys[0]] = left;
        digTree(ranking, keys.slice(1, keys.length), right, [...entries, newEntry]);
    }
}

/**
 * Aggregates searches to add a result to the ranking.
 *
 * @param ranking Ranking array.
 * @param entries Keys the searches have been done with.
 * @param searches Branch with searches.
 */
function aggregate(ranking, entries, searches) {

    if (!Array.isArray(searches)) {
        throw new TypeError('Expected type: array');
    }

    let result = {};

    /* Search Keys */
    entries.forEach(entry => {
        const [key, value] = Object.entries(entry)[0];
        result[pluralize.singular(key)] = value;
    });

    /* Sums */
    result['count'] = searches.reduce((a, b) => a + b['count'], 0);
    /* Conditions */
    if (result['count'] < 10) {
        return;
    }

    /* Unique */
    const onlyUnique = (value, index, self) => self.indexOf(value) === index;
    result['nb_of_recruiters'] = searches.map(search => search['recruiter_id']).filter(onlyUnique).length;
    result['nb_of_companies'] = searches.map(search => search['company_id']).filter(onlyUnique).length;

    ranking.push(result);
}

/**
 * Adds `rank` attribute to every result.
 *
 * @param ranking Ranking with results.
 */
function setRanks(ranking) {
    let currentCount = -1, currentRank = 0,
        stack = 1; // consecutive results with same count
    for (let i = 0; i < ranking.length; i++) {
        const result = ranking[i];
        if (currentCount !== result['count']) {
            currentRank += stack;
            stack = 1;
        } else {
            stack++;
        }
        result['rank'] = currentRank;
        currentCount = result['count'];
    }
}

/**
 * Group searches by the given array keys.
 *
 * @return {{}} an object whose keys are values of searched keys
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
    else    func(mayBeArray);
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
