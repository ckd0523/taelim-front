// CellContent.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

export const CellContent = ({ key, formData, isEditing, handleInputChange }) => {
	// 수정모드 설정
	if (isEditing) {
		// department select 설정
		if (key === 'department') {
			return (
				<Form.Select
					value={formData[key] || ''}
					onChange={(e) => handleInputChange(e, key)}
					style={{ textAlign: 'center' }}
				>
					<option value="IT부">IT부</option>
					<option value="관리부">관리부</option>
					<option value="영업부">영업부</option>
					<option value="마케팅부">마케팅부</option>
					<option value="생산부">생산부</option>
					<option value="운영부">운영부</option>
					<option value="인사부">인사부</option>
				</Form.Select>
			);
		}
		// assetLocation select 설정
		if (key === 'assetLocation') {
			return (
				<Form.Select
					value={formData[key] || ''}
					onChange={(e) => handleInputChange(e, key)}
					style={{ textAlign: 'center' }}
				>
					<option value="본관 지하 문서고">본관 지하 문서고</option>
					<option value="본관 1층">본관 1층</option>
					<option value="본관 1층 접견실">본관 1층 접견실</option>
					<option value="본관 2층">본관 2층</option>
					<option value="본관 2층 사장실">본관 2층 사장실</option>
					<option value="본관 2층 기술연구소 사무실">본관 2층 기술연구소 사무실</option>
					<option value="본관 2층 대회의실">본관 2층 대회의실</option>
					<option value="본관 2층 대표이사실">본관 2층 대표 이사실</option>
					<option value="본관 3층 창고">본관 3층 창고</option>
					<option value="MDCG 천장">MDCG</option>
					<option value="공장동">공장동</option>
				</Form.Select>
			);
		}
		// owenership select 설정
		if (key === 'ownership') {
			return (
				<Form.Select
					value={formData[key] || ''}
					onChange={(e) => handleInputChange(e, key)}
					style={{ textAlign: 'center' }}
				>
					<option value="소유">소유</option>
					<option value="임대">임대</option>
				</Form.Select>
			);
		}
		// useState select 설정
		if (key === 'usestate') {
			return (
				<Form.Select
					value={formData[key] || ''}
					onChange={(e) => handleInputChange(e, key)}
					style={{ textAlign: 'center' }}
				>
					<option value="신규">신규</option>
					<option value="사용중">사용중</option>
					<option value="유지 관리 중 or 보수 작업 중">유지관리 중</option>
					<option value="예비">예비</option>
					<option value="퇴직/폐기">퇴직/폐기</option>
				</Form.Select>
			);
		}
		// operationStatus select 설정
		if (key === 'operationStatus') {
			return (
				<Form.Select
					value={formData[key] || ''}
					onChange={(e) => handleInputChange(e, key)}
					style={{ textAlign: 'center' }}
				>
					<option value="가동중">가동중</option>
					<option value="미가동">미가동</option>
					<option value="고장">고장</option>
				</Form.Select>
			);
		}
		// operationStatus select 설정
		if (key === 'depreciationMethod') {
			return (
				<Form.Select
					value={formData[key] || ''}
					onChange={(e) => handleInputChange(e, key)}
					style={{ textAlign: 'center' }}
				>
					<option value="정률법">정률법</option>
					<option value="정액법">정액법</option>
				</Form.Select>
			);
		}

		// 날짜 입력을 위한 date 타입 사용
		if (
			[
				'introducedDate',
				'maintenancePeriod',
				'purchaseDate',
				'applicationDate',
				'registrationDate',
				'expirationDate',
			].includes(key)
		) {
			return (
				<Form.Control
					type="date"
					value={formData[key] || ''}
					onChange={(e) => handleInputChange(e, key)}
					style={{ textAlign: 'center' }}
				/>
			);
		}

		// 숫자 입력을 위한 number 타입 사용
		if (['confidentiality', 'integrity', 'availability'].includes(key)) {
			return (
				<input
					type="number"
					min="1"
					max="3"
					value={formData[key] || ''}
					onChange={(e) => handleInputChange(e, key)}
					style={{ textAlign: 'center' }}
				/>
			);
		}
		// patentTrademarkStatus select 설정
		if (key === 'patentTrademarkStatus') {
			return (
				<Form.Select
					value={formData[key] || ''}
					onChange={(e) => handleInputChange(e, key)}
					style={{ textAlign: 'center' }}
				>
					<option value="PCT_APPLICATION">PCT 출원</option>
					<option value="APPLICATION">출원</option>
					<option value="REGISTERED">등록</option>
					<option value="EXPIRED">만료</option>
				</Form.Select>
			);
		}
		// patentTrademarkStatus select 설정
		if (key === 'countryApplication') {
			return (
				<Form.Select
					value={formData[key] || ''}
					onChange={(e) => handleInputChange(e, key)}
					style={{ textAlign: 'center' }}
				>
					<option value="한국">한국</option>
					<option value="미국">미국</option>
					<option value="일본">일본</option>
					<option value="중국">중국</option>
					<option value="독일">독일</option>
				</Form.Select>
			);
		}
		// patentTrademarkStatus select 설정
		if (key === 'patentClassification') {
			return (
				<Form.Select
					value={formData[key] || ''}
					onChange={(e) => handleInputChange(e, key)}
					style={{ textAlign: 'center' }}
				>
					<option value="NEW_MATERIALS">신소재</option>
					<option value="INCUBATION">인큐베이션</option>
				</Form.Select>
			);
		}
		// patentTrademarkStatus select 설정
		if (key === 'patentItem') {
			return (
				<Form.Select
					value={formData[key] || ''}
					onChange={(e) => handleInputChange(e, key)}
					style={{ textAlign: 'center' }}
				>
					<option value="COMPOSITE_MATERIALS">복합재</option>
					<option value="CORPORATE_VENTURE">사내벤처</option>
				</Form.Select>
			);
		}

		// 기본 텍스트 입력
		return (
			<Form.Control
				type="text"
				value={formData[key] || ''}
				onChange={(e) => handleInputChange(e, key)}
				style={{ textAlign: 'center' }}
			/>
		);
	}

	// 수정 모드가 아닐 때 일반 텍스트 렌더링
	return formData[key] || 'N/A';
};

export default CellContent;
