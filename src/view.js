const hh = require("hyperscript-helpers");
const { h } = require("virtual-dom");

const MSGS = {
    ADD_CARD: "ADD_CARD",
    SET_QUESTION: "SET_QUESTION",
    SET_ANSWER: "SET_ANSWER",
    REMOVE_CARD: "REMOVE_CARD",
    SHOW_ANSWER: "SHOW_ANSWER",
    RATE_CARD: "RATE_CARD",
};

const { div, button, input, p, h3, h4 } = hh(h);

function view(dispatch, model) {
    const btnStyle = "cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]";
    
    return div({ className: "flex flex-col gap-4 items-center p-4" }, [
      div({
        className: "flex flex-col sm:flex-row bg-gradient-to-b from-gray-800 to-black rounded-xl shadow-[10px_10px_20px_#0e1013,-10px_-10px_40px_#383e4b] p-1 gap-1",
      }, [
        input({
          className: "w-full flex-grow p-4 bg-gray-800 text-white border-none rounded-lg shadow-inner focus:border-yellow-400 focus:outline-none focus:shadow-[inset_0px_0px_10px_rgba(255,102,0,0.5),inset_0px_0px_10px_rgba(255,212,59,0.5),0px_0px_100px_rgba(255,212,59,0.5),0px_0px_100px_rgba(255,102,0,0.5)] transition-all duration-200 ease-in-out",
          placeholder: "Question",
          type: "text", 
          value: model.question,
          oninput: (e) => dispatch(MSGS.SET_QUESTION, e.target.value),
        }),
        input({
          className: "w-full flex-grow p-4 bg-gray-800 text-white border-none rounded-lg shadow-inner focus:border-yellow-400 focus:outline-none focus:shadow-[inset_0px_0px_10px_rgba(255,102,0,0.5),inset_0px_0px_10px_rgba(255,212,59,0.5),0px_0px_100px_rgba(255,212,59,0.5),0px_0px_100px_rgba(255,102,0,0.5)] transition-all duration-200 ease-in-out",
          placeholder: "Answer",
          type: "text", 
          value: model.answer,
          oninput: (e) => dispatch(MSGS.SET_ANSWER, e.target.value),
        }),
        button(
          { className: btnStyle, onclick: () => dispatch(MSGS.ADD_CARD) },
          "Add Flashcard"
        ),
      ]),
      ...model.items.map((item, index) => cardView(dispatch, item, index)), // Zeigt die Karten an
    ]);
  }
  
  function cardView(dispatch, item, index) {
  
    return div(
      {
        className: "bg-teal-700 p-4 rounded-lg border border-gray-400 w-80 relative shadow-lg",
      },
      [
        button(
          {
            className: "absolute top-2 right-2 cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded-lg border-red-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]",
            onclick: () => dispatch(MSGS.REMOVE_CARD, index),
          },
          "Delete"
        ),
        h3({ className: "font-bold mb-2 text-white text-4x1" }, "Question"),
        p({ className: "text-lg font-semibold mb-4 text-white font-thin" }, item.question),
        button(
          {
            className: "bg-yellow-500 text-white px-4 py-2 rounded mb-4",
            onclick: () => dispatch(MSGS.SHOW_ANSWER, index),
          },
          "Show Answer"
        ),
        item.showAnswer ? h4({ className: "font-bold mb-2 text-white text-4x1" }, "Answer") : null, // : null und ? https://chatgpt.com
        item.showAnswer ? p({ className: "mb-4 text-white font-thin" }, item.answer) : null,
        item.showAnswer ? div({ className: "flex justify-around mt-4" }, [
          button(
            {
              className: "bg-red-500 text-white px-4 py-2 rounded",
              onclick: () => dispatch(MSGS.RATE_CARD, { index, rating: 0 }), // Ratings Funktion habe ich // https://chatgpt.com gefragt
            },
            "Bad"
          ),
          button(
            {
              className: "bg-blue-500 text-white px-4 py-2 rounded",
              onclick: () => dispatch(MSGS.RATE_CARD, { index, rating: 1 }), // Ratings Funktion habe ich // https://chatgpt.com gefragt
            },
            "Good"
          ),
          button(
            {
              className: "bg-green-500 text-white px-4 py-2 rounded",
              onclick: () => dispatch(MSGS.RATE_CARD, { index, rating: 2 }), // Ratings Funktion habe ich // https://chatgpt.com gefragt
            },
            "Great"
          ),
  
        ]) : null
      ]
    );
}

module.exports = {view}
  