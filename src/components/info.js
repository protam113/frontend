import React from 'react'

import pic_2 from "../assets/img/hero.jpg";
import pic_1 from "../assets/img/snn/122.jpg";
import pic_3 from "../assets/img/snn/111.jpg";

const info = () => {
    return (
        <section id="features"
        className="flex max-w-7xl flex-col gap-10 px-8 pt-10 lg:px-12 xl:m-auto xl:pt-20">
            <article className="m-auto w-[30ch] text-center text-gray-500 md:m-0 md:w-full">
                <h2 className="mb-4 text-4xl font-semibold text-gray-800">
                    Về Chúng Tôi
                </h2>
                <p>
                Công ty TNHH Điện Tự Động Song Nhật Nguyên được thành lập vào năm 2023, <br />
                chuyên cung cấp giải pháp kỹ thuật tối ưu trong lĩnh vực Lò Hơi Công Nghiệp, <br />
                với mục tiêu trở thành công ty thi công – thiết kế hàng đầu tại Việt Nam.
                    
                    <br />
                            <a href="/contact_us" className='text-red-600'>Contact Us</a>
                </p>
            </article>

            <article className="flex w-full flex-col gap-8 overflow-hidden xl:h-96 xl:flex-row">
                <div className="flex flex-col rounded-2xl bg-sky-100 px-4 sm:px-0 md:flex-row md:gap-8 xl:w-2/3">
                    <div className="mt-10 flex flex-col justify-center gap-4 text-center sm:mx-10 md:mx-0 md:ml-10 md:w-1/2 md:text-left">
                        <h2 className="m-auto text-center text-3xl font-semibold text-gray-800 sm:w-[18ch] md:m-0 md:text-left">
                            Our Services
                        </h2>
                        <p className="m-auto text-center text-gray-500 sm:w-[34ch] md:m-0 md:text-left">
                        Công ty TNHH Điện Tự Động Song Nhật Nguyên cung cấp dịch vụ điều khiển và thiết kế Lò Hơi Công Nghiệp chất lượng cao, <br/>
                        cam kết mang lại giải pháp tối ưu cho khách hàng và đối tác.
                            <br />
                            <a href="/service" className='text-red-600'>Contact me</a>
                        </p>
                    </div>

                    <div className="m-auto mt-10 max-w-72 md:mx-10 md:w-1/2 lg:mx-0">
                        <img src={pic_1} alt="Kobodrop app frame" />
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-4 rounded-2xl bg-indigo-100 p-10 xl:w-1/3">
                    <div className="w-fit rounded-full bg-indigo-200 p-4">
                        <img src={pic_2} alt="" />
                    </div>
                    <h2 className="text-3xl font-semibold text-gray-800">
                        News
                    </h2>
                    <p className="text-gray-500">
                    Cập nhật tin tức mới nhất về công nghệ, xu hướng và các dự án 
                    tiên tiến trong lĩnh vực Lò Hơi Công Nghiệp.
                    </p>
                </div>
            </article>

            <article className="flex w-full flex-col gap-8 xl:h-96 xl:flex-row">
                <div className="flex flex-col justify-center gap-4 rounded-2xl bg-orange-100 p-10 xl:w-1/3">
                    <div className="w-fit rounded-full bg-orange-200 p-4">
                        <img src={pic_3} alt="" />
                    </div>
                    <h2 className="text-3xl font-semibold text-gray-800">
                        About Us
                    </h2>
                    <p className="text-gray-500">
                    Chúng tôi luôn lấy khách hàng làm trọng tâm và phục vụ khách hàng là yếu tố mang đến sự thành công.
                        <br />
                            <a href="/about_us" className='text-red-600'>
                                Contact me
                            </a>
                    </p>
                </div>

                <div className="flex flex-col gap-8 overflow-hidden rounded-2xl bg-sky-100 px-4 sm:px-0 md:flex-row md:gap-8 xl:w-2/3">
                    <div className="mt-10 flex flex-col justify-center gap-4 text-center sm:mx-10 md:mx-0 md:ml-10 md:mt-0 md:w-1/2 md:text-left">
                        <h2 className="m-auto text-center text-3xl font-semibold text-gray-800 sm:w-[18ch] md:m-0 md:text-left">
                            Our Product
                        </h2>
                        <p className="m-auto text-center text-gray-500 sm:w-[34ch] md:m-0 md:text-left">
                        Công ty TNHH Điện Tự Động Song Nhật Nguyên cũng cung cấp các sản phẩm điều khiển và thiết bị điện tự động chất lượng cao, 
                        đáp ứng mọi nhu cầu của khách hàng trong lĩnh vực Lò Hơi Công Nghiệp.
                            <br />
                            <a href="/product" className='text-red-600'>Contact me</a>
                        </p>
                    </div>

                <div className="m-auto max-w-96 md:mt-36 md:w-1/2">
                    <img
                        src={pic_1}
                        alt="Frame displaying logos of various payment solutions"
                    />
                </div>
            </div>
        </article>
    </section>
    )
}

export default info