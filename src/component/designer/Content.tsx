import React, {Suspense} from 'react';
import ReactGridLayout, {Layout} from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './style/Content.less';
import getChartsTemplate from "../charts/ComponentChartInit";
import getBorder from "../border";
import {Spin} from "antd";

export default class LCLayoutContent extends React.Component<any, any> {

    rgl: any = null;

    state: any = {
        scale: 1
    }

    scaleConfig: any = {
        result: {},
        x: 0,
        y: 0,
        scale: 1,
        minScale: 0.5,
        maxScale: 4,
        isPointerdown: false, // 按下标识
        point: {x: 0, y: 0}, // 第一个点坐标
        diff: {x: 0, y: 0}, // 相对于上一次pointermove移动差值
        lastPointermove: {x: 0, y: 0}, // 用于计算diff
        ctrlDown: false,
    }

    componentDidMount() {
        this.scaleInit();
    }

    /**
     * 元素生成方法
     */
    generateElement = () => {
        const {LCDesignerStore} = this.props;
        const {layoutConfig, chartConfigs} = LCDesignerStore;
        return layoutConfig.map((item: any) => {
            let ElementChart = getChartsTemplate(item.name);
            let borderType = chartConfigs[item.id].elemBaseProperties.borderType || 'BaseBorder';
            let Border = getBorder(borderType);
            return (
                <div key={item?.id + ''} style={{width: '100%', height: '100%'}}>
                    <Suspense fallback={<Spin tip={'L O A D I N G . . .'}/>}>
                        <Border elemId={item?.id} {...this.props}>
                            <ElementChart elemId={item?.id} deleteItem={this.deleteItem} {...this.props}/>
                        </Border>
                    </Suspense>
                </div>
            );
        })
    }

    /**
     * 删除目标组件
     */
    deleteItem = (elemId: string) => {
        const {deleteItem, LCDesignerStore} = this.props;
        deleteItem(elemId);

        if (this.rgl != null) {
            const {layoutConfig} = LCDesignerStore;
            this.rgl.setState({layout: layoutConfig})
        }
    }

    /**
     * @description 元素拖动方法
     * @param layout
     * @param layoutItem
     * @param _event
     */
    onDrop = (layout: any, layoutItem: any, _event: any) => {
        const {addItem, LCDesignerStore} = this.props;
        const {globalSet} = LCDesignerStore;
        const chartName = _event.dataTransfer.getData('chartName');
        const item = {...layoutItem, ...{i: globalSet?.elemCount + "", id: globalSet?.elemCount, name: chartName}}
        addItem(item);

        if (this.rgl != null) {
            const {layoutConfig} = LCDesignerStore;
            this.rgl.setState({layout: layoutConfig})
        }
    };

    /**
     * 元素被拖动时限定目标元素大小
     * @param e
     */
    onDropDragOver = (e: any) => {
        return {w: 6, h: 12}
    }

    /**
     * @description 组件拖拽变化回调
     * @param layout
     */
    onDragStop = (layout: Layout[], oldItem: Layout, newItem: Layout, placeholder: Layout, event: MouseEvent, element: HTMLElement,) => {
        const {updateItemLayout} = this.props;
        updateItemLayout(newItem);
    }


    onDragStart = (layout: Layout[], oldItem: Layout, newItem: Layout, placeholder: Layout, event: MouseEvent, element: HTMLElement,) => {
        console.log('dd')
    }


    onDrag = (layout: any, oldItem: any, newItem: any,
              placeholder: any, e: any, element: HTMLElement) => {
        console.log('23')
    }

    /**
     * @description 组件大小变化回调
     */
    onResizeStop = (layout: Layout[], oldItem: Layout, newItem: Layout, placeholder: Layout, event: MouseEvent, element: HTMLElement,) => {
        const {updateItemLayout} = this.props;
        updateItemLayout(newItem);
    }

    scaleInit = () => {
        // 获取dom
        const container: any = document.getElementById('lc-designer-container');
        const designer: any = document.getElementById('lc-designer-content');

        this.scaleConfig.result = this.getDesignerSize(window.innerWidth, window.innerHeight - 64, window.innerWidth, window.innerHeight);
        designer.style.width = this.scaleConfig.result.width + 'px';
        designer.style.height = this.scaleConfig.result.height + 'px';
        this.scaleConfig.x = (window.innerWidth - this.scaleConfig.result.width) * 0.5;
        this.scaleConfig.y = (window.innerHeight - this.scaleConfig.result.height) * 0.5;
        designer.style.transform = 'translate3d(' + this.scaleConfig.x + 'px, ' + this.scaleConfig.y + 'px, 0) scale(1)';

        document.addEventListener('keyup', ev => {
            if (ev.keyCode === 17) {
                this.scaleConfig.ctrlDown = false;
            }
        })
        //2. keydown 按键按下的时候触发  能识别功能键 比如 ctrl shift 左右箭头
        document.addEventListener('keydown', ev => {
            if (ev.keyCode === 17) {
                this.scaleConfig.ctrlDown = true;
            }
        })

        // 拖拽查看
        this.designerDrag(designer);
        // 滚轮缩放
        this.designerWheelZoom(container, designer);

    }


    getDesignerSize = (naturalWidth: any, naturalHeight: any, maxWidth: any, maxHeight: any) => {
        const imgRatio = naturalWidth / naturalHeight;
        const maxRatio = maxWidth / maxHeight;
        let width, height;
        // 如果图片实际宽高比例 >= 显示宽高比例
        if (imgRatio >= maxRatio) {
            if (naturalWidth > maxWidth) {
                width = maxWidth;
                height = maxWidth / naturalWidth * naturalHeight;
            } else {
                width = naturalWidth;
                height = naturalHeight;
            }
        } else {
            if (naturalHeight > maxHeight) {
                width = maxHeight / naturalHeight * naturalWidth;
                height = maxHeight;
            } else {
                width = naturalWidth;
                height = naturalHeight;
            }
        }
        return {width: width, height: height}
    }


    // 拖拽查看
    designerDrag = (designer: any) => {
        // 绑定 pointerdown
        designer.addEventListener('pointerdown', (e: any) => {
            if (this.scaleConfig.ctrlDown) {
                this.scaleConfig.isPointerdown = true;
                designer.setPointerCapture(e.pointerId);
                this.scaleConfig.point = {x: e.clientX, y: e.clientY};
                this.scaleConfig.lastPointermove = {x: e.clientX, y: e.clientY};
            }

        });
        // 绑定 pointermove
        designer.addEventListener('pointermove', (e: any) => {
            if (this.scaleConfig.ctrlDown) {
                if (this.scaleConfig.isPointerdown) {
                    const current1 = {x: e.clientX, y: e.clientY};
                    this.scaleConfig.diff.x = current1.x - this.scaleConfig.lastPointermove.x;
                    this.scaleConfig.diff.y = current1.y - this.scaleConfig.lastPointermove.y;
                    this.scaleConfig.lastPointermove = {x: current1.x, y: current1.y};
                    this.scaleConfig.x += this.scaleConfig.diff.x;
                    this.scaleConfig.y += this.scaleConfig.diff.y;
                    designer.style.transform = 'translate3d(' + this.scaleConfig.x + 'px, ' + this.scaleConfig.y + 'px, 0) scale(' + this.scaleConfig.scale + ')';
                }
                e.preventDefault();
            }
        });
        // 绑定 pointerup
        designer.addEventListener('pointerup', (e: any) => {
            if (this.scaleConfig.ctrlDown) {
                if (this.scaleConfig.isPointerdown) {
                    this.scaleConfig.isPointerdown = false;
                }
            }
        });
        // 绑定 pointercancel
        designer.addEventListener('pointercancel', (e: any) => {
            if (this.scaleConfig.ctrlDown) {
                if (this.scaleConfig.isPointerdown) {
                    this.scaleConfig.isPointerdown = false;
                }
            }
        });
    }


    // 滚轮缩放
    designerWheelZoom = (container: any, designer: any) => {
        container.addEventListener('wheel', (e: any) => {
            if (this.scaleConfig.ctrlDown) {
                let ratio = 1.1;
                // 缩小
                if (e.deltaY > 0) {
                    ratio = 1 / 1.1;
                }
                // 限制缩放倍数
                const _scale = this.scaleConfig.scale * ratio;
                if (_scale > this.scaleConfig.maxScale) {
                    ratio = this.scaleConfig.maxScale / this.scaleConfig.scale;
                    this.scaleConfig.scale = this.scaleConfig.maxScale;
                } else if (_scale < this.scaleConfig.minScale) {
                    ratio = this.scaleConfig.minScale / this.scaleConfig.scale;
                    this.scaleConfig.scale = this.scaleConfig.minScale;
                } else {
                    this.scaleConfig.scale = _scale;
                }
                // 目标元素是img说明鼠标在img上，以鼠标位置为缩放中心，否则默认以图片中心点为缩放中心
                if (e.target.tagName === 'DIV') {
                    const origin = {
                        x: (ratio - 1) * this.scaleConfig.result.width * 0.5,
                        y: (ratio - 1) * this.scaleConfig.result.height * 0.5
                    };
                    // 计算偏移量
                    this.scaleConfig.x -= (ratio - 1) * (e.clientX - this.scaleConfig.x) - origin.x;
                    this.scaleConfig.y -= (ratio - 1) * (e.clientY - this.scaleConfig.y) - origin.y;
                }
                designer.style.transform = 'translate3d(' + this.scaleConfig.x + 'px, ' + this.scaleConfig.y + 'px, 0) scale(' + this.scaleConfig.scale + ')';
                e.preventDefault();
                this.setState({scale: this.scaleConfig.scale})
            }
        });
    }

    render() {
        const {LCDesignerStore} = this.props;
        const {layoutConfig} = LCDesignerStore;
        const {scale} = this.state;
        return (
            <div id={'lc-designer-container'} style={{overflow: "hidden", backgroundColor: '#474747'}}>
                <div id={'lc-designer-content'} className="site-layout-background"
                     style={{
                         height: window.innerHeight - 64,
                         width: window.innerWidth,
                     }}>
                    <ReactGridLayout ref={obj => this.rgl = obj}
                                     className="layout"
                                     layout={layoutConfig}
                                     cols={48}
                                     rowHeight={10}
                                     margin={[15, 15]}
                                     useCSSTransforms={true}
                                     preventCollision={true}
                                     allowOverlap={true}
                                     isBounded={true}
                                     isDroppable={true}
                                     style={{height: window.innerHeight - 64}}
                                     transformScale={scale}
                                     width={window.innerWidth}
                                     onDrop={this.onDrop}
                                     onDrag={this.onDrag}
                                     onDropDragOver={this.onDropDragOver}
                                     onDragStop={this.onDragStop}
                                     onDragStart={this.onDragStart}
                                     onResizeStop={this.onResizeStop}>
                        {this.generateElement()}
                    </ReactGridLayout>
                </div>
            </div>
        );
    }
}
