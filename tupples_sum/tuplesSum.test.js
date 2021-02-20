const tuplesSum = require('./tuplesSum');
const unorderedIntegers = require('./unordered_integers.json');
const unorderedCouples = require('./unordered_couples.json');
const orderedPositiveIntegers = require('./ordered_positive_integers.json');
const orderedPositiveCouples = require('./ordered_positive_couples.json');

const sampleIntegers = [-5, 13, 4, 9, -1, 13];
const sampleCouples = [[-5, 13], [4, 4], [9, -1]];

test('givenSampleIntegers_whenGetCouples8_thenSampleCouples', () => {
    const actual = tuplesSum.getCouples(sampleIntegers, 8);
    expect(actual).not.toBeNull();
    expect(actual.length).toEqual(sampleCouples.length);
    expect(actual).toStrictEqual(sampleCouples);
});

test('givenUnorderedIntegers_whenGetCouples150000_thenUnorderedCouples', () => {
    const actual = tuplesSum.getCouples(unorderedIntegers, 150000);
    expect(actual).not.toBeNull();
    expect(actual.length).toEqual(unorderedCouples.length);
    expect(actual).toStrictEqual(unorderedCouples);
});

test('givenOrderedPositiveIntegers_whenGetCouplesWithOrdered150000_thenOrderedPositiveCouples', () => {
    const actual = tuplesSum.getCouplesWithOrdered(orderedPositiveIntegers, 150000);
    expect(actual).not.toBeNull();
    expect(actual.length).toEqual(orderedPositiveCouples.length);
    expect(actual).toStrictEqual(orderedPositiveCouples);
});
