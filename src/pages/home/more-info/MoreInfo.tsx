import "./MoreInfo.less";

const cards = [
    {title: "视频教程", link: "/tutorials", icon: "🎬"},
    {title: "使用文档", link: "/docs", icon: "📚"},
    {title: "GitHub", link: "https://github.com/your-repo", icon: "👨‍💻"},
    {title: "Gitee", link: "https://gitee.com/your-repo", icon: "🌐"},
    {title: "Demo 体验", link: "/demo", icon: "✨"},
    {title: "社区支持", link: "/community", icon: "👥"},
    {title: "更新日志", link: "/changelog", icon: "🔄"},
    {title: "FAQ", link: "/faq", icon: "❔"},
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