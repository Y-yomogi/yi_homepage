import React, { Component, useRef, useMemo }  from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { Button, Table, ModalHeader } from 'react-bootstrap';
import {YI_LOGO, YI_BACK} from "ts/components/videoComponents";

import {useOffsetTop} from "ts/utils/myScroll";
import {TopImages} from "ts/contents/TopContents";
import 'css/common.css';
import YILogoPath from 'images/YI.png'

// const observer = new IntersectionObserver(
//     (entries) => {
//         entries.forEach((entry => {
//             entry.isIntersecting
//         }));
        
//     }
//     , {});

// observer.observe(targetElement)

export const HeaderBlock : React.FC = () => {

    // スクロール位置を取得
    const iconRef = useRef(null);
    const { pageOffsetTop, viewportTop } = useOffsetTop(iconRef);

    const maxIconSize = 95; // 要素の最大サイズ
    const minIconSize = 100; // 要素の最小サイズ

    const iconSize = useMemo(() => {
        // 位置を取得できなかったときは最大サイズとして表示
        if (pageOffsetTop === undefined || viewportTop === undefined) return maxIconSize;
        
        // 位置に応じてサイズ計算
        const size =
          minIconSize + (viewportTop / pageOffsetTop) * (maxIconSize - minIconSize);
          let y = window.scrollY;
        //   console.log(`viewportTop[${viewportTop}]/pageOffsetTop[${pageOffsetTop}]/size[${size}]/scrollY[${y}]`)
        return size.toFixed(1);

      }, [pageOffsetTop, viewportTop]);
    
    
    
    return (
        <div>
            <YI_LOGO></YI_LOGO>
            <YI_BACK></YI_BACK>
            <header ref={iconRef}
                style={{width:`${iconSize}%`, margin: `auto`}}
                className={"header " + (()=>{return(iconSize >= 100)? "fixed":""})()}
            >
                <nav className="navbar">
                    <img src={YILogoPath} />
                    test
                </nav>
            </header>

            <div className="container">
                <TopImages></TopImages>
            </div>

        </div>
    );
}
