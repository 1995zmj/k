import ListViewItem from "./ListViewItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ListViewCtrl extends cc.Component
{

    @property(cc.Prefab)
    itemTemplate: cc.Prefab = null; // item template to instantiate other items

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property
    spawnCount: number = 0; // how many items we actually spawn

    @property
    totalCount: number = 0; // how many items we need for the whole list

    @property
    spacing: number = 0; // space between each item

    @property
    bufferZone: number = 0; // when item is away from bufferZone, we relocate it

    @property(cc.Label)
    lblScrollEvent: cc.Label = null;

    @property(cc.Button)
    btnAddItem: cc.Button = null;

    @property(cc.Button)
    btnRemoveItem: cc.Button = null;

    @property(cc.Button)
    btnJumpToPosition: cc.Button = null;

    @property(cc.Label)
    lblJumpPosition: cc.Label = null;

    @property(cc.Label)
    lblTotalItems: cc.Label = null;


    items: cc.Node[] = [];
    updateTimer: number = 0;
    updateInterval: number = 0.2;
    lastContentPosY: number = 0;
    // use this for initialization
    onLoad()
    {
        this.items = []; // array to store spawned items
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down

        this.initialize();
    }

    initialize()
    {
        this.content.height = this.totalCount * (this.itemTemplate.data.height + this.spacing) + this.spacing; // get total content height
        for (let i = 0; i < this.spawnCount; ++i)
        { 
            // spawn items, we only need to do this once
            let itemNode = cc.instantiate(this.itemTemplate);
            this.content.addChild(itemNode);
            itemNode.setPosition(0, -itemNode.height * (0.5 + i) - this.spacing * (i + 1));//anchor 0.5,0.5
            let item = itemNode.getComponent(ListViewItem);
            item.itemID = i;
            item.updateItem(i,i);
            this.items.push(itemNode);
        }
    }

    getPositionInView(item)
    { // get item position in scrollview's node space
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }

    update(dt)
    {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
        this.updateTimer = 0;
        let items = this.items;
        let buffer = this.bufferZone;
        let isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
        let offset = (this.itemTemplate.data.height + this.spacing) * items.length;
        for (let i = 0; i < items.length; ++i)
        {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown)
            {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && items[i].y + offset < 0)
                {
                    items[i].y = items[i].y + offset;
                    let item = items[i].getComponent(ListViewItem) as ListViewItem;
                    let itemId = item.itemID - items.length; // update item id
                    item.itemID = itemId;
                    item.updateItem(i, itemId);
                }
            } else
            {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height)
                {
                    items[i].y = items[i].y - offset;
                    let item = items[i].getComponent(ListViewItem) as ListViewItem;
                    let itemId = item.itemID + items.length;
                    item.itemID = itemId;
                    item.updateItem(i, itemId);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.scrollView.content.y;
        this.lblTotalItems.string = "Total Items: " + this.totalCount;
    }

    scrollEvent(sender, event)
    {
        switch (event)
        {
            case 0:
                this.lblScrollEvent.string = "Scroll to Top";
                break;
            case 1:
                this.lblScrollEvent.string = "Scroll to Bottom";
                break;
            case 2:
                this.lblScrollEvent.string = "Scroll to Left";
                break;
            case 3:
                this.lblScrollEvent.string = "Scroll to Right";
                break;
            case 4:
                this.lblScrollEvent.string = "Scrolling";
                break;
            case 5:
                this.lblScrollEvent.string = "Bounce Top";
                break;
            case 6:
                this.lblScrollEvent.string = "Bounce bottom";
                break;
            case 7:
                this.lblScrollEvent.string = "Bounce left";
                break;
            case 8:
                this.lblScrollEvent.string = "Bounce right";
                break;
            case 9:
                this.lblScrollEvent.string = "Auto scroll ended";
                break;
        }
    }

    addItem()
    {
        this.content.height = (this.totalCount + 1) * (this.itemTemplate.data.height + this.spacing) + this.spacing; // get total content height
        this.totalCount = this.totalCount + 1;
    }

    removeItem()
    {
        if (this.totalCount - 1 < 30)
        {
            cc.error("can't remove item less than 30!");
            return;
        }

        this.content.height = (this.totalCount - 1) * (this.itemTemplate.data.height + this.spacing) + this.spacing; // get total content height
        this.totalCount = this.totalCount - 1;

        this.moveBottomItemToTop();
    }

    moveBottomItemToTop()
    {
        let offset = (this.itemTemplate.data.height + this.spacing) * this.items.length;
        let length = this.items.length;
        let item = this.getItemAtBottom();

        // whether need to move to top
        if (item.y + offset < 0)
        {
            item.y = item.y + offset;
            let itemComp = item.getComponent('Item');
            let itemId = itemComp.itemID - length;
            itemComp.updateItem(length - 1, itemId);
        }
    }

    getItemAtBottom()
    {
        let item = this.items[0];
        for (let i = 1; i < this.items.length; ++i)
        {
            if (item.y > this.items[i].y)
            {
                item = this.items[i];
            }
        }
        return item;
    }

    scrollToFixedPosition()
    {
        this.scrollView.scrollToOffset(cc.v2(0, 500), 2);
    }
}
