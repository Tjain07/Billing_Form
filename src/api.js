// api.js

export async function sendDataToBackend(formData) {
    try {
        const response = await fetch('http://localhost:5000/api/insertData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
  
      if (!response.ok) {
        throw new Error('Failed to insert data');
      }
  
      // Data successfully inserted
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }
  
  export async function sendDataToPatientBackend(formData) {
    try {
        const response = await fetch('http://localhost:5000/api/insertPatientData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
  
      if (!response.ok) {
        throw new Error('Failed to insert data');
      }
  
      // Data successfully inserted
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }

  export async function sendDataToDoctorBackend(formData) {
    try {
        const response = await fetch('http://localhost:5000/api/insertDoctorData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
  
      if (!response.ok) {
        throw new Error('Failed to insert data');
      }
  
      // Data successfully inserted
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }


  export async function sendDataToOperatorBackend(formData) {
    try {
        const response = await fetch('http://localhost:5000/api/insertOperatorData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
  
      if (!response.ok) {
        throw new Error('Failed to insert data');
      }
  
      // Data successfully inserted
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }

  export async function sendDataToBillingBackend(formData) {
    try {
        const response = await fetch('http://localhost:5000/api/insertBillingData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
  
      if (!response.ok) {
        throw new Error('Failed to insert data');
      }
  
      // Data successfully inserted
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }