require(
    [
        'jquery',
        'Magento_Ui/js/modal/modal'
    ],
    function (
        $,
        modal
    ) {
        console.log('called');
        $("#snap-banner").click(
            function () {
                $("#snap-finance-modal").addClass("open");
            }
        );
        $(".btn-close").click(
            function () {
                $("#snap-finance-modal").removeClass("open");console.log('clicvzck');
            }
        );
        $(".btn-apply").click(
            function () {
                $("#snap-finance-modal").removeClass("open");
            }
        );

    }
);