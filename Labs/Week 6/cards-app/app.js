const
    cards = require('deckofcards'),
    inquirer = require('inquirer')

const draw = (shuffle, n = 1) => {
    cards.deck(shuffle)
        .then(deck => cards.draw(deck.deck_id, n))
        .then(result => {
            console.log('-- CARDS --')
            result.cards.forEach(card => {
                console.log(`${card.value} of ${card.suit}`)
            })

            console.log('-- REMAING CARDS --')
            console.log(result.remaining)
        })
        .catch(err => console.log(err))
}

// HINT for #3 in Lab
const discardPrompt = (result) => {
    return inquirer.prompt([{
        type: 'checkbox',
        message: 'Select cards to throw away. You may select up to 4 cards.',
        name: 'cards',
        choices: result.cards.map(card => {
            return {
                name: `${card.value} of ${card.suit}`,
                value: card
            }
        }),
        validate: (removed) => {
            if (removed.length > 4) {
                return "Please select no more than 4 cards."
            }
            return true;
        }
    }])
}

// HINT for #4 in Lab
const findAndRemove = (current, throwaway) => {
    throwaway.forEach(card => {
        let idx = current.indexOf(card);
        if (idx > -1) {
            current.splice(idx, 1);
        }
    });
}

// HINT for #6 in Lab
const print = (cards, remaining) => {
    console.log('\n-- CARDS --')
    cards.forEach(card => {
        console.log(`${card.value} of ${card.suit}`)
    })

    console.log('\n-- REMAING CARDS --')
    console.log(remaining)
    console.log()
}

const play = () => {
    cards.deck(!0)
        .then(deck => cards.draw(deck.deck_id, 5))
        .then(result => {
            print(result.cards, result.remaining);
            discardPrompt(result).then((removed) => {
                findAndRemove(result.cards, removed.cards);

                // Draw cards to replace the discarded cards.
                const drawCount = 5 - result.cards.length;
                if (drawCount > 0) {
                    cards.draw(result.deck_id, drawCount).then(res => {
                        result.cards.push(...res.cards);
                        print(result.cards, res.remaining);
                    })
                }
            })
        })
        .catch(err => console.log(err))
}

module.exports = {
    draw,
    play
}
