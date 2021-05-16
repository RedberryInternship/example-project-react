import validation from 'utils/InputValidation'

test('Validation for georgian phone is right', () => {
  const testPhoneNumber = '+995591935000';
  const result = validation.phoneNumberValidation.ifGeorgian(testPhoneNumber);

  expect(result).toBe(true);
});

test('Validation for georgian phone is not right', () => {
  const testPhoneNumber = '+9950123123591935080';
  const result = validation.phoneNumberValidation.ifGeorgian(testPhoneNumber);

  expect(result).not.toBe(true);
});

test('Invalid length for georgian phone validation', () => {
  const testPhoneNumber = '+9950123123591935080';
  const result = validation.phoneNumberValidation.ifGeorgian(testPhoneNumber);

  expect(result).toBe('dropDownAlert.auth.phoneNumberLength');
});

test('Phone length validation for foreign number is ok', () => {
  const testPhoneNumber = '+9950123123591935080';
  const result = validation.phoneNumberValidation.ifForeign(testPhoneNumber);

  expect(result).toBe(true);
});

test('Validation gives phon length error message', () => {
  const testPhoneNumber = '+8121';
  const result = validation.phoneNumberValidation.ifForeign(testPhoneNumber);

  expect(result).toBe('dropDownAlert.registration.fillPhoneNumber');
});

test('One time password length validation is ok', () => {
  const otp = '1234';
  const result = validation.codeVerification.ifCorrectLength(otp);

  expect(result).toBe(true);
});

test('One time password length validation gives error message', () => {
  const otp = '12341231';
  const result = validation.codeVerification.ifCorrectLength(otp);

  expect(result).toBe('dropDownAlert.forgotPassword.smsCodeLength');
});

test('One time password gives fill code error msg', () => {
  const otp = '';
  const result = validation.codeVerification.ifEmpty(otp);

  expect(result).toBe('dropDownAlert.forgotPassword.fillCode');
});

test('Email validation is ok', () => {
  const email = 'durdaxa@mail.ru';
  const result = validation.emailValidation.ifNotEmpty(email);

  expect(result).toBe(true);
});

test('Email validation gives error message', () => {
  const email = 'durdaxamail.ru';
  const result = validation.emailValidation.ifNotEmpty(email);

  expect(result).not.toBe(true);
  expect(result).toBe('dropDownAlert.registration.incorrectEmail');
});

test('Terms and Conditions checkbox validation is ok', () => {
  const checkboxTestValue = true;
  const result = validation.checkboxValidation.isChecked(checkboxTestValue);
  expect(result).toBe(true);
});

test('Terms and Conditions checkbox validation is not ok, and gives error message', () => {
  const checkboxTestValue = false;
  const result = validation.checkboxValidation.isChecked(checkboxTestValue);
  expect(result).not.toBe(true);
  expect(result).toBe('dropDownAlert.registration.pleaseSelectTermsAndConditions');
});

test('Password confirmation is ok', () => {
  const testPassword = 'hackramatan'
  const testConfirmPassword = 'hackramatan'

  const emptinessResult = validation
    .passwordConfirmValidation(testPassword)
    .ifEmpty(testConfirmPassword);

  const equalityResult = validation
    .passwordConfirmValidation(testPassword)
    .ifEqual(testConfirmPassword);

  const lengthResult = validation
    .passwordConfirmValidation(testPassword)
    .ifMinLength(testConfirmPassword);

  expect(emptinessResult).toBe(true);
  expect(equalityResult).toBe(true);
  expect(lengthResult).toBe(true);
});

test('Password confirmation emptiness check gives error message', () => {
  const testPassword = 'hackramatan'
  const testConfirmPassword = ''

  const emptinessResult = validation
    .passwordConfirmValidation(testPassword)
    .ifEmpty(testConfirmPassword);

  expect(emptinessResult).not.toBe(true);
  expect(emptinessResult).toBe('dropDownAlert.forgotPassword.passwordsNotFilled');
});

test('Password confirmation equality check gives error message', () => {
  const testPassword = 'hackramatan'
  const testConfirmPassword = 'haskaramt'

  const equalityResult = validation
    .passwordConfirmValidation(testPassword)
    .ifEqual(testConfirmPassword);

  expect(equalityResult).not.toBe(true);
  expect(equalityResult).toBe('dropDownAlert.registration.passwordNotEqual');
});

test('Password confirmation length check gives error message', () => {
  const testPassword = 'hackramatan'
  const testConfirmPassword = 'small'

  const lengthCheckResult = validation
    .passwordConfirmValidation(testPassword)
    .ifMinLength(testConfirmPassword);

  expect(lengthCheckResult).not.toBe(true);
  expect(lengthCheckResult).toBe('dropDownAlert.forgotPassword.newPasswordIncorrectLength');
});
