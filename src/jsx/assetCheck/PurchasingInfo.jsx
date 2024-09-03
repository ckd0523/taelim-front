//재무 및 구매정보 컬럼
import { Accordion, Card } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap";
import "./ButtonStyle.css";
function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom")
  );
  return (
    <button
      className="custom-button"
      type="button"
      style={{ backgroundColor: "white" }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}
const PurchasingInfo = ({ formData, handleChange }) => {
  return (
    <div>
      <Accordion defaultActiveKey="1">
        <Card>
          <Card.Header>
            <CustomToggle eventKey="1">재무 및 구매정보</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <label>
                구매비용
                <input
                  type="number"
                  name="purchaseCost"
                  value={formData.purchaseCost}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                구매날짜
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                내용연수
                <input
                  type="number"
                  name="usefulLife"
                  value={formData.usefulLife}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                감가상각방법
                <select
                  name="depreciationMethod"
                  value={formData.depreciationMethod}
                  onChange={handleChange}
                >
                  <option value="FIXED_AMOUNT">정액법</option>
                  <option value="FIXED_RATE">정률법</option>
                </select>
              </label>
              <br />
              <label>
                구입처
                <input
                  type="text"
                  name="purchaseSource"
                  value={formData.purchaseSource}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                구입처연락처
                <input
                  type="text"
                  name="contactInformation"
                  value={formData.contactInformation}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                취득경로
                <input
                  type="text"
                  name="acquisitionRoute"
                  value={formData.acquisitionRoute}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                유지기간
                <input
                  type="date"
                  name="maintenancePeriod"
                  value={formData.maintenancePeriod}
                  onChange={handleChange}
                />
              </label>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default PurchasingInfo;
