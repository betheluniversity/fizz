var bu_fx = {

    enabled : true,

    setupFX : function() {
        bu_fx.enable();
    },

    // Re-run as needed.
    enable : function() {
        bu_fx.enabled = true;
    },

    // Re-run as needed.
    disable : function() {
        bu_fx.enabled = false;
    },

    /*  Rotating statements
     \*------------------------------------*/
    committedPhrases : [
        'challenge ourselves',
        'support the people around you',
        'find community',
        'laugh...a lot',
        'learn new things',
        'live out your faith',
        'make a difference',
        'serve your neighbors',
        'explore the world',
        'create hope',
        'work hard',
        'dream big',
        'live with purpose',
        'have tons of fun',
        'ask important questions',
        'spread Christ’s love'
    ],

    rotateStatements : function (options) {

        var module = this;
        module.settings = {};
        var interval;
        var currentStatement = 0;
        var defaults = {
            startDelay: 0,
            statements: null,
            containerElement: null,
            textElement: null,
            debug: false
        };

        var init = function () {
            module.settings = $.extend({}, defaults, options);
            module.statement_count = module.settings.statements.length;
            module.autoRotateStatements();
        };


        // Show a new statement then begin cycling the statements
        module.autoRotateStatements = function () {
            clearInterval(interval);
            interval = setInterval(module.showStatement, module.settings.speed);
        };

        module.changeText = function() {
            // Update the text after a delay.
            // The delay is necessary because the text has to fade before we change it
            setTimeout(function () {
                $(module.settings.textElement).text(module.settings.statements[currentStatement]);
                $(module.settings.containerElement).width($(module.settings.textElement).width());
            }, module.settings.speed/8);

        };

        // Show new statement
        module.showStatement = function () {

            // Get the next statement
            currentStatement += 1;
            if (currentStatement > module.statement_count-1) { currentStatement = 0; }

            $(module.settings.textElement).addClass('js-wordAnimate');

            setTimeout(function () {
                $(module.settings.textElement).text(module.settings.statements[currentStatement]);
                $(module.settings.containerElement).width($(module.settings.textElement).width());
            }, module.settings.speed/8);

            setTimeout(function () {
                $(module.settings.textElement).removeClass('js-wordAnimate');
            }, module.settings.speed/4);

        };

        init();

        return module;
    }
};

$(window).load(function(){
    bu_fx.rotateStatements(
        {
            speed: 2000,
            containerElement: $('.rotate-text').find('.rotate-text__holder'),
            // textElement: $('.rotate_text').find('h3 span em'),
            textElement: $('.rotate-text__holder'),
            statements: bu_fx.committedPhrases,
            debug: true,
        }
    );
});