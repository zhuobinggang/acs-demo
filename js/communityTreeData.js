/**
 * Created by zhuo on 2017/9/7.
 */

var DataSourceTree = function(options) {
    this._data 	= options.data;
    this._delay = options.delay;
}

DataSourceTree.prototype.data = function(options, callback) {
    var self = this;
    var $data = null;

    if(!("name" in options) && !("type" in options)){
        $data = this._data;//the root tree
        callback({ data: $data });
        return;
    }
    else if("type" in options && options.type == "folder") {
        if("additionalParameters" in options && "children" in options.additionalParameters)
            $data = options.additionalParameters.children;
        else $data = {}//no data
    }

    if($data != null)//this setTimeout is only for mimicking some random delay
        setTimeout(function(){callback({ data: $data });} , parseInt(Math.random() * 500) + 200);

    //we have used static data here
    //but you can retrieve your data dynamically from a server using ajax call
    //checkout examples/treeview.html and examples/treeview.js for more info
};

var community_tree_data = {
    'Zhongshan':{name:'中山市',type:'folder'}
}

community_tree_data['Zhongshan']['additionalParameters'] = {
    'children' : {
        '0':{name:'五桂山',type:'folder'},
        '1':{name:'东升镇',type:'item'},
        '2':{name:'黄圃镇',type:'item'},
        '3':{name:'古镇',type:'item'},
        '4':{name:'小榄',type:'item'},
        '5':{name:'坦洲',type:'item'},
        '6':{name:'南头',type:'item'},
        '7':{name:'西区',type:'item'},
        '8':{name:'神湾',type:'item'},
    }
}
var wuguishan_tree_node = community_tree_data['Zhongshan']['additionalParameters']['children']['0'];
wuguishan_tree_node['additionalParameters'] = {
    'children' : {
		'changmingshui' : {name: '长命水村', type: 'folder'},
		'longtang' : {name: '龙塘村', type: 'item'},
		'guinan' : {name: '桂南村', type: 'item'},
		'shigu' : {name: '石鼓村', type: 'item'},
	}
}
var changmingshui_tree_node = wuguishan_tree_node['additionalParameters']['children']['changmingshui'];
changmingshui_tree_node['additionalParameters'] = {
    'children' : {
		'1' : {name: '长命水村东门', type: 'item'},
		'2' : {name: '长命水村西门', type: 'item'},
		'3' : {name: '长命水村南门', type: 'item'},
		'4' : {name: '长命水村北门', type: 'item'},
	}
}

var community_tree_data = new DataSourceTree({data: community_tree_data});
