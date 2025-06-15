import React from 'react';
import ChatBot from './components/ChatBot';
import Header from './components/Header';
import Footer from './components/Footer';
import HealthResources from './components/HealthResources';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-1 px-6 py-4 gap-6">
        {/* ChatBot Section */}
        <div className="flex-1">
          <ChatBot />
        </div>

        {/* Sidebar Section */}
        <div className="w-80 flex flex-col gap-4">
          {/* Emergency Alert */}
          <div className="bg-red-100 text-red-800 p-4 rounded-md shadow">
            <h3 className="text-lg font-bold">🚨 Emergency</h3>
            <p className="text-sm mt-1">
              In case of a medical emergency, call your local emergency number immediately.
            </p>
            <a
              href="https://en.wikipedia.org/wiki/List_of_emergency_telephone_numbers#Asia"
              className="mt-3 inline-block bg-red-600 text-white text-center w-full py-2 rounded-md hover:bg-red-700"
            >
              Call Emergency
            </a>
          </div>

          {/* Health Resources Section */}
          <HealthResources />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
