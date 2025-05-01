import {describe, expect, test} from '@jest/globals';

// https://jestjs.io/docs/getting-started <- Already Installed and Babel is setup
// Example testing function.

test('two plus two is four', () => {
	expect(2 + 2).toBe(4);
  });

test('exception', () => {
	let e = null
	// The function that throws an exception needs to be invoked within
	// a wrapping function otherwise the toThrow assertion will fail.
	expect(() => {let _a = e[1];}).toThrow();
});