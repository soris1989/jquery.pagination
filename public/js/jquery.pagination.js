(function ($) {
    /************************************************* charLimit */
    $.fn.pagination = function (options) {
        // This is the easiest way to have default options.
        var settings = $.extend(
            {
                currPage: 1,
                items: 100,
                itemsOnPage: 10,
                pageSides: 2,
                size: "", // sm/lg
                prevText: "הקודם",
                nextText: "הבא",
                onDraw: function (currPage, itemsOnPage, e) {},
            },
            options
        );

        var $this = $(this);
        var currPage = settings.currPage;
        var items = settings.items;
        var itemsOnPage = settings.itemsOnPage;
        var lastPage = Math.ceil(items / itemsOnPage);
        var pageSides = settings.pageSides;
        var size = settings.size;
        var prevText = settings.prevText;
        var nextText = settings.nextText;

        if (size) {
            $this.addClass("pagination-" + size);
        }

        // init plugin
        draw(currPage, items, itemsOnPage);

        function createPages() {
            // pages
            let pages = [];
            // Loop through
            for (let i = 1; i <= lastPage; i++) {
                // Define offset
                let offset = i === 1 || i === lastPage ? pageSides + 1 : pageSides;
                // If added
                if (
                    i === 1 ||
                    (currPage - offset <= i && currPage + offset >= i) ||
                    i === currPage ||
                    i === lastPage
                ) {
                    pages.push(i);
                } else if (i === currPage - (offset + 1) || i === currPage + (offset + 1)) {
                    pages.push("...");
                }
            }
            return pages;
        }

        function createElements(pages) {
            var $ul = $("<ul>").addClass("pagination");

            var $li = $("<li>").addClass("page-item");
            var $prevPage = $("<a>")
                .attr("type", "button")
                .prop("disabled", currPage === 1)
                .addClass("page-link prev" + (currPage === 1 ? " disabled" : ""))
                .text(prevText);
            $li.append($prevPage);
            $ul.append($li);

            pages.forEach(function (item, i) {
                var $li = $("<li>").addClass(
                    "page-item" + (pages[i] === currPage ? " active" : "")
                );
                if (item === "...") {
                    var $spanellipsis = $('<span class="page-ellipsis">').text(item);
                    $li.append($spanellipsis);
                } else {
                    var $linkPage = $("<a>")
                        .attr("type", "button")
                        .addClass("page-link page")
                        .text(item);
                    $li.append($linkPage);
                }
                $ul.append($li);
            });

            var $li = $("<li>").addClass("page-item");
            var $nextPage = $("<a>")
                .attr("type", "button")
                .prop("disabled", currPage === lastPage)
                .addClass("page-link next" + (currPage === lastPage ? " disabled" : ""))
                .text(nextText);
            $li.append($nextPage);
            $ul.append($li);

            $this.html($ul);
        }

        $(document.body).on("click", ".page-link", function (e) {
            var $target = $(e.target);
            if ($target.hasClass("prev")) {
                currPage--;
            } else if ($target.hasClass("next")) {
                currPage++;
            } else if ($target.hasClass("page")) {
                currPage = parseInt($target.text());
            }

            draw(currPage, items, itemsOnPage);
        });

        function getPage() {
            return currPage;
        }

        function setPage(page) {
            if (page >= 1 && page <= lastPage) {
                currPage = page;
                draw(currPage, items, itemsOnPage);
            } else {
                console.error("page " + page + " is out pagination boundaries.");
            }
        }

        function draw(_currPage, _items, _itemsOnPage) {
            currPage = _currPage;
            items = _items;
            itemsOnPage = _itemsOnPage;
            lastPage = Math.ceil(_items / _itemsOnPage);
            var pages = createPages();
            createElements(pages);

            settings.onDraw(currPage, itemsOnPage);
        }

        return {
            this: $this,
            getPage: getPage,
            setPage: setPage,
            draw: draw,
        };
    };
})(jQuery);
