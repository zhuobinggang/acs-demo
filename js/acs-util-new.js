/**
 * 2017/10/25 Create by 我
 * 提供一些通用函数
 */


/**
 * 将列表结构转成树形结构
 * @param list 列表
 * @param nameOfId 字符串，表示id字段名，例如:'uuid'
 * @param nameOfParentId 字符串，表示父级id字段名,例如'pId'
 * @returns {Array} 只包含顶级父节点的数组,子节点存储在children里
 */
function listToTree(list, nameOfId, nameOfParentId) {

    //将数据处理成树形结构
    //1. 按id排入数组
    var listById = {}

    for (var item of list) {
        item.children = []//加入孩子数组
        listById[item[nameOfId]] = item//排入数组
    }

    //2. 遍历 在父节点加入自己的引用
    for (var item of list) {
        if (item[nameOfParentId]) {//如果有父权限(存在即可)
            //将自己加入到父节点的孩子数组里
            listById[item[nameOfParentId]].children.push(item)
        }
    }

    //3. 只留下顶级父节点
    var resultList = []
    for (var property in listById) {
        var item = listById[property]
        if (!item[nameOfParentId]) {//如果是顶级父节点(父权限ID不存在)
            resultList.push(item)
        }
    }

    return resultList
}

/**
 * 自定义表单验证方案
 * @param element
 */
function validateIt(element) {

    var instance = $(element)
    var type = instance.attr('validator-type')
    var require = instance.attr('required')
    var val = instance.val()

    var ok = false
    //如果是必填项
    if (isRequire(require)) {
        // console.info('必须校验')
        ok = !isEmpty(val) && validated(val, type)
    } else {//可选
        // console.info('非必须校验')
        ok = isEmpty(val) || validated(val, type)
    }

    if (ok) {
        hideValidateError(element)
        return true
    } else {
        showValidateError(element)
        return false
    }
}

function isRequire(require) {
    return require != undefined && require != false
}

function isEmpty(val) {
    return val.length < 1
}

function validated(val,type) {
    if(!type){
        return true
    }
    
    if(type == 'email'){
        return validator.isEmail(val)
    }
}

function showValidateError(element) {
    var instance = $(element).parent().parent().next()
    instance.removeClass('hidden')
    //验证失败标志
    instance.addClass('validate-error')
}

function hideValidateError(element) {
    var instance = $(element).parent().parent().next()
    instance.addClass('hidden')
    //消除验证失败标志
    instance.removeClass('validate-error')
}