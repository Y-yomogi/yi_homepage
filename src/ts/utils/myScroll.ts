import React, { useRef, useEffect, useState, useCallback } from "react";

/**
 * エレメントの最終位置を取得する処理？
 * @param ref 
 */
export function useOffsetTop(ref?: React.RefObject<HTMLElement>) {
    const [viewportTop, setViewportTop] = useState<number | undefined>(undefined);
    const [pageOffsetTop, setPageOffsetTop] = useState<number | undefined>(undefined);
    
    // エレメントのトップ位置を取得する
    const eleTop = (() => {
        // リファレンスが存在しない場合処理しない
        if (!ref?.current) return 0;

        // エレメントのトップ位置を取得する
        const clientRect = ref.current.getBoundingClientRect();
        const newPageOffsetTop = clientRect.top + window.pageYOffset;
        

        return newPageOffsetTop;
    })()

    // ハンドラーの生成
    const handler = useThrottle(() => {
        // リファレンスが存在しない場合処理しない
        if (!ref?.current) return;

        // 現行のスクロール位置を取得
        let y = window.scrollY;

        // エレメントの初期位置から逆算し、セットする値を変更する
        const result = () => {
            return (eleTop <= y) ? 0 : eleTop - y;
        }

        setViewportTop(result());
        setPageOffsetTop(eleTop);

        // rootのトップ位置を取得する
        // const clientRect = ref.current.getBoundingClientRect();
        // setViewportTop(clientRect.top);

    }, 10);   // 100msに一度実行

    useEffect(() => {
        if (!ref?.current) return;
        
        // マウント時にも実行
        handler();
        window.addEventListener("scroll", handler);
        
        // アンマウント時にイベントリスナーを解除
        return () => window.removeEventListener("scroll", handler);
      }, [handler]);

    // トップ位置を返却
    return { viewportTop, pageOffsetTop };
}

export function useThrottle<T>(
    fn: (args?: T) => void,
    durationMS: number /* スロットルする時間*/) {
    const scrollingTimer = useRef<undefined | NodeJS.Timeout>();
    return useCallback(
        (args?: T) => {
            if (scrollingTimer.current) return; // すでにタイマーがセットされている場合は何もしない
            scrollingTimer.current = setTimeout(() => {
                fn(args);
                scrollingTimer.current = undefined; // タイマーをリセット
            }, durationMS);
        },
        [scrollingTimer, fn, durationMS]
    );
}