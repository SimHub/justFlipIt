describe('plugin', function () {

    describe('justFlipIt plugin', function () {
        before(function () {
            $('body').append('<h1>Hello World</h1>');
            $('h1').justFlipIt({Template: '<h1>whoa!</h1>'});
        });
        it('should exists', function () {
            let flipPanel = $('body').find('._justFlipIt_panel')
            expect(flipPanel).to.be.ok;
        });
    })
    describe('front wrapper className', function () {
        before(function () {
            $('body').append('<h1>Hello World</h1>');
            $('h1').justFlipIt({Template: '<h1>whoa!</h1>'});
        });

        it('should be front', function () {
            let h1 = $('h1');
            let front = h1.parent().attr('class');
            expect(front).eql('front');
        });

    })
    describe('back wrapper className', function () {
        before(function () {
            $('body').append('<h1>Hello World</h1>');
            $('h1').justFlipIt({Template: '<h1>whoa!</h1>'});
        });

        it('should be backY', function () {
            let panel = $('._justFlipIt_panel');
            let back = panel.find('.backY');
            expect(back.attr('class')).eql('backY');
        });
    })

});
