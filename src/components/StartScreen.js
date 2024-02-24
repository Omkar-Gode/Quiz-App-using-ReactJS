
function StartScreen({dispatch}) {

    return (
        <div className="startscreen">
            <h3>Welcome to Anime Quiz</h3>
            <p> Click below to Start the Quiz !!</p>
            <button onClick={()=>dispatch({type:"start"})}>Start Quiz</button>
        </div>
    );
}

export default StartScreen;