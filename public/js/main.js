
let user_id;
var pomelo = window.pomelo;
var otherPlayers = [];
var selectGoodsArr = [];
var myPetList = [];
var selectPet = null;
var global = {
    mid: 1,
    is_map: true,
}
var _add_ls_func = function (num) {
    let r = Math.random().toFixed(5).substr(2)
    let id = 'l-' + r
    var ele = `<div class="add-ls" id="${id}">${num > 0 ? ("+ " + num) : num}</div>`
    $("#user-ls").append(ele)
    $("#" + id).animate({ fontSize: '15px', top: '-20px', opacity: 0 }, 1000, function () {
        $(this).remove()
    })
}
// setInterval(function () {
//     _add_ls_func(200)
// }, 1000)
var appendLogsFunc = function (msg, color) {
    let colorstr = ""
    if (color) {
        colorstr = `color:` + color + `;`
    }
    $("#logs").append(`<p style='` + colorstr + `'>` + msg + `</p>`)
    $('#logs')[0].scrollTop = $('#logs')[0].scrollHeight;
}
var initServerInfo = JSON.parse(getCookie("server-info"));
if (!initServerInfo) {
    layer.msg("与服务器断开连接", {
        offset: '50%'
    });
}
var initCookie = {
    host: initServerInfo.host,
    port: initServerInfo.port,
    email: initServerInfo.email,
    token: initServerInfo.token
}
global.mid = initServerInfo.mid;
var carousel, form, rate;
layui.use(['carousel', 'form', 'rate', 'element'], function () {
    carousel = layui.carousel
        , element = layui.element
        , form = layui.form,
        rate = layui.rate;
    form.render();
    //监听指定开关
    // form.on('switch(switchAutoBat)', function (data) {
    //     layer.tips('温馨提示:开启后将自动释放技能，关闭后，则需要手动操作。', data.othis)
    //     if ($("#switchAutoBat").is(':checked')) {
    //         localStorage.setItem("switchAutoBat", "1")
    //     } else {
    //         localStorage.setItem("switchAutoBat", "-1")
    //     }
    // });
    form.on('switch(switchBatLog)', function (data) {
        layer.tips('温馨提示:开启后将显示战斗详情，关闭后，则显示掉落物品。', data.othis)
        if ($("#switchBatLog").is(':checked')) {
            localStorage.setItem("switchBatLog", "1")
        } else {
            localStorage.setItem("switchBatLog", "0")
        }
    });
});
var closeLayer = function () {
    $(".layui-layer-content").remove();
}
let animationID;
let man = {
    x: 0,
    y: 0,
    vx: 5,
    width: 10,
    id: "player-me"
}
let left = keyboard(37),
    right = keyboard(39);
left.press = () => {
    man.vx = -5;
    if (!global.is_map) {
        return;
    }
    window.cancelAnimationFrame(animationID);

    moveMan();
};
left.release = () => {
    if (!global.is_map) {
        return;
    }
    if (!right.isDown) {
        man.vx = 0;
        window.cancelAnimationFrame(animationID);
    }
};
//Right
right.press = () => {
    if (!global.is_map) {
        return;
    }
    man.vx = 5;
    window.cancelAnimationFrame(animationID);
    moveMan();
};
right.release = () => {
    if (!global.is_map) {
        return;
    }
    if (!left.isDown) {
        man.vx = 0;
        window.cancelAnimationFrame(animationID);
    }
};

let map_max_width = $('#map').width();
function moveMan() {
    man.x += man.vx;
    if (man.x <= 0) {
        man.x = 0
        $('#postion-x').text(0)
        $("#" + man.id).css("left", "0px")
        switchMap(0);
        return;
    }
    if (man.x >= map_max_width) {
        man.x = map_max_width - man.width
        $('#postion-x').text(map_max_width)
        $("#" + man.id).css("left", (map_max_width - man.width) + "px")
        switchMap(1);
        return;
    }
    animationID = requestAnimationFrame(moveMan);
    let x = (man.x + man.vx);
    //百分比，避免大小屏问题
    onMoveToServer(x / map_max_width)
    $('#postion-x').text(x)
    $("#" + man.id).css("left", x + "px")
}
let timer_qinlin = 0;
//仙蕴提交
var updateXyFunc = function () {
    pomelo.request("connector.userHandler.xyUpdate", {}, function (res) {
        let str = "";
        let num = res.data;
        if (num > 1000) {
            str = (num / 1000).toFixed(2) + 'k'
        } else {
            str = num.toFixed(0)
        }
        //服务端获取的值
        $('#xy-num').text(str)
    })
}
var qilinFunc = function (num) {
    let str = "";
    if (num > 1000) {
        str = (num / 1000).toFixed(2) + 'k'
    } else {
        str = num.toFixed(0)
    }
    //服务端获取的值
    $('#xy-num').text(str)
    setInterval(function () {
        updateXyFunc();
    }, 60000)
}
//查看我的日志
var initMyMsgLogsFunc = function () {
    pomelo.request("connector.userHandler.getMylogs", {
    }, function (res) {
        let eleStr = ''
        for (const item of res.data) {
            eleStr += `<p>${moment(item.created_at).format("MM-DD HH:mm")}&nbsp;&nbsp;${item.log}</p>`
        }
        $('#my-msg').html(eleStr)
    });
}
$(function () {
    var __encode = 'sojson.com', _a = {}, _0xb483 = ["\x5F\x64\x65\x63\x6F\x64\x65", "\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"]; (function (_0xd642x1) { _0xd642x1[_0xb483[0]] = _0xb483[1] })(_a); var __Ox8abaf = ["\x68\x6F\x73\x74", "\x70\x6F\x72\x74", "\x63\x6F\x6E\x6E\x65\x63\x74\x6F\x72\x2E\x6C\x6F\x67\x69\x6E\x48\x61\x6E\x64\x6C\x65\x72\x2E\x6C\x6F\x67\x69\x6E", "\x65\x6D\x61\x69\x6C", "\x74\x6F\x6B\x65\x6E", "\x65\x72\x72\x6F\x72", "\x63\x6F\x64\x65", "\u4E0E\u670D\u52A1\u5668\u65AD\u5F00\u8FDE\u63A5", "\x35\x30\x25", "\x6D\x73\x67", "\x68\x72\x65\x66", "\x2F\x6C\x6F\x67\x69\x6E", "\x5F\x69\x64", "\x6D\x79\x49\x6E\x66\x6F", "\x64\x61\x74\x61", "\x76\x61\x6C", "\x23\x75\x73\x65\x72\x2D\x69\x64", "\x6C\x6F\x67\x73", "\u6211\u7684\u65E5\u5FD7\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x22\x6C\x61\x79\x75\x69\x2D\x62\x61\x64\x67\x65\x22\x20\x73\x74\x79\x6C\x65\x3D\x27\x68\x65\x69\x67\x68\x74\x3A\x31\x32\x70\x78\x3B\x6C\x69\x6E\x65\x2D\x68\x65\x69\x67\x68\x74\x3A\x31\x32\x70\x78\x3B\x74\x6F\x70\x3A\x2D\x31\x70\x78\x3B\x6C\x65\x66\x74\x3A\x31\x70\x78\x3B\x27\x3E", "\x3C\x2F\x73\x70\x61\x6E\x3E", "\x68\x74\x6D\x6C", "\x23\x6D\x79\x2D\x6D\x73\x67\x2D\x74\x61\x62", "\x75\x73\x65\x72\x49\x6E\x66\x6F", "\x73\x74\x72\x69\x6E\x67\x69\x66\x79", "\x73\x65\x74\x49\x74\x65\x6D", "\x78\x79\x5F\x6E\x75\x6D", "\x75\x73\x65\x72\x54\x61\x73\x6B\x73", "\x75\x73\x65\x72\x45\x71\x73", "\x77\x6F\x72\x64\x4C\x6F\x67\x64\x73", "\x3C\x70\x20\x73\x74\x79\x6C\x65\x3D\x27\x63\x6F\x6C\x6F\x72\x3A\x62\x6C\x61\x63\x6B\x3B\x27\x3E\u516C\u544A\x3A", "\x63\x6F\x6E\x74\x65\x6E\x74", "\x3C\x2F\x70\x3E", "\x72\x65\x71\x75\x65\x73\x74", "\x69\x6E\x69\x74", "\x75\x6E\x64\x65\x66\x69\x6E\x65\x64", "\x6C\x6F\x67", "\u5220\u9664", "\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A\u671F\u5F39\u7A97\uFF0C", "\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C", "\x73\x6F\x6A\x73", "\x6F\x6E\x2E\x63\x6F\x6D"]; pomelo[__Ox8abaf[0x21]]({ host: initCookie[__Ox8abaf[0x0]], port: initCookie[__Ox8abaf[0x1]], log: true }, function () { var _0xb184x1 = __Ox8abaf[0x2]; pomelo[__Ox8abaf[0x20]](_0xb184x1, { email: initCookie[__Ox8abaf[0x3]], token: initCookie[__Ox8abaf[0x4]] }, function (_0xb184x2) { if (_0xb184x2[__Ox8abaf[0x5]] || _0xb184x2[__Ox8abaf[0x6]] == 500) { layer[__Ox8abaf[0x9]](__Ox8abaf[0x7], { offset: __Ox8abaf[0x8] }); setTimeout(function () { location[__Ox8abaf[0xa]] = __Ox8abaf[0xb] }, 1000); return }; user_id = _0xb184x2[__Ox8abaf[0xe]][__Ox8abaf[0xd]][__Ox8abaf[0xc]]; $(__Ox8abaf[0x10])[__Ox8abaf[0xf]](user_id); if (_0xb184x2[__Ox8abaf[0xe]][__Ox8abaf[0x11]] > 0) { $(__Ox8abaf[0x15])[__Ox8abaf[0x14]](`${__Ox8abaf[0x12]}${_0xb184x2[__Ox8abaf[0xe]][__Ox8abaf[0x11]]}${__Ox8abaf[0x13]}`) }; localStorage[__Ox8abaf[0x18]](__Ox8abaf[0x16], JSON[__Ox8abaf[0x17]](_0xb184x2[__Ox8abaf[0xe]][__Ox8abaf[0xd]])); qilinFunc(_0xb184x2[__Ox8abaf[0xe]][__Ox8abaf[0xd]][__Ox8abaf[0x19]]); eachUserTask(_0xb184x2[__Ox8abaf[0xe]][__Ox8abaf[0x1a]]); eachUserEqs(_0xb184x2[__Ox8abaf[0xe]][__Ox8abaf[0x1b]]); initMonitorServerPomelo(); resetMapInfo(_0xb184x2[__Ox8abaf[0xe]]); for (const _0xb184x3 of _0xb184x2[__Ox8abaf[0xe]][__Ox8abaf[0x1c]]) { appendLogsFunc(`${__Ox8abaf[0x1d]}${_0xb184x3[__Ox8abaf[0x1e]]}${__Ox8abaf[0x1f]}`) } }) });;; (function (_0xb184x4, _0xb184x5, _0xb184x6, _0xb184x7, _0xb184x8, _0xb184x9) { _0xb184x9 = __Ox8abaf[0x22]; _0xb184x7 = function (_0xb184xa) { if (typeof alert !== _0xb184x9) { alert(_0xb184xa) }; if (typeof console !== _0xb184x9) { console[__Ox8abaf[0x23]](_0xb184xa) } }; _0xb184x6 = function (_0xb184xb, _0xb184x4) { return _0xb184xb + _0xb184x4 }; _0xb184x8 = _0xb184x6(__Ox8abaf[0x24], _0xb184x6(__Ox8abaf[0x25], __Ox8abaf[0x26])); try { _0xb184x4 = __encode; if (!(typeof _0xb184x4 !== _0xb184x9 && _0xb184x4 === _0xb184x6(__Ox8abaf[0x27], __Ox8abaf[0x28]))) { _0xb184x7(_0xb184x8) } } catch (e) { _0xb184x7(_0xb184x8) } })({})
    $(".layui-tab-title li").on("click", function () {
        let type = $(this).data("type")
        if (type == "info") {
            let tab_content_html = `<%- include ./page/info %>`
            $("#tab-content").html(tab_content_html)
            initPageUserInfo()
        } else if (type == "goods") {//背包
            let tab_content_html = `<%- include ./page/goods %>`
            $("#tab-content").html(tab_content_html)
            window.selectGoodsArr = []
            initMyGoodsPageFunc(1, 'init');
        } else if (type == "pet") {//仙兽坐骑
            let tab_content_html = `<%- include ./page/pet %>`
            $("#tab-content").html(tab_content_html)
            initMyPetFunc();
        } else if (type == "skill") { //技能
            let tab_content_html = `<%- include ./page/skill%>`
            $("#tab-content").html(tab_content_html)
            initMySkillPageFunc()
        } else if (type == "team") {//组队
            let tab_content_html = `<%- include ./page/team %>`
            $("#tab-content").html(tab_content_html)
            initPageTeamList(global.mid)
        } else if (type == "task") {//任务中心
            let tab_content_html = `<%- include ./page/task %>`
            $("#tab-content").html(tab_content_html)
            initSystemTaskFunc()
        } else if (type == "fb") {//法宝
            let tab_content_html = `<%- include ./page/fb_page %>`
            $("#tab-content").html(tab_content_html)
            getMyFbFunc()
            rate.render({
                elem: '#test-fb',
                length: 10,
                value: 0,
                half: true,
                theme: 'red',
                readonly: true
            });
        } else if (type == "fation") {//聚仙楼阁
            let tab_content_html = `<%- include ./page/fation %>`
            $("#tab-content").html(tab_content_html)
            initMyFationPageFunc()

        } else if (type == "system_sell") {//聚宝仙阁
            let tab_content_html = `<%- include ./page/system_sell %>`
            $("#tab-content").html(tab_content_html)
            initSystemGoodsFunc(1, 'init')
        } else if (type == "player_sell") {//仙坊集市
            let tab_content_html = `<%- include ./page/player_sell %>`
            $("#tab-content").html(tab_content_html)
            initPlayersSellGoodsFunc(1, 'init')
        } else if (type == "my_msg") {//我的消息
            let tab_content_html = `<%- include ./page/my_msg %>`
            $("#tab-content").html(tab_content_html)
            $('#my-msg-tab').html("我的消息")
            initMyMsgLogsFunc()

        }
    })
    let up = keyboard(38),
        down = keyboard(40),
        enter = keyboard(13),
        space = keyboard(32);
    up.press = () => {
        let ele = $('#switch-map-tb .layui-table-click').prev()
        if (!ele.is("tr")) {
            return;
        }
        $('#switch-map-tb .layui-table-click').removeClass("layui-table-click")
        ele.addClass("layui-table-click")
    };
    down.press = () => {
        let ele = $('#switch-map-tb .layui-table-click').next()
        if (!ele.is("tr")) {
            return;
        }
        $('#switch-map-tb .layui-table-click').removeClass("layui-table-click")
        ele.addClass("layui-table-click")
    }
    enter.press = () => {
        moveToMap()
    }
    space.press = () => {
        moveToMap()
    }
})
var subMapName = function () {

}
//重置地图信息
var resetMapInfo = function (data) {
    if (!data) {
        layer.msg("错误操作", {
            offset: '50%'
        });
        return;
    }
    if (data.myInfo.hp) {
        //hp mp fn
        $("#progress-hp").text(~~data.myInfo.hp)
        $("#progress-mp").text(~~data.myInfo.mp)
        $("#progress-fn").text(~~data.myInfo.fn)
        let current_hp = ((data.myInfo.hp / data.myInfo.hp_cap) * 100).toFixed(0)
        let current_mp = ((data.myInfo.mp / data.myInfo.mp_cap) * 100).toFixed(0)
        let current_fn = ((data.myInfo.fn / 150) * 100).toFixed(0)
        element.progress('progress-hp', current_hp + '%')
        element.progress('progress-mp', current_mp + '%')
        element.progress('progress-fn', current_fn + '%')
        $('#user-ls').text(parseInt(data.myInfo.game_silver))
        $('#user-xs').text(parseInt(data.myInfo.game_gold))
        $("#nickname").text(data.myInfo.nickname)
    }

    otherPlayers = [];
    $(".player").remove();
    $("#map-name").text(data.map.name)
    $("#postion-x").text(1)
    let map_body_width = $("#map-body").width()
    for (let i = 0; i < data.players.length; i++) {
        let img = `background: url(../0.png) no-repeat; background-size:20px 30px;height: 30px;width: 20px;`
        const player = data.players[i];
        let randmo_x = parseInt(Math.random() * 400);
        otherPlayers.push({
            x: randmo_x,
            nickname: player.nickname
        })
        let id = player._id
        if (player._id == data.myInfo._id) {
            id = 'player-me'
            randmo_x = data.type == "next" ? 1 : (map_body_width - 20)
            man.x = randmo_x
            if (data.myInfo.nickname == "GM" || player.nickname == "GM") {
                img = `background: url(../gm.png) no-repeat; background-size:30px 50px;height: 50px;width: 30px;`
                $('#map-body').append(`<div id="` + id + `" style='left:` + randmo_x + `px;${img}'   class="player"><span class='name-fix' style='color:red;'>${player.nickname}</span></div>`)
            } else {
                $('#map-body').append(`<div id="` + id + `" style='left:` + randmo_x + `px;${img}'  class="player"><span class='name-fix'>${player.nickname}</span></div>`)
            }
        } else {
            if (player.nickname == "GM") {
                img = `background: url(../gm.png) no-repeat; background-size:30px 50px;height: 50px;width: 30px;`
                $('#map-body').append(`<div id="` + id + `" style='left:` + randmo_x + `px;${img}'   class="player"><span class='name-fix' style='color:red;'>${player.nickname}</span></div>`)
            } else {
                $('#map-body').append(`<div id="` + id + `" style='left:` + randmo_x + `px;${img}'  class="player"></div>`)
            }
        }
    }
}
var _getAttributeName = function (num) {
    if (num == 1) {
        return "<span style='color:gold;'>金</span>"
    } else if (num == 2) {
        return "<span style='color:teal;'>木</span>"
    } else if (num == 3) {
        return "<span style='color:dodgerblue;'>水</span>"
    } else if (num == 4) {
        return "<span style='color:tomato;'>火</span>"
    } else if (num == 5) {
        return "<span style='color:sienna;'>土</span>"
    }
}
var _getFiledName = function (filed) {
    if (filed == "physical_defense") {
        return "物理防御"
    } else if (filed == "magic_defense") {
        return "魔法防御"
    } else if (filed == "speed") {
        return "速度"
    } else if (filed == "physical_crit") {
        return "物理暴击"
    } else if (filed == "magic_crit") {
        return "魔法暴击"
    } else if (filed == "physical_damage") {
        return "物理伤害"
    } else if (filed == "magic_damage") {
        return "魔法伤害"
    }
}
var _getFbTypeName = function (type) {
    //10001主动法宝(主动使用) 10002被动法宝(被攻击触发) 10003(状态法宝入场触发) 10004(永久属性法宝)
    if (type == 10001) {
        return "主动法宝"
    } else if (type == 10002) {
        return "被动法宝"
    } else if (type == 10003) {
        return "状态法宝"
    } else if (type == 10004) {
        return "增益法宝"
    } else {
        return "无"
    }
}
var getMyFbFunc = function (eq_status) {
    pomelo.request("connector.userHandler.getMyFb", {
    }, function (res) {


        eachUserEqs(res.data.filter(s => s.eq_status == 1), 1)
        for (const item of res.data) {
            let add_num = 0
            if (item.eq_level < 50) {
                add_num = item.eq_level
            } else {
                add_num = `50 <span style='color:#333;'>并加成</span> <span style='color:orange;'>${(item.eq_level - 50) / 5} %</span>`
            }
            let add_gain = item.skill.gain_field ? `加成:${_getFiledName(item.skill.gain_field)} <span style='color:red;'> +${add_num + item.skill.real_damage}</span>` : ""
            let c = ~~(item.eq_level / 10)
            let cstr = ''
            for (let i = 0; i < c; i++) {
                cstr += `  <div class="fb-c-p"><div class="fb-c"> &nbsp;&nbsp;</div> </div>`
            }
            let star_num = item.eq_level % 10
            $("#fb-list").append(`  <div class="layui-row fb-info">
                                        <div class="layui-col-lg2 layui-col-md2 layui-col-xs2 fb-name">${item.name}
                                            <span class="prompt-box">
                                                介绍:${item.info}
                                                <br>
                                                属性:${_getAttributeName(item.attribute)}
                                                <br>
                                                类型:${_getFbTypeName(item.eq_type)}
                                                <br>
                                                ${add_gain}
                                                <br>
                                                灵气:${item.durable_num}
                                            </span>
                                        </div>
                                        <div class="layui-col-lg1 layui-col-md10 layui-col-xs10">
                                            <div class="fb-c-list">
                                              ${cstr}
                                            </div>
                                        </div>
                                        <div class="layui-col-lg5 layui-col-md10 layui-col-xs10" id="fb-${item._id}"></div>
                                        <div class="layui-col-lg4 layui-col-md12 layui-col-xs12">
                                            &nbsp;&nbsp;&nbsp;<a style="line-height: 31px;color: tomato;" onclick="fbHandlerFunc(1,'${item._id}')">升星</a>
                                            &nbsp;&nbsp;&nbsp;<a style="line-height: 31px;color:palevioletred;" onclick="fbHandlerFunc(3,'${item._id}')">养灵</a>
                                            &nbsp;&nbsp;&nbsp;<a style="line-height: 31px;" onclick="fbHandlerFunc(${item.eq_status == 1 ? 5 : 4},'${item._id}')">${item.eq_status == 1 ? "取下" : "佩戴"}</a>
                                        </div>
                                    </div>`)
            rate.render({
                elem: '#fb-' + item._id,
                length: 10,
                value: star_num,
                half: true,
                theme: 'red',
                readonly: true
            });
        }
    })
}
//法宝点击
var fbHandlerFunc = function (type, id) {
    //type 1 升星 2共生 3养灵 4佩戴
    pomelo.request("connector.userHandler.fbProcess", {
        type, id
    }, function (res) {
        layer.msg(res.msg, { offset: '50%' })
        if (res.code == 200) {
            if (type == 1) {
                rate.render({
                    elem: '#fb-' + id,
                    length: 10,
                    value: res.data.level %
                        10,
                    half: true,
                    theme: 'red',
                    readonly: true
                });
                let old_price = parseInt($("#user-ls").text())
                $("#user-ls").text(old_price - res.data.price)
                _add_ls_func(-res.data.price)

            }
        } else if (type == 3) {
            getMyFbFunc()
        } else {
            if (res.code == 201) {
                getMyFbFunc()
            }
        }
    });
}
//移动
var onMoveToServer = function (x) {
    pomelo.request("connector.playerHandler.move", {
        x: x,
        mid: global.mid
    }, function (data) {
    });
}
//切换地图
var switchMap = function (type) {
    pomelo.request('connector.playerHandler.nextMap', {
        type
    }, function (data) {
        if (data.error) {
            layer.msg("与服务器断开连接", {
                offset: '50%'
            });
            return;
        }
        let i = true;
        let tr = ""
        for (const item of data.maps) {
            if (i) {
                tr += `<tr class='layui-table-click'  data-map='` + item.id + `'><td>【` + item.name + `】</td></tr>`
                i = false;
            } else {
                tr += `<tr class=''  data-map='` + item.id + `'><td>【` + item.name + `】</td></tr>`
            }
        }
        tr += `<tr class='` + (i ? "layui-table-click" : "") + `' data-map='-1'><td>关闭</td></tr>`
        layer.msg(`
            <div>上下控制，回车or空格选择</div>
            <table id='switch-map-tb' class="layui-table">
                                    <tbody>
                                      `+ tr + `
                                    </tbody>
                                </table>
                                `, {
            time: 20000,
        });
    });
}
//移动至新地图
var moveToMap = function () {
    let mid = $($(".layui-table-click")[0]).data('map')
    if (!mid) {
        return;
    }
    if (mid == -1) {
        closeLayer();
    } else {
        pomelo.request('connector.playerHandler.moveToNewMap', {
            mid: mid
        }, function (data) {
            if (data.code != 200) {
                layer.msg(data.msg, { offset: '50%' })
                return
            }
            global.mid = data.map.id
            closeLayer();
            let map = data.map;
            if (!data || !data.map) {
                layer.msg("与服务器断开连接", {
                    offset: '50%'
                });
                return;
            }
            //刷新地图信息
            resetMapInfo(data)
        })
    }
}
//初始监听pomele
var initMonitorServerPomelo = function () {
    //聊天
    pomelo.on('onChatMsg', function (res) {
        if (res.channel == 0) {//系统
            if (res.type == 1) {
                $('#msg-body').append(`<p><span style='color:black;'>${res.msg}</p>`)
                $('#system-msg').html("")
                $('#system-msg').append(`<marquee scrollamount="3" loop="1" style="vertical-align:middle;height:29px;color:black;">${res.msg}</marquee>`)
            } else {
                $('#msg-body').append(`<p>[<span style='color:black;'>系统</span>]<span style='color:bule;'>玩家<span style='color:red;'>${res.nickname}</span>${res.msg}</span></p>`)
                $('#system-msg').html("")
                $('#system-msg').append(`<marquee scrollamount="3" loop="1" style="vertical-align:middle;height:29px;color:black;">玩家<span style='color:red;'>${res.nickname}</span>${res.msg}</marquee>`)
            }
        } else if (res.channel == 1) {
            $('#msg-body').append(`<p>[<span style='color:blue;'>当前</span>]${res.nickname}:${res.msg}</p>`)
        } else if (res.channel == 2) {
            $('#msg-body').append(`<p>[<span style='color:blue;'>队伍</span>]${res.nickname}:${res.msg}</p>`)
        } else if (res.channel == 3) {

            $('#msg-body').append(`<p>[<span style='color:cornflowerblue;'>世界</span>]${res.nickname}:${res.msg}</p>`)
        }
        $('#msg-body')[0].scrollTop = $('#msg-body')[0].scrollHeight;
    })
    //有玩家进入地图
    pomelo.on('onAdd', function (data) {
        let randmo_x = parseInt(Math.random() * 400);
        otherPlayers.push({
            x: randmo_x,
            nickname: data.nickname
        })
        $('#map-body').append(`<div id="` + data.uid + `" style='left:` + randmo_x + `px;'  class="player"></div>`)
    })
    //有玩家移动
    pomelo.on('onMove', function (data) {
        $("#" + data.uid).css('left', (data.x * 100) + "%")
    })
    //有玩家离开
    pomelo.on('onLeave', function (data) {
        $("#" + data.uid).remove();
    })
    //加入一个队伍
    pomelo.on('onMyTeamReload', function (data) {
        // layer.msg("刷新我的队伍", {
        //     offset: '50%'
        // });
        if (data.team) {
            $("#my-team-list").html("")
            for (let i = 0; i < data.team.users.length; i++) {
                const user = data.team.users[i];
                $("#my-team-list").append(`<tr><td>` + user.nickname + `</td><td>等级:`
                    + user.level + `</td></tr>`)
            }
        }
    })
    //回合结束处理
    pomelo.on('onRoundBatEnd', function (data) {
        let switchBatLog = localStorage.getItem("switchBatLog")
        if (data.code == 200 && switchBatLog == "1") {
            $("#logs").prepend(`<p>第` + data.data.round_num + `回合</p>`)
            for (const item of data.data.round_arr) {
                let hurtArr = item.hurt.map(s => parseInt(s))
                let hurtStr = hurtArr.join("&nbsp;,&nbsp;")
                let triggerArr = [];
                for (const t of item.a_trigger) {
                    if (triggerArr.indexOf(t) == -1) {
                        triggerArr.push(t)
                    }
                }
                let trigger = ""
                if (triggerArr.length > 0) {
                    trigger = "<span style='color:deeppink;'>触发->" + triggerArr + "</span>"
                }
                let p_color = "blue;"
                if (item.a_type == 2) {
                    p_color = "orchid;"
                } else if (item.a_type == 4) {
                    p_color = "mediumseagreen;"
                }
                let resultStr = `<p><span style='color:red;'>` + item.a_name + `</span> 对 <span style='color:red;'>`
                    + item.b_name + `</span> &nbsp;使用<br>【<span style='color:${p_color}'>` + item.process + `</span>】` + trigger +
                    (hurtStr ? (`造成<span style='color:red;'>` + hurtStr + `</span>伤害` + (item.b_die ? "->死亡" : "")) + `</p>` : "")
                if (item.hurt_type == 2) {
                    resultStr = `<p><span style='color:red;'>` + item.a_name + `</span> 对 <span style='color:red;'>`
                        + item.b_name + `</span> &nbsp;使用<br>【<span style='color:${p_color}'>` + item.process + `</span>】` + trigger +
                        `治疗<span style='color:green;'>` + hurtStr + `</span>气血` + (item.b_die ? "->死亡" : "") + `</p>`
                } else if (item.a_type == 3) {//封印
                    let addHurtStr = ''
                    for (const c of item.hurt) {
                        if (c > 0) {
                            addHurtStr = `并造成<span style='color:red;'>` + hurtStr + `</span>伤害`
                            break;
                        }
                    }
                    resultStr = `<p><span style='color:red;'>` + item.a_name + `</span> 对 <span style='color:red;'>`
                        + item.b_name + `</span> &nbsp;使用<br>【<span style='color:${p_color}'>` + item.process + `</span>】` + trigger +
                        `封印->[${item.a_seal_arr.map(s => { return s.is_seal ? "中" : "未" })}] ` + addHurtStr + (item.b_die ? "->死亡" : "") + `</p>`
                } else if (item.a_type == 4) {//复活
                    resultStr = `<p><span style='color:red;'>` + item.a_name + `</span> 对 <span style='color:red;'>`
                        + item.b_name + `</span> &nbsp;使用<br>【<span style='color:${p_color}'>` + item.process + `</span>】` + trigger +
                        `复活并治疗<span style='color:green;'>` + hurtStr + `</span>气血</p>`
                } else if (item.a_type == 0) {//自定义备注
                    resultStr = `<p style='color:black;'>${item.mark}</p>`
                }
                if (item.a_type != 0 && item.mark) {
                    resultStr += `<p style='color:black;'>${item.mark}</p>`
                }
                $("#logs").prepend(resultStr)
                // if (item.a_type != 0 && item.mark) {
                //     $("#logs").prepend(`<p style='color:black;'>${item.mark}</p>`)
                // }
            }

            $("#logs").prepend(`${data.data.mark}`)
            for (const item of data.data.round_status) {
                if (item.is_leave) {
                    $("#progress-hp-" + item.id).parent().parent().remove()
                    continue
                }
                let hp_w = (item.hp / item.hp_cap * 100).toFixed(0)
                $('#progress-hp-' + item.id).animate({ width: hp_w + "%" })

                if (item._id == user_id) {
                    let mp_w = (item.mp / item.mp_cap * 100).toFixed(0)
                    let fn_w = (item.fn / 150 * 100).toFixed(0)
                    $("#progress-hp").animate({ width: hp_w + "%" })
                    $("#progress-hp").text(parseInt(item.hp))
                    $("#progress-mp").animate({ width: mp_w + "%" })
                    $("#progress-mp").text(parseInt(item.mp))
                    $("#progress-fn").animate({ width: fn_w + "%" })
                    $("#progress-fn").text(parseInt(item.fn))
                }
                let status_str = ''//封印
                if (item.seal.is_physical > 0 && item.seal.is_physical == item.seal.is_magic) {//双封
                    status_str += `<div class="skill-state">双封<span class="prompt-box">
                                无法使用攻击和法术
                                <br>
                                &nbsp;&nbsp;回合:${item.seal.is_physical}
                                </span></div>`
                } else if (item.seal.is_physical > 0) {//物理
                    status_str += `<div class="skill-state">物理<span class="prompt-box">
                                无法使用物理攻击
                                <br>
                                &nbsp;&nbsp;回合:${item.seal.is_physical}
                                </span></div>`
                } else if (item.seal.is_magic > 0) {//法术
                    status_str += `<div class="skill-state">法术<span class="prompt-box">
                                无法使用法术攻击
                                <br>
                                &nbsp;&nbsp;回合:${item.seal.is_magic}
                                </span></div>`
                } else if (item.seal.is_trick > 0) {//特技
                    status_str += `<div class="skill-state">特技<span class="prompt-box">
                                无法使用特技
                                <br>
                                &nbsp;&nbsp;回合:${item.seal.is_trick}
                                </span></div>`
                } else if (item.seal.is_weapon > 0) {//法宝
                    status_str += `<div class="skill-state">法宝<span class="prompt-box">
                                无法使用法宝
                                <br>
                                &nbsp;&nbsp;回合:${item.seal.is_trick}
                                </span></div>`
                }
                for (const s of item.gain_arr) {
                    if (s.filed == "physical_defense") {
                        status_str += `<div class="skill-state state-gain">防御<span class="prompt-box">
                                物防↑${s.value.toFixed(0)}
                                <br>
                                &nbsp;&nbsp;&nbsp;回合:${s.round}
                                </span></div>`
                    } else if (s.filed == "magic_defense") {
                        status_str += `<div class="skill-state state-gain">法防<span class="prompt-box">
                                法防↑${s.value.toFixed(0)}
                                <br>
                                &nbsp;&nbsp;&nbsp;回合:${s.round}
                                </span></div>`
                    } else if (s.filed == "speed") {
                        status_str += `<div class="skill-state state-gain">速度<span class="prompt-box">
                                速度↑${s.value.toFixed(0)}
                                <br>
                                &nbsp;&nbsp;&nbsp;回合:${s.round}
                                </span></div>`
                    } else if (s.filed == "physical_crit") {
                        status_str += `<div class="skill-state state-crit" style="">物爆<span class="prompt-box">
                                物理暴击↑${s.value.toFixed(0)}
                                <br>
                                &nbsp;&nbsp;&nbsp;回合:${s.round}
                                </span></div>`
                    } else if (s.filed == "magic_crit") {
                        status_str += `<div class="skill-state state-crit" style="">法爆<span class="prompt-box">
                                法术暴击↑${s.value.toFixed(0)}
                                <br>
                                &nbsp;&nbsp;&nbsp;回合:${s.round}
                                </span></div>`
                    }
                }
                $("#bat-status-" + item.id).html(status_str)
            }
        }

        if (data.data.win > 0) {
            $("#logs").prepend("<p>战斗结束·····</p>")
            if (data.data.win == 1) {
                $("#logs").prepend("<p  style='color:red;'>战斗结算，胜利~</p>")
                if (data.data.bat_price) {
                    let old_num = $("#user-ls").text()
                    $("#user-ls").text(parseInt(old_num) + data.data.bat_price)
                    _add_ls_func(data.data.bat_price)
                    $("#logs").prepend(`<p>获得灵石 ${data.data.bat_price}</p>`)
                }
                for (const item of data.data.exp) {
                    let add_exp_rate = ~~((item.exp_rate - 1) * 100)
                    $("#logs").prepend(`<p>玩家<span style='color:red;'>${item.name}</span>获得经验 <span style='color:#5FB878;'>${~~item.exp}</span> 点${add_exp_rate > 0 ? ("<span style='color:green;'>↑" + add_exp_rate + "%</span>") : ""}</p>`)
                }
                for (const item of data.data.player_reward) {
                    let garr = item.goods.map(s => {
                        return "【<span style='" + s.gstyle + "'>" + s.gname + "</span>】"
                    })
                    if (garr.length > 0) {
                        $("#logs").prepend(`<p>玩家<span style='color:red;'>` + item.name + `</span>获得` + garr + `</p>`)
                    }
                    if (item.mark) {
                        $("#logs").prepend(`<p style='color:black;'>玩家 ${item.mark}</p>`)
                    }
                }
            } else {
                $("#logs").prepend("<p  style='color:red;'>战斗结算，败北~</p>")
            }
            let is_for = localStorage.getItem('for_bat')
            if (is_for) {
                setTimeout(function () {
                    startBatFunc()
                }, 4000)
            }
            $("#logs").prepend("<p>清算结束，时间:" + moment().format("HH时mm分ss秒") + "·····</p>")
            return;
        }
        timeDjsFunc()
    })
    function delHtmlTag(str) {
        return str.replace(/<[^>]+>/g, "");//去掉所有的html标记
    }
    //开始战斗
    pomelo.on('onStartBat', function (data) {
        $("#right-tab").css("min-height", "400px")
        $("#logs").css("height", "357px")
        $("#logs").html("<p>战斗开始，等待操作·····</p>")
        if (data.code != 200) {
            layer.msg(data.msg, {
                offset: '50%'
            })
            return;
        }
        switchMainBody(1);
        $("#l-bat-info").html("")
        $("#r-bat-info").html("")
        let teamA = ""
        let user_id = $('#user-id').val();
        let user = data.data.initData.find(s => s._id == user_id)
        $("#bat-skill-list").html(`<div class="layui-col-sm3">
                                    <div class="bat-skill-block" id="bat-skill-a"
                                        onclick="selectBatSkillFunc(this,'1','普通攻击')">
                                        普通攻击
                                    </div>
                                </div>`)
        for (const skill of user.skills) {
            $('#bat-skill-list').append(`
            <div class="layui-col-sm3">
            <div class="bat-skill-block" id="bat-skill-a${skill.id}"
            onclick="selectBatSkillFunc(this,'`+ skill.id + `','` + skill.name + `')">
            ${skill.class == 3
                    ? ("<div class='tj-xh'>" + skill.consume_num + "</div><span style='color:orchid;'>" + skill.name + "</span>")
                    : ("<div class='jn-xh'>" + skill.consume_num + "</div>" + skill.name)}
            </div></div>`)
        }
        for (const item of data.data.initData) {
            let hp_rate = (item.hp / item.hp_cap * 100).toFixed(0);
            // <div class="skill-state bat-mark">
            //         `+ item.num + `</div>
            let color = ''
            if (item.name.indexOf("purple") > -1) {
                color = "color:purple;"
            } else if (item.name.indexOf("rebeccapurple") > -1) {
                color = "color:rebeccapurple;"
            }
            let div = ` <div class="layui-col-xs6 player-block" data-id="` + item.id + `" data-name="` + item.name + `">
                        <div class="layui-progress">
                            <div class="layui-progress-bar" id="progress-hp-`+ item.id + `" style="background-color:lightcoral;width:` + hp_rate + `%;${color}">` + delHtmlTag(item.name) + `</div>
                        </div>
                        <div id='bat-status-`+ item.id + `'></div>
                    </div>`
            if (item.team == 1) {
                $("#l-bat-info").append(div)
            } else {
                $("#r-bat-info").append(div)
            }
        }
        let bid = localStorage.getItem("bat-skill")
        if (bid == "1001") {
            localStorage.setItem("bat-type", "1")
        }
        let ele = $("#bat-skill-a" + bid)
        $('.bat-skill-block').css("background-color", "inherit")
        $(ele).css("background-color", "#ccc")
        let s = $(ele).html()
        if (s) {
            $("#attack-skill").text(s.substr(s.lastIndexOf('>') + 1))
        }
        timeDjsFunc()
        $(".player-block").bind("click", function (ele) {
            $("#attack-aims").text(delHtmlTag($(this).data("name")))
            $("#attack-aims").attr("data-id", $(this).data("id"))
        })
    })
}
//操作
var operateBatFunc = function () {
    return;
    var h = $("#bat-body").height() + 128;
    $("#bat-body").animate({ height: h + "px" })
    var div = ``
    // $("#bat-body").append(div)
}
//创建队伍
var createdTeamFunc = function () {
    pomelo.request('connector.teamHandler.createdTeam', {
        mid: global.mid
    }, function (data) {
        if (data && data.code != 200) {
            layer.msg(data.msg, {
                offset: '50%'
            });
            return;
        }
        layer.msg("创建成功！", {
            offset: '50%'
        })
        $("#bat-screen-id").text("请选择")
        localStorage.setItem("mtid", data.data.team._id)
        initPageTeamList(global.mid);
    })
}
//离开队伍
var leaveTeamFunc = function () {
    pomelo.request('connector.teamHandler.leaveTeam', {
    }, function (data) {
        if (data.code != 200) {
            layer.msg(data.msg, {
                offset: '50%'
            });
            return;
        }
        layer.msg('你已退出队伍', {
            offset: '50%'
        });
        $("#bat-screen-id").text("请选择")
        initPageTeamList(global.mid)
        localStorage.removeItem("mtid")
        $("#my-team-list").html("")
    })
}
//回合倒计时
var timeDjsFunc = function () {
    let num = 6;
    $("#time-c").text(num)
    let numstr = $("#time-c").text()
    let autoBat = localStorage.getItem("switchAutoBat")
    if (parseInt(numstr) > 0) {
        let n = parseInt(numstr);
        let i = 3;
        let next_req = false;
        var round_time = setInterval(function () {
            // i--;
            // if (i < 0) {
            // if (autoBat === "1") {
            next_req = true;
            $("#time-c").text(num--)
            // $("#attack-aims").text("随机")
            if (num <= 0) {
                $("#time-c").text("等待")
                pomelo.request('connector.teamHandler.roundOperating', {
                    type: localStorage.getItem("bat-type"),
                    parm: localStorage.getItem("bat-skill"),
                    attack_id: $('#attack-aims').attr("data-id"),
                    tid: localStorage.getItem('mtid')
                }, function (data) {
                    // console.log("回合操作提交成功！")
                })
                clearInterval(round_time)
            }
            // }
            // } else {
            //     $("#time-c").text(n--)
            //     if (n == 0) {
            //         next_req = true;
            //         $("#time-c").text("自动")
            //         clearInterval(round_time)
            //     }
            // }

        }, 1000)
    }
}
//选择技能
var selectBatSkillFunc = function (ele, id, name) {
    $('.bat-skill-block').css("background-color", "inherit")
    $(ele).css("background-color", "#ccc")
    if (id == 1001) { //捕捉
        localStorage.setItem("bat-type", "1001")
    } else {
        localStorage.setItem("bat-type", "1")
    }
    $("#attack-skill").text(name)
    localStorage.setItem("bat-skill", id)
}
//点击物品
var clickGoodsFunc = function (gid, ele) {
    let exists = selectGoodsArr.find(s => s.id == gid)
    if (exists) {
        $(ele).parent().css("border-color", "#888")
        selectGoodsArr = selectGoodsArr.filter(s => s.id != gid)
    } else {
        selectGoodsArr.push({ id: gid, num: 1 })
        $(ele).parent().css("border-color", "coral")
    }
}
//批量选中
var allSelectGoodsFunc = function (gid, ele, num) {
    let exists = selectGoodsArr.find(s => s.id == gid)
    if (exists) {
        exists.num = num
    } else {
        selectGoodsArr.push({ id: gid, num: num })
    }
    $($(ele).parents(".goods-block-in")[0]).css("border-color", "magenta")
}
//初始我得物品
var initMyGoodsPageFunc = function (page, type) {
    pomelo.request("connector.userHandler.getMyGoods", {
        page
    }, function (data) {
        if (data.code != 200) {
            layer.msg(data.msg, { offset: '50%' })
            return;
        }
        $('#goods-list').html("")
        for (const item of data.data.goods) {
            if (item.type != 1 && item.goods) {
                let icon = (item.goods && item.goods.img) ? `<img src="` + item.goods.img + `" width="20px" alt="">` : ''
                var style = "style='" + item.goods.style + "'"
                let is_use = `<a onclick="allSelectGoodsFunc('` + item._id + `',this,` + item.count + `)">全选</a>&nbsp;&nbsp;<a onclick='sellGoodsBFunc("` + item._id + `","` + item.goods.style + `","` + item.goods.name + `",this)'>出售</a>&nbsp;&nbsp;`
                is_use += ((item.goods.use_type > 0) ? `<a class='goods-s' onclick="useGoodsFunc('` + item._id + `')">使用</a>` : '')
                let gdiv = `
                    <div class="goods-block layui-col-lg3 layui-col-md4 layui-col-sm6 layui-col-xs6">
                        <div  class="goods-block-in" ` + style + `>
                            <p   onclick="clickGoodsFunc('` + item._id + `',this)">
                            `+ icon + `
                            <span>`+ item.goods.name + `</span><span class="goods-num"> x` + item.count + `</span>
                            </p>
                            <span class="prompt-box" style="color: #888;text-shadow: none;">
                                <p>`+ is_use + `</p>
                                <p style='text-align: left;'>&nbsp;价格:${(item.price * 0.5).toFixed(0)}${item.price_type == 2 ? "仙石" : "灵石"}</p>
                                `+ item.goods.info + `
                            </span>
                        </div>
                    </div>`
                $('#goods-list').append(gdiv)
            } else if (item.equipment) {
                let icon = (item.img) ? `<img src="` + item.img + `" width="20px" alt="">` : ''
                let is_use = `<a onclick="allSelectGoodsFunc('` + item._id + `',this,` + item.count + `)">全选</a>&nbsp;&nbsp;<a onclick='sellGoodsBFunc("` + item._id + `","` + item.style + `","` + item.name + `",this)'>出售</a>&nbsp;&nbsp;`
                is_use += `<a onclick='wearEquipmentFunc("` + item._id + `")'>装备</a>`
                var eq = equipmentOpenFunc(item);
                let gdiv = `
                    <div class="goods-block layui-col-lg3 layui-col-md4 layui-col-sm6 layui-col-xs6">
                        <div  class="goods-block-in" ` + eq.style + `>
                            <div  onclick="clickGoodsFunc('` + item._id + `',this)"><div class="eq-star">` + eq.eq_type + `</div>
                            `+ icon + `
                            <span style='${item.style}' >` + item.name + `</span>
                            </div>
                            <span class="prompt-box" style="color: #888;text-shadow: none;">
                                <p>`+ is_use + `</p>
                                <p style='text-align: left;'>&nbsp;价格:${item.price * 0.5}${item.price_type == 2 ? "仙石" : "灵石"}</p>
                                `+ eq.tip + `
                            </span>
                        </div>
                    </div>`
                $('#goods-list').append(gdiv)
            } else if (item.type == 2 || item.type == 3) {
                let is_use = `&nbsp;&nbsp;<a class='goods-s' onclick="wbtFunc('` + item._id + `')">挖宝</a>`
                let gdiv = `
                    <div class="goods-block layui-col-lg3 layui-col-md4 layui-col-sm6 layui-col-xs6">
                        <div  class="goods-block-in" >
                            <div  onclick="clickGoodsFunc('` + item._id + `',this)">
                            <span style='' >${item.name}</span>
                            </div>
                            <span class="prompt-box" style="color: #888;text-shadow: none;">
                                <p>${is_use}</p>
                                ${item.info}
                            </span>
                        </div>
                    </div>`
                $('#goods-list').append(gdiv)
            }
        }
        if (type == 'init') {
            layui.use('laypage', function () {
                var laypage = layui.laypage;
                //执行一个laypage实例
                laypage.render({
                    elem: 'goods-page' //注意，这里的 test1 是 ID，不用加 # 号
                    , count: data.data.count, //数据总数，从服务端得到
                    limit: 28,
                    jump: function (obj, first) {
                        // //obj包含了当前分页的所有参数，比如：
                        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        // console.log(obj.limit); //得到每页显示的条数
                        //首次不执行
                        if (!first) {
                            initMyGoodsPageFunc(obj.curr)
                            //do something
                        }
                    }
                });
            });
        }
    });

}
//出售弹框
var sellGoodsBFunc = function (id, style, name, ele) {
    layer.open({
        type: 1,
        title: "出售物品"
        , offset: '50%' //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
        , id: 'sell-goods-open' //防止重复弹出
        , content: `<span>【<span style="` + style + `">` + name + `</span>】</span>
             <br>数量:<input type="number" value="1" id="sell-count">
             <br>总价:<input type="number"  id="sell-game-gold">
             <br><span style='font-size:12px;color:orange;'>总价=数量*单价</span>`
        , btn: ['出售', '取消']
        , btnAlign: 'c' //按钮居中
        , shade: 0.6 //不显示遮罩
        , yes: function (e) {
            let price = $('#sell-game-gold').val()
            let count = $("#sell-count").val()
            if (~~count <= 0 || ~~price <= 0) {
                layer.msg("非法数字！", { offset: "50%" })
                return
            }
            pomelo.request("connector.playerHandler.sellGoods", {
                ugid: id,
                game_gold: price,
                count
            }, function (data) {
                if (data.code != 200) {
                    layer.msg(data.msg, { offset: '50%' })
                    return;
                }
                let msg = "成功上架【" + data.data.name + "】x" + count;
                appendLogsFunc(msg)
                initMyGoodsPageFunc(1)
                layer.msg(msg, { offset: '50%' })
            })
            layer.closeAll();
        }
    });
}
var eachUserTitle = function (title_arr, wear_title) {
    const filed = {
        "str": "力量",
        "vit": "耐力",
        "agi": "敏捷",
        "int": "魔力",
        "con": "体质",
        "hp_cap": "气血",
        "mp_cap": "魔法",
        "exp": "经验加成"
    }
    let eleStr = '<div class="layui-row">'
    let show_t = []
    let title = "无"
    for (const item of title_arr) {
        eleStr += `<div class="layui-col-xs6" onclick='selectUserTitle(${item.index})'><div class="u-title">${item.title}<span class="prompt-box">
                    <p style="color:plum;">${item.add_tip}</p>
                    <p>${item.tip}</p>
                    </span></div></div>`
        if (item.index == wear_title) {
            title = item.title
        }
    }
    eleStr += '</div>'
    return { eleStr, title }
}
var selectUserTitle = function (index) {
    pomelo.request("connector.userHandler.selectMyTitle", {
        index
    }, function (res) {
        if (res.code == 200) {
            initUserTitleText(res.data)
        }
        layer.msg(res.msg, { offset: '50%' })
        appendLogsFunc(res.msg)
        layer.closeAll('page');
    })
}
//称号弹框
var userTitleBFunc = function () {
    pomelo.request("connector.userHandler.getMyTitle", {
    }, function (res) {
        let reuslt = eachUserTitle(res.data.have_title_arr, res.data.wear_title)
        layer.open({
            type: 1,
            title: `当前称号:${reuslt.title}`
            , area: ['390px', '260px']
            , offset: '50%' //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
            , id: 'user-title-open' //防止重复弹出
            , content: reuslt.eleStr
            , btn: ['取消']
            , btnAlign: 'c' //按钮居中
            , shade: 0.6 //不显示遮罩
            // , yes: function (e) {
            //     pomelo.request("connector.playerHandler.sellGoods", {
            //         ugid: id,
            //         game_gold: price,
            //         count
            //     }, function (data) {

            //         appendLogsFunc(msg)
            //         layer.msg(msg, { offset: '50%' })
            //     })
            //     layer.closeAll();
            // }
        });
    })

}
//初始我得宠物
var initMyPetPageFunc = function () {
    pomelo.request("connector.userHandler.getMyPet", {
    }, function (data) {
        if (data.code != 200) {
            layer.msg(data.msg, { offset: '50%' })
            return;
        }
    })
}
//挖宝图
var wbtFunc = function (ugid) {
    pomelo.request("connector.userHandler.wbt", {
        ugid
    }, function (res) {
        if (res.code == 1) {
            layer.msg(res.msg, { offset: '50%' })
            let old_num = $("#user-ls").text()
            $("#user-ls").text(parseInt(old_num) + res.data)
            _add_ls_func(res.data)
            $("#logs").prepend(`<p>获得灵石 ${res.data}</p>`)
        }
        if (res.code == 200) {
            layer.msg(res.msg, { offset: '50%' })
            $("#logs").prepend(res.msg)
            initMyGoodsPageFunc()
        } else {
            layer.msg(res.msg, { offset: '50%' })
        }

    })
}
var eachAmrsLevel = function (level, type) {
    let up_exp = 0
    let name = "入门"
    if (level == 0) {
        up_exp = 200
    } else if (level == 1) {
        up_exp = 500
        name = "精修"
    } else if (level == 2) {
        up_exp = 1500
        name = ["剑意境", "枪意境", "锤意境", "伞意境"][type]
    } else if (level == 3) {
        up_exp = 3500
        name = ["剑心境", "枪心境", "锤心境", "伞心境"][type]
    } else if (level == 4) {
        up_exp = 5000
        name = ["剑解境", "枪解境", "锤解境", "伞解境"][type]
    } else if (level == 5) {
        up_exp = 30000
        name = ["剑魂入体", "枪魂入体", "锤魂入体", "伞魂入体"][type]
    } else if (level == 6) {
        up_exp = 100000
        name = ["剑灵出窍", "枪灵出窍", "锤灵出窍", "伞灵出窍"][type]
    } else if (level == 7) {
        up_exp = 500000
        name = ["剑神境", "枪神境", "锤神境", "伞神境"][type]
    }
    return { up_exp, name }
}
//初始我得技能
var initMySkillPageFunc = function () {
    pomelo.request("connector.userHandler.getMySkill", {
    }, function (res) {
        if (res.code != 200) {
            layer.msg(res.msg, { offset: '50%' })
            return;
        }
        for (let i = 0; i < 4; i++) {
            let r = eachAmrsLevel(res.data.arms_level[i], i)
            $("#arms_up_exp_" + i).text(`${res.data.arms_exp[i]}/${r.up_exp}`)
            $("#arms_name_" + i).text(r.name)
        }
        for (const item of res.data.skill) {
            switch (item.hurt_field) {
                case "physical_damage":
                    item.hurt_field = "物理伤害"
                    break;
                case "magic_damage":
                    item.hurt_field = "魔法伤害"
                    break;
                case "restore_damage":
                    item.hurt_field = "治疗恢复"
                    break;
                default:
                    item.hurt_field = "物理伤害"
                    break;
            }
            let div = `
                <div class="layui-col-sm6" style="padding: 5px;">
                    <div class="skill-block">
                        `+ item.name + `
                        <span class="prompt-box">
                            `+ item.info + `
                            <br>
                            触发【100%】&nbsp;&nbsp;基础伤害【` + item.real_damage + `】
                            <br>
                            `+ item.hurt_field + `&nbsp;&nbsp;属性波动【` + item.min_hurt + `~` + item.max_hurt + `】
                            <br>
                            作用单位【`+ item.unit + `】
                        </span>
                    </div>
                </div>`
            $("#skill-page").append(div)
        }
        if (res.data.ueqSkill.length > 0) {
            $('#skill-page').append(`<div id="skill-teji" class='layui-row'><h6>已装备特技</h6><div>`)
        }
        for (const item of res.data.ueqSkill) {
            let div = `
                <div class="layui-col-sm6" style="padding: 5px;">
                    <div class="skill-block">
                        <span style='color:orchid;'>${item.skill.name}</span>
                        <span class="prompt-box">
                            怒气消耗:${item.skill.consume_num}
                            <br>
                         ${item.skill.info}
                        </span>
                    </div>
                </div>`
            $("#skill-teji").append(div)

        }
    })
}
//修炼装备
var repairUserArmsFunc = function (type) {
    pomelo.request("connector.userHandler.repairUserArms", {
        type
    }, function (res) {
        if (res.code != 200) {
            layer.msg(res.msg, { offset: '50%' })
            return;
        }
        for (let i = 0; i < 4; i++) {
            let r = eachAmrsLevel(res.data.arms_level[i], i)
            $("#arms_up_exp_" + i).text(`${res.data.arms_exp[i]}/${r.up_exp}`)
        }
        $('#user-ls').text(res.data.game_silver)
    })
}
//遍历我得快捷任务
const eachUserTask = function (data) {
    $("#user-task").html("")
    for (const item of data) {
        var needGoods = "";
        for (const goods of item.needGoods) {
            needGoods += `<br>【` + goods.name + `】  ` + goods.have_count + `/` + goods.need_count
        }
        var giveGoods = "";
        if (item.task) {
            for (const goods of item.task.give_goods) {
                giveGoods += `<br>【` + goods.name + `】`
            }
            if (item.task.contribution_num && item.task.contribution_num > 0) {
                giveGoods += `<br>帮贡 ` + item.task.contribution_num
            }
            if (item.task.repair_num && item.task.repair_num > 0) {
                giveGoods += `<br>修为点 ` + item.task.repair_num
            }
            if (item.task.game_gold && item.task.game_gold > 0) {
                giveGoods += `<br>仙石 ` + item.task.game_gold
            }
            if (item.task.game_silver && item.task.game_silver > 0) {
                giveGoods += `<br>灵石 ` + item.task.game_silver
            }
            if (item.task.game_copper && item.task.game_copper > 0) {
                giveGoods += `<br>灵石 ` + item.task.game_copper
            }
            var typestr = ""
            var closeTask = ""
            if (item.task.task_type && item.task.task_type == 4) {
                typestr += "<span style='color:burlywood;'>工会</span>-"
                closeTask = `&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" onclick="colseUserTask('` + item.utid + `')"  >放弃</a>`
            } else if (item.task.task_type && item.task.task_type == 5) {
                typestr += "<span style='color:burlywood;'>工会</span>-"
                closeTask = `&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" onclick="colseUserTask('` + item.utid + `')"  >放弃</a>`
            } else if (item.task.task_type && item.task.task_type == 3) {
                typestr += "<span style='color:burlywood;'>特殊</span>-"
            } else if (item.task.task_type && item.task.task_type == 1) {
                typestr += "<span style='color:burlywood;'>主线</span>-"
            } else if (item.task.task_type && item.task.task_type == 2) {
                typestr += "<span style='color:burlywood;'>支线</span>-"
            }
        }

        var needStr = ""
        var giveStr = ""
        if (needGoods) {
            needStr = `所需物品:` + needGoods
        }
        if (giveGoods) {
            giveStr = `任务奖励:` + giveGoods
        }
        var scenesName = ""
        if (item.scenes) {
            scenesName = "场景挑战:" + item.scenes.name + "<br>挑战次数:" + item.scenes_count + "/" + item.task.scenes_count + "<br>"
        }
        var p = `<p class="user-task-info">` + typestr + item.task.name + `
                        <span class="prompt-box">
                            <a href="javascript:;" onclick="payUserTask('` + item.utid + `')"  >完成任务</a>` + closeTask + `
                            <br>
                            ` + item.task.info + `
                            <br>
                            `+ scenesName + `
                            `+ needStr + `
                            <br>
                            ` + giveStr + `
                        </span>
                    </p>`
        $("#user-task").append(p)
    }
}
//遍历已装备的
const eachUserEqs = function (data, type) {
    if (!type) {
        $("#eq-list").html("")
    }
    $('#fb-list').html("")
    let content_html = `<%- include ./components/fb_wear %>`
    $("#fb-wear").html("")
    for (const item of data) {
        if (item.eq_type >= 10000) {
            $("#fb-wear").append(`
                <div class="layui-col-sm6 layui-col-xs6">
                    <div class="tab-block" style="background-image: -webkit-linear-gradient(left, blue, red 25%, blue 50%, red 75%, blue 100%); -webkit-text-fill-color: transparent;">
                    ${item.name}
                </div>
            </div>`)
        } else {
            let eq = equipmentOpenFunc(item, 1)
            let icon = item.equipment.img ? `<img src="` + item.equipment.img + `" width="20px" alt="">` : ''
            let tr = `<tr class='eq-info'>
                                <td><span style='`+ eq.style + `'>` + icon + item.name + ` </span>${eq.skill_icon}<span>` + (item.quality ? '+' + item.quality : '') + `</span> 
                                    <span class='prompt-box'>`+ eq.tip + `</span>    
                                 </td>
                                 <td><a onclick='wearEquipmentFunc("` + item._id + `")'><i class='layui-icon'>&#xe623;</i></a></td>
                        </tr>`
            $("#eq-list").append(tr)
        }
    }
}
//使用物品
var useGoodsFunc = function (gid) {
    pomelo.request("connector.userHandler.useGoods", {
        gid
    }, function (data) {
        if (data.code != 200) {
            layer.msg(data.msg, { offset: '50%' })
            return;
        }
        layer.msg(data.msg, { offset: '50%' })
        appendLogsFunc(data.msg, "#01A9DB")
        $(".layui-this").click()
    })
}
function equipmentOpenFunc(eq, type) {
    var tip = "<div>"
    var eq_type = "武";
    if (eq.info) {
        // <div class='eq-info-tip' style='text-align: left;'>${type ? `&nbsp;&nbsp;&nbsp;<a onclick='wearEquipmentFunc("` + eq._id + `")'>卸下</a><br>` : ''}
        tip += `&nbsp;${eq.info}<br>`
    }
    if (eq.wear_level) {
        tip += "&nbsp;佩戴等级:" + eq.wear_level + "<br>"
    }
    if (eq.level > 0) {
        tip += "&nbsp;<span style='color:red;'>强化 +" + eq.level + "</span><br>"
        tip += "&nbsp;<span style='color:red;'>全属性提升↑ " + eq.quality + "%</span><br>"
        eq_type = `${eq.level > 0 ? ("+" + eq.level) : ""}武`
    }
    var qstr = ""
    eq.quality = eq.quality * 0.01
    if (eq.physical_damage > 0) {
        qstr = "";
        if (eq.level > 0) {
            qstr = "<span style='color:orange;'> +" + (eq.physical_damage * eq.quality).toFixed(0) + "</span>"
        }
        tip += "&nbsp;物理伤害 +" + (~~eq.physical_damage) + qstr + "<br>"
    }
    if (eq.magic_damage > 0) {
        qstr = "";
        if (eq.level > 0) {
            qstr = "<span style='color:orange;'> +" + (eq.magic_damage * eq.quality).toFixed(0) + "</span>"
        }
        tip += "&nbsp;魔法伤害 +" + (~~eq.magic_damage) + qstr + "<br>"
    }
    if (eq.physical_defense > 0) {
        qstr = "";
        if (eq.level > 0) {
            qstr = "<span style='color:orange;'> +" + (eq.physical_defense * eq.quality).toFixed(0) + "</span>"
        }
        tip += "&nbsp;物理防御 +" + (~~eq.physical_defense) + qstr + "<br>"
    }
    if (eq.magic_defense > 0) {
        qstr = "";
        if (eq.level > 0) {
            qstr = "<span style='color:orange;'> +" + (eq.magic_defense * eq.quality).toFixed(0) + "</span>"
        }
        tip += "&nbsp;魔法防御 +" + (~~eq.magic_defense) + qstr + "<br>"
    }
    if (eq.restore_damage > 0) {
        qstr = "";
        if (eq.level > 0) {
            qstr = "<span style='color:orange;'> +" + (eq.restore_damage * eq.quality).toFixed(0) + "</span>"
        }
        tip += "&nbsp;治疗能力 +" + (~~eq.restore_damage) + qstr + "<br>"
    }
    if (eq.hp_cap > 0) {
        qstr = "";
        if (eq.level > 0) {
            qstr = "<span style='color:orange;'> +" + (eq.hp_cap * eq.quality).toFixed(0) + "</span>"
        }
        tip += "&nbsp;气血 +" + (~~eq.hp_cap) + qstr + "<br>"
    }
    if (eq.speed) {
        qstr = "";
        if (eq.level > 0) {
            qstr = "<span style='color:orange;'> +" + (eq.speed * eq.quality).toFixed(0) + "</span>"
        }
        tip += "&nbsp;速度 +" + (~~eq.speed) + qstr + "<br>"
    }
    if (eq.str > 0) {
        qstr = "";
        if (eq.level > 0) {
            qstr = "<span style='color:orange;'> +" + (eq.str * eq.quality).toFixed(0) + "</span>"
        }
        tip += "&nbsp;<span style='color:green;font-weight: 500;'>力量 +" + (~~eq.str) + qstr + "</span><br>"
    }
    if (eq.int > 0) {
        qstr = "";
        if (eq.level > 0) {
            qstr = "<span style='color:orange;'> +" + (eq.int * eq.quality).toFixed(0) + "</span>"
        }
        tip += "&nbsp;<span style='color:green;font-weight: 500;'>法力 +" + (~~eq.int) + qstr + "</span><br>"
    }
    if (eq.con > 0) {
        qstr = "";
        if (eq.level > 0) {
            qstr = "<span style='color:orange;'> +" + (eq.con * eq.quality).toFixed(0) + "</span>"
        }
        tip += "&nbsp;<span style='color:green;font-weight: 500;'>体质 +" + (~~eq.con) + qstr + "</span><br>"
    }
    if (eq.vit > 0) {
        qstr = "";
        if (eq.level > 0) {
            qstr = "<span style='color:orange;'> +" + (eq.vit * eq.quality).toFixed(0) + "</span>"
        }
        tip += "&nbsp;<span style='color:green;font-weight: 500;'>耐力 +" + (~~eq.vit) + qstr + "</span><br>"
    }
    if (eq.agi > 0) {
        qstr = "";
        if (eq.level > 0) {
            qstr = "<span style='color:orange;'> +" + (eq.agi * eq.quality).toFixed(0) + "</span>"
        }
        tip += "&nbsp;<span style='color:green;font-weight:500;'>敏捷 +" + (~~eq.agi) + qstr + "</span><br>"
    }
    if (eq.physical_crit) {
        tip += "&nbsp;<span style='color:violet;font-weight:500;'>物理暴击 +" + (~~eq.physical_crit) + "</span><br>"
    }
    if (eq.magic_crit) {
        tip += "&nbsp;<span style='color:violet;font-weight:500;'>法术暴击 +" + (~~eq.magic_crit) + "</span><br>"
    }
    if (eq.type == 2) {
        // 1武器 2衣服 3头盔 4项链 5腰带 6鞋
        eq_type = `${eq.level > 0 ? ("+" + eq.level) : ""}甲`
    } else if (eq.type == 3) {
        eq_type = `${eq.level > 0 ? ("+" + eq.level) : ""}头`
    } else if (eq.type == 4) {
        eq_type = `${eq.level > 0 ? ("+" + eq.level) : ""}饰`
    } else if (eq.type == 5) {
        eq_type = `${eq.level > 0 ? ("+" + eq.level) : ""}腰`
    } else if (eq.type == 6) {
        eq_type = `${eq.level > 0 ? ("+" + eq.level) : ""}靴`
    }
    let skill_icon = ``
    if (eq.skill) {
        tip += `<span style='color:orchid;'>&nbsp;特技:${eq.skill.name}</span><br>`
        if (eq.skill.consume_num < 75) {
            eq_type += "<span style='color:orchid;'>◐</span>"
            skill_icon = "<span style='color:orchid;'>◐</span>"
        } else if (eq.skill.consume_num < 150) {
            eq_type += "<span style='color:orchid;'>◑</span>"
            skill_icon = "<span style='color:orchid;'>◑</span>"
        } else {
            eq_type += "<span style='color:orchid;'>☯</span>"
            skill_icon = "<span style='color:orchid;'>☯</span>"
        }
    }
    if (eq.score > 0) {
        tip += "<span style='color:'>评分:" + (~~eq.score) + "</span>"
    }
    return {
        tip: tip += "</div>",
        eq_type: '<div>' + eq_type + '</div>',
        style: eq.style,
        skill_icon
    }
}
//佩戴拆卸装备
var wearEquipmentFunc = function (ueid) {
    pomelo.request("connector.playerHandler.wearUserEquipment", {
        ueid
    }, function (data) {
        layer.msg(data.msg, { offset: '50%' })
        if (data.code == 200) {
            getUserEqsFunc();
            $(".layui-this").click()
        }
    })
}
//完成任务
var payUserTask = function (utid) {
    pomelo.request("connector.playerHandler.payUserTask", {
        utid
    }, function (res) {
        if (res.code == 200) {
            var msg = `<p>完成 [` + res.data.name + `] 任务<br>获得奖励:`
            for (const item of res.data.give_goods) {
                msg += `【<span style='` + item.style + `text-shadow: inherit;background-color: inherit;'>` + item.name + `</span>】 `
            }
            msg += "</p>"
            if (res.data.repair_num > 0) {
                msg += `<p>获得修为 ` + res.data.repair_num + ` 点</p>`
            }
            if (res.data.game_gold > 0) {
                msg += `<p>获得仙石 ` + res.data.game_gold + `</p>`
            }
            if (res.data.game_silver > 0) {
                msg += `<p>获得灵石 ` + res.data.game_silver + `</p>`
            }
            layer.msg(`完成[${res.data.name}]任务`, { offset: '50%' })
            appendLogsFunc(msg)
            reloadUserTaskFunc();
        } else {
            layer.msg(res.msg, { offset: '50%' })
            $("#logs").append(res.msg)
        }
    })
}
//初始我得召唤兽
var initMyPetFunc = function () {
    pomelo.request("connector.userHandler.getMyPet", {
    }, function (data) {
        if (data.code != 200) {
            layer.msg(data.msg, { offset: '50%' })
            return
        }
        myPetList = data.data.data
        $('#pet-tab-list').html("")
        $("#pet-info").html("")
        $("#pet-skills").html("")
        for (const item of data.data.data) {
            $('#pet-tab-list').append(`
                <tr class="pet-list-tr" id="pltr-`+ item._id + `" onclick="selectPetShowInfo('` + item._id + `')">
                        <td>`+ item.level + `</td>
                        <td>`+ item.nickname + `</td>
                        
                </tr>`)
            // <td>`+ item.name + `</td>
        }

        let batPet = myPetList.find(s => s.status == 1)
        if (batPet) {
            selectPetShowInfo(batPet._id)
        } else if (myPetList.length > 0) {
            selectPetShowInfo(myPetList[0]._id)
        }
    })
}
//查看召唤兽详细信息
var selectPetShowInfo = function (id) {
    selectPet = id
    $("#pet-info").html("")
    $("#pet-skills").html("")
    let pet = myPetList.find(s => s._id == id)
    $(".pet-list-tr").css("background-color", "inherit")
    $("#pltr-" + id).css("background-color", "#ccc")
    if (pet) {
        let typeStr = '普通'
        if (pet.type == 1) {
            typeStr = "<span style='color:orchid'>稀有</span>"
        } else if (pet.type == 2) {
            typeStr = "<span style='color:orange;'>传说</span>"
        } else if (pet.type == 3) {
            typeStr = "<span style='color:red;'>神兽</span>"
        }
        let info = `<tr>
                        <td>名称:<span>`+ pet.nickname + `</span></td>
                        <td>类型:<span>`+ typeStr + `</span></td>
                        <td>状态:<span>`+ (pet.status == 1 ? "出战" : "休息") + (pet.status
                ? `<a style='float:right;' onclick='playUserPetFunc("` + pet._id + `",0)'>休</a>`
                : `<a style='float:right;' onclick='playUserPetFunc("` + pet._id + `",1)'>战</a>`) + `</span></td>
                    </tr>
                    <tr>
                        <td>成长:<span>`+ (pet.growing_num.toFixed(2)) + `</span></td>
                        <td>气血:<span>`+ (~~pet.hp_cap) + `</span></td>
                        <td>魔法:<span>`+ (~~pet.mp_cap) + `</span></td>
                    </tr>
                    <tr>
                        <td>攻击资质:<span>`+ (~~pet.str_zz) + `</span></td>
                        <td>命中:<span>`+ (~~pet.hit) + `</span></td>
                        <td>体质:<span>`+ (~~pet.con) + `</span><span  id='pet-ptn-con' class='pet-ptn-num'></span><a class='add-pet-ptn' onclick='clickAddPtnFunc(2,"con",this)'>＋</a></td>
                    </tr>
                    <tr>
                        <td>防御资质:<span>`+ (~~pet.vit_zz) + `</span></td>
                        <td>物理伤害:<span>`+ (~~pet.physical_damage) + `</span></td>
                        <td>魔力:<span>`+ (~~pet.int) + `</span><span  id='pet-ptn-int' class='pet-ptn-num'></span><a class='add-pet-ptn' onclick='clickAddPtnFunc(2,"int",this)'>＋</a></td>
                    </tr>
                    <tr>
                        <td>体力资质:<span>`+ (~~pet.con_zz) + `</span></td>
                        <td>物理防御:<span>`+ (~~pet.physical_defense) + `</span></td>
                        <td>力量:<span>`+ (~~pet.str) + `</span><span  id='pet-ptn-str' class='pet-ptn-num'></span><a class='add-pet-ptn' onclick='clickAddPtnFunc(2,"str",this)'>＋</a></td>

                    </tr>
                    <tr>
                        <td>法力资质:<span>`+ (~~pet.int_zz) + `</span></td>
                        <td>魔法伤害:<span>`+ (~~pet.magic_damage) + `</span></td>
                        <td>耐力:<span>`+ (~~pet.vit) + `</span><span id='pet-ptn-vit' class='pet-ptn-num'></span><a class='add-pet-ptn' onclick='clickAddPtnFunc(2,"vit",this)'>＋</a></td>
                    </tr>
                    <tr>
                        <td>速度资质:<span>`+ (~~pet.speed_zz) + `</span></td>
                        <td>魔法防御:<span>`+ (~~pet.magic_defense) + `</span></td>
                        <td>敏捷:<span>`+ pet.agi + `</span><span id='pet-ptn-agi' class='pet-ptn-num'></span><a class='add-pet-ptn' onclick='clickAddPtnFunc(2,"agi",this)'>＋</a></td>
                    </tr>
                    <tr>
                        <td>躲避资质:<span>`+ (~~pet.dodge) + `</span></td>
                        <td>治疗能力:<span>`+ (~~pet.restore_damage) + `</span></td>
                        <td>潜力:<span id='pet-ptn-num'>`+ (pet.potential_num) + `</span></td>
                    </tr>
                    <tr>
                        <td>寿命:<span>`+ (pet.type == 3 ? "永生" : ~~pet.food) + `</span></td>
                        <td>速度:<span>`+ (~~pet.speed) + `</span></td>
                        <td><a onclick='upUserPetLevelFunc("`+ pet._id + `",1)'>升级</a>&nbsp;&nbsp;<a onclick='upUserPetLevelFunc("` + pet._id + `",2)'>分配&nbsp;&nbsp;</a></td>
                    </tr>
                    <tr><td><a onclick='upUserPetLevelFunc("` + pet._id + `",3)'>放生</a></td><td><span class='turnInto-pet'>
                        <a onclick='turnIntoPetFunc("${pet._id}")'>幻化</a>
                        <span class='prompt-box'>可将兽宠幻化为宠物蛋(0级)<br>
                            普通兽宠2w灵石一次 成功率80%<br>
                            稀有兽宠10w灵石一次 成功率70%<br>
                            其他2w仙石 成功率85%<br>
                            </span></span></td></tr>
                    `
        $("#pet-info").html(info)
        for (const s of pet.skill) {
            let is_high = ''
            if (s.high) {
                is_high = `style='color:orchid';`
            }
            let sEle = `
                <div class="layui-col-sm6" style="padding: 2px;">
                    <div class="pet-skill-info">
                        <span ${is_high}>` + s.name + `</span>
                        <span class="prompt-box">`+ s.info + `</br>
                            </span>
                    </div>
                </div>`
            $("#pet-skills").append(sEle)
        }
        if (pet.potential_num > 0) {
            $(".add-pet-ptn").css("display", "inherit")
        }
    }
}
//幻化宠物
var turnIntoPetFunc = function (pid) {
    pomelo.request("connector.userHandler.turnIntoPet", {
        pid
    }, function (res) {
        if (res.insert) {
            initMyPetFunc()
            if (res.insert.game_gold) {
                let xs = $("#user-xs").text()
                $('#user-xs').text(parseInt(xs) - res.insert.game_gold)
            } else {
                let ls = $("#user-ls").text()
                $('#user-ls').text(parseInt(ls) - res.insert.game_silver)
            }
        }
        layer.msg(res.msg, { offset: '50%' })
    })
}
//初始系统中出售物品
var initSystemGoodsFunc = function (pageIndex, type) {
    pomelo.request("connector.systemHandler.getSystemSellGoods", {
        pageIndex
    }, function (res) {
        if (res.code != 200) {
            layer.msg(res.msg, { offset: '50%' })
            return
        }
        $('#sys-goods-page').html("")
        for (const item of res.data.goods) {
            let price_type = "灵石"
            if (item.price_type == 1) {
                price_type = "灵石"
            } else if (item.price_type == 2) {
                price_type = "仙石"
            } else if (item.price_type == 3) {
                price_type = "比武积分"
            } else if (item.price_type == 4) {
                price_type = "灵叶"
            }
            let icon = (item.img) ? `<img src="` + item.img + `" width="20px" alt="">` : ''
            let div = `<div class="layui-col-sm4 layui-col-xs6"  style='padding:5px'>
                            <div class="sys-goods-block">
                            <a href="javascript:;" title=''>
                              ${icon}<span style="` + item.style + `background-color: initial;">` + item.name + `</span></a>
                            <a href="javascript:;" class="by-goods" onclick="byGoodsToSystemFunc(2,'` + item._id + `')">购买</a>
                            <span class="prompt-box">` + item.info + `</br>
                                <p><span class="price-tip">售价:` + item.price + price_type + `</span></span></p>
                            </div></div>`
            $('#sys-goods-page').append(div)
        }
        if (type == 'init') {
            layui.use('laypage', function () {
                var laypage = layui.laypage;
                //执行一个laypage实例
                laypage.render({
                    elem: 'system-sell-page' //注意，这里的 test1 是 ID，不用加 # 号
                    , count: res.count, //数据总数，从服务端得到
                    limit: 15,
                    jump: function (obj, first) {
                        // //obj包含了当前分页的所有参数，比如：
                        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        // console.log(obj.limit); //得到每页显示的条数
                        //首次不执行
                        if (!first) {
                            initSystemGoodsFunc(obj.curr)
                            //do something
                        }
                    }
                });
            });
        }
    })
}
var operateSellGoodsFunc = function (id) {
    //取回到背包
    pomelo.request("connector.userHandler.shelfMyGoods", {
        id: id
    }, function (res) {
        layer.msg(res.msg, { offset: '50%' })
        return
        initPlayersSellGoodsFunc(1)
    })
}
//初始仙坊集市
var initPlayersSellGoodsFunc = function (pageIndex, type) {
    pomelo.request("connector.playerHandler.getPlayerSellGoods", {
        pageIndex: pageIndex ? pageIndex : 1
    }, function (res) {
        if (res.code != 200) {
            layer.msg(res.msg, { offset: '50%' })
            return
        }
        $('#player-sell-my').html("")
        for (const item of res.data.mySellGoods) {
            var divId = "div-" + item._id;
            var countId = "count-" + item._id;
            if (item.goods) {
                var pwd = ""
                if (item.pwd) {
                    pwd = "<br/><span style='color:black;'>交易密码:" + item.pwd + "</span>"
                }
                var style = `style="` + item.goods.style + `"`
                var name = item.goods.name.length > 6 ? item.goods.name.substr(0, 6) + ".." : item.goods.name
                var div = `<div  style='padding: 2px 0 2px 5px;' class="layui-col-xs6 layui-col-sm6 layui-col-md3"  ` + style + ` id="` + divId + `">
                                <div class="my-sell-goods-block">
                                  <span ` + style + `>` + name + `</span>x<span>` + item.count + `</span>
                                    <span class="prompt-box" style="color: #888;text-shadow: none;">
                                        <span class="price-tip">` + item.sell_game_gold + `仙石</span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="operateSellGoodsFunc('` + item._id + `')">取回</a>
                                        `+ pwd + `
                                        <br/>` + item.goods.info + `
                                        </span></span>
                                </div></div>`;
                $('#player-sell-my').append(div)
            } else if (item.type == 1) {
                var pwd = ""
                if (item.pwd) {
                    pwd = "<br/><span style='color:black;'>交易密码:" + item.pwd + "</span>"
                }
                var name = item.name.length > 6 ? item.name.substr(0, 6) + ".." : item.name
                var eq = equipmentOpenFunc(item);
                var div = `<div style='padding: 2px 0 2px 5px;' class="layui-col-xs6 layui-col-sm6 layui-col-md3" id="` + divId + `">
                        <div class="my-sell-goods-block">
                                   <span style='` + item.style + `'>` + name + `</span>x<span>` + item.count + `</span><div class="eq-star">` + eq.eq_type + `</div>
                                    <span class="prompt-box" style="color: #888;text-shadow: none;">
                                        <span class="price-tip">` + item.sell_game_gold + `仙石</span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="operateSellGoodsFunc('` + item._id + `')">取回</a>
                                        `+ pwd + `
                                        <br/>` + eq.tip + `</span></span>
                                    </div></div>`;
                $('#player-sell-my').append(div)
            }
        }
        var playerGoods = res.data.playerSellUser;
        var time = moment().subtract(2, 'days')
        $('#player-sell-list').html("")
        for (const item of playerGoods) {
            var divId = "div-" + item._id;
            var countId = "count-" + item._id;
            var seconds = moment(new Date(item.sell_at)).diff(time, "seconds");
            //分钟
            var mintus = (seconds / 60);
            //小时
            var hours = (mintus / 60);
            hours = mintus < 60 ? parseInt(mintus) + "分" : parseInt(hours) + "小时"

            if (item.goods) {
                var style = `style="` + item.goods.style + `"`
                var name = item.goods.name.length > 6 ? item.goods.name.substr(0, 6) + ".." : item.goods.name
                let addstr = ""
                if (item.count > 1) {
                    addstr = `<span  style='color:black;'>` + (item.sell_game_gold / item.count).toFixed(0) + `仙石/个</span>&nbsp;&nbsp;&nbsp;<a onclick=bySellGoodsFunc('` + item._id + `',1)>单个购买</a>
                                        <br>`
                }
                var ispwd = ""
                if (item.isPwd) {
                    ispwd = "🔐"
                }
                let icon = (item.goods && item.goods.img) ? `<img src="` + item.goods.img + `" width="20px" alt="">` : ''
                var div = `<div  style='padding: 2px 0 2px 5px;' class="layui-col-xs6 layui-col-sm6 layui-col-md3"   ` + style + ` id="` + divId + `">
                        <div class="my-sell-goods-block">
                                   <a  href="javascript:;" ` + style + `> 
                                    ${icon}
                                    <span ${style}>` + name + `</span>x<span>` + item.count + `</span></a>
                                    <span class="prompt-box" style="color: #888;text-shadow: none;">
                                        <span class="price-tip">` + item.sell_game_gold + `仙石</span>
                                        &nbsp;&nbsp;&nbsp;<a onclick=bySellGoodsFunc('` + item._id + `',2)>购买</a>&nbsp;&nbsp;&nbsp;税率11%
                                        <br>
                                        `+ addstr + `
                                        <span>卖家:<a onclick="getOtherUserInfoFunc('`+ item.user._id + `')">` + item.user.nickname + `</a>&nbsp;&nbsp;&nbsp;` + ispwd + `</span>
                                        <br/>` + item.goods.info + ` <br>剩余:` + hours + `</span>
                                        </span>
                                    </div></div>`;
                $('#player-sell-list').append(div)
            } else if (item.type == 1) {
                var ispwd = ""
                if (item.isPwd) {
                    ispwd = "🔐"
                }
                var name = item.name.length > 6 ? item.name.substr(0, 6) + ".." : item.name
                var eq = equipmentOpenFunc(item);
                let icon = (item.img) ? `<img src="` + item.img + `" width="20px" alt="">` : ''
                var div = `<div  style='padding: 2px 0 2px 5px;' class="layui-col-xs6 layui-col-sm6 layui-col-md3"   id="` + divId + `">
                        <div class="my-sell-goods-block">
                                   <a  href="javascript:;" >
                                    ${icon}
                                    <span style='` + item.style + `'>` + name + `</span></a><div class="eq-star">` + eq.eq_type + `</div>
                                    <span class="prompt-box" style="color: #888;text-shadow: none;">
                                        <span class="price-tip">` + item.sell_game_gold + `仙石</span>
                                        &nbsp;&nbsp;&nbsp;<a onclick=bySellGoodsFunc('` + item._id + `',2)>购买</a>&nbsp;&nbsp;&nbsp;税率11%
                                        <br>
                                        <span>卖家:<a onclick="getOtherUserInfoFunc('`+ item.user._id + `')">` + item.user.nickname + `</a>&nbsp;&nbsp;&nbsp;` + ispwd + `</span>
                                        <br/>` + eq.tip + `剩余:` + hours + `</span></span>
                                    </div> </div>`;
                $('#player-sell-list').append(div)
            }
        }
        if (type == 'init') {
            layui.use('laypage', function () {
                var laypage = layui.laypage;
                //执行一个laypage实例
                laypage.render({
                    elem: 'player-sell-page' //注意，这里的 test1 是 ID，不用加 # 号
                    , count: res.data.count, //数据总数，从服务端得到
                    limit: 28,
                    jump: function (obj, first) {
                        // //obj包含了当前分页的所有参数，比如：
                        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        // console.log(obj.limit); //得到每页显示的条数
                        //首次不执行
                        if (!first) {
                            $('#player-sell-list').html("")
                            initPlayersSellGoodsFunc(obj.curr)
                            //do something
                        }
                    }
                });
            });
        }
    })

}
var getOtherUserInfoFunc = function () { }
//购买玩家物品
var bySellGoodsFunc = function (id, type) {
    pomelo.request("connector.playerHandler.byPalyerGoods", {
        usgid: id, type
    }, function (res) {
        if (res.code != 200) {
            layer.msg(res.msg, { offset: '50%' })
            return
        }
        layer.msg(`<p styple="color: pink;">成功使用` + res.data.price + `仙石购买【` + res.data.name + `】</p>`)
        updateUserPriceFunc();
    })
}
//购买系统物品
var byGoodsToSystemFunc = function (type, id) {
    pomelo.request("connector.playerHandler.byGoodsToSystem", {
        id, type
    }, function (res) {
        if (res.code != 200) {
            layer.msg(res.msg, { offset: '50%' })
            return
        }
        layer.msg(res.msg, { offset: '50%' })
        appendLogsFunc(res.msg)
        updateUserPriceFunc();
    })
}
//初始任务中心
var initSystemTaskFunc = function () {
    pomelo.request("connector.systemHandler.getSystemTask", {
    }, function (res) {
        if (res.code != 200) {
            layer.msg(res.msg, { offset: '50%' })
            return
        }
        for (const item of res.data.list) {
            var task_day = "日"
            if (item.task_day == 2) {
                task_day = "周"
            } else if (item.task_day == 3) {
                task_day = "月"
            }
            var div = `<div class="layui-col-sm4" style='padding:5px;'>
                        <div class='system-task-info'>
                                `+ item.name + `&nbsp;&nbsp;&nbsp;<a onclick="addUserTaskFunc('` + item._id + `')">领取</a>
                                <br>
                                等级:`+ item.level + `/` + task_day + `/` + item.task_limit + `次
                                <br>
                                `+ item.info + `
                            </div>
                            </div>`
            $('#system-task').append(div)
        }
    })
}
//合成物品
var makeGoodsFunc = function () {
    pomelo.request("connector.userHandler.makeGoods", {
        arr: selectGoodsArr
    }, function (data) {
        layer.msg(data.msg, { offset: '50%' })
        if (data.code == 200) {
            selectGoodsArr = []
            appendLogsFunc("恭喜你，成功合成【<span style='" + data.data.goods.style
                + "'>" + data.data.goods.name + "</span>】x" + data.data.count)
            $(".layui-this").click()
            return
        }
    })
}
//分解物品
var sellGoodsFunc = function () {
    pomelo.request("connector.userHandler.sellGoods", {
        arr: selectGoodsArr
    }, function (res) {
        if (res.code == 200) {
            let str = ''
            if (res.data.game_silver) {
                str += " 灵石+" + res.data.game_silver
            }
            if (res.data.game_gold) {
                str += " 仙石+" + res.data.game_gold
            }
            layer.msg(res.msg + str, { offset: '50%' })
            selectGoodsArr = []
            appendLogsFunc(res.msg + str)
            $(".layui-this").click()
            updateUserPriceFunc()
            return
        } else {
            layer.msg(res.msg)
        }
    })
}
//出战宠物
var playUserPetFunc = function (id, status) {
    pomelo.request("connector.userHandler.playUserPet", {
        pid: id,
        status
    }, function (data) {
        if (data.code != 200) {
            layer.msg(data.msg, { offset: '50%' })
            return;
        }
        layer.msg((status == 1 ? "出战" : "休息") + "成功~", { offset: '50%' })
    })
}
//升级宠物  type==1升级  type==2分配潜力 type==3放生
var upUserPetLevelFunc = function (pid, type) {
    let parms = { pid: pid, type }
    if (type == 2) {
        Object.assign(parms, {
            str: $("#pet-ptn-str").text(),
            int: $("#pet-ptn-int").text(),
            agi: $("#pet-ptn-agi").text(),
            vit: $("#pet-ptn-vit").text(),
            con: $("#pet-ptn-con").text()
        })
    }
    pomelo.request("connector.userHandler.upUserPetLevel", parms, function (data) {
        layer.msg(data.msg, { offset: '50%' })
        appendLogsFunc(data.msg)
        if (data.code == 200) {
            $(".layui-this").click()
        }

    })
}
var sendMsgFunc = function () {
    let send_channel = $("#send-msg-channel").val()
    let send_msg = $("#send-msg-input").val()
    if (!send_msg) {
        layer.msg("请输入内容", { offset: '50%' })
        return
    }
    pomelo.request("chat.chatHandler.send", {
        send_channel,
        send_msg
    }, function (data) {
        if (data.code != 200) {
            layer.msg(data.msg, { offset: "50%" })
        }
        $("#send-msg-input").val("")
    })
}
//保存/分配属性点
var saveUserPtnFunc = function () {
    let parms = {
        str: $("#uinfo-ptn-str").text(),
        int: $("#uinfo-ptn-int").text(),
        agi: $("#uinfo-ptn-agi").text(),
        vit: $("#uinfo-ptn-vit").text(),
        con: $("#uinfo-ptn-con").text()
    }
    pomelo.request("connector.userHandler.allocationPoint", parms, function (data) {
        layer.msg(data.msg, { offset: '50%' })
        appendLogsFunc(data.msg)
        if (data.code == 200) {
            $(".layui-this").click()
        }
    })
}
//获取我得装备列表
var getUserEqsFunc = function () {
    pomelo.request("connector.userHandler.getUserEqs", {}, function (data) {
        if (data.code == 200) {
            eachUserEqs(data.data)
        }
    })
}
//更新玩家货币
var updateUserPriceFunc = function () {
    pomelo.request("connector.userHandler.updateUserPrice", {}, function (res) {
        if (res.code == 200) {
            $('#user-ls').text(~~res.data.game_silver)
            $('#user-xs').text(~~res.data.game_gold)
        }
    })
}
var showMyTeamFunc = function (is_show) {
    pomelo.request("connector.teamHandler.showMyTeam", { is_show }, function (res) {
        if (res.code == 200) {
            layer.msg("操作成功", { offset: '50%' })
            initPageTeamList(global.mid)
        } else {
            layer.msg(res.msg, { offset: '50%' })
        }
    })
}
//界面操作
var clickAddPtnFunc = function (typeNum, typeStr, ele) {
    if (typeNum === 2) {
        let num = $("#pet-ptn-" + typeStr).text();
        let last = parseInt($('#pet-ptn-num').text());
        if (last == NaN || last <= 0) {
            return
        }
        if (!num) {
            num = 0;
        }
        num = parseInt(num) + 1
        $("#pet-ptn-" + typeStr).text("+" + num)
        $("#pet-ptn-num").text(last - 1)
    } else {
        let num = $("#uinfo-ptn-" + typeStr).text();
        let last = parseInt($('#uinfo_potential_num').text());
        if (last == NaN || last <= 0) {
            return
        }
        if (!num) {
            num = 0;
        }
        num = parseInt(num) + 1
        $("#uinfo-ptn-" + typeStr).text("+" + num)
        $("#uinfo_potential_num").text(last - 1)
    }
}
var top_three_func = function (i) {
    style = ''
    if (i == 1) {
        style = 'color:goldenrod;font-weight: 500;'
    } else if (i == 2) {
        style = 'color:silver;font-weight: 500;'
    } else if (i == 3) {
        style = 'color:slategray;font-weight: 500;'
    } else {
        style = 'color:unset;'
    }
    return style
}
var selectRankFunc = function (type) {
    pomelo.request("connector.systemHandler.getRankList", { type }, function (res) {
        if (res.code != 200) {
            layer.msg(res.msg, { offset: '50%' })
        }
        let str = ""
        let i = 1
        let typeStr = "等级"
        if (type == 2) {
            typeStr = "兽宠"
            for (const item of res.data) {
                let style = top_three_func(i)
                str += `<a onclick="showOtherInfoFunc('${item.uid}')"><span style="${style}">${i}&nbsp;&nbsp;${item.user_nickname} 的 ${item.nickname}  ${~~item.score} </span></a><br>`
                i++
            }
        } else if (type == 3) {
            typeStr = "神兵"
            for (const item of res.data) {
                let style = top_three_func(i)
                str += `<a onclick="showOtherInfoFunc('${item.uid}')"><span style="${style}">${i}&nbsp;&nbsp;${item.user_nickname} 的 ${item.name}  ${~~item.score} </span></a><br>`
                i++
            }
        } else {
            for (const item of res.data) {
                let style = top_three_func(i)
                str += `<a onclick="showOtherInfoFunc('${item._id}')"><span style="${style}">${i}&nbsp;&nbsp; ${item.nickname}  ${item.level}</span></a><br>`
                i++
            }
        }
        let maxWinHeight = $(window).height()
        let maxWinWidth = $(window).width()
        let lessHeight = 0
        if (maxWinHeight > 500) {
            lessHeight = 870
        } else {
            lessHeight = (maxWinHeight * 0.8)
        }
        layer.open({
            type: 1
            , area: ['220px', '500px']
            , offset: [ //为了演示，随机坐标
                ((maxWinHeight - lessHeight) < 20 ? 50 : (maxWinHeight - lessHeight))
                , ($(window).width() - (maxWinWidth - 20))]
            , id: 'rank-layer-open' //防止重复弹出
            , title: typeStr + '排行榜'
            , content: `<div style="padding: 5px 10px;font-size: 12px;">${str}</div>`
            , btnAlign: 'c' //按钮居中
            , shade: 0 //不显示遮罩
            , yes: function () {
                layer.closeAll();
            }
        });
    })
}
//初始聚仙阁楼页面
var initMyFationPageFunc = function () {
    pomelo.request("connector.fationHandler.initFation", {
    }, function (res) {
        let mf = res.data.myFation


        if (mf) {
            $('.fation-dis').show()
            $('#leave-fation-btn').show()
            let fation = mf.fation
            $("#fation_level").text(fation.level)
            $('#fation-name-title').text(fation.name)
            $('#fation_pharmacy_level').text(fation.pharmacy_level)
            $("#fation_forging_level").text(fation.forging_level)
            $('#fation_practice_level').text(fation.practice_level)
            $('#fation_funds_num').text(fation.funds_num)
            $('#fation_contribution_num').text(fation.contribution_num)
            $("#fation_max_user_count").text(fation.user_count + '/' + fation.max_user_count)
            $('#fation_my_contribution_num').text(mf.contribution_num)
            $('#fation_my_use_contribution_num').text(mf.use_contribution_num)
            $("#fation_my_type").text(mf.type)
            if (mf.type_level >= 4) {
                $('#show-apply-btn').show()
                if (res.data.apply_count) {
                    $("#show-apply-btn").html(`查看申请<span class="layui-badge" style='height: 12px;line-height: 12px;'>${res.data.apply_count}</span>`)
                }
                $('.up-fation-level').show()
            }
            $('#add-fation-btn').show()
            $('#add-fation-btn').text("查看其他工会")
        } else {

            $('#create-fation-btn').show()
            $('#add-fation-btn').show()
        }
    })
}
//打开创建工会弹窗
var openCreateFationModel = function () {
    layer.open({
        type: 1
        , area: '300px;'
        , offset: 'auto'
        , id: 'create-fation-layer-open' //防止重复弹出
        , title: '创建工会'
        , content: `<div style="padding: 5px 10px;font-size: 12px;">
                <div class='layui-row'>将花费5w仙石作为创建资金</div>
                <div class='layui-row'>工会名称:<input tyle='text' id='c-fation-name' placeholder="输入工会名称(6字符内)></div> 
                </div>`
        , btnAlign: 'c' //按钮居中
        , btn: ['创建', '取消']
        , shade: 0.7 //不显示遮罩
        , yes: function () {
            let name = $("#c-fation-name").val()
            if (!name || name.length > 6) {
                layer.msg("名称输入有误", { offset: "50%" })
                return
            }
            pomelo.request("connector.fationHandler.createFation", {
                name
            }, function (res) {
                layer.msg(res.msg, { offset: '50%' })
                if (res.code != 200) {
                    layer.closeAll("iframe");
                } else {
                    layer.closeAll()
                }
            })
        }
    });
}
//申请工会
var applyForFationFunc = function (fid) {
    pomelo.request("connector.fationHandler.applyForFation", {
        fid
    }, function (res) {
        layer.msg(res.msg, { offset: "50%" })
    })
}
//同意入会
var doneFationApplyFunc = function (ele, type, fation_apply_id) {
    pomelo.request("connector.fationHandler.doneFationApply", {
        type, faid: fation_apply_id
    }, function (res) {
        layer.msg(res.msg, { offset: '50%' })
        if (res.code == 200) {
            if (type == 1 || type == 2) {
                $(ele).parent().parent().remove()
            }
        }
    })
}
//升降职位
var upUserFationLevelFunc = function (type, uid) {
    pomelo.request("connector.fationHandler.upUserFationLevel", {
        type, uid
    }, function (res) {
        layer.msg(res.msg)
    })
}
//打开工会列表
var selectFationListModel = function () {
    pomelo.request("connector.fationHandler.getFationList", {
    }, function (res) {
        let eleStr = ``
        for (const item of res.data) {
            eleStr += `<tr>
                    <td>${item.level}</td>
                    <td>${item.name}</td>
                    <td>${item.user_count}/${item.max_user_count}</td>
                    <td>${item.user.nickname}</td>
                    <td><a onclick='applyForFationFunc("${item._id}")'>申请</a></td>
                    </tr>`
        }
        layer.open({
            type: 1
            , area: '500px;'
            , offset: 'auto'
            , id: 'fation-list-layer-open' //防止重复弹出
            , title: '工会列表'
            , content: `<div style="padding: 5px 10px;font-size: 12px;">
                    <table lay-skin="nob" class="layui-table">
                        <thead>
                    <tr>
                        <td>等级</td>
                        <td>名称</td>
                        <td>人数</td> 
                        <td>会长</td> 
                        <td>操作</td> 
                    </tr>
                </thead>
                <tbody id="fation-list">
                    ${eleStr}
                </tbody>
            </table>
                </div>`
            , shade: 0.7 //不显示遮罩
            , yes: function () {

            }
        });
    })
}
//查看申请
var showFationApplyModel = function () {
    pomelo.request("connector.fationHandler.getFationApply", {
    }, function (res) {
        let eleStr = ``
        let i = 1
        for (const item of res.data) {
            eleStr += `<tr>
                    <td>${i++}</td>
                    <td>${item.user.nickname}</td>
                    <td>${item.user.level}</td>
                    <td>${item.created_at}</td>
                    <td><a onclick='doneFationApplyFunc(this,1,"${item._id}")'>同意</a>&nbsp;&nbsp;
                        <a onclick='doneFationApplyFunc(this,2,"${item._id}")'>拒绝</a></td>
                    </tr>`
        }
        layer.open({
            type: 1
            , area: '500px;'
            , offset: 'auto'
            , id: 'fation-apply-layer-open' //防止重复弹出
            , title: '申请列表'
            , content: `<div style="padding: 5px 10px;font-size: 12px;">
                    <table lay-skin="nob" class="layui-table">
                        <thead>
                    <tr>
                        <td>序号</td>
                        <td>名称</td>
                        <td>等级</td> 
                        <td>时间</td> 
                        <td>操作</td> 
                    </tr>
                </thead>
                <tbody id="fation-apply-list">
                    ${eleStr}
                </tbody>
            </table>
                </div>`
            , shade: 0.7 //不显示遮罩
            , yes: function () {
            }
        });
    })
}
//查看工会人员
var showMyFationListModel = function () {
    pomelo.request("connector.fationHandler.showFationUserList", {
    }, function (res) {
        let eleStr = ``
        for (const item of res.data.list) {
            eleStr += `<tr>
                    <td>${item.user.level}</td>
                    <td>${item.user.nickname}</td>
                    <td>${item.type}/${item.contribution_num}</td>
                    <td>${item.created_at}</td>
                    ${res.data.myUserFation.type >= 4 ? `<td><a onclick='upUserFationLevelFunc(1,"${item.user._id}")'>提拔</a>&nbsp;&nbsp;<a onclick='upUserFationLevelFunc(2,"${item.user._id}")'>降职</a>&nbsp;&nbsp;<a onclick='upUserFationLevelFunc(-1,"${item.user._id}")'>请离</a></td>` : ''}
                    </tr>`
        }
        layer.open({
            type: 1
            , area: '500px;'
            , offset: 'auto'
            , id: 'fation-list-layer-open' //防止重复弹出
            , title: '工会人员'
            , content: `<div style="padding: 5px 10px;font-size: 12px;">
                    <table lay-skin="nob" class="layui-table">
                        <thead>
                    <tr>
                        <td>等级</td>
                        <td>名称</td>
                        <td>职位/贡献</td> 
                        <td>加入时间</td> 
                        <td>操作</td> 
                    </tr>
                </thead>
                <tbody id="fation-list">
                    ${eleStr}
                </tbody>
            </table>
                </div>`
            , shade: 0.7 //不显示遮罩
            , yes: function () {

            }
        });
    })
}
//脱离工会
var laeveFationModel = function () {
    pomelo.request("connector.fationHandler.leaveFation", {
    }, function (res) {
        layer.msg(res.msg, { offset: '50%' })
        initMyFationPageFunc()
    })

}
//点技能
var upFationUserSkill = function (type) {
    pomelo.request("connector.fationHandler.upFationUserSkill", {
        type
    }, function (res) {
        layer.msg(res.msg, { offset: '50%' })
    })
}
//捐赠
var donateFationFunds = function () {
    pomelo.request("connector.fationHandler.donateFationFunds", {
    }, function (res) {
        layer.msg(res.msg, { offset: '50%' })
        if (res.code == 200) {
            appendLogsFunc(res.msg)
            let xs = $('#user-xs').text()
            $("#user-xs").text(parseInt(xs) - 5000)
            let fation_funds_num = $('#fation_funds_num').text()
            $('#fation_funds_num').text(parseInt(fation_funds_num) + 5000)
            let fation_my_contribution_num = $('#fation_my_contribution_num').text()
            $('#fation_my_contribution_num').text(parseInt(fation_my_contribution_num) + 25)
            let fation_contribution_num = $('#fation_contribution_num').text()
            $('#fation_contribution_num').text(parseInt(fation_contribution_num) + 25)
            let fation_my_use_contribution_num = $('#fation_my_use_contribution_num').text()
            $('#fation_my_use_contribution_num').text(parseInt(fation_my_use_contribution_num) + 25)
        }
    })
}
//领取任务
var getFationTaskFunc = function () {
    pomelo.request("connector.fationHandler.getFationTask", {
    }, function (res) {
        layer.msg(res.msg, { offset: '50%' })
        if (res.code == 200) {
            reloadUserTaskFunc()
        }
    })
}
//升级工会
var upFationFunc = function (type) {
    pomelo.request("connector.fationHandler.upFation", {
        type
    }, function (res) {
        layer.msg(res.msg, { offset: '50%' })
        if (res.code == 200) {
        }
    })
}
//聚灵 
var polyLinFunc = function (type) {
    pomelo.request("connector.userHandler.polyLin", {
        type
    }, function (res) {
        layer.msg(res.msg, { offset: '50%' })
        appendLogsFunc(res.msg)
    })
}
//放弃任务
var colseUserTask = function (tid) {
    pomelo.request("connector.fationHandler.closeUserTask", {
        tid: tid
    }, function (res) {
        layer.msg(res.msg, { offset: '50%' })
    })
}
//整理
var allSellGoodsFunc = function (tid) {
    pomelo.request("connector.userHandler.allSellGoods", {
    }, function (res) {
        layer.msg(res.msg, { offset: '50%' })
        initMyGoodsPageFunc()
    })
}
//重置属性
var resetAttributeFunc = function () {
    layer.msg('确定重置属性点吗，这将花费600w灵石', {
        time: 5000,
        btn: ['确定', '取消']
        , yes: function () {
            layer.closeAll();
            pomelo.request("connector.userHandler.resetAttribute", {
            }, function (res) {
                layer.msg(res.msg, { offset: '50%' })
                initPageUserInfo()
            })
        }
        , btn2: function () {
            layer.closeAll();
        }
    });
}
//合宠
var changeTurnIntoEggFunc = function () {

    let ele = ""
    for (const item of myPetList) {
        ele += `<option value='${item._id}'>${item.name}/${item.growing_num.toFixed(2)}成长</option>`
    }
    let content_html = `<%- include ./page/fit_pet %>`
    layer.msg(content_html, {
        time: 120000,
        btn: ['取消']
        , btn2: function () {
            layer.closeAll();
        }
    });
    $("#fit-pet-a").html(ele)
    $("#fit-pet-b").html(ele)

    // layer.msg(res.msg, { offset: '50%' })
}
//预览合宠
var showFitPetFunc = function (type) {
    let a_id = $("#fit-pet-a").val()
    let b_id = $("#fit-pet-b").val()
    if (!a_id || !b_id) {
        layer.msg("请选择兽宠", { offset: '50%' })
        return
    }
    pomelo.request("connector.userHandler.getMyPet", {
        ids: a_id + "," + b_id
    }, function (res) {
        if (res.code == 200) {
            if (res.data.data.length < 2) {
                layer.msg("请正确选择兽宠", { offset: '50%' })
                return
            }
            let ap = res.data.data[0]
            let bp = res.data.data[1]
            $("#fit_growing_num").text(ap.growing_num.toFixed(2) + "~" + bp.growing_num.toFixed(2))
            $("#fit_str_zz").text(ap.str_zz + "~" + bp.str_zz)
            $("#fit_speed_zz").text(ap.speed_zz + "~" + bp.speed_zz)
            $("#fit_vit_zz").text(ap.vit_zz + "~" + bp.vit_zz)
            $("#fit_con_zz").text(ap.con_zz + "~" + bp.con_zz)
            $("#fit_int_zz").text(ap.int_zz + "~" + bp.int_zz)
            $("#fit_dodge_zz").text(ap.dodge_zz + "~" + bp.dodge_zz)
            let skill_arr = []
            $("#fit-pet-skills").html("")
            ap.skill = ap.skill.concat(bp.skill)
            for (const s of ap.skill) {
                if (skill_arr.indexOf(s.name) == -1) {
                    skill_arr.push(s.name)
                    let is_high = `style='color:#333;'`
                    if (s.high) {
                        is_high = `style='color:orchid;'`
                    }
                    let sEle = `
                <div class="layui-col-sm6" style="padding: 2px;">
                    <div class="pet-skill-info" style='background-color:white;'>
                        <span ${is_high}>` + s.name + `</span>
                        <span class="prompt-box">`+ s.info + `</br>
                            </span>
                    </div>
                </div>`
                    $("#fit-pet-skills").append(sEle)
                }
            }
        }
    })
}
//确认合成
var subFitPetFunc = function () {
    let a_id = $("#fit-pet-a").val()
    let b_id = $("#fit-pet-b").val()
    if (!a_id || !b_id) {
        layer.msg("请选择兽宠", { offset: '50%' })
        return
    }
    pomelo.request("connector.userHandler.fitPet", {
        ids: a_id + "," + b_id
    }, function (res) {
        layer.msg(res.msg, { offset: '50%' })
    })
}
//
var addUserPetSkillFunc = function () {
    let pet = myPetList.find(s => s._id == selectPet)
    if (!pet) {
        layer.msg('请先选择兽宠', { offset: '50%' })
        return
    }
    let content_html = `<%- include ./page/add_user_pet_skill %>`
    layer.msg(content_html, {
        time: 120000,
        btn: ["上书", '取消']

        , yes: function () {
            let ugid = $("#my-pet-skill-goods").val()
            let upid = selectPet
            pomelo.request("connector.userHandler.addUserPetSkill", {
                ugid, upid
            }, function (res) {
                if (res.code == 200) {
                    let exists_pet = myPetList.find(s => s._id == res.data._id)
                    exists_pet.skill = res.data.skill
                    selectPetShowInfo(exists_pet._id)
                }
                layer.msg(res.msg, { offset: '50%' })
            })
        }
        , btn2: function () {
            layer.closeAll();
        }
    })
    $("#shu-select-pet").html(`${pet.name}&nbsp;&nbsp;等级:${pet.level}&nbsp;&nbsp;${pet.growing_num.toFixed(2)}成长`)
    pomelo.request("connector.userHandler.getMyPetSkillGoods", {
    }, function (res) {
        for (const item of res.data) {
            $("#my-pet-skill-goods").append(`<option value='${item._id}'>${item.goods.name}</option>`)
        }
    })
}
$(function () {
    localStorage.setItem("switchBatLog", "1")
    var __encode = 'sojson.com', _a = {}, _0xb483 = ["\x5F\x64\x65\x63\x6F\x64\x65",
        "\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];
    (function (_0xd642x1) { _0xd642x1[_0xb483[0]] = _0xb483[1] })(_a); var __Ox89f5c = ["\x69\x73\x5F\x72",
        "\x69\x6E\x64\x65\x78\x4F\x66", "\x68\x72\x65\x66", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x3F", "",
        "\x72\x65\x70\x6C\x61\x63\x65", "\x70\x75\x73\x68\x53\x74\x61\x74\x65", "\x68\x69\x73\x74\x6F\x72\x79",
        "\x63\x6C\x69\x63\x6B", "\x23\x74\x65\x61\x6D\x2D\x74\x61\x70", "\x72\x61\x6E\x64\x6F\x6D",
        "\x75\x6E\x64\x65\x66\x69\x6E\x65\x64", "\x6C\x6F\x67", "\u5220\u9664",
        "\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A\u671F\u5F39\u7A97\uFF0C",
        "\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C", "\x73\x6F\x6A\x73", "\x6F\x6E\x2E\x63\x6F\x6D"]; var is_r =
            window[__Ox89f5c[0x3]][__Ox89f5c[0x2]][__Ox89f5c[0x1]](__Ox89f5c[0x0]) > -1; if (is_r) {
                var url =
                    window[__Ox89f5c[0x3]][__Ox89f5c[0x2]]; if (url[__Ox89f5c[0x1]](__Ox89f5c[0x4]) != -1) {
                        url =
                            url[__Ox89f5c[0x6]](/(\?|#)[^'"]*/, __Ox89f5c[0x5]); window[__Ox89f5c[0x8]][__Ox89f5c[0x7]]({}, 0, url)
                    };
                setTimeout(function () {
                    $(__Ox89f5c[0xa])[__Ox89f5c[0x9]](); setTimeout(function () { startBatFunc(1) },
                        (Math[__Ox89f5c[0xb]]() * 3000) + 1000)
                }, (Math[__Ox89f5c[0xb]]() * 3000) + 1000)
            }; (function (_0xc678x3, _0xc678x4,
                _0xc678x5, _0xc678x6, _0xc678x7, _0xc678x8) {
                _0xc678x8 = __Ox89f5c[0xc]; _0xc678x6 = function (_0xc678x9) {
                    if (typeof
                        alert !== _0xc678x8) { alert(_0xc678x9) }; if (typeof console !== _0xc678x8) { console[__Ox89f5c[0xd]](_0xc678x9) }
                };
                _0xc678x5 = function (_0xc678xa, _0xc678x3) { return _0xc678xa + _0xc678x3 }; _0xc678x7 = _0xc678x5(__Ox89f5c[0xe],
                    _0xc678x5(__Ox89f5c[0xf], __Ox89f5c[0x10])); try {
                        _0xc678x3 = __encode; if (!(typeof _0xc678x3 !== _0xc678x8 &&
                            _0xc678x3 === _0xc678x5(__Ox89f5c[0x11], __Ox89f5c[0x12]))) { _0xc678x6(_0xc678x7) }
                    } catch (e) {
                        _0xc678x6(_0xc678x7)
                    }
            })({})
})