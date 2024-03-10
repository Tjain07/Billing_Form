import React, { useState } from 'react';
import { State, City, Country } from 'country-state-city'; // Import State, City, and Country from country-state-city
import './OperatorMasterForm.css';
import { sendDataToOperatorBackend } from '../api';

const OperatorMasterForm = () => {
    // State to manage form fields
    const [formData, setFormData] = useState({
        name: '',
        aadhar: '',
        dob: '',
        email: '',
        age: '',
        gender: '',
        phone: '',
        addr: '',
        country: '',
        area: '',
        state: '',
        postalcode: '',
        city: '',
        altmobno: '',
        relationship: '',
        department: '',
        subDepartment: '',
        qualification: '',
        specialist: '',
        remarks: '',
    });
    // Fetch countries
    const countries = Country.getAllCountries();

    // Fetch states based on selected country
    const fetchStates = (selectedCountry) => {
        const statesOfSelectedCountry = State.getStatesOfCountry(selectedCountry);
        return statesOfSelectedCountry;
    };

    // Fetch cities based on selected state
    const fetchCities = (selectedState) => {
        const citiesOfSelectedState = City.getCitiesOfState(formData.country, selectedState);
        return citiesOfSelectedState;
    };


    // Handle form field changes
    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // If state is changed, reset city field and fetch cities of selected state
        if (name === 'country') {
            setFormData(prevState => ({
                ...prevState,
                state: '', // Reset state field
                city: '', // Reset city field
                [name]: value,
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    const departmentOptions = [
        { value: 'Cardiology', label: 'Cardiology', subDepartments: ['Cardiology_Sub1', 'Cardiology_Sub2'] },
        { value: 'Orthopedics', label: 'Orthopedics', subDepartments: ['Orthopedics_Sub1', 'Orthopedics_Sub2'] },
        { value: 'Neurology', label: 'Neurology', subDepartments: ['Neurology_Sub1', 'Neurology_Sub2'] },
        { value: 'Oncology', label: 'Oncology', subDepartments: ['Oncology_Sub1', 'Oncology_Sub2'] },
        { value: 'Pediatrics', label: 'Pediatrics', subDepartments: ['Pediatrics_Sub1', 'Pediatrics_Sub2'] },
        // Add more departments and their sub-departments as needed
    ];

    const qualifications = [
        'MBBS',
        'MD',
        'MS',
        'DM',
        'MCh',
        'BDS',
        'MDS',
        'DNB',
        'PhD',
        'Others'
    ];

    const specialists = [
        'Cardiologist',
        'Orthopedist',
        'Neurologist',
        'Oncologist',
        'Pediatrician',
        'Gynecologist',
        'Dermatologist',
        'Psychiatrist',
        'ENT Specialist',
        'Urologist',
        'Endocrinologist',
        'Pulmonologist',
        'Ophthalmologist',
        'Gastroenterologist',
        'Nephrologist',
        'Hematologist',
        'Rheumatologist',
        'Allergist/Immunologist',
        'Others'
    ];

    const familyMembers = [
        'Self',
        'Spouse',
        'Child',
        'Parent',
        'Sibling',
        'Grandparent',
        'Grandchild',
        'Aunt',
        'Uncle',
        'Niece',
        'Nephew',
        'Cousin',
        'In-Law',
        'Other'
    ];

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = { data: formData };

        // Call sendDataToPatientBackend function with formData
        sendDataToOperatorBackend(dataToSend)
            .then(() => {
                console.log('Data successfully inserted');
            })
            .catch(error => {
                console.error('Error inserting data:', error);
            });

        // Move the logging after the API call
        console.log(JSON.stringify(dataToSend));
    };

    return (
        <div>
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Operator Master Form</h1>
            <div className="form-container">
                <div className="left-section">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date Of Birth:</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            placeholder="Enter your D.O.B."
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age/Gender:</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            placeholder="Enter your Age"
                            className="form-control"
                        />
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleInputChange}
                        />
                        Male
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleInputChange}
                        />
                        Female
                    </div>
                </div>
                <div className="right-section" >
                    <div className="form-group">
                        <label htmlFor="aadhar">Aadhar No.</label>
                        <input
                            type="text"
                            name="aadhar"
                            value={formData.aadhar}
                            onChange={handleInputChange}
                            placeholder="Enter your Aadhar"
                            className="form-control"
                        />
                    </div>
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
            <div className="form-container">
                <div className="left-section">
                    <div className="form-group">
                        <label htmlFor="altmobno">Alternate Mob. No.: </label>
                        <input
                            type="text"
                            name="altmobno"
                            value={formData.altmobno}
                            onChange={handleInputChange}
                            placeholder="Enter your ALT MOB. NO."
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="right-section">
                <div className="form-group">
                        <label htmlFor="relationship">Relationship:</label>
                        {formData.relationship === 'Other' ? (
                            <input
                                type="text"
                                name="otherRelationship"
                                value={formData.otherRelationship}
                                onChange={handleInputChange}
                                placeholder="Enter Other Relationship"
                                className="form-control"
                            />
                        ) : (
                            <select
                                name="relationship"
                                value={formData.relationship}
                                onChange={handleInputChange}
                                className="form-control"
                            >
                                <option value="">Select Relationship</option>
                                {familyMembers.map(member => (
                                    <option key={member} value={member}>{member}</option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
            </div>
            <div className="form-last-container">
                <div className="section">
                    <div className="left-section">
                        <div className="form-group">
                            <label htmlFor="department">Department:</label>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                                className="form-control"
                            >
                                <option value="">Select Department</option>
                                {departmentOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="specialist">Specialist:</label>
                            <select
                                name="specialist"
                                value={formData.specialist}
                                onChange={handleInputChange}
                                className="form-control"
                            >
                                <option value="">Select Specialist</option>
                                {specialists.map(specialist => (
                                    <option key={specialist} value={specialist}>{specialist}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="right-section">
                        <div className="form-group">
                            <label htmlFor="qualification">Qualification:</label>
                            <select
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleInputChange}
                                className="form-control"
                            >
                                <option value="">Select Qualification</option>
                                {qualifications.map(qualification => (
                                    <option key={qualification} value={qualification}>{qualification}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='medication'>
                    <div className="form-group">
                        <label htmlFor="remarks">Remarks:</label>
                        <textarea
                            name="patienthist"
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

export default OperatorMasterForm;
