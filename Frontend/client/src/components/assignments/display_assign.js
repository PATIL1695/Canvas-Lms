import React, { Component } from "react";
import { Document, Page } from "react-pdf";
import { Jumbotron } from "react-bootstrap";
import Navigate from "../navbar/navigate";

class Display_assign extends Component {
  state = { numPages: null, pageNumber: 1 };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div style={{paddingLeft: '300px'}} >
          <Navigate/>
          <Jumbotron style={{paddingLeft: '100px'}}>
        <nav>
            <h1>View Assignment</h1>
          
        </nav>
        </Jumbotron>
<Jumbotron style={{paddingLeft: '100px'}}>
        <div style={{ width: 1000 }}>
        <button className="btn btn-success" onClick={this.goToPrevPage}>Prev</button>
          &nbsp;
          &nbsp;
          <button className="btn btn-success" onClick={this.goToNextPage}>Next</button>
        <p>
          Page {pageNumber} of {numPages}
        </p>

          <Document style={{ width: 1000}} 
            file={this.props.location.state.Url}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>

        
        </Jumbotron>
        
      </div>
    );
  }
}

export default Display_assign