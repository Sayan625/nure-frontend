import React from 'react';

function ContactUs() {
  return (
    <div>

      <h3 className="text-center mb-4">Contact Us</h3>
      <div className="container">
        <div className="row g-0 h-100 justify-content-center">
          <div className="col col-12 col-sm-6 secondary-bg border  p-1">
            <div className="border-1">
              <h4 className="text-center pt-3 mb-5">Reach us</h4>
              <div className="container d-flex flex-column justify-content-between mb-3" style={{ minHeight: '200px' }}>
                <p className="ms-4 fs-5">
                  <strong className="me-3">
                    <i className="fa-solid fa-envelope"></i>
                  </strong>
                  xyz12@abc.com
                </p>
                <p className="ms-4 fs-5">
                  <strong className="me-3">
                    <i className="fa-solid fa-phone"></i>
                  </strong>
                  123456789
                </p>
                <p className="ms-4 fs-5">
                  <strong className="me-3">
                    <i className="fa-solid fa-location-dot"></i>
                  </strong>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <p className="ms-4 fs-5">
                  <strong className="me-3">
                    <i className="fa-solid fa-business-time"></i>
                  </strong>
                  Mon - Fri / 10am - 6pm
                </p>
              </div>
            </div>
          </div>
          <div className="col col-12 col-sm-6 d-flex flex-column border  p-1 secondary-border primary-bg">
            <div className="border-1">
              <h4 className="text-center pt-3">Send your Message</h4>
              <div className="container p-4">
                <form className="d-flex flex-column" action="">
                  <input className="form-control rounded-0 mb-3 p-2" type="text" name="name" placeholder="Full Name" />
                  <input className="form-control rounded-0 mb-3 p-2" type="email" name="email" placeholder="Email ID" />
                  <textarea className="form-control rounded-0 mb-3 p-2" name="message" placeholder="Messages"></textarea>
                  <button className="btn" type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ContactUs;
