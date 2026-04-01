import React from "react";
import { FaGlobe, FaLightbulb, FaClipboardList } from "react-icons/fa";
import "./Services.css";

const Services = () => {
  const services = [
    {
      title: "Kiyim va Aksessuar Importi",
      description: "Biz Xitoydan sifatli kiyim-kechak va aksessuarlarni olib kelamiz, sizga eng yangi trendlarni taqdim etamiz.",
      icon: <FaGlobe />,
    },
    {
      title: "Shaxsiy Maslahatlar",
      description: "Mijozlarimizga individual stil va kiyim tanlash bo‘yicha maslahatlar beramiz.",
      icon: <FaLightbulb />,
    },
    {
      title: "Maxsus Buyurtmalar",
      description: "Siz xohlovchi mahsulotlarni biz orqali maxsus buyurtma qilishingiz mumkin.",
      icon: <FaClipboardList />,
    },
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        <h2>Bizning Xizmatlarimiz</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
