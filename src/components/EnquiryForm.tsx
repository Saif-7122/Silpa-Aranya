import { useState, type FormEvent } from 'react';
import { Download, CheckCircle2, Check, PhoneCall, Mail, Lock, ArrowRight } from 'lucide-react';
import {
  COUNTRY_DIAL_CODES,
  PREFERRED_CONTACT_TIMES,
  PREFERRED_INTERACTIONS,
  PURCHASE_PURPOSES,
  normalizeCountryCode,
  validateEnquiry,
  validateEnquiryStep1,
  validateSingleField,
  type EnquiryValidationErrors,
  type PreferredContactTime,
  type PreferredInteraction,
  type PurchasePurpose,
} from '../utils/enquiryValidation';
import { BRAND_INFO } from '../data/aranyaData';

interface EnquiryFormProps {
  sourceSection?: string;
  idPrefix?: string;
  darkSurface?: boolean;
  compact?: boolean;
}

interface SubmissionSuccessState {
  referenceId: string;
  deliveryMode: 'crm_webhook' | 'local_staging';
  message: string;
}

export function EnquiryForm({
  sourceSection = 'contact-section',
  idPrefix = 'enquiry',
  darkSurface = false,
  compact = false,
}: EnquiryFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('');
  const [selectedDialOption, setSelectedDialOption] = useState<string>('+91');
  const [customDialCode, setCustomDialCode] = useState<string>('+');
  const [mobileNumber, setMobileNumber] = useState('');
  const [city, setCity] = useState('');
  const [preferredContactTime, setPreferredContactTime] = useState<PreferredContactTime>(
    PREFERRED_CONTACT_TIMES[0]
  );
  const [purposeOfPurchase, setPurposeOfPurchase] = useState<PurchasePurpose>(
    PURCHASE_PURPOSES[0]
  );
  const [preferredInteraction, setPreferredInteraction] = useState<PreferredInteraction>(
    PREFERRED_INTERACTIONS[0]
  );
  const [consent, setConsent] = useState(false);

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<EnquiryValidationErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<SubmissionSuccessState | null>(null);

  const isCustomDial = selectedDialOption === 'OTHER';
  const effectiveCountryCode = isCustomDial
    ? normalizeCountryCode(customDialCode)
    : selectedDialOption;

  const selectedDialMeta = COUNTRY_DIAL_CODES.find((c) => c.code === selectedDialOption);
  const phonePlaceholder = selectedDialMeta?.placeholder ?? 'e.g. Phone number';

  const handleFieldBlur = (
    field: 'fullName' | 'countryCode' | 'mobileNumber' | 'city',
    value: string,
    overrideCode?: string
  ) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const code = overrideCode ?? effectiveCountryCode;
    const err = validateSingleField(field, value, code);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[field] = err;
      else delete next[field];
      return next;
    });
  };

  const handleFieldChange = (
    field: 'fullName' | 'countryCode' | 'mobileNumber' | 'city',
    value: string,
    setter: (v: string) => void,
    overrideCode?: string
  ) => {
    setter(value);
    const code = overrideCode ?? effectiveCountryCode;
    if (errors[field] || touched[field]) {
      const err = validateSingleField(field, value, code);
      setErrors((prev) => {
        const next = { ...prev };
        if (err && errors[field]) next[field] = err;
        else if (!err) delete next[field];
        return next;
      });
    }
  };

  const handleDialOptionChange = (nextOption: string) => {
    setSelectedDialOption(nextOption);
    const nextCode = nextOption === 'OTHER' ? normalizeCountryCode(customDialCode) : nextOption;
    if (errors.countryCode || touched.countryCode) {
      const countryErr =
        nextOption === 'OTHER'
          ? validateSingleField('countryCode', customDialCode)
          : undefined;
      setErrors((prev) => {
        const next = { ...prev };
        if (countryErr) next.countryCode = countryErr;
        else delete next.countryCode;
        return next;
      });
    }
    if (mobileNumber.trim() && (errors.mobileNumber || touched.mobileNumber)) {
      const phoneErr = validateSingleField('mobileNumber', mobileNumber, nextCode);
      setErrors((prev) => {
        const next = { ...prev };
        if (phoneErr) next.mobileNumber = phoneErr;
        else delete next.mobileNumber;
        return next;
      });
    }
  };

  const handleStep1Continue = () => {
    setTouched({ fullName: true, countryCode: true, mobileNumber: true, city: true });
    const check = validateEnquiryStep1({
      fullName,
      countryCode: effectiveCountryCode,
      mobileNumber,
      city,
    });
    if (!check.valid) {
      setErrors((prev) => ({ ...prev, ...check.errors }));
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (step === 1) {
      handleStep1Continue();
      return;
    }

    const check = validateEnquiry({
      fullName,
      countryCode: effectiveCountryCode,
      mobileNumber,
      city,
      preferredContactTime,
      purposeOfPurchase,
      preferredInteraction,
      consent,
    });

    if (!check.valid) {
      setErrors(check.errors);
      if (
        check.errors.fullName ||
        check.errors.countryCode ||
        check.errors.mobileNumber ||
        check.errors.city
      ) {
        setStep(1);
      }
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          countryCode: effectiveCountryCode,
          mobileNumber,
          city: city.trim(),
          preferredContactTime,
          purposeOfPurchase,
          preferredInteraction,
          consent,
          sourceSection,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setServerError(data.message ?? 'Could not save your request right now. Please try again.');
        return;
      }

      const win = window as Window & { fbq?: (...args: unknown[]) => void };
      win.fbq?.('track', 'Lead');

      setSubmitted({
        referenceId: data.referenceId,
        deliveryMode: data.deliveryMode,
        message: data.message,
      });
    } catch {
      setServerError(
        'Network issue while sending your request. Please call 92475 75834 or email info@skandhanshi.com.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className={`p-6 sm:p-8 border ${
          darkSurface
            ? 'bg-[#1F3527] border-[#F5F3EC]/20 text-[#F5F3EC]'
            : 'bg-[#F5F3EC] border-[#1F3527]/15 text-[#141815]'
        }`}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-6 w-6 text-[#B5945B] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B5945B]">
              Callback Request Confirmed · Ref {submitted.referenceId}
            </p>
            <h3 className="mt-1.5 font-display text-3xl font-medium">
              Thank you, {fullName.trim()}.
            </h3>
            <p
              className={`mt-2 text-sm leading-relaxed ${
                darkSurface ? 'text-[#E6E0D3]/85' : 'text-[#141815]/80'
              }`}
            >
              {submitted.message}
            </p>
          </div>
        </div>

        {/* Next-Step Timeline */}
        <div className="mt-6 pt-5 border-t border-current/15 space-y-3 text-xs sm:text-sm">
          <p className="font-semibold uppercase tracking-[0.12em] text-xs text-[#B5945B]">
            What Happens Next
          </p>
          <div className="grid grid-cols-1 gap-2.5">
            <div className="flex items-start gap-2.5">
              <span className="font-semibold tabular-nums text-[#B5945B]">01.</span>
              <span>Your request ({submitted.referenceId}) is saved with our Hyderabad team.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-semibold tabular-nums text-[#B5945B]">02.</span>
              <span>
                We will reach out via <strong>{preferredInteraction}</strong> during{' '}
                <strong>{preferredContactTime}</strong>.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-semibold tabular-nums text-[#B5945B]">03.</span>
              <span>Download the brochure below or ask us to book a weekend family site visit.</span>
            </div>
          </div>
        </div>

        <div className="mt-7 pt-6 border-t border-current/15 flex flex-wrap gap-3">
          <a
            href={BRAND_INFO.brochurePdfUrl}
            download="Silpa-Aranya-Official-Brochure.pdf"
            className="inline-flex items-center justify-center gap-2 bg-[#B5945B] text-[#141815] px-5 min-h-[48px] text-xs font-semibold tracking-[0.12em] uppercase whitespace-nowrap hover:bg-[#c9a86d] transition-colors"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download Brochure (PDF)
          </a>

          <button
            type="button"
            onClick={() => {
              setSubmitted(null);
              setStep(1);
              setFullName('');
              setSelectedDialOption('+91');
              setCustomDialCode('+');
              setMobileNumber('');
              setCity('');
              setConsent(false);
              setTouched({});
              setErrors({});
            }}
            className={`px-5 min-h-[48px] text-xs font-semibold tracking-[0.12em] uppercase border whitespace-nowrap cursor-pointer ${
              darkSurface
                ? 'border-[#F5F3EC]/30 text-[#F5F3EC] hover:bg-[#F5F3EC]/10'
                : 'border-[#1F3527]/30 text-[#1F3527] hover:bg-[#1F3527]/5'
            }`}
          >
            New Enquiry
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs opacity-85">
          <a
            href={BRAND_INFO.phoneHref}
            className="inline-flex items-center gap-1.5 hover:underline tabular-nums"
          >
            <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" />
            Call: {BRAND_INFO.phone}
          </a>
          <a
            href={`mailto:${BRAND_INFO.email}`}
            className="inline-flex items-center gap-1.5 hover:underline"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            {BRAND_INFO.email}
          </a>
        </div>
      </div>
    );
  }

  const labelClass = darkSurface
    ? `block text-xs font-semibold uppercase tracking-[0.1em] text-[#E6E0D3]/90 ${compact ? 'mb-1' : 'mb-1.5'}`
    : `block text-xs font-semibold uppercase tracking-[0.1em] text-[#141815]/85 ${compact ? 'mb-1' : 'mb-1.5'}`;

  const errorTextClass = darkSurface
    ? 'mt-1 text-xs text-[#E07A5F] font-medium'
    : 'mt-1 text-xs text-[#B93822] font-medium';

  const heightPadClass = compact ? 'min-h-[44px] py-2.5' : 'min-h-[48px] py-3';

  const inputBaseClass = darkSurface
    ? `w-full ${heightPadClass} bg-[#141815] border px-3.5 pr-10 text-base text-[#F5F3EC] placeholder:text-[#E6E0D3]/40 focus:outline-none`
    : `w-full ${heightPadClass} bg-white border px-3.5 pr-10 text-base text-[#141815] placeholder:text-[#141815]/40 focus:outline-none`;

  const selectDialBaseClass = darkSurface
    ? `${heightPadClass} bg-[#141815] border px-2.5 text-sm font-medium text-[#F5F3EC] focus:outline-none tabular-nums`
    : `${heightPadClass} bg-white border px-2.5 text-sm font-medium text-[#141815] focus:outline-none tabular-nums`;

  const fieldBorder = (
    field: keyof EnquiryValidationErrors,
    value: string,
    overrideCode?: string
  ) => {
    if (errors[field]) return darkSurface ? 'border-[#E07A5F]' : 'border-[#B93822]';
    if (
      touched[field] &&
      !validateSingleField(
        field as 'fullName' | 'countryCode' | 'mobileNumber' | 'city',
        value,
        overrideCode ?? effectiveCountryCode
      )
    ) {
      return darkSurface ? 'border-[#6FA87C]' : 'border-[#1F3527]';
    }
    return darkSurface
      ? 'border-[#F5F3EC]/25 focus:border-[#B5945B]'
      : 'border-[#1F3527]/25 focus:border-[#1F3527]';
  };

  const isFieldValid = (
    field: 'fullName' | 'mobileNumber' | 'city',
    value: string
  ) =>
    touched[field] &&
    !errors[field] &&
    !validateSingleField(field, value, effectiveCountryCode);

  const phoneOrCountryError = errors.countryCode || errors.mobileNumber;

  return (
    <form onSubmit={handleSubmit} noValidate className={compact ? 'space-y-3' : 'space-y-4'}>
      {/* 2-Step Progress Indicator */}
      <div className="pb-3 border-b border-current/12">
        <div className="flex items-center justify-between gap-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.11em]">
          <span className={darkSurface ? 'text-[#B5945B]' : 'text-[#1F3527]'}>
            Step {step} of 2 · {step === 1 ? 'Contact Details' : 'Call Time & Plan'}
          </span>
          <span className={`whitespace-nowrap shrink-0 ${darkSurface ? 'text-[#E6E0D3]/65' : 'text-[#4D6150]'}`}>
            {step === 1 ? '20 sec' : 'Almost done'}
          </span>
        </div>
        <div className="mt-2 h-1 w-full bg-current/15 overflow-hidden">
          <div
            className="h-full bg-[#B5945B] transition-all duration-300"
            style={{ width: step === 1 ? '50%' : '100%' }}
          />
        </div>
      </div>

      {serverError && (
        <div
          role="alert"
          className="p-3.5 text-xs bg-red-950/80 border border-red-400/50 text-red-100"
        >
          {serverError}
        </div>
      )}

      {step === 1 ? (
        <div className={compact ? 'space-y-3' : 'space-y-4'}>
          {/* Full Name */}
          <div>
            <label htmlFor={`${idPrefix}-fullName`} className={labelClass}>
              Full Name *
            </label>
            <div className="relative">
              <input
                id={`${idPrefix}-fullName`}
                name="fullName"
                type="text"
                autoComplete="name"
                autoCapitalize="words"
                required
                value={fullName}
                onChange={(e) => handleFieldChange('fullName', e.target.value, setFullName)}
                onBlur={() => handleFieldBlur('fullName', fullName)}
                placeholder="e.g. Karthik Sharma"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? `${idPrefix}-fullName-err` : undefined}
                className={`${inputBaseClass} ${fieldBorder('fullName', fullName)}`}
              />
              {isFieldValid('fullName', fullName) && (
                <Check
                  className="h-4 w-4 text-[#6FA87C] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
              )}
            </div>
            {errors.fullName && (
              <p id={`${idPrefix}-fullName-err`} className={errorTextClass}>
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Country Code + International Phone Number */}
          <div>
            <label htmlFor={`${idPrefix}-mobileNumber`} className={labelClass}>
              Mobile / Phone Number *
            </label>
            <div className="flex items-stretch gap-2">
              <select
                id={`${idPrefix}-countryCode`}
                name="countryCode"
                aria-label="Country dial code"
                value={selectedDialOption}
                onChange={(e) => handleDialOptionChange(e.target.value)}
                className={`${selectDialBaseClass} ${
                  isCustomDial ? 'w-[86px] sm:w-[94px]' : 'w-[114px] sm:w-[126px]'
                } shrink-0 ${fieldBorder('countryCode', effectiveCountryCode, effectiveCountryCode)}`}
              >
                {COUNTRY_DIAL_CODES.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.iso} {opt.code}
                  </option>
                ))}
                <option value="OTHER">Other (+)</option>
              </select>

              {isCustomDial && (
                <input
                  id={`${idPrefix}-customCountryCode`}
                  name="customCountryCode"
                  type="tel"
                  inputMode="tel"
                  aria-label="Custom country code"
                  value={customDialCode}
                  onChange={(e) => {
                    const nextVal = e.target.value.startsWith('+')
                      ? `+${e.target.value.slice(1).replace(/\D/g, '').slice(0, 4)}`
                      : `+${e.target.value.replace(/\D/g, '').slice(0, 4)}`;
                    handleFieldChange('countryCode', nextVal, setCustomDialCode, nextVal);
                  }}
                  onBlur={() =>
                    handleFieldBlur('countryCode', customDialCode, normalizeCountryCode(customDialCode))
                  }
                  placeholder="+353"
                  aria-invalid={Boolean(errors.countryCode)}
                  className={`w-[72px] shrink-0 ${heightPadClass} border px-2.5 text-base tabular-nums focus:outline-none ${
                    darkSurface
                      ? 'bg-[#141815] text-[#F5F3EC] placeholder:text-[#E6E0D3]/40'
                      : 'bg-white text-[#141815] placeholder:text-[#141815]/40'
                  } ${fieldBorder('countryCode', customDialCode, normalizeCountryCode(customDialCode))}`}
                />
              )}

              <div className="relative flex-1 min-w-0">
                <input
                  id={`${idPrefix}-mobileNumber`}
                  name="mobileNumber"
                  type="tel"
                  autoComplete="tel-national"
                  inputMode="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => handleFieldChange('mobileNumber', e.target.value, setMobileNumber)}
                  onBlur={() => handleFieldBlur('mobileNumber', mobileNumber)}
                  placeholder={phonePlaceholder}
                  aria-invalid={Boolean(errors.mobileNumber)}
                  aria-describedby={phoneOrCountryError ? `${idPrefix}-mobile-err` : undefined}
                  className={`${inputBaseClass} tabular-nums ${fieldBorder('mobileNumber', mobileNumber)}`}
                />
                {isFieldValid('mobileNumber', mobileNumber) && (
                  <Check
                    className="h-4 w-4 text-[#6FA87C] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
            {phoneOrCountryError && (
              <p id={`${idPrefix}-mobile-err`} className={errorTextClass}>
                {phoneOrCountryError}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label htmlFor={`${idPrefix}-city`} className={labelClass}>
              Your City *
            </label>
            <div className="relative">
              <input
                id={`${idPrefix}-city`}
                name="city"
                type="text"
                autoComplete="address-level2"
                autoCapitalize="words"
                required
                value={city}
                onChange={(e) => handleFieldChange('city', e.target.value, setCity)}
                onBlur={() => handleFieldBlur('city', city)}
                placeholder="e.g. Hyderabad, Dubai, or San Jose"
                aria-invalid={Boolean(errors.city)}
                aria-describedby={errors.city ? `${idPrefix}-city-err` : undefined}
                className={`${inputBaseClass} ${fieldBorder('city', city)}`}
              />
              {isFieldValid('city', city) && (
                <Check
                  className="h-4 w-4 text-[#6FA87C] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
              )}
            </div>
            {errors.city && (
              <p id={`${idPrefix}-city-err`} className={errorTextClass}>
                {errors.city}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleStep1Continue}
            className={`w-full min-h-[48px] py-3 px-6 inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer ${
              darkSurface
                ? 'bg-[#B5945B] text-[#141815] hover:bg-[#c9a86d]'
                : 'bg-[#1F3527] text-[#F5F3EC] hover:bg-[#141815]'
            }`}
          >
            <span>Continue — Pick Call Time</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <p
            className={`flex items-center justify-center gap-1.5 text-xs ${
              darkSurface ? 'text-[#E6E0D3]/65' : 'text-[#141815]/65'
            }`}
          >
            <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>India &amp; international numbers supported. No spam calls.</span>
          </p>
        </div>
      ) : (
        <div className={compact ? 'space-y-3' : 'space-y-4'}>
          {/* Step 1 Summary Bar */}
          <div
            className={`flex items-center justify-between gap-3 px-4 py-3 text-xs border ${
              darkSurface
                ? 'bg-[#1B221D] border-[#F5F3EC]/15 text-[#E6E0D3]'
                : 'bg-[#EBE7DC] border-[#1F3527]/15 text-[#141815]'
            }`}
          >
            <span className="truncate">
              <strong>{fullName.trim()}</strong> · {effectiveCountryCode} {mobileNumber.trim()} ·{' '}
              {city.trim()}
            </span>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="font-semibold uppercase tracking-wider text-[#B5945B] underline underline-offset-4 shrink-0 cursor-pointer"
            >
              Edit
            </button>
          </div>

          <div>
            <label htmlFor={`${idPrefix}-contactTime`} className={labelClass}>
              Best Time to Call You *
            </label>
            <select
              id={`${idPrefix}-contactTime`}
              name="preferredContactTime"
              value={preferredContactTime}
              onChange={(e) => setPreferredContactTime(e.target.value as PreferredContactTime)}
              className={`${inputBaseClass} pr-3.5 ${
                darkSurface ? 'border-[#F5F3EC]/25' : 'border-[#1F3527]/25'
              }`}
            >
              {PREFERRED_CONTACT_TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${idPrefix}-purpose`} className={labelClass}>
              What Are You Looking For? *
            </label>
            <select
              id={`${idPrefix}-purpose`}
              name="purposeOfPurchase"
              value={purposeOfPurchase}
              onChange={(e) => setPurposeOfPurchase(e.target.value as PurchasePurpose)}
              className={`${inputBaseClass} pr-3.5 ${
                darkSurface ? 'border-[#F5F3EC]/25' : 'border-[#1F3527]/25'
              }`}
            >
              {PURCHASE_PURPOSES.map((purpose) => (
                <option key={purpose} value={purpose}>
                  {purpose}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${idPrefix}-interaction`} className={labelClass}>
              How Should We Connect? *
            </label>
            <select
              id={`${idPrefix}-interaction`}
              name="preferredInteraction"
              value={preferredInteraction}
              onChange={(e) => setPreferredInteraction(e.target.value as PreferredInteraction)}
              className={`${inputBaseClass} pr-3.5 ${
                darkSurface ? 'border-[#F5F3EC]/25' : 'border-[#1F3527]/25'
              }`}
            >
              {PREFERRED_INTERACTIONS.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-3 min-h-[44px] py-1 cursor-pointer">
              <input
                id={`${idPrefix}-consent`}
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setConsent(checked);
                  if (checked) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.consent;
                      return next;
                    });
                  }
                }}
                className="mt-0.5 h-5 w-5 accent-[#B5945B] shrink-0"
              />
              <span
                className={`text-xs leading-relaxed ${
                  darkSurface ? 'text-[#E6E0D3]/85' : 'text-[#141815]/80'
                }`}
              >
                Yes, the ARANYA / Skandhanshi team can call, message, or email me with project
                details and site-visit timings.
              </span>
            </label>
            {errors.consent && <p className={errorTextClass}>{errors.consent}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full min-h-[48px] py-3.5 px-6 text-xs font-semibold tracking-[0.15em] uppercase transition-colors cursor-pointer disabled:opacity-60 ${
              darkSurface
                ? 'bg-[#B5945B] text-[#141815] hover:bg-[#c9a86d]'
                : 'bg-[#1F3527] text-[#F5F3EC] hover:bg-[#141815]'
            }`}
          >
            {submitting ? 'Saving Your Request…' : 'REQUEST A CALLBACK'}
          </button>

          <p
            className={`flex items-center justify-center gap-1.5 text-xs ${
              darkSurface ? 'text-[#E6E0D3]/65' : 'text-[#141815]/65'
            }`}
          >
            <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Instant brochure download available right after submitting.</span>
          </p>
        </div>
      )}
    </form>
  );
}
