import React from "react";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import img2 from "./../../img/icon/nsworks.jpg";
import Header from "./../../layout/Header";
import icon1 from "./../../img/icon/technical-support.png";
import icon2 from "./../../img/icon/solution.png";
import icon3 from "./../../img/icon/it.png";
import icon4 from "./../../img/icon/repair.png";
import organization from "./../../img/organization.png";
import Slider from "../../components/sections/Slider";
import "../../css/info.css";
import $ from "jquery";
window.$ = $;

const useStyles = makeStyles((theme) => ({
  slider: {
    width: "100%",
    position: "absolute",
    left: 0,
    top: "80px",
    height: 400,
    "&  .awssld__bullets": {
      display: "none"
    },
    "& .awssld__controls button": {
      opacity: "0"
    }
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  }
}));

export default function Info1() {
  const classes = useStyles();

  $("html").scrollTop(0);

  $(document).ready(function () {
    do_ani(".article > div > *");
    $(window).scroll(function () {
      do_ani(".article > div > *");
    });
  });

  const do_ani = (target) => {
    var count = 0;
    $(target).each(function (i) {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      if (bottom_of_window > bottom_of_object / 1.3) {
        if ($(this).css("animation-name") === "tmp") count += 1;

        $(this)
          .css("animation-name", "slide1")
          .delay(200 * count);
        $(this).animate({ opacity: "1" }, 1000);
      }
    });
  };

  return (
    <div>
        <Header />
        <Slider/>
      <div className="info_container" id="info_container1">
        <div className="article" id="article1">
          <div className="article_top">
            <div className="nsworks">NSworks</div>
          </div>
          <div className="article_top">
            <div>
              <span>Virtualizing Your Information Infrastructure</span>
            </div>

            <div className="title_description_container">
              <img src={img2} alt="img" />
              <div>
                NSworks는 서버, 스토리지, 네트워크의 전문성으로 고객의 IT
                인프라를 통합적으로 제공하며, 이를 바탕으로 안정적인 IT환경과
                완성도 높은 가상화를 고객에게 제공하는 기술력 있는 기업입니다.
                <br />
                <br />
                IT인프라의 기초가 되는 서버, 서버운영체제, 스토리지, 네트워크,
                보안, 가상화에 대한 전문 엔지니어를 보유하여 고객의 복잡하고
                다양한 요구를 수행할 수 있는 기업입니다.
                <br />
                <br />
                NSworks는 항상 IT인프라를 구현하고자 하는 고객에게 효율적이고
                합리적인 이익이 무엇인가를 생각하고, 그것을 위해 노력하고
                있습니다.
                <br />
                <br />
                <ul>
                  <li>안정적이고 완성도 높은 인프라 구축을 약속합니다.</li>
                  <li>복잡하고 다양한 고객의 요구를 최대한 수용하겠습니다.</li>
                  <li>
                    고객의 합리적 이익 추구 및 제공에 최선을 다하겠습니다.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="article_top">
            <div>
              <span>Service Scope</span>
            </div>
          </div>
          <div className="article_mid">
            <Paper elevation={3} className={classes.paper}>
              <img src={icon1} alt="empty" />
              <div>IT 컨설팅</div>
              <ul>
                <li>
                  고객사 환경에 최적화된 HW, SW, Network 인프라 구축을 위한
                  솔루션 컨설팅
                </li>
                <li>재해 방지를 위한 백업 및 보안 컨설팅</li>
              </ul>
            </Paper>
            <Paper elevation={3}>
              <img src={icon2} alt="empty" />
              <div>솔루션 공급</div>
              <ul>
                <li>
                  Citrix, Microsoft, Cisco, VMware, HP, Dell의 인프라 구축 및
                  기술지원
                </li>
              </ul>
            </Paper>
            <Paper elevation={3}>
              <img src={icon3} alt="empty" />
              <div>HW/SW 판매</div>
              <ul>
                <li>HP, IBM, Dell 서버, 스토리지, 백업 장비 판매</li>
                <li>Cisco, HP, Dell, Alcatel Network 장비 판매</li>
                <li>MS, Linux 관련 OS 및 SW판매</li>
              </ul>
            </Paper>
            <Paper elevation={3}>
              <img src={icon4} alt="empty" />
              <div>통합유지보수</div>
              <ul>
                <li>HP Industrial Server Storage 충북, 세종 공인 지원센터</li>
                <li>Dell 충북, 충남, 세종 공인 지원센터</li>
                <li>기업, 대학, 병원 등 유지보수</li>
              </ul>
            </Paper>
          </div>
          <div className="article_top">
            <div>
              <span>조직도</span>
            </div>
          </div>
          <div className="article_mid">
            <img src={organization} alt="orga" id="orga" />
          </div>
        </div>
      </div>
    </div>
  );
}
