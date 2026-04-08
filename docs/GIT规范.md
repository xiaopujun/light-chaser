## git提交规范

type(必须) 用于说明git commit的类别，只允许使用下面的标识。

feat：新功能（feature）

remove：删除代码或文件

fix/to：修复bug，可以是QA发现的BUG，也可以是研发自己发现的BUG。

fix：产生diff并自动修复此问题。适合于一次提交直接修复问题
to：只产生diff不自动修复此问题。适合于多次提交。最终修复问题提交时使用fix。
docs：文档（documentation）

style：格式（不影响代码运行的变动）。

refactor：重构（即不是新增功能，也不是修改bug的代码变动）。

perf：优化相关，比如提升性能、体验。

test：增加测试。  

chore：构建过程或辅助工具的变动。

revert：回滚到上一个版本。

merge：代码合并。

sync：同步主线或分支的Bug。


在Git中，发布tag版本号的设计通常遵循语义化版本号规范（Semantic Versioning），该规范包括主版本号、次版本号和修订版本号，以及可选的预发布版本号和构建元数据。
基本的语义版本号格式为：
```text
  主版本号.次版本号.修订版本号
```
例如：1.0.0

这里是一些关于如何设计tag版本号的建议：

主版本号（Major）： 当进行了不兼容的API更改或者重大的功能改进时，增加主版本号。

次版本号（Minor）： 当新增了向后兼容的功能时，增加次版本号。

修订版本号（Patch）： 当进行了向后兼容的bug修复或者小的功能改进时，增加修订版本号。

预发布版本号（Pre-release）： 可选的，用于表示开发阶段的版本号，如alpha、beta、rc等。例如：1.0.0-alpha.1

构建元数据（Build metadata）： 可选的，用于表示构建的信息，如构建号、构建时间等。例如：1.0.0+20220420

创建附注tag：
附注标签存储更多元数据，包括标签的创建者、日期、一个标签信息，甚至可以签名和验证。
创建附注标签 ：git tag -a v1.1.0 -m "Release version 1.0"
推送附注标签到远程仓库 ：git push origin v1.1.0
查看标签详细信息：git show v1.1.0
删除本地标签：git tag -d v1.1.0
删除远程标签：git push origin :refs/tags/v1.1.0