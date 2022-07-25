import {Component} from "react";
import 'css/common.css';
import YILogoPath from 'video/yi_logo.mp4'
import YIBackPath from 'video/yi_back.mp4'


export const YI_LOGO : React.FC = () => {
    return (
        <div className="logo">
            <div className="col-8 col-sm-4 col-md-3 m-auto mt-sm-5 pt-sm-5 mb-sm-3">
                <video autoPlay muted id="logoAnimation">
                    <source src={YILogoPath} />
                </video>
            </div>
        </div>
      );
}

export const YI_BACK: React.FC = () => {
    return (
        <div className="backs">
            <video src={YIBackPath} autoPlay loop muted />
        </div>
    );
}

export class TestVideo extends Component{
    
}