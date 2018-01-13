let t1 = {}, t2 = {}, t3 = {}, t4 = {}, t5 = {};

describe('justFlipIt', function () {
    describe('plugin', function () {
        before(function () {
            $('body').append('<p class="t1">T1</p>');
            t1.base = $('.t1');
        });
        it('should exists', function () {
            t1.base.justFlipIt();
            let flipPanel = $('body').find('._justFlipIt_panel');
            expect(flipPanel).to.be.ok;
        });
    });
    /// CLICK ///
    describe('option Click: ', function () {
        before(function () {
            $('body').append('<p class="t2">T2</p>');
            t2.base = $('.t2');
            t2.data = t2.base.data();
        });
        it('should be true', function () {
            t2.base.justFlipIt({Click: true});
            t2.opts = t2.data.plugin_justFlipIt.settings;
            // console.log('Options Click should be ' + t2.opts.Click)
            expect(t2.opts.Click).to.be.true;
        });
    });
    describe('option Click: ', function (assert) {
        before(function () {
            $('body').append('<p class="t2">T2</p>');
            t2.base = $('.t2');
        });

        it('should turn on click event', function () {
            t2.base.trigger('click');
            t2.class = t2.base.attr('class');
            // console.log(t2.base.attr('class')+' should be t2 hover _justFlipIt_panel _flipY_');
            expect(t2.class).to.equal('t2 hover _justFlipIt_panel _flipY_');
        });
    });
    // TEMPLATE ///
    describe('option Template: ', function (assert) {
        before(function () {
            $('body').append('<p class="t3">T3</p>');
            t3.base = $('.t3');
        });
        it('should not be empty', function () {
            t3.base.justFlipIt({Template: '<h3>hello</h3>'});
            t3.template = t3.base.parent().parent().find('.backY h3').text();
            // console.log(t3.template)
            expect(t3.template).to.equal('hello');
        });
        it('should create template', function () {
            t3.base.justFlipIt({Template: '<h3>hello</h3>'});
            t3.template = t3.base.parent().parent().find('.backY h3').text();
            // console.log(t3.template)
            expect(t3.template).to.equal('hello');
        });
    });
    ///FLIPX///
    describe('option FlipX: ', function (assert) {
        before(function () {
            $('body').append('<p class="t4">T4</p>');
            t4.base = $('.t4');
            t4.data = t4.base.data();
        });

        it('should be true', function () {
            t4.base.justFlipIt({Click: true, FlipX: true});
            t4.opts = t4.data.plugin_justFlipIt.settings;
            console.log(t4.opts.FlipX)
            expect(t4.opts.FlipX).to.be.true;
        });

    });
    describe('option FlipX: ', function (assert) {
        before(function () {
            $('body').append('<p class="t4">T4</p>');
            t4.base = $('.t4');
            t4.data = t4.base.data();
        });

        it('should rotate on the X axes', function () {
            t4.base.trigger('click');
            t4.class = t4.base.attr('class');
            console.log(t4.class + ' should be: t4 hover _justFlipIt_panel _flip_');
            expect(t4.class).to.equal('t4 hover _justFlipIt_panel _flip_');
        });

    });
    ///STYLE///
    describe('option Style: ', function (assert) {
        before(function () {
            $('body').append('<p class="t5">T5</p>');
            t5.base = $('.t5');
            t5.data = t5.base.data();
            t5.base.justFlipIt({
                Style: [
                    {
                        el: 'self',
                        style: {'color': '#cccccc'}
                    },]
            });
        });

        it('should not be empty', function () {
            t5.opts = t5.data.plugin_justFlipIt.settings;
            t5.styleSelfElement = t5.opts['Style'][0].el;
            expect(t5.styleSelfElement).to.equal('self');
        });

    });
    describe('option Style: ', function (assert) {
        it('should change style', function () {
            t5.style = t5.base.parent().parent().css('color');
            console.log(t5.style);
            expect(t5.style).to.equal('rgb(204, 204, 204)');
        });

    });
});
