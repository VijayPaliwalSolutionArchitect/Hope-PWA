import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { settings } from '../services/api';

const Footer = () => {
  const [clinicInfo, setClinicInfo] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settings.getPublic();
        setClinicInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Hope Clinic</h3>
            <p className="text-gray-400 mb-4">
              Professional psychological counseling and therapy services to help you achieve mental wellness and transform your life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {clinicInfo.clinic_email && (
                <li className="flex items-center space-x-2 text-gray-400">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span>{clinicInfo.clinic_email}</span>
                </li>
              )}
              {clinicInfo.clinic_phone && (
                <li className="flex items-center space-x-2 text-gray-400">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span>{clinicInfo.clinic_phone}</span>
                </li>
              )}
              {clinicInfo.clinic_address && (
                <li className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="w-5 h-5 flex-shrink-0" />
                  <span>{clinicInfo.clinic_address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hope Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
