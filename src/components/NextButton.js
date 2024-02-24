
function NextButton({dispatch, answer, index, totalQuestions}){
    if (answer === null ) return null;

    if (index < totalQuestions - 1)return (
        <div className="nextButton">
            <button onClick={()=>dispatch({type:"nextQuestion"})}>Next</button>
        </div>
    );

    if (index === totalQuestions - 1)return (
        <div className="nextButton">
            <button onClick={()=>dispatch({type:"FinishQuiz"})}>Finish</button>
        </div>
    );
}

export default NextButton;