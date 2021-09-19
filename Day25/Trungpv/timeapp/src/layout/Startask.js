import Dashbord from "./Dashbord";
import { Dropdown } from 'react-bootstrap';

function Startask() {
  return (
    <>
      <header className="seach_main border-bottom border-dark">
        <div className="seach d-flex justify-content-between">
          <div className="seach__left col-6">
            <h4>
              <input
                className="seach__Name border-0"
                type="text"
                placeholder="This is My task"
              />
            </h4>
          </div>
          <div className="seach__right col-6 d-flex justify-content-end align-items-center">
            <div className="mx-2">
            <Dropdown> 
              <Dropdown.Toggle className="dropw"variant="Secondary" >
              <i
                className="fas fa-tags"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="dropdown-basic"
              >
              </i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/Online">Online</Dropdown.Item>
                <Dropdown.Item href="#/Meeting">Meeting</Dropdown.Item>
                <Dropdown.Item href="#/Tranning">Tranning</Dropdown.Item>
                <Dropdown.Item href="#/Relax">Relax</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
             
            </div>
            <div>
                <span>
                00:00:00
                </span>
            </div>
            <div className="mx-2">
                <button>
                  <i type="button" className="fas fa-play-circle fa-2x"></i>
                </button>
            </div>
          </div>
        </div>
      </header>
      <section>
          <Dashbord  />
      </section>
    </>
  );
}

export default Startask;