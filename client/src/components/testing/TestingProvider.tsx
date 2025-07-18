import React, { createContext, useContext, useState, useEffect } from "react";
import { UserTestingData, ClickEvent } from "@shared/userTesting";
import { submitToGoogleForms } from "@/utils/googleFormsSubmission";
import { AutomatedTestingController, TestCombination } from "./AutomatedTestingController";

import { PredictionInfoModal } from "../ui/PredictionInfoModal";

interface TestingContextType {
  // Automated testing
  automatedController: AutomatedTestingController;
  currentTest: TestCombination | null;
  isAutomatedTesting: boolean;
  startAutomatedTesting: () => void;
  submitCurrentTest: () => Promise<void>;
  isAllTestsCompleted: boolean;
  progress: { current: number; total: number; percentage: number };
  isSubmitting: boolean;
  isPredictionModalOpen: boolean;
  closePredictionModal: () => void;
  
  // Single test session data
  isTestingActive: boolean;
  testingData: UserTestingData | null;
  trackClick: (type: 'suggestion' | 'keyboard' | 'backspace', value: string) => void;
  trackSuggestion: () => void;
  trackSuggestionAccuracy: (isCorrect: boolean) => void;
}

const TestingContext = createContext<TestingContextType | null>(null);

export function TestingProvider({ children }: { children: React.ReactNode }) {
  const [automatedController] = useState(new AutomatedTestingController());
  const [currentTest, setCurrentTest] = useState<TestCombination | null>(null);
  const [isAutomatedTesting, setIsAutomatedTesting] = useState(false);
  const [isAllTestsCompleted, setIsAllTestsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPredictionModal, setShowPredictionModal] = useState(false);

  useEffect(() => {
    if (automatedController.getProgress().current === 5) {
      setShowPredictionModal(true);
    }
  }, [automatedController.getProgress().current]);

  // Single session data
  const [isTestingActive, setIsTestingActive] = useState(false);
  const [testingData, setTestingData] = useState<UserTestingData | null>(null);
  const [clickEvents, setClickEvents] = useState<ClickEvent[]>([]);
  const [lastClickTime, setLastClickTime] = useState<number | null>(null);

  const startAutomatedTesting = () => {
    console.log('🚀 Starting automated testing sequence...');
    setIsAutomatedTesting(true);
    setIsAllTestsCompleted(false);
    automatedController.reset();
    startNextTest();
  };

  const startNextTest = () => {
    const nextTest = automatedController.getCurrentTest();
    if (!nextTest) {
      // All tests completed
      setIsAllTestsCompleted(true);
      setIsAutomatedTesting(false);
      setCurrentTest(null);
      console.log('🎉 All tests completed!');
      return;
    }

    setCurrentTest(nextTest);
    startSingleTest(nextTest);
    console.log(`📝 Starting test ${automatedController.getProgress().current + 1}/${automatedController.getProgress().total}:`, {
      buttonStyle: nextTest.buttonStyle,
      predictionEnabled: nextTest.predictionEnabled,
      scenario: nextTest.scenario.targetSentence
    });
  };

  const startSingleTest = (test: TestCombination) => {
    const sessionId = `${test.id}-${Date.now()}`;
    const newTestingData: UserTestingData = {
      sessionId,
      startTime: new Date(),
      click_interval_times: [],
      totalClicks: 0,
      totalSuggestions: 0,
      totalTypos: 0,
      buttonStyle: test.buttonStyle,
      predictionEnabled: test.predictionEnabled,
      finalText: "",
      targetSentence: test.scenario.targetSentence,
      correctSuggestionClicks: 0,
      incorrectSuggestionClicks: 0,
      predictionAccuracy: 0
    };

    setTestingData(newTestingData);
    setIsTestingActive(true);
    setClickEvents([]);
    setLastClickTime(Date.now());
  };

  const submitCurrentTest = async () => {
    if (!testingData || !isTestingActive || !currentTest || isSubmitting) return;

    setIsSubmitting(true);

    const endTime = new Date();
    const totalTime = (endTime.getTime() - testingData.startTime.getTime()) / 1000;
    
    // Calculate metrics
    const suggestionClicks = clickEvents.filter(e => e.type === 'suggestion').length;
    const suggestion_usage_rate = testingData.totalSuggestions > 0 
      ? (suggestionClicks / testingData.totalSuggestions) * 100 
      : 0;
    
    const typo_rate = calculateTypoRate(testingData.finalText, testingData.targetSentence);
    
    const avgClickInterval = testingData.click_interval_times.length > 0
      ? testingData.click_interval_times.reduce((a, b) => a + b, 0) / testingData.click_interval_times.length
      : 0;

    const suggestion_error_rate = calculateSuggestionErrorRate();

    const finalData = {
      ...testingData,
      endTime,
      total_time: totalTime,
      suggestion_usage_rate,
      typo_rate,
      suggestion_error_rate,
      avg_click_interval: avgClickInterval
    };

    console.log(`✅ Test ${automatedController.getProgress().current + 1} completed:`, finalData);

    // Submit to Google Forms immediately
    try {
      const googleFormsData = {
        total_time: totalTime,
        suggestion_usage_rate,
        typo_rate,
        suggestion_error_rate,
        avg_click_interval: avgClickInterval,
        button_style: testingData.buttonStyle,
        prediction_enabled: testingData.predictionEnabled
      };

      console.log(`📤 Submitting test ${automatedController.getProgress().current + 1} to Google Forms...`);
      const submitted = await submitToGoogleForms(googleFormsData);
      
      if (submitted) {
        console.log(`✅ Test ${automatedController.getProgress().current + 1} submitted successfully`);
      } else {
        console.log(`❌ Failed to submit test ${automatedController.getProgress().current + 1}`);
      }
    } catch (error) {
      console.error(`Google Forms submission error for test ${automatedController.getProgress().current + 1}:`, error);
    }

    // Mark test as completed and move to next
    automatedController.markCurrentTestCompleted();
    setIsTestingActive(false);
    setTestingData(null);
    setClickEvents([]);
    
    // Start next test after a brief delay
    setTimeout(() => {
      startNextTest();
      setIsSubmitting(false);
    }, 1000);
  };

  const trackClick = (type: 'suggestion' | 'keyboard' | 'backspace', value: string) => {
    if (!isTestingActive) return;

    const now = Date.now();
    const clickEvent: ClickEvent = { timestamp: now, type, value };
    
    setClickEvents(prev => [...prev, clickEvent]);

    if (lastClickTime) {
      const interval = now - lastClickTime;
      setTestingData(prev => prev ? {
        ...prev,
        click_interval_times: [...prev.click_interval_times, interval],
        totalClicks: prev.totalClicks + 1
      } : null);
    }
    
    setLastClickTime(now);
  };

  const trackSuggestion = () => {
    setTestingData(prev => prev ? { 
      ...prev, 
      totalSuggestions: prev.totalSuggestions + 1 
    } : null);
  };

  const trackSuggestionAccuracy = (isCorrect: boolean) => {
    setTestingData(prev => prev ? {
      ...prev,
      correctSuggestionClicks: prev.correctSuggestionClicks + (isCorrect ? 1 : 0),
      incorrectSuggestionClicks: prev.incorrectSuggestionClicks + (isCorrect ? 0 : 1)
    } : null);
  };

  const calculateTypoRate = (input: string, target: string): number => {
    const maxLength = Math.max(input.length, target.length);
    if (maxLength === 0) return 0;
    
    let errors = 0;
    for (let i = 0; i < maxLength; i++) {
      if (input[i] !== target[i]) {
        errors++;
      }
    }
    return (errors / maxLength) * 100;
  };

  const calculateSuggestionErrorRate = (): number => {
    const suggestionClicks = clickEvents.filter(e => e.type === 'suggestion');
    if (suggestionClicks.length === 0) return 0;
    
    const helpfulClicks = suggestionClicks.filter(click => 
      testingData?.targetSentence.toLowerCase().includes(click.value.toLowerCase())
    );
    
    return ((suggestionClicks.length - helpfulClicks.length) / suggestionClicks.length) * 100;
  };

  const progress = automatedController.getProgress();

  const closePredictionModal = () => {
    setShowPredictionModal(false);
  };

  return (
    <TestingContext.Provider value={{
      automatedController,
      currentTest,
      isAutomatedTesting,
      startAutomatedTesting,
      submitCurrentTest,
      isAllTestsCompleted,
      progress,
      isSubmitting,
      isPredictionModalOpen: showPredictionModal,
      closePredictionModal,
      isTestingActive,
      testingData,
      trackClick,
      trackSuggestion,
      trackSuggestionAccuracy
    }}>
      {children}
      <PredictionInfoModal isOpen={showPredictionModal} onClose={closePredictionModal} />
    </TestingContext.Provider>
  );
}

export const useTesting = () => {
  const context = useContext(TestingContext);
  if (!context) throw new Error('useTesting must be used within TestingProvider');
  return context;
};