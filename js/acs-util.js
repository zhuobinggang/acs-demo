/**
 * Created by pengz on 2017/9/3.
 */
function basicAjax(param) {
    var timer = param.timer || 200000;
    var isCache = param.isCache == true ? true : false;
    $.ajax({
        url : param.url,
        dataType : "json",
        type : param.type,
        data : param.data,
        timeout : timer,
        cache : isCache,
        beforeSend : param.beforeCall,
        error : param.errorCall,
        success : param.successCall,
        complete : param.completeCall
    });
}

/** 最后一页 */
function lastPage(pageintion) {
    if ($("#pageIndex").length > 0) {
        var pIndex = parseInt($("#pageIndex").val());
        if (pIndex == totalPage)
            return;
        $("#pageIndex").val(totalPage);
    } else {
        if (page == totalPage)
            return;
        page = totalPage;
    }

    if (pageintion == null) {
        initPageintion();
    } else {
        pageintion();
    }
}

/** 下一页 */
function nextPage(pageintion) {

    if ($("#pageIndex").length > 0) {
        var pIndex = parseInt($("#pageIndex").val());
        if (pIndex == totalPage)
            return;
        $("#pageIndex").val(pIndex + 1);
    } else {
        if (page == totalPage)
            return;
        page = page + 1;
    }

    if (pageintion == null) {
        initPageintion();
    } else {
        pageintion();
    }
}

/**
 * 前一页
 */
function prePage(pageintion) {

    if ($("#pageIndex").length > 0) {
        var pIndex = parseInt($("#pageIndex").val());
        if (pIndex == 1)
            return;
        $("#pageIndex").val(pIndex - 1);
    } else {
        if (page == 1)
            return;
        page = page - 1;
    }

    if (pageintion == null) {
        initPageintion();
    } else {
        pageintion();
    }
}

/**
 * 首页
 */
function firstPage(pageintion) {
    if ($("#pageIndex").length > 0) {
        var pIndex = parseInt($("#pageIndex").val());
        if (pIndex == 1)
            return;
        $("#pageIndex").val(1);
    } else {
        if (page == 1)
            return;
        page = 1;
    }
    if (pageintion == null) {
        initPageintion();
    } else {
        pageintion();
    }
}

/**
 * 设置分页数据
 *
 * @param data
 */
function fillPageintionData(data, id, pageIndeHid) {
    if (id == null) {
        id = "pageBody";
    }
    if ($("#" + id).html() == null) {
        return;
    }

    var page = {};
    page.index = data.index;
    page.totalPage = data.totalPage;
    totalPage = data.totalPage;

    if (page.index > totalPage) {
        page.index = totalPage;
    }

    if (totalPage == 0) {
        data.first = true;
        data.last = true;
        page.index = 1;
    }

    if (data.first == true)
        page.firstDisableCss = "ui-state-disabled";

    if (data.last == true)
        page.lastDisableCss = "ui-state-disabled";
    if (pageIndeHid != null) {
        $("#" + pageIndeHid).val(page.index);
    } else {
        if ($("#pageIndex").length > 0) {
            $("#pageIndex").val(page.index);
        }
    }
    $("#pageTemplate").tmpl(page).appendTo("#" + id);
}

function dataTable(id, param) {
    removeAllCheckBoxChecked();
    var aaSorting = param.aaSorting == undefined ? [] : param.aaSorting;
    var aoColumnDefs = param.aoColumnDefs == undefined ? [] : param.aoColumnDefs;

    $('#' + id).dataTable({
        "bProcessing" : true,
        "bStateSave" : true, // 必须设置，用来在修改删除返回时，保留在同一页上
        "sAjaxSource" : param.url,
        "bLengthChange" : false,
        "aLengthMenu" : 20,
        "iDisplayLength" : 10,
        "bFilter" : false,
        "bDestroy" : true,
        "sPaginationType" : "full_numbers",
        "columns" : param.columns,
        "aaSorting" : aaSorting,
        "aoColumnDefs" : aoColumnDefs,
        "oLanguage" : {
            "sProcessing" : "正在加载......",
            "sLengthMenu" : "每页显示 _MENU_ 条记录",
            "sZeroRecords" : "暂无数据！",
            "sEmptyTable" : "暂无数据",
            "sInfoEmpty" : "当前显示 _START_ 到 _END_ 条，共_TOTAL_条记录",
            "sInfo" : "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
            "sInfoFiltered" : "数据表中共为 _MAX_ 条记录",
            "sSearch" : "搜索",
            "oPaginate" : {
                "sFirst" : "首页",
                "sPrevious" : "上一页",
                "sNext" : "下一页",
                "sLast" : "末页"
            }
        }
    });
}

function ajax(param) {
    var _param = param;
    var _baseUrl = "";
    var timer = _param.timer || 20000;
    var isCache = param.isCache == true ? true : false;
    var type = _param.type == undefined ? "POST" : _param.type;
    $.ajax({
        type : type,
        url : _baseUrl + _param.url,
        async : _param.async,
        dataType : "json",
        data : _param.data,
        traditional : true,
        cache : isCache,
        timeout : timer,
        beforeSend : _param.beforeCall,
        complete : function(jqXHR, textStatus) {
        },
        success : _param.successCall
        /*error : _param.errorCall*/
    });
}
/* */
function bindInputOnlyNum(_id) {
    // 监听键盘，只允许输入数字和小数点
    $("#" + _id).keypress(function(event) {
        var keyCode = event.which;
        if (keyCode == 46 || (keyCode >= 48 && keyCode <= 57) || keyCode == 8)// 8是删除键
            return true;
        else
            return false;
    }).focus(function() {
        event.style.imeMode = 'disabled';
    }).bind("paste", function() { // CTR+V事件处理
        return false;// $("#" + _id).val($("#" + _id).val().replace(/\D|^0/g,
        // ''));
    });

}

/* 匹配url参数 */
function url_params(param) {
    var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURIComponent(r[2]);
    return null;
}

/**
 * 获取路径
 */
function getLocation() {
    var location = document.location.host + "/" + projectName;
    return location;
}

/**
 * 获取路径
 */
function getHttpLocation() {
    var location = document.location.protocol + "//" + document.location.host + "/" + projectName;
    return location;
}

/**
 * 浮动提示层
 *
 * @param tipParam
 */
function showTip(tipParam) {
    if (tipParam.text.indexOf("成功") != -1 || tipParam.text.indexOf("完成") != -1) {
        tipParam.className = "successTip";
    } else if (tipParam.text.indexOf("失败") != -1 || tipParam.text.indexOf("error") != -1) {
        tipParam.className = "errorTip";
    } else {
        tipParam.className = "commonTip";
    }

    var unqueId = $.gritter.add({
        name : tipParam.name,
        // (string | mandatory) the heading of the notification
        title : tipParam.title,
        // (string | mandatory) the text inside the notification
        text : tipParam.text,
        // (string | optional) the image to display on the left
        image : tipParam.image,
        // (bool | optional) if you want it to fade out on its own or just sit
        // there
        sticky : false,

        class_name : tipParam.className,
        // (int | optional) the time you want it to be alive for before fading
        // out
        time : tipParam.time
    });
    return unqueId;
}

/**
 * myAlert 显示通用弹出窗口
 *
 * @param var
 *            alert = { title : "", content : "", clickFunction: function }
 */
function showAlert(alert) {
    $("#alertTitle").html(alert.title);
    $("#alertBody").html(alert.content);
    $("#confirmBtn").unbind("click");
    $("#confirmBtn").bind("click", alert.clickFunction);
    $('#myAlert').modal({
        show : true
    });
}

/** 隐藏通用弹出窗口 */
function closeAlert() {
    $('#myAlert').modal('hide');
}

/** 显示id的弹窗 */
function showAlertById(id) {
    $('#' + id).modal({
        show : true
    });
}

/**
 * 隐藏id的弹窗
 *
 * @param id
 */
function closeAlertById(id) {
    $('#' + id).modal('hide');
}

/*
 * 初始化全选/全不选的checkbox 的uniform的功能
 */
function initCheckBox(tableId) {
    $("input:checkbox").click(function() {
        var checkedStatus = this.checked;
        var checkbox = $(this).parents('#' + tableId).find('tr td:first-child input:checkbox');
        checkbox.each(function() {
            this.checked = checkedStatus;
            if (checkedStatus == this.checked) {
                $(this).closest('.checker > span').removeClass('checked');
            }
            if (this.checked) {
                $(this).closest('.checker > span').addClass('checked');
            }
        });
    });
}

// ============半透明层=====================================================
// 把16进制颜色转换成rgb格式
var colorToRGB = function(color) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/g;
    var sColor = color.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        // 处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return sColorChange.join(",");
    } else {
        return color;
    }
}

var setBakckgoundAndOpacity = function(obj, color, opacity) {
    var rgbaObj = colorToRGB(color);
    if ((!$.support.leadingWhitespace)) {
        // 针对ie 6，7，8 通过设置内部元素position:relative；可以避免被父节点的opacity影响
        jQuery(obj).children().each(function() {
            if (jQuery(this).css('position') == 'static') {
                jQuery(this).css('position', 'relative');
            }
        });
        jQuery(obj).css({
            'background' : color,
            'opacity' : opacity
        });
    } else {
        // 支持rgba颜色格式的浏览器用rgba设置透明背景色

        jQuery(obj).css({
            'background' : 'rgba(' + colorToRGB(color) + ',' + opacity + ')'
        });
    }
}
// example
// setBakckgoundAndOpacity($("#productlist"),'#ffffff','0.4');

// ============end of 半透明层=====================================================

/**
 * 初始化uniform 样式
 */
function initUniform() {
    $('input[type=checkbox],input[type=radio],input[type=file]').uniform();
    // removeAllCheckBoxChecked();
    $(".dataTable").dataTableRowBgColor({
        style : "4"
    });
}

function removeAllCheckBoxChecked(id) {
    $("#" + id).parents("span").removeClass('checked');
    $("#" + id)[0].checked = false;
}

function addAllCheckBoxChecked(id) {
    $("#" + id).parents("span").addClass('checked');
    $("#" + id)[0].checked = true;
}

function checkBoxClick(checkName, allCheckId) {
    var unChecked = false;
    $("input[name='" + checkName + "']:checkbox").each(function() {
        if (!$(this).is(":checked")) {
            unChecked = true;
            return false;
        }
    });
    if (unChecked) {
        removeAllCheckBoxChecked(allCheckId);
    } else {
        addAllCheckBoxChecked(allCheckId);
    }
}

/**
 * 获取当前页面选中的checkbox
 *
 * @returns {Array}
 */
function getCheckedBox(name) {
    var ids = [];
    $("input[name='" + name + "']:checkbox:checked").each(function() {
        ids.push($(this).val());
        console.log(ids);
    });
    return ids;
}

/**
 * 确认是否执行停用启用删除方法等
 *
 * @param confirmTip
 *            确认的提示
 * @param successTip
 *            成功后的提示
 * @param url
 *            请求的url
 * @param requestType
 *            请求方式'GET' / 'POST' ,为null时默认为'GET'
 */
function confirmCloudMethod(confirmTip, successTip, url, requestType, timer, isCloseByClickCommit) {
    var alert = {
        title : "提示",
        content : confirmTip,
        clickFunction : function() {
            if (url.indexOf('/delete') > 0) {
                // 隐藏详情界面
                hideDetailView();

            }
            commonCloudMethod(successTip, url, requestType, timer, isCloseByClickCommit);
        }
    };

    if (getCheckedBox().length < 1) {
        showCkbTip();
    } else {
        showAlert(alert);

    }
}

/**
 * 删除，停用，启用等通用方法 提交一组id到指定url requestType 请求方式'GET' / 'POST'
 */
function commonCloudMethod(successTip, url, requestType, timer, isCloseByClickCommit) {
    if (requestType == null) {
        requestType = "GET";
    }

    var ids = getCheckedBox();
    var param = {
        url : url,
        data : {
            ids : ids
        },
        type : requestType,
        timer : timer,
        successCall : function(data) {
            if (isCloseByClickCommit == true)
                return;

            var tipParam = {
                title : "提示",
                text : successTip,
                time : 2000
            };
            if (data.operationFlag == true) {
                closeAllAlert();
                showTip(tipParam);
                initPageintion();
            } else {
                operateErrorCall();
            }

        }
    };
    ajax(param);

    if (isCloseByClickCommit == true) {
        closeAllAlert();
        // commonTip("正在执行请稍等...",2000);
    }
}

/**
 * 控制全选checkbox是否选中
 */
function controlSelectAllCheckBox() {
    var allCkBoxs = $("input[name='hostCkb']:checkbox");
    var checkedCkBoxs = $("input[name='hostCkb']:checkbox:checked");
    console.log(checkedCkBoxs);
    if (allCkBoxs.length != checkedCkBoxs.length) {
        $("#title-table-checkbox").attr("checked", false);
    }
}

/**
 * 获取cluster/datastore/host/image/group等的下拉列表内容
 *
 * @param url
 * @param selectId
 * @returns {String}
 */
function getSelectBody(url, selectId) {
    var clusterSelect = "";
    var param = {
        url : url,
        async : false,
        successCall : function(data) {
            clusterSelect = "<select id='" + selectId + "'>";
            $.each(data, function(index, value) {
                clusterSelect = clusterSelect + "<option value='" + value.oid + "'>" + value.name + "</option>";

            });

            clusterSelect = clusterSelect + "</select>";
        }
    };
    ajax(param);
    return clusterSelect;
}

/**
 * 选择目标集群之前显示弹窗 判断是否选中checkbox
 */
function showChangeClusterAlert() {

    // 判断是否已选择checkbox
    if (getCheckedBox().length < 1) {
        showCkbTip();
        return;
    }

    var url = getHttpLocation() + "/cluster/list";
    // 获取目标集群下拉框内容

    var clusterSelect = "<select id='selectCluster' ><option value='-1'>Default (none)</option>" + getSelectOptionsHtml(url) + "</select>";

    var alert = {
        title : "操作确认",
        content : "<p>选择目标集群</p>" + clusterSelect,
        clickFunction : function() {
            changeCluster();
        }
    };

    showAlert(alert);
}

/**
 * 选择群组之前显示弹窗 判断是否选中checkbox
 */
function showChangeGroupAlert() {

    // 判断是否已选择checkbox
    if (getCheckedBox().length < 1) {
        showCkbTip();
        return;
    }

    var url = getHttpLocation() + "/group/list";
    // 获取群组下拉框内容
    var clusterSelect = getSelectBody(url, "selectGroup");

    var alert = {
        title : "操作确认",
        content : "<p>选择新的群组</p>" + clusterSelect,
        clickFunction : function() {
            changeGroup();
        }
    };

    showAlert(alert);
}

/**
 * 选择所有者之前显示弹窗 判断是否选中checkbox
 */
function showChangeOwnerAlert() {

    // 判断是否已选择checkbox
    if (getCheckedBox().length < 1) {
        showCkbTip();
        return;
    }

    var url = getHttpLocation() + "/user/list";
    // 获取所有者下拉框内容
    var clusterSelect = getSelectBody(url, "selectOwner");

    var alert = {
        title : "操作确认",
        content : "<p>选择新的所有者</p>" + clusterSelect,
        clickFunction : function() {
            changeOwner();
        }
    };

    showAlert(alert);
}

/**
 * 普通提示框
 */
function showCommonTip(tip) {
    var tipParam = {
        title : "提示",
        text : tip,
        time : 2000
    };
    showTip(tipParam);
}

function closeAllAlert() {
    $("div[name='alertModel']").modal('hide');
}

/**
 * 重置表单
 *
 * @param id
 */
function resetForm(id) {
    document.getElementById(id).reset();
    $('#' + id + ' em').remove();
    $('#' + id + ' br').remove();
    // clear cache of remote validation
    $("#" + id + " input").removeData("previousValue");
}

/**
 * 显示详情界面
 *
 * @param url
 * @param showDetailCall
 * @param tabId
 *            选项卡按钮id 为空时默认firstTab
 * @param showTabId显示内容div的id
 *            为空时默认tab1
 */
function showDetailView(tabId, showTabId) {
    $("li[id^='tab_']").removeClass("active");
    $("div[id^='show_']").removeClass("active");

    if (tabId == null) {
        $("#firstTab").addClass("active");
    } else {
        $("#" + tabId).addClass("active");
    }

    if (showTabId == null) {
        $("#tab1").addClass("active");
    } else {
        $("#" + showTabId).addClass("active");
    }

    $("#viewDetail").hide();
    $("#viewDetail").slideToggle("slow");
    $("#viewDetail").show();
}

/**
 * 隐藏详情界面
 */
function hideDetailView() {
    if ($("#viewDetail") != null) {
        $("#viewDetail").hide();
    }
}
/**
 * 登录退出
 */
function logout() {
    var url = "/logout";
    var param = {
        url : url,
        type : 'get',
        successCall : handleLogout

    };
    ajax(param);
    window.location.href = "/";
}

/**
 * 处理登录退出
 */
function handleLogout(data) {
    if (data.success != true) {
        var tipParam = {
            title : "提示",
            text : "退出失败！",
            time : 2000
        };
        showTip(tipParam);
        return;
    }
    // window.location.href = $("base").attr("href") + "/login.html";
}

/**
 * 修改模板公用-获取要修改模板的id
 */
function getUpdateTemplateId() {
    var id = $("#selectTemp").val();
    // 删除错误信息
    $("#errorUpdate").remove();
    if (id == null || $.trim(id) == '') {
        // 显示错误信息
        var spanError = $("<span>").attr("id", "errorUpdate").addClass("help-inline").html("没有选择!");
        $("#selectTemp").parent().append(spanError);
        id == null;
    }

    return id;
}

/**
 * 控制按钮下拉菜单的显示与隐藏
 */
function showOrHideButtonsBox(boxId) {
    if (boxId == null) {
        $("div[id^='btnsBox_']").hide();
        $("div[id^='btnsBox_']").removeClass("show");
        return;
    }

    var flag = $("#" + boxId).hasClass("show");
    $("div[id^='btnsBox_']").not($("#" + boxId)).hide();
    $("div[id^='btnsBox_']").not($("#" + boxId)).removeClass("show");

    if (flag == false) {
        $("#" + boxId).show();
        $("#" + boxId).addClass("show");
    } else {
        $("#" + boxId).hide();
        $("#" + boxId).removeClass("show");
    }

}

function commonTip(textTip, times) {
    var tipParam = {
        title : "提示",
        text : textTip,
        time : times == null ? 2000 : times
    };
    showTip(tipParam);
}

function commonTipWithName(textTip, name) {
    var tipParam = {
        name : name + "",
        title : "提示",
        text : textTip,
        time : 5000
    };
    showTip(tipParam);
}

function removeMaskDiv() {
    $("#maskDiv").remove();
}

// 创建遮罩层div
function createMaskDiv(id, content) {
    if (content == null || content == "" || content == undefined) {
        content = "数据加载中，请稍等......";
    }

    var loadDiv = $("<div id=\"maskDiv\" style=\" position: absolute; left:0; top:0; z-index:9999; color:#FFF;\">" + "<div style=\"background: #000; opacity:0.8;filter:alpha(opacity=80);width:100%;height:100%;\"></div>"
        + "<div style=\" position: absolute; left:50%; top:50%; margin:-15px 0 0 -105px; font-family:微软雅黑; font-size:14px;text-align: center; vertical-align: middle;\">" + "<div><img src=\"img/load.gif\" width=\"90\"/><div>" + content + "</div></div>");
    if (id != null && id != "") {
        loadDiv.appendTo($("#" + id));
        $("#maskDiv").css("height", $("#" + id).height());
        $("#maskDiv").css("width", $("#" + id).width());
    } else {
        loadDiv.appendTo($('body'));
        $("#maskDiv").css("height", $(document).height());
        $("#maskDiv").css("width", $(document).width());
    }
}

// 定义一个增量输入框
(function($) {
    // 默认属性
    var defaults = {
        subtractText : '-',// -按钮文字
        addText : '+',// +按钮文字
        btnCss : 'btn btn-primary',// 按钮样式
        increment : 1,// 增量
        max : 9999999999,// 最大值
        min : -9999999999
        // 最小值
    };
    // 扩展方法
    $.fn.incrementInput = function(options) {
        var options = $.extend(defaults, options);// 合并自定义属性，默认属性
        $(this).keyup(function() {
            var value = parseInt($(this).val());
            value = validateExtremeValue(value, options.min, options.max);
            if (!isNaN(value))
                $(this).val(value);
            else
                $(this).val(options.min);
        });
        // 输入框前插入减少按钮
        var subtractBtn = $('<a>' + options.subtractText + '</a>').addClass(options.btnCss).bind("click", function() {
            var input = $(this).parent().find("input");
            var value = parseInt(input.val()) - options.increment;
            input.val(validateExtremeValue(value, options.min, options.max));
        });
        $(this).before(subtractBtn);
        // 输入框后插入增加按钮

        var addBtn = $('<a>' + options.addText + '</a>').addClass(options.btnCss).bind("click", function() {
            var input = $(this).parent().find("input");
            var value = parseInt(input.val()) + options.increment;
            input.val(validateExtremeValue(value, options.min, options.max));
        });
        $(this).after(addBtn);
    }
    // 验证最值并返回数字
    var validateExtremeValue = function(value, min, max) {
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    }
})(jQuery);

/**
 * 格式化Date
 *
 * @param date
 *            时间
 * @param format
 *            格式 yyyy-MM-dd HH:mm:ss
 * @returns
 */
function formatDate(date, format) {
    if (date == undefined || date == null || date == "null")
        return "";
    return (new Date(date)).toString(format);
}

(function($) {
    $.fn.extend({
        "dataTableRowBgColor" : function(options) {
            var prevselitem = null;
            // 设置默认值
            options = $.extend({
                style : "4",
                odd : "odd", /* 偶数行样式 */
                even : "even", /* 奇数行样式 */
                over : "over", /* 鼠标掠过 */
                selected : "selected" /* 选中行样式 */
            }, options);
            // 交替背景
            $("tbody>tr:odd", this).addClass(options.odd);
            $("tbody>tr:even", this).addClass(options.even);
            // 鼠标移动背景
            $("tbody>tr", this).hover(function() {
                $(this).addClass(options.over);
            }, function() {
                $(this).removeClass(options.over);
            });
            // 初始背景 (判断第一列中有被选中的话就高亮)
            /*
             * $("tbody>tr td:first-child:has(:checked)",
             * this).parents('tr').addClass(options.selected);
             */

            // 样式1
            if (options.style == "1") {
                $("tbody>tr", this).click(function() {
                    $(this).toggleClass(options.selected);
                });
            }

            // 样式2
            if (options.style == "2") {
                $('tbody>tr', this).click(function() {
                    // 判断当前是否选中
                    var hasSelected = $(this).hasClass(options.selected);
                    // 如果选中，则移出selected类，否则就加上selected类
                    $(this)[hasSelected ? "removeClass" : "addClass"](options.selected)
                    // 查找内部的checkbox,设置对应的属性。
                        .find(':checkbox:first').attr('checked', !hasSelected);
                });
            }

            // 样式3
            if (options.style == "3") {
                // 如果单选框默认情况下是选择的，则高色.
                $('tbody>tr', this).click(function() {
                    $(this).siblings().removeClass(options.selected); // 除掉同胞的样式。
                    $(this).addClass(options.selected).find(':radio:first').attr('checked', true);
                });
            }

            // 样式4
            if (options.style == "4") {
                // 其他列 为单选
                $('tbody>tr td:not(:first-child)', this).click(function() {
                    var p = $(this).parents("tr");
                    p.addClass(options.selected).siblings().removeClass(options.selected);
                });
            }
            return this; // 返回this，使方法可链。
        }
    });
})(jQuery);

/** 最后一页 */
function lastPage2() {
    if (page2 == totalPage2)
        return;
    page2 = totalPage2;
    initPageintion2();
}

/** 下一页 */
function nextPage2() {
    if (page2 == totalPage2)
        return;
    page2 = page2 + 1;
    initPageintion2();
}

/**
 * 前一页
 */
function prePage2() {
    if (page2 == 1)
        return;
    page2 = page2 - 1;
    initPageintion2();
}

/**
 * 首页
 */
function firstPage2() {
    if (page2 == 1)
        return;
    page2 = 1;
    initPageintion2();
}
/**
 * 设置分页数据2
 *
 * @param data
 */
function fillPageData(data, id) {
    if ($("#" + id).html() == null) {
        return;
    }

    var page2 = {};
    page2.index = data.index;
    page2.totalPage2 = data.totalPage;
    totalPage2 = data.totalPage;

    if (page2.index > totalPage2) {
        page2.index = totalPage2;
    }

    if (totalPage2 == 0) {
        data.first = true;
        data.last = true;
        page2.index = 1;
    }

    if (data.first == true)
        page2.firstDisableCss = "ui-state-disabled";

    if (data.last == true)
        page2.lastDisableCss = "ui-state-disabled";

    $("#pageTemplate2").tmpl(page2).appendTo("#" + id);
}

/**
 * 睡眠
 *
 * @param millisecondi
 */
function sleep(millisecondi) {
    var now = new Date();
    var exitTime = now.getTime() + millisecondi;

    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

/**
 * 扩展IE7、8不支持trim的方法
 */
String.prototype.trim = function() {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

/**
 *
 * @param tableId
 * @param data
 */
function bind_error_code(tableId, data, modalId) {
    $("#" + tableId + " a[data-toggle='popover']").each(function(index, element) {
        var $this = $(this);
        var errorCode = data[$this.text()];
        if (errorCode != undefined) {
            $this.popover({
                html : true,
                trigger : 'hover',
                title : errorCode.code,
                content : '<h4>故障描述</h4>' + errorCode.description + '<br><h4>解决方案</h4>' + errorCode.solution
            });
        } else if (data.hasAddErrorCodeAuth) {
            $this.popover({
                trigger : 'hover',
                title : $this.text(),
                content : '暂无相关信息，如需添加，请点击该故障编码。'
            });
            $this.click(function() {
                showAddErrorCodeModal();
                validateAddErrorCode();
                $('#add_code').val($this.text());

                $('#add_type').change(function() {
                    var validator = $("#addErrorCodeForm").validate();
                    validator.element("#add_code");
                });

                if (modalId == undefined) {
                    $('#addModal').on('hidden', function() {
                        init_event($('#terminal').text());
                    });
                } else {
                    $('#' + modalId).modal('hide');
                    // addModal is the error code add modal.
                    $('#addModal').on('hidden', function() {
                        $('#' + modalId).modal('show');
                        initPageintion2();
                    });
                }
            });
        }
    });
}

/**
 * 获取网站根路径（以及虚拟路基）
 */
function getRootPath() {
    var strFullPath = window.document.location.href;
    var pathName = window.document.location.pathname;
    var pos = strFullPath.indexOf(pathName);
    var prePath = strFullPath.substring(0, pos);// 获取主机地址
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);// 获取项目名称

    if (projectName != "/hc-acs") {
        projectName = "";
    }

    return prePath + projectName;
}

/**
 * 将整型日期转化字符串
 */