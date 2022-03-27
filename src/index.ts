/**
 * Mersenne Twister engine
 */
class MersenneTwister {
    // period parameters
    static readonly MT_N = 624 as number;
    static readonly MT_M = 397 as number;
    static readonly MATRIX_A = 0x9908b0df as number; // constant vector a
    static readonly UPPER_MASK = 0x80000000 as number; // most significant w-r bits
    static readonly LOWER_MASK = 0x7fffffff as number; // least significant r bits
    static readonly INV_1 = 1.0 / 0xffffffff;
    static readonly INV_2 = 1.0 / 0x100000000;
    static readonly INV_3 = 1.0 / 0x100000000;
    static readonly INV_53 = 1.0 / 0x20000000000000;

    mt = new Array<number>(MersenneTwister.MT_N); // the array for the state vector
    mti = MersenneTwister.MT_M + 1; // mti==MT_N+1 means mt[MT_N] is not initialized

    mag01 = new Array<number>(2);

    /**
     * Construct a Mersenne Twister engine
     * @constructor
     * @classes Mersenne Twister engine
     * @param {number} s - seed(integer)
     */
    constructor(s: number) {
        this.init(s);
        this.mag01 = [0x0, MersenneTwister.MATRIX_A];
    }

    /**
     * Initialize the Mersenne Twister engine
     * @param {number} s - seed
     */
    init(s: number) {
        this.mt[0] = s & 0xffffffff;
        for (this.mti = 1; this.mti < MersenneTwister.MT_N; ++this.mti) {
            this.mt[this.mti] =
                this.multiple_as_uint32(1812433253, (this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30)))
                + this.mti;
            /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
            /* In the previous versions, MSBs of the seed affect   */
            /* only MSBs of the array mt[].                        */
            /* 2002/01/09 modified by Makoto Matsumoto             */
            this.mt[this.mti] >>>= 0;
            /* for >32 bit machines */
        }
    }

    /**
     * @return {number} random integer on [0,2^32]-real-interval
     */
    genrand_int32(): number {
        let y = 0 as number;
        if (this.mti >= MersenneTwister.MT_N) {
            let kk;
            for (kk = 0; kk < MersenneTwister.MT_N - MersenneTwister.MT_M; ++kk) {
                y = (this.mt[kk] & MersenneTwister.UPPER_MASK) | (this.mt[kk + 1] & MersenneTwister.LOWER_MASK);
                this.mt[kk] = this.mt[kk + MersenneTwister.MT_M] ^ (y >>> 1) ^ this.mag01[y & 0x1];
            }
            for (; kk < MersenneTwister.MT_N - 1; ++kk) {
                y = (this.mt[kk] & MersenneTwister.UPPER_MASK) | (this.mt[kk + 1] & MersenneTwister.LOWER_MASK);
                this.mt[kk] = this.mt[kk + (MersenneTwister.MT_M - MersenneTwister.MT_N)] ^ (y >>> 1) ^ this.mag01[y & 0x1];
            }
            y = (this.mt[MersenneTwister.MT_N - 1] & MersenneTwister.UPPER_MASK) | (this.mt[0] & MersenneTwister.LOWER_MASK);
            this.mt[MersenneTwister.MT_N - 1] = this.mt[MersenneTwister.MT_M - 1] ^ (y >>> 1) ^ this.mag01[y & 0x1];

            this.mti = 0;
        }

        y = this.mt[this.mti++];

        // Tempering
        y ^= (y >>> 11);
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= (y >>> 18);

        return y >>> 0;
    }

    /**
     * @return {number} random number on [0,1]-real-interval with 32 bit resolution
     */
    genrand_real1(): number {
        return this.genrand_int32() * MersenneTwister.INV_1;
    }

    /**
     * @return {number} random number on [0,1)-real-interval with 32 bit resolution
     */
    genrand_real2(): number {
        return this.genrand_int32() * MersenneTwister.INV_2;
    }

    /**
     * @return {number} random number on (0,1)-real-interval with 32 bit resolution
     */
    genrand_real3(): number {
        return (this.genrand_int32() + 0.5) * MersenneTwister.INV_3;
    }

    /**
     * @return {number} random number on [0,1) with 53-bit resolution
     */
    genrand_res53(): number {
        const a = this.genrand_int32() >>> 5;
        const b = this.genrand_int32() >>> 6;
        return (a * 0x4000000 + b) * MersenneTwister.INV_53;
    }

    /**
     * A function that interprets two 53-bit variables as 32-bit variables,
     * multiplies them, and returns the result as a 32-bit variable
     * @param {number} a
     * @param {number} b
     */
    private multiple_as_uint32(a: number, b: number) {
        const a1 = a >>> 16;
        const a2 = a & 0xffff;
        const b1 = b >>> 16;
        const b2 = b & 0xffff;
        return (((a1 * b2 + a2 * b1) << 16) + a2 * b2) >>> 0;
    }

    _preview() {
        return {mt: this.mt, mti: this.mti, mag01: this.mag01};
    }
}

export default MersenneTwister;
