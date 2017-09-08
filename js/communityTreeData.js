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

/**自定义树形数据**/

/**社区树**/
var community_tree_data = {
    'Zhongshan':{name:'<span class="tree-item"><i class="icon-remove"></i></span>中山市',type:'folder'}
}

community_tree_data['Zhongshan']['additionalParameters'] = {
    'children' : {
        '0':{name:'<span class="tree-item"><i class="icon-remove"></i></span>五桂山',type:'folder'},
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
		'changmingshui' : {name: '<span class="tree-item"><i class="icon-remove"></i></span>长命水村', type: 'folder'},
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

/**行政区划树**/
var ad_division_tree_data = {
    'china':{name:'中国',type:'folder'},
}

ad_division_tree_data['china']['additionalParameters'] = {
    'children' : {
        '0':{name:'广东省',type:'folder'},
        '1':{name:'天津市',type:'item'},
        '2':{name:'河北省',type:'item'},
        '3':{name:'山西省',type:'item'},
        '4':{name:'内蒙古自治区',type:'item'},
        '5':{name:'辽宁省',type:'item'},
        '6':{name:'吉林省',type:'item'},
        '7':{name:'黑龙江省',type:'item'},
        '9':{name:'江苏省',type:'item'},
        '10':{name:'浙江省',type:'item'},
        '11':{name:'安徽省',type:'item'},
        '12':{name:'福建省',type:'item'},
        '13':{name:'江西省',type:'item'},
        '14':{name:'山东省',type:'item'},
        '15':{name:'河南省',type:'item'},
        '16':{name:'北京市',type:'item'},
        '17':{name:'广西壮族自治区',type:'item'},
        '18':{name:'境外',type:'item'},
    }
}
var guangdong_tree_node = ad_division_tree_data['china']['additionalParameters']['children']['0'];
guangdong_tree_node['additionalParameters'] = {
    'children' : {
		'0' : {name: '广州市', type: 'item'},
		'1' : {name: '深圳市', type: 'item'},
		'2' : {name: '中山市', type: 'item'},
		'3' : {name: '珠海市', type: 'item'},
        '4' : {name: '佛山市', type: 'item'},
        '5' : {name: '惠州市', type: 'item'},
	}
}

var ad_division_tree_data = new DataSourceTree({data: ad_division_tree_data});

/**角色权限树**/
var role_authority_tree = {
    '0':{name:'系统管理',type:'folder'},
    '1':{name:'社区管理',type:'folder'},
    '2':{name:'门禁管理',type:'folder'},
}

role_authority_tree['0']['additionalParameters'] = {
    'children' : {
        '0':{name:'用户管理',type:'item'},
        '1':{name:'角色管理',type:'item'},
        '2':{name:'机构管理',type:'item'},
        '3':{name:'权限管理',type:'item'},
    }
}
role_authority_tree['1']['additionalParameters'] = {
    'children' : {
        '0':{name:'楼宇管理',type:'item'},
        '1':{name:'房间管理',type:'item'},
        '2':{name:'住户管理',type:'item'},
        '3':{name:'卡片管理',type:'item'},
    }
}
role_authority_tree['2']['additionalParameters'] = {
    'children' : {
        '0':{name:'型号管理',type:'item'},
        '1':{name:'终端管理',type:'item'},
        '2':{name:'门禁监控',type:'item'},
    }
}

var role_authority_tree = new DataSourceTree({data: role_authority_tree});

