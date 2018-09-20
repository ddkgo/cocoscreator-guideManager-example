import guideManager from './guide/guideManager';
const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    cocosLogo: cc.Node = null;

    @property
    text: string = 'hello';

    start () {
        // init logic
        this.label.string = this.text;
        window.globalEvent = new cc.EventTarget();
        guideManager.getInstance().Show(1,'请点击cocos图标',this.cocosLogo);
    }
}
