    $(document).ready(function () {
            $('.douban_item').each(function () {
                var _this = $(this);
                var strs = _this.attr('urlstring').toString();
                var db_reg = /^https\:\/\/(movie|book)\.douban\.com\/subject\/([0-9]+)\/?/;
                if (db_reg.test(strs)) {
                    var db_type = strs.replace(db_reg, "$1");
                    var db_id = strs.replace(db_reg, "$2").toString();
                    var db_api = "https://douban.edui.fun/";
                    if (db_type === 'movie') {
                        var ls_item = 'movie' + db_id;
                        var url = db_api + "movies/" + db_id;
                        if (localStorage.getItem(ls_item) == null || localStorage.getItem(ls_item) === 'undefined') {
                            $.ajax({
                                url: url, type: 'GET', dataType: "json", success: function (data) {
                                    localStorage.setItem(ls_item, JSON.stringify(data));
                                    movieShow(_this, ls_item, strs)
                                }
                            })
                        } else {
                            movieShow(_this, ls_item, strs)
                        }
                    } else if (db_type === 'book') {
                        var ls_item = 'book' + db_id;
                        var url = db_api + "v2/book/id/" + db_id;
                        if (localStorage.getItem(ls_item) == null || localStorage.getItem(ls_item) === 'undefined') {
                            $.ajax({
                                url: url, type: 'GET', dataType: 'json', success: function (data) {
                                    localStorage.setItem('book' + db_id, JSON.stringify(data));
                                    bookShow(_this, ls_item, strs)
                                }
                            })
                        } else {
                            bookShow(_this, ls_item, strs)
                        }
                    }
                }
            });
        });

        function movieShow(_this, ls_item, str) {
            var storage = localStorage.getItem(ls_item);
            var data = JSON.parse(storage);
            var db_star = Math.ceil(data.rating);
            $("<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><div class='post-preview--title'><a target='_blank' style='box-shadow: none; font-weight: bolder;' href='" + str + "'>" + data.name + "</a></div><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating + "</div></div><time class='post-preview--date'>导演：" + data.director + " / 类型：" + data.genre + " / " + data.year + "</time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.intro.replace(/\s*/g, "") + "</section></div></div><img referrerpolicy='no-referrer' loading='lazy' class='post-preview--image' src=" + data.img + "></div>").replaceAll(_this)
        }

        function bookShow(_this, ls_item, str) {
            var storage = localStorage.getItem(ls_item);
            var data = JSON.parse(storage);
            var db_star = Math.ceil(data.rating.average);
            $("<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><div class='post-preview--title'><a target='_blank' style='box-shadow: none; font-weight: bolder;' href='" + str + "'>" + data.title + "</a></div><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating.average + "</div></div><time class='post-preview--date'>作者：" + data.author + " / 出版："+ data.pubdate +" / "+ data.publisher +" </time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.summary.replace(/\s*/g, "") + "</section></div></div><img referrerpolicy='no-referrer' loading='lazy' class='post-preview--image' src=" + data.images.medium + "></div>").replaceAll(_this)
        }