//자산분류별 컬럼

const AssetCategories = ({ assetClassification, formData, handleChange }) => {
  const renderAdditionalFields = () => {
    switch (assetClassification) {
      case "INFORMATION_PROTECTION_SYSTEM":
        return (
          <div>
            <label>
              서비스범위
              <input
                type="text"
                name="serviceScope"
                value={formData.serviceScope}
                onChange={handleChange}
              />
            </label>
          </div>
        );

      case "APPLICATION_PROGRAM":
        return (
          <div>
            <label>
              서비스범위
              <input
                type="text"
                name="serviceScope"
                value={formData.serviceScope}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              OS
              <input
                type="text"
                name="os"
                value={formData.os}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              관련DB
              <input
                type="text"
                name="relatedDB"
                value={formData.relatedDB}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              IP
              <input
                type="text"
                name="ip"
                value={formData.ip}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              화면수
              <input
                type="number"
                value={formData.screenNumber}
                onChange={handleChange}
              />
            </label>
          </div>
        );
      case "SOFTWARE":
        return (
          <div>
            <label>
              IP
              <input
                type="text"
                name="ip"
                value={formData.ip}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              ID
              <input
                type="text"
                name="serverId"
                value={formData.serverId}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              PW
              <input
                type="text"
                name="serverPassword"
                value={formData.serverPassword}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              담당업체
              <input
                type="text"
                name="companyManager"
                value={formData.companyManager}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              OS
              <input
                type="text"
                name="os"
                value={formData.os}
                onChange={handleChange}
              />
            </label>
          </div>
        );
      case "ELECTRONIC_INFORMATION":
        return (
          <div>
            <label>
              OS
              <input type="text" />
            </label>
            <br />
            <label>
              시스템
              <input type="text" />
            </label>
            <br />
            <label>
              DB종류
              <input type="text" />
            </label>
          </div>
        );
      case "DOCUMENT":
        return (
          <div>
            <label>
              문서등급
              <select>
                <option>대외비</option>
                <option>내부용</option>
                <option>일반</option>
              </select>
            </label>
            <br />
            <label>
              문서형태
              <select>
                <option>일반문서</option>
                <option>계약 및 법적문서</option>
                <option>보고서 및 프레젠테이션</option>
                <option>양식 및 서식</option>
              </select>
            </label>
            <br />
            <label>
              문서링크
              <input type="text" />
            </label>
          </div>
        );
      case "PATENTS_AND_TRADEMARKS":
        return (
          <div>
            <label>
              출원일자
              <input type="date" />
            </label>
            <br />
            <label>
              등록일자
              <input type="date" />
            </label>
            <br />
            <label>
              만료일자
              <input type="date" />
            </label>
            <br />
            <label>
              특허/상표 상태
              <select>
                <option>PCT 출원</option>
                <option>출원</option>
                <option>등록</option>
                <option>만료</option>
              </select>
            </label>
            <br />
            <label>
              출원국가
              <select>
                <option>한국</option>
                <option>미국</option>
                <option>일본</option>
                <option>중국</option>
                <option>독일</option>
              </select>
            </label>
            <br />
            <label>
              특허분류
              <select>
                <option>신소재</option>
                <option>인큐베이션</option>
              </select>
            </label>
            <br />
            <label>
              특허세목
              <select>
                <option>복합재</option>
                <option>신소재</option>
              </select>
            </label>
            <br />
            <label>
              출원번호
              <input type="text" />
            </label>
            <br />
            <label>
              발명자
              <input type="text" />
            </label>
            <br />
            <label>
              권리권자
              <input type="text" />
            </label>
            <br />
            <label>
              관련문서
              <input type="text" />
            </label>
          </div>
        );
      case "ITSYSTEM_EQUIPMENT":
        return (
          <div>
            <label>
              장비유형
              <input type="text" />
            </label>
            <br />
            <label>
              랙유닛
              <input type="number" />
            </label>
            <br />
            <label>
              전원공급장치
              <input type="text" />
            </label>
            <br />
            <label>
              쿨링시스템
              <input type="text" />
            </label>
            <br />
            <label>
              인터페이스 포트
              <input type="text" />
            </label>
            <br />
            <label>
              폼팩터
              <input type="text" />
            </label>
            <br />
            <label>
              확장슬롯수
              <input type="number" />
            </label>
            <br />
            <label>
              그래픽카드
              <input type="text" />
            </label>
            <br />
            <label>
              포트 구성
              <input type="text" />
            </label>
            <br />
            <label>
              모니터 포함여부
              <br />
              <label>
                <input value="포함" type="radio" />
                포함
              </label>
              <br />
              <label>
                <input value="미포함" type="radio" />
                미포함
              </label>
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div>{renderAdditionalFields()}</div>
    </>
  );
};
export default AssetCategories;
