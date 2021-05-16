import { Charger } from '../../src/types'

const charger: Charger = {
  id: 1,
  active: 1,
  charger_id: 2,
  charger_types: [],
  code: '1234',
  connector_types: [
    {
      id: 1,
      old_id: null,
      name: 'Type 2',
      created_at: null,
      updated_at: null,
      charging_prices: [
        {
          id: 1040,
          min_kwt: '0',
          max_kwt: '5',
          start_time: '00:00',
          end_time: '24:00',
          price: '0.03',
          charger_id: 7,
        },
      ],
      pivot: {
        charger_id: 20,
        connector_type_id: 1,
        id: 20,
        min_price: null,
        max_price: null,
        status: 'active',
      },
    },
  ],
  description: '',
  hidden: 0,
  iban: '12904812',
  image: 'aasd.jpg',
  is_favorite: true,
  is_free: true,
  is_paid: true,
  lat: '10',
  lng: '10',
  location: {
    en: 'Somewhere',
    ka: 'სადმე',
    ru: 'გძეტა',
  },
  name: {
    en: 'charger',
    ka: 'დამტენი',
    ru: 'damteni',
  },
  public: 1,
  status: 'ACTIVE',
  old_id: 1,
  user_id: 1,
  business_services: [
    {
      id: 1,
      title: { en: 'Coffee', ka: 'ყავა', ru: 'Coffee' },
      description: {
        en: 'Description',
        ka: 'აღწერა',
        ru: 'agwera',
      },
      image_path: 'path.png',
    }],
  penalty_enabled: true,
  whitelist: [],
  last_update: '',
  updated_at: '',
  tags: [],
  created_at: '',
};

export default charger;
