import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { settings } from '../services/api';

const WhatsAppButton = () => {
  const [whatsapp, setWhatsapp] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settings.getPublic();
        setWhatsapp(response.data.clinic_whatsapp || '');
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };
    fetchSettings();
  }, []);

  if (!whatsapp) return null;

  const handleClick = () => {
    const cleanNumber = whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      data-testid="whatsapp-button"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

export default WhatsAppButton;
