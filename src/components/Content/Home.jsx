import { useState, useEffect } from "react";
import CholimexLayout from "../Layout/CholimexLayout";
import BannerCarousel from "./BannerCarousel";
import logo from "../../assets/image/imageCholimex.jpg";
import image1 from "../../assets/image/image1.jpg";
import image2 from "../../assets/image/image2.jpg";
import image3 from "../../assets/image/image3.png";
import { getAllProducts } from "../../api/api.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getAllProducts();
        const data = Array.isArray(res.data) ? res.data : [];
        const sorted = data
          .filter((product) => product.CreatedAt)
          .sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));
        setProducts(sorted.slice(0, 8));
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <CholimexLayout>
      <BannerCarousel />

      {/* Giới thiệu Cholimex */}
      <section className="py-10">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-[#dd3333]">
            Giới thiệu Cholimex
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Công ty Cổ phần Thực phẩm Cholimex là một trong những thương hiệu
            hàng đầu trong lĩnh vực chế biến thực phẩm tại Việt Nam. Với hơn 40
            năm phát triển, Cholimex luôn mang đến các sản phẩm gia vị, nước
            chấm và thực phẩm tiện lợi chất lượng cao, phù hợp với khẩu vị người
            Việt.
          </p>
          <div className="w-full mt-4 mb-4">
            <img
              src={logo}
              alt="Giới thiệu Cholimex"
              className="rounded-lg w-full max-w-[600px] mx-auto"
            />
          </div>
          <p className="text-gray-700 leading-relaxed">
            Qua 40 năm xây dựng và phát triển, Công ty Cổ phần Thực phẩm
            Cholimex (Cholimex Food) đã và đang khẳng định vị thế của mình trong
            ngành thực phẩm ở trong và ngoài nước, với sản phẩm đạt thương hiệu
            quốc gia và có năng lực cạnh tranh cao trên thị trường quốc tế, góp
            phần lan tỏa hương vị Việt hội nhập sâu rộng với thế giới.
          </p>
        </div>
      </section>

      {/* Hình ảnh và mô tả */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 space-y-12">
          {[
            {
              img: image1,
              text: (
                <>
                  <p className="font-semibold mb-2">
                    Với bề dày hơn 40 năm kinh nghiệm, Cholimex Food tự hào là
                    thương hiệu hàng đầu cung cấp các giải pháp ẩm thực toàn
                    diện cho gia đình Việt.
                  </p>
                  <ul className="list-disc pl-6 text-left">
                    <li>
                      Gia vị truyền thống: Nước mắm, tương ớt, giấm ăn đạt chuẩn
                      chất lượng
                    </li>
                    <li>
                      Thực phẩm chế biến: Đồ hộp, thực phẩm đông lạnh tiện lợi
                    </li>
                    <li>
                      Nguyên liệu cao cấp: Các loại sốt chuyên dụng cho nhà
                      hàng, khách sạn
                    </li>
                  </ul>
                  <p className="mt-2 font-semibold mb-2">
                    Mỗi sản phẩm đều được sản xuất trên dây chuyền hiện đại,
                    tuân thủ nghiêm ngặt các tiêu chuẩn:
                  </p>
                  <ul className="list-disc pl-6 text-left">
                    <p>✓ HACCP (An toàn thực phẩm quốc tế).</p>
                    <p>✓ ISO 22000.</p>
                    <p>✓ Chứng nhận Hữu cơ cho dòng sản phẩm cao cấp.</p>
                  </ul>
                </>
              ),
            },
            {
              img: image2,
              text: (
                <>
                  <p className="font-semibold mb-2">
                    Cholimex không ngừng đầu tư vào hệ thống sản xuất hiện đại
                    để mang đến những sản phẩm chất lượng nhất:
                  </p>
                  <ul className="list-disc pl-6 text-left">
                    <p>
                      ✓ Dây chuyền tự động hóa 100% từ khâu nguyên liệu đến đóng
                      gói
                    </p>
                    <p>
                      ✓ Hệ thống kiểm soát chất lượng theo tiêu chuẩn ISO 22000,
                      HACCP
                    </p>
                    <p>✓ Phòng lab phân tích đạt chuẩn quốc tế</p>
                    <p>✓ Hệ thống quản lý ERP giám sát toàn bộ quy trình</p>
                  </ul>
                  <p className="mt-2 font-semibold mb-2">
                    Với nhà máy 30.000m² tại KCN Vĩnh Lộc, chúng tôi tự hào sở
                    hữu:
                  </p>
                  <ul className="list-disc pl-6 text-left">
                    <li>
                      5 dây chuyền sản xuất công suất 50 triệu sản phẩm/năm
                    </li>
                    <li>Kho bảo quản thông minh điều khiển nhiệt độ tự động</li>
                    <li>Hệ thống xử lý nước thải đạt chuẩn A</li>
                  </ul>
                </>
              ),
            },
            {
              img: image3,
              text: (
                <>
                  <p className="font-semibold mb-2">
                    Là một trong những doanh nghiệp tiên phong trong ngành thực
                    phẩm Việt được công nhận Thương hiệu Quốc gia, CholimexFood
                    đã khẳng định vị thế qua:
                  </p>
                  <ul className="list-disc pl-6 text-left">
                    <p>
                      ✓ Chất lượng vượt chuẩn: Đạt 16 chỉ tiêu khắt khe của Bộ
                      Công Thương
                    </p>
                    <p>
                      ✓ Sản phẩm chủ lực: Nước mắm, tương ớt, đồ hộp chiếm 30%
                      thị phần nội địa
                    </p>
                    <p>
                      ✓ Diện bao phủ: Có mặt tại 8.000+ siêu thị và cửa hàng
                      trên toàn quốc
                    </p>
                  </ul>
                  <p className="mt-2 font-semibold mb-2">
                    Những Dấu Mốc Nổi Bật:
                  </p>
                  <ul className="list-disc pl-6 text-left">
                    <p>
                      🏆 5 năm liên tiếp (2018-2023) được vinh danh Thương hiệu
                      Quốc gia
                    </p>
                    <p>🏆 Top 10 Doanh nghiệp Mạnh ASEAN</p>
                    <p>🏆 Giải thưởng Sao Vàng Đất Việt</p>
                    <p>🏆 Chứng nhận Hàng Việt Nam Chất Lượng Cao</p>
                  </ul>
                </>
              ),
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              } items-center gap-6`}
            >
              <img
                src={item.img}
                alt="info"
                className="w-full md:w-1/2 rounded-lg shadow-md object-cover"
              />
              <div className="w-full md:w-1/2 text-lg text-gray-700 font-medium text-center md:text-left">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sản phẩm mới - Carousel */}
      <section className="py-10">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-[#dd3333] border-b-5 text-center">
            Sản phẩm mới
          </h2>
          {loading ? (
            <div className="text-center py-4">
              <p className="text-gray-500">Đang tải sản phẩm...</p>
            </div>
          ) : (
            <Slider {...sliderSettings}>
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <div key={product.ProductID} className="px-2">
                    <div className="bg-white rounded shadow-md p-4">
                      <img
                        src={product.ImageURL || "/default.jpg"}
                        alt={product.ProductName}
                        className="mb-2 rounded w-full h-[150px] object-cover"
                      />
                      <p className="text-center text-sm font-semibold">
                        {product.ProductName}
                      </p>
                      <p className="text-center text-sm text-gray-500">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.Price)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center px-2">
                  <p className="text-gray-500">
                    Không có sản phẩm để hiển thị.
                  </p>
                </div>
              )}
            </Slider>
          )}
        </div>
      </section>
    </CholimexLayout>
  );
}

export default Home;
