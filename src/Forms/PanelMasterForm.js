import React, { useState } from 'react';
import { sendDataToBackend } from 'C:\\Users\\jaint\\OneDrive\\Desktop\\Finkepp\\Form\\form\\src\\api.js'; // Correct import path
import { State, City, Country } from 'country-state-city';
import './PanelMasterForm.css';
import * as XLSX from 'xlsx';

const PanelMasterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        addr: '',
        country: '',
        area: '',
        state: '',
        postalcode: '',
        city: '',
        remarks: '',
        panelRateCardFile: null, // New state for holding the uploaded file
        extractedTable: [], // New state to hold the extracted table data
    });

    const countries = Country.getAllCountries();

    const fetchStates = (selectedCountry) => {
        const statesOfSelectedCountry = State.getStatesOfCountry(selectedCountry);
        return statesOfSelectedCountry;
    };

    const fetchCities = (selectedState) => {
        const citiesOfSelectedState = City.getCitiesOfState(formData.country, selectedState);
        return citiesOfSelectedState;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'country') {
            setFormData(prevState => ({
                ...prevState,
                state: '',
                city: '',
                [name]: value,
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    // const handleFileChange = (e) => {
    //     setFormData(prevState => ({
    //         ...prevState,
    //         panelRateCardFile: e.target.files[0], // Update the state with the selected file
    //     }));
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = { data: formData };


        // Call sendDataToBackend function with formData
        sendDataToBackend(dataToSend)
            .then(() => {
                console.log('Data successfully inserted');
            })
            .catch(error => {
                console.error('Error inserting data:', error);
            });

        console.log(JSON.stringify(dataToSend));
    };

    const extractTableFromExcel = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const table = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            setFormData(prevState => ({
                ...prevState,
                extractedTable: table || [], // Ensure extractedTable is an empty array if table is undefined
            }));
        };
        reader.readAsArrayBuffer(file);
    };
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            panelRateCardFile: file, // Update the state with the selected file
        }));
        extractTableFromExcel(file); // Extract table from uploaded Excel file
    };

    const renderTable = () => {
        return (
            <table style={{ borderCollapse: 'collapse', width: '85%', border: '1px solid black', backgroundColor: '#f2f2f2' ,marginBottom:'50px',marginLeft:'5px'}}>
                <thead>
                    <tr>
                        {formData.extractedTable[0].map((cell, index) => (
                            <th key={index} style={{ border: '1px solid black', padding: '12px', textAlign: 'left', backgroundColor: '#dddddd' }}>{cell}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {formData.extractedTable.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f2f2f2' }}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={{ border: '1px solid black', padding: '12px' }}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };
    
    


    return (
        <div>
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Panel Master Form</h1>
            <div className="form-container">
                <div className="left-section">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="right-section" >
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            className="form-control"
                        />
                    </div>


                </div>
            </div>

            <div className="form-container">
                <div className="left-section">
                    <div className="form-group">
                        <label htmlFor="addr">Address:</label>
                        <input
                            type="text"
                            name="addr"
                            value={formData.addr}
                            onChange={handleInputChange}
                            placeholder="Enter you address line 1"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="area">Area:</label>
                        <input
                            type="text"
                            name="area"
                            value={formData.area}
                            onChange={handleInputChange}
                            placeholder="Enter your Area"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postalcode">Postal Code: </label>
                        <input
                            type="text"
                            name="postalcode"
                            value={formData.postalcode}
                            onChange={handleInputChange}
                            placeholder="Enter your Pincode"
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="right-section">
                    <div className="form-group">
                        <label htmlFor="country">Country:</label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Select Country</option>
                            {countries.map(country => (
                                <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Select State</option>
                            {fetchStates(formData.country).map(state => (
                                <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Select City</option>
                            {formData.state && fetchCities(formData.state).map(city => (
                                <option key={city.name} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-last-container">
                {/* New field for uploading Excel file */}
                <div className='panel-rate-card' style={{display:'flex'}}>
                    <div className="form-group">
                        <label htmlFor="panelRateCardFile">Panel Rate Card:</label>
                        <input
                            type="file"
                            name="panelRateCardFile"
                            accept=".xlsx, .xls"
                            onChange={handleFileChange}
                            className="form-control"
                            style={{marginLeft:'30px'}}
                        />
                    </div>
                    {/* Render the table if extracted table is available */}
                    {formData.extractedTable.length > 0 && renderTable()}
                    
                    {/* Additional input field for providing rate */}
                    <div className="form-group" style={{ marginLeft: '20px' }}>
                        <input
                            type="text"
                            name="serviceRate"
                            value={formData.serviceRate}
                            onChange={handleInputChange}
                            placeholder="Enter rate"
                            className="form-control"
                        />
                    </div>
                </div>

                <div className='medication'>
                    <div className="form-group">
                        <label htmlFor="remarks">Remarks:</label>
                        <textarea
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleInputChange}
                            className="form-control"
                            rows={4} // Specify the number of rows for the textarea
                        />
                    </div>
                </div>
            </div>

            <div className="submit-container">
                <button type="submit" className="btn-submit" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default PanelMasterForm;
