import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import React, { ChangeEvent, useState } from 'react';
import { createStyles, Theme } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import RomanNumerals from './RomanNumerals';

const styles = createStyles(({ breakpoints }: Theme) => ({
    root: {
        height: '100vh',
        '& > div': {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            [breakpoints.down('sm')]: {
                height: '50%',
            },
            '& > .animation': {
                opacity: 0.7,
                fontSize: '10vw',
                position: 'absolute',
            },
            '& input': {
                zIndex: 2,
                border: 'none',
                outline: 'none',
                height: '100%',
                fontSize: '4vw',
                padding: '0 40px',
                textAlign: 'center',
                fontWeight: 'bolder',
                background: 'transparent',
                width: 'calc(100% - 80px)',
            },
            '&:first-child': {
                backgroundColor: '#01d6de',
                '& > .animation::after': {
                    content: 'counter(num, upper-roman)',
                },
            },
            '&:last-child': {
                backgroundColor: '#c32ed5',
                '& > .animation::after': {
                    content: 'counter(num)',
                },
                '& input': {
                    color: '#fff',
                    '&::placeholder': {
                        opacity: 0.7,
                        color: '#fff',
                    },
                    '&:-ms-input-placeholder': {
                        opacity: 0.7,
                        color: '#fff',
                    },
                    '&::-ms-input-placeholder': {
                        opacity: 0.7,
                        color: '#fff',
                    },
                },
            },
        },
    },
}));

type Props = {
    classes: { [key: string]: string },
}

const App = (props: Props) => {
    const { classes } = props;
    const [roman, setRoman] = useState('');
    const [arabic, setArabic] = useState('');
    const [alert, setAlert] = useState({ open: false, message: '' });
    const [blur, setBlur] = useState({ roman: false, arabic: false });

    const handleClose = () => {
        setAlert({ open: false, message: '' });
    };

    const onArabicChange = (e: ChangeEvent<any>) => {
        const arabic = parseInt(e.target.value, 10);
        if (arabic > RomanNumerals.maxRoman) {
            e.preventDefault();
            return setAlert({ open: true, message: `Arabic Number can\'t be greater than ${RomanNumerals.maxRoman.toLocaleString()}` });
        }
        setArabic(e.target.value);
        setRoman(RomanNumerals.toRoman(arabic));
    };

    const onRomanChange = (e: ChangeEvent<any>) => {
        const roman = e.target.value.toUpperCase();
        if (/^[_MDCLXVI]+$/.test(roman) || roman.length === 0) {
            setRoman(roman);
            setArabic((RomanNumerals.fromRoman(roman) || '').toString());
        } else {
            e.preventDefault();
            return setAlert({ open: true, message: 'Roman Number can only be one of MDCLXVI' });
        }
    };

    return (
        <React.Fragment>
            <Grid container justify="center" alignItems="center" className={classes.root}>
                <Grid item xs={12} md={6}>
                    <input
                        type="text"
                        value={roman}
                        onChange={onRomanChange}
                        placeholder="Type Roman Number"
                        style={{ opacity: blur.roman || roman ? 1 : 0 }}
                        onFocus={() => {
                            if (!roman) setArabic('');
                            setBlur({ roman: true, arabic: false });
                        }}
                    />
                    {!blur.roman && !roman && <div className="animation" />}
                </Grid>
                <Grid item xs={12} md={6}>
                    <input
                        type="text"
                        value={arabic}
                        onChange={onArabicChange}
                        placeholder="Type Arabic Number"
                        style={{ opacity: blur.arabic || arabic ? 1 : 0 }}
                        onFocus={() => {
                            if (!arabic) setRoman('');
                            setBlur({ roman: false, arabic: true });
                        }}
                    />
                    {!blur.arabic && !arabic && <div className="animation" />}
                </Grid>
            </Grid>
            <Snackbar
                open={alert.open}
                data-qa="snack-bar"
                onClose={handleClose}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MuiAlert severity="error" elevation={6} variant="filled" onClose={handleClose}>
                    {alert.message}
                </MuiAlert>
            </Snackbar>
        </React.Fragment>
    );
};

export default withStyles(styles)(App);
