import "bootstrap/dist/css/bootstrap.min.css";
import "./bookingDetails.css";
import backgroundImage from "../../images/pk2.jpeg";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
function BookingDetails() {
  const areaName = localStorage.getItem("areaName");
  const areaId = localStorage.getItem("areaId");
  const zoneName = localStorage.getItem("zoneName");
  const zoneId = localStorage.getItem("zoneId");
  const slotName = localStorage.getItem("slotName");
  const slotId = localStorage.getItem("slotId");
  const userId = localStorage.getItem("userId");
  const carId = localStorage.getItem("carNo");
  const fromDate1 = localStorage.getItem("parkingFromDate");
  const fromTime1 = localStorage.getItem("parkingFromTime");
  const toDate1 = localStorage.getItem("parkingToDate");
  const toTime1 = localStorage.getItem("parkingToTime");
  const rate = localStorage.getItem("areaRate");

  const fromDate = new Date(`${fromDate1}T${fromTime1}`);
  const toDate = new Date(`${toDate1}T${toTime1}`);
  const timeDiffInMs = toDate.getTime() - fromDate.getTime();
  const timeDiffInHours = timeDiffInMs / 3600000;

  const totalAmt = timeDiffInHours * rate;
  const token = localStorage.getItem("token");

  var onButtonClick = () => {
    localStorage.setItem("totalAmt", totalAmt);
    const data = {
      fromDate,
      toDate,
      totalAmt,
      areaId,
      zoneId,
      slotId,
      userId,
      carId,
    };
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .post("http://localhost:9090/user/bookparking", data, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="style">
        <table className="table-bordered">
          <tbody>
            <tr>
              <td>Area Name</td>
              <td>{areaName}</td>
            </tr>
            <tr>
              <td>Zone Name</td>
              <td>{zoneName}</td>
            </tr>
            <tr>
              <td>Slot Name</td>
              <td>{slotName}</td>
            </tr>
            <tr>
              <td>Duration (in hours)</td>
              <td>{timeDiffInHours}</td>
            </tr>
            <tr>
              <td>Rate</td>
              <td>{rate}</td>
            </tr>
            <tr>
              <td>Car Number</td>
              <td>{carId}</td>
            </tr>
            <tr>
              <td>Total Amount</td>
              <td>{totalAmt}</td>
            </tr>
          </tbody>
        </table>
        <div className="text-center mt-3">
          <Link to="/parkingreceipt">
            <Button
              onClick={onButtonClick}
              className='btn btn-dark "me-2"'
              style={{ height: 50, width: 150 }}
              variant="primary"
            >
              Confirm Payment
            </Button>
          </Link>
          {/* <button className="btn btn-primary" onClick={onButtonClick}>
          Confirm Payment
        </button> */}
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
