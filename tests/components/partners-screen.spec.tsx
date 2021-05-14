/* eslint-disable max-len */
import React from 'react'
import { Partners } from 'screens'
import { render, waitFor } from '@testing-library/react-native'
import PartnerItem from 'screens/drawer/partners/components/PartnerItem'

const mockPartners = {
  partners: [
    {
      id: 1,
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png',
    },
    {
      id: 2,
      image: 'https://w7.pngwing.com/pngs/114/579/png-transparent-pink-cross-stroke-ink-brush-pen-red-ink-brush-ink-leave-the-material-text.png',
    },
    {
      id: 3,
      image: 'https://freepngimg.com/thumb/wings/34952-3-wings-image.png',
    },
  ],
}

jest.mock('services', () => ({
  __esModule: true,
  default: {
    getPartners: () => Promise.resolve(mockPartners),
  },
}));

test('Renders partners screen without errors', async () => {
  await waitFor(() => {
    render(<Partners />);
  });
});

test('Partners listing has right number of partner items', async () => {
  const tree = render(<Partners />);
  await waitFor(async () => {
    const partnersScrollView = await tree.findByTestId('partners-scrollview');

    const partnerItemsLength = partnersScrollView.findAllByType(PartnerItem).length;
    expect(partnerItemsLength).toBe(3);
  });
});

test('Partners items are right', async () => {
  const tree = render(<Partners />);
  const partnersScrollView = await tree.findByTestId('partners-scrollview');

  const renderedPartnerItems = partnersScrollView.findAllByType(PartnerItem);
  const firstItem = renderedPartnerItems[0];
  const secondItem = renderedPartnerItems[1];
  const thirdItem = renderedPartnerItems[2];

  await waitFor(() => {
    expect(firstItem.props.image).toBe(mockPartners.partners[0].image);
    expect(secondItem.props.image).toBe(mockPartners.partners[1].image);
    expect(thirdItem.props.image).toBe(mockPartners.partners[2].image);
  })
});
