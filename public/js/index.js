$(document).ready(function () {
    var $results = $("#results");
    var xhr;

    var sourceUrl = "https://jsonplaceholder.typicode.com/posts";

    var itemsCount = 10;
    var pageSize = parseInt($("#page-sizes").find("option:selected").val());

    init(pageSize);

    var paginationInst = $(".pagination").pagination({
        currPage: 1,
        items: itemsCount,
        itemsOnPage: pageSize,
        onDraw: function (currPage, pageSize) {
            console.log(currPage, pageSize);

            if (xhr && xhr.readyState !== 4) {
                xhr.abort();
            }

            var start = (currPage - 1) * pageSize;
            var limit = pageSize;

            xhr = $.ajax({
                type: "GET",
                url: sourceUrl,
                data: {
                    _start: start,
                    _limit: limit,
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);

                    // template method of yourself
                    var html = getTemplate(data);
                    $results.html(html);
                },
                error: function (jqXHR, textStatus, errorThrown) {},
            });
        },
    });

    function init(pageSize) {
        $.ajax({
            type: "GET",
            url: sourceUrl,
            dataType: "json",
            success: function (data) {
                console.log("initial_data", data);
                paginationInst.draw(1, data.length, pageSize);
            },
            error: function (jqXHR, textStatus, errorThrown) {},
        });
    }

    function getTemplate(data) {
        var $template = $("<div>");
        data.forEach(function (item) {
            var $id = $("<span>")
                .addClass("d-block")
                .text("id: " + item.id);
            var $title = $("<span>")
                .addClass("d-block")
                .text("title: " + item.title);
            var $body = $("<span>")
                .addClass("d-block")
                .text("body: " + item.body);
            var $user_id = $("<span>")
                .addClass("d-block")
                .text("userId: " + item.userId);
            $template.append($id).append($title).append($body).append($user_id).append("<br>");
        });
        return $template.html();
    }

    $("#page-sizes").on("change", function () {
        var pageSize = parseInt($(this).find("option:selected").val());
        init(pageSize);
    });
});
