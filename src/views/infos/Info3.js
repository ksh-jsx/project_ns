import React from "react";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import { makeStyles } from "@material-ui/core/styles";
import "../../css/info.css";
import vi from "./../../img/vi.png";

import logo1 from "./../../img/partner/1.png";
import logo2 from "./../../img/partner/2.png";
import logo3 from "./../../img/partner/3.png";
import logo4 from "./../../img/partner/4.png";
import logo5 from "./../../img/partner/5.png";
import logo6 from "./../../img/partner/6.png";
import logo7 from "./../../img/partner/7.png";
import logo8 from "./../../img/partner/8.png";
import logo9 from "./../../img/partner/9.png";
import logo10 from "./../../img/partner/10.png";
import logo11 from "./../../img/partner/11.png";
import logo12 from "./../../img/partner/12.png";
import logo13 from "./../../img/partner/13.png";
import logo14 from "./../../img/partner/14.png";
import logo15 from "./../../img/partner/15.png";
import logo16 from "./../../img/partner/16.png";
import logo17 from "./../../img/partner/17.png";
import logo18 from "./../../img/partner/18.png";
import logo19 from "./../../img/partner/19.png";
import logo20 from "./../../img/partner/20.png";
import logo21 from "./../../img/partner/21.png";
import logo22 from "./../../img/partner/22.png";
import logo23 from "./../../img/partner/23.png";
import logo24 from "./../../img/partner/24.png";
import logo25 from "./../../img/partner/25.png";
import logo26 from "./../../img/partner/26.png";
import logo27 from "./../../img/partner/27.png";
import logo28 from "./../../img/partner/28.png";
import logo29 from "./../../img/partner/29.png";
import logo30 from "./../../img/partner/30.png";
import logo31 from "./../../img/partner/31.png";
import logo32 from "./../../img/partner/32.png";
import logo33 from "./../../img/partner/33.png";
import logo34 from "./../../img/partner/34.png";
import logo35 from "./../../img/partner/35.png";
import logo36 from "./../../img/partner/36.png";
import $ from "jquery";
window.$ = $;

const useStyles = makeStyles((theme) => ({
  img: {
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    paddingTop: 50,
    flexWrap: "wrap",

    width: "95%",
    maxWidth: 800
  },
  big: {
    transform: "scale(1.2)"
  }
}));

export default function Info3() {
  const classes = useStyles();
  $(document).ready(function () {
    
	$('#vi').css('max-height','500px')
  });
  return (
    <div>
      <div className="info_container" id="info_container3">
        <div className="article">
          <div className="article_top">
            <div>
              <span>Virtual Integration</span>
            </div>
            <div>
              가상화, 서버, 스토리지, 네트워크의 전문성으로 IT인프라를
              통합적으로 컨설팅하여 <br className="pc" />
              이를 바탕으로 안정적인 IT환경을 구축하고 완성도 높은 가상화
              시스템을 제공합니다.
            </div>
          </div>
          <div className="article_mid">
            <img
              src={vi}
              alt="vi"
              style={{
                maxWidth: "500px",
				width:'100%'
              }}
			  id="vi"
            />
          </div>
          <div className="article_top">
            <div>
              <span>Major Service Partners</span>
            </div>
            <div>
              고객사의 환경에 최적화된 인프라 구축을 위한 컨설팅을 통해 제품
              판매 및 솔루션을 제공함은 물론
              <br className="pc" /> 현재 사용중인 Server Storage의 유지보수
              서비스를 제공하고 있습니다.
              <br className="pc" /> 고객사의 비즈니스 성공을 위해 최선을 다하는
              NSworks가 되겠습니다.
            </div>
          </div>
          <div className="article_mid3">
            <div>
              <span>&nbsp;&nbsp;기업&nbsp;&nbsp;</span> <br />
              <br />
            </div>
            <table border="1" id="partner_tb_pc">
              <tbody>
                <tr>
                  <td>
                    <img src={logo1} alt="logo" />
                  </td>
                  <td>
                    <img src={logo2} alt="logo" />
                  </td>
                  <td>
                    <img src={logo3} alt="logo" />
                  </td>
                  <td>
                    <img src={logo4} alt="logo" />
                  </td>
                  <td>
                    <img src={logo5} alt="logo" />
                  </td>
                  <td>
                    <img src={logo6} className={classes.big} alt="logo" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={logo7} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img src={logo8} alt="logo" />
                  </td>
                  <td>
                    <img src={logo9} alt="logo" />
                  </td>
                  <td>
                    <img src={logo10} alt="logo" />
                  </td>
                  <td>
                    <img src={logo11} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img src={logo12} alt="logo" />
                  </td>
                </tr>
              </tbody>
            </table>
            <table border="1" id="partner_tb_mb">
              <tbody>
                <tr>
                  <td>
                    <img src={logo1} alt="logo" />
                  </td>
                  <td>
                    <img src={logo2} alt="logo" />
                  </td>
                  <td>
                    <img src={logo3} alt="logo" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={logo4} alt="logo" />
                  </td>
                  <td>
                    <img src={logo5} alt="logo" />
                  </td>
                  <td>
                    <img src={logo6} className={classes.big} alt="logo" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={logo7} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img src={logo8} alt="logo" />
                  </td>
                  <td>
                    <img src={logo9} alt="logo" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={logo10} alt="logo" />
                  </td>
                  <td>
                    <img src={logo11} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img src={logo12} alt="logo" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <span>&nbsp;&nbsp;공공/교육&nbsp;&nbsp;</span> <br />
              <br />
            </div>
            <table border="1" id="partner_tb_pc">
              <tbody>
                <tr>
                  <td>
                    <img src={logo13} alt="logo" />
                  </td>
                  <td>
                    <img src={logo14} alt="logo" />
                  </td>
                  <td>
                    <img src={logo15} alt="logo" />
                  </td>
                  <td>
                    <img src={logo16} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img src={logo17} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img src={logo18} className={classes.big} alt="logo" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={logo19} alt="logo" />
                  </td>
                  <td>
                    <img src={logo20} alt="logo" />
                  </td>
                  <td>
                    <img src={logo21} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img src={logo22} alt="logo" />
                  </td>
                  <td>
                    <img src={logo23} alt="logo" />
                  </td>
                  <td>
                    <img src={logo24} alt="logo" />
                  </td>
                </tr>
              </tbody>
            </table>

            <table border="1" id="partner_tb_mb">
              <tbody>
                <tr>
                  <td>
                    <img src={logo13} alt="logo" />
                  </td>
                  <td>
                    <img src={logo14} alt="logo" />
                  </td>
                  <td>
                    <img src={logo15} alt="logo" id="img15" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={logo16} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img
                      src={logo17}
                      className={classes.big}
                      alt="logo"
                      id="img17"
                    />
                  </td>
                  <td>
                    <img src={logo18} className={classes.big} alt="logo" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={logo19} alt="logo" id="img19" />
                  </td>
                  <td>
                    <img src={logo20} alt="logo" />
                  </td>
                  <td>
                    <img src={logo21} className={classes.big} alt="logo" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={logo22} alt="logo" id="img22" />
                  </td>
                  <td>
                    <img src={logo23} alt="logo" />
                  </td>
                  <td>
                    <img src={logo24} alt="logo" id="img24" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <span>&nbsp;&nbsp;병원&nbsp;&nbsp;</span> <br />
              <br />
            </div>
            <table border="1" id="partner_tb_pc">
              <tbody>
                <tr>
                  <td>
                    <img src={logo25} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img src={logo26} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img src={logo27} alt="logo" />
                  </td>
                  <td>
                    <img src={logo28} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img src={logo29} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img src={logo30} className={classes.big} alt="logo" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={logo31} alt="logo" />
                  </td>
                  <td>
                    <img src={logo32} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img src={logo33} alt="logo" />
                  </td>
                  <td>
                    <img src={logo34} alt="logo" />
                  </td>
                  <td>
                    <img src={logo35} alt="logo" />
                  </td>
                  <td>
                    <img src={logo36} alt="logo" />
                  </td>
                </tr>
              </tbody>
            </table>
            <table border="1" id="partner_tb_mb">
              <tbody>
                <tr>
                  <td>
                    <img src={logo25} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img
                      src={logo26}
                      className={classes.big}
                      alt="logo"
                      id="img26"
                    />
                  </td>
                  <td>
                    <img src={logo27} alt="logo" id="img27" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={logo28} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img src={logo29} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img
                      src={logo30}
                      className={classes.big}
                      alt="logo"
                      id="img30"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={logo31} alt="logo" />
                  </td>
                  <td>
                    <img src={logo32} className={classes.big} alt="logo" />
                  </td>
                  <td>
                    <img src={logo33} alt="logo" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={logo34} alt="logo" />
                  </td>
                  <td>
                    <img src={logo35} alt="logo" />
                  </td>
                  <td>
                    <img src={logo36} alt="logo" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
