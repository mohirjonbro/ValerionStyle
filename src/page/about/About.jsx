import React from "react";
import { FaGem, FaTag, FaUsers } from "react-icons/fa";
import "./About.css";

const About = () => {
  const values = [
    {
      icon: <FaGem />,
      title: "Oliy Sifat",
      desc: "Biz faqat eng yaxshi mato va materiallardan tayyorlangan mahsulotlarni tanlaymiz."
    },
    {
      icon: <FaTag />,
      title: "Hamyonbop Narx",
      desc: "Sifatli kiyimlarni hamyoningizga mos narxlarda taqdim etish bizning ustuvor vazifamiz."
    },
    {
      icon: <FaUsers />,
      title: "Mijozlarimiz – Bizning oilamiz",
      desc: "Har bir mijozga individual yondashuv va samimiy xizmat ko'rsatishni kafolatlaymiz."
    }
  ];

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-header">
          <h1>Valerion Style</h1>
          <p className="lead">
            Valerion Style – bu sizning shaxsiy uslubingizni va zamonaviy trendlarni yaratishga yordam beradigan biznes. 
          </p>
        </div>

        <div className="about-content">
          <p>
            Biz Xitoydan sifatli kiyim-kechak va aksessuarlarni olib kelib, sizga o‘ziga xos va noyob tanlovlar taqdim etamiz. 
            Maqsadimiz – har bir mijozimizga sifatli, zamonaviy va arzon mahsulotlar bilan o‘z uslubini yangilash imkonini berish.
          </p>
        </div>

        <div className="values-grid">
          {values.map((v, i) => (
            <div className="value-card" key={i}>
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
