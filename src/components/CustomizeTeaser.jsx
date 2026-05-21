import React from 'react';
import { Link } from 'react-router-dom';
import { TbPalette, TbLetterT, TbTypography, TbSticker, TbRuler, TbPackage } from 'react-icons/tb';
import { FiArrowRight } from 'react-icons/fi';

const CustomizeTeaser = () => {
  const features = [
    { icon: <TbPalette />, text: "10+ Colors" },
    { icon: <TbLetterT />, text: "Personalized Text" },
    { icon: <TbTypography />, text: "Custom Fonts" },
    { icon: <TbSticker />, text: "Artwork / Icons" },
    { icon: <TbRuler />, text: "4 Sizes" },
    { icon: <TbPackage />, text: "Accessories" },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-orange-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Design Your Own Tumbler
          </h2>
          <p className="text-gray-600 text-lg">
            Choose color, add your name, pick a font, upload artwork, and see it live.
            Make every sip uniquely yours.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-12">
          {features.map((feat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md text-[#ff6b00] text-2xl">
                {feat.icon}
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700">{feat.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/customize">
            <button className="inline-flex items-center gap-2 bg-[#ff6b00] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#eb6200] transition shadow-lg">
              Start Customizing <FiArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CustomizeTeaser;