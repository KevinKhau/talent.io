const commonSearches = require('./commonSearches');

const sampleSearches = require('./sampleSearches.json');
const sampleRanking = require('./sampleRanking.json');
const sampleRankingByCompany = require('./sampleRankingByCompany.json');
const sampleSearchesGroupedBy = require('./sampleSearchesGroupedBy.json');
const sampleSearchesGroupedByCompanyAndMore = require('./sampleSearchesGroupedByCompany+.json');

const searches = require('./searches.json');
const totalRanking = require('./total_ranking.json');
const rankingByCompany = require('./ranking_by_company.json');

test('givenSampleSearches_whenGroupBy_thenSampleSearchesGroupedBy', () => {
    const actual = commonSearches.groupBy(sampleSearches);
    expect(actual).not.toBeNull();
    expect(actual.length).toEqual(sampleSearchesGroupedBy.length);
    expect(actual).toStrictEqual(sampleSearchesGroupedBy);
})

test('givenSampleSearches_whenGetRanking_thenSampleRanking', () => {
    const actual = commonSearches.getRanking(sampleSearches);
    expect(actual).not.toBeNull();
    expect(actual.length).toEqual(sampleRanking.length);
    expect(actual).toStrictEqual(sampleRanking);
});

test('givenSampleSearches_whenGroupByCompany+_thenSampleSearchesGroupedByCompany+', () => {
    const actual = commonSearches.groupBy(sampleSearches, ['company_id', 'technologies', 'positions']);
    expect(actual).not.toBeNull();
    expect(actual.length).toEqual(sampleSearchesGroupedByCompanyAndMore.length);
    expect(actual).toStrictEqual(sampleSearchesGroupedByCompanyAndMore);
});

test('givenSamplesSearches_whenGetSampleRankingByCompany_thenSampleRankingByCompany', () => {
    const actual = commonSearches.getRankingByCompany(sampleSearches);
    expect(actual).not.toBeNull();
    expect(actual.length).toEqual(sampleRankingByCompany.length);
    expect(actual).toStrictEqual(sampleRankingByCompany);
});

test('givenSearches_whenGetRanking_thenTotalRanking', () => {
    const actual = commonSearches.getRanking(searches);
    expect(actual).not.toBeNull();
    expect(actual.length).toEqual(totalRanking.length);
    expect(actual).toStrictEqual(totalRanking);
});

test('givenSearches_whenGetRankingByCompany_thenRankingByCompany', () => {
    const actual = commonSearches.getRankingByCompany(searches);
    expect(actual).not.toBeNull();
    expect(actual.length).toEqual(rankingByCompany.length);
    expect(actual).toStrictEqual(rankingByCompany);
});
