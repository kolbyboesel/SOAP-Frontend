// src/pages/ContactModal.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(true); // Manage modal visibility
  const navigate = useNavigate(); // To navigate programmatically

  // Function to close the modal and navigate to home
  const closeModal = () => {
    setIsVisible(false);
    navigate('/'); // Navigate to home page when modal is closed
  };

  useEffect(() => {
    // Automatically show the modal when the component is loaded
    setIsVisible(true);
  }, []); // Empty dependency array means this effect runs once when the component is mounted

  return (
    isVisible && (
      <div className="modal" id="contactModal" style={{ display: 'block' }}>
        <div className="container modal-container">
          <section className="ftco-section">
            <div className="modal-content animate" style={{ width: 'fit-content' }}>
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="wrapper" style={{ boxShadow: 'none' }}>
                    <div className="row no-gutters">
                      <div className="col-12 d-flex align-items-stretch" style={{ margin: 'auto' }}>
                        <div
                          className="info-wrap w-100 p-4"
                          style={{ backgroundColor: 'white', borderRadius: '10px' }}
                        >
                          <button
                            onClick={closeModal}
                            style={{
                              color: 'black',
                              float: 'right',
                              fontSize: '1.5rem',
                              fontWeight: 'bold',
                              border: 'none',
                              background: 'transparent',
                              textAlign: 'right',
                              padding: '0',
                            }}
                          >
                            X
                          </button>
                          <h3 style={{ color: 'black' }}>Let's get in touch</h3>
                          <p className="mb-4" style={{ color: 'black' }}>
                            We're open for any suggestions or bug fixes!
                          </p>

                          {/* Phone Section */}
                          <div className="dbox w-100 d-flex align-items-center">
                            <div className="text pl-3">
                              <p>
                                <span style={{ color: 'black' }}>Phone:</span>{' '}
                                <a href="tel://4148288543" style={{ color: 'black' }}>
                                  (414)-828-8543
                                </a>
                              </p>
                            </div>
                          </div>

                          {/* Email Section */}
                          <div className="dbox w-100 d-flex align-items-center">
                            <div className="text pl-3">
                              <p>
                                <span style={{ color: 'black' }}>Email:</span>{' '}
                                <a href="mailto:kolbyzboesel@gmail.com" style={{ color: 'black' }}>
                                  kolbyzboesel@gmail.com
                                </a>
                              </p>
                            </div>
                          </div>

                          {/* Website Section */}
                          <div className="dbox w-100 d-flex align-items-center">
                            <div className="text pl-3">
                              <p>
                                <span style={{ color: 'black' }}>Website:</span>{' '}
                                <a href="www.soapscores.com" style={{ color: 'black' }}>
                                  www.soapscores.com
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div >
      </div >
    )
  );
};

export default Contact;