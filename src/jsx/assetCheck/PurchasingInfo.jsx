//재무 및 구매정보 컬럼

const PurchasingInfo = ({ formData, handleChange }) => {
  return (
    <div>
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
    </div>
  );
};

export default PurchasingInfo;
