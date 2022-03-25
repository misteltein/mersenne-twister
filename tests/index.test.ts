import MersenneTwister from "../src/index";

const positiveMT = require('./jsons/constructor_mt_seed_123456.json');

test('constructor mt', () => {
    const mt = new MersenneTwister(123456);
    const sample = mt._preview().mt;
    expect(sample).toEqual(positiveMT.mt);
});
