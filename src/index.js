import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import createElement from "virtual-dom/create-element";
import diff from "virtual-dom/diff";
import patch from "virtual-dom/patch";

const { div, button, input, p, h3, h4 } = hh(h);

const MSGS = {
  ADD_CARD: "ADD_CARD",
  SET_QUESTION: "SET_QUESTION",
  SET_ANSWER: "SET_ANSWER",
  REMOVE_CARD: "REMOVE_CARD",
};

const ratings = {
    Great: 0,
    Good: 0,
    Bad: 0
}

function view(dispatch, model) {
  const btnStyle = "cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]";
    return div({ className: "flex flex-col gap-4 items-center p-4"}, [
        div({ className: "flex flex-col sm:flex-row bg-gradient-to-b from-gray-800 to-black rounded-xl shadow-[10px_10px_20px_#0e1013,-10px_-10px_40px_#383e4b] p-1 gap-1"}, [
            input({ // Eingabefeld für die Frage des Quizkartes
                //https://uiverse.io/coslac/silly-grasshopper-20
                className: "w-full flex-grow p-4 bg-gray-800 text-white border-none rounded-lg shadow-inner focus:border-yellow-400 focus:outline-none focus:shadow-[inset_0px_0px_10px_rgba(255,102,0,0.5),inset_0px_0px_10px_rgba(255,212,59,0.5),0px_0px_100px_rgba(255,212,59,0.5),0px_0px_100px_rgba(255,102,0,0.5)] transition-all duration-200 ease-in-out",
                placeholder: "Question",
                type: Text,
                value: model.question,
                oninput: (e) => dispatch(MSGS.SET_QUESTION, e.target.value),
            }),
            input({ // Eingabefeld für die Antwort des Quizkartes
                //https://uiverse.io/coslac/silly-grasshopper-20
                className: "w-full flex-grow p-4 bg-gray-800 text-white border-none rounded-lg shadow-inner focus:border-yellow-400 focus:outline-none focus:shadow-[inset_0px_0px_10px_rgba(255,102,0,0.5),inset_0px_0px_10px_rgba(255,212,59,0.5),0px_0px_100px_rgba(255,212,59,0.5),0px_0px_100px_rgba(255,102,0,0.5)] transition-all duration-200 ease-in-out",
                placeholder: "Answer",
                type: Text,
                value: model.answer,
                oninput: (e) => dispatch(MSGS.SET_ANSWER, e.target.value)
            }),
            //Button des ADD FLASHCARDS
            button({className:btnStyle , onclick: () => dispatch(MSGS.ADD_CARD)}, "Add Flashcard"), 
        ])
    ])
}

function cardView(dispatch, item, index) {
  
}

function update(msg, model, value) {
  
}

function app(initModel, update, view, node) {
  
}

const initModel = {
  question: "",
  answer: "",
  items: [],
};

const rootNode = document.getElementById("app");
app(initModel, update, view, rootNode);
