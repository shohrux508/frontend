import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Database, 
  Settings, 
  Cpu, 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  User,
  GraduationCap
} from 'lucide-react';

const Slide = ({ children, active }) => (
  <div className={`absolute inset-0 transition-all duration-500 transform ${active ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
    <div className="h-full flex flex-col p-8 md:p-16 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-y-auto">
      {children}
    </div>
  </div>
);

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title
    {
      title: "Классификация видов грибов",
      subtitle: "Съедобные против ядовитых (Тема №15)",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="p-4 bg-emerald-100 rounded-full text-emerald-600 mb-4">
            <Database size={64} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
            Классификация видов грибов: <br />
            <span className="text-emerald-600">съедобные vs ядовитые</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl italic">
            Разработка и оценка моделей машинного обучения для автоматического определения безопасности грибов на основе их морфологических признаков.
          </p>
          <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-slate-600 font-medium">Дисциплина: Машинное обучение</p>
          </div>
        </div>
      )
    },
    // Slide 2: Problem & Data
    {
      title: "Постановка задачи и данные",
      content: (
        <div className="grid md:grid-cols-2 gap-8 items-center h-full">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mt-1"><Info size={24} /></div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Источник</h3>
                <p className="text-slate-600">UCI Machine Learning Repository / Kaggle (Mushroom Dataset)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mt-1"><Database size={24} /></div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Объем данных</h3>
                <p className="text-slate-600">8,124 записи, 22 морфологических признака</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-red-100 text-red-600 rounded-lg mt-1"><AlertTriangle size={24} /></div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Целевая переменная</h3>
                <p className="text-slate-600 font-medium text-lg">Mushroom_quality:</p>
                <ul className="list-disc ml-5 text-slate-600">
                  <li><span className="font-bold text-emerald-600">e</span> (edible) — съедобный</li>
                  <li><span className="font-bold text-rose-600">p</span> (poisonous) — ядовитый</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300">
            <h4 className="text-center font-bold text-slate-700 mb-4 uppercase text-sm tracking-widest">Примеры признаков</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {['Cap-shape', 'Cap-surface', 'Cap-color', 'Bruises', 'Odor', 'Gill-attachment', 'Gill-size', 'Stalk-root', 'Ring-type', 'Habitat'].map(tag => (
                <div key={tag} className="bg-white p-2 rounded shadow-sm text-slate-500 border border-slate-100">{tag}</div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Slide 3: Preprocessing
    {
      title: "Предварительная обработка данных",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Settings className="text-slate-500" /> Очистка и пропуски
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span>Удален признак <b>veil_type</b> (константный)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span>В <b>stalk_root</b> «?» заменены на «Unknown»</span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Cpu className="text-slate-500" /> Кодирование и Разбиение
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span><b>Label Encoding</b> для таргета (0/1)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span><b>One-Hot Encoding</b> для категорий</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span><b>Split 70/30</b> со стратификацией</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-blue-800 text-center font-medium italic">
              «Качественная предобработка позволила моделям достичь максимальной точности на разреженных данных»
            </p>
          </div>
        </div>
      )
    },
    // Slide 4: Algorithms
    {
      title: "Реализованные алгоритмы",
      content: (
        <div className="grid md:grid-cols-2 gap-10 h-full">
          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-4">Random Forest</h3>
              <p className="text-emerald-700 leading-relaxed mb-6">
                Ансамблевый метод, объединяющий множество решающих деревьев. Превосходно справляется с категориальными данными и выявляет сложные зависимости.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-emerald-600 font-medium">
              Преимущество: Высокая устойчивость к переобучению.
            </div>
          </div>
          <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">Naive Bayes</h3>
              <p className="text-indigo-700 leading-relaxed mb-6">
                Вероятностный классификатор на основе теоремы Байеса. Работает быстро и требует относительно небольшого объема данных для обучения.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-indigo-600 font-medium">
              Преимущество: Минимальные вычислительные затраты.
            </div>
          </div>
        </div>
      )
    },
    // Slide 5: Results
    {
      title: "Результаты классификации",
      content: (
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-4 text-left font-bold text-slate-700 border-b-2 border-slate-200">Метрика</th>
                  <th className="p-4 text-center font-bold text-emerald-700 border-b-2 border-emerald-200">Random Forest</th>
                  <th className="p-4 text-center font-bold text-indigo-700 border-b-2 border-indigo-200">Naive Bayes</th>
                </tr>
              </thead>
              <tbody className="text-lg">
                {[
                  { label: "Accuracy", rf: "100%", nb: "95.1%" },
                  { label: "Precision (p)", rf: "1.00", nb: "0.91" },
                  { label: "Recall (p)", rf: "1.00", nb: "0.99" },
                  { label: "F1-score", rf: "1.00", nb: "0.95" },
                  { label: "ROC-AUC", rf: "1.00", nb: "0.99" }
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-4 text-slate-600 font-medium border-b border-slate-100">{row.label}</td>
                    <td className="p-4 text-center font-bold text-emerald-600 border-b border-slate-100">{row.rf}</td>
                    <td className="p-4 text-center font-semibold text-indigo-500 border-b border-slate-100">{row.nb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex gap-4">
             <div className="flex-1 bg-emerald-50 border-l-4 border-emerald-500 p-4">
               <span className="block font-bold text-emerald-800">Идеальный результат</span>
               <span className="text-emerald-600 text-sm italic">RF безошибочно определил все классы.</span>
             </div>
             <div className="flex-1 bg-amber-50 border-l-4 border-amber-500 p-4">
               <span className="block font-bold text-amber-800">Безопасный Recall</span>
               <span className="text-amber-600 text-sm italic">NB почти не пропускает ядовитые грибы.</span>
             </div>
          </div>
        </div>
      )
    },
    // Slide 6: Analysis
    {
      title: "Анализ ошибок и визуализация",
      content: (
        <div className="grid md:grid-cols-2 gap-8 h-full">
          <div className="space-y-6">
            <div className="bg-slate-800 text-white p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-3">Random Forest</h3>
              <p className="text-slate-300">
                Модель не допустила ни одной ошибки в тестовой выборке. Это свидетельствует о том, что признаки датасета позволяют провести четкую границу между классами.
              </p>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Naive Bayes</h3>
              <p className="text-slate-600">
                Показатель <b>Recall = 0.99</b> говорит о высокой надежности. Ошибки в основном относятся к <b>False Positives</b>: съедобные грибы принимаются за ядовитые, что безопасно для жизни.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <h4 className="font-bold text-slate-700 uppercase text-xs tracking-widest text-center">Важность признаков (Оценка)</h4>
            <div className="space-y-3">
              {[
                { name: 'Odor (Запах)', val: 95 },
                { name: 'Gill-size', val: 78 },
                { name: 'Gill-color', val: 65 },
                { name: 'Stalk-surface', val: 50 },
              ].map(feat => (
                <div key={feat.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{feat.name}</span>
                    <span className="text-slate-400">{feat.val}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{width: `${feat.val}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Slide 7: Conclusions
    {
      title: "Выводы и рекомендации",
      content: (
        <div className="space-y-8 flex flex-col justify-center h-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-emerald-500 transition-colors">
              <div className="inline-block p-3 bg-emerald-100 text-emerald-600 rounded-full mb-4"><CheckCircle2 size={32} /></div>
              <h4 className="font-bold mb-2">Выбор модели</h4>
              <p className="text-slate-500 text-sm">Random Forest — безоговорочный лидер для практического применения.</p>
            </div>
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-emerald-500 transition-colors">
              <div className="inline-block p-3 bg-emerald-100 text-emerald-600 rounded-full mb-4"><AlertTriangle size={32} /></div>
              <h4 className="font-bold mb-2">Приоритет метрик</h4>
              <p className="text-slate-500 text-sm">Recall важнее Accuracy. Ошибка пропуска ядовитого гриба — критическая.</p>
            </div>
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-emerald-500 transition-colors">
              <div className="inline-block p-3 bg-emerald-100 text-emerald-600 rounded-full mb-4"><BarChart3 size={32} /></div>
              <h4 className="font-bold mb-2">Ключевой фактор</h4>
              <p className="text-slate-500 text-sm">Запах — самый информативный признак при полевой идентификации.</p>
            </div>
          </div>
          <div className="bg-slate-800 text-white p-8 rounded-3xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-lg italic opacity-90 text-center">
                «Машинное обучение позволяет эффективно решать задачи классификации в биологии, обеспечивая высокий уровень безопасности предсказаний.»
              </p>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Database size={120} />
            </div>
          </div>
        </div>
      )
    },
    // Slide 8: Final
    {
      title: "Спасибо за внимание!",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-12">
          <div className="relative">
             <div className="p-8 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full text-white shadow-2xl animate-pulse">
                <CheckCircle2 size={80} />
             </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Проект завершен</h2>
            <p className="text-slate-500 text-lg">Готов ответить на ваши вопросы</p>
          </div>
          
          <div className="w-full max-w-md pt-12 border-t border-slate-100 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 text-slate-700 font-bold text-xl">
              <User className="text-emerald-500" />
              <span>Игиталиев Шохрухбек Тохтасин угли</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500 font-medium">
              <GraduationCap className="text-slate-400" />
              <span>Группа 152-23</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const next = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prev = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4 font-sans text-slate-900">
      <div className="w-full max-w-5xl aspect-video relative">
        
        {/* Main Deck */}
        <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-slate-100">
          {slides.map((slide, index) => (
            <Slide key={index} active={currentSlide === index}>
              {slide.title && (
                <div className="flex justify-between items-center mb-8 shrink-0">
                  <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-emerald-500 pl-4">
                    {slide.title}
                  </h2>
                  <div className="text-slate-300 font-mono text-sm">
                    {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                  </div>
                </div>
              )}
              <div className="flex-grow">
                {slide.content}
              </div>
            </Slide>
          ))}
        </div>

        {/* Navigation Overlays */}
        <div className="absolute -bottom-16 left-0 right-0 flex justify-between items-center px-4">
          <div className="flex gap-2">
            <button 
              onClick={prev}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-slate-50 transition-all text-slate-600 active:scale-95 border border-slate-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-slate-50 transition-all text-slate-600 active:scale-95 border border-slate-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex gap-1">
            {slides.map((_, i) => (
              <div 
                key={i} 
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${currentSlide === i ? 'w-8 bg-emerald-500 shadow-sm' : 'w-2 bg-white opacity-50 hover:opacity-80'}`}
              />
            ))}
          </div>

          <div className="text-slate-500 font-medium text-sm hidden sm:block">
            Используйте стрелки ⬅️ ➡️ для навигации
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;