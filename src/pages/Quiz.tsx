
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      question: "What was Eminem's first major-label album?",
      options: ["Infinite", "The Slim Shady LP", "The Marshall Mathers LP", "The Eminem Show"],
      correct: 1,
      difficulty: 'easy',
      explanation: "The Slim Shady LP (1999) was Eminem's major-label debut that introduced the world to his Slim Shady persona."
    },
    {
      id: 2,
      question: "Which song won Eminem an Academy Award?",
      options: ["Stan", "The Real Slim Shady", "Lose Yourself", "Without Me"],
      correct: 2,
      difficulty: 'medium',
      explanation: "Lose Yourself from the 8 Mile soundtrack won the Academy Award for Best Original Song in 2003."
    },
    {
      id: 3,
      question: "What is Eminem's real name?",
      options: ["Marshall Bruce Mathers III", "Marshall James Mathers", "Marcus Matthew Mathers", "Martin Blake Mathers"],
      correct: 0,
      difficulty: 'easy',
      explanation: "Eminem's real name is Marshall Bruce Mathers III, born October 17, 1972."
    },
    {
      id: 4,
      question: "How many words per minute does Eminem rap in 'Rap God'?",
      options: ["6.5 words per second", "9.6 words per second", "11.4 words per second", "4.28 words per second"],
      correct: 2,
      difficulty: 'hard',
      explanation: "In the third verse of Rap God, Eminem raps 97 words in 15 seconds, which is 6.5 words per second, but at his fastest point he reaches 11.4 words per second."
    },
    {
      id: 5,
      question: "Which rapper was NOT part of D12 with Eminem?",
      options: ["Proof", "Bizarre", "Kuniva", "Royce da 5'9\""],
      correct: 3,
      difficulty: 'medium',
      explanation: "Royce da 5'9\" was never a member of D12. He's been a longtime collaborator and formed Bad Meets Evil with Eminem."
    },
    {
      id: 6,
      question: "What does 'Stan' refer to in hip-hop culture?",
      options: ["A type of rap flow", "An obsessed fan", "A record label", "A producer credit"],
      correct: 1,
      difficulty: 'easy',
      explanation: "The term 'Stan' comes from Eminem's song about an obsessed fan and is now widely used to describe overly devoted fans."
    },
    {
      id: 7,
      question: "Which producer discovered Eminem?",
      options: ["Timbaland", "Dr. Dre", "The Alchemist", "Jeff Bass"],
      correct: 1,
      difficulty: 'medium',
      explanation: "Dr. Dre discovered Eminem after hearing his demo and signed him to Aftermath Entertainment."
    },
    {
      id: 8,
      question: "In which Detroit suburb did Eminem grow up?",
      options: ["8 Mile", "Warren", "Lincoln Park", "All of the above"],
      correct: 3,
      difficulty: 'hard',
      explanation: "Eminem moved around frequently in his childhood, living in various Detroit suburbs including areas near 8 Mile Road, Warren, and Lincoln Park."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newUserAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newUserAnswers);

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }

    if (!showResult) {
      setShowResult(true);
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          setQuizCompleted(true);
        }
      }, 3000);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "🔥 SLIM SHADY LEVEL! You're a true Stan!";
    if (percentage >= 70) return "💪 MARSHALL MATHERS LEVEL! Impressive knowledge!";
    if (percentage >= 50) return "🎤 EMINEM FAN LEVEL! Not bad at all!";
    return "📚 NEWBIE LEVEL! Time to study more Em!";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4 bg-em-dark flex items-center justify-center">
        <Card className="bg-em-gray border-em-red max-w-2xl w-full p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white graffiti-text mb-6">
              QUIZ <span className="text-em-red">COMPLETED!</span>
            </h1>
            
            <div className="text-6xl mb-6">🏆</div>
            
            <div className="mb-6">
              <div className="text-5xl font-bold text-em-red mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-xl text-gray-300 mb-4">
                {Math.round((score / questions.length) * 100)}% Correct
              </div>
              <div className="text-2xl text-white font-bold">
                {getScoreMessage()}
              </div>
            </div>

            <Progress 
              value={(score / questions.length) * 100} 
              className="mb-8 h-4"
            />

            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold text-white">Review:</h3>
              {questions.map((question, index) => (
                <div 
                  key={question.id}
                  className={`p-4 rounded border-l-4 ${
                    userAnswers[index] === question.correct 
                      ? 'border-green-500 bg-green-500/10' 
                      : 'border-red-500 bg-red-500/10'
                  }`}
                >
                  <div className="text-white font-medium mb-2">
                    Q{index + 1}: {question.question}
                  </div>
                  <div className="text-sm text-gray-300">
                    Your answer: {question.options[userAnswers[index]]}
                  </div>
                  {userAnswers[index] !== question.correct && (
                    <div className="text-sm text-green-400">
                      Correct: {question.options[question.correct]}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-x-4">
              <Button 
                onClick={resetQuiz}
                className="bg-em-red hover:bg-em-red/80"
              >
                Take Quiz Again
              </Button>
              <Button 
                variant="outline"
                className="border-em-red text-em-red hover:bg-em-red hover:text-white"
              >
                Share Results
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (showResult) {
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    return (
      <div className="min-h-screen pt-20 pb-12 px-4 bg-em-dark flex items-center justify-center">
        <Card className="bg-em-gray border-em-red max-w-2xl w-full p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {isCorrect ? "✅" : "❌"}
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {isCorrect ? "CORRECT!" : "WRONG!"}
            </h2>
            <div className="bg-em-dark p-6 rounded-lg mb-6">
              <p className="text-gray-300 text-lg">
                {questions[currentQuestion].explanation}
              </p>
            </div>
            <div className="text-lg text-gray-400">
              Moving to next question...
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-em-dark">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white graffiti-text mb-4">
            <span className="text-em-red">EMINEM</span> QUIZ
          </h1>
          <p className="text-xl text-gray-400">How well do you know the Rap God?</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-em-red font-bold">
              Score: {score}/{currentQuestion}
            </span>
          </div>
          <Progress 
            value={((currentQuestion + 1) / questions.length) * 100} 
            className="h-2"
          />
        </div>

        <Card className="bg-em-gray border-em-red/20 p-8 mb-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className={`text-sm font-semibold ${getDifficultyColor(questions[currentQuestion].difficulty)}`}>
                {questions[currentQuestion].difficulty.toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-6">
              {questions[currentQuestion].question}
            </h2>
          </div>

          <div className="space-y-4 mb-8">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full p-6 text-left justify-start text-lg border-2 transition-all duration-300 ${
                  selectedAnswer === index
                    ? 'border-em-red bg-em-red/20 text-white'
                    : 'border-gray-600 text-gray-300 hover:border-em-red/50 hover:bg-em-red/10'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="mr-4 font-bold text-em-red">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="bg-em-red hover:bg-em-red/80 disabled:bg-gray-600 disabled:text-gray-400 px-8 py-3 text-lg"
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </Card>

        <div className="text-center text-gray-400">
          <p>Think you can get them all right? 🤔</p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
