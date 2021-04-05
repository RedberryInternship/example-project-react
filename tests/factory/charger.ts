import { Charger } from '../../src/types'

const charger: Charger = {
  id: 1,
  active: 1,
  charger_id: 2,
  charger_types: [],
  code: '1234',
  connector_types: [],
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
