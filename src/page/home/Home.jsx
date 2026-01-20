import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
const products = [
  // OLD PRODUCTS
  {
    title: "Белый свитер",
    description: "Issiq va qulay oq sviter",
    price: "320 000 so'm + Карго",
    img: "/assets/img1.png",
  },
  {
    title: "Черный свитер",
    description: "Zamonaviy qora sviter",
    price: "350 000 so'm + Карго",
    img: "/assets/img2.png",
  },
  {
    title: "Зеленый костюм",
    description: "Sport va kundalik mos kostyum",
    price: "780 000 so'm + Карго",
    img: "/assets/img3.png",
  },
  {
    title: "Синий костюм",
    description: "Qulay va stilni saqlovchi kostyum",
    price: "780 000 so'm + Карго",
    img: "/assets/img4.png",
  },
  {
    title: "Джинсы темные",
    description: "Oddiy va qulay ko‘k jins",
    price: "450 000 so'm + Карго",
    img: "/assets/img5.png",
  },
  {
    title: "Джинсы светлые",
    description: "Yorqin rangdagi zamonaviy jins",
    price: "460 000 so'm + Карго",
    img: "/assets/img6.png",
  },
  {
    title: "Кепка",
    description: "Yozgi sport kepkalar",
    price: "120 000 so'm + Карго",
    img: "/assets/img7.png",
  },
  {
    title: "Куртка коричневая",
    description: "Issiq va zamonaviy kurtka",
    price: "780 000 so'm + Карго",
    img: "/assets/img8.png",
  },
  {
    title: "Кроссовки белые",
    description: "Qulay va zamonaviy krossovka",
    price: "550 000 so'm + Карго",
    img: "/assets/img9.png",
  },
  {
    title: "Кроссовки серые",
    description: "Sport va kundalik uchun krossovka",
    price: "550 000 so'm + Карго",
    img: "/assets/img10.png",
  },
  {
    title: "Худи серый",
    description: "Kundalik kiyish uchun hoodie",
    price: "380 000 so'm + Карго",
    img: "/assets/img11.png",
  },
  {
    title: "Худи черный",
    description: "Oddiy va qulay qora hoodie",
    price: "380 000 so'm + Карго",
    img: "/assets/img12.png",
  },

  // NEW PRODUCTS
  {
    title: "Shark Backpack",
    description: "Zamonaviy shark dizaynli ryukzak",
    price: "420 000 so'm + Карго",
    img: "/assets/bag1.png",
  },
  {
    title: "Purple Shark Backpack",
    description: "Keng va mustahkam ryukzak",
    price: "420 000 so'm + Карго",
    img: "/assets/bag2.png",
  },
  {
    title: "Sport Sneakers White",
    description: "Yengil va qulay sport krossovka",
    price: "550 000 so'm + Карго",
    img: "/assets/shoes1.png",
  },
  {
    title: "Sport Sneakers Grey",
    description: "Kundalik va sport uchun mos",
    price: "550 000 so'm + Карго",
    img: "/assets/shoes2.png",
  },
  {
    title: "Street Hoodie White",
    description: "Issiq va yumshoq hoodie",
    price: "380 000 so'm + Карго",
    img: "/assets/hoodie1.png",
  },
  {
    title: "Street Hoodie Black",
    description: "Minimal dizaynli qora hoodie",
    price: "380 000 so'm + Карго",
    img: "/assets/hoodie2.png",
  },
  {
    title: "Winter Beanie",
    description: "Qish uchun issiq shapka",
    price: "120 000 so'm + Карго",
    img: "/assets/hat1.png",
  },
  {
    title: "Marvel Cap",
    description: "Zamonaviy street kepka",
    price: "140 000 so'm + Карго",
    img: "/assets/cap1.png",
  },
  {
    title: "Winter Boots",
    description: "Sovuq ob-havo uchun oyoq kiyim",
    price: "480 000 so'm + Карго",
    img: "/assets/boots1.png",
  },
  {
    title: "Sport Tracksuit",
    description: "Hoodie va shimdan iborat kostyum",
    price: "780 000 so'm + Карго",
    img: "/assets/suit1.png",
  },
  {
    title: "Casual Pants",
    description: "Keng va qulay shim",
    price: "320 000 so'm + Карго",
    img: "/assets/pants1.png",
  },
  {
    title: "Knitted Sweater",
    description: "Kuz-qish uchun sviter",
    price: "350 000 so'm + Карго",
    img: "/assets/sweater1.png",
  },

  // EXTRA PRODUCTS
  {
    title: "Leather Jacket Black",
    description: "Erkaklar uchun zamonaviy qora charm kurtka",
    price: "890 000 so'm + Карго",
    img: "/assets/jacket_black.png",
  },
  {
    title: "Leather Jacket Brown",
    description: "Klassik jigarrang charm kurtka",
    price: "890 000 so'm + Карго",
    img: "/assets/jacket_brown.png",
  },
  {
    title: "Zip Hoodie Grey",
    description: "Fermuarli qulay kulrang hoodie",
    price: "420 000 so'm + Карго",
    img: "/assets/ziphoodie_grey.png",
  },
  {
    title: "Zip Hoodie Black",
    description: "Minimal uslubdagi qora hoodie",
    price: "420 000 so'm + Карго",
    img: "/assets/ziphoodie_black.png",
  },
  {
    title: "Classic Shirt White",
    description: "Rasmiy va kundalik uchun oq ko‘ylak",
    price: "360 000 so'm + Карго",
    img: "/assets/shirt_white.png",
  },
  {
    title: "Striped Shirt",
    description: "Chiziqli zamonaviy erkaklar ko‘ylagi",
    price: "380 000 so'm + Карго",
    img: "/assets/shirt_striped.png",
  },
  {
    title: "Knitted Sweater Navy",
    description: "Issiq va yumshoq to‘q ko‘k sviter",
    price: "370 000 so'm + Карго",
    img: "/assets/sweater_navy.png",
  },
  {
    title: "Knitted Sweater Black",
    description: "Klassik qora sviter",
    price: "370 000 so'm + Карго",
    img: "/assets/sweater_black.png",
  },
  {
    title: "Sport Shoes Black",
    description: "Kundalik va sport uchun qulay oyoq kiyim",
    price: "560 000 so'm + Карго",
    img: "/assets/shoes_black.png",
  },
  {
    title: "Street Sneakers White",
    description: "Oq rangli trenddagi krossovka",
    price: "580 000 so'm + Карго",
    img: "/assets/sneakers_white.png",
  },
  {
    title: "USA Hoodie Navy",
    description: "USA printli sport hoodie",
    price: "400 000 so'm + Карго",
    img: "/assets/hoodie_usa_navy.png",
  },
  {
    title: "USA Hoodie Grey",
    description: "Issiq va qulay kulrang hoodie",
    price: "400 000 so'm + Карго",
    img: "/assets/hoodie_usa_grey.png",
  },
  {
    title: "Adidas Krossovkalar",
    description: "Model: Adidas Classic | Ranglar: Oq, qora, ko‘k, kulrang | O‘lcham: 40–45 | Qulay va yengil",
    price: "570 000 so'm + Карго",
    img: "/assets/adidas_classic.png",
  },
  {
    title: "Nike Krossovkalar",
    description: "Model: Nike SB | Ranglar: Oq, qora, ko‘k | O‘lcham: 40–45 | Kundalik va sport uchun",
    price: "590 000 so'm + Карго",
    img: "/assets/nike_sb.png",
  },
  {
    title: "Erkaklar Hoodie",
    description: "Paxta + flis | Ranglar: Oq, kulrang, qora | O‘lcham: M / L / XL | Issiq va qulay",
    price: "400 000 so'm + Карго",
    img: "/assets/hoodie_men.png",
  },
  {
    title: "Qishki Kurtka (Puxovik)",
    description: "Shamol o‘tkazmaydi | Ranglar: Qora, ko‘k | O‘lcham: M / L / XL / XXL | Juda issiq",
    price: "820 000 so'm + Карго",
    img: "/assets/winter_jacket.png",
  },
  {
    title: "USA Flag Sviter",
    description: "Trikotaj | Ranglar: Oq, ko‘k | O‘lcham: M / L / XL | Klassik dizayn",
    price: "370 000 so'm + Карго",
    img: "/assets/sweater_usa.png",
  },
  {
    title: "Erkaklar Shimlari",
    description: "Model: Klassik / Casual | Ranglar: Qora, kulrang, bej | O‘lcham: 30–36",
    price: "340 000 so'm + Карго",
    img: "/assets/pants_men.png",
  },
  {
    title: "Klassik Palto",
    description: "Qalin mato | Ranglar: Qora, jigarrang, bej, kulrang | O‘lcham: M / L / XL",
    price: "950 000 so'm + Карго",
    img: "/assets/coat_classic.png",
  },
  {
    title: "Aksessuarlar",
    description: "Sharf / Kepka / Ko‘zoynak | Turli ranglarda | Obrazni to‘ldiradi",
    price: "120 000 so'm + Карго",
    img: "/assets/accessories.png",
  },
  {
    title: "Erkaklar clutch sumkasi",
    description: "Premium eko-teri | Ixcham dizayn | Kundalik va rasmiy uslubga mos",
    price: "320 000 so'm + Карго",
    img: "/assets/clutch_bag.png",
  },
  {
    title: "Klassik erkaklar sharf",
    description: "Yumshoq va issiq mato | Ranglar: qora, kulrang, bej, jigarrang",
    price: "180 000 so'm + Карго",
    img: "/assets/scarf_classic.png",
  },
  {
    title: "Zipli erkaklar sviteri",
    description: "Qalin va issiq | Oldi fermuarli | Kundalik kiyim uchun",
    price: "420 000 so'm + Карго",
    img: "/assets/sweater_zip.png",
  },
  {
    title: "Tugmali erkaklar kardigani",
    description: "Yumshoq material | Smart-casual uslub | Ranglar: qora, ko‘k, yashil",
    price: "460 000 so'm + Карго",
    img: "/assets/cardigan_button.png",
  },
  {
    title: "Premium erkaklar soati",
    description: "Luxury dizayn | Suvga chidamli | Sport va casual uslub",
    price: "1 250 000 so'm + Карго",
    img: "/assets/watch_premium.png",
  },
  {
    title: "Erkaklar kepkasi",
    description: "Yengil va qulay | Quyoshdan himoya | Kundalik foydalanish",
    price: "150 000 so'm + Карго",
    img: "/assets/cap_basic.png",
  },
  {
    title: "Premium erkaklar krossovkasi",
    description: "Yengil va mustahkam taglik | Kundalik va sport uslub",
    price: "680 000 so'm + Карго",
    img: "/assets/sneakers_premium.png",
  },
  {
    title: "Erkaklar casual poyabzali",
    description: "Minimal dizayn | Shim va jinsi bilan mos | Qulay taglik",
    price: "720 000 so'm + Карго",
    img: "/assets/shoes_casual.png",
  },
];


  const handleBuy = (product) => {
    navigate("/card", { state: { product } });
  };

  return (
    <div className="cards">
      {products.map((item, index) => (
        <div className="card" key={index}>
          <img src={item.img} alt={item.title} />
          <h3>{item.title}</h3>
          <p className="desc">{item.description}</p>

          <div className="card-bottom">
            <span className="price">{item.price}</span>
            <button onClick={() => handleBuy(item)}>
              Sotib olish
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
