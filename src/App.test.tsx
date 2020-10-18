import React from 'react';
// @ts-ignore
import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('rendering functionality', () => {
  it('renders roman number input in default state', () => {
    const { container } = render(<App />);
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBe(2);
    inputs.forEach((input: HTMLInputElement) => {
      expect(input.value).toBe('');
      expect(input.style.opacity).toBe('0');
    });
  });

  describe('snackBar component', () => {
    it('is in error mode and dismissible', (done) => {
      const { container } = render(<App />);
      const input = container.querySelectorAll('input')[1];
      fireEvent.change(input, { target: { value: '10000000' } });
      const snackBar = container.querySelector('[data-qa="snack-bar"]');
      expect(snackBar.querySelector('.MuiAlert-filledError')).toBeTruthy();
      snackBar.querySelector('button').click();
      setTimeout(() => {
        expect(container.querySelector('[data-qa="snack-bar"]')).toBeFalsy();
        done();
        // wait for the alert to be dismissed
      }, 1000);
    });
  });

  describe('numbers input', () => {
    describe('roman numeral input', () => {
      describe('rendering the animation component', () => {
        it('renders the animation component there is no focus', () => {
          const { container } = render(<App />);
          const input = container.querySelectorAll('input')[0];
          expect(input.parentElement.querySelector('.animation')).toBeTruthy();
          input.focus();
          expect(input.parentElement.querySelector('.animation')).toBeFalsy();
        });

        it('renders the animation component there is no roman', () => {
          const { container } = render(<App />);
          const input = container.querySelectorAll('input')[0];
          expect(input.parentElement.querySelector('.animation')).toBeTruthy();
          fireEvent.change(input, { target: { value: 'x' } });
          expect(input.parentElement.querySelector('.animation')).toBeFalsy();
        });
      });

      describe('onFocus functionality', () => {
        it('empty the arabic value when there is no roman value', () => {
          const { container } = render(<App />);
          const roman = container.querySelectorAll('input')[0];
          const arabic = container.querySelectorAll('input')[1];
          fireEvent.change(arabic, { target: { value: '10' } });
          expect(container.querySelectorAll('input')[0].value).toBe('X');

          fireEvent.blur(roman);
          fireEvent.focus(roman);
          expect(container.querySelectorAll('input')[1].value).toBe('10');
        });
      });

      describe('onChange functionality', () => {
        it('updates the roman\'s value when it is valid or empty and calc arabic number', () => {
          const { container } = render(<App />);
          const input = container.querySelectorAll('input')[0];
          fireEvent.change(input, { target: { value: 'x' } });
          expect(input.value).toBe('X');
          expect(container.querySelectorAll('input')[1].value).toBe('10');

          fireEvent.change(input, { target: { value: '' } });
          expect(input.value).toBe('');
          expect(container.querySelectorAll('input')[1].value).toBe('');
        });

        it('prevent updating the roman number when not valid and set alert with proper message', () => {
          const { container, getByText } = render(<App />);
          const input = container.querySelectorAll('input')[0];
          fireEvent.change(input, { target: { value: 's' } });
          expect(input.value).toBe('');
          expect(getByText('Roman Number can only be one of MDCLXVI')).toBeTruthy();
        });
      });
    });

    describe('arabic numeral input', () => {
      describe('rendering the animation component', () => {
        it('renders the animation component there is no focus', () => {
          const { container } = render(<App />);
          const input = container.querySelectorAll('input')[1];
          expect(input.parentElement.querySelector('.animation')).toBeTruthy();
          input.focus();
          expect(input.parentElement.querySelector('.animation')).toBeFalsy();
        });

        it('renders the animation component there is no arabic', () => {
          const { container } = render(<App />);
          const input = container.querySelectorAll('input')[1];
          expect(input.parentElement.querySelector('.animation')).toBeTruthy();
          fireEvent.change(input, { target: { value: '10' } });
          expect(input.parentElement.querySelector('.animation')).toBeFalsy();
        });
      });

      describe('onFocus functionality', () => {
        it('empty the roman value when there is no arabic value', () => {
          const { container } = render(<App />);
          const roman = container.querySelectorAll('input')[0];
          const arabic = container.querySelectorAll('input')[1];
          fireEvent.change(roman, { target: { value: 'X' } });
          expect(container.querySelectorAll('input')[1].value).toBe('10');

          fireEvent.blur(arabic);
          fireEvent.focus(arabic);
          expect(container.querySelectorAll('input')[0].value).toBe('X');
        });
      });

      describe('onChange functionality', () => {
        it('updates the arabic\'s value when it is valid and calc roman number', () => {
          const { container } = render(<App />);
          const input = container.querySelectorAll('input')[1];
          fireEvent.change(input, { target: { value: '10' } });
          expect(input.value).toBe('10');
          expect(container.querySelectorAll('input')[0].value).toBe('X');

          fireEvent.change(input, { target: { value: '' } });
          expect(input.value).toBe('');
          expect(container.querySelectorAll('input')[0].value).toBe('');
        });

        it('prevent updating the arabic number when not valid and set alert with proper message', () => {
          const { container, getByText } = render(<App />);
          const input = container.querySelectorAll('input')[1];
          fireEvent.change(input, { target: { value: '10000000' } });
          expect(input.value).toBe('');
          expect(getByText('Arabic Number can\'t be greater than 1,000,000')).toBeTruthy();
        });
      });
    });
  });
});
