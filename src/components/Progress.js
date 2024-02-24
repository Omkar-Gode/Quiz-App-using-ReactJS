
function Progress({index, totalQuestions, totalPoints, maxPoints, answer}){
    return (
        <div className="progress">
            <progress value={index + Number(answer !== null)} max={totalQuestions} ></progress>
            <div>
                <div>
                    <span>Question <strong>{index+1}</strong> / {totalQuestions}</span>
                </div>
                <div>
                    <span><strong>{totalPoints}</strong> / {maxPoints} Points</span>
                </div>
            </div>
        </div>
    );
}


export default Progress;