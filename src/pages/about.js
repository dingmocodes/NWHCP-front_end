import React from "react";
import SupportFooter from "../components/SupportFooter.js";
import { Grid } from '@mui/material'
import { Button } from "react-bootstrap";
import { StaticImage } from "gatsby-plugin-image";
import SchoolAndTrainingWrapper from "../components/schoolAndTrainingWrapper";
import PathwayWrapper from "../components/pathwayWrapper.js";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const About = () => {

  const arrowIconStyle = {
    width: "clamp(30px, 5vw, 70px)",
    height: "clamp(30px, 5vw, 70px)",
    color: "#074882"
  };

  return (
    <div>
      <div className="page-wrapper text-left">
        <h1 className="text-primary my-4">About Us</h1>
        <div style={{ display: "flex", direction: 'row', alignContent: "start", margin: "24px 0px" }}>
          <StaticImage
            src="../images/logo-image.png"
            alt="NWHCP Logo"
            width={100}
          />
          <div>
            <h2 style={{ margin: 0, color: "#435B70", paddingTop: 8}}>Northwest Health</h2><br></br>
            <h2 style={{ marginTop: "-10%", color: "#435B70", paddingTop: -10 }}>Career Path</h2>
          </div>
        </div>
        <p className="lead">
          NWHCP connects underrepresented students of all ages with healthcare “pathway” programs that lead to schools or training programs for the health professions.  Check out our map to search for and identify pathway programs that will help you to achieve your goals!
        </p>
        <br />
        <Grid container justifyContent={"space-around"}>
          <Grid item xs={4}>
          <div className="mb-4">
            <h4 style={{ color: "#435B70", paddingBottom: "8px", textAlign:"center" }}>Pathway Programs</h4>
            <p>
            Find your own “pathway” by participating in programs starting in secondary school to college and beyond. These programs are sometimes referred to as pipeline, enrichment activities, or professional development. Ultimately, pathway programs help to build a healthcare workforce that reflects our communities
            </p>
            <PathwayWrapper />
        </div>
          </Grid>
          <Grid item xs={1}>
            <Grid container alignContent="center" style={{height:"100%"}}>
              <DoubleArrowIcon style={arrowIconStyle}/>
            </Grid>
          </Grid>
          <Grid item xs={4} style={{height:"100%"}}>
              <h4 style={{ color: "#435B70", paddingBottom: "8px", textAlign:"center" }}>
                Schools and Training Programs for the Health Professions
              </h4>
              <p>
                Schools and training programs are also shown on our map. Find your end goal as as you work to create a pathway to get there!
            </p>
            <SchoolAndTrainingWrapper />
          </Grid>
        </Grid>
        <br />
         <p>
          We also encourage advisors, counselors, and program administrators to utilize this map to direct students and find ways to bridge gaps in programming
        </p>
        <Grid container justifyContent={'center'}>
          <Grid>
            <Button href="/programs" variant="primary" size="lg">
              Get Started
            </Button>
          </Grid>
        </Grid>
      </div>
      <SupportFooter />
    </div >
  );
};
export default About;
