import 'jest';

export const mockReactRedux = {
  useSelector: () => ({}),
  useDispatch: jest.fn(),
};

jest.mock('react-redux', () => mockReactRedux);
