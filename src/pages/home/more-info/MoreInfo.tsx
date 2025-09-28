import "./MoreInfo.less";

const cards = [
    {title: "视频教程", link: "https://space.bilibili.com/29136350?spm_id_from=333.1007.0.0", icon: "🎬"},
    {title: "使用文档", link: "https://xiaopujun.github.io/light-chaser-doc", icon: "📚"},
    {title: "GitHub", link: "https://github.com/xiaopujun/light-chaser", icon: "👨‍💻"},
    {title: "Gitee", link: "https://gitee.com/xiaopujun/light-chaser", icon: "🌐"},
    {title: "Demo 体验", link: "https://xiaopujun.github.io/light-chaser-app", icon: "✨"},
    {title: "社区支持", link: "https://gitee.com/xiaopujun/light-chaser#%E7%A4%BE%E5%8C%BA--%E5%8F%AF%E6%8C%81%E7%BB%AD%E5%8F%91%E5%B1%95", icon: "👥"},
    {title: "更新日志", link: "https://xiaopujun.github.io/light-chaser-doc/#/log/log", icon: "🔄"},
    {title: "FAQ", link: "https://github.com/xiaopujun/light-chaser/issues", icon: "❔"},
];

export default function MoreInfo() {
    return (
        <div className="more-info-container">
            <h1 className="more-info-title">欢迎使用 LIGHT CHASER 可视化编辑器 🚀</h1>
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
                    </a>
                ))}
            </div>
        </div>
    );
}