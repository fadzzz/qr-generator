'use client';

export const runtime = 'edge';

import React from 'react';

import { useState } from 'react';
import { Phone, Lock, Loader2, AlertCircle, Check, ArrowRight, ChevronDown } from 'lucide-react';

import { useEffect } from 'react';

declare const paypal: any;

interface Country {
  code: string;
  name: string;
  flag: string;
}

const countries = [
  { code: '+93', name: 'Afghanistan', flag: '🇦🇫' },
  { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
  { code: '+1', name: 'United States/Canada', flag: '🇺🇸/🇨🇦' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+20', name: 'Egypt', flag: '🇪🇬' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+98', name: 'Iran', flag: '🇮🇷' },
  { code: '+964', name: 'Iraq', flag: '🇮🇶' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+962', name: 'Jordan', flag: '🇯🇴' },
  { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: '+961', name: 'Lebanon', flag: '🇱🇧' },
  { code: '+218', name: 'Libya', flag: '🇱🇾' },
  { code: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: '+968', name: 'Oman', flag: '🇴🇲' },
  { code: '+970', name: 'Palestine', flag: '🇵🇸' },
  { code: '+974', name: 'Qatar', flag: '🇶🇦' },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+963', name: 'Syria', flag: '🇸🇾' },
  { code: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+967', name: 'Yemen', flag: '🇾🇪' }
].sort((a, b) => a.name.localeCompare(b.name));

interface MessageProps {
  message: string;
}

const SuccessMessage: React.FC<MessageProps> = ({ message }) => (
  <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-start space-x-3">
    <Check className="h-5 w-5 text-green-500 mt-0.5" />
    <p className="text-green-700">{message}</p>
  </div>
);

const ErrorMessage: React.FC<MessageProps> = ({ message }) => (
  <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start space-x-3">
    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
    <p className="text-red-700">{message}</p>
  </div>
);

export default function QRGenerator() {
  const [step, setStep] = useState('phone');
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries.find(c => c.code === '+1') || countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (selectedCountry.code === '+1') {
      if (cleaned.length <= 3) return cleaned;
      if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
    return cleaned;
  };

  const getFullPhoneNumber = () => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    return `${selectedCountry.code}${cleaned}`;
  };

  const showSuccessFor = (message: string) => {
  setSuccessMessage(message);
  setTimeout(() => setSuccessMessage(''), 3000);
};


const sendVerificationCode = async () => {
    if (!phoneNumber) {
      setError('Please enter a phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://qr-code-gen.fadico.workers.dev/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: getFullPhoneNumber() })
      });

      if (!response.ok) throw new Error('Failed to send verification code');
      
      setStep('verify');
      showSuccessFor('Verification code sent successfully!');
    } catch (err) {
      setError('Error sending code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://qr-code-gen.fadico.workers.dev/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phoneNumber: getFullPhoneNumber(), 
          code: verificationCode 
        })
      });

      if (!response.ok) throw new Error('Invalid verification code');

      setStep('generator');
      showSuccessFor('Phone verified successfully!');
    } catch (err) {
      setError('Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateQR = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://qr-code-gen.fadico.workers.dev/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!response.ok) throw new Error('Failed to generate QR code');

      const data = await response.json();
      setQrCode(data.url);
      showSuccessFor('QR code generated successfully!');
    } catch (err) {
      setError('Error generating QR code. Please try again.');
    } finally {
      setLoading(false);
    }
  };


const PayPalButton = () => {
    useEffect(() => {
      if (window.paypal) {
        paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: '2.00'
                }
              }]
            });
          },
          onApprove: async (data: any, actions: any) => {
            await actions.order.capture();
            setPaymentCompleted(true);
            showSuccessFor('Payment successful! You can now generate your QR code.');
          }
        }).render('#paypal-button-container');
      }
    }, []);

    return <div id="paypal-button-container" />;
  };

  
return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="flex justify-between mb-8 relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0.5 bg-gray-200"></div>
          {['phone', 'verify', 'generator'].map((s, i) => (
            <div key={s} className="relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === s ? 'bg-blue-600 text-white' :
                ['verify', 'generator'].indexOf(step) > i ? 'bg-green-500 text-white' :
                'bg-white text-gray-400'
              } border-2 ${step === s ? 'border-blue-600' : 'border-gray-200'}`}>
                {['verify', 'generator'].indexOf(step) > i ? (
                  <Check className="h-4 w-4" />
                ) : (
                  i + 1
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <p className="text-gray-600 mb-4 text-center">
              We verify phone numbers to prevent spam and protect our users from automated attacks. Your number is encrypted and never shared!
            </p>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
              {step === 'phone' && 'Verify Your Number'}
              {step === 'verify' && 'Enter Verification Code'}
              {step === 'generator' && 'Generate QR Code'}
            </h1>

            {step === 'phone' && (
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <div className="relative">
                    <button
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="h-full px-3 py-2 border rounded-lg flex items-center space-x-2 bg-white hover:bg-gray-50"
                    >
                      <span>{selectedCountry.flag}</span>
                      <span>{selectedCountry.code}</span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    
                    {showCountryDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border rounded-lg shadow-lg z-10">
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            onClick={() => {
                              setSelectedCountry(country);
                              setShowCountryDropdown(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <span>{country.flag}</span>
                            <span>{country.name}</span>
                            <span className="text-gray-500">{country.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
                
                <button
                  onClick={sendVerificationCode}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <span>Send Code</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            )}

            {step === 'verify' && (
              <div className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    maxLength={6}
                  />
                </div>
                <button
                  onClick={verifyCode}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <span>Verify Code</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            )}

            {step === 'generator' && (
  <div className="space-y-4">
    <input
      type="url"
      placeholder="Enter URL (e.g., https://example.com)"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
    />
    
    {!paymentCompleted ? (
      <div className="border-t border-gray-200 pt-4">
        <p className="text-gray-600 mb-4 text-center">
          One-time payment of $2 for lifetime QR code access
        </p>
        <PayPalButton />
      </div>
    ) : (
      <button
        onClick={generateQR}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors flex items-center justify-center space-x-2"
      >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Generate QR Code'
                  )}
                </button>

                {qrCode && (
                  <div className="mt-6 flex flex-col items-center space-y-4">
                    <img
                      src={qrCode}
                      alt="Generated QR Code"
                      className="w-48 h-48 border rounded-lg shadow-lg"
                    />
                    <button
                      onClick={() => window.open(qrCode, '_blank')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Download QR Code
                    </button>
                  </div>
                )}
              </div>
            )}

            {error && <ErrorMessage message={error} />}
            {successMessage && <SuccessMessage message={successMessage} />}
          </div>
        </div>
      </div>
    </div>
  );
}
