import React from 'react'
import "../assets/styles/about11.css"

import about_img from '../assets/img/hero.jpg'


const About = () => {
return (
    <div>
        <article className="m-auto w-[30ch] text-center text-gray-500 md:m-0 md:w-full py-32">
            <h2 className="mb-4 text-4xl font-semibold text-gray-800">
                Về Chúng Tôi
            </h2>
            <p>
                Spend smarter, lower your bills, get cashback on everything you buy,
                <br />
                and unlock credit to grow your business.
            </p>
        </article>
        <div className='about'>
        <div className='about-left'>
            <img src={about_img} alt='' className='about-img'/>
        </div>
        <div className='about-right'>
            <h3>Về Chúng Tôi</h3>
            <h1>ĐIỆN TỰ ĐỘNG HÓA <span className='span'>SONG NHẬT NGUYÊN</span></h1>
            <p>Được thành lập vào năm 2023, Công ty TNHH Điện Tự Động Song Nhật Nguyên ra đời trên cơ sở tiền thân là một bộ phận thiết kế của công ty Bách Khoa thành lập năm 2005.</p>
            <p>Với uy tín trên thị trường, Công ty TNHH Điện Tự Động Song Nhật Nguyên được biết đến là nhà cung cấp chuyên nghiệp với sản phẩm và dịch vụ chất lượng cao. Giải pháp kỹ thuật tối ưu cho khách hàng và đối tác trong lĩnh vực Lò Hơi Công Nghiệp.</p>
            <p>Mục tiêu của Công ty TNHH Điện Tự Động Song Nhật Nguyên là sẽ trở thành một công ty thi công – thiết kế chuyên nghiệp hàng đầu trong lĩnh vực điện điều khiển LÒ HƠI tại Việt Nam.</p>
        </div>
    </div>
</div>

  )
}

export default About
