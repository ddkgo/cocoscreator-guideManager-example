import maskLayer from './maskLayer';
const HANG_MAX = 8;
const {ccclass, property} = cc._decorator;

@ccclass
export default class guideCtrl extends cc.Component {
    @property(cc.Node)
    totalNode:cc.Node = null;

    @property(cc.Node)
    tipTextBack:cc.Node = null;

    @property(cc.Label)
    tipText:cc.Label = null;

    @property(maskLayer)
    maskLayer:maskLayer = null;

    followNode:cc.Node = null;

    Show(text:string,node:cc.Node,extHight:number){
        this.maskLayer.initStencil(node,extHight);
        let hang = Math.ceil(text.length/HANG_MAX);
        let textCombine = '';
        let tmepText = text;
        this.followNode = node;
        if(hang==1){
            textCombine = text;
        }
        else{
            textCombine = text.slice(0,HANG_MAX-2)+'\n';
            tmepText = text.slice(HANG_MAX-2);
        }
        for(let i=0;i<hang-1;i++){
            let end = (i+1)*HANG_MAX;
            if(end>tmepText.length){end = tmepText.length;}
            textCombine+=tmepText.slice(i*HANG_MAX,end);
            if(i!=hang-2){textCombine+='\n';}
        }
        this.tipText.string = textCombine;

        if(hang==1){
            this.tipTextBack.width = (text.length+2)*this.tipText.fontSize;
        }
        else{
            this.tipTextBack.width = (HANG_MAX+2)*this.tipText.fontSize;
            this.tipTextBack.height = (hang+2)*this.tipText.fontSize;
        }

        if(this.followNode==null){
            this.totalNode.setPosition(cc.v2(0,300));
            this.totalNode.active = true;
            return ;
        }
    }

    update(){
        if(this.followNode==null){
            return ;
        }
        let node = this.followNode;
        let pos = node.parent.convertToWorldSpaceAR(node.position);
        let localpos = this.totalNode.parent.convertToNodeSpaceAR(pos);
        this.totalNode.setPosition(localpos);
        this.totalNode.active = true;

        let winsize = cc.winSize;
        if(localpos.y>winsize.height/4){
            this.totalNode.scaleY = -1;
            this.tipText.node.scaleY = -1;
        }
        else{
            this.totalNode.scaleY = 1;
            this.tipText.node.scaleY = 1;
        }

        if(localpos.x>(winsize.width/2-this.tipTextBack.width/2)){
            this.tipTextBack.x=winsize.width/2-this.tipTextBack.width/2-localpos.x;
        }
        else if(localpos.x<(-winsize.width/2+this.tipTextBack.width/2)){
            this.tipTextBack.x=-winsize.width/2+this.tipTextBack.width/2-localpos.x;
        }
        else{
            this.tipTextBack.x= 0 ;
        }
    }
}