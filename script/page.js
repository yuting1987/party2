(function() {
    Date.format = function(e, t) {
        var a = Date.formatLogic, r = -1 !== t.indexOf("a") || -1 !== t.indexOf("A"), n = [];
        n.d = e.getDate(), n.dd = a.pad(n.d, 2), n.ddd = a.i18n.shortDayNames[e.getDay()], 
        n.dddd = a.i18n.dayNames[e.getDay()], n.M = e.getMonth() + 1, n.MM = a.pad(n.M, 2), 
        n.MMM = a.i18n.shortMonthNames[n.M - 1], n.MMMM = a.i18n.monthNames[n.M - 1], n.yyyy = e.getFullYear(), 
        n.yyy = a.pad(n.yyyy, 2) + "y", n.yy = a.pad(n.yyyy, 2), n.y = "y", n.H = e.getHours(), 
        n.hh = a.pad(r ? a.convertTo12Hour(n.H) : n.H, 2), n.h = r ? a.convertTo12Hour(n.H) : n.H, 
        n.HH = a.pad(n.H, 2), n.m = e.getMinutes(), n.mm = a.pad(n.m, 2), n.s = e.getSeconds(), 
        n.ss = a.pad(n.s, 2), n.z = e.getMilliseconds(), n.zz = n.z + "z", n.zzz = a.pad(n.z, 3), 
        n.ap = 12 > n.H ? "am" : "pm", n.a = 12 > n.H ? "am" : "pm", n.AP = 12 > n.H ? "AM" : "PM", 
        n.A = 12 > n.H ? "AM" : "PM";
        for (var s = 0, o = "", i = ""; t.length > s; ) {
            for (i = t.charAt(s); t.length > s + 1 && void 0 !== n[i + t.charAt(s + 1)]; ) i += t.charAt(++s);
            o += void 0 !== n[i] ? n[i] : i, s++;
        }
        return o;
    }, Date.formatLogic = {
        pad: function(e, t) {
            var a = 1, r = "";
            if (1 > t) return "";
            for (var n = 0; t > n; n++) a *= 10, r += "0";
            var s = e;
            return s = r + e, s = s.substring(s.length - t);
        },
        convertTo12Hour: function(e) {
            return 0 === e % 12 ? 12 : e % 12;
        },
        i18n: {
            dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
            shortDayNames: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
            monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            shortMonthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
        }
    }, Date.prototype.toFormat = function(e) {
        return Date.format(this, e);
    }, Date.parseFormat = function(e, t) {
        var a = new Date(2e3, 0, 1), r = [];
        r.d = "([0-9][0-9]?)", r.dd = "([0-9][0-9])", r.M = "([0-9][0-9]?)", r.MM = "([0-9][0-9])", 
        r.yyyy = "([0-9][0-9][0-9][0-9])", r.yyy = "([0-9][0-9])[y]", r.yy = "([0-9][0-9])", 
        r.H = "([0-9][0-9]?)", r.hh = "([0-9][0-9])", r.h = "([0-9][0-9]?)", r.HH = "([0-9][0-9])", 
        r.m = "([0-9][0-9]?)", r.mm = "([0-9][0-9])", r.s = "([0-9][0-9]?)", r.ss = "([0-9][0-9])", 
        r.z = "([0-9][0-9]?[0-9]?)", r.zz = "([0-9][0-9]?[0-9]?)[z]", r.zzz = "([0-9][0-9][0-9])", 
        r.ap = "([ap][m])", r.a = "([ap][m])", r.AP = "([AP][M])", r.A = "([AP][M])";
        for (var n = Date.parseLogic, s = 0, o = "", i = Array(""), u = ""; t.length > s; ) {
            for (u = t.charAt(s); t.length > s + 1 && void 0 !== r[u + t.charAt(s + 1)]; ) u += t.charAt(++s);
            void 0 !== r[u] ? (o += r[u], i[i.length] = u) : o += u, s++;
        }
        var y = RegExp(o), d = e.match(y);
        if (void 0 === d || d.length !== i.length) return void 0;
        for (s = 0; i.length > s; s++) if ("" !== i[s]) switch (i[s]) {
          case "yyyy":
          case "yyy":
            a.setYear(n.parseInt(d[s]));
            break;

          case "yy":
            a.setYear(2e3 + n.parseInt(d[s]));
            break;

          case "MM":
          case "M":
            a.setMonth(n.parseInt(d[s]) - 1);
            break;

          case "dd":
          case "d":
            a.setDate(n.parseInt(d[s]));
            break;

          case "hh":
          case "h":
          case "HH":
          case "H":
            a.setHours(n.parseInt(d[s]));
            break;

          case "mm":
          case "m":
            a.setMinutes(n.parseInt(d[s]));
            break;

          case "ss":
          case "s":
            a.setSeconds(n.parseInt(d[s]));
            break;

          case "zzz":
          case "zz":
          case "z":
            a.setMilliseconds(n.parseInt(d[s]));
            break;

          case "AP":
          case "A":
          case "ap":
          case "a":
            ("PM" === d[s] || "pm" === d[s]) && 12 > a.getHours() && a.setHours(a.getHours() + 12), 
            "AM" !== d[s] && "am" !== d[s] || 12 !== a.getHours() || a.setHours(0);
        }
        return a;
    }, Date.parseLogic = {
        unpad: function(e) {
            for (var t = e; t.length > 1 && "0" === t[0]; ) t = t.substring(1, t.length);
            return t;
        },
        parseInt: function(e) {
            return parseInt(this.unpad(e), 10);
        }
    }, Date.prototype.fromFormat = function(e, t) {
        return this.setTime(Date.parseFormat(e, t).getTime()), this;
    };
})(), String.prototype.toSize = function(e) {
    var t, a, r, n, s, o, i;
    for (null == e && (e = 0), s = [ "bytes", "KB", "MB", "GB", "TB" ], r = parseInt(this, 10) || 0, 
    t = o = 0, i = s.length; i > o; t = ++o) if (a = s[t], n = r / Math.pow(1024, t), 
    1024 > n) return 0 === t ? 0 === r ? "0KB" : "> 1KB" : n.toFixed(e) + s[t];
    return (r / Math.pow(1024, s.length - 1)).toFixed(e) + s[s.length - 1];
};

var Q, __indexOf = [].indexOf || function(e) {
    for (var t = 0, a = this.length; a > t; t++) if (t in this && this[t] === e) return t;
    return -1;
};

Q = [ "對party中任何一位異性告白（或Andy指定）", "自己脫一件內衣褲or衣服（不可穿回去）", "找任何一位幫你脫去外衣（不可穿回去）", "對party中任何一位異性公主抱10秒（或Andy指定）", "KISS派對中任何一位異性的臉頰", "KISS派對中任何一位異性的肚臍", "找任何一位異性互吸手指頭10秒", "Andy在你的耳邊吹氣10秒", "找一位異性一起合吃掉一個零時", "找兩位異性用拖鞋打腳掌", "熊抱一位異性10秒", "學『變態假面』內褲套頭，並做出標準POSE", "找一位異性火車便當姿勢繞場一圈", "在一位異性身上翻滾10秒", "用屁股寫出你最喜歡的人的名字", "仰臥起坐吃餅乾三次（與異性一起）", "對異性撒嬌直到他願意掏出100元給你", "找一位異背著繞場一圈", "找兩位異性甜手臂從手掌到肩膀", "找位異性當鋼管跳豔舞20秒", "性感的起立蹲下重複3次", "與任何一位異性十指相扣深情款款10秒", "扶立挺身吃餅乾三次（與異性一起）", "與Andy喝交杯酒", "拉開褲子倒入冰塊", "拉開上衣倒入冰塊", "用嘴巴幫異性拉下有拉鍊的衣服", "Funnel喝酒一次", "貼心小服務，幫一位異性按摩肩膀10秒", "找一位異性拿皮帶打你屁股三次", "對大家擠胸5秒，然後問說我帥/美嗎？", "和一位異性在棉被裡交換一件衣物（限時30秒）", "找一位異性趴在胯下跳江南style 10秒", "找一位異性協助老漢推車爬一圈", "找一位異性把酒瓶放在下面餵你酒", "找一位異性互相甜光對方身上的三個刮鬍泡", "學『蠟筆小新』跳高叉舞10次", "背對大家露出1/2屁股，並扭屁股大喊：大象屁股圓又圓", "內褲外穿舉起雙手，大喊我是Superman我要拯救地球", "找兩位異性親你的奶頭or大腿", "在肚臍上畫一顆愛心（由Andy執行）", "把頭埋在另外一位異性的胸口轉動5秒", "找一位異性從背後熊抱餵你喝酒", "用浴巾遮住男脫褲女脫上衣脫好後倒數5秒（穿回去）", "和一位異性臉對臉夾住氣球繞一圈", "畫出你的人魚線/事業線（由Andy執行）", "把Andy壓到牆角，深情款款的KISS臉頰，並說我愛你", "找兩位異性一起甜你的耳朵", "找兩位異性一起甜你的脖子", "找一位異性幫你在棉被裡，脫掉褲子給大家看後再穿回去", "找一位異性互相摩鼻子10秒", "找一位異性被多他扭屁股10秒（要貼到他的前面）", "讓Andy幫你從頭上到一杯水", "貼心小服務，幫一位異性按摩大腿10秒", "和一位異性肚子對肚子夾住氣球繞一圈", "甜一位異性的腋下2下", "找兩位異性一起彈你耳多2下", "找一位異性躺在他的大腿上讓他餵你喝酒", "找一位異性火車便當抱10秒", "找一位異性幫他的手指頭戴保險套" ], 
Q.sort(function() {
    return Math.random() > .5 ? !0 : !1;
}), $(function() {
    var e, t, a, r, n, s, o;
    return o = $(window), e = $("body"), n = $("todo"), a = $("#keyin"), r = $("#report td"), 
    t = $("#inbar"), e.on("touchstart", function(t) {
        var n, s;
        return t.preventDefault(), $(e).hasClass("report") ? ($(".num", a).text("?"), $(e).removeClass("report")) : (s = Math.floor(Math.random() * Q.length), 
        n = Q.slice(s, s + 1)[0], Q.splice(s, 1), $(r).text(n), n || $(r).text("ERROR"), 
        $(e).addClass("report"));
    }), t.on("keydown", function(t) {
        var a, n;
        return 13 === t.keyCode ? ($(e).toggleClass("report"), n = parseInt($(this).val(), 10), 
        n > 0 && 10 > n && (n = Math.floor(Math.random() * Q.length), a = Q.slice(n, n + 1)[0], 
        Q.splice(n, 1), $(r).text(a), a || $(r).text("ERROR")), $(this).val("_")) : $(this).val("");
    }), t.on("keyup", function() {
        return $(".num", a).text($(this).val());
    }), s = function() {
        return 0 > __indexOf.call(window, "ontouchstart") && t.focus(), setTimeout(function() {
            return s();
        }, 1500);
    }, s();
});