const {ccclass, property} = cc._decorator;

@ccclass
export default class maskLayer extends cc.Component {
    @property(cc.Node)
    stencil:cc.Node = null;

    followNode:cc.Node = null;
    extHight:number;
    bStop = false;
    onLoad(){
        // this.init();
    }

    init(){
        this.node.targetOff(this);
        this.node.on(cc.Node.EventType.TOUCH_START, function (event: cc.Event.EventTouch) {
            this._onMaskTouchStart(event);
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event: cc.Event.EventTouch) {
            if(this.bStop==false){
                this._onMaskTouchEnd(event);
            }
        }, this);
    }

    _onMaskTouchStart(event:cc.Event.EventTouch) {
        let pt = this.stencil.convertToNodeSpace(event.getLocation());
        let rect = cc.rect(0, 0, this.stencil.width, this.stencil.height);

        // 点中空洞，返回false,触摸事件继续派发
        if (rect.contains(pt)) {
            this.node._touchListener.setSwallowTouches(false);
            this.bStop = false;
        }
        else{
            this.node._touchListener.setSwallowTouches(true);
            event.stopPropagation();
            this.bStop = true;
        }
    }

    _onMaskTouchEnd( event:cc.Event.EventTouch) {
        // 点击中了空洞
        console.log('click sucess');
        this.Hide();
    }

    Hide(){
        this.node.destroy();
    }

    initStencil(node:cc.Node,extHight:number){
        if(node==null){
            this.followNode=null;
            this.stencil.width = 210;
            this.stencil.height = 210;
            this.stencil.setPosition(cc.v2(0,300));
            this.stencil.active = true;

            this.init();
            return ;
        }

        let contentSize = node.getContentSize();
        this.stencil.width = contentSize.width+20;
        this.stencil.height = contentSize.height+20+extHight;
        this.extHight = extHight;
        this.followNode = node;

        this.init();
    }

    update(){
        // 跟随目标已经消失 被销毁
        if(cc.isValid(this.followNode)===false){ return;}

        let node = this.followNode;
        let pos = node.parent.convertToWorldSpaceAR(node.position);
        let localpos = this.stencil.parent.convertToNodeSpaceAR(pos);
        this.stencil.setPosition(cc.v2(localpos.x,localpos.y+this.extHight/2));

        this.followNode = node;
        this.stencil.active = true;
    }
}
