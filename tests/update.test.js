const { update, MSGS } = require("../src/update");

describe('update function', () => {
    const initialModel = {
        question: "",
        answer: "",
        items: [],
    };

    test('sets question', () => {
        const newQuestion = "New Question";
        const updatedModel = update(MSGS.SET_QUESTION, initialModel, newQuestion);
        expect(updatedModel).toEqual({ ...initialModel, question: newQuestion });
    });

    test('sets answer', () => {
        const newAnswer = "New Answer";
        const updatedModel = update(MSGS.SET_ANSWER, initialModel, newAnswer);
        expect(updatedModel).toEqual({ ...initialModel, answer: newAnswer });
    });

    test('adds a card', () => {
        const modelWithQuestionAndAnswer = { ...initialModel, question: "Q1", answer: "A1" };
        const updatedModel = update(MSGS.ADD_CARD, modelWithQuestionAndAnswer);
        expect(updatedModel.items).toHaveLength(1);
        expect(updatedModel.items[0]).toEqual({ question: "Q1", answer: "A1", showAnswer: false, rating: 0 });
        expect(updatedModel.question).toBe("");
        expect(updatedModel.answer).toBe("");
    });

    test('does not add a card if question or answer is empty', () => {
        const modelWithEmptyQuestion = { ...initialModel, question: "", answer: "A1" };
        const modelWithEmptyAnswer = { ...initialModel, question: "Q1", answer: "" };
        expect(update(MSGS.ADD_CARD, modelWithEmptyQuestion)).toEqual(modelWithEmptyQuestion);
        expect(update(MSGS.ADD_CARD, modelWithEmptyAnswer)).toEqual(modelWithEmptyAnswer);
    });

    test('removes a card', () => {
        const modelWithItems = {
            ...initialModel,
            items: [
                { question: 'Q1', answer: 'A1', showAnswer: false, rating: 0 },
                { question: 'Q2', answer: 'A2', showAnswer: false, rating: 0 },
            ],
        };
        const updatedModel = update(MSGS.REMOVE_CARD, modelWithItems, 0);
        expect(updatedModel.items).toHaveLength(1);
        expect(updatedModel.items[0]).toEqual({ question: 'Q2', answer: 'A2', showAnswer: false, rating: 0 });
    });

    test('toggles show answer', () => {
        const modelWithItems = {
            ...initialModel,
            items: [
                { question: 'Q1', answer: 'A1', showAnswer: false, rating: 0 },
            ],
        };
        const updatedModel = update(MSGS.SHOW_ANSWER, modelWithItems, 0);
        expect(updatedModel.items[0].showAnswer).toBe(true);
        const updatedModelAgain = update(MSGS.SHOW_ANSWER, updatedModel, 0);
        expect(updatedModelAgain.items[0].showAnswer).toBe(false);
    });

    test('rates a card', () => {
        const modelWithItems = {
            ...initialModel,
            items: [
                { question: 'Q1', answer: 'A1', showAnswer: false, rating: 0 },
                { question: 'Q2', answer: 'A2', showAnswer: false, rating: 1 },
            ],
        };
        const updatedModel = update(MSGS.RATE_CARD, modelWithItems, { index: 0, rating: 1 });
        expect(updatedModel.items[0].rating).toBe(1);
        expect(updatedModel.items[1].rating).toBe(1);
    });

    test('sorts cards by rating after rating a card', () => {
        const modelWithItems = {
            ...initialModel,
            items: [
                { question: 'Q1', answer: 'A1', showAnswer: false, rating: 0 },
                { question: 'Q2', answer: 'A2', showAnswer: false, rating: 1 },
            ],
        };
        const updatedModel = update(MSGS.RATE_CARD, modelWithItems, { index: 0, rating: 2 });
        expect(updatedModel.items[0].rating).toBe(1);
        expect(updatedModel.items[1].rating).toBe(2);
    });
});