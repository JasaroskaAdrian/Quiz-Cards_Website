const MSGS = {
    ADD_CARD: "ADD_CARD",
    SET_QUESTION: "SET_QUESTION",
    SET_ANSWER: "SET_ANSWER",
    REMOVE_CARD: "REMOVE_CARD",
    SHOW_ANSWER: "SHOW_ANSWER",
    RATE_CARD: "RATE_CARD",
};

function update(msg, model, value) {
    switch (msg) {
      case MSGS.SET_QUESTION:
        return { ...model, question: value };
  
      case MSGS.SET_ANSWER:
        return { ...model, answer: value };
  
      case MSGS.ADD_CARD:
        if (model.question.trim() === "" || model.answer.trim() === "") {
          return model;
        }
  
        const newCard = { question: model.question, answer: model.answer, showAnswer: false, rating: 0 }; // Ratings funktion mit https://chatgpt.com gefragt
        return {
          ...model,
          items: [...model.items, newCard],
          question: "",
          answer: "",
        };
  
      case MSGS.REMOVE_CARD:
        return {
          ...model,
          items: model.items.filter((_, i) => i !== value),
        };
  
      case MSGS.SHOW_ANSWER:
        return {
          ...model,
          items: model.items.map((item, i) => (i === value ? { ...item, showAnswer: !item.showAnswer } : item)),
        };
  
      case MSGS.RATE_CARD:
        return {
          ...model,
          items: model.items
            .map((item, i) => (i === value.index ? { ...item, rating: item.rating + value.rating } : item))  // https://chatgpt.com 
            .sort((a, b) => a.rating - b.rating), // https://chatgpt.com - Verstehe ich persönlich nicht
        };
  
      default:
        return model;
    }
}

module.exports = { MSGS, update }
