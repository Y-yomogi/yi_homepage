import { Component, ReactNode } from "react";
import Slider from "react-slick";

import "css/top.css";

import Img1 from "images/battle-sec01_bg-1.jpg";
import YIBackPath from 'video/yi_back.mp4'

export class TopImages extends Component{
    constructor(props: any){
        super(props);
    }
    
    private settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: true,
        autoplaySpeed: 5000,
        autoplay: true
    };

    private items = [
        {title: "name1", img: Img1},
        {title: "name2", img: null, video: YIBackPath},
      ]

    render(): ReactNode {
        return(
            
            <div className="row mt-4 mb-4">

                <Slider {...this.settings} className="col top_images">
                    {this.items && this.items.map(item => {
                        return (
                        <div className="images">
                            {(item.img != void 0) && <img src={item.img} />}
                            {(item.img == void 0) && <video src={item.video} autoPlay loop muted />}
                            <span className="top_detail">詳細</span>
                        </div>
                        )
                    })}
                </Slider>
            </div>
        );
    }
}