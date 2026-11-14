import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeCountryCode,
  isValidCountryCode,
  normalizeIndianMobile,
  isValidIndianMobile,
  normalizeInternationalPhone,
  isValidInternationalPhone,
  validateSingleField,
  validateEnquiryStep1,
  validateEnquiry,
  filterItemsByCategory,
} from './enquiryValidation';

test('normalizeIndianMobile strips +91, 0, spaces, and hyphens', () => {
  assert.equal(normalizeIndianMobile('+91 98765-43210'), '9876543210');
  assert.equal(normalizeIndianMobile('09876543210'), '9876543210');
  assert.equal(normalizeIndianMobile('98765 43210'), '9876543210');
});

test('isValidIndianMobile accepts 10-digit numbers starting 6-9 and rejects invalid', () => {
  assert.equal(isValidIndianMobile('9876543210'), true);
  assert.equal(isValidIndianMobile('+91 6123456789'), true);
  assert.equal(isValidIndianMobile('5123456789'), false);
  assert.equal(isValidIndianMobile('98765'), false);
  assert.equal(isValidIndianMobile('abcdefghij'), false);
});

test('international country code and phone validation supports global formats', () => {
  assert.equal(normalizeCountryCode('44'), '+44');
  assert.equal(isValidCountryCode('+971'), true);
  assert.equal(isValidCountryCode('+0'), false);

  assert.equal(isValidInternationalPhone('415-555-0199', '+1'), true);
  assert.equal(isValidInternationalPhone('50 123 4567', '+971'), true);
  assert.equal(isValidInternationalPhone('07700 900077', '+44'), true);
  assert.equal(isValidInternationalPhone('87 123 4567', '+353'), true);
  assert.equal(isValidInternationalPhone('1234', '+1'), false);

  const usPhone = normalizeInternationalPhone('(415) 555-0199', '+1');
  assert.equal(usPhone.e164, '+14155550199');
});

test('validateSingleField validates individual inputs cleanly', () => {
  assert.ok(validateSingleField('fullName', 'A'));
  assert.equal(validateSingleField('fullName', 'Aarav Reddy'), undefined);
  assert.ok(validateSingleField('mobileNumber', '12345', '+91'));
  assert.equal(validateSingleField('mobileNumber', '9876543210', '+91'), undefined);
  assert.equal(validateSingleField('mobileNumber', '415 555 0199', '+1'), undefined);
});

test('validateEnquiryStep1 checks contact details including countryCode', () => {
  const bad = validateEnquiryStep1({ fullName: '', countryCode: '+91', mobileNumber: '98765', city: 'H' });
  assert.equal(bad.valid, false);
  assert.ok(bad.errors.fullName);
  assert.ok(bad.errors.mobileNumber);
  assert.ok(bad.errors.city);

  const ok = validateEnquiryStep1({
    fullName: 'Aarav Reddy',
    countryCode: '+91',
    mobileNumber: '+91 98765 43210',
    city: 'Hyderabad',
  });
  assert.equal(ok.valid, true);
  assert.equal(ok.normalizedCountryCode, '+91');
  assert.equal(ok.normalizedMobile, '+919876543210');

  const okIntl = validateEnquiryStep1({
    fullName: 'Priya Nair',
    countryCode: '+971',
    mobileNumber: '50 123 4567',
    city: 'Dubai',
  });
  assert.equal(okIntl.valid, true);
  assert.equal(okIntl.normalizedCountryCode, '+971');
  assert.equal(okIntl.normalizedMobile, '+971501234567');
});

test('validateEnquiry catches empty required fields and invalid phone', () => {
  const result = validateEnquiry({
    fullName: '',
    countryCode: '+91',
    mobileNumber: '12345',
    city: 'H',
    preferredContactTime: 'Morning (9 AM – 12 PM)',
    purposeOfPurchase: 'Weekend Home',
    preferredInteraction: 'Phone Call',
    consent: false,
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.mobileNumber);
  assert.ok(result.errors.city);
  assert.ok(result.errors.consent);
});

test('validateEnquiry passes with complete valid input', () => {
  const result = validateEnquiry({
    fullName: 'Aarav Reddy',
    countryCode: '+44',
    mobileNumber: '7700 900077',
    city: 'London',
    preferredContactTime: 'Evening (4 PM – 7 PM)',
    purposeOfPurchase: 'Investment',
    preferredInteraction: 'Google Meet',
    consent: true,
  });

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
  assert.equal(result.normalizedCountryCode, '+44');
  assert.equal(result.normalizedMobile, '+447700900077');
});

test('filterItemsByCategory returns all items or filtered subset', () => {
  const sample = [
    { id: 1, category: 'Homes' },
    { id: 2, category: 'Real Site Photos' },
    { id: 3, category: 'Homes' },
  ];
  assert.equal(filterItemsByCategory(sample, 'All').length, 3);
  assert.equal(filterItemsByCategory(sample, 'Homes').length, 2);
  assert.equal(filterItemsByCategory(sample, 'Real Site Photos').length, 1);
});
