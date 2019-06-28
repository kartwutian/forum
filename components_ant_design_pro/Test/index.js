/* eslint-disable */
import React, {Fragment, PureComponent} from 'react';
import {
  DATA_TYPE_TO_URL,
  REST_LAYERS,
} from './utils/utils';
import originResult from './utils/originResult';

import styles from './index.less';
// import {SuperMap} from '@supermap/iclient-leaflet'
import './utils/iclient9.1.1-leaflet';

export default
class Page extends PureComponent {
  constructor(props) {
    super(props);
    this.state={
      open: false,
    };
    this.dispatch = props.dispatch;
    this.layers = {}; // 存放rest layer
    this.markerLayers = []; // 存放markerLayers
    this.geoJsonLayers = []; // 存放geoJsonLayers
    this.map = {};
    this.LeafIcon = L.Icon.extend({
      options: {
        iconSize:     [24, 32],
        iconAnchor:   [12, 32],
        popupAnchor:  [0, -32]
      }
    });
    this.mapInitCenter = '';
    this.mapInitZoom = '';
  }

  componentDidMount() {
    this.init();
  };

  init() {
    var _this = this;
    var map;
    var visableResolution = [1.4062506039212765, 0.7031253019606383, 0.35156265098031914, 0.17578132549015957, 0.08789066274507978, 0.04394533137253989, 0.021972665686269946, 0.010986332843136165, 0.005493166421566894, 0.002746583210784635, 0.0013732916053923174, 6.866458026961587E-4, 3.4332290134807936E-4, 1.7166145067403968E-4, 8.583072533583146E-5, 4.291536266910412E-5, 2.145768133455206E-5, 1.072884066727603E-5, 5.364420333638015E-6, 2.6822101668190073E-6, 1.3411050834095037E-6];
    var lon = 0, lat = 0;

    loadMap();

    function loadMap() {
      var mapcrs = L.CRS.EPSG3857;

      var maxZoom = 18;
      var zoom = 0;
      // 坐标转换
      if (originResult.prjCoordSys) {
        var resolution;
        if (originResult.prjCoordSys.coordUnit) {
          resolution = scaleToResolution(originResult.scale, 96, originResult.prjCoordSys.coordUnit);
        }
        if (resolution) {
          var temp;
          for (var j = 0; j < visableResolution.length; j++) {
            if (j === 0) {
              temp = Math.abs(resolution - visableResolution[j]);
            }
            if (temp > Math.abs(resolution - visableResolution[j])) {
              temp = Math.abs(resolution - visableResolution[j]);
              zoom = j;
            }
          }
        }
        if (originResult.prjCoordSys.epsgCode.toString() === "4326" || originResult.prjCoordSys.type === "PCS_EARTH_LONGITUDE_LATITUDE") {
          lon = (originResult.bounds.left + originResult.bounds.right) / 2;
          lat = (originResult.bounds.bottom + originResult.bounds.top) / 2;
          if (visableResolution.length > 0) {
            mapcrs = getCRS("EPSG:4326", originResult.bounds, visableResolution);
          } else {
            mapcrs = getCRS("EPSG:4326", originResult.bounds);
          }
        } else if (originResult.prjCoordSys.type === "PCS_NON_EARTH") {
          mapcrs = L.CRS.NonEarthCRS({
            bounds: L.bounds([originResult.bounds.left, originResult.bounds.bottom], [originResult.bounds.right, originResult.bounds.top]),
            origin: L.point(originResult.bounds.left, originResult.bounds.top)
          });
        } else {
          if (visableResolution.length > 0) {
            mapcrs = getCRS("EPSG:3857", originResult.bounds, visableResolution);
          } else {
            mapcrs = getCRS("EPSG:3857", originResult.bounds);
          }
        }
      }

      if (visableResolution.length > 0) {
        maxZoom = visableResolution.length - 1;
      }
      _this.mapInitZoom = zoom;
      _this.mapInitCenter = mapcrs.unproject(L.point((originResult.bounds.left + originResult.bounds.right) / 2, (originResult.bounds.bottom + originResult.bounds.top) / 2))
      _this.map = map = L.map('map', {
        center: _this.mapInitCenter,
        maxZoom: maxZoom,
        zoom: _this.mapInitZoom,
        crs: mapcrs,
        zoomControl: false,
        attributionControl: false,
      });
      console.log(map)

      // 初始化所有rest图层, 封装为定义options控制
      // 用type字段区分图层类型（quhua，resource，limit，base）
      _this.initRestLayer(REST_LAYERS);
      console.log(_this.layers)
    }

    function getCRS(epsgCodeStr, bounds, resolutions) {
      return L.Proj.CRS(epsgCodeStr, {
        bounds: L.bounds([bounds.left, bounds.bottom], [bounds.right, bounds.top]),
        resolutions: resolutions,
        origin: [bounds.left, bounds.top]
      });
    }

    function scaleToResolution(scale, dpi, mapUnit) {
      var inchPerMeter = 1 / 0.0254;
      var meterPerMapUnitValue = getMeterPerMapUnit(mapUnit);
      var resolution = scale * dpi * inchPerMeter * meterPerMapUnitValue;
      resolution = 1 / resolution;
      return resolution;
    }

    function getMeterPerMapUnit(mapUnit) {
      var earchRadiusInMeters = 6378137;// 6371000;
      var meterPerMapUnit;
      if (mapUnit === "METER") {
        meterPerMapUnit = 1;
      } else if (mapUnit === "DEGREE") {
        // 每度表示多少米。
        meterPerMapUnit = Math.PI * 2 * earchRadiusInMeters / 360;
      } else if (mapUnit === "KILOMETER") {
        meterPerMapUnit = 1.0E-3;
      } else if (mapUnit === "INCH") {
        meterPerMapUnit = 1 / 2.5399999918E-2;
      } else if (mapUnit === "FOOT") {
        meterPerMapUnit = 0.3048;
      }
      return meterPerMapUnit;
    }

  }

  initRestLayer = layers => {
    layers.forEach((item)=>{
      this.layers[item.layer] = L.supermap.tiledMapLayer(
        item.url,
        {
          $$type: item.type, // 约定的图层名字，用于透传，约定以$$做前缀
          $$name: item.name,
          transparent: true,
          cacheEnabled: true,
          tileSize: 128,
        },
        { maxResolution: 'auto' }
      );
      if(item.init){
        this.layers[item.layer].addTo(this.map);
      }
    });
  };

  render() {

    return (
      <Fragment>
        <div
          id="map"
          className={styles.map}
        >
        </div>
      </Fragment>
    );
  }
}
