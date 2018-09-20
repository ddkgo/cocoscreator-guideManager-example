import guideCtrl from "./guideCtrl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class guideManager extends cc.Component {
    @property(cc.Prefab)
    guidePrefab:cc.Prefab=null;

    tipnode:cc.Node=null;

    waitTime = false;
    delayTime = 1.0;
    private static instance:guideManager = null;
    public static getInstance():guideManager{
        return guideManager.instance;
    }

    onLoad(){
        guideManager.instance = this;
        this.waitTime = false;
        this.delayTime = 0.5;
    }

    Show(type:number,text:string,node:cc.Node,extHight=0,delayTime=0.2){
        if(this.waitTime){return;}
        if(this.bHaveGuide(type)){return;}
        if(this.check(type)==false){return;}
        if(this.checkPosition(node)==false){return;}
        this.waitTime = true;
        this.scheduleOnce(function(){
            this.waitTime = false;
            this.delayTime = 0;
            this.delFun(type,text,node,extHight);
        }.bind(this),delayTime+this.delayTime);
    }
    /**
     * 处理引导具体显示 及数据保存
     * delFun
     * @param type 
     * @returns  
     */
    delFun(type:number,text:string,node:cc.Node,extHight=0){
        if(cc.isValid(this.tipnode)){ return;}

        window.globalEvent.emit('guideStart');
        this.tipnode = cc.instantiate(this.guidePrefab);
        cc.director.getScene().getChildByName('Canvas').addChild(this.tipnode,30);
        this.tipnode.getComponent(guideCtrl).Show(text,node,extHight);

        // Ft.global.UserData.guideData.push(type);
        // Ft.utils.SaveSgData('guideData');
    }

    /**
     * 根据缓存判断引导是否已经进行过了
     * @param type 
     * @returns  
     */
    bHaveGuide(type:number){
        
        // let UserData = Ft.global.UserData;
        // let guideData = UserData.guideData;
        // let tempIndex = guideData.findIndex((value) => {
        //     return value==type;
        // });
        // if(tempIndex!=-1){
        //     return true;
        // }

        // return false;
    }

    /**
     * 检查当前引导能否开始
     * @param type 
     * @returns  
     */
    check(type:number){
        let retResult = true;
        switch(type){
        //     case Ft.guideType.feed:
        //         if(this.bHaveGuide(Ft.guideType.fishgain)==false){
        //             retResult = false;
        //         }
        //         break;
            default:
                break;
        }

        return retResult;
    }

    /**
     * 检查当前引导能否开始
     * @param node 
     * @returns  
     */
    checkPosition(node:cc.Node){
        if(node==null){return true;}
        let pos = node.parent.convertToWorldSpaceAR(node.position);
        let winSize = cc.winSize;
        let rect = cc.rect(0, 0, winSize.width, winSize.height);
        if(rect.contains(pos)){
            return true;
        }
        return false;
    }
}