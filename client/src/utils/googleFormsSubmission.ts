interface GoogleFormsData {
    session_id: string;
    total_time: number;
    suggestion_usage_rate: number;
    typo_rate: number;
    suggestion_error_rate: number;
    avg_click_interval: number;
    button_style: string;
    prediction_enabled: boolean; 
  }
  
  // Add the new fields to your Google Form and update these entry IDs
  const GOOGLE_FORM_CONFIG = {
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScss8XxFuMXD28cREapGWr89Uf7I0dd3Y48Nh99nGJc0of8Zg/formResponse',
    fields: {
      session_id: 'entry.541366077', // You'll need to add this field to your form and update this entry ID
      total_time: 'entry.1915366020',
      suggestion_usage_rate: 'entry.1015685939',
      typo_rate: 'entry.1403094540',
      suggestion_error_rate: 'entry.1139193925',
      avg_click_interval: 'entry.1687756209',
      button_style: 'entry.2089806948',
      prediction_enabled: 'entry.1239196792', 
    }
  };
  
  export const submitToGoogleForms = async (data: GoogleFormsData): Promise<boolean> => {
    // Check if running on localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Running on localhost, skipping Google Forms submission.');
      return true; // Pretend submission was successful for local testing
    }

    try {
      console.log('Submitting data to Google Forms:', data);
      
      // Create form data
      const formData = new FormData();
      formData.append(GOOGLE_FORM_CONFIG.fields.session_id, data.session_id);
      
      // Temporary: Log the field name to help find the correct entry ID
      console.log('Session ID field name:', GOOGLE_FORM_CONFIG.fields.session_id);
      console.log('Session ID value:', data.session_id);
      
      formData.append(GOOGLE_FORM_CONFIG.fields.total_time, data.total_time.toString());
      formData.append(GOOGLE_FORM_CONFIG.fields.suggestion_usage_rate, data.suggestion_usage_rate.toString());
      formData.append(GOOGLE_FORM_CONFIG.fields.typo_rate, data.typo_rate.toString());
      formData.append(GOOGLE_FORM_CONFIG.fields.suggestion_error_rate, data.suggestion_error_rate.toString());
      formData.append(GOOGLE_FORM_CONFIG.fields.avg_click_interval, data.avg_click_interval.toString());
      
      // NEW: Include button style and prediction enabled status
      formData.append(GOOGLE_FORM_CONFIG.fields.button_style, data.button_style);
      formData.append(GOOGLE_FORM_CONFIG.fields.prediction_enabled, data.prediction_enabled.toString());

      // Submit to Google Forms (no-cors mode because Google Forms doesn't support CORS)
      const response = await fetch(GOOGLE_FORM_CONFIG.formUrl, {
        method: 'POST',
        mode: 'no-cors', // Important: Google Forms requires no-cors
        body: formData
      });
  
      // Note: With no-cors, we can't read the response, but if no error is thrown, it likely succeeded
      console.log('Data submitted to Google Forms successfully');
      return true;
    } catch (error) {
      console.error('Error submitting to Google Forms:', error);
      return false;
    }
  };
  
  // Updated test function with new fields
  export const testGoogleFormsSubmission = async (): Promise<void> => {
    const testData: GoogleFormsData = {
      session_id: 'test-session-' + Date.now(),
      total_time: 45.67,
      suggestion_usage_rate: 75.5,
      typo_rate: 12.3,
      suggestion_error_rate: 8.2,
      avg_click_interval: 1.85,
      button_style: 'style1',
      prediction_enabled: true // NEW: Test with prediction enabled
    };
  
    console.log('Testing Google Forms submission with data:', testData);
    const success = await submitToGoogleForms(testData);
    
    if (success) {
      alert('Test data sent to Google Forms successfully! Check your form responses.');
    } else {
      alert('Failed to send test data to Google Forms. Check console for errors.');
    }
  };