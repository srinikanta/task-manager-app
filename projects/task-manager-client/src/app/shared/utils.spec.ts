import { TestBed, async, inject } from '@angular/core/testing';
import { Utils } from './utils';

describe('Utils', () => {
  it('should get formatted date', () => {
    const dateObj = {
      year: 2020,
      month: 10,
      day: 10
    };
    expect(Utils.getDueDate(dateObj, '-')).toEqual('2020-10-10');
  });
});
