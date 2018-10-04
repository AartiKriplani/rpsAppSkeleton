describe('rps', function () {
    it('rock vs scissors', function () {
        const observer = jasmine.createSpyObj('observer', ['p1Wins']);

        new Requests().play("rock", "scissors", observer)

        expect(observer.p1Wins).toHaveBeenCalled();
    });
});


function Requests() {
    this.play = (p1Throw, p2Throw, observer) => {
        observer.p1Wins();
    }
}

// const Foo = require('react').Foo

// module.export
// export = {}