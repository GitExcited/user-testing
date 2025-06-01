export interface UserTestingData {
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  total_time?: number;
  suggestion_usage_rate?: number;
  typo_rate?: number;
  suggestion_error_rate?: number;
  click_interval_times: number[];
  totalClicks: number;
  totalSuggestions: number;
  totalTypos: number;
  buttonStyle: string;
  buttonPosition: string;
  finalText: string;
  targetSentence: string;
  correctSuggestionClicks: number;    // ADD THIS
  incorrectSuggestionClicks: number;  // ADD THIS
  predictionAccuracy: number;         // ADD THIS
}

export interface ClickEvent {
  timestamp: number;
  type: 'suggestion' | 'keyboard' | 'backspace';
  value: string;
}