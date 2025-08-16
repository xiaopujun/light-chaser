/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */
import "./MoreInfo.less";

const cards = [
    {title: "视频教程", link: "/tutorials", icon: "📺"},
    {title: "使用文档", link: "/docs", icon: "📖"},
    {title: "GitHub", link: "https://github.com/your-repo", icon: "💻"},
    {title: "Gitee", link: "https://gitee.com/your-repo", icon: "🌏"},
    {title: "Demo 体验", link: "/demo", icon: "⚡"},
    {title: "社区支持", link: "/community", icon: "🤝"},
    {title: "更新日志", link: "/changelog", icon: "📝"},
    {title: "FAQ", link: "/faq", icon: "❓"},
];

export default function MoreInfo() {
    return (
        <div className="homepage">
            <h1 className="homepage-title">欢迎使用本项目 🚀</h1>
            <div className="card-grid">
                {cards.map((card) => (
                    <a key={card.title} href={card.link} className="card">
                        <div className="card-icon">{card.icon}</div>
                        <div className="card-title">{card.title}</div>
                    </a>
                ))}
            </div>
        </div>
    );
}
