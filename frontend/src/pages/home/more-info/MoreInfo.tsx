import "./MoreInfo.less";

const cards = [
    {
        title: "视频教程",
        link: "https://space.bilibili.com/29136350?spm_id_from=333.1007.0.0",
        icon: "🎬",
        description: "观看完整的操作演示和上手路径。",
    },
    {
        title: "使用文档",
        link: "https://xiaopujun.github.io/light-chaser-doc",
        icon: "📚",
        description: "查阅功能说明、接口和部署指引。",
    },
    {
        title: "GitHub",
        link: "https://github.com/xiaopujun/light-chaser",
        icon: "👨‍💻",
        description: "浏览源码、历史版本和 issue。",
    },
    {
        title: "Gitee",
        link: "https://gitee.com/xiaopujun/light-chaser",
        icon: "🌐",
        description: "访问国内镜像仓库和同步分支。",
    },
    {
        title: "Demo 体验",
        link: "https://xiaopujun.github.io/light-chaser-app",
        icon: "✨",
        description: "在线体验当前开源版的基础能力。",
    },
    {
        title: "社区支持",
        link: "https://gitee.com/xiaopujun/light-chaser#%E7%A4%BE%E5%8C%BA--%E5%8F%AF%E6%8C%81%E7%BB%AD%E5%8F%91%E5%B1%95",
        icon: "👥",
        description: "加入社区，反馈问题并交流实践。",
    },
    {
        title: "更新日志",
        link: "https://xiaopujun.github.io/light-chaser-doc/#/log/log",
        icon: "🔄",
        description: "查看版本更新、修复和改进记录。",
    },
    {
        title: "FAQ",
        link: "https://github.com/xiaopujun/light-chaser/issues",
        icon: "❔",
        description: "快速定位常见问题与反馈入口。",
    },
];

export default function MoreInfo() {
    return (
        <div className="more-info-container">
            <div className="more-info-header">
                <h1 className="more-info-title">帮助与资源</h1>
                <p className="more-info-subtitle">获取文档、演示、社区与项目更新入口</p>
            </div>
            <div className="more-info-grid">
                {cards.map((card) => (
                    <a
                        key={card.title}
                        href={card.link}
                        className="more-info-card"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="card-icon">{card.icon}</div>
                        <div className="card-title">{card.title}</div>
                        <div className="card-description">{card.description}</div>
                        <div className="card-action">立即访问</div>
                    </a>
                ))}
            </div>
        </div>
    );
}
