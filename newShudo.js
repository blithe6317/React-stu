const NUMARR = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var SUDO = [], LEVEL = 0, HIDESUDO = [];
$(function () {
    console.log('loading');
    initView();
    getShudo();
});

/**
 * 获取一个新的数独
 */
function getShudo() {
    var sudo = [[], [], [], [], [], [], [], [], []];
    //获取对角线的三个宫格的数组
    for (let i = 0; i < 3; i++) {
        sudo[i * 4] = getRandomArr();
    }
    for (let i = 0; i < sudo.length; i++) {
        sudo[i].length = 9;
    }
    setFirstEmptyValue(sudo);
    // return sudo;
}

/**
 * 获取一个随机的数组
 */
function getRandomArr() {
    var SU = NUMARR.concat([]);
    var arr = SU.sort((a, b) => {
        return Math.random() > 0.5 ? true : false;
    });
    return arr;
}

/**
 * 获取数组的X轴数据
 */
// 00 01 02 10 11 12 20 21 22
// 03 04 05 13 14 15 23 24 25
// 06 07 08 16 17 18 26 27 28
// 30 31 32 40 41 42 50 51 52
// 33 34 35 43 44 45 53 54 55
// 36 37 38 46 47 48 56 57 58
// 60 61 62 70 71 72 80 81 82
// 63 64 65 73 74 75 83 84 85
// 66 67 68 76 77 78 86 87 88

function getXArr(array, x, isId) {
    let arry = [],
        xStr = '',
        xArr = [],
        yStr = '',
        yArr = [],
        idArr = [];
    switch (x % 3) {
        case 0:
            yStr = '012';
            break;
        case 1:
            yStr = '345';
            break;
        case 2:
            yStr = '678';
            break;
    }
    switch (Math.floor(x / 3)) {
        case 0:
            xStr = '012';
            break;
        case 1:
            xStr = '345';
            break;
        case 2:
            xStr = '678';
            break;
    }
    xArr = xStr.split('');
    yArr = yStr.split('');
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (isId) {
                idArr.push(xArr[i] + '' + yArr[j]);
            } else {
                if (array[xArr[i]][yArr[j]]) {
                    arry.push(parseInt(array[xArr[i]][yArr[j]]))
                } else {
                    arry.push(array[xArr[i]][yArr[j]]);
                }
            }
        }
    }
    if (isId) {
        return idArr;
    }
    return arry;
}
/**
 * 获取数组的Y轴数据
 */
function getYArr(array, y, isId) {
    let arry = [],
        xStr = '',
        xArr = [],
        yStr = '',
        yArr = [],
        idArr = [];
    switch (y % 3) {
        case 0:
            yStr = '036';
            break;
        case 1:
            yStr = '147';
            break;
        case 2:
            yStr = '258';
            break;
    }
    switch (Math.floor(y / 3)) {
        case 0:
            xStr = '036';
            break;
        case 1:
            xStr = '147';
            break;
        case 2:
            xStr = '258';
            break;
    }
    xArr = xStr.split('');
    yArr = yStr.split('');
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (isId) {
                idArr.push(xArr[i] + '' + yArr[j]);
            } else {
                if (array[xArr[i]][yArr[j]]) {
                    arry.push(parseInt(array[xArr[i]][yArr[j]]))
                } else {
                    arry.push(array[xArr[i]][yArr[j]]);
                }
            }
        }
    }
    if (isId) {
        return idArr;
    }
    return arry;
}

/**
 * 获取一个宫格的数据
 */
function getBoxArr(array, index) {
    return array[index];
}
/**
 * 获取数组首个空元素的id
 */
function getFirstEmptyId(array) {
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++) {
            if (!array[i][j] || array[i][j] == '') {
                return i + '' + j;
            }
        }
    }
    return false;
}
/**
 * 获取一个坐标可能是的数字的数组
 */
function getProbableArr(array, xy) {
    xy = xy + '';
    var xA = parseInt(xy.split('')[0]),
        yA = parseInt(xy.split('')[1]),
        x = Math.floor(xA / 3) * 3 + Math.floor(yA / 3),
        y = xA % 3 * 3 + yA % 3,
        xArr = getXArr(array, x),
        yArr = getYArr(array, y),
        boxArr = getBoxArr(array, xA),
        oldArr = xArr.concat(yArr).concat(boxArr),
        newArr = [];
    if (oldArr.length > 0) {
        oldArr.forEach((i) => {
            if (i && newArr.indexOf(i) < 0) {
                newArr.push(i);
            }
        });
        var arr = NUMARR.filter(i => (
            newArr.indexOf(i) < 0
        ));
        return arr;
    } else {
        return NUMARR.concat([]);
    }
}
/**
 * 获取第一个空元素的可能数组
 */
function getFirstProArr(array, id) {
    id = id ? id : getFirstEmptyId(array);
    var pArr = getProbableArr(array, id);
    if (pArr.length == 0) {
        return false;
    } else {
        return pArr;
    }
}
/**
 * 设置数组第一个空元素的值
 * @param {*} array 
 */
var isOver = false;
function setFirstEmptyValue(array, id, index) {
    id = id ? id : getFirstEmptyId(array);
    index = index ? index : 0;
    if (!id || isOver) {
        isOver = true;
        SUDO = JSON.stringify(array);
        beginPlayBlock(SUDO);
        return array;
    }
    var xA = parseInt(id.split('')[0]),
        yA = parseInt(id.split('')[1]);

    for (var i = 0; i < array.length; i++) {
        if (i != 0 && i != 4 && i != 8) {
            for (var j = 0; j < array[i].length; j++) {
                if ((i == xA && j >= yA) || i > xA) {
                    array[i][j] = ''
                }
            }
        }
    }

    var pArr = getProbableArr(array, id);
    // showShuDo(array);
    // debugger
    var hasNext = true;
    if (pArr.length == 0) {
        return false;
    } else {
        for (var i = 0; i < pArr.length; i++) {
            if (isOver) {
                return array;
            }
            if (i == index) {
                array[xA][yA] = pArr[i];
                hasNext = setFirstEmptyValue(array);
                if (!hasNext && !isOver) {
                    index++;
                    setFirstEmptyValue(array, id, index)
                }
                break;
            }
        }
    }
}
function levelChange(e) {
    LEVEL = parseInt($(e).val());
    begin();
}

/**
 * 生成数独完毕，开始展示可以玩的数独
 */
function beginPlayBlock(array) {
    var newArr = JSON.parse(array);
    HIDESUDO = randomHideSudo(newArr);
    creatDataBase(HIDESUDO);
    showShuDo(HIDESUDO);
}

function randomHideSudo(array) {
    var newArr = [...array];
    var showLen = (10 - LEVEL) * 3 + 24, //显示在页面上的数字个数
        hideLen = 81 - showLen,  //被隐藏的数字个数
        hideArr = []; //已经隐藏的id
    for (var i = 0; i < hideLen; i++) {
        var flag = true, xA, yA, id;
        while (flag) {
            xA = Math.floor(Math.random() * 9),
                yA = Math.floor(Math.random() * 9),
                id = xA + '' + yA;
            if (hideArr.indexOf(id) < 0) {
                hideArr.push(id);
                newArr[xA][yA] = '';
                flag = false;
            }
        }
    }
    return newArr;
}

function again() {
    showShuDo(HIDESUDO);
    creatDataBase(HIDESUDO);
}
function begin() {
    isOver = false;
    getShudo();
    creatDataBase(HIDESUDO);
    $('#sudo td.item').removeAttr('has');
    $('#sudo td.item').removeClass('number-box');
    $('#sudo td.item').removeClass('click');
    $('#sudo td.item').removeClass('cover');
    $('#sudo td.item').removeClass('click-cover');
    $('#sudo td.item').removeClass('click-has');
}



/**
 * 展示一个数独
 */
function showShuDo(array) {
    for (let i = 0; i < 9; i++) {
        var a = array[i];
        if (a && a.length > 0) {
            for (let j = 0; j < 9; j++) {
                var $item = $('#' + i + '' + j);
                var html = '<span>' + array[i][j] + '</span>';

                $item.html(html);
                if (!array[i][j]) {
                    $item.addClass('number-box');
                    $item.attr('has', 'has');
                }
            }
        }
    }
    $('#sudo td.item').removeClass('click');
    $('#sudo td.item').removeClass('cover');
    $('#sudo td.item').removeClass('click-cover');
    $('#sudo td.item').removeClass('click-has');
}
/**
 * 初始化页面
 */
function initView() {
    var _w = $('#sudo').width();
    $('#sudo').height(_w);
    var itemW = _w / 9 - 4;
    $('#sudo td.item').width(itemW);
    $('#sudo td.item').height(itemW);


    $('#sudo td.item').unbind('click');
    $('#sudo td.item').bind('click', function (e) {
        $('#sudo td.item').removeClass('click');
        $('#sudo td.item').removeClass('cover');
        $('#sudo td.item').removeClass('click-cover');
        $('#sudo td.item').removeClass('click-has');
        var $item;
        if (e.target.tagName == "TD") {
            $item = $(e.target);
        } else {
            $item = $(e.target).parent('td');
        }
        var itemId = $item.attr('id');
        $item.addClass('click');
        //如果是需要填数字的被点击
        if ($item.attr('has')) {
            addCover(itemId);
        }
        findSame(itemId);
    });
}

function addCover(itemId) {
    var xA = parseInt(itemId.split('')[0]),
        yA = parseInt(itemId.split('')[1]),
        x = Math.floor(xA / 3) * 3 + Math.floor(yA / 3),
        y = xA % 3 * 3 + yA % 3;
    var idXArr = getXArr(null, x, true);
    var idYArr = getYArr(null, y, true);
    for (var i = 0; i < idXArr.length; i++) {
        if (idXArr[i] != itemId) {
            $('td#' + idXArr[i]).addClass('cover');
        }
        if (idYArr[i] != itemId) {
            $('td#' + idYArr[i]).addClass('cover');
        }
    }
}

function findSame(itemId) {
    var num = $('#' + itemId).text();
    var items = $('#sudo td.item');
    var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < items.length; i++) {
        var item = $(items[i]);
        var itemSpane = item.find('span');
        if (item.text()) {
            var nu = parseInt(itemSpane.text());
            arr[nu - 1]++;
        }
        if (num && itemSpane.text() == num && item.attr('id') != itemId) {
            if (item.attr('has')) {
                item.addClass('click-has');
            } else {
                item.addClass('click-cover');
            }
        }
    }
    for (var i = 0; i < arr.length; i++) {

        if (arr[i] == 9) {
            $('button#' + (i + 1)).attr('disabled', '');
        } else {
            $('button#' + (i + 1)).removeAttr('disabled');
        }
    }
}

function addNum(num) {
    var $item = $('#sudo td.item.click');
    var itemId = $item.attr('id');
    $('#sudo td.item').removeClass('click');
    var curSudo = getCurSudo();
    var arr = getProbableArr(curSudo, itemId);
    var html = '<span>' + num + '</span>';
    var itemSpan = $item.find('span');
    if (itemSpan) {
        if (itemSpan.text() == num) {
            itemSpan.text('');
            addDBnum();
        }
        if (arr.indexOf(num) >= 0) {
            itemSpan.text(num);
            addDBnum();
            findSame(itemId);
        }
    }
    $item.addClass('click');
}

function deleteNum() {
    var $item = $('#sudo td.item.click');
    $item.find('span').text('');
    addDBnum();
}

function getCurSudo() {
    var items = $('#sudo td.item');
    var array = [[], [], [], [], [], [], [], [], []];
    for (var i = 0; i < items.length; i++) {
        var item = $(items[i]),
            itemId = item.attr('id');
        var xA = parseInt(itemId.split('')[0]),
            yA = parseInt(itemId.split('')[1]);
        array[xA][yA] = item.text();
    }
    return array;
}

function addFlag() {
    var $item = $('#sudo td.item.click');
    var html = '<div class="btn-flag"></div>',
        flag = $item.find('.btn-flag');
    if (flag && flag.length > 0) {
        flag.remove();
    } else {
        $item.append(html);
    }
}

var webDB = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
function creatDataBase(arrayStr) {
    arrayStr = JSON.stringify(arrayStr);
    if (webDB) {
        createDBTable();
        deleteDBTable();
        webDB.transaction(function (tx) {
            tx.executeSql('insert into ADDLOGS (sudo,action,count) values (?,1,0)', [arrayStr]);
        });
    }
}
var count = 0;
function addDBnum() {
    count++;
    var arrayStr = JSON.stringify(getCurSudo());
    var findAction = 'update ADDLOGS set action=0  where action=1';
    removeCountAs();
    if (webDB) {
        webDB.transaction(function (tx) {
            tx.executeSql(findAction, [], function (tx, result) {
                tx.executeSql('insert into ADDLOGS (sudo,action,count) values (?,1,?)', [arrayStr, count]);
            });
        });
    }
}
function createDBTable() {
    var creatTableSQL = 'CREATE TABLE IF  NOT EXISTS ADDLOGS (rowid INTEGER PRIMARY KEY AUTOINCREMENT, sudo text,action text,count text)';
    if (webDB) {
        webDB.transaction(function (tx) {
            tx.executeSql(creatTableSQL, []);
        });
    }
}

function deleteDBTable() {
    var deleteTableSQL = 'DELETE FROM ADDLOGS';
    webDB.transaction(function (tx) {
        tx.executeSql(deleteTableSQL, []);
    });
}

var curActionCount;
//获取当前action 的count
function getCurActionCount() {
    var findSQL = 'select * from ADDLOGS where action=1';
    webDB.transaction(function (tx) {
        tx.executeSql(findSQL, [], function (tx, result) {
            if (result.rows.length > 0) {
                curActionCount = result.rows[0].count;
            }
        });
    });
}
//更新action
function updateAction(count) {
    var updateAllAction = 'update ADDLOGS set action=0  where action=1';
    var updateSQL = 'update ADDLOGS set action=1  where count=?';
    webDB.transaction(function (tx) {
        tx.executeSql(updateAllAction, [], function (tx, result) {
            tx.executeSql(updateSQL, [count]);
        });
    });
}
//删除count之后的
function removeCountAs() {
    var findSQL = 'delete from ADDLOGS where count>?';
    getCurActionCount();
    webDB.transaction(function (tx) {
        tx.executeSql(findSQL, [curActionCount]);
    });
}
//撤销一步
function goPre() {
    getCurActionCount();
    var findPreSQL = 'select * from ADDLOGS where count=(select max(count) from ADDLOGS where count<?)';
    webDB.transaction(function (tx) {
        tx.executeSql(findPreSQL, [curActionCount], function (ctx, result) {
            if (result.rows.length > 0) {
                updateAction(result.rows[0].count);
                showShuDo(JSON.parse(result.rows[0].sudo));
            }
        });
    });
}

//前进一步
function goNext() {
    getCurActionCount();
    var findNextSQL = 'select * from ADDLOGS where count=(select min(count) from ADDLOGS where count>?)';
    webDB.transaction(function (tx) {
        tx.executeSql(findNextSQL, [curActionCount], function (ctx, result) {
            if (result.rows.length > 0) {
                updateAction(result.rows[0].count);
                showShuDo(JSON.parse(result.rows[0].sudo));
            }
        });
    });
}


/**
 * 检查数独
 */
function checkSudu() {
    var list = $('#sudo').find('td.item');
    for (var i = 0; i < list.length; i++) {
        var id = $(list[i]).attr('id');
        var xA = id.split('')[0],
            yA = id.split('')[1];
        var val = $(list[i]).find('span').text();
        if ($(list[i]).attr('has')) {
            if (val) {
                var reg = /^[1-9]{1}$/;
                if (!reg.test(val)) {
                    return alert('请按规则填写@.@')
                }
            } else {
                return alert('还没填完空格呢！。！');
            }
        }
    }
    var sudo = getCurSudo();
    for (var i = 0; i < sudo.length; i++) {
        for (var j = 0; j < sudo[i].length; j++) {
            var id = i + '' + j;
            var pArr = getPTWOArr(id, sudo);
            if (pArr.length > 0) {
                return alert('哟哟哟！错了吧');
            }
        }
    }
    return alert('nice!你作对了！%%')
}

function getPTWOArr(xy, sudo) {
    xy = xy + '';
    var xA = parseInt(xy.split('')[0]),
        yA = parseInt(xy.split('')[1]);
    let farr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    var x = Math.floor(xA / 3) * 3 + Math.floor(yA / 3),
        y = xA % 3 * 3 + yA % 3,
        xArr = getXArr(sudo, x),
        yArr = getYArr(sudo, y),
        boxArr = getBoxArr(sudo, xA),
        oldArr = xArr.concat(yArr).concat(boxArr),
        newArr = [];
    for (let i = 0; i < oldArr.length; i++) {
        if (newArr.length <= 0 && oldArr[i]) {
            newArr.push(parseInt(oldArr[i]));
        } else {
            if (newArr.indexOf(parseInt(oldArr[i])) < 0 && oldArr[i]) {
                newArr.push(parseInt(oldArr[i]));
            }
        }
    }
    var pArr = farr.filter(i => {
        return newArr.indexOf(i) < 0;
    });
    return pArr;

}
