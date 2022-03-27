import MersenneTwister from "../src/index";

const positiveMT = require('./jsons/constructor_mt_seed_123456.json');
const positive_genrand_int32 = require('./jsons/genrand_int32_seed_123456.json');
const positive_genrand_real1 = require('./jsons/genrand_real1_seed_123456.json');
const positive_genrand_real2 = require('./jsons/genrand_real2_seed_123456.json');
const positive_genrand_real3 = require('./jsons/genrand_real3_seed_123456.json');
const positive_genrand_res53 = require('./jsons/genrand_res53_seed_123456.json');

test('mt after construction', () => {
    const mt = new MersenneTwister(123456);
    const positive = positiveMT.mt
    const sample = mt._snapshot().mt;
    expect(sample).toEqual(positive);
});

test('mti after construction', () => {
    const mt = new MersenneTwister(123456);
    const sample = mt._snapshot().mti;
    expect(sample).toEqual(624);
});

test('first 10^5 samples of genrand_int32', () => {
    const mt = new MersenneTwister(123456);
    positive_genrand_int32.genrand_int32.forEach((r: Number) => {
        expect(mt.genrand_int32()).toEqual(r);
    })
});

test('first 10^5 samples of genrand_real1', () => {
    const mt = new MersenneTwister(123456);
    positive_genrand_real1.genrand_real1.forEach((r: Number) => {
        const positive = String(r).substring(0, 11);
        const sample = String(mt.genrand_real1()).substring(0, 11);
        expect(sample).toEqual(positive);
    })
});

test('first 10^5 samples of genrand_real2', () => {
    const mt = new MersenneTwister(123456);
    positive_genrand_real2.genrand_real2.forEach((r: Number) => {
        const positive = String(r).substring(0, 11);
        const sample = String(mt.genrand_real2()).substring(0, 11);
        expect(sample).toEqual(positive);
    })
});

test('first 10^5 samples of genrand_real3', () => {
    const mt = new MersenneTwister(123456);
    positive_genrand_real3.genrand_real3.forEach((r: Number) => {
        const positive = String(r).substring(0, 11);
        const sample = String(mt.genrand_real3()).substring(0, 11);
        expect(sample).toEqual(positive);
    })
});

test('first 10^5 samples of genrand_res53', () => {
    const mt = new MersenneTwister(123456);
    positive_genrand_res53.genrand_res53.forEach((r: Number) => {
        const positive = String(r).substring(0, 11);
        const sample = String(mt.genrand_res53()).substring(0, 11);
        expect(sample).toEqual(positive);
    })
});
