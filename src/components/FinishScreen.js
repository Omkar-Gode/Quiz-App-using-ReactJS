
function FinishScreen({totalPoints, maxPoints, dispatch}){
    const percentage = (totalPoints/maxPoints)*100;
    const path = percentage < 40 ? "./result/40.png": percentage < 80 ? "./result/60.png":"./result/80.png";
    return (
        <div className="finishscreen">
            <img src={path} alt="luffy"></img>
            <p>
                You Have scored <strong>{totalPoints}</strong> out of <strong>{maxPoints} </strong>Points
            </p>
            <p>
                You Result is  <strong> {percentage} %</strong>
            </p>
            <button onClick={()=> dispatch({type: "restart"})}>Restart</button>
        </div>
    );
}

export default FinishScreen;