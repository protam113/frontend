import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../assets/styles/about.css";
import { BounceLoader } from 'react-spinners';
// import Map from './map';

import partner_1 from '../../assets/img/partner/A.png';
import partner_2 from '../../assets/img/partner/DDG.png';
import partner_3 from '../../assets/img/partner/Divi.png';
import partner_4 from '../../assets/img/partner/Eth.png';
import partner_5 from '../../assets/img/partner/HT_co.jpg';
import partner_6 from '../../assets/img/partner/KPL_co.jpg';
import partner_7 from '../../assets/img/partner/Napoly.png';
import partner_8 from '../../assets/img/partner/Nitori.png';
import partner_9 from '../../assets/img/partner/nuto.jpg';
import partner_10 from '../../assets/img/partner/QH_co.jpg';
import partner_11 from '../../assets/img/partner/1.jpg';
import partner_12 from '../../assets/img/partner/2.png';
import partner_13 from '../../assets/img/partner/3.png';
import partner_14 from '../../assets/img/partner/4.png';
import partner_15 from '../../assets/img/partner/5.png';
import partner_16 from '../../assets/img/partner/6.png';
import partner_17 from '../../assets/img/partner/12.png';
import partner_18 from '../../assets/img/partner/13.jpg';
import partner_19 from '../../assets/img/partner/14.jpg';
import partner_20 from '../../assets/img/partner/15.png';
import partner_21 from '../../assets/img/partner/16.png';





const Page = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/info/6653de4fc331853f432df898');
        setInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            {/* Sử dụng ClipLoader từ react-spinners */}
            <BounceLoader color="#dc2626" loading={loading} size={50} />
        </div>
    );
}

if (!info) {
    return <div>Error loading news detail...</div>;
}

  return (
    <div>
      <section className='about-section'>
        <div className='about-left'>
          <img src={info.mainImage.url} alt='Company Banner' />
        </div>
        <div className='about-right'>
          <h4>About Us</h4>
          <h1>ĐIỆN TỰ ĐỘNG HÓA <br /><span>SONG NHẬT NGUYÊN</span></h1>
          <p>{info.title}</p>
        
          <div className='address'>
            <ul>
              <li>
                <span className="address-logo"></span>
                <p>Address</p>
                <span className="saprater">:</span>
                <p>{info.address}</p>
              </li>
              <li>
                <span className="address-logo"></span>
                <p>Phone No</p>
                <span className="saprater">:</span>
                <p>{info.phone}</p>
              </li>
              <li>
                <span className="address-logo"></span>
                <p>Email ID</p>
                <span className="saprater">:</span>
                <p>{info.email}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      <div className='title'>
        <p>Vị Trí Chúng Tôi</p>
        <h2>dsasdsadas</h2>
      </div>
      <div className="map flex justify-center items-center h-screen">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3917.8258886369667!2d106.82611109999999!3d10.9008333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDU0JzAzLjAiTiAxMDbCsDQ5JzM0LjAiRQ!5e0!3m2!1sen!2s!4v1714917228379!5m2!1sen!2s"
          className="w-full md:w-[1200px]"
          height="600"  
          style={{border: "0"}} 
          allowFullScreen
          loading="lazy"
          title='map cong ty'
        ></iframe>
      </div>

      {/* Partner */}
      <div className='title'>
        <p>Các Đối Tác Của Chúng Tôi</p>
        <h2>Đối tác tin cậy, đồng hành vững bền.</h2>
      </div>
      <div className='container'>
        <div className="logos__marquee">
          <div className="marquee__logos">
            <a href="b.com" className='intro-logos_logo'>
              <img src={partner_1} width="200" height="100" loading="eager" alt="Zendesk" className="intro-logos_logo"/>
            </a>
            <img src={partner_1} width="200" height="100" loading="eager" alt="Zendesk" className="intro-logos_logo"/>
            <img src={partner_2} width="200" height="100" loading="eager" alt="Rakuten" className="intro-logos_logo"/>
            <img src={partner_3} width="200" height="100" loading="eager" alt="" className="intro-logos_logo"/>
            <img src={partner_4} width="200" height="100" loading="eager" alt="Dell" className="intro-logos_logo"/>
            <img src={partner_5} width="200" height="100" loading="lazy" alt="Upwork" className="intro-logos_logo"/>
            <img src={partner_6} width="200" height="100" loading="eager" alt="Lattice" className="intro-logos_logo"/>
            <img src={partner_7} width="200" height="100" loading="eager" alt="PWC" className="intro-logos_logo cc-pwc"/>
            <img src={partner_8} width="200" height="100" loading="lazy" alt="Getaround" className="intro-logos_logo"/>
            <img src={partner_9} width="200" height="100" loading="lazy" alt="Hellosign" className="intro-logos_logo"/>
            <img src={partner_10} width="200" height="100" loading="eager" alt="Petal" className="intro-logos_logo"/>
            <img src={partner_11} width="200" height="100" loading="eager" alt="Vice" className="intro-logos_logo"/>
          </div>
          <div className="marquee__logos" aria-hidden="true">
            <img src={partner_1} width="200" height="100" loading="eager" alt="Zendesk" className="intro-logos_logo"/>
            <img src={partner_2} width="200" height="100" loading="eager" alt="Rakuten" className="intro-logos_logo"/>
            <img src={partner_3} width="200" height="100" loading="eager" alt="" className="intro-logos_logo"/>
            <img src={partner_4} width="200" height="100" loading="eager" alt="Dell" className="intro-logos_logo"/>
            <img src={partner_5} width="200" height="100" loading="lazy" alt="Upwork" className="intro-logos_logo"/>
            <img src={partner_6} width="200" height="100" loading="eager" alt="Lattice" className="intro-logos_logo"/>
            <img src={partner_7} width="200" height="100" loading="eager" alt="PWC" className="intro-logos_logo cc-pwc"/>
            <img src={partner_8} width="200" height="100" loading="lazy" alt="Getaround" className="intro-logos_logo"/>
            <img src={partner_9} width="200" height="100" loading="lazy" alt="Hellosign" className="intro-logos_logo"/>
            <img src={partner_10} width="200" height="100" loading="eager" alt="Petal" className="intro-logos_logo"/>
            <img src={partner_11} width="200" height="100" loading="eager" alt="Vice" className="intro-logos_logo"/>
          </div>
        </div>
        <div style={{ height: '50px' }}></div>
        <div className="logos__marquee">
          <div className="marquee__logos">
            <a href="b.com" className='intro-logos_logo'>
              <img src={partner_12} width="200" height="100" loading="eager" alt="Zendesk" className="intro-logos_logo"/>
            </a>
            <img src={partner_12} width="200" height="100" loading="eager" alt="Zendesk" className="intro-logos_logo"/>
            <img src={partner_13} width="200" height="100" loading="eager" alt="Rakuten" className="intro-logos_logo"/>
            <img src={partner_14} width="200" height="100" loading="eager" alt="" className="intro-logos_logo"/>
            <img src={partner_15} width="200" height="100" loading="eager" alt="Dell" className="intro-logos_logo"/>
            <img src={partner_16} width="200" height="100" loading="lazy" alt="Upwork" className="intro-logos_logo"/>
            <img src={partner_17} width="200" height="100" loading="eager" alt="Lattice" className="intro-logos_logo"/>
            <img src={partner_18} width="200" height="100" loading="eager" alt="PWC" className="intro-logos_logo cc-pwc"/>
            <img src={partner_19} width="200" height="100" loading="lazy" alt="Getaround" className="intro-logos_logo"/>
            <img src={partner_20} width="200" height="100" loading="lazy" alt="Hellosign" className="intro-logos_logo"/>
            <img src={partner_21} width="200" height="100" loading="eager" alt="Petal" className="intro-logos_logo"/>
            <img src={partner_12} width="200" height="100" loading="eager" alt="Vice" className="intro-logos_logo"/>
          </div>
          <div className="marquee__logos" aria-hidden="true">
          <img src={partner_12} width="200" height="100" loading="eager" alt="Zendesk" className="intro-logos_logo"/>
            <img src={partner_13} width="200" height="100" loading="eager" alt="Rakuten" className="intro-logos_logo"/>
            <img src={partner_14} width="200" height="100" loading="eager" alt="" className="intro-logos_logo"/>
            <img src={partner_15} width="200" height="100" loading="eager" alt="Dell" className="intro-logos_logo"/>
            <img src={partner_16} width="200" height="100" loading="lazy" alt="Upwork" className="intro-logos_logo"/>
            <img src={partner_17} width="200" height="100" loading="eager" alt="Lattice" className="intro-logos_logo"/>
            <img src={partner_18} width="200" height="100" loading="eager" alt="PWC" className="intro-logos_logo cc-pwc"/>
            <img src={partner_19} width="200" height="100" loading="lazy" alt="Getaround" className="intro-logos_logo"/>
            <img src={partner_20} width="200" height="100" loading="lazy" alt="Hellosign" className="intro-logos_logo"/>
            <img src={partner_21} width="200" height="100" loading="eager" alt="Petal" className="intro-logos_logo"/>
            <img src={partner_12} width="200" height="100" loading="eager" alt="Vice" className="intro-logos_logo"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
