import { useEffect, useState } from "react";
import axios from "axios";
const AssetRegister = () => {
  const [assetCategories, setAssetCategories] = useState("");
  const handelChangeCategories = (e) => {
    setAssetCategories(e.target.value);
    console.log(e.target.value);
  };
  // 자산분류에 따라 추가적인 컬럼을 렌더링하는 함수
  const renderAdditionalFields = () => {
    switch (assetCategories) {
      case "정보보호시스템":
        return (
          <div>
            <label>
              서비스범위
              <input type="text" name="serviceScope" />
            </label>
          </div>
        );
      case "응용프로그램":
        return (
          <div>
            <label>
              서비스범위
              <input type="text" name="serviceScope" />
            </label>
            <br />
            <label>
              OS
              <input type="text" name="os" />
            </label>
            <br />
            <label>
              관련DB
              <input type="text" />
            </label>
            <br />
            <label>
              IP
              <input type="text" />
            </label>
            <br />
            <label>
              화면수
              <input type="number" />
            </label>
          </div>
        );
        break;
      case "소프트웨어":
        return (
          <div>
            <label>
              IP
              <input type="text" />
            </label>
            <br />
            <label>
              ID
              <input type="text" />
            </label>
            <br />
            <label>
              PW
              <input type="text" />
            </label>
            <br />
            <label>
              담당업체
              <input type="text" />
            </label>
            <br />
            <label>
              OS
              <input type="text" />
            </label>
          </div>
        );
        break;
      case "전자정보":
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
        break;
      case "문서":
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
        break;
      case "특허 및 상표":
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
      default:
        return null;
    }
  };
  //   useEffect(() => {
  //     fetch("http://localhost:8080/api/asset/register")
  //       .then((response) => response.json())
  //       // .then(data =>)
  //       .catch((err) => console.error(err));
  //   }, []);
  return (
    <form method="post" action="/asset/register">
      <div>
        <h2>기본 자산 정보 및 관리 정보</h2>
        <label>
          자산분류
          <select
            onChange={handelChangeCategories}
            value={assetCategories}
            name="assetCategories"
          >
            <option></option>
            <option value="정보보호시스템">정보보호시스템</option>
            <option value="응용프로그램">응용프로그램</option>
            <option value="소프트웨어">소프트웨어</option>
            <option value="전자정보">전자정보</option>
            <option value="문서">문서</option>
            <option value="특허 및 상표">특허 및 상표</option>
            <option value="IT장비-시스템">IT장비-시스템</option>
            <option value="IT장비-네트워크">IT장비-네트워크</option>
            <option value="단말기">단말기</option>
            <option value="가구">가구</option>
            <option value="기기">기기</option>
            <option value="차량">차량</option>
            <option value="기타">기타</option>
          </select>
        </label>
        <br />
        <label>
          자산명
          <input type="text" name="assetName" />
        </label>
        <br />
        <label>
          자산기준
          <select name="assetBasis">
            <option>일반</option>
            <option>TISAX</option>
          </select>
        </label>
        <br />
        <label>
          제조사
          <input type="text" />
        </label>
        <br />
        <label>
          목적
          <input type="text" />
        </label>
        <br />
        <label>
          부서
          <select name="department">
            <option>IT부</option>
            <option>관리부</option>
            <option>영업부</option>
            <option>마케팅부</option>
            <option>생산부</option>
            <option>운영부</option>
            <option>인사부</option>
          </select>
        </label>
        <br />
        <label>
          위치
          <select>
            <option>본관 지하 문서고</option>
            <option>본관 1층</option>
            <option>본관 1층 접견실</option>
            <option>본관 2층</option>
            <option>본관 2층 사장실</option>
            <option>본관 2층 기술연구소 사무실</option>
            <option>본관 2층 대회의실</option>
            <option>본관 2층 대표이사실</option>
            <option>본관 3층 창고</option>
            <option>MDCG</option>
            <option>공장동</option>
          </select>
        </label>
        <br />
        <label>
          사용자
          <input type="text" />
        </label>
        <br />
        <label>
          소유자
          <input type="text" />
        </label>
        <br />
        <label>
          보안담당자
          <input type="text" />
        </label>
        <br />
        <label>
          수량
          <input type="number" />
        </label>
        <br />
        <label>
          소유권
          <input type="text" />
        </label>
        <br />
        <label>
          사용상태
          <select>
            <option>신규</option>
            <option>사용중</option>
            <option>유지관리 중</option>
            <option>예비</option>
            <option>퇴직/폐기</option>
          </select>
        </label>
        <br />
        <label>
          가동여부
          <select>
            <option>가동중</option>
            <option>미가동</option>
            <option>고장</option>
          </select>
        </label>
        <br />
        <label>
          도입일자
          <input type="date" />
        </label>
        <br />
        <label>
          기밀성
          <input type="number" />
        </label>
        <br />
        <label>
          무결성
          <input type="number" />
        </label>
        <br />
        <label>
          가용성
          <input type="number" />
        </label>
        <br />
        <label>
          비고
          <textarea />
        </label>
      </div>
      <div>
        <h2>재무 및 구매정보</h2>
        <label>
          구매비용
          <input type="number" />
        </label>
        <br />
        <label>
          구매날짜
          <input type="date" />
        </label>
        <br />
        <label>
          내용연수
          <input type="number" />
        </label>
        <br />
        <label>
          감가상각방법
          <select>
            <option>정액법</option>
            <option>정률법</option>
          </select>
        </label>
        <br />
        <label>
          구입처
          <input type="text" />
        </label>
        <br />
        <label>
          구입처연락처
          <input type="text" />
        </label>
        <br />
        <label>
          취득경로
          <input type="text" />
        </label>
        <br />
        <label>
          유지기간
          <input type="number" />
        </label>
      </div>
      <div>
        <h2>자산분류별 컬럼</h2>
        {renderAdditionalFields()}
      </div>
    </form>
  );
};

export default AssetRegister;
