$(function () {

    // ====================
    // 初期設定
    // ====================
  
    // 一覧にユーザー名を表示
    var sh_usr = false;
  
    // 一覧にコメントを表示
    var sh_cmt = false;
  
    // 一覧にタグを表示
    var sh_tag = false;
  
    // 一覧の投稿をタイル状に敷き詰める
    var sh_til = false;
  
    // 詳細をモーダルで表示（falseの場合直接SNSへリンクされます）
    var sh_mdl = true;
  
    // 本番時は下の「○○○○○」をドメイン名「●●●●●」部分をご契約ディレクトリ名に置き換えてご利用ください
    var json_url = 'https://asp.smartcontest.jp/hashtag/nsnl/?c=json';
    var item_url = 'https://asp.smartcontest.jp/hashtag/nsnl/'
    var key_num = 0;
  
  
    // ====================
    // JSON 連携
    // ====================
  
    function getJson(jurl) {
      $.ajax({
        scriptCharset: 'UTF-8',
        url: jurl,
        dataType: 'jsonp',
        jsonpCallback: 'get_json',
        type: "GET",
        success: function (data) {
          var insert = '';
          var first_pk;
          var owl;
          for (var key in data) {
  
            if (!first_pk) first_pk = key;
  
            insert += '<li>';
  
            // リストのHTML
            if (sh_mdl == true) {
              if (data[key].carousel_media_url != "") {
                insert += '<a href="#' + data[key].post_id + '" class="colorbox multiple"><img src="' + data[key].thum_url + '" class="instagram-image"></a>';
              } else {
                insert += '<a href="#' + data[key].post_id + '" class="colorbox"><img src="' + data[key].thum_url + '" class="instagram-image"></a>';
              }
            } else {
              if (data[key].carousel_media_url != "") {
                insert += '<a href="' + data[key].url + '" target="_blank" class="multiple"><img src="' + data[key].thum_url + '" class="instagram-image"></a>';
              } else {
                insert += '<a href="' + data[key].url + '" target="_blank"><img src="' + data[key].thum_url + '" class="instagram-image"></a>';
              }
            }
            if (sh_usr == true) {
              insert += '<a class="userName" href="'+data[key].url +'" target="_blank">' + data[key].username + '</a>';
            }
            if (sh_cmt == true) {
              insert += '<span class="description">' + data[key].description + '</span>';
            }
            if (sh_tag == true) {
              insert += '<span class="hash_tag">' + data[key].hash_tag + '</span>';
            }
  
            insert += '</li>';
            key_num++;
            if(key_num == 12){
                break;
            }
          };
  
          // HTML書き出し先
          $('.smarthash ul').append(insert);
          if (sh_til == true) {
            $('.smarthash ul').imagesLoaded(function () {
              $('.smarthash ul').masonry('reloadItems').masonry('layout');
            });
            $(window).load(function () {
              $('.smarthash ul').masonry({
                percentPosition: true
              });
            });
          }
  
          if (sh_mdl == true) {
            var insert_zoom = '';
            for (var key in data) {
              insert_zoom += '<div id="' + data[key].post_id + '">';
  
              // モーダルのHTML
              if (data[key].carousel_media_url != "") {
                // 複数枚投稿の場合
                insert_zoom += '<div class="data carousel_wrapper"><dl><dt class="imgBox">';
                var cmu = data[key].carousel_media_url;
                insert_zoom += '<div class="carousel' + first_pk + '">';
                for (i = 0; i < cmu.split(',').length; i++) {
                  if (cmu.split(',')[i].match(/.mp4/) && iPhone == true) {
                    insert_zoom += '<div class="carousel_item"><p><video webkit-playsinline playsinline controls poster="img/video.png"><source src="' + cmu.split(',')[i] + '"></video></p></div>';
                  } else if (cmu.split(',')[i].match(/.mp4/) && iPhone == false) {
                    insert_zoom += '<div class="carousel_item"><p><video webkit-playsinline playsinline controls poster=""><source src="' + cmu.split(',')[i] + '"></video></p></div>';
                  } else {
                    insert_zoom += '<div class="carousel_item"><p><img src="' + cmu.split(',')[i] + '" class="instagram-image"></p></div>';
                  }
                }
                insert_zoom += '</div>';
              } else {
                // 単体投稿の場合
                insert_zoom += '<div class="data"><dl><dt class="imgBox">';
                if (data[key].image_url.match(/.mp4/) && iPhone == true) {
                  insert_zoom += '<video webkit-playsinline playsinline controls poster="img/video.png"><source src="' + data[key].image_url + '"></video>';
                } else if (data[key].image_url.match(/.mp4/) && iPhone == false) {
                  insert_zoom += '<video webkit-playsinline playsinline controls poster=""><source src="' + data[key].image_url + '"></video>';
                } else {
                  insert_zoom += '<img src="' + data[key].image_url + '" alt="">';
                }
              }
              insert_zoom += '</dt><dd><div class="data_head">';
              insert_zoom += '<span class="dateBox"><a href="' + data[key].url + '" target="_blank">' + data[key].username + '</a>';
              insert_zoom += '<span>' + data[key].created_at + '</span></span>';
              insert_zoom += '<span class="appOoen"><a href="' + data[key].url + '" target="_blank">SNSで開く</a></span></div>';
              insert_zoom += '<div class="commentBox">' + data[key].description + '</div>';
              if (data[key].item) {
                insert_zoom += '<div class="item_name">' + data[key].item + '</div>';
              }
              if (data[key].item_img) {
                insert_zoom += '<div class="item_img"><img src="' + item_url + data[key].item_img + '" alt=""></div>';
              }
              if (data[key].item_url) {
                insert_zoom += '<div class="item_url"><a href="' + data[key].item_url + '" target="_blank">詳細を見る</a></div>';
              }
              insert_zoom += '</dd></dl></div>';
  
              insert_zoom += '</div>';
            };
  
            // HTML書き出し先
            $('.smarthash_zoom').append(insert_zoom);
            $('a.colorbox').colorbox({
              inline: true,
              closeButton: true,
              maxWidth: '85%',
              onComplete: function () {
                //複数投稿時にカルーセル処理
                $('.carousel' + first_pk).owlCarousel({
                  items: 1,
                  navigation: true,
                  navigationText: ["", ""],
                  autoHeight: false,
                  singleItem: true,
                  afterAction: function () {
                    $.colorbox.resize();
                  }
                });
                owl = $('.carousel' + first_pk).data('owlCarousel');
              }
            });
  
            //複数投稿時にカルーセル処理終了
            $(document).bind('cbox_close', function () {
              owl.destroyControls();
            });
          }
  
          //エラー画像チェック
          $('.smarthash_zoom img, .smarthash img').error(function () {
            $(this).attr({
              src: "img/noimg.png"
            });
          });
  
        },
        error: function (data) {
          console.log('error');
        }
      });
    };
    getJson(json_url);
  
    /* more */
    $('.smarthash_more_btn').click(function () {
      console.log(key_num);
      getJson(json_url + '&sk=' + key_num);
    });
  
  });
  