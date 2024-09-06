

const { view } = require("../src/view");

describe('view function', () => {
    const dispatch = jest.fn(); // https://chatgpt.com - jest.fn
    const model = {
        question: "",
        answer: "",
        items: [],
    };

    test('renders initial view', () => {
        const viewTest = view(dispatch, model);
        expect(viewTest).toMatchSnapshot();
    });

    test('renders view with items', () => {
        const modelWithItems = {
            ...model,
            items: [
                { question: 'Q1', answer: 'A1', showAnswer: false, rating: 0 },
                { question: 'Q2', answer: 'A2', showAnswer: true, rating: 1 },
            ],
        };
        const viewTest = view(dispatch, modelWithItems);
        expect(viewTest).toMatchSnapshot(); // https://chatgpt.com - .ToMatchSnapshot
    });

    test('dispatches SET_QUESTION on input change', () => {
        const viewTest = view(dispatch, model);
        const input = viewTest.children[0].children[0];
        input.properties.oninput({ target: { value: 'New Question' } });
        expect(dispatch).toHaveBeenCalledWith(MSGS.SET_QUESTION, 'New Question'); // https://chatgpt.com - ToHaveBeenCalledWith
    });

    test('dispatches SET_ANSWER on input change', () => {
        const viewTest = view(dispatch, model);
        const input = viewTest.children[0].children[1];
        input.properties.oninput({ target: { value: 'New Answer' } });
        expect(dispatch).toHaveBeenCalledWith(MSGS.SET_ANSWER, 'New Answer'); // https://chatgpt.com - ToHaveBeenCalledWith
    });

    test('dispatches ADD_CARD on button click', () => {
        const viewTest = view(dispatch, model);
        const button = viewTest.children[0].children[2];
        button.properties.onclick();
        expect(dispatch).toHaveBeenCalledWith(MSGS.ADD_CARD); // https://chatgpt.com - ToHaveBeenCalledWith
    });
});