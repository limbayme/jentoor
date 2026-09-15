# 2026-09-15 素材替换记录

来源提交：`df58127..c5f17ab`。新增 24 张图片、4 段独立视频、2 份 Excel。根目录另有 3 段重复视频，SHA-1 与 media 内对应文件相同。原文件保留。

## 已采用图片

从 12 张候选中最终使用 9 张，导出最大 1600×900 WebP；不修改产品目录包装，不替换首页概念海报及 3D 模型。

| GitHub 源文件 | 网页资源 | 位置 |
|---|---|---|
| public/media/场地1.png | /media/2026-09/production-hall.webp | 首页、工厂页、供应商指南 |
| public/media/场地2.png | /media/2026-09/laboratory.webp | 实验室页 |
| public/media/样品1.png | /media/2026-09/dosage-samples.webp | 关于页、实验室页、OEM/ODM 指南 |
| public/media/生产1.png | /media/2026-09/capsule-line.webp | 工厂页 |
| public/media/生产4.png | /media/2026-09/softgel-line.webp | 制造页、资源页主图 |
| public/media/生产5.png | /media/2026-09/bottling.webp | 工厂页 |
| public/media/生产8.png | /media/2026-09/packing.webp | 标签与包装指南 |
| public/media/设备5.png | /media/2026-09/formulation-equipment.webp | 配方开发指南 |
| public/media/仓储2.png | /media/2026-09/warehouse.webp | 工厂页 |

## 视频

4 段均为厂房走访，720×1280、约 15.1 秒。网页分别使用 `facility-01.mp4` 至 `facility-04.mp4`；工厂页 `#walkthroughs` 按原比例展示，自带控制、按需加载，不自动播放。高清封面取自各视频开头画面。首页与制造页提供进入走访区的链接。未把走访片段误标成独立包装、灌装或仓储流程。

新图片用于制造主题视觉，未据此新增产能、认证或设备规格主张。两份新增 Excel 暂未用于改写产品数据，避免把此次图片视频更新扩大为产品资料变更。

## 验证

构建、类型检查及资源检查；浏览器验证视频可解码并播放，保持竖屏比例。发布使用独立版本目录，验证后切换正式站点，保留旧版本用于回退。
