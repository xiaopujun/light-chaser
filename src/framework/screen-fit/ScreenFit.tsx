import {CSSProperties, ReactNode, useEffect, useRef, useState} from 'react'
import {debounce} from "lodash";
import './ScreenFit.less';
import {AdaptationType} from "../../designer/DesignerType.ts";

interface ScreenFitProps {
    children?: ReactNode
    width: number | string
    height: number | string,
    bodyOverflowHidden?: boolean
    delay?: number
    mode?: AdaptationType
}

const screenFitStyleMap: Record<string, CSSProperties> = {
    'scale': {overflow: 'hidden'},
    'full-screen': {overflow: 'hidden'},
    'full-x': {overflow: 'hidden scroll'},
    'full-y': {overflow: 'scroll hidden'}
}

export default function ScreenFit(props: ScreenFitProps) {
    const {width, height, bodyOverflowHidden = true, delay = 100} = props
    let bodyOverflow: string
    const elRef = useRef<HTMLDivElement>(null)
    const [size, setSize] = useState({width, height, originalHeight: 0, originalWidth: 0})

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

        switch (props.mode) {
            case 'full-screen':
                // 若要铺满全屏，则按照各自比例缩放
                elRef.current!.style.transform = `scale(${widthScale},${heightScale})`
                break;
            case 'full-x':
                elRef.current!.style.transform = `scale(${widthScale},${widthScale})`
                break;
            case 'full-y':
                elRef.current!.style.transform = `scale(${heightScale},${heightScale})`
                break;
            default:
                // 按照宽高最小比例进行缩放
                const scale = Math.min(widthScale, heightScale)
                elRef.current!.style.transform = `scale(${scale},${scale})`;
                const domWidth = elRef.current!.clientWidth
                const domHeight = elRef.current!.clientHeight
                const mx = Math.max((currentWidth - domWidth * scale) / 2, 0)
                const my = Math.max((currentHeight - domHeight * scale) / 2, 0)
                elRef.current!.style.margin = `${my}px ${mx}px`
                break;
        }
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

    const scrollStyle = screenFitStyleMap[props.mode || 'scale']

    return (
        <div style={{...scrollStyle}}
             className={'react-screen-box'}>
            <div className={'screen-wrapper'}
                 ref={elRef}>
                {props.children}
            </div>
        </div>
    )
}