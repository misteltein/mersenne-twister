import MersenneTwister from "../src/index";

const positiveMT = require('./jsons/constructor_mt_seed_123456.json');
const positive_genrand_int32 = require('./jsons/genrand_int32_seed_123456.json');

test('mt after construction', () => {
    const mt = new MersenneTwister(123456);
    const sample = mt._preview().mt;
    expect(sample).toEqual(positiveMT.mt);
});

test('mti after construction', () => {
    const mt = new MersenneTwister(123456);
    const sample = mt._preview().mti;
    expect(sample).toEqual(624);
});

test('first 10^5 samples of genrand_int32', () => {
    const mt = new MersenneTwister(123456);
    positive_genrand_int32.genrand_int32.forEach((r: Number) => {
        expect(r).toEqual(mt.genrand_int32());
    })
});

