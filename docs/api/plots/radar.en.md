---
title: Radar
order: 7
---

### Plot Container

`markdown:docs/common/chart-options.en.md`

### Data Mapping

#### data

<description>**required** _array object_</description>

设置图表数据源。数据源为对象集合，例如：`[{ time: '1991'，value: 20 }, { time: '1992'，value: 20 }]`。

`markdown:docs/common/meta.en.md`

```ts
const data = [
  { item: 'Design', score: 70 },
  { item: 'Development', score: 60 },
  { item: 'Marketing', score: 40 },
  { item: 'Technology', score: 30 },
];

const radarPlot = new Radar('container', {
  data,
  xField: 'item',
  yField: 'score',
  meta: {
    score: {
      alias: '分数',
    },
  },
  yAxis: {
    grid: {
      alternateColor: ['rgba(0, 0, 0, 0.04)', null],
    },
  },
  point: {},
});
radarPlot.render();
```

#### xField 

<description>**required** _string_</description>

雷达图映射到圆周角度所对应的字段，一般为一个分类字段。

#### yField 

<description>**required** _string_</description>

雷达图映射到半径所对应的字段，一般为一个连续字段。

#### seriesField 

<description>**required** _string_</description>

对雷达图进行分组的字段，一般对应一个分类字段。通过该字段的值，雷达图将会被分为多个组，通过颜色进行区分，并上下重叠。

### Geometry Style

#### radius 

<description>**optional** _number_</description>

雷达图的半径，原点为绘图区域中心（不包含图表组件区域）。配置值域为 (0,1]，1 代表撑满绘图区域。

`markdown:docs/common/color.en.md`

#### smooth 

<description>**optional** _boolean_ _default:_ `false`</description>

是否以曲线的形态绘制 (spline)。

#### lineStyle 

<description>**optional** _object ｜ Function_</description>

配置雷达图上的折线样式，也可以通过回调函数的方法根据对应的数据进行设置，返回参数是通用的 ShapeStyle 对象

`markdown:docs/common/shape-style.en.md`

使用示例：

```ts
{
  lineStyle: (x, y, series) => {
    return {
      stroke: series === 'a' ? 'red' : 'yellow',
      lineWidth: 3,
    };
  };
}
```

#### point 

<description>**optional** _object_</description>

配置雷达图上的点

`markdown:docs/common/point-style.en.md`

#### area 

<description>**optional** _object_</description>

配置雷达图上的面积填充

| 细分配置 | 类型      | 功能描述   |
| -------- | --------- | ---------- |
| smooth   | _boolean_ | 是否平滑   |
| color    | _string \| string[] \| Function_ | 填充面积颜色，也可以支持回调的方式设置，回调参数为 `color: (x, y, series) => string` |
| style    | _object \| Function_ | 填充面积样式，也可以支持回调的方式设置，回调参数为 `style: (x, y, series) => object` |

使用示例：

```ts
{
  area: {
    style: (x, y, series) => {
      return {
        fill: series === 'a' ? 'red' : 'yellow'
      }
    },
  },
}
```

### Plot Components

<img src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*KnguSICzqXEAAAAAAAAAAAAAARQnAQ" alt="雷达图 图表组件" width="600">

`markdown:docs/common/component.en.md`

### Event

`markdown:docs/common/events.en.md`

### Plot Method

`markdown:docs/common/chart-methods.en.md`

### Plot Theme

`markdown:docs/common/theme.en.md`
