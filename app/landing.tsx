'use client';
import { QrCode, CreditCard, Globe } from 'lucide-react';

const services = [
  {
    icon: QrCode,
    title: "Forever QR Codes",
    price: "2",
    description: "Generate unlimited QR codes that never expire. Perfect for business cards, menus, and marketing materials."
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Generate <span className="text-blue-600">Premium QR Codes</span>
          <br />for Just $2
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Unlike subscription services, our QR codes never expire. 
          One-time payment, lifetime access. Start generating now!
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mb-12">
          {services.map((service) => (
            <div key={service.title} className="relative bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:border-blue-300 transition-all duration-300">
              <div className="absolute -top-4 -right-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                ${service.price} one-time
              </div>
              <service.icon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              {service.title === "Forever QR Codes" && (
                <button 
                  onClick={() => window.location.href = '/generator'}
                  className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">Why Choose Our Service?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <CreditCard className="h-8 w-8 text-blue-500 mb-4" />
              <h4 className="font-bold mb-2">One-Time Payment</h4>
              <p className="text-gray-600">No monthly fees or hidden costs. Pay once, use forever.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <Globe className="h-8 w-8 text-blue-500 mb-4" />
              <h4 className="font-bold mb-2">Never Expires</h4>
              <p className="text-gray-600">Your QR codes will work forever, guaranteed.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <QrCode className="h-8 w-8 text-blue-500 mb-4" />
              <h4 className="font-bold mb-2">Instant Generation</h4>
              <p className="text-gray-600">Create QR codes instantly, no waiting required.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
