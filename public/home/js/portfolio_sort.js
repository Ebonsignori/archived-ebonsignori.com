var Portfolio = {
    sort: function(items) {
        items.show();
        $('#portfolio-content').find('div.portfolio-item').not(items).fadeOut(500);
    },
    showAll: function(items) {
        items.fadeIn(500);
    },
    doSort: function() {
        $('span', '#filters').on('click', function() {

            var $a = $(this);

            $('.active').removeClass('active');
            $a.addClass('active');

            if (!$a.is('#all')) {

                var items = $('div[data-cat=' + $a.data('cat') + ']', '#portfolio-content');

                Portfolio.sort(items);

            } else {

                Portfolio.showAll($('div.portfolio-item', '#portfolio-content'));


            }

        });
    }
};

Portfolio.doSort();
