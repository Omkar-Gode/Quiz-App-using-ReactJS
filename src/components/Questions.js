
function Questions({questions, index, dispatch, answer}){
    const hasAnswered = answer !== null;

    console.log(questions[index].correctOption);

    return (
        <div className="question">
            <p>{index+1}. {questions[index].question}</p>
            <div className="options">
                {
                    questions[index].options.map((option, i) => 
                        <div>
                        {i === answer && <div>&#9830;</div>}
                        <button 
                            className={`option${i === answer ? "-selected" : ""}${hasAnswered ? (i === questions[index].correctOption ? "-correct": "-incorrect") : ""}`}
                            key={option} 
                            onClick={()=>dispatch({type:"newAnswer", payload: i})}
                            disabled={hasAnswered}
                        >
                            {option}
                        </button>
                        {i === answer && <div>&#9830;</div>}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Questions;