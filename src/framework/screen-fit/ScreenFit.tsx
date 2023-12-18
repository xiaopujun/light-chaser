import {CSSProperties, ReactNode, useEffect, useRef, useState} from 'react'
import {debounce} from "lodash";

interface ScreenFitProps {
    children?: ReactNode
    fullScreen?: boolean
    width: number | string
    height: number | string
    bodyOverflowHidden?: boolean
    delay?: number
    boxStyle?: CSSProperties
    wrapperStyle?: CSSProperties
}

export default function ScreenFit(props: ScreenFitProps) {
    const {width, height, bodyOverflowHidden = true, delay = 100} = props
    let bodyOverflow: string
    const elRef = useRef<HTMLDivElement>(null)
    const [size, setSize] = useState({width, height, originalHeight: 0, originalWidth: 0})

    const styles: Record<'box' | 'wrapper', CSSProperties> = {
        box: {
            overflow: 'hidden',
            backgroundSize: `100% 100%`,
            backgroundColor: `#545454`,
            width: `100vw`,
            height: `100vh`
        },
        wrapper: {
            transitionProperty: `all`,
            transitionTimingFunction: `cubic-bezier(0.4, 0, 0.2, 1)`,
            transitionDuration: `300ms`,
            position: `relative`,
            overflow: `hidden`,
            transformOrigin: `left top`
        }
    }

    let observer: MutationObserver;

    function updateSize() {
        if (size.width && size.height) {
            elRef.current!.style.width = `${size.width}px`
            elRef.current!.style.height = `${size.height}px`
        } else {
            elRef.current!.style.width = `${size.originalWidth}px`
            elRef.current!.style.height = `${size.originalHeight}px`
        }
    }

    function handleAutoScale(scale: number) {
        elRef.current!.style.transform = `scale(${scale},${scale})`;

        const domWidth = elRef.current!.clientWidth
        const domHeight = elRef.current!.clientHeight
        const currentWidth = document.body.clientWidth
        const currentHeight = document.body.clientHeight
        let mx = Math.max((currentWidth - domWidth * scale) / 2, 0)
        let my = Math.max((currentHeight - domHeight * scale) / 2, 0)
        elRef.current!.style.margin = `${my}px ${mx}px`
    }

    function updateScale() {
        // 获取真实视口尺寸
        const currentWidth = document.body.clientWidth
        const currentHeight = document.body.clientHeight
        // 获取大屏最终的宽高
        const realWidth = size.width || size.originalWidth
        const realHeight = size.height || size.originalHeight
        // 计算缩放比例
        const widthScale = currentWidth / +realWidth
        const heightScale = currentHeight / +realHeight
        // 若要铺满全屏，则按照各自比例缩放
        if (props.fullScreen) {
            elRef.current!.style.transform = `scale(${widthScale},${heightScale})`
            return;
        }
        // 按照宽高最小比例进行缩放
        const scale = Math.min(widthScale, heightScale)
        handleAutoScale(scale)
    }

    const onResize = debounce(() => {
        if (!elRef.current) return;
        updateSize()
        updateScale()
    }, delay)

    function initState() {
        if (bodyOverflowHidden) {
            bodyOverflow = document.body.style.overflow
            document.body.style.overflow = 'hidden'
        }
        observer = new MutationObserver(() => onResize());
        observer.observe(elRef.current!, {
            attributes: true,
            attributeFilter: ['style'],
            attributeOldValue: true
        })
        setSize({
            ...size,
            originalWidth: window.screen.width,
            originalHeight: window.screen.height
        })
        updateSize();
        updateScale();
        window.addEventListener('resize', onResize);
    }

    useEffect(() => {
        initState()
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', onResize);
            if (bodyOverflowHidden)
                document.body.style.overflow = bodyOverflow;
        }
    }, [])

    return (
        <div style={{...styles.box, ...props.boxStyle}}
             className={'react-screen-box'}>
            <div className={'screen-wrapper'}
                 style={{...styles.wrapper, ...props.wrapperStyle}}
                 ref={elRef}>
                {props.children}
            </div>
        </div>
    )
}