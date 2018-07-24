var sudo = [[], [], [], [], [], [], [], [], []];
var pSudo = [[], [], [], [], [], [], [], [], []];
var time, level = 1;

$(function () {
    refresh();
});

function refresh() {
    count = 0;
    allCount = 0;
    isOver = false;
    sudo = [[], [], [], [], [], [], [], [], []];
    initView();
    getAllArr();
    setEmptyValue();
}

function initView() {
    var _w = $('#sudo').width();
    var list = $('#sudo').find('td.item');
    for (var i = 0; i < list.length; i++) {
        $(list[i]).removeAttr('has', '');
        $(list[i]).find('.xy-cover').remove();
        $(list[i]).find('.cover').remove();
        $(list[i]).find('.same-cover').remove();
        $(list[i]).find('span').remove();
    }
    $('#sudo').height(_w);
    $('#sudo td.item').width(_w / 9 - 4);
    $('#sudo td.item').height(_w / 9 - 4);
    $('#sudo td.item').unbind('click');
    $('#sudo td.item').on('click', function (e) {
        var $item;
        if (!$(e.target).hasClass('item')) {
            $item = $(e.target).parent('.item');
        } else {
            $item = $(e.target);
        }
        var list = $('#sudo').find('td.item');
        for (var i = 0; i < list.length; i++) {
            $(list[i]).find('.xy-cover').remove();
            $(list[i]).find('.cover').remove();
            $(list[i]).find('.same-cover').remove();
        }

        var id = $item.attr('id'), w = _w / 9 - 4, num;
        if ($item.find('span')) {
            num = $item.find('span').text();
        }
        if ($item.attr('has') == 'has') {
            addXYCover(id, w);
        }
        findNum(num, id, w);
        addCover(id, w);
    });
}

function findNum(num, id, w) {
    var list = $('#sudo').find('td.item');
    for (var i = 0; i < list.length; i++) {
        var tid = $(list[i]).attr('id');
        var span = $(list[i]).find('span');

        if (span && span.text() && span.text() == num && tid != id) {
            var html = `<div class='same-cover' style="width:${w}px;height:${w}px;"></div>`;
            $(list[i]).append(html);
        }
    }
}
function addXYCover(id, w) {

    var xA = parseInt(id.split('')[0]),
        yA = parseInt(id.split('')[1]);

    var x = Math.floor(xA / 3) * 3 + Math.floor(yA / 3),
        y = xA % 3 * 3 + yA % 3,
        xArr = getXArr(x, 'id'),
        yArr = getYArr(y, 'id');
    for (var i = 0; i < xArr.length; i++) {
        if (xArr[i] != id || yArr[i] != id) {
            addXYCoverById(xArr[i], w);
            addXYCoverById(yArr[i], w);
        }
    }
}
function addXYCoverById(id, w) {
    var html = `<div class='xy-cover' style="width:${w}px;height:${w}px;"></div>`;
    $('#' + id).append(html);
}
/**
 * 给某个id上添加一个涂层
 */
function addCover(id, w) {
    var html = `<div class='cover' style="width:${w}px;height:${w}px;"></div>`;
    $('#sudo td.item .cover').remove();
    $('#' + id).append(html);

}
function addNum(num) {
    var _w = $('#sudo').width(), w = _w / 9 - 4;
    var cover = $('#sudo td.item .cover');
    if (cover.length <= 0) {
        return;
    }
    var par = cover.parent('td.item');
    var id = par.attr('id');
    if (par.attr('has') == 'has') {
        par.find('span').text(num);
    }

    findNum(num, id, w);
}

function deleteNum() {
    var cover = $('#sudo td.item .cover');
    if (cover.length <= 0) {
        return;
    }
    var par = cover.parent('td.item');
    if (par.attr('has') == 'has') {
        par.find('span').text('');
    }
}
function levelChange(e) {
    level = $(e).val();
    refresh();
}
function again() {
    showHeidSudo(pSudo);
}
/**
 * 遍历sudo获取第一个无值的id
 */
function getFirstEmptyId() {
    for (var i = 0; i < sudo.length; i++) {
        for (var j = 0; j < sudo[i].length; j++) {
            if (sudo[i][j] == '' || !sudo[i][j]) {
                return (i) + '' + (j)
            }
        }
    }
    return false;
}
/**
 * 展示数组
 */
function showArr(arr) {
    var list = $('#sudo').find('td.item');

    for (let i = 0; i < 9; i++) {
        var a = arr[i];
        if (a && a.length > 0) {
            for (let j = 0; j < 9; j++) {
                $('#' + i + '' + j).text(arr[i][j]);
            }
        }
    }
}
/**
 * 获取一个随机的数组
 */
function getRandomArr() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    arr.sort((a, b) => {
        return Math.random() > 0.5 ? true : false;
    });
    return arr;
}

/**
 * 获取所有的
 */
function getAllArr() {

    //获取对角线的三个宫格的数组
    for (let i = 0; i < 3; i++) {
        sudo[i * 4] = getRandomArr();
    }
    for (let i = 0; i < sudo.length; i++) {
        sudo[i].length = 9;
    }
}

/**
 * 获取一行已存在的数组
 * @param 行数
 */

function getXArr(x, type) {
    let arry = [],
        xStr = '',
        xArr = [],
        yStr = '',
        yArr = [];
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
            if (type && type == 'id') {
                arry.push(xArr[i] + '' + yArr[j])
            } else {
                arry.push(sudo[xArr[i]][yArr[j]])
            }
        }
    }
    return arry;
}

/**
 * 获取一列已存在的数组
 * @param 行数
 */


function getYArr(y, type) {
    let arry = [],
        xStr = '',
        xArr = [],
        yStr = '',
        yArr = [];
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
            if (type && type == 'id') {
                arry.push(xArr[i] + '' + yArr[j])
            } else {
                arry.push(sudo[xArr[i]][yArr[j]])
            }
        }
    }
    return arry;
}
/**
 * 获取一个宫格的数组
 */
function getBoxArr(x) {
    return sudo[x];
}

/**
 * 输入坐标获取该坐标可能的数字的数组
 */
function getPossibleArryByXy(xy, type) {
    xy = xy + '';
    var xA = parseInt(xy.split('')[0]),
        yA = parseInt(xy.split('')[1]);
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var curr = sudo[xA][yA];
    if (type) {
        sudo[xA][yA] = '';
    }
    // if (curr && !type) {
    //     return;
    // }
    // 00 01 02 10 11 12 20 21 22
    // 03 04 05 13 14 15 23 24 25
    // 06 07 08 16 17 18 26 27 28
    // 30 31 32
    // 33 34 35 
    // 36 37 38
    // 60 61 62 
    // 63 64 65
    // 66 67 68
    var x = Math.floor(xA / 3) * 3 + Math.floor(yA / 3),
        y = xA % 3 * 3 + yA % 3,
        xArr = getXArr(x),
        yArr = getYArr(y),
        boxArr = getBoxArr(xA),
        oldArr = xArr.concat(yArr).concat(boxArr),
        newArr = [];
    for (let i = 0; i < oldArr.length; i++) {
        if (newArr.length <= 0 && oldArr[i]) {
            newArr.push(oldArr[i]);
        } else {
            if (newArr.indexOf(oldArr[i]) < 0 && oldArr[i]) {
                newArr.push(oldArr[i]);
            }
        }
    }
    var pArr = arr.filter(i => {
        return newArr.indexOf(i) < 0;
    });
    return pArr;
}
/**
 * 记录生成次数
 */
function log(count, all) {
    var oldCount = parseInt(localStorage.getItem('count'));
    var oldAll = parseInt(localStorage.getItem('all'));
    if (oldCount && oldAll) {
        oldCount += count;
        oldAll += all;
        localStorage.setItem('count', oldCount);
        localStorage.setItem('all', oldAll);
    } else {
        localStorage.setItem('count', count);
        localStorage.setItem('all', all);
    }
}
/**
 * 设置一个空id的值
 */
var count = 0;
var allCount = 0;
var isOver = false;

function setEmptyValue(id, index) {
    count++;
    id = id ? id : getFirstEmptyId();
    index = index ? index : 0;
    if (!id) {
        console.log('count:', count);
        isOver = true;
        allCount++;
        log(count, allCount);
        randomHideSudo(level);
        return 'over';
    }
    var xA = id.split('')[0],
        yA = id.split('')[1];

    for (var i = 0; i < sudo.length; i++) {
        for (var j = 0; j < sudo[i].length; j++) {
            if (i != 0 && i != 4 && i != 8) {
                if ((i == xA && j >= yA) || i > xA) {
                    sudo[i][j] = ''
                }
            }
        }
    }

    var pArr = getPossibleArryByXy(id, index > 0 ? true : false);
    var hasNext = true;

    if (pArr.length == 0) {
        return false;
    } else {
        if (isOver) {
            return 'over';
        }
        for (var i = 0; i < pArr.length; i++) {
            if (isOver) {
                return 'over';
            }
            if (index > i) {
                return false;
            } else if (index == i) {
                sudo[xA][yA] = pArr[index];

                hasNext = setEmptyValue();
                if (!hasNext && !isOver) {
                    index++;
                    setEmptyValue(id, index)
                }
            }
        }
    }
}

/**
 * 随机隐藏数组的值 
 * @param level 等级
 */
function randomHideSudo(level) {
    level = level ? level : 1;
    if (level > 5) {
        return alert('欸！往回退一步！');
    }
    var hideArr = [],
        showSudo = sudo.concat([]),
        levelLength = 17 + Math.abs(level - 5) * 4,
        hideLength = 81 - levelLength;
    for (var i = 0; i < hideLength; i++) {
        var flag = true, xA, yA, id;
        while (flag) {
            xA = Math.floor(Math.random() * 9);
            yA = Math.floor(Math.random() * 9);
            id = xA + '' + yA;
            if (hideArr.indexOf(id) < 0) {
                flag = false;
                hideArr.push(id);
                showSudo[xA][yA] = '';
            }
        }
    }
    // console.log('showSudo:', showSudo);
    showHeidSudo(showSudo);
}
/**
 * 展示数独
 */
function showHeidSudo(arr) {
    var list = $('#sudo').find('td.item');
    for (var i = 0; i < list.length; i++) {
        $(list[i]).text('');
    }
    for (let i = 0; i < 9; i++) {
        var a = arr[i];
        if (a && a.length > 0) {
            for (let j = 0; j < 9; j++) {
                var parent = $('#' + i + '' + j),
                    w = parent.width(),
                    h = parent.height(),
                    html = `<span style="width:${w}px;height:${h}px;">${arr[i][j]}</span>`;
                if (arr[i][j] === '') {
                    parent.attr('has', 'has');
                }
                pSudo[i][j] = arr[i][j];
                parent.html(html);
            }
        }
    }
}
/**
 * 检查数独
 */
function checkSudu() {
    var list = $('#sudo').find('td.item'),
        arr = [[], [], [], [], [], [], [], [], []],
        flag = false;
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
        arr[xA][yA] = val;
    }
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            var id = i + '' + j;
            var pArr = getPossibleArryByXy(id);
            if (pArr.length > 0) {
                flag = true;
                return alert('哟哟哟！错了吧');
            }
        }
    }
    return alert('nice!你作对了！%%')
}
