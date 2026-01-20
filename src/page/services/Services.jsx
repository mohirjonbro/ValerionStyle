import React from "react";
import "./Services.css";

const Services = () => {
  const services = [
    {
      title: "Kiyim va Aksessuar Importi",
      description: "Biz Xitoydan sifatli kiyim-kechak va aksessuarlarni olib kelamiz, sizga eng yangi trendlarni taqdim etamiz.",
    },
    {
      title: "Shaxsiy Maslahatlar",
      description: "Mijozlarimizga individual stil va kiyim tanlash bo‘yicha maslahatlar beramiz.",
    },
    {
      title: "Maxsus Buyurtmalar",
      description: "Siz xohlovchi mahsulotlarni biz orqali maxsus buyurtma qilishingiz mumkin.",
    },
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        <h2>Bizning Xizmatlarimiz</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
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
