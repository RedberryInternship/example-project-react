import 'jest';

const mockDefaults = jest.fn();

jest.mock('utils/defaults', () => mockDefaults);

export default mockDefaults;
