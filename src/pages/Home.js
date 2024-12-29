import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div>
      <div className="container-fluid infoContainer" id="top">
        <h3 className="text-center heading">WELCOME TO SOAP!</h3>

        {/* About Section */}
        <div className="row infoSection">
          <h4 className="text-center sectionTitle"><em>ABOUT</em></h4>
          <div className="col-lg-6 infoContent">
            <p className="text-center text-black">
              Thank you for visiting SOAP! This website is your hub for sport scores, betting odds, and current news.
              The currently supported sports are MLB, NFL, NBA, NHL, College Football, College Basketball, Soccer, and more.
            </p>
          </div>
          <div className="col-lg-6 infoContent">
            <img className="infoImage" src="/images/homeImage.jpeg" alt="Home Info" />
          </div>
        </div>

        {/* Account Benefits Section */}
        <div className="row infoSection bg-accent">
          <h4 className="text-center sectionTitle text-white"><em>ACCOUNT BENEFITS</em></h4>
          <div className="col-lg-6 infoContent">
            <img className="infoImage" src="/images/proExample.png" alt="Pro Example" />
          </div>
          <div className="col-lg-6 infoContent">
            <p className="text-center text-white">
              Why create an account with SOAP? Creating an account gives you access to high-quality betting picks intended to give you +EV bets.
            </p>
          </div>
        </div>

        {/* Now Available Section */}
        <div className="row infoSection">
          <h4 className="text-center sectionTitle"><em>NOW AVAILABLE!</em></h4>
          <div className="col-lg-6 infoContent">
            <p className="text-center text-black">
              Now when creating a SOAP Pro account you get access to soccer betting predictions for Europe's top 5 leagues, as well as the MLS.
            </p>
          </div>
          <div className="col-lg-6 infoContent">
            <img className="infoImage" src="/images/soccerExample.png" alt="Soccer Example" />
          </div>
        </div>

        {/* New Feature Section */}
        <div className="row infoSection bg-accent">
          <h4 className="text-center sectionTitle text-white"><em>NEW FEATURE</em></h4>
          <div className="col-lg-6 infoContent">
            <img className="infoImage" src="/images/eventPreview.png" alt="Event Preview" />
          </div>
          <div className="col-lg-6 infoContent">
            <p className="text-center text-white">
              In the latest update, we've added a search by date function to load events from any date. To search, click the calendar icon, select a day, and then click the search icon to load events from that date.
            </p>
          </div>
        </div>
      </div>

      <footer className="text-center footer-style">
        <a href="#top" className="scroll-to-top-btn">
          <i className="fas fa-arrow-up"></i> To the top
        </a>
      </footer>
    </div>
  );
};

export default Home;