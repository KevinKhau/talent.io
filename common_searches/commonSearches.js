module.exports = {
    getRanking,
    getRankingByCompany
};

/**
 * Ranks combinations of position and technology, by how often they were searched.
 *
 * @param searches an array of searches.
 * Each search contains the following fields:
 * - recruiter_id [Integer] Which recruiter made the search
 * - company_id [Integer] Which company the recruiters belongs to
 * - week [Integer] Week during which the search was made
 * - technologies [Array] Which technologies the recruiter searched (1 or more)
 * - positions [Array] Which positions the recruiter searched (1 or more)
 * - count [Integer] How many times that search was made during this week by that recruiter
 A combination can only contain 1 position and 1 technology.
 *
 * @return an array of objects with the following properties:
 * - technology [String]
 * - position [String]
 * - count [Integer] Total number of times the combination appeared in a search. Must be greater than 10
 * - nb_of_recruiters [Integer] The number of distinct recruiters who searched for that combination
 * - nb_of_companies [Integer] The number of distinct companies who searched for that combination
 * - rank [Integer] Rank of the search in the ranking. Starts with 1. In case of equality of "count", assign the same rank
 * The ranking should be ordered by rank. In case of equality, order records by alphabetical order on the technology, then position.
 */
function getRanking(searches) {

}

/**
 * @param searches
 * @return ranking of searched grouped by company.
 */
function getRankingByCompany(searches) {

}
