class RomanNumerals {
    toRoman(arabic: number) {
        const romanNumList = [
            { roman: '_M', value: 1000000 },
            { roman: '_C_M', value: 900000 },
            { roman: '_D', value: 500000 },
            { roman: '_C_D', value: 400000 },

            { roman: '_C', value: 100000 },
            { roman: '_X_C', value: 90000 },
            { roman: '_L', value: 50000 },
            { roman: '_X_L', value: 40000 },

            { roman: '_X', value: 10000 },
            { roman: '_I_X', value: 9000 },
            { roman: '_V', value: 5000 },
            { roman: '_I_V', value: 4000 },

            { roman: 'M', value: 1000 },
            { roman: 'CM', value: 900 },
            { roman: 'D', value: 500 },
            { roman: 'CD', value: 400 },

            { roman: 'C', value: 100 },
            { roman: 'XC', value: 90 },
            { roman: 'L', value: 50 },
            { roman: 'XV', value: 40 },

            { roman: 'X', value: 10 },
            { roman: 'IX', value: 9 },
            { roman: 'V', value: 5 },
            { roman: 'IV', value: 4 },

            { roman: 'I', value: 1 },
        ];
        return romanNumList.reduce((acc, romanNum) => {
            const count = Math.floor(arabic / romanNum.value);
            acc += count ? Array(count).fill(romanNum.roman).join('') : '';
            arabic = arabic % romanNum.value;
            return acc;
        }, '');
    }

    fromRoman(roman: string) {
        const romanNumList = [
            { roman: '_C_M', value: 900000 },
            { roman: '_M', value: 1000000 },
            { roman: '_C_D', value: 400000 },
            { roman: '_D', value: 500000 },

            { roman: '_X_C', value: 90000 },
            { roman: '_C', value: 100000 },
            { roman: '_X_L', value: 40000 },
            { roman: '_L', value: 50000 },

            { roman: '_I_X', value: 9000 },
            { roman: '_X', value: 10000 },
            { roman: '_I_V', value: 4000 },
            { roman: '_V', value: 5000 },

            { roman: 'CM', value: 900 },
            { roman: 'M', value: 1000 },
            { roman: 'CD', value: 400 },
            { roman: 'D', value: 500 },

            { roman: 'XC', value: 90 },
            { roman: 'C', value: 100 },
            { roman: 'XV', value: 40 },
            { roman: 'L', value: 50 },

            { roman: 'IX', value: 9 },
            { roman: 'X', value: 10 },
            { roman: 'IV', value: 4 },
            { roman: 'V', value: 5 },

            { roman: 'I', value: 1 },
        ];
        return romanNumList.reduce((acc, romanNum) => {
            let romanNumberExists = roman.includes(romanNum.roman);

            while (romanNumberExists) {
                acc += romanNum.value;
                roman = roman.replace(romanNum.roman, '');
                romanNumberExists = roman.includes(romanNum.roman);
            }
            return acc;
        }, 0);
    }
}

export default new RomanNumerals();
