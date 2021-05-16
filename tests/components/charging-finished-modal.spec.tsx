import React from 'react';
import { render, waitFor } from '@testing-library/react-native'
import ChargingModal from 'components/ChargingModal'

const usedUpData = {
  bottomDescription: 'popup.chargingFinishedPleaseUnplug',
  penalty_enabled: 1,
  charging_status: 'USED_UP',
  consumedMoney: '3',
  description: 'popup.automobileChargingFinished',
  refundMoney: null,
  onFinish: undefined,
  onFine: undefined,
  title: 'popup.thankYou',
  price: 3,
  time: 1621084420000,
}

const usedUpSubType = 0;

const onFineData = {
  bottomDescription: 'popup.yourChargingOnFineStarted',
  penalty_enabled: undefined,
  charging_status: 'ON_FINE',
  consumedMoney: '3',
  description: 'popup.automobileChargingFinished',
  refundMoney: null,
  onFinish: undefined,
  onFine: true,
  title: 'popup.thankYou',
  price: 3,
  time: 1621084420000,
}

test('Charging modal renders - ok', () => {
  render(<ChargingModal data={usedUpData as any} subType={usedUpSubType} onPress={() => { }} />)
});

test('Lvl 2 used up has right description', async () => {
  await waitFor(async () => {
    const { getByTestId } = render(
      <ChargingModal
        data={usedUpData as any}
        subType={usedUpSubType}
        onPress={() => { }}
      />,
    );

    const title = await getByTestId('lvl2BeforeFineTitle');
    expect(title.children[0]).toBe('დამუხტვის პროცესი დასრულდა, გთხოვთ გამოაერთეთ კაბელი...');
  });
});

test('Lvl 2 used up tells us that charging has completed...', () => {
  const { getByTestId } = render(<ChargingModal
    data={usedUpData as any}
    subType={usedUpSubType}
    onPress={() => { }}
  />)

  const title = getByTestId('chargingModalDescription');

  expect(title.children[0]).toBe('ავტომობილის დამუხტვა დასრულებულია');
});

test('Lvl 2 used up has right consumed money amount', () => {
  const { getByTestId } = render(<ChargingModal
    data={usedUpData as any}
    subType={usedUpSubType}
    onPress={() => { }}
  />)

  const consumedMoney = getByTestId('beforeFineConsumedAmountTestID').children[0]

  expect(consumedMoney).toBe(usedUpData.consumedMoney);
});

test('Lvl 2 on fine has right consumed money amount', () => {
  const { getByTestId } = render(<ChargingModal
    data={onFineData as any}
    subType={usedUpSubType}
    onPress={() => { }}
  />)

  const consumedMoney = getByTestId('beforeFineConsumedAmountTestID').children[0]

  expect(consumedMoney).toBe(onFineData.consumedMoney);
});
