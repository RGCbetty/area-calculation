import Styles from "./Style";
import Yane from "./Contents/Yane/";
import Bankin from "./Contents/Bankin";
import Hafu from "./Contents/Hafu";
import BPU from "./Contents/BPU";
import Nokiten from "./Contents/Nokiten";
import defaultStyle from "./defaultStyles";
import Coverpage from "./Contents/Coverpage";

class ContentList extends Array {
  constructor() {
    super();
  }
}

export default class DocumentDefinition {
  constructor() {
    this.pageSize = "Letter";
    (this.pageMargins = [20, 20, 35, 20]), (this.styles = new Styles());
    this.content = new ContentList();
    this.defaultStyle = new defaultStyle();
  }
  //build
  buildContent(areaData) {
    this.buildCoverpage(areaData);
    this.buildYane(areaData, 1);
    this.buildBankin(areaData, 2);
    this.buildHafu(areaData, 5);
    this.buildBPU(areaData, 7);
    this.buildNokiten(areaData, 9);
  }
  //build
  buildCoverpage(area, pos) {
    let build = new Coverpage();
    this.content = [];
    build.Coverpage(area, this.content, pos);
  }
  buildYane(area, pos) {
    let build = new Yane();
    build.Yane(area, this.content, pos);
  }
  buildBankin(area, pos) {
    let build = new Bankin();
    build.Bankin(area, this.content, pos);
  }
  buildHafu(area, pos) {
    let build = new Hafu();
    build.Hafu(area, this.content, pos);
  }
  buildBPU(area, pos) {
    let build = new BPU();
    build.BPU(area, this.content, pos);
  }
  buildNokiten(area, pos) {
    let build = new Nokiten();
    build.Nokiten(area, this.content, pos);
  }
}
