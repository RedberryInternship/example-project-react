import { mockRefreshAndCacheChargers } from '../mocks/charger-helpers'
import { getFilteredCharger } from 'helpers/chargerFilter'
import mockCharger from '../factory/charger'
import { ChargerFilters } from 'types/enums'

const getFilterAttributes = () => [
  false,
  false,
  false,
  false,
  false,
  false,
];

test('Chargers filter returns all chargers without passing filter parameters', async () => {
  mockRefreshAndCacheChargers
    .mockImplementation(() => Promise.resolve({
      data: [
        mockCharger,
        mockCharger,
        mockCharger,
        mockCharger,
      ],
    }))

  const filterAttributes = getFilterAttributes();

  const filterResults = await getFilteredCharger(filterAttributes);
  expect(filterResults).toHaveLength(4);
});

test('charger filter returns only those matched with text', async () => {
  const testChargerLocation = 'ღაზას სექტორი';

  mockRefreshAndCacheChargers
    .mockImplementation(() => Promise.resolve({
      data: [
        mockCharger,
        mockCharger,
        mockCharger,
        mockCharger,
        {
          ...mockCharger,
          location: {
            ka: testChargerLocation,
          },
        },
      ],
    }));

  const filterAttributes = getFilterAttributes();
  const filterResults = await getFilteredCharger(filterAttributes, testChargerLocation);

  expect(filterResults).toHaveLength(1);
  expect(filterResults[0].location.ka).toBe(testChargerLocation);
});

test('Filter only free chargers', async () => {
  mockRefreshAndCacheChargers
    .mockImplementation(() => Promise.resolve({
      data: [
        mockCharger,
        mockCharger,
        mockCharger,
        mockCharger,
        {
          ...mockCharger,
          status: 'CHARGING',
        },
      ],
    }));

  const filterAttributes = getFilterAttributes();
  filterAttributes[ChargerFilters.FREE] = true;

  const filterResults = await getFilteredCharger(filterAttributes);

  expect(filterResults).toHaveLength(4);
});

test('Filter only LVL 2 chargers', async () => {
  const fastCharger = {
    ...mockCharger,
    connector_types: [] as any,
  };
  const connectorType = { name: 'CHAdeMO' };
  fastCharger.connector_types.push(connectorType)

  mockRefreshAndCacheChargers
    .mockImplementation(() => Promise.resolve({
      data: [
        mockCharger,
        mockCharger,
        fastCharger,
        fastCharger,
        fastCharger,
      ],
    }));

  const filterAttributes = getFilterAttributes();
  filterAttributes[ChargerFilters.LVL2] = true;

  const filterResults = await getFilteredCharger(filterAttributes);

  expect(filterResults).toHaveLength(2);
});

test('Filter only Fast chargers', async () => {
  const fastCharger = {
    ...mockCharger,
    connector_types: [] as any,
  };
  const connectorType = { name: 'CHAdeMO' };
  fastCharger.connector_types.push(connectorType)

  mockRefreshAndCacheChargers
    .mockImplementation(() => Promise.resolve({
      data: [
        mockCharger,
        mockCharger,
        fastCharger,
        fastCharger,
        fastCharger,
      ],
    }));

  const filterAttributes = getFilterAttributes();
  filterAttributes[ChargerFilters.FAST] = true;

  const filterResults = await getFilteredCharger(filterAttributes);

  expect(filterResults).toHaveLength(3);
});

test('Filter only private chargers', async () => {
  mockRefreshAndCacheChargers
    .mockImplementation(() => Promise.resolve({
      data: [
        mockCharger,
        mockCharger,
        mockCharger,
        mockCharger,
        mockCharger,
        {
          ...mockCharger,
          public: 0,
        },
      ],
    }));

  const filterAttributes = getFilterAttributes();
  filterAttributes[ChargerFilters.PRIVATE] = true;

  const filterResults = await getFilteredCharger(filterAttributes);

  expect(filterResults).toHaveLength(1);
});

test('Filter only public chargers', async () => {
  mockRefreshAndCacheChargers
    .mockImplementation(() => Promise.resolve({
      data: [
        mockCharger,
        mockCharger,
        mockCharger,
        mockCharger,
        mockCharger,
        {
          ...mockCharger,
          public: 0,
        },
      ],
    }));

  const filterAttributes = getFilterAttributes();
  filterAttributes[ChargerFilters.PUBLIC] = true;

  const filterResults = await getFilteredCharger(filterAttributes);

  expect(filterResults).toHaveLength(5);
});

test('Filter only chargers that are currently charging', async () => {
  mockRefreshAndCacheChargers
    .mockImplementation(() => Promise.resolve({
      data: [
        mockCharger,
        mockCharger,
        mockCharger,
        mockCharger,
        mockCharger,
        {
          ...mockCharger,
          status: 'CHARGING',
        },
        {
          ...mockCharger,
          status: 'CHARGING',
        },
        {
          ...mockCharger,
          status: 'CHARGING',
        },
      ],
    }));

  const filterAttributes = getFilterAttributes();
  filterAttributes[ChargerFilters.CHARGING] = true;
  const filterResults = await getFilteredCharger(filterAttributes);

  expect(filterResults).toHaveLength(3);
});
