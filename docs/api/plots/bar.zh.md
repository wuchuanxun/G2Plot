---
title: 条形图
order: 3
---

### 图表容器

`markdown:docs/common/chart-options.zh.md`

### 数据映射

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.zh.md`

#### seriesField

<description>**optional** _string_</description>

拆分字段，在分组条形图下同 groupField、colorField，在堆积条形图下同 stackField、colorField。

#### groupField

<description>**optional** _string_</description>

拆分字段，用于堆叠分组条形图，拆分优先级高于 seriesField，isGroup: true 时会根据 groupField 进行分组。

#### isGroup

<description>**optional** _boolean_</description>

是否分组柱形图。

#### isStack

<description>**optional** _boolean_</description>

是否堆积条形图。

#### isRange

<description>**optional** _boolean_</description>

是否区间条形图。

#### isPercent

<description>**optional** _boolean_</description>

是否百分比条形图，isPercent 为 true 时，isStack 也需要为 true。

`markdown:docs/common/meta.zh.md`

### 图形样式

#### barWidthRatio

<description>**optional** _number_</description>

条形图宽度占比 [0-1]。

#### minBarWidth

<description>**optional** _number_</description>

条形图最小宽度设置，像素值。

#### maxBarWidth

<description>**optional** _number_</description>

条形图最大宽度设置，像素值。
#### marginRatio

<description>**optional** _number_</description>

分组中柱子之间的间距 [0-1]，仅对分组条形图适用。

#### barStyle

<description>**optional** _StyleAttr | Function_</description>

柱子样式配置。

`markdown:docs/common/shape-style.zh.md`

`markdown:docs/common/color.zh.md`

### 图表组件

`markdown:docs/common/component.zh.md`

#### 滚动条

`markdown:docs/common/slider.zh.md`

#### 转化率

`markdown:docs/common/conversion-tag.zh.md`

#### 联通对比区域

`markdown:docs/common/connected-area.zh.md`

### 事件

`markdown:docs/common/events.zh.md`

### 图表方法

`markdown:docs/common/chart-methods.zh.md`



### 图表主题

`markdown:docs/common/theme.zh.md`
