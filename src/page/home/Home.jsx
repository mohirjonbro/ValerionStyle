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
      img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Черный свитер",
      description: "Zamonaviy qora sviter",
      price: "350 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Зеленый костюм",
      description: "Sport va kundalik mos kostyum",
      price: "780 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1594932224828-b4b057b69b6d?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Синий костюм",
      description: "Qulay va stilni saqlovchi kostyum",
      price: "780 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Джинсы темные",
      description: "Oddiy va qulay ko‘k jins",
      price: "450 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Джинсы светлые",
      description: "Yorqin rangdagi zamonaviy jins",
      price: "460 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Кепка",
      description: "Yozgi sport kepkalar",
      price: "120 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1588850561427-de2805a814c8?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Куртка коричневая",
      description: "Issiq va zamonaviy kurtka",
      price: "780 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Кроссовки белые",
      description: "Qulay va zamonaviy krossovka",
      price: "550 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1571609834229-97463665a6e5?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Кроссовки серые",
      description: "Sport va kundalik uchun krossovka",
      price: "550 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Худи серый",
      description: "Kundalik kiyish uchun hoodie",
      price: "380 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Худи черный",
      description: "Oddiy va qulay qora hoodie",
      price: "380 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1509942700367-aba912c7c7f3?q=80&w=500&auto=format&fit=crop",
    },

    // NEW PRODUCTS
    {
      title: "Shark Backpack",
      description: "Zamonaviy shark dizaynli ryukzak",
      price: "420 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Purple Shark Backpack",
      description: "Keng va mustahkam ryukzak",
      price: "420 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Sport Sneakers White",
      description: "Yengil va qulay sport krossovka",
      price: "550 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Sport Sneakers Grey",
      description: "Kundalik va sport uchun mos",
      price: "550 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Street Hoodie White",
      description: "Issiq va yumshoq hoodie",
      price: "380 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Street Hoodie Black",
      description: "Minimal dizaynli qora hoodie",
      price: "380 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Winter Beanie",
      description: "Qish uchun issiq shapka",
      price: "120 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1576871337622-98d48d455353?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Marvel Cap",
      description: "Zamonaviy street kepka",
      price: "140 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Winter Boots",
      description: "Sovuq ob-havo uchun oyoq kiyim",
      price: "480 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1520639889313-727216be35fe?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Sport Tracksuit",
      description: "Hoodie va shimdan iborat kostyum",
      price: "780 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1483721074892-4a85814592a6?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Casual Pants",
      description: "Keng va qulay shim",
      price: "320 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1624371414361-e6e9021b3584?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Knitted Sweater",
      description: "Kuz-qish uchun sviter",
      price: "350 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
    },

    // EXTRA PRODUCTS
    {
      title: "Leather Jacket Black",
      description: "Erkaklar uchun zamonaviy qora charm kurtka",
      price: "890 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Leather Jacket Brown",
      description: "Klassik jigarrang charm kurtka",
      price: "890 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Zip Hoodie Grey",
      description: "Fermuarli qulay kulrang hoodie",
      price: "420 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Zip Hoodie Black",
      description: "Minimal uslubdagi qora hoodie",
      price: "420 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Classic Shirt White",
      description: "Rasmiy va kundalik uchun oq ko‘ylak",
      price: "360 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Striped Shirt",
      description: "Chiziqli zamonaviy erkaklar ko‘ylagi",
      price: "380 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Knitted Sweater Navy",
      description: "Issiq va yumshoq to‘q ko‘k sviter",
      price: "370 000 so'm + Карго",
      img: "https://image.hm.com/assets/hm/a0/9c/a09c65c521c8084c25e211017af97443976d0db8.jpg?imwidth=2160",
    },
    {
      title: "Knitted Sweater Black",
      description: "Klassik qora sviter",
      price: "370 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Sport Shoes Black",
      description: "Kundalik va sport uchun qulay oyoq kiyim",
      price: "560 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Street Sneakers White",
      description: "Oq rangli trenddagi krossovka",
      price: "580 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "USA Hoodie Navy",
      description: "USA printli sport hoodie",
      price: "400 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "USA Hoodie Grey",
      description: "Issiq va qulay kulrang hoodie",
      price: "400 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1510022208032-4740e74f1b53?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Adidas Krossovkalar",
      description: "Adidas Classic | Qulay va yengil",
      price: "570 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Nike Krossovkalar",
      description: "Nike SB | Kundalik va sport uchun",
      price: "590 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Erkaklar Hoodie",
      description: "Paxta + flis | Issiq va qulay",
      price: "400 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1556821840-4103a4290074?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Qishki Kurtka (Puxovik)",
      description: "Shamol o‘tkazmaydi | Juda issiq",
      price: "820 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "USA Flag Sviter",
      description: "Trikotaj | Klassik dizayn",
      price: "370 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Erkaklar Shimlari",
      description: "Model: Klassik / Casual",
      price: "340 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1473966968600-fa804b86862b?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Klassik Palto",
      description: "Qalin mato | Klassik uslub",
      price: "950 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Aksessuarlar",
      description: "Sharf / Kepka / Ko‘zoynak",
      price: "120 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Erkaklar clutch sumkasi",
      description: "Premium eko-teri | Ixcham dizayn",
      price: "320 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Klassik erkaklar sharf",
      description: "Yumshoq va issiq mato",
      price: "180 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Zipli erkaklar sviteri",
      description: "Qalin va issiq | Oldi fermuarli",
      price: "420 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1578939612197-03484b1b9e1b?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Tugmali erkaklar kardigani",
      description: "Yumshoq material | Smart-casual",
      price: "460 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Premium erkaklar soati",
      description: "Luxury dizayn | Suvga chidamli",
      price: "1 250 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Erkaklar kepkasi",
      description: "Yengil va qulay | Quyoshdan himoya",
      price: "150 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Premium erkaklar krossovkasi",
      description: "Yengil va mustahkam taglik",
      price: "680 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=500&auto=format&fit=crop",
    },
    {
      title: "Erkaklar casual poyabzali",
      description: "Minimal dizayn | Qulay taglik",
      price: "720 000 so'm + Карго",
      img: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=500&auto=format&fit=crop",
    },
  ];

  const handleBuy = (product) => {
    navigate("/card", { state: { product } });
  };

  // Agar rasm yuklanmay qolsa, zaxira rasm qo'yish funksiyasi
  const handleImgError = (e) => {
    e.target.src = "https://via.placeholder.com/500x500?text=Rasm+topilmadi";
  };

  return (
    <div className="cards">
      {products.map((item, index) => (
        <div className="card" key={index}>
          <img 
            src={item.img} 
            alt={item.title} 
            loading="lazy" 
            onError={handleImgError}
            style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px" }} 
          />
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