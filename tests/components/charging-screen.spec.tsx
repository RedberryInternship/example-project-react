import React from 'react';
import { render, waitFor } from '@testing-library/react-native'
import { Charging } from 'screens'
import { mockReactRedux } from '../mocks/react-redux'

const mockInitiatedState = {
  order_id: 20235,
  already_paid: 0,
  consumed_money: 0,
  refund_money: 0,
  charger_type: 'LVL2',
  start_charging_time: 0,
  charging_type: 'BY_AMOUNT',
  charging_status: 'INITIATED',
  charger_connector_type_id: 22,
  charger_id: 22,
  charger_code: '0028',
  is_paid: 1,
  penalty_enabled: 1,
  connector_type_id: 1,
  user_card_id: '1886',
  target_price: '7',
  consumed_kilowatts: 0,
};

const mockChargingState = {
  is_charging_free: false,
  user_card_id: '1886',
  charger_code: '0028',
  charger_type: 'LVL2',
  charger_connector_type_id: 22,
  consumed_kilowatts: '37.04',
  charger_id: 22,
  charging_type: 'BY_AMOUNT',
  target_price: '7',
  start_charging_time: 1620984296932,
  charging_status: 'CHARGING',
  consumed_money: 2.43,
  refund_money: 4.57,
  already_paid: 7,
  is_paid: 1,
  order_id: 20235,
  penalty_enabled: 1,
  connector_type_id: 1,
}

const mockFinishedChargingState = {
  is_charging_free: false,
  user_card_id: '1886',
  charger_code: '0028',
  penalty_start_time: 1620984560000,
  charger_type: 'LVL2',
  charger_connector_type_id: 22,
  consumed_kilowatts: '49.38',
  charger_id: 22,
  charging_type: 'BY_AMOUNT',
  target_price: '7',
  start_charging_time: 1620984296932,
  charging_status: 'FINISHED',
  consumed_money: 4.7,
  refund_money: 2.3,
  already_paid: 7,
  is_paid: 1,
  order_id: 20235,
  penalty_enabled: 1,
  connector_type_id: 1,
}

mockReactRedux.useSelector.mockImplementation(() => (
  {
    chargingState: [mockInitiatedState],
  }
));

test('Charging is - ok', async () => {
  await waitFor(() => {
    render(<Charging />)
  })
});

test('Charging process has right title', async () => {
  const tree = render(<Charging />);

  await waitFor(async () => {
    const headerTitle = await tree.findByTestId('headerMiddleTitle');
    expect(headerTitle.children[0]).toBe('დამუხტვა');
  });
});
