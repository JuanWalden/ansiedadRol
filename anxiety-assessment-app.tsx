import React, { useState, useEffect } from 'react';
import { Check, X, Brain, Heart, Users, RotateCcw, Award, AlertTriangle, Lightbulb } from 'lucide-react';

const AnxietyAssessmentApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [followUpAnswer, setFollowUpAnswer] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState(0);

  const questions = [
    {
      id: 1,
      statement: "Me duele la cabeza constantemente",
      correctAnswer: "sensacion",
      isCatastrophic: false,
      explanation: "El dolor de cabeza es una manifestación física (sensación corporal) que puede estar relacionada con la ansiedad debido a la tensión muscular.",
      educationalNote: "Las sensaciones corporales en la ansiedad incluyen: tensión muscular, dolor de cabeza, palpitaciones, sudoración, temblores, etc."
    },
    {
      id: 2,
      statement: "Estoy completamente paralizado",
      correctAnswer: "pensamiento",
      isCatastrophic: true,
      explanation: "Esta es una interpretación catastrofista. La palabra 'completamente' y 'paralizado' indica un pensamiento extremo y poco realista.",
      educationalNote: "Los pensamientos catastróficos usan palabras absolutas como 'siempre', 'nunca', 'completamente', 'totalmente'.",
      followUpQuestions: [
        "¿Realmente estás paralizado físicamente o es que sientes miedo de actuar?",
        "¿Has intentado hacer algo pequeño para comprobar si realmente no puedes moverte?",
        "¿Qué evidencia tienes de que estás 'completamente' paralizado?"
      ]
    },
    {
      id: 3,
      statement: "Evito las reuniones sociales",
      correctAnswer: "accion",
      isCatastrophic: false,
      explanation: "Evitar es una conducta (acción) de escape o evitación muy común en los trastornos de ansiedad.",
      educationalNote: "Las acciones en ansiedad incluyen: evitación, escape, rituales de comprobación, búsqueda de tranquilización."
    },
    {
      id: 4,
      statement: "Nunca podré superar esto",
      correctAnswer: "pensamiento",
      isCatastrophic: true,
      explanation: "Este es un pensamiento catastrofista que usa 'nunca' (absolutismo) y predice el futuro de manera negativa.",
      educationalNote: "Los pensamientos catastróficos predicen el futuro de manera negativa y usan términos absolutos.",
      followUpQuestions: [
        "¿Qué evidencia tienes de que NUNCA podrás superarlo?",
        "¿Has superado otras dificultades en el pasado?",
        "¿Qué pasos pequeños podrías dar hoy para empezar a mejorar?"
      ]
    },
    {
      id: 5,
      statement: "Mi corazón late muy rápido",
      correctAnswer: "sensacion",
      isCatastrophic: false,
      explanation: "Las palpitaciones son una sensación corporal típica de la respuesta de ansiedad del sistema nervioso simpático.",
      educationalNote: "El corazón acelerado es una respuesta normal del cuerpo ante la ansiedad, no es peligroso."
    },
    {
      id: 6,
      statement: "Compruebo una y otra vez si cerré la puerta",
      correctAnswer: "accion",
      isCatastrophic: false,
      explanation: "Comprobar repetitivamente es una conducta (acción) compulsiva común en ansiedad y TOC.",
      educationalNote: "Las comprobaciones repetitivas mantienen y refuerzan la ansiedad en lugar de reducirla."
    },
    {
      id: 7,
      statement: "Todo el mundo se dará cuenta de que estoy nervioso",
      correctAnswer: "pensamiento",
      isCatastrophic: true,
      explanation: "Este es un pensamiento catastrofista que incluye 'todo el mundo' (generalización) y lectura de mente.",
      educationalNote: "Los pensamientos catastróficos incluyen generalizaciones y suposiciones sobre lo que otros piensan.",
      followUpQuestions: [
        "¿Realmente TODO el mundo se dará cuenta o solo algunas personas podrían notarlo?",
        "¿Y si alguien lo nota, qué pasaría exactamente?",
        "¿Cuántas veces has pensado esto y realmente ha pasado?"
      ]
    },
    {
      id: 8,
      statement: "Siento un nudo en el estómago",
      correctAnswer: "sensacion",
      isCatastrophic: false,
      explanation: "La sensación de 'nudo en el estómago' es una manifestación física común de la ansiedad.",
      educationalNote: "Las sensaciones digestivas (nudo, mariposas, náuseas) son muy comunes en la ansiedad."
    },
    {
      id: 9,
      statement: "Voy a hacer el ridículo y será terrible",
      correctAnswer: "pensamiento",
      isCatastrophic: true,
      explanation: "Este pensamiento combina predicción negativa del futuro con catastrofización ('será terrible').",
      educationalNote: "Los pensamientos catastróficos magnifican las consecuencias negativas de los eventos.",
      followUpQuestions: [
        "¿Qué evidencia tienes de que vas a hacer el ridículo?",
        "¿Y si hicieras el ridículo, sería realmente tan terrible como imaginas?",
        "¿Qué le dirías a un amigo que pensara esto?"
      ]
    },
    {
      id: 10,
      statement: "Respiro muy rápido cuando me pongo nervioso",
      correctAnswer: "sensacion",
      isCatastrophic: false,
      explanation: "La respiración rápida (hiperventilación) es una sensación corporal típica de la respuesta de ansiedad.",
      educationalNote: "La respiración rápida es controlable con técnicas de respiración profunda y lenta."
    },
    {
      id: 11,
      statement: "No salgo de casa porque algo horrible podría pasar",
      correctAnswer: "accion",
      isCatastrophic: true,
      explanation: "No salir de casa es una conducta de evitación que incluye pensamiento catastrofista ('algo horrible').",
      educationalNote: "La evitación refuerza el miedo y reduce la confianza en nuestras capacidades de afrontamiento.",
      followUpQuestions: [
        "¿Qué evidencia tienes de que algo horrible va a pasar?",
        "¿Has salido de casa antes sin que pasara algo horrible?",
        "¿Qué podrías hacer para dar un pequeño paso fuera de tu zona de confort?"
      ]
    },
    {
      id: 12,
      statement: "Pienso que todos me están juzgando",
      correctAnswer: "pensamiento",
      isCatastrophic: true,
      explanation: "Este pensamiento incluye 'todos' (generalización) y lectura de mente (asumir lo que otros piensan).",
      educationalNote: "La lectura de mente es una distorsión cognitiva donde asumimos saber lo que otros piensan sin evidencia.",
      followUpQuestions: [
        "¿Realmente TODOS te están juzgando o solo lo supones?",
        "¿Qué evidencia tienes de que te están juzgando?",
        "¿Tú juzgas tanto a otros como crees que otros te juzgan a ti?"
      ]
    }
  ];

  const categories = {
    pensamiento: { label: "Pensamiento", icon: Brain, color: "bg-blue-500" },
    accion: { label: "Acción", icon: Users, color: "bg-green-500" },
    sensacion: { label: "Sensación Corporal", icon: Heart, color: "bg-red-500" }
  };

  const handleAnswer = (answer) => {
    const question = questions[currentQuestion];
    const isCorrect = answer === question.correctAnswer;
    
    setAnswers(prev => ({
      ...prev,
      [question.id]: {
        selected: answer,
        correct: isCorrect,
        isCatastrophic: question.isCatastrophic
      }
    }));

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setShowResult(true);
    setCompletedQuestions(prev => prev + 1);
  };

  const handleNextQuestion = () => {
    if (questions[currentQuestion].isCatastrophic && showResult) {
      setShowFollowUp(true);
      return;
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowResult(false);
      setShowFollowUp(false);
      setFollowUpAnswer('');
    }
  };

  const handleFollowUpComplete = () => {
    setShowFollowUp(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowResult(false);
    }
  };

  const restartAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setScore(0);
    setShowFollowUp(false);
    setFollowUpAnswer('');
    setCompletedQuestions(0);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return { message: "¡Excelente comprensión!", color: "text-green-600", icon: Award };
    if (percentage >= 60) return { message: "Buen nivel de comprensión", color: "text-blue-600", icon: Lightbulb };
    return { message: "Necesitas practicar más", color: "text-orange-600", icon: AlertTriangle };
  };

  const currentQ = questions[currentQuestion];

  if (completedQuestions === questions.length) {
    const scoreData = getScoreMessage();
    const ScoreIcon = scoreData.icon;
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AnxietyMind</h1>
          <p className="text-lg text-gray-600">Taller de Regulación Emocional - Juan Orta</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <ScoreIcon className="mx-auto mb-6 text-6xl" color={scoreData.color.replace('text-', '')} />
          <h2 className="text-3xl font-bold mb-4">¡Evaluación Completada!</h2>
          <p className={`text-2xl font-semibold mb-6 ${scoreData.color}`}>{scoreData.message}</p>
          
          <div className="bg-gray-100 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Resumen de Resultados:</h3>
            <div className="text-lg">
              <p className="mb-2">Respuestas correctas: <span className="font-bold text-green-600">{score}</span> de {questions.length}</p>
              <p className="mb-4">Precisión: <span className="font-bold">{Math.round((score / questions.length) * 100)}%</span></p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">Puntos Clave para Recordar:</h3>
            <ul className="text-left space-y-2 text-blue-700">
              <li>• <strong>Pensamientos:</strong> Ideas, interpretaciones y predicciones mentales</li>
              <li>• <strong>Sensaciones:</strong> Manifestaciones físicas de la ansiedad</li>
              <li>• <strong>Acciones:</strong> Comportamientos de evitación o compulsivos</li>
              <li>• <strong>Lenguaje catastrofista:</strong> Usar palabras absolutas y predecir lo peor</li>
            </ul>
          </div>

          <button
            onClick={restartAssessment}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center mx-auto"
          >
            <RotateCcw className="mr-2" size={20} />
            Comenzar Nuevo Ejercicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">AnxietyMind</h1>
        <p className="text-lg text-gray-600">Taller de Regulación Emocional - Juan Orta</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Pregunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              Puntuación: {score}/{completedQuestions}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {!showFollowUp ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Identifica el tipo de manifestación:
              </h2>
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <p className="text-xl text-gray-700 text-center font-medium">
                  "{currentQ.statement}"
                </p>
              </div>
            </div>

            {!showResult ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {Object.entries(categories).map(([key, category]) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => handleAnswer(key)}
                      className={`p-6 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-center group`}
                    >
                      <Icon className="mx-auto mb-3 text-gray-600 group-hover:text-blue-600" size={32} />
                      <span className="text-lg font-medium text-gray-700 group-hover:text-blue-700">
                        {category.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="mb-6">
                <div className={`rounded-lg p-6 mb-4 ${
                  answers[currentQ.id]?.correct ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
                }`}>
                  <div className="flex items-center mb-3">
                    {answers[currentQ.id]?.correct ? (
                      <Check className="text-green-600 mr-2" size={24} />
                    ) : (
                      <X className="text-red-600 mr-2" size={24} />
                    )}
                    <span className={`font-semibold text-lg ${
                      answers[currentQ.id]?.correct ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {answers[currentQ.id]?.correct ? '¡Correcto!' : 'Incorrecto'}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">
                    <strong>Respuesta correcta:</strong> {categories[currentQ.correctAnswer].label}
                  </p>
                  <p className="text-gray-700">
                    <strong>Explicación:</strong> {currentQ.explanation}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="text-blue-600 mr-2" size={20} />
                    <span className="font-semibold text-blue-800">Nota educativa:</span>
                  </div>
                  <p className="text-blue-700">{currentQ.educationalNote}</p>
                </div>

                {currentQ.isCatastrophic && (
                  <div className="bg-orange-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="text-orange-600 mr-2" size={20} />
                      <span className="font-semibold text-orange-800">Pensamiento Catastrofista Detectado</span>
                    </div>
                    <p className="text-orange-700">
                      Esta frase contiene lenguaje catastrofista. Es importante cuestionar estos pensamientos extremos.
                    </p>
                  </div>
                )}

                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {currentQ.isCatastrophic ? 'Continuar con Reflexión' : 
                   (currentQuestion === questions.length - 1 ? 'Ver Resultados' : 'Siguiente Pregunta')}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Reflexión sobre el Pensamiento Catastrofista:
            </h3>
            <div className="bg-yellow-50 rounded-lg p-6 mb-6">
              <p className="text-lg text-gray-700 mb-4">
                <strong>Pensamiento analizado:</strong> "{currentQ.statement}"
              </p>
              <p className="text-gray-600 mb-4">
                Reflexiona sobre las siguientes preguntas para desafiar este pensamiento:
              </p>
              <ul className="space-y-3">
                {currentQ.followUpQuestions.map((question, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{question}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">Recordatorio importante:</h4>
              <p className="text-blue-700">
                Hacer frente a estos temores y cuestionar los pensamientos catastróficos es un paso fundamental en el tratamiento de la ansiedad. 
                La exposición gradual y el cuestionamiento de evidencias son herramientas terapéuticas efectivas.
              </p>
            </div>

            <button
              onClick={handleFollowUpComplete}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              {currentQuestion === questions.length - 1 ? 'Completar Evaluación' : 'Continuar con Siguiente Pregunta'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnxietyAssessmentApp;