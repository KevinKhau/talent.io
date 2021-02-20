const tuplesSum = require('./tuplesSum');
const unorderedIntegers = require('./unordered_integers.json');
const unorderedCouples = require('./unordered_couples.json');
const orderedPositiveIntegers = require('./ordered_positive_integers.json');
const orderedPositiveCouples = require('./ordered_positive_couples.json');

const sampleIntegers = [-5, 13, 4, 9, -1, 13];
const sampleCouples = [[-5, 13], [4, 4], [9, -1]];

test('givenSampleIntegers_whenGetCouples8_thenSampleCouples', () => {
    expect(tuplesSum.getCouples(sampleIntegers, 8)).toStrictEqual(sampleCouples);
});

test('givenUnorderedIntegers_whenGetCouples150000_thenUnorderedCouples', () => {
    expect(tuplesSum.getCouples(unorderedIntegers, 150000)).toStrictEqual(unorderedCouples);
});

test('givenOrderedPositiveIntegers_whenGetCouplesWithOrdered150000_thenOrderedPositiveCouples', () => {
    expect(tuplesSum.getCouplesWithOrdered(orderedPositiveIntegers, 150000)).toStrictEqual(orderedPositiveCouples);
});
