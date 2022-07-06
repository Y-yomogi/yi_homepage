import React, { Component, useRef, useMemo }  from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { Button, Table, ModalHeader } from 'react-bootstrap';

import {useOffsetTop} from "ts/utils/myScroll";
import 'css/common.css';

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
    
    const scrollToTop = () => {
        scroll.scrollToTop();
    }

    const maxIconSize = 90; // 要素の最大サイズ
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
            <div>aaaa</div>
            <p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p>
            <header ref={iconRef}
                style={{width:`${iconSize}%`, margin: `auto`}}
                className={"header " + (()=>{return(iconSize >= 100)? "fixed":""})()}
            >
                aaaa
            </header>
            <p>a</p>  <p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p>
            <p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p>
            <Button onClick={scrollToTop}>test</Button>
        </div>
    );
}
