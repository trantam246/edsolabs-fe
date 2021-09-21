import React from "react";
import DatePickers from "./DatePickers";
import { Dropdown } from 'react-bootstrap';

function Dashbord() {
  return (
    <>
      <div className="m-4">
        <DatePickers />
      </div>
      <div className="dash ms-4 mt-4">
        <p>Today</p>
       <ul className="list-group col-12 ">
       <li className="list-group-item d-flex justify-content-between">
         <div className="col-4">This is a first task</div>
         <div className="d-flex col-8 justify-content-between">
           <div className="col-4 meet">
             <i className="fas fa-tags me-3"></i>
             <p>online,Meeting</p>
           </div>
           <div className="col-4 meet">
             <p>07:15 - 08:15</p>
           </div>
           <p>60 mins</p>
       
          <Dropdown> 
              <Dropdown.Toggle className="dropw"variant="Secondary" >
              <i className="fa fa-plus"/>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/start">start</Dropdown.Item>
                <Dropdown.Item href="#/Deletel">Deletel</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
         </div>
       </li>
       <li className="list-group-item d-flex justify-content-between">
         <div className="col-4">coding</div>
         <div className="d-flex col-8 justify-content-between">
           <div className="col-4 meet">
             <i className="fas fa-tags me-3"></i>
             <p>online,Meeting</p>
           </div>
           <div className="col-4 meet">
             <p>07:15 - 08:15</p>
           </div>
           <p>60 mins</p>
           <Dropdown> 
              <Dropdown.Toggle className="dropw"variant="Secondary" >
              <i className="fa fa-plus"/>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/start">start</Dropdown.Item>
                <Dropdown.Item href="#/Deletel">Deletel</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

         </div>
       </li>
     </ul>
    </div>
    <div className="dash ms-4 mt-4">
        <p>12/09/2021</p>
       <ul className="list-group col-12 ">
       <li className="list-group-item d-flex justify-content-between">
         <div className="col-4">This is a first task</div>
         <div className="d-flex col-8 justify-content-between">
           <div className="col-4 meet">
             <i className="fas fa-tags me-3"></i>
             <p>online,Meeting</p>
           </div>
           <div className="col-4 meet">
             <p>07:15 - 08:15</p>
           </div>
           <p>60 mins</p>
           <Dropdown> 
              <Dropdown.Toggle className="dropw"variant="Secondary" >
              <i className="fa fa-plus"/>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/start">start</Dropdown.Item>
                <Dropdown.Item href="#/Deletel">Deletel</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

         </div>
       </li>
       <li className="list-group-item d-flex justify-content-between">
         <div className="col-4">coding</div>
         <div className="d-flex col-8 justify-content-between">
           <div className="col-4 meet">
             <i className="fas fa-tags me-3"></i>
             <p>online,Meeting</p>
           </div>
           <div className="col-4 meet">
             <p>07:15 - 08:15</p>
           </div>
           <p>60 mins</p>
           <Dropdown> 
              <Dropdown.Toggle className="dropw"variant="Secondary" >
              <i className="fa fa-plus"/>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/start">start</Dropdown.Item>
                <Dropdown.Item href="#/Deletel">Deletel</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

         </div>
       </li>
     </ul>
    </div>
    </>
  );
}

export default Dashbord;
