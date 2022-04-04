# Mersenne-Twister Pseudorandom Number Generator in Typescript

The famous pseudo-random number generator, Mersenne Twister is distributes as a C header file [MT.h](https://omitakahiro.github.io/random/code/MT.h).
We have translated the program into TypeScript, and distributed by npm package.
For modern convenience, the data structure has been changed so that generators can be created as instances.
The generator algorithm has not been changed.
We tested the execution results to see if they matched the original program.

## Installation

```
npm install https://github.com/misteltein/mersenne-twister.git
```

## Usage

Set the seed when you create the instance:
```
const mt = new MersenneTwister(123456);
```

The methods for generating random numbers are as follows:

|Method|Type|Resolution|Interval|
|----|----|----|----|
|genrand_int32|integer|32|[0,2^32-1]|
|genrand_real1|real|32| [0,1]|
|genrand_real2|real|32|[0,1)|
|genrand_real3|real|32|(0,1)|
|genrand_res53|real|53| [0,1)|

To initialize random numbers, use the method `init` to set a new seed:
```
mt.init(98765);
```

## License
See [LICENSE](LICENSE).
