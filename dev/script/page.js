var Q,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Q = ['對party中任何一位異性告白（或Andy指定）', '自己脫一件內衣褲or衣服（不可穿回去）', '找任何一位幫你脫去外衣（不可穿回去）', '對party中任何一位異性公主抱10秒（或Andy指定）', 'KISS派對中任何一位異性的臉頰', 'KISS派對中任何一位異性的肚臍', '找任何一位異性互吸手指頭10秒', 'Andy在你的耳邊吹氣10秒', '找一位異性一起合吃掉一個零時', '找兩位異性用拖鞋打腳掌', '熊抱一位異性10秒', '學『變態假面』內褲套頭，並做出標準POSE', '找一位異性火車便當姿勢繞場一圈', '在一位異性身上翻滾10秒', '用屁股寫出你最喜歡的人的名字', '仰臥起坐吃餅乾三次（與異性一起）', '對異性撒嬌直到他願意掏出100元給你', '找一位異背著繞場一圈', '找兩位異性甜手臂從手掌到肩膀', '找位異性當鋼管跳豔舞20秒', '性感的起立蹲下重複3次', '與任何一位異性十指相扣深情款款10秒', '扶立挺身吃餅乾三次（與異性一起）', '與Andy喝交杯酒', '拉開褲子倒入冰塊', '拉開上衣倒入冰塊', '用嘴巴幫異性拉下有拉鍊的衣服', 'Funnel喝酒一次', '貼心小服務，幫一位異性按摩肩膀10秒', '找一位異性拿皮帶打你屁股三次', '對大家擠胸5秒，然後問說我帥/美嗎？', '和一位異性在棉被裡交換一件衣物（限時30秒）', '找一位異性趴在胯下跳江南style 10秒', '找一位異性協助老漢推車爬一圈', '找一位異性把酒瓶放在下面餵你酒', '找一位異性互相甜光對方身上的三個刮鬍泡', '學『蠟筆小新』跳高叉舞10次', '背對大家露出1/2屁股，並扭屁股大喊：大象屁股圓又圓', '內褲外穿舉起雙手，大喊我是Superman我要拯救地球', '找兩位異性親你的奶頭or大腿', '在肚臍上畫一顆愛心（由Andy執行）', '把頭埋在另外一位異性的胸口轉動5秒', '找一位異性從背後熊抱餵你喝酒', '用浴巾遮住男脫褲女脫上衣脫好後倒數5秒（穿回去）', '和一位異性臉對臉夾住氣球繞一圈', '畫出你的人魚線/事業線（由Andy執行）', '把Andy壓到牆角，深情款款的KISS臉頰，並說我愛你', '找兩位異性一起甜你的耳朵', '找兩位異性一起甜你的脖子', '找一位異性幫你在棉被裡，脫掉褲子給大家看後再穿回去', '找一位異性互相摩鼻子10秒', '找一位異性被多他扭屁股10秒（要貼到他的前面）', '讓Andy幫你從頭上到一杯水', '貼心小服務，幫一位異性按摩大腿10秒', '和一位異性肚子對肚子夾住氣球繞一圈', '甜一位異性的腋下2下', '找兩位異性一起彈你耳多2下', '找一位異性躺在他的大腿上讓他餵你喝酒', '找一位異性火車便當抱10秒', '找一位異性幫他的手指頭戴保險套'];

Q.sort(function() {
  if (Math.random() > 0.5) {
    return true;
  } else {
    return false;
  }
});

$(function() {
  var body, inbar, keyin, report, todo, update, win;

  win = $(window);
  body = $('body');
  todo = $('todo');
  keyin = $('#keyin');
  report = $('#report td');
  inbar = $('#inbar');
  body.on('touchstart', function(e) {
    var dost, num;

    e.preventDefault();
    if ($(body).hasClass('report')) {
      $('.num', keyin).text('?');
      return $(body).removeClass('report');
    } else {
      num = Math.floor(Math.random() * Q.length);
      dost = Q.slice(num, num + 1)[0];
      Q.splice(num, 1);
      $(report).text(dost);
      if (!dost) {
        $(report).text('ERROR');
      }
      return $(body).addClass('report');
    }
  });
  inbar.on('keydown', function(e) {
    var dost, num;

    if (e.keyCode === 13) {
      $(body).toggleClass('report');
      num = parseInt($(this).val(), 10);
      if (num > 0 && num < 10) {
        num = Math.floor(Math.random() * Q.length);
        dost = Q.slice(num, num + 1)[0];
        Q.splice(num, 1);
        $(report).text(dost);
        if (!dost) {
          $(report).text('ERROR');
        }
      }
      return $(this).val('_');
    } else {
      return $(this).val('');
    }
  });
  inbar.on('keyup', function() {
    return $('.num', keyin).text($(this).val());
  });
  update = function() {
    if (__indexOf.call(window, 'ontouchstart') < 0) {
      inbar.focus();
    }
    return setTimeout((function() {
      return update();
    }), 1500);
  };
  return update();
});
