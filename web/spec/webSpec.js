import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from 'react-dom/test-utils'
import RPSApp from "../src/RPSApp"

describe('play form', function () {

    let domFixture;

    function setupDOM() {
        domFixture = document.createElement('div')
        document.body.appendChild(domFixture)
    }

    function renderApp(round) {
        ReactDOM.render(
            <RPSApp requests={round}/>,
            domFixture
        )
    }

    function page() {
        return domFixture.innerText;
    }

    function submitPlayForm() {
        document.querySelector('button').click()
    }

    function enterText(playerNumber, throwText) {
        const inputField = document.querySelector(`[name=${playerNumber}`);

        inputField.value = throwText;

        ReactTestUtils.Simulate.change(inputField);
    }

    function teardownDOM() {
        domFixture.remove();
    }

    beforeEach(function () {
        setupDOM();
    });

    afterEach(function () {
        teardownDOM();
    });

    describe('when the play use case tells the UI that the input is invalid', function () {
        it('tells the user that their input is invalid', function () {
            const alwaysInvalidRequest = {
                play: (p1, p2, observer) => observer.invalid()
            }

            renderApp(alwaysInvalidRequest);

            expect(page()).not.toContain('INVALID!')
            submitPlayForm();
            expect(page()).toContain('INVALID!')
        })
    })

    describe('when player 1 wins', function () {
        it('should tell the user that player 1 won', function () {
            const alwaysPlayer1WinsRequest = {
                play: (p1, p2, observer) => observer.p1Wins()
            }
            renderApp(alwaysPlayer1WinsRequest);

            expect(page()).not.toContain('Player 1 Wins!')
            submitPlayForm();
            expect(page()).toContain('Player 1 Wins!')

        });
    });

    describe('when player 2 wins', function () {
        it('should tell the user that player 2 won', function () {
            const alwaysPlayer2WinsRequest = {
                play: (p1, p2, observer) => observer.p2Wins()
            }
            renderApp(alwaysPlayer2WinsRequest);

            expect(page()).not.toContain('Player 2 Wins!')
            submitPlayForm();
            expect(page()).toContain('Player 2 Wins!')

        });
    });
    describe('when its a tie', function () {
        it('should tell the user that its a tie', function () {
            const alwaysTie = {
                play: (p1, p2, observer) => observer.tie()
            }
            renderApp(alwaysTie);

            expect(page()).not.toContain('Tie!')
            submitPlayForm();
            expect(page()).toContain('Tie!')

        });
    });

    describe('when the user inputs text', function () {
        it('should use text that the user has input', function () {
            const playSpy = jasmine.createSpy('play');

            renderApp({play: playSpy});

            enterText('player1', 'rock');
            enterText('player2', 'scissors');

            submitPlayForm();

            expect(playSpy).toHaveBeenCalledWith(
                'rock', 'scissors', jasmine.any(Object)
            );
        });
    });
})
