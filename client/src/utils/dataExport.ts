import { UserTestingData } from "@shared/userTesting";

export const exportDataAsCSV = () => {
  const data = localStorage.getItem('userTestingData');
  if (!data) {
    alert('No testing data found');
    return;
  }

  const testingData: UserTestingData[] = JSON.parse(data);
  
  const headers = [
    'sessionId',
    'buttonStyle', 
    'buttonPosition',
    'total_time',
    'suggestion_usage_rate',
    'typo_rate', 
    'suggestion_error_rate',
    'avg_click_interval',
    'totalClicks',
    'finalText',
    'targetSentence',
    'startTime'
  ];

  const rows = testingData.map(session => [
    session.sessionId,
    session.buttonStyle,
    session.buttonPosition,
    session.total_time?.toFixed(2) || '0',
    session.suggestion_usage_rate?.toFixed(2) || '0',
    session.typo_rate?.toFixed(2) || '0',
    session.suggestion_error_rate?.toFixed(2) || '0',
    session.click_interval_times.length > 0 
      ? (session.click_interval_times.reduce((a, b) => a + b, 0) / session.click_interval_times.length).toFixed(2)
      : '0',
    session.totalClicks,
    `"${session.finalText}"`,
    `"${session.targetSentence}"`,
    session.startTime.toISOString()
  ]);

  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `user-testing-data-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const clearTestingData = () => {
  if (confirm('Are you sure you want to clear all testing data?')) {
    localStorage.removeItem('userTestingData');
    alert('Testing data cleared');
  }
};