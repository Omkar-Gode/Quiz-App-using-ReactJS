import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Questions from "./Questions";
import Loading from "./Loading";
import Error from "./Error";
import StartScreen from "./StartScreen";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
    questions: [],
    // loading, Error, ready, active, finished
    status: "loading",
    index: 0,
    answer: null,
    totalPoints: 0,
}

function reducer(state, action){
    switch (action.type){
        case "dataReceived":
            return {...state, status: "ready", questions: action.payload};
        case "dataFailed":
            return {...state, status: "error"};
        case "start":
            return {...state, status: "active"};
        case "newAnswer":
            const question = state.questions[state.index];
            return {...state,
                answer: action.payload,
                totalPoints: action.payload === question.correctOption ? state.totalPoints + question.points : state.totalPoints
            };
        case "nextQuestion":
            return {...state, index: state.index + 1, answer: null};
        case "FinishQuiz":
            return {...state, status: "finished"};
        case "restart":
            return {...initialState, questions: state.questions, status: "ready"};
        default:
            throw new Error("Unknown type");
    }
}

function App(){
    const [{questions, status, index, answer, totalPoints}, dispatch] = useReducer(reducer, initialState);

    const totalQuestions = questions.length;
    const maxPoints = questions.reduce((prev, curr)=> prev + curr.points, 0);

    useEffect(function (){
        async function getData(){
            try{
                const res = await fetch("http://localhost:9000/React-Quiz");
                // const res = await fetch("http://localhost:9000/questions");
                if (!res.ok) throw new Error("problem Fetching");
                const data = await res.json();
                if (!data || data.length === 0) throw new Error("Problem in data");

                dispatch({type: "dataReceived", payload: data});
            }
            catch (err){
                console.log("Something Happened \n",err);
                dispatch({type: "dataFailed"});
            }
        }
        getData();
    },[]);

    return (
        <div className="page">
            <Header/>
            <Main>
                { status === 'loading' && <Loading />}
                { status === 'error' && <Error />}
                { status === 'ready' && <StartScreen dispatch={dispatch}/>}
                { status === 'active' && 
                    <>
                    <Progress index={index} totalQuestions={totalQuestions} totalPoints={totalPoints} maxPoints={maxPoints} answer={answer}/>
                    <Questions questions={questions} index={index} dispatch={dispatch} answer={answer}></Questions>
                    <NextButton dispatch={dispatch} answer={answer} index={index} totalQuestions={totalQuestions} />
                    </>
                }
                { status === 'finished' && <FinishScreen totalPoints={totalPoints} maxPoints={maxPoints} dispatch={dispatch}/>}
            </Main>
        </div>
    );
}



export default App;