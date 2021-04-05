import Head from "next/head";
import { useState, useEffect } from "react";
import { shuffle } from "../fe/utils";

const Home = ({ content }) => {
  const [question, setQuestion] = useState();
  const [status, setStatus] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  useEffect(() => {
    setQuestion({ questionId: 0, answers: getAnswers(0) });
  }, []);

  const getAnswers = (qId) => {
    const rightAnswer = { ...content[qId], answerIndex: qId };
    const wrongAnswers = [1, 2, 3].map(() => {
      const randomIndex = getRandomArbitrary(0, content.length, qId);
      return { ...content[randomIndex], answerIndex: randomIndex };
    });
    return shuffle([rightAnswer, ...wrongAnswers]);
  };

  const getRandomArbitrary = (min, max, excluded) => {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    while (randomNumber === excluded) {
      randomNumber = Math.floor(Math.random() * (max - min) + min);
    }
    return randomNumber;
  };

  const checkAnswer = (answer) => {
    setSubmitted(true);
    setSelectedAnswer(answer);
    if (!status) {
      if (answer.answerIndex === question.questionId) {
        setCorrectAnswers(correctAnswers + 1);
      } else {
        setIncorrectAnswers(incorrectAnswers + 1);
      }
      setStatus(true);
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
    setQuestion({
      questionId: question.questionId + 1,
      answers: getAnswers(question.questionId + 1),
    });
    setStatus(false);
    setSubmitted(false);
  };

  return (
    <div className='container'>
      <Head>
        <title>Word Shuffle</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {question ? (
        <div>
          מס׳ שאלות : {question.questionId + 1} / {content.length}
        </div>
      ) : null}
      <div>מספר תשובות נכונות : {correctAnswers}</div>
      <div>מספר תשובות שגויות : {incorrectAnswers}</div>
      {question ? (
        <div className='question'>
          <h1>{content[question.questionId].Word}</h1>
          <div>
            {question.answers.map((answer, index, answers) => {
              return (
                <button
                  disabled={submitted}
                  onClick={() => checkAnswer(answer)}
                  key={answer + " " + index}
                  className={`answer ${isCorrect(answer, index, answers)}`}>
                  {index + 1}. {answer.Translation}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className='buttons'>
        {submitted && question.questionId < content.length - 1 && (
          <button onClick={nextQuestion}>הבא</button>
        )}
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .question {
          direction: rtl;
        }

        .answer {
          font-size: 16px;
          display: block;
          text-align: right;
          margin-bottom: 15px;
          cursor: pointer;
          background-color: transparent;
          border: 1px solid black;
          width: 400px;
          height: 35px;
        }

        .answer:disabled {
          color: black;
          //background-color: transparent;
          border: 1px solid black;
        }

        .buttons {
          height: 40px;
        }

        .green {
          background-color: #88cc00;
        }
        .red {
          background-color: red;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Home;

Home.getInitialProps = (ctx) => {
  const { res } = ctx;
  return {
    content: res.data.content,
  };
};
