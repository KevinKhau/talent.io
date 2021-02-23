const tuplesSum = require('./tuplesSum');
const unorderedIntegers = require('./unordered_integers.json');
const unorderedCouples = require('./unordered_couples.json');
const orderedPositiveIntegers = require('./ordered_positive_integers.json');
const orderedPositiveCouples = require('./ordered_positive_couples.json');

const sampleIntegers = [-5, 13, 4, 9, -1, 13];
const orderedSampleIntegers = [-5, -1, 4, 9, 13, 13];
const sampleCouples = [[-5, 13], [4, 4], [9, -1]];

/**
 * Sort couples, and order of couples, by increasing order.
 */
function sort(arr) {
    const sortByFirst = (a, b) => a[0] - b[0];
    return ([...arr].map(couple => couple.sort()).sort(sortByFirst));
}

test('givenSampleIntegers_whenGetCouples8_thenSampleCouples', () => {
    const actual = tuplesSum.getCouples(sampleIntegers, 8);
    expect(actual).not.toBeNull();
    expect(actual.length).toEqual(sampleCouples.length);
    expect(actual).toStrictEqual(sampleCouples);
});

test('givenOrderSampleIntegers_whenGetCouplesWithOrdered8_thenSampleCouples', () => {
    const actual = tuplesSum.getCouplesWithOrdered(orderedSampleIntegers, 8);
    expect(actual).not.toBeNull();
    expect(actual.length).toEqual(sampleCouples.length);
    expect(actual).toStrictEqual(sort(sampleCouples));
});

test('givenUnorderedIntegers_whenGetCouples150000_thenUnorderedCouples', () => {
    const actual = tuplesSum.getCouples(unorderedIntegers, 150000);
    expect(actual).not.toBeNull();
    expect(actual.length).toEqual(unorderedCouples.length);
    expect(sort(actual)).toStrictEqual(sort(unorderedCouples));
});

test('givenOrderedPositiveIntegers_whenGetCouples150000_thenOrderedPositiveCouples', () => {
    const actual = tuplesSum.getCouples(orderedPositiveIntegers, 150000);
    expect(actual).not.toBeNull();
    expect(actual.length).toEqual(orderedPositiveCouples.length);
    expect(sort(actual)).toStrictEqual(sort(orderedPositiveCouples));
});

test('givenOrderedPositiveIntegers_whenGetCouplesWithOrdered150000_thenOrderedPositiveCouples', () => {
    const actual = tuplesSum.getCouplesWithOrdered(orderedPositiveIntegers, 150000);
    expect(actual).not.toBeNull();
    expect(actual.length).toEqual(orderedPositiveCouples.length);
    expect(actual).toStrictEqual(orderedPositiveCouples);
});
