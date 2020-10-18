import RomanNumerals from './RomanNumerals';

describe('RomanNumerals', () => {
    describe('toRoman', () => {
        it('convert arabic numbers to roman', () => {
            expect(RomanNumerals.toRoman(3999)).toBe('MMMCMXCIX');
            expect(RomanNumerals.toRoman(39999)).toBe('_X_X_X_I_XCMXCIX');
            expect(RomanNumerals.toRoman(399999)).toBe('_C_C_C_X_C_I_XCMXCIX');
        });
    });

    describe('fromRoman', () => {
        it('convert roman numbers to arabic', () => {
            expect(RomanNumerals.fromRoman('MMMCMXCIX')).toBe(3999);
            expect(RomanNumerals.fromRoman('_X_X_X_I_XCMXCIX')).toBe(39999);
            expect(RomanNumerals.fromRoman('_C_C_C_X_C_I_XCMXCIX')).toBe(399999);
        });
    });
});
