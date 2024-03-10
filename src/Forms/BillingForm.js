import React, { useState } from 'react';
import './BillingForm.css';
import { sendDataToBillingBackend } from '../api'; // Correct import path

const BillingForm = () => {
    // State to manage form fields
    const [formData, setFormData] = useState({
        status:'',
        billdate:'',
        receiptno:'',
        age: '',
        gender: '',
        billno:'',
        registerno:'',
        patname:'',
        servhead:'',
        rate:'',
        amount:'',
        servname:'',
        quantity:'',
        cashcred:'',
        itemdisc:'',
        netamt:'',
        billdisc:'',
        paymode:'',
        condoc:'',
        operator:'',
        refdoc:'',
    });

    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = { data: formData };

        // Call sendDataToPatientBackend function with formData
        sendDataToBillingBackend(dataToSend)
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
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Billing Form</h1>
            <div className="form-group" style={{marginLeft:'40px'}}>
                        <label htmlFor="">Status</label>
                        <input
                            type="radio"
                            name="status"
                            value="interim"
                            checked={formData.status === "interim"}
                            onChange={handleInputChange}
                            style={{marginLeft:'10px'}}
                        />
                        Interim
                        <input
                            type="radio"
                            name="status"
                            value="final"
                            checked={formData.status === "final"}
                            onChange={handleInputChange}
                        />
                        Final
                    </div>
            <div className="form-container">
                <div className="left-section">
                <div className="form-group">
                        <label htmlFor="billdate">Billing Date</label>
                        <input
                            type="date"
                            name="billdate"
                            value={formData.billdate}
                            onChange={handleInputChange}
                            placeholder="Enter your Bill Date"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="receiptno">Reciept No.:</label>
                        <select
                            name="receiptno"
                            value={formData.receiptno}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Select Receipt No.</option>
                            {/* Add state options here */}
                        </select>
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
                <div className="right-section">
                    <div className="form-group">
                        <label htmlFor="billno">Bill No.:</label>
                        <input
                            type="text"
                            name="billno"
                            value={formData.billno}
                            onChange={handleInputChange}
                            placeholder="Enter your bill no."
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registerno">Registeration No.</label>
                        <input
                            type="number"
                            name="registerno"
                            value={formData.registerno}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="patname">Patient Name</label>
                        <select
                            name="patnamee"
                            value={formData.patname}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Select Patient Name</option>
                            {/* Add state options here */}
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-container">
                <div className="left-section">
                    <div className="form-group">
                        <label htmlFor="servhead">Service Head:</label>
                        <select
                            name="servhead"
                            value={formData.servhead}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Select Service Head</option>
                            {/* Add state options here */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rate">Rate:</label>
                        <select
                            name="rate"
                            value={formData.rate}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Select the rate</option>
                            {/* Add state options here */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount:</label>
                        <select
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Select the amount</option>
                            {/* Add state options here */}
                        </select>
                    </div>
                </div>
                <div className="right-section">
                    <div className="form-group">
                        <label htmlFor="servname">Service Name:</label>
                        <select
                            name="servname"
                            value={formData.servname}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Select Service Name</option>
                            {/* Add state options here */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity:</label>
                        <select
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Select Quantity</option>
                            {/* Add city options here */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cashcred">Cash/Credit</label>
                        <select
                            name="cashcred"
                            value={formData.cashcred}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Select Cash/Credit</option>
                            <option value="Cash">Cash</option>
                            <option value="Credit">Credit</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-container">
                <div className="left-section">
                    <div className="form-group">
                        <label htmlFor="itemdisc">Item Discount:</label>
                        <select
                            name="itemdisc"
                            value={formData.itemdisc}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Select Item Discount</option>
                            {/* Add city options here */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="netamt">Net Amount:</label>
                        <input
                            type="text"
                            name="netamt"
                            value={formData.netamt}
                            onChange={handleInputChange}
                            placeholder="Enter Net Amount"
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="right-section">
                    <div className="form-group">
                        <label htmlFor="billdisc">Bill Discount:</label>
                        <input
                            type="text"
                            name="billdisc"
                            value={formData.billdisc}
                            onChange={handleInputChange}
                            placeholder="Enter Bill Discount"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymode">Pay Mode:</label>
                        <select
                            name="paymode"
                            value={formData.paymode}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Select Pay Mode</option>
                            {/* Add city options here */}
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-container">
                    <div className="left-section">
                        <div className="form-group">
                            <label htmlFor="condoc">Consultation Doctor:</label>
                            <select
                                name="condoc"
                                value={formData.condoc}
                                onChange={handleInputChange}
                                className="form-control"
                            >
                                <option value="">Select Consulatation Doctor</option>
                                {/* Add state options here */}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="operator">Operator:</label>
                            <input
                                type="text"
                                name="operator"
                                value={formData.operator}
                                onChange={handleInputChange}
                                placeholder="Enter Operator Name"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="right-section">
                        <div className="form-group">
                            <label htmlFor="refdoc">Reference Doctor:</label>
                            <input
                                type="text"
                                name="refdoc"
                                value={formData.refdoc}
                                onChange={handleInputChange}
                                placeholder="Enter Ref. Doctor"
                                className="form-control"
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

export default BillingForm;
