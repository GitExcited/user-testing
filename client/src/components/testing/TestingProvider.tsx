import React, { createContext, useContext, useState } from "react";
import { UserTestingData, ClickEvent } from "@shared/userTesting";

interface TestingContextType {
  isTestingActive: boolean;
  testingData: UserTestingData | null;
  startTesting: (targetSentence: string, buttonStyle: string, buttonPosition: string) => void;
  endTesting: () => void;
  trackClick: (type: 'suggestion' | 'keyboard' | 'backspace', value: string) => void;
  trackSuggestion: () => void;
  trackSuggestionAccuracy: (isCorrect: boolean) => void;
}

const TestingContext = createContext<TestingContextType | null>(null);

export function TestingProvider({ children }: { children: React.ReactNode }) {
  const [isTestingActive, setIsTestingActive] = useState(false);
  const [testingData, setTestingData] = useState<UserTestingData | null>(null);
  const [clickEvents, setClickEvents] = useState<ClickEvent[]>([]);
  const [lastClickTime, setLastClickTime] = useState<number | null>(null);

  const startTesting = (targetSentence: string, buttonStyle: string, buttonPosition: string) => {
    const sessionId = Math.random().toString(36).substring(2, 15);
    const newTestingData: UserTestingData = {
      sessionId,
      startTime: new Date(),
      click_interval_times: [],
      totalClicks: 0,
      totalSuggestions: 0,
      totalTypos: 0,
      buttonStyle,
      buttonPosition,
      finalText: "",
      targetSentence,
      correctSuggestionClicks: 0,
      incorrectSuggestionClicks: 0,
      predictionAccuracy: 0
    };
    
    setTestingData(newTestingData);
    setIsTestingActive(true);
    setClickEvents([]);
    setLastClickTime(Date.now());
  };

  const endTesting = () => {
    if (!testingData || !isTestingActive) return;

    const endTime = new Date();
    const totalTime = (endTime.getTime() - testingData.startTime.getTime()) / 1000;
    
    // Calculate suggestion usage rate
    const suggestionClicks = clickEvents.filter(e => e.type === 'suggestion').length;
    const suggestion_usage_rate = testingData.totalSuggestions > 0 
      ? (suggestionClicks / testingData.totalSuggestions) * 100 
      : 0;
    
    // Calculate typo rate
    const typo_rate = calculateTypoRate(testingData.finalText, testingData.targetSentence);
    
    // Calculate average click interval
    const avgClickInterval = testingData.click_interval_times.length > 0
      ? testingData.click_interval_times.reduce((a, b) => a + b, 0) / testingData.click_interval_times.length
      : 0;

    const totalSuggestionClicks = testingData.correctSuggestionClicks + testingData.incorrectSuggestionClicks;
    const predictionAccuracy = totalSuggestionClicks > 0 
      ? (testingData.correctSuggestionClicks / totalSuggestionClicks) * 100 
      : 0;

    const finalData = {
      ...testingData,
      endTime,
      total_time: totalTime,
      suggestion_usage_rate,
      typo_rate,
      suggestion_error_rate: calculateSuggestionErrorRate(),
      predictionAccuracy
    };

    console.log('=== USER TESTING DATA ===', finalData);
    const existingData = localStorage.getItem('userTestingData');
    const allData = existingData ? JSON.parse(existingData) : [];
    allData.push(finalData);
    localStorage.setItem('userTestingData', JSON.stringify(allData));
    
    setIsTestingActive(false);
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

  return (
    <TestingContext.Provider value={{
      isTestingActive,
      testingData,
      startTesting,
      endTesting,
      trackClick,
      trackSuggestion,
      trackSuggestionAccuracy
    }}>
      {children}
    </TestingContext.Provider>
  );
}

export const useTesting = () => {
  const context = useContext(TestingContext);
  if (!context) throw new Error('useTesting must be used within TestingProvider');
  return context;
};