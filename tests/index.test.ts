import MersenneTwister from "../src/index";

test('constructor', () => {
    const mt = new MersenneTwister(1234);
    console.dir(mt._preview())
    expect(mt).toBeDefined();
});
