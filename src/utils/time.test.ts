import { Time } from 'config/types/time';
import { timeSince } from './time';

describe('timeSince', () => {
  const mockDate = new Date(2024, 0, 1, 12, 0, 0); 
  
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should return 2 years ago when difference is more than a year', () => {
    const pastDate = new Date(2022, 0, 1).getTime(); 
    expect(timeSince(pastDate)).toEqual([2, Time.YEAR]);
  });

  test('should return months when difference is more than a month but less than a year', () => {
    const pastDate = new Date(2023, 10, 1).getTime(); 
    expect(timeSince(pastDate)).toEqual([2, Time.MONTH]);
  });

  test('should return days when difference is more than a day but less than a month', () => {
    const pastDate = new Date(2023, 11, 29).getTime(); 
    expect(timeSince(pastDate)).toEqual([3, Time.DAY]);
  });

  test('should return hours when difference is more than an hour but less than a day', () => {
    const pastDate = new Date(2024, 0, 1, 8, 0, 0).getTime();
    expect(timeSince(pastDate)).toEqual([4, Time.HOUR]);
  });

  test('should return minutes when difference is more than a minute but less than an hour', () => {
    const pastDate = new Date(2024, 0, 1, 11, 30, 0).getTime(); 
    expect(timeSince(pastDate)).toEqual([30, Time.MIN]);
  });

  test('should return seconds when difference is less than a minute', () => {
    const pastDate = new Date(2024, 0, 1, 11, 59, 30).getTime();
    expect(timeSince(pastDate)).toEqual([30, Time.SEC]);
  });

  test('should handle current time', () => {
    const currentTime = mockDate.getTime();
    expect(timeSince(currentTime)).toEqual([0, Time.SEC]);
  });

});