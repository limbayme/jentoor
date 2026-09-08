# Jentoor 独立站全面升级与 SEO / GEO 结构方案

版本：v1.2 · 2026-09-09 · 已结合 GitHub `main` 提交 `59a857a` 的 raw 素材  
定位：面向海外采购方的营养补充剂 OEM / ODM 制造与产品目录网站  
交付性质：产品、内容、设计及开发实施方案；本地改版已实现，尚未部署上线。

## 最新实施状态（2026-09-09）

- 已读取真实 Excel：25 条中英文记录，Daily Fiber 重复一条，形成 24 个独立产品概念、7 个目录剂型。源文件归档到 `content/source`，发布图片使用 WebP。后文空白 Excel 说明仅记录初次核查状态。
- 已实现首页精选、Catalog 搜索与品牌下拉筛选、24 个产品详情、7 个剂型页、6 个应用页及包装、制造、质量、品牌介绍、资源和询盘页面。
- 保留九类剂型图标、数字孪生互动、生产线和实验室互动；概念海报与真实工厂影像分别标识。浅底标题改用深绿色。互动场景进一步采用自然暖光、米白石材与低反光材质，液体模型为琥珀瓶身、燕麦盖和奶油标签，片剂以分层样品展示替代压机造型，保留交互功能。
- 已移除 Bterlif 案例；落实独立标题、canonical、面包屑、结构化数据及 58 个 URL 的 sitemap。
- 多产品询盘支持邮件草稿、复制和下载，邮箱为 `linbeizhenggang@jentoor.com`。当前通过用户邮件客户端发送，尚未接入服务器发信。
- 本地核查覆盖页面、产品图片、无效路径以及桌面和手机交互。上线后仍需索引提交和转化监测验收。

## 1. 升级方向

把 Jentoor 从强调制造理念和交互展示的企业官网，升级为“可选产品、可核实能力、可比较方案、可提交需求”的 B2B 采购入口。

核心路径：**首页认识产品 → Catalog 选型 → 查看规格和制造证据 → 加入询盘清单 → 提交项目需求。**

本次确定的原则：

- 新产品素材同时用于首页精选展示和独立 Catalog，首页增加具体产品视觉。
- 去掉 Bterlif Case Study、客户品牌标识、品牌评价及相关外链。保留 Jentoor 自身作为供应商的统一识别。
- 以产品、工艺、包装、质量文件说明能力，不依靠客户品牌背书。
- 全站英文优先，本文以中文说明执行要求；后续语言和市场由实际询盘决定。
- SEO 服务于真实采购意图；GEO 指生成式搜索可见性与引用能力。两者共同依赖真实、有依据、易理解的内容。

成功标准首先是有效询盘及商机质量，其次才是访问量和收录页数。

## 2. 现状核查与资料边界

本方案依据本地 `web/app`、`web/public`、部署配置和现有素材目录制定；未核实线上运行状态、Search Console 数据、关键词搜索量或真实转化率。

| 已核实情况 | 对升级的影响 |
| --- | --- |
| 首页包含 3D 胶囊、9 种剂型介绍、配方方向选择、工厂视频、资质入口 | 保留工厂证据；把具体产品和采购信息前置 |
| 暂无 `/catalog` 页面及产品详情体系 | 新增目录、分类及产品数据模型 |
| 头部有 11 个导航链接，多个能力页并列 | 收拢为 6 个主导航，降低选路成本 |
| Bterlif 位于独立案例页、主导航、OEM / ODM 内链及 sitemap | 删除须覆盖内容、入口和旧 URL 处理 |
| 首页询盘仅复制简报，表单没有真实线索提交 | 真实提交闭环列为首批上线条件 |
| 已有 4 篇采购指南、FAQ、工厂、实验室、配方、技术、质量页面 | 优先深化及连接已有内容，避免重复建设 |
| 部分页面已有 canonical，已有 sitemap 和 robots | 逐页补齐并验证实际 HTTP 输出 |
| 页脚 Privacy / Terms 只是文字，存在待接入社交入口 | 增加实际政策页，移除无效入口 |
| 实际运行脚本为 Vinext / Vite，使用 Next 风格 App Router | 验证 SSR、metadata、路由及部署行为，不能只按 Next 标准行为推断 |

**素材已同步：**已执行 `git pull --ff-only`，实际 Git 仓库根目录为 `web/`，新素材位于 `web/public/raw/`。共有 25 张 PNG，分为 7 个目录；已制作联系表并逐图核对。图片为带 Jentoor 标识的包装视觉稿，不能据此认定为生产实拍、已上市产品或最终规格。

**产品资料缺口：**两份 `Jentoor_25款产品中英文目录 - 1.xlsx`、`- 2.xlsx` 均只有 2 字节换行内容，不是可读取的 Excel 工作簿。下文产品名称依据图上可见标签作为内部工作名；剂量、成分、认证和功效仍需正式产品资料支持。25 张图不等于 25 个独立 SKU，纤维咀嚼片和铁口溶膜存在相近版本。

现有网站写出的剂型数量、制造能力、认证及关联工厂关系，仅视作待业务复核的现有文案，不能因已上线便视为事实证明。

## 3. 目标客户与内容优先级

| 采购角色 | 首要问题 | 优先内容与行动 |
| --- | --- | --- |
| 品牌创始人 / 新产品负责人 | 可以做什么，如何开始？ | 产品目录、OEM / ODM 对比、需求引导 |
| 品牌采购 / 供应链 | 规格、起订、交期、稳定供货如何确认？ | 产品参数、报价条件、工厂与质量资料 |
| 配方 / 质量团队 | 原料、剂型、检测及文件是否适合项目？ | 配方开发流程、规格模板、质量证据 |
| 分销商 / 进口商 | 包装、目标市场资料、交付范围是什么？ | 包装选项、市场需求清单、批次与运输资料 |

先回答采购问题，再解释品牌理念。MOQ、交期、产能与价格只有业务确认后才展示数字；尚未确定时说明影响因素与询问方式。

## 4. 信息架构与 URL 归属

主导航建议：**Catalog · OEM / ODM · Manufacturing · Quality · Resources · About**。右侧固定 `Request a Quote`；Catalog 下拉同时提供按剂型、应用方向和包装浏览入口。

| 层级 | URL | 内容职责 | 上线顺序 |
| --- | --- | --- | --- |
| 首页 | `/` | 制造商定位、产品精选、信任证据、询盘入口 | P0 |
| 目录总览 | `/catalog` | 浏览全部已确认产品，搜索和筛选 | P0 |
| 剂型目录 | `/catalog/capsules`、`/catalog/powders` 等 | 聚合该剂型产品，并回答该剂型采购问题 | P0，先做素材最完整的类目 |
| 产品详情 | `/catalog/products/[slug]` | 单个产品 / 配方方向的图片、规格、可定制项 | P0，按资料完整度发布 |
| 应用总览 | `/solutions` | 按需求浏览营养方向 | P1 |
| 应用详情 | `/solutions/[application]` | 需求定义、剂型选择、关联产品与开发考虑 | P1 |
| 服务总览 | `/oem-odm` | OEM、ODM、Private Label 服务范围与流程 | P0，升级已有页 |
| 配方开发 | `/formulation` | 定制流程、输入资料、打样和验证 | P0，升级已有页 |
| 制造总览 | `/manufacturing` | 连接工厂、实验室、技术、包装 | P1 |
| 工厂 | `/factory` | 真实生产流程、场地、设备及关系说明 | P0，升级已有页 |
| 实验室 / 技术 | `/laboratory`、`/technology` | 分别介绍研发验证与制造工艺，避免重复 | P1 |
| 包装 | `/packaging` | 瓶、袋、条包等已确认能力及适配关系 | P1 |
| 质量 | `/quality` | 质量流程、检测、批次与资质总入口 | P0 |
| 认证证据 | `/quality/certifications` | 持证主体、地点、范围、有效期、核验链接 | P1 |
| 知识 | `/insights`、`/insights/[slug]` | 保留现有 URL，扩展采购问题内容 | P0 起持续更新 |
| FAQ | `/faq` | 按选型、报价、打样、质量、交付分组 | P0 |
| 公司 | `/about` | 公司身份、团队、供应商与生产主体关系 | P0 |
| 询盘 | `/contact` | 带入产品清单的真实需求提交 | P0 |
| 政策 | `/privacy`、`/terms` | 数据使用及网站使用条款 | P0 |

不要另起 `/products/capsules`、`/capsule-manufacturer` 等页面争夺同一剂型意图。首期由 `/catalog/capsules` 等剂型页同时承担产品列表与制造选型信息；只有明显不同的采购需求和足够原创内容时才拆分。

结合新素材，应用分类候选为 Daily Wellness、Beauty from Within、Digestive Health、Sports Nutrition、Relaxation & Sleep、Cognitive Support；纤维、胶原、谷氨酰胺及相关视觉稿提供选题线索，归类仍需配方核实。它们表示开发方向，不表示已经证明的产品功效。

## 5. 首页重构：产品成为第一视觉主角

| 顺序 | 模块 | 内容与视觉 | 下一步 |
| --- | --- | --- | --- |
| 1 | 首屏 | 已审核产品视觉稿组合主图 + 明确的 B2B 制造定位；减少悬浮参数与无依据数字 | `Explore Catalog` / `Discuss Your Project` |
| 2 | 精简信任条 | 可核实的供应商身份、制造范围、资质入口 | Quality / Factory |
| 3 | Featured Product Concepts | 建议 6–8 个素材最完整的无客户品牌产品卡 | 产品详情 / 全部目录 |
| 4 | Browse by Format | 有对应产品的剂型入口，用实物缩略图辅助识别 | 剂型目录 |
| 5 | Find Your Starting Point | 成熟基础方案、定制配方、已有规格生产三条路径 | OEM / ODM / Formulation |
| 6 | Application Directions | 4–6 个有产品支撑的需求方向 | Solutions |
| 7 | Packaging Options | 同一产品的包装选择及限制 | Packaging |
| 8 | Manufacturing Evidence | 一段重点工厂视频 + 工艺实拍和说明 | Factory |
| 9 | Quality You Can Verify | 文件、持证主体和范围摘要 | Quality |
| 10 | From Brief to Production | 需求、可行性、打样、批准、生产、交付 | Contact |
| 11 | Buyer Resources & FAQ | 3 篇选型指南 + 4–6 个采购问题 | Insights / FAQ |
| 12 | Inquiry | 真实提交入口，自动带入已选产品 | 提交后显示确认编号 |

英文首屏文案方向：

> **Supplement manufacturing, built around your product.**  
> Explore product concepts, dosage formats and packaging options for your next OEM or ODM project.

此为方向稿，正式文案须与实际服务范围一致。删除现有 `Build around an outcome, not a catalogue.`，避免与新目录方向冲突。将互动配方模块下移或融入选型流程，标明它是需求选择器，不展示虚构的实时研发计算结果。

视觉建议：延续 Jentoor 品牌色，使用浅色产品背景、深色制造证据区、稳定的图片比例及清晰参数排版。采用产品大图、细节图和少量真实场景交替，增加信息层次。3D 留作辅助体验，移动端及减少动态效果模式提供静态替代。

## 6. Catalog 的功能和页面模板

### 6.1 总览和分类页

Catalog 是可浏览、可选型、可询盘的 HTML 目录；PDF 作为后续补充下载格式。

- 一级浏览：剂型。二级筛选：应用方向、包装形式；原料筛选待信息完整后加入。
- 卡片字段：无客户品牌主图、清晰产品名称、内部产品编号、剂型、2–3 个已确认属性、`View Details`、`Add to Inquiry`。
- 支持关键词搜索、清空筛选、结果数、无结果建议和移动端筛选抽屉。
- 首期不加入零售购物车、库存倒计时、星级评分或无法兑现的价格。
- 多图展示以产品为单位；同一产品的多个拍摄角度不拆成多个 SKU。
- 分页提供真实链接；不能让更多产品只能通过滚动脚本发现。
- 资料不足的产品不生成空详情页；少量已确认内容可以先以非索引展示位呈现。

### 6.2 产品详情模板

1. 面包屑、通用品名、内部编号和状态说明，例如 `Customizable product concept`。
2. 主图、剂型特写、包装细节；有必要时明确标注示意图。
3. 直接说明该产品是什么、适合哪类开发需求。
4. 规格表：剂型、已确认原料、单位 / 每份规格、口味或外观、包装、保存要求、文件可用性。
5. 可定制内容：配方、口味、颜色、单位数、包装；区分可选项与尚需验证项。
6. MOQ 与交期：公布已批准范围，或写明决定条件和报价流程。
7. 项目流程与质量控制，链接对应工厂及资质范围。
8. 相关产品、适用包装、采购指南及 3–5 个专属 FAQ。
9. 固定询盘入口，将产品编号与 URL 带入表单；可加入多个产品。

不得从照片猜测毫克含量、有效成分、Vegan、Sugar-free、认证、保质期或具体功效。

### 6.3 产品数据结构

建议建立 `web/app/_catalog/data.ts` 和独立类型；后续需要后台时沿用字段迁移。

| 字段 | 用途 |
| --- | --- |
| `id`、`slug`、`name`、`status` | 稳定标识；草稿 / 已审核 / 已发布 |
| `format`、`applications`、`packagingOptions` | 分类和筛选关系 |
| `images[]` | 文件路径、alt、图注、原始素材引用、品牌清理状态 |
| `summary`、`specifications[]`、`customizationOptions[]` | 可见采购信息 |
| `moq`、`leadTime`、`samplePolicy` | 经确认的商业条件；允许为空 |
| `facilityRefs[]`、`evidenceRefs[]` | 关联真实生产主体和证据 |
| `relatedProductIds[]`、`guideSlugs[]` | 有意义的内部链接 |
| `seoTitle`、`seoDescription`、`updatedAt` | 页面信息和真实更新时间 |
| `reviewedBy`、`verifiedAt`、`sourceRefs[]` | 内部审核记录，不自动作为公开个人信息 |

首批目标是 6–12 个资料完整条目；目录展示覆盖已有素材的 7 类，分类页达到内容门槛后再逐批开放索引。宁可少而完整，也不批量发布相似占位页。

## 7. 新素材使用与去品牌化规则

### 7.1 素材接入流程

1. 已确认路径为 `web/public/raw`；按第 15 节清单补充正式产品编号、资料来源和审核状态。
2. 将图片分成产品主图、剂型细节、包装、工厂、证据文件五类，建立产品对应关系。
3. 逐张记录处理方式：直接使用、裁切、需去除客户标识、需要替换、不可公开。
4. 产品图输出统一背景和比例的网页衍生图；原始素材另存档。
5. 品牌标识处理仅用于产品 / 包装展示，不能改变证书持有人、签发主体或证书信息。
6. 若原始文件放在 `public/raw`，上线前移出公开静态目录；页面只引用审核后的衍生图。robots 不能代替文件访问控制。

建议建立 `docs/catalog-asset-manifest.csv`，字段为：`source_file, product_id, asset_type, visible_brand, treatment, output_path, homepage_slot, catalog_slug, review_status`。已核对的 25 张图及建议使用位置见第 15 节；正式产品编号须在去重和业务确认后填写。

建议网页资产位置：`web/public/catalog/[product-slug]/main.webp`、`detail.webp`、`packaging.webp`；CDN 可使用同一逻辑路径。

### 7.2 首页与 Catalog 的映射

| 素材 | 首页用途 | Catalog 用途 |
| --- | --- | --- |
| 多产品合照 | 首屏主视觉，先确认无客户标识 | 目录头图，可选 |
| 单产品主图 | 精选卡片 | 列表卡片与详情主图 |
| 剂型 / 原料细节 | 剂型入口 | 图集与对应说明 |
| 包装合照 | 包装模块 | 包装选项，不假定全部组合均可供应 |
| 工厂实拍 | 制造证据区 | 详情中的工艺关联链接 |

建议主图 4:5 或 1:1、卡片比例全站统一；大图提供响应式尺寸，首屏主图优先加载，其余延迟加载并声明尺寸。alt 描述真实内容，避免堆砌制造商关键词。

### 7.3 Bterlif 移除清单

- 删除 `web/app/site-chrome.tsx` 中 Case study 导航。
- 删除 `web/app/oem-odm/page.tsx` 中 Bterlif 链接，替换为相关目录或包装能力入口。
- 移除 `web/app/case-studies/bterlif/page.tsx` 的品牌案例、评价、外链与 metadata。
- 从 `web/app/sitemap.ts` 移除旧 URL；搜索页面、图注、alt、OG、结构化数据及构建产物中的残留。
- 旧案例没有等价新内容时返回 410，或框架易支持的真实 404；仅当替代页确实覆盖相同需求时才做 301。不要统一重定向首页。
- 若旧图片含客户标识，检查静态资产及 CDN 旧副本；删除页面不会自动删除公开文件。

这里执行的是本项目不公开客户品牌的定位要求，不将其扩展成所有 B2B 网站都不能展示客户案例的通则。

## 8. SEO：按采购意图建立主题结构

以下关键词是内容规划种子，没有经过搜索量与竞争度验证。上线前结合目标国家、搜索结果和后续 Search Console 查询修订，不能承诺排名。

| 主题 | 关键词方向 | 核心页面 | 支撑内容 |
| --- | --- | --- | --- |
| 制造商总意图 | supplement manufacturer, nutraceutical manufacturer | `/` | 公司、工厂、质量证据 |
| 浏览产品 | supplement product catalog | `/catalog` | 剂型分类和产品详情 |
| 剂型制造 | capsule supplement manufacturer, powder supplement manufacturer | 对应 `/catalog/[format]` | 规格、包装、开发问题与真实产品 |
| OEM / ODM | supplement OEM ODM, private label supplements | `/oem-odm` | 已有 OEM / ODM / Private Label 对比指南 |
| 定制开发 | custom supplement formulation | `/formulation` | 已有配方开发指南 |
| 工厂尽调 | supplement manufacturing facility | `/factory` | 工艺、设施及生产关系 |
| 质量验证 | supplement quality control, manufacturer qualification | `/quality` | 证据页、采购尽调指南 |
| 包装 | supplement packaging options | `/packaging` | 剂型与包装适配内容 |
| 商业条件 | supplement manufacturing MOQ, lead time | `/faq` 对应主题及后续独立指南 | 条件解释、需求清单 |
| 应用选型 | beauty supplement private label 等 | `/solutions/[application]` | 对应产品、剂型比较和开发边界 |

### 8.1 页面写作规范

- 一个页面一个主意图，主标题、开头摘要、参数表和 CTA 围绕同一采购任务。
- Title 模板可采用 `Capsule Supplement Manufacturing & Product Options | Jentoor`；不用每个标题都堆 OEM、ODM、factory、supplier。
- 开头先给出范围与答案，再展开工艺、证据和选择条件。
- FAQ 只回答该页相关问题；长答案链接专门指南，避免全站复制同一套文字。
- 品类页面必须有具体选型信息和对应产品，不能仅换分类名称。
- 内链使用明确文案，例如 `Compare capsule packaging options`，不要全用 `Learn more`。

### 8.2 既有内容复用与新增选题

保留以下既有 URL，补充审核日期、真实审阅者、可下载清单和相关产品链接：

- `/insights/oem-vs-odm-private-label`
- `/insights/questions-to-ask-supplement-manufacturer`
- `/insights/how-custom-supplement-formulation-works`
- `/insights/us-supplement-label-requirements`

优先新增：

| 选题 | 应解决的问题 | 商业页面连接 |
| --- | --- | --- |
| What determines supplement manufacturing MOQ? | 原料、工艺与包装为何影响 MOQ | OEM / ODM、Contact |
| Capsule vs powder: choosing a supplement format | 采购方如何比较剂型限制 | 两个剂型目录 |
| What information is needed for a supplement quote? | 提供哪些资料才能有效报价 | Contact |
| Supplement packaging selection checklist | 包装兼容、标签、运输信息 | Packaging |
| How to review a manufacturer’s quality documents | 核验持证主体、范围与文件 | Quality |
| From approved sample to production | 打样批准后仍有哪些交付环节 | Formulation、Factory |

这些是 Jentoor 自身的编辑规划。涉及监管、标签和健康表述的文章，发布前需重新查阅相应市场一手资料，并由合适人员审核；本方案不替代产品合规审查。

### 8.3 内链闭环

首页 → Catalog → 剂型页 → 产品详情 → 相关包装 / 质量 → 询盘。  
指南 → 相关剂型或服务 → 产品详情；产品详情 → 对应指南。  
About → 实际生产关系 → 工厂和认证；认证页反向说明适用主体与范围。

关键商业页从首页三次点击以内可达。面包屑、正文相关链接和导航都使用真实 URL，不能仅绑定 JavaScript 点击事件。

## 9. GEO：让采购答案可理解、可核实、可引用

Google 官方说明，AI 搜索展示沿用基础 SEO 条件，无需专门的 AI schema 或文本文件，也不保证抓取、收录或引用。因此首期将资源投入公开 HTML、独特资料与证据关系。[Google：AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)

### 9.1 建立一致的企业事实

在 About、Contact、Quality 和全站企业数据中统一 Jentoor 名称、官网、实际联系方式和已确认业务范围。清楚解释网站品牌、签约主体、生产设施、持证主体之间的关系；不得因展示某个工厂证书就将其认证归于 Jentoor 所有业务。

公开证据卡建议包含：证书名称、主体、地点、范围、签发方、有效期、记录链接、核验日期。只有内部完成核验才显示“已核验”。

### 9.2 采购答案模板

每个重点问题用以下结构形成可独立阅读的内容块，篇幅由问题复杂度决定：

1. 直接答案：用两三句话说明结论。
2. 适用条件：剂型、包装、订单范围或目标市场。
3. 依据：可公开的流程、表格、文件或一手来源。
4. 不确定项：需要确认的信息及下一步。
5. 关联入口：对应产品、服务或询盘。

示例问题：`What determines the MOQ for a custom supplement?`

示例答案方向：MOQ 需要结合原料采购、选定生产过程和包装配置评估。采购方应提交剂型、配方或目标、包装和预计数量，才能获得对应报价。此处没有统一的已核实 Jentoor 数值，因此不能填入固定数字。

### 9.3 优先沉淀的原创资料

- 剂型 × 包装适配矩阵，明确已提供、需评估和未提供。
- 询盘所需字段清单及空白规格模板。
- 去除客户信息的质量文件结构说明，不伪造检测结果。
- 制造步骤实拍、对应字幕与正文工艺解释。
- 有实际审核记录的采购比较表与 FAQ。

### 9.4 结构化数据选择

| 页面 | 建议类型 | 使用约束 |
| --- | --- | --- |
| 首页 / 公司 | `Organization`、`WebSite` | 仅使用已核实企业数据与官方账号 |
| 目录 | `CollectionPage`、`ItemList` | 项目与可见列表一致，不承诺富结果 |
| 内页 | `BreadcrumbList` | 与可见面包屑一致 |
| 制造服务 | `Service` | 表达实际范围，不暗示特定 Google 富结果资格 |
| 产品详情 | 可选 `Product` | 仅适用于具体产品，不能把抽象服务当产品；无真实报价或评价就不编造 |
| 指南 | `Article` | 真实作者 / 审阅信息、日期和正文一致 |

Google 产品摘要富结果有独立的必需字段条件；本项目询价制页面若缺乏所需报价或评价信息，不以通过产品富结果校验为目标，也不填 `$0`、假库存或虚构星级。[Google：Product snippet](https://developers.google.com/search/docs/appearance/structured-data/product-snippet)

**更新提醒：**Google 已宣布自 2026-05-07 起不再展示 FAQ 富结果，6 月移除了相关文档。因此保留 FAQ 的采购价值，但不把 FAQ schema 作为搜索结果扩展策略。`llms.txt` 不列为首期任务；Google 明确其不会正面或负面影响 Google 搜索可见性与排名。[Google 文档更新记录](https://developers.google.com/search/updates)

### 9.5 引用与效果观测

维护 15–20 个固定采购问题，覆盖找供应商、选剂型、包装、MOQ、质量文件和询盘资料。每月记录测试平台、日期、地区、提问原文、是否提及 Jentoor、是否引用具体 URL，以及事实是否准确。单次回答波动不作为排名指标。

在可用账户中查看 Bing Webmaster Tools 的 AI Performance 引用与查询信息，结合实际询盘判断内容价值。[Bing：AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)

## 10. 技术 SEO 与体验要求

以下是本项目工程验收建议，实施时需在当前 Vinext 部署环境验证。

| 项目 | 实施要求 |
| --- | --- |
| 可读 HTML | 产品名、规格、图片说明、主体内容和内链在初始 HTML 中可见；3D 与筛选为增强功能 |
| Metadata | 每个公开页面独立 title、description、canonical、OG；文章使用适当的文章 metadata |
| 域名 | 统一 HTTPS 和首选主机；核查现有 Nginx 配置中的 HTTP / www 是否产生重复入口 |
| Sitemap | 仅列 200、可索引、规范 URL；按实际编辑日期更新 lastModified |
| 草稿 / 工具页 | 审查 `/scene-studio`，开发展示页不进入 sitemap，必要时 noindex 或限制公开访问 |
| 过滤参数 | 首期普通交互状态不主动生成海量索引 URL；若使用参数 URL，定义规范化、noindex 与可抓取策略 |
| 分页 | 有独立内容的分页采用各自 canonical 和真实链接，不全部 canonical 到第一页 |
| 无结果 / 失效 | 提供有帮助的空态；不存在的产品返回真实 404，避免 soft 404 |
| robots 与 CDN | 核验公开页面和所需资源可抓取；让需读取 noindex 的页面可被抓取，不能同时一律 robots 屏蔽 |
| 结构化数据 | 与可见信息共用数据源，进行语法和适用性验证 |
| 图像 | 响应式尺寸、WebP / AVIF 衍生图、固定宽高、首屏优先、其他延迟加载 |
| 视频 / 3D | 重点视频提供 poster；非首屏按需加载；尊重减少动态效果设置 |
| 移动端 | 产品列表易浏览，筛选键盘可用，CTA 不遮挡正文，表单错误可读 |
| 真实页面验证 | 构建通过后检查返回 HTML、状态码、canonical、sitemap 和线上 URL Inspection |

服务端输出能够降低对爬虫 JavaScript 渲染能力的依赖；Google 也建议考虑服务端渲染或预渲染，且并非所有机器人都运行 JavaScript。[Google：JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

性能验收预算建议：移动端主要页面争取 LCP ≤ 2.5 秒、INP ≤ 200 毫秒、CLS ≤ 0.1；这是目标，不是当前实测。上线前做实验室测试，上线后用真实用户数据复核；不要只用 Lighthouse 总分判断体验。

国际化先完成英文主站。若后续新增语言，使用明确的语言路径、自身 canonical、互相对应的 hreflang 和人工审核内容；不按 IP 强制跳转，不批量复制“国家 + 制造商”门页。

## 11. 询盘与转化闭环

### 11.1 推荐流程

`Add to Inquiry → Inquiry List → Project Details → Submit → Confirmation`。

选中产品保存在本地状态，允许删除、备注及多产品需求；进入表单时展示选中产品的编号、名称和来源 URL。

首步必填：姓名、邮箱、公司 / 项目名、目标市场、需求简述。剂型、预估数量可预填，并允许 `Not sure yet`。包装、目标时间、预算和附件作为第二步或可选字段，降低首次提交成本。

正式接入前需取得真实接收邮箱或 CRM 配置。服务端校验、基础反垃圾、提交限流、成功 / 失败回执、错误重试及去重同时交付；只能在后端确认接收后显示成功。WhatsApp 或邮箱入口必须来自已确认联系方式。

### 11.2 数据与运营

建议事件：`catalog_view`、`catalog_filter`、`product_view`、`add_to_inquiry`、`inquiry_start`、`inquiry_submit_success`、`inquiry_submit_error`、`document_download`。

只记录必要的产品 / 页面维度和匿名漏斗数据；邮箱、电话、需求正文不作为分析事件属性。服务端接收成功数与 CRM 线索数定期核对，避免把点击提交当成真实询盘。

有效询盘定义由销售确认，建议至少具备可联系信息及明确的产品 / 制造需求。进一步跟踪：有效询盘 → 规格沟通 → 报价 → 打样 → 成交。响应时效仅在团队能兑现时公开。

## 12. 分阶段实施计划

以下为建议排期，前提是素材与业务资料可及时提供；不是交付承诺。

| 阶段 | 工作 | 交付 / 完成条件 |
| --- | --- | --- |
| P0-A：资料与结构，约 2–3 工作日 | 基于已拉取素材完成去重、产品及资质核验、确认接收端 | 素材清单、首批产品表、明确 URL 结构 |
| P0-B：核心改版，约 5–8 工作日 | 首页、Catalog、分类 / 详情、导航、去品牌、询盘、政策和公司信息 | 完整浏览至提交闭环；Bterlif 清理完成 |
| P0-C：上线检查，约 2–3 工作日 | 运行构建、移动端、HTTP / SEO、性能与提交验证 | 验收通过后发布，建立分析基线 |
| P1：内容扩充，约 2–3 周 | 应用、包装、制造与证据页、首批指南 | 每个页面有独立价值、审核记录及内链 |
| P2：持续优化，每月 | 基于查询与询盘扩产品、更新内容、观察 AI 引用 | 优先修正低转化节点与内容缺口 |

首批建议覆盖首页、目录总览、7 类目录入口及分批完成的剂型页、6–12 个产品详情，以及现有服务 / 证据内容升级和询盘基础页。应用页数量和产品页数量服从资料完整度。

技术落点：

- `web/app/page.tsx`：首页信息顺序、产品精选与询盘入口。
- `web/app/site-chrome.tsx`：主导航、页脚及移动端入口。
- `web/app/catalog/`、`web/app/_catalog/`：目录路由、类型、产品数据与复用组件。
- `web/app/contact/` 及适配当前运行时的提交处理：真实询盘。
- `web/app/layout.tsx`、`web/app/sitemap.ts`、`web/app/robots.ts`：共享 SEO 和索引规则。
- `web/app/oem-odm/page.tsx` 与旧案例路由：去品牌及迁移处理。
- `web/app/insights/`、`web/app/_knowledge/`：复用并扩展现有采购内容。
- 部署层：首选主机跳转、静态素材缓存、旧案例状态码与 CDN 清理。

## 13. 发布验收清单

### 内容与目录

- [ ] 首页已审核产品图片可见，能进入独立 Catalog 和具体详情。
- [ ] 每个发布产品都有已审核图片、说明、基础规格与询盘标识。
- [ ] 无 Bterlif 名称、客户品牌图案、评价、外链及关联 metadata 残留。
- [ ] 原始未处理素材未随 public 目录公开发布。
- [ ] 分类、筛选、分页、无结果状态与移动端操作可用。
- [ ] 产品 / 资质 / 工厂关系有依据，未知信息未被填成确定事实。

### 转化

- [ ] 至少完成一次授权测试提交并验证后端与接收端记录。
- [ ] 成功、失败、重复提交和重试行为正确。
- [ ] 隐私与条款页面有真实内容和有效链接。
- [ ] 统计不包含询盘正文及个人联系方式。

### 搜索与工程

- [ ] 核心页面标题、正文、参数与内链存在于返回 HTML。
- [ ] Metadata、canonical、OG 和结构化数据与页面一致。
- [ ] Sitemap 仅包含正式规范页面，旧案例返回预定状态码。
- [ ] 筛选、分页、开发页、草稿和原始素材的索引策略已验证。
- [ ] 构建、现有 lint 及必要的目录 / 表单行为测试通过，记录未解决问题。
- [ ] 桌面及移动端没有图片比例错乱、内容遮挡或明显布局跳动。
- [ ] 上线后核对抓取、404、真实询盘和漏斗数据。

## 14. 待补资料与衡量方式

必须补齐：有效的中英文产品目录工作簿、首批产品资料、可公开素材范围、制造及持证主体关系、真实接收邮箱 / CRM、公司联系方式。首期可暂不公布但需后续确认：MOQ 数值、交期区间、样品政策、可公开产能、目标市场优先级。

上线后前 30 天建立基线，随后按月比较：非品牌自然搜索点击、有效收录商业页、产品到询盘启动率、成功提交率、有效询盘率、进入报价或打样的比例。按来源和落地页分组，避免流量增加掩盖商机质量下降。

GEO 同时记录“提及”和“带链接引用”，并追踪被引用页面是否事实准确。归因有缺失和波动，不能把所有直接访问当作 AI 来源，也不保证固定时间内获得引用。

建议执行起点：先完成素材盘点和首批产品记录，再让首页、Catalog 与真实询盘一起上线；后续以采购问题及实际商机持续扩充内容。


## 15. 本次 raw 素材的具体落位方案

### 15.1 七类目录与上线顺序

| 原始目录 | 图片数 | 英文类目 | 建议 URL | 使用判断 |
| --- | ---: | --- | --- | --- |
| 软糖 | 4 | Gummies | `/catalog/gummies` | 产品视觉差异明显，作为首页重点 |
| 滴剂 | 4 | Liquid Drops | `/catalog/liquid-drops` | 突出滴管包装；不泛化成所有液体能力 |
| 软胶囊 | 4 | Softgels | `/catalog/softgels` | 核实每张图实际剂型，包装标签不完全一致 |
| 口溶膜 | 4 | Oral Dissolving Films | `/catalog/oral-dissolving-films` | 铁相关三张先按相近方案处理 |
| 粉剂 | 4 | Powders | `/catalog/powders` | 袋装和罐装可连接包装能力模块 |
| 硬胶囊 | 1 | Capsules | `/catalog/capsules` | 单个镁胶囊视觉稿，不虚构更多产品 |
| 咀嚼片 | 4 | Chewable Tablets | `/catalog/chewable-tablets` | 两张 Daily Fiber 先去重 |

现有首页的 Tablets、Lozenges 没有对应本批目录素材，保留为待核实能力时要与实际目录分开，不生成空产品分类。硬胶囊仅一个视觉稿仍可有导航入口；若独立分类页面没有足够选型信息，先使用目录筛选，不急于索引薄内容。

### 15.2 逐图映射

以下文件名均带前缀 `Codex 图像 2026年9月8日 `，表中保留时间后缀。内部图号仅用于素材盘点，不是 SKU。名称来自可见包装文字，全部为待确认工作名；不得把图片上的数字、标章或作用描述直接写入可检索产品属性。

| 图号 | 原目录 / 文件后缀 | 可见产品方向 | 首页建议 | Catalog 建议及审核点 |
| --- | --- | --- | --- | --- |
| 01 | 口溶膜 / 16_56_38.png | Iron + Folic Acid | 备选 | 铁 / 叶酸口溶膜方案；与 02、04 规格关系待核实 |
| 02 | 口溶膜 / 16_56_42.png | Iron Melts | 口溶膜类目封面 | 铁口溶膜方案的包装备选 |
| 03 | 口溶膜 / 16_56_45.png | Liposomal Glutathione | 首屏组合 / 精选 | 谷胱甘肽口溶膜候选；技术及含量需核实 |
| 04 | 口溶膜 / 16_56_49.png | Iron + Folate | 不重复首屏 | 与 01、02 对照，不预设是独立产品 |
| 05 | 咀嚼片 / 16_57_51.png | Daily Fiber | 备选 | 与 06 近似，优先合并为同一方案素材 |
| 06 | 咀嚼片 / 16_57_57.png | Daily Fiber | 咀嚼片类目 / 精选 | 标称 Sugar-free 等属性需审核 |
| 07 | 咀嚼片 / 16_58_00.png | Prebiotic Fiber | 包装变体 | 纤维方案，确认与 05、06 的配方关系 |
| 08 | 咀嚼片 / 16_58_04.png | Vitamin C | 精选备选 | 维生素 C 咀嚼片候选 |
| 09 | 滴剂 / 16_55_33.png | Magnesium Calcium Zinc | 滴剂类目 / 首屏组合 | 双瓶视觉只代表构图，不认定双瓶包装规格 |
| 10 | 滴剂 / 16_55_41.png | Cortisol Balance | 暂不精选 | 暂用中性开发方向说明，先核实标签主张 |
| 11 | 滴剂 / 16_55_44.png | Trace Mineral Drops | 精选备选 | 矿物质滴剂候选，原料细节待核实 |
| 12 | 滴剂 / 16_55_47.png | Cayenne Pepper Liquid Drops | 目录补充 | 植物配方滴剂候选，复方成分待核实 |
| 13 | 硬胶囊 / 16_57_28.png | Magnesium Glycinate | 胶囊类目 / 精选 | 单个硬胶囊方案；核实标签剂量定义 |
| 14 | 粉剂 / 16_56_58.png | Collagen Peptides | 首屏组合 / 粉剂封面 | 袋装胶原粉候选，来源与规格待核实 |
| 15 | 粉剂 / 16_57_02.png | L-Glutamine Powder | 精选 | 罐装运动营养方向；不推断实际每份规格 |
| 16 | 粉剂 / 16_57_05.png | Beet Root Powder | 包装模块 | 袋装植物粉候选，Organic 等标签需依据 |
| 17 | 粉剂 / 16_57_09.png | Super Greens | 应用模块备选 | 复合植物粉方向，原料数量与属性需核实 |
| 18 | 软糖 / 16_29_07.png | Collagen Gummies | 首屏组合 / 软糖封面 | 胶原软糖候选，图为竖幅，保留瓶身完整 |
| 19 | 软糖 / 16_29_13.png | Fish Oil Gummies | 目录补充 | 鱼油软糖候选，核实原料来源及含量 |
| 20 | 软糖 / 16_29_17.png | Elderberry Gummies | 精选备选 | 接骨木莓软糖方向，功效文字待审核 |
| 21 | 软糖 / 16_29_21.png | Ashwagandha Gummies | 应用模块备选 | 放松方向候选，图上的商标原料文字需核实 |
| 22 | 软胶囊 / 16_56_13.png | Turmeric + Ginger | 类目备选 | 原目录为软胶囊，核实实际产品形式 |
| 23 | 软胶囊 / 16_56_16.png | Saffron Extract | 暂不精选 | 标签为 Softgels；与实际产品资料核对 |
| 24 | 软胶囊 / 16_56_20.png | Memory IQ | 暂不精选 | 名称不揭示配方，核实后使用通用描述 |
| 25 | 软胶囊 / 16_56_23.png | Pumpkin Seed Oil | 软胶囊类目 / 精选 | 南瓜籽油软胶囊候选，剂量及认证待核实 |

建议首屏从 03、09、14、18 中选 3–4 张构成有高低层次的组合；精选区覆盖 7 类，以 06、09、13、14、18、25、03 为初始候选，可增加 15 作为第八张。发布前根据规格和视觉审核结果替换，不在首页集中展示重复铁剂或纤维包装。

### 15.3 素材特有的设计与内容注意点

- 25 张图中多数为方形，软糖为 1024 × 1536 竖图；卡片统一画布并采用 contain，避免裁掉瓶盖、包装底部或标签。不要简单强制 cover。
- 图片可见 Jentoor 自有标识，符合供应商自身识别方向。Bterlif 清理与这批 Jentoor 图片分别处理；不需要把 Jentoor 标识全部抹除。
- 当前页面 logo 与新包装 logo 的视觉不完全一致，正式改版需统一品牌资产规范；先确定使用哪个供应商标识版本，再处理图片和页头。
- 文件名含 Codex，但不能仅凭文件名断言生成来源；发布时按产品视觉稿管理，不称为现场实拍或已交付客户案例。
- 标签里的疗效方向、Sugar-free、Organic、原料商标和定量内容仍是可见营销信息；仅在正文增加“待核实”不能解决图片本身的问题。未审核通过的图先更换为中性标签视觉或暂缓公开。
- 即使移出 public，原始文件仍可能保留在 Git 历史中；本计划的移出操作解决网站静态公开路径，不代表清除了仓库历史。

### 15.4 更新后的资料状态

已完成：GitHub 同步、7 类素材识别、25 张图初步映射、首页候选选择、现有网站结构核查、SEO / GEO 方案。

待补齐：真正可读的 25 款产品中英文目录、同款 / 变体关系、正式产品编号、实际规格、服务范围与询盘接收端。产品目录资料缺失不影响本方案完成，但影响后续正式产品页面的发布。
