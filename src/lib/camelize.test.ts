/* eslint-disable camelcase */
import { describe, expect, it } from 'vitest';
import { Camelize, camelize } from './camelize.js';

describe('camelize', () => {
  it('should camelize string', () => {
    expect(camelize('camel_case_me')).toEqual('camelCaseMe');
  });

  it('should camelize array', () => {
    expect(camelize(['camel_case_me'])).toEqual(['camelCaseMe']);
  });

  it('should deeply camelize object', () => {
    const date = new Date('2020-01-01');
    const regex = /something/;

    const input = {
      some_arr: [{ some_stuff: true }],
      an_object: {
        another_arr: [{ more_stuff: true }]
      },
      date: date,
      regex: regex
    };

    const expected: Camelize<typeof input> = {
      someArr: [{ someStuff: true }],
      anObject: {
        anotherArr: [{ moreStuff: true }]
      },
      date: date,
      regex: regex
    };

    const actual = camelize(input);

    expect(actual).toEqual(expected);
  });

  it('should shallowly camelize object keys', () => {
    const input = {
      some_arr: [{ some_stuff: true }],
      an_object: {
        another_arr: [{ more_stuff: true }]
      }
    };

    const expected: Camelize<typeof input, true> = {
      someArr: [{ some_stuff: true }],
      anObject: {
        another_arr: [{ more_stuff: true }]
      }
    };

    const actual = camelize(input, true);

    expect(actual).toEqual(expected);
  });
});
