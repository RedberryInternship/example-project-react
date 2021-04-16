import 'jest';

const useDispatch = jest.fn();
const useSelector = jest.fn();

export const mockReactRedux = {
  useSelector,
  useDispatch,
};

useDispatch.mockImplementation(() => () => { })
useSelector.mockImplementation(() => { })

jest.mock('react-redux', () => mockReactRedux);
