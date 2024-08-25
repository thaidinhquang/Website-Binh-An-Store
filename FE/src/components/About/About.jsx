import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="mx-auto container-x text-black">
      <div className="text-center text-3xl font-bold ">
        <h1>Giới thiệu về Bình An Store</h1>
      </div>
      <div className="my-8">
        <h2 className="text-2xl font-bold">Giới thiệu chung</h2>
        <p>
          Công ty Cổ phần Xây dựng và Đầu tư thương mại Bình An sở hữu chuỗi cửa
          hàng Bình An Store - là nhà bán lẻ hàng đầu, chuyên cung cấp các sản
          phẩm công nghệ chính hãng tại thị trường Việt Nam. Với khẩu hiệu “Nếu
          những gì chúng tôi không có, nghĩa là bạn không cần”, chúng tôi đã,
          đang và sẽ tiếp tục nỗ lực đem đến các sản phẩm công nghệ chính hãng
          đa dạng, phong phú đi kèm mức giá tốt phục vụ nhu cầu của quý khách
          hàng. Sau những năm tháng tích lũy kinh nghiệm, CEO đã dẫn dắt đưa
          Bình An Store trở thành cái tên không còn xa lạ với người tiêu dùng
          trong nước. Hiện nay chúng tôi đang sở hữu mạng lưới hơn 120 chi nhánh
          phủ trên khắp cả nước, trong đó bao gồm hai trung tâm bảo hành tại Hà
          Nội và một trung tâm bảo hành tại thành phố Hồ Chí Minh. Đến với chuỗi
          cửa hàng của Bình An Store, quý khách có thể hoàn toàn yên tâm về uy
          tín, chất lượng sản phẩm với mức giá rẻ hơn khoảng 15-20% so với giá
          bán trên thị trường. Song song với đó, chúng tôi cũng luôn nỗ lực phục
          vụ đem đến trải nghiệm dịch vụ tốt nhất cho khách hàng.{" "}
        </p>
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-bold">Tôn chỉ hoạt động</h2>
        <p>
          Bình An Store luôn hoạt động dựa trên tôn chỉ đặt khách hàng là trung
          tâm, mọi nỗ lực để đạt được mục tiêu cao nhất là làm hài lòng người
          dùng thông qua các sản phẩm được cung cấp và dịch vụ khách hàng. Bình
          An Store đang từng bước xây dựng dịch vụ khách hàng vượt trội, xứng
          đáng là đơn vị bán lẻ hàng đầu tại Việt Nam. Sự tin tưởng và ủng hộ
          nhiệt tình của quý khách hàng tại chuỗi chi nhánh đã phần nào khẳng
          định hiệu quả hoạt động của đội ngũ nhân viên Bình An Store. Đối với
          quý khách hàng, chúng tôi luôn đặt cái tâm làm gốc, làm việc với tinh
          thần nghiêm túc, trung thực và có trách nhiệm, để mang tới trải nghiệm
          dịch vụ tốt nhất. Đối với đồng nghiệp, chúng tôi đề cao văn hóa học
          hỏi, đoàn kết, tương trợ lẫn nhau tạo nên môi trường làm việc tôn
          trọng - công bằng - văn minh cho nhân viên trong công ty. Đối với các
          đối tác, Bình An Store luôn làm việc dựa trên nguyên tắc tôn trọng,
          cùng tạo ra giá trị cho cộng đồng và cùng phát triển bền vững.{" "}
        </p>
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-bold">Tầm nhìn và sứ mệnh</h2>
        <p>
          Những năm qua, chúng tôi không ngừng cải thiện dịch vụ tại các chi
          nhánh và hỗ trợ khách hàng qua các kênh online. Bình An Store cam kết
          mang đến những sản phẩm chất lượng và chế độ bảo hành uy tín, sẵn sàng
          hỗ trợ khách hàng trong thời gian nhanh nhất. Trong tương lai, Bình An
          Store sẽ tiếp tục mở rộng hệ thống chi nhánh, hướng tới mục tiêu có
          mặt tại 63 tỉnh thành trên toàn quốc. Đồng thời, nâng cao chất lượng
          dịch vụ, hạn chế những rủi ro, lắng nghe và tiếp thu góp ý của quý
          khách hàng nhằm đem đến trải nghiệm tốt nhất khi mua sắm tại Bình An
          Store. Cuối cùng, Bình An Store hy vọng sẽ trở thành nhà tiên phong
          đưa những sản phẩm công nghệ mới nhất đến tay người dùng sớm nhất, tạo
          ra cuộc sống hiện đại nơi công nghệ kết nối con người, công nghệ phục
          vụ con người.{" "}
        </p>
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-bold">Thông tin liên hệ</h2>
        <div className="grid grid-cols-[20px,1fr] gap-4">
          <div className="text-yellow-600 text-xl">
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
          <div className="">
            <h3 className="text-lg">Văn phòng điều hành</h3>
            <p>
              Tòa nhà FPT Polytechnic, P. Trịnh Văn Bô, Xuân Phương, Nam Từ
              Liêm, Hà Nội 100000, Vietnam
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[20px,1fr] gap-4">
          <div className="text-yellow-600 text-xl">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div className="">
            <h3 className="text-lg">
              {" "}
              Email:{" "}
              <Link to="#" className="text-yellow-600">
                investor@gmail.com
              </Link>
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-[20px,1fr] gap-4">
          <div className="text-yellow-600 text-xl">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <div className="">
            <h3 className="text-lg">
              Các vấn đề khác vui lòng gọi số:{" "}
              <Link to="#" className="text-yellow-600">
                028.150.3068
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
