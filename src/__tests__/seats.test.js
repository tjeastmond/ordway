const data = require('../data');
const bestSeats = require('../bestSeats');
const { expect } = require('@jest/globals');

describe('Test best seats algorithm', () => {
  describe('First venue', () => {
    const venueData = data[0];

    it('should return a1 as the best seat', () => {
      const res = bestSeats(venueData);
      expect(res).toHaveLength(1);
      expect(res).toEqual(['a1']);
      expect(res[0]).toEqual('a1');
    });

    it('should not find two seats near each other', () => {
      const res = bestSeats(venueData, 2);
      expect(res).toHaveLength(0);
      expect(res).toEqual([]);
      expect(res[0]).toBeUndefined();
    });
  });

  describe('Second venue', () => {
    const venueData = data[1];

    it('should return a3 as the best seat', () => {
      const res = bestSeats(venueData);
      expect(res).toHaveLength(1);
      expect(res).toEqual(['a3']);
      expect(res[0]).toEqual('a3');
    });

    it('should return b5 and b6 as best pair of seats', () => {
      const res = bestSeats(venueData, 2);
      expect(res).toHaveLength(2);
      expect(res).toEqual(['b5', 'b6']);
      expect(res[0]).toEqual('b5');
      expect(res[1]).toEqual('b6');
    });

    it('should return b5, b6 and b7 as the best seats', () => {
      const res = bestSeats(venueData, 3);
      expect(res).toHaveLength(3);
      expect(res).toEqual(['b5', 'b6', 'b7']);
      expect(res[0]).toEqual('b5');
      expect(res[1]).toEqual('b6');
      expect(res[2]).toEqual('b7');
    });
  });

  describe('Third venue', () => {
    const venueData = data[2];

    it('should return a6 for one seat', () => {
      const res = bestSeats(venueData);
      expect(res).toHaveLength(1);
      expect(res).toEqual(['a6']);
      expect(res[0]).toEqual('a6');
    });

    it('should return a3 through a8 for six seats', () => {
      const res = bestSeats(venueData, 6);
      expect(res).toHaveLength(6);
      expect(res).toEqual(['a3', 'a4', 'a5', 'a6', 'a7', 'a8']);
    });
  });
});
