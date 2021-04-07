import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../fe/components/NavBar";
import { useState, useEffect, useRef } from "react";
import { shuffle, getRandomArbitrary } from "../fe/utils";
import styled from "styled-components";

const Home = ({ content }) => {
  const router = useRouter();
  const [question, setQuestion] = useState();
  const [status, setStatus] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const nextRef = useRef();
  const questionRef = useRef();
  const answersRef = useRef();

  useEffect(() => {
    if (content) {
      setQuestion({ questionId: 0, answers: getAnswers(0) });
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setSubmitted(false);
    setStatus(false);
  }, [question]);

  const handleKeyDown = (e) => {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 13:
      case 32:
        nextRef?.current?.click();
        break;
      case 49:
      case 97:
        answersRef.current.children[0].click();
        break;
      case 50:
      case 98:
        answersRef.current.children[1].click();
        break;
      case 51:
      case 99:
        answersRef.current.children[2].click();
        break;
      case 52:
      case 100:
        answersRef.current.children[3].click();
        break;
    }
  };

  const getAnswers = (qId) => {
    const rightAnswer = { ...content[qId], answerIndex: qId };
    const wrongAnswers = [1, 2, 3].map(() => {
      const randomIndex = getRandomArbitrary(0, content.length, qId);
      return { ...content[randomIndex], answerIndex: randomIndex };
    });
    return shuffle([rightAnswer, ...wrongAnswers]);
  };

  const checkAnswer = (answer) => {
    setSubmitted(true);
    setSelectedAnswer(answer);
    if (answer.answerIndex === question.questionId) {
      setCorrectAnswers(correctAnswers + 1);
      nextQuestion();
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
      setStatus(false);
    }
  };

  const isCorrect = (answer, index, answers) => {
    if (submitted) {
      if (answer.answerIndex === question.questionId) {
        return "green";
      } else if (selectedAnswer.answerIndex === answers[index].answerIndex) {
        return "red";
      }
    }
    return "";
  };

  const nextQuestion = () => {
    setStatus(true);
    setTimeout(() => {
      setQuestion({
        questionId: question.questionId + 1,
        answers: getAnswers(question.questionId + 1),
      });
    }, 1100);
  };

  const tts = (text) => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.pitch = 1;
    msg.rate = 1;
    window.speechSynthesis.speak(msg);
  };

  return content ? (
    <Container>
      <Head>
        <title>Word Shuffle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <h2 className="page-name">{router.query.name || "Ofek"}</h2>
      <div className="info">
        {question ? (
          <div>
            מס׳ שאלות : {question.questionId + 1} / {content.length}
          </div>
        ) : null}
        <div>מספר תשובות נכונות : {correctAnswers}</div>
        <div>מספר תשובות שגויות : {incorrectAnswers}</div>
      </div>
      {question ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            return null;
          }}
          ref={questionRef}
          className={`question ${submitted && status && "animate"}`}
          action=""
          noValidate
        >
          <div className="header">
            <h1 className="word">{content[question.questionId].Word}</h1>
            <img
              onClick={() => tts(content[question.questionId].Word)}
              className="tts"
              src="./volume.svg"
              width="15"
              height="15"
              alt=""
            />
            {content[question.questionId].Example ? (
              <div>{content[question.questionId].Example}</div>
            ) : null}
          </div>
          <div className="separator" />
          <div className="answers" ref={answersRef}>
            {question.answers.map((answer, index, answers) => {
              return (
                <button
                  disabled={submitted}
                  onClick={() => checkAnswer(answer)}
                  key={answer + " " + index}
                  className={`answer ${isCorrect(answer, index, answers)}`}
                >
                  {index + 1}. {answer.Translation}
                </button>
              );
            })}
          </div>
          <div className={`buttons`}>
            {submitted && !status && question.questionId < content.length - 1 && (
              <button ref={nextRef} onClick={nextQuestion}>
                הבא
              </button>
            )}
          </div>
        </form>
      ) : null}
    </Container>
  ) : (
    <div>Error Page</div>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #202225;

  .header {
    //margin-bottom: 10px;
  }

  .page-name {
    text-transform: capitalize;
    color: white;
  }

  .separator {
    margin: 10px 0;
    height: 1px;
    background-color: black;
  }

  .word {
    margin-bottom: 0;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    direction: rtl;
    margin: 10px 0;
    padding: 25px;
    border-radius: 10px;
    width: 500px;
    background-color: white;
  }

  .tts {
    cursor: pointer;
  }

  .question {
    background-color: white;
    padding: 25px;
    border-radius: 10px;
    width: 500px;
  }

  .answers {
    direction: rtl;
  }

  .animate {
    animation: fadeout 0.8s;
    animation-delay: 0.3s;
  }

  .answer {
    font-family: "Rubik";
    font-size: 17px;
    display: block;
    text-align: right;
    margin-bottom: 15px;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 5px;
    height: 35px;
    color: #202225;
    width: 450px;
  }

  .answer:disabled {
    color: black;
    border: 1px solid transparent;
  }

  .buttons {
    height: 40px;

    button {
      font-size: 22px;
      color: white;
      background-color: #2f3136;
      border: 0;
      width: 200px;
      height: 50px;
      border-radius: 50px;
    }
  }

  .green {
    background-color: #43b581;
  }
  .red {
    background-color: #d84445;
  }

  @keyframes fadeout {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

Home.getInitialProps = (ctx) => {
  const { res } = ctx;
  return {
    content: res?.data?.content,
  };
};
