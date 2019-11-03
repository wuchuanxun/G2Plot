import EventEmitter from '@antv/event-emitter';
import { BBox, Canvas, Group } from '@antv/g';
import * as _ from '@antv/util';
import { Point } from '../interface/config';

export interface LayerCfg {
  id?: string;
  /** the top-left-x of layer, local position relative to the parent layer */
  x: number;
  /** the top-left-y of layer, local position telative to the parent layer */
  y: number;
  /** layer width */
  width?: number;
  /** layer height */
  height?: number;
  /** the parent node of layer */
  parent?: any;
  canvas: Canvas;
}

export interface Region {
  /** the top-left corner of layer-range, range from 0 to 1, relative to parent layer's range */
  readonly start: Point;
  /** the bottom-right corner of layer-range, range from 0 to 1, relative to parent layer's range */
  readonly end: Point;
}

export interface Range {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default class Layer<T = void> extends EventEmitter {
  public id: string;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public parent: Layer;
  public canvas: Canvas;
  public layerBBox: BBox;
  public layers: Layer[] = [];
  public container: Group;
  public destroyed: boolean = false;
  protected visibility: boolean = true;
  protected layerRegion: Region;

  /**
   * layer base for g2plot
   */
  constructor(props: LayerCfg) {
    super();
    const options = this.getOptions(props);
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.canvas = options.canvas;
    this.parent = options.parent;
  }

  /**
   * init life cycle
   */
  public init() {
    this.layerBBox = this.getLayerBBox();
    this.layerRegion = this.getLayerRegion();
    if (this.parent) {
      this.container = this.parent.container.addGroup();
    } else {
      this.container = this.canvas.addGroup();
    }
    this.container.transform([['t', this.x, this.y]]);
    this.eachLayer((layer) => {
      layer.init();
    });
  }

  /**
   * render layer recursively
   */
  public render() {
    this.init();
    this.eachLayer((layer) => {
      layer.render();
    });
    this.canvas.draw();
  }

  /**
   * clear layer content
   */
  public clear() {
    this.eachLayer((layer) => {
      layer.destory();
    });
    this.layers = [];
    this.container.clear();
  }

  /**
   * destory layer recursively, remove the container of layer
   */
  public destroy() {
    this.eachLayer((layer) => {
      layer.destroy();
    });
    this.container.remove(true);
    this.destroyed = true;
  }

  /**
   * display layer
   */
  public show() {
    this.container.set('visible', true);
    this.visibility = true;
  }

  /**
   * hide layer
   */
  public hide() {
    this.container.set('visible', false);
    this.visibility = false;
  }

  /**
   * add children layer
   * @param layer
   */
  public addLayer(layer: Layer) {
    const idx = _.findIndex(this.layers, (item) => item === layer);
    if (idx < 0) {
      layer.parent = this;
      layer.init();
      this.layers.push(layer);
    }
  }

  /**
   * remove children layer
   * @param layer
   */
  public removeLayer(layer: Layer) {
    const idx = _.findIndex(this.layers, (item) => item === layer);
    if (idx >= 0) {
      this.layers.splice(idx, 1);
    }
  }

  /**
   * update layer's display range
   * @param props
   * @param recursive whether update children layers or not
   */
  public updateBBox(props: Range, recursive: boolean = false) {
    const originRange = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
    const newRange = _.deepMix({}, originRange, props);
    this.x = newRange.x;
    this.y = newRange.y;
    this.width = newRange.width;
    this.height = newRange.height;
    this.layerBBox = this.getLayerBBox();
    this.layerRegion = this.getLayerRegion();
    this.render();
    if (recursive) {
      this.eachLayer((layer) => {
        layer.updateBBoxByParent();
        layer.render();
      });
    }
    this.canvas.draw();
  }

  /**
   * update display range according to parent layer's range
   */
  public updateBBoxByParent() {
    const region = this.layerRegion;
    this.x = this.parent.x + this.parent.width * region.start.x;
    this.y = this.parent.y + this.parent.height * region.start.y;
    this.width = this.parent.width * (region.end.x - region.start.x);
    this.height = this.parent.height * (region.end.y - region.start.y);
    this.layerBBox = this.getLayerBBox();
  }

  /**
   * get global postion of layer
   */
  public getGlobalPosition() {
    let globalX = this.x;
    let globalY = this.y;
    let parent = this.parent;
    while (parent) {
      globalX += parent.x;
      globalY += parent.y;
      parent = parent.parent;
    }
    return { x: globalX, y: globalY };
  }

  public getOptions(props: LayerCfg) {
    let parentWidth = 0;
    let parentHeight = 0;
    if (props.parent) {
      parentWidth = props.parent.width;
      parentHeight = props.parent.height;
    }
    const defaultOptions = {
      x: 0,
      y: 0,
      width: parentWidth,
      height: parentHeight,
    };

    return _.deepMix({}, defaultOptions, props);
  }

  private getLayerBBox() {
    return new BBox(this.x, this.y, this.width, this.height);
  }

  private getLayerRegion() {
    if (this.parent) {
      const parentWidth = this.parent.width;
      const parentHeight = this.parent.height;
      const parentX = this.parent.x;
      const parentY = this.parent.y;
      const startX = (this.x - parentX) / parentWidth;
      const startY = (this.y - parentY) / parentHeight;
      const endX = (this.x + this.width - parentX) / parentWidth;
      const endY = (this.y + this.height - parentY) / parentHeight;
      return { start: { x: startX, y: startY }, end: { x: endX, y: endY } };
    }

    return { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } };
  }

  private eachLayer(cb: (layer) => void) {
    _.each(this.layers, cb);
  }
}
