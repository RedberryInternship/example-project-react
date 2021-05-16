/* eslint-disable import/no-extraneous-dependencies */
import 'jest'

const mockRefreshAndCacheChargers = jest.fn();

const mockChargerHelpers = {
  refreshAndCacheChargers: mockRefreshAndCacheChargers,
}

export {
  mockRefreshAndCacheChargers,
};

jest.mock('helpers/chargers', () => mockChargerHelpers)
