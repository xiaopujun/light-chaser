import './MoreInfo.less';

export default function MoreInfo() {
    return (
        <div className={'more-info-list'}>
            <div className={'more-info-item'}
                 onClick={() => window.open('https://www.bilibili.com/video/BV1z1421m7v2/?share_source=copy_web&vd_source=ece0559aa5b8c4f5c0d7307cb2b06aac')}>视频教程
            </div>
            <div className={'more-info-item'}
                 onClick={() => window.open('https://xiaopujun.github.io/light-chaser-doc/#/')}>使用文档
            </div>
            <div className={'more-info-item'}
                 onClick={() => window.open('https://github.com/xiaopujun/light-chaser')}>GitHub
            </div>
            <div className={'more-info-item'}
                 onClick={() => window.open('https://gitee.com/xiaopujun/light-chaser')}>Gitee
            </div>
        </div>
    );
}