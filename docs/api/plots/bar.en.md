---
title: Bar
order: 3
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

Configure the data source. The data source is a collection of objects. For example:`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/xy-field.en.md`

#### seriesField

<description>**optional** _string_</description>

Grouping field. It is the same meaning as groupField、colorField in Grouped Bar, and the same as stackField、colorField in Stacked Bar.

#### groupField

<description>**optional** _string_</description>

Grouping field for Stacked Bar and Grouped Bar. Its priority is higher than seriesField. When isGroup is `true`, the data will be grouped by `groupField`.

#### isGroup

<description>**optional** _boolean_</description>

Whether the plot is Grouped Bar.

#### isStack

<description>**optional** _boolean_</description>

Whether the plot is Stacked Bar.

#### isRange

<description>**optional** _boolean_</description>

Whether the plot is Range Bar.

#### isPercent

<description>**optional** _boolean_</description>

Whether the plot is Percent Bar. When isPercent is `true`, isStack must be `true`.

`markdown:docs/common/meta.en.md`

### Graphic Style

#### barWidthRatio

<description>**optional** _number_</description>

The ratio of bar width( Range:[0-1] ).

#### minBarWidth

<description>**optional** _number_</description>

The min width of bar, pixel value。

#### maxBarWidth

<description>**optional** _number_</description>

The max width of bar, pixel value。

#### marginRatio

<description>**optional** _number_</description>

The ratio of spacing between columns in groups( Range:[0-1] ), only for Grouped Bar.

#### barStyle

<description>**optional** _StyleAttr | Function_</description>

Bar graphic Style.

`markdown:docs/common/shape-style.en.md`

`markdown:docs/common/color.en.md`

### Plot Components

`markdown:docs/common/component.en.md`

#### Conversion Tag

`markdown:docs/common/conversion-tag.en.md`

#### Connected Area

`markdown:docs/common/connected-area.en.md`

### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
