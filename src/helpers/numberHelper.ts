// take a number x, round with n decimals and return as a string
//      x = 0   , n = 1: returns 0.0
//      x = 1.19, n = 1: returns 1.2
export const withNDecimals = (x: number, decimalCount: number): string => {
    // 10^decimalCount
    const multiplier: number = Math.pow(10, decimalCount);
    const n: number = Math.round(x * multiplier) / multiplier;

    return n.toFixed(decimalCount);
}

// randomize a number x with a "padding" of random
//      x = 10, r = 5: returns number in [5; 15]
export const randomize = (x: number, random: number) => {
    return x + randomMinMax(-random, random);
}

// return and random number between A and B
export const randomMinMax = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}