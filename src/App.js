import React, { useState } from 'react';
import './App.css';
import PatientMasterForm from './Forms/PatientMasterForm';
import DoctorMasterForm from './Forms/DoctorMasterForm';
import BillingForm from './Forms/BillingForm';
import OperatorMasterForm from './Forms/OperatorMasterForm';
import Header from './Header';
import PanelMasterForm from './Forms/PanelMasterForm';

const App = () => {
  const [selectedForm, setSelectedForm] = useState('PatientMasterForm');

  const handleChange = (event) => {
    setSelectedForm(event.target.value);
  };

  return (
    <div>
      <Header />
      <div className='dropdown' style={{ position: 'absolute', top: '60px', right: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff', transition: 'background-color 0.3s' }}>
        <select value={selectedForm} onChange={handleChange} style={{ border: 'none', outline: 'none'  }}>
          <option value="PatientMasterForm">Patient Master Form</option>
          <option value="DoctorMasterForm">Doctor Master Form</option>
          <option value="BillingForm">Billing Form</option>
          <option value="OperatorMasterForm">Operator Master Form</option>
          <option value="PanelMasterForm">Panel Master Form</option>
        </select>
      </div>
      <div className='master-form' style={{ marginTop: '10px' }}> {/* Added margin top */}
        {selectedForm === 'PatientMasterForm' && <PatientMasterForm />}
        {selectedForm === 'DoctorMasterForm' && <DoctorMasterForm />}
        {selectedForm === 'BillingForm' && <BillingForm />}
        {selectedForm === 'OperatorMasterForm' && <OperatorMasterForm />}
        {selectedForm === 'PanelMasterForm' && <PanelMasterForm />}
      </div>
    </div>
  );
};

export default App;
