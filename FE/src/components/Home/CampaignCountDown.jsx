import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Hook to calculate the remaining time
function useCountDown(endDate) {
  const calculateTimeLeft = () => {
    const difference = new Date(endDate) - new Date();
    let timeLeft = {};
    
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return timeLeft;
}

export default function CampaignCountDown({
  className,
  counterbg,
  appscreen,
}) {
  // Calculate the end date as 30 days from now
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);

  const { days, hours, minutes, seconds } = useCountDown(endDate);

  return (
    <div>
      <div className={`w-full lg:h-[460px] ${className || ""}`}>
        <div className="container-x mx-auto h-full">
          <div className="lg:flex xl:space-x-[30px] lg:space-x-5 items-center h-full">
            <div
              data-aos="fade-right"
              className="campaign-countdown lg:w-1/2 h-full w-full mb-5 lg:mb-0"
              style={{
                background: `url(/assets/images/campaign-cover-countdown.jpg) no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <Link to="/shop">
                <div className="w-full xl:p-12 p-5">
                  <div className="countdown-wrapper w-full flex lg:justify-between justify-evenly mb-10">
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                        <span className="font-700 sm:text-[30px] text-[14px] text-[#EB5757]">
                          {days || '0'}
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                        Ngày
                      </p>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                        <span className="font-700 sm:text-[30px] text-[14px] text-[#2F80ED]">
                          {hours || '0'}
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                        Giờ
                      </p>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                        <span className="font-700 sm:text-[30px] text-[14px] text-[#219653]">
                          {minutes || '0'}
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                        Phút
                      </p>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                        <span className="font-700 sm:text-[30px] text-[14px] text-[#EF5DA8]">
                          {seconds || '0'}
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                        Giây
                      </p>
                    </div>
                  </div>
                  <div className="countdown-title mb-4">
                    <h1 className="text-[44px] text-qblack font-600">
                      WOO! Flash Sale
                    </h1>
                  </div>
                  <div className="inline-flex space-x-2 items-center border-b border-qyellow">
                    <span className="text-sm font-600 tracking-wide leading-7">
                      Mua Ngay
                    </span>
                    <span>
                      <svg
                        width="7"
                        height="11"
                        viewBox="0 0 7 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="2.08984"
                          y="0.636719"
                          width="6.94219"
                          height="1.54271"
                          transform="rotate(45 2.08984 0.636719)"
                          fill="#1D1D1D"
                        />
                        <rect
                          x="7"
                          y="5.54492"
                          width="6.94219"
                          height="1.54271"
                          transform="rotate(135 7 5.54492)"
                          fill="#1D1D1D"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div
              data-aos="fade-left"
              className="download-app flex-1 lg:h-full h-[430px] xl:p-12 p-5"
              style={{
                background: `url(${
                  counterbg || `/assets/images/download-app-cover.png`
                }) no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="get-app">
                  <p className="text-[13px] font-600 text-qblack mb-3">
                    PHIÊN BẢN ỨNG DỤNG DI ĐỘNG
                  </p>
                  <h1 className="text-[30px] font-600 text-qblack leading-10 mb-8">
                    Tải về
                    <span className="text-qred border-b-2 border-qred mx-2">
                      Ứng Dụng Di Động
                    </span>
                    <br /> Giúp cuộc sống của bạn dễ dàng hơn!
                  </h1>
                  <div className="flex space-x-5 items-center">
                    <div>
                      <a href="#">
                        <img
                          width="170"
                          height="69"
                          src={`/assets/images/play-store.png`}
                          alt="Play Store"
                        />
                      </a>
                    </div>
                    <div>
                      <Link href="/all-products">
                        <img
                          width="170"
                          height="69"
                          src={`/assets/images/apple-store.png`}
                          alt="Apple Store"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="app-screen">
                  <img
                    src={appscreen || `/assets/images/app-screen.png`}
                    alt="App Screen"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}