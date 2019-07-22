import React from 'react';
import './footer.css';
import footerBg from '../../images/footer-background.jpg';

export const FooterInfo = () => {
  return (
    <div className="footer__info">
      <div className="footer__copyright">
        <p className="copyright">Copyright © 2019 geekrole.com All Rights Reserved | 晋ICP备16009169号-3</p>
      </div>
      <div className="footer__friendshipLinks">
        <div className="footer__friendshipLinks--title">
          友情链接
        </div>
        <div className="footer__friendshipLinks--links">
          <a className="friendshipLink" href="http://www.imooc.com">慕课网</a>
          <a className="friendshipLink" href="http://www.baidu.com">百度</a>
          <a className="friendshipLink" href="http://cloud.tencent.com">腾讯云</a>
        </div>
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <div className="footer__hero"
         style={{
           backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,1) 0%, rgba(10,10,10,.6) 50%, rgba(10,10,10,1) 100%), url(${footerBg})`
         }}
    >
      <FooterInfo />
    </div>
  )
}



export default Footer;