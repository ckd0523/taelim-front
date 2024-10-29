// CellContent.jsx
import React from 'react';
import { Form, Button } from 'react-bootstrap';

export const EditableCell = ({
	keyName,
	value,
	isEditing,
	handleInputChange,
	selectedUser,
	selectedOwner,
	selectedSecurityManager,
	setShowUserModal,
	setShowOwnerModal,
	setShowSecurityManagerModal,
}) => {
	// 수정모드 설정
	if (isEditing) {
		// department select 설정
		if (keyName === 'department') {
			return (
				<Form.Select
					value={value || ''}
					onChange={(e) => handleInputChange(e, keyName)}
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
		if (keyName === 'assetLocation') {
			return (
				<Form.Select
					value={value || ''}
					onChange={(e) => handleInputChange(e, keyName)}
					style={{ textAlign: 'center' }}
				>
					<option value="본관 지하 문서고">본관 지하 문서고</option>
					<option value="본관 1층">본관 1층</option>
					<option value="본관 1층 접견실">본관 1층 접견실</option>
					<option value="본관 2층">본관 2층</option>
					<option value="본관 2층 사장실">본관 2층 사장실</option>
					<option value="본관 2층 기술연구소 사무실">본관 2층 기술 연구소 사무실</option>
					<option value="본관 2층 대회의실">본관 2층 대회의실</option>
					<option value="본관 2층 대표이사실">본관 2층 대표 이사실</option>
					<option value="본관 3층 창고">본관 3층 창고</option>
					<option value="MDCG 천장">MDCG</option>
					<option value="공장동">공장동</option>
				</Form.Select>
			);
		}
		// owenership select 설정
		if (keyName === 'ownership') {
			return (
				<Form.Select
					value={value || ''}
					onChange={(e) => handleInputChange(e, keyName)}
					style={{ textAlign: 'center' }}
				>
					<option value="소유">소유</option>
					<option value="임대">임대</option>
				</Form.Select>
			);
		}
		// useState select 설정
		if (keyName === 'useStated') {
			return (
				<Form.Select
					value={value || ''}
					onChange={(e) => handleInputChange(e, keyName)}
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
		if (keyName === 'operationStatus') {
			return (
				<Form.Select
					value={value || ''}
					onChange={(e) => handleInputChange(e, keyName)}
					style={{ textAlign: 'center' }}
				>
					<option value="가동중">가동중</option>
					<option value="미가동">미가동</option>
					<option value="고장">고장</option>
				</Form.Select>
			);
		}
		// operationStatus select 설정
		if (keyName === 'depreciationMethod') {
			return (
				<Form.Select
					value={value || ''}
					onChange={(e) => handleInputChange(e, keyName)}
					style={{ textAlign: 'center' }}
				>
					<option value="정률법">정률법</option>
					<option value="정액법">정액법</option>
				</Form.Select>
			);
		}
		// introduceDate 날짜로 설정
		if (
			[
				'introducedDate',
				'maintenancePeriod',
				'purchaseDate',
				'applicationDate',
				'registrationDate',
				'expirationDate',
				'kaitsKeeper',
				'v3OfficeSecurity',
				'appCheckPro',
				'tgate',
			].includes(keyName)
		) {
			return (
				<Form.Control
					type="date" // 날짜 입력을 위한 date 타입 사용
					value={value || ''}
					onChange={(e) => handleInputChange(e, keyName)} // onChange 핸들러로 날짜 값 처리
					style={{ textAlign: 'center' }}
				/>
			);
		}

		if (['confidentiality', 'integrity', 'availability'].includes(keyName)) {
			return (
				<input
					type="number"
					min="1"
					max="3"
					defaultValue={value || ''} // formData에서 값을 가져옵니다.
					onChange={(e) => handleInputChange(e, keyName)}
					style={{ textAlign: 'center' }}
				/>
			);
		}

		if (keyName === 'screenNumber') {
			return (
				<input
					type="number"
					defaultValue={value || ''} // formData에서 값을 가져옵니다.
					onChange={(e) => handleInputChange(e, keyName)}
					style={{ textAlign: 'center' }}
				/>
			);
		}
		// patentTrademarkStatus select 설정
		if (keyName === 'documentGrade') {
			return (
				<Form.Select
					value={value || ''}
					onChange={(e) => handleInputChange(e, keyName)}
					style={{ textAlign: 'center' }}
				>
					<option value="대외비">대외비</option>
					<option value="내부용">내부용</option>
					<option value="일반">일반</option>
				</Form.Select>
			);
		}
		// patentTrademarkStatus select 설정
		if (keyName === 'documentType') {
			return (
				<Form.Select
					value={value || ''}
					onChange={(e) => handleInputChange(e, keyName)}
					style={{ textAlign: 'center' }}
				>
					<option value="일반문서">일반문서</option>
					<option value="계약 및 법적문서">계약 및 법적문서</option>
					<option value="보고서 및 프레젠테이션">보고서 및 프레젠테이션</option>
					<option value="양식 및 서식">양식 및 서식</option>
				</Form.Select>
			);
		}
		// 특허 칼럼 설정해주기
		// patentTrademarkStatus select 설정
		if (keyName === 'patentTrademarkStatus') {
			return (
				<Form.Select
					value={value || ''}
					onChange={(e) => handleInputChange(e, keyName)}
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
		if (keyName === 'countryApplication') {
			return (
				<Form.Select
					value={value || ''}
					onChange={(e) => handleInputChange(e, keyName)}
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
		if (keyName === 'patentClassification') {
			return (
				<Form.Select
					value={value || ''}
					onChange={(e) => handleInputChange(e, keyName)}
					style={{ textAlign: 'center' }}
				>
					<option value="NEW_MATERIALS">신소재</option>
					<option value="INCUBATION">인큐베이션</option>
				</Form.Select>
			);
		}
		// patentTrademarkStatus select 설정
		if (keyName === 'patentItem') {
			return (
				<Form.Select
					value={value || ''}
					onChange={(e) => handleInputChange(e, keyName)}
					style={{ textAlign: 'center' }}
				>
					<option value="COMPOSITE_MATERIALS">복합재</option>
					<option value="CORPORATE_VENTURE">사내벤처</option>
				</Form.Select>
			);
		}
		// terminal select 설정
		if (keyName === 'engineType') {
			return (
				<Form.Select
					value={value || ''}
					onChange={(e) => handleInputChange(e, keyName)}
					style={{ textAlign: 'center' }}
				>
					<option value="가솔린">가솔린</option>
					<option value="디젤">디젤</option>
					<option value="하이브리드">하이브리드</option>
					<option value="전기">전기</option>
				</Form.Select>
			);
		}
		// car select 설정
		if (keyName === 'carType') {
			return (
				<Form.Select
					value={value || ''}
					onChange={(e) => handleInputChange(e, keyName)}
					style={{ textAlign: 'center' }}
				>
					<option value="승용차">승용차</option>
					<option value="SUV">SUV</option>
					<option value="트럭">트럭</option>
					<option value="밴">밴</option>
				</Form.Select>
			);
		}

		// 소유자 필드에 대해 수정모드인 경우 별도로 렌더링
		if (keyName === 'assetUser') {
			return (
				<Form.Group className="mb-1">
					<Form.Control
						type="text"
						value={selectedUser ? selectedUser.fullname : value || ''} // 선택된 소유자의 fullname 또는 기존 값 사용
						disabled // 입력 필드 비활성화
						style={{ textAlign: 'center' }} // 텍스트 가운데 정렬
					/>
					<Button variant="secondary" onClick={() => setShowUserModal(true)}>
						사용자 선택
					</Button>
				</Form.Group>
			);
		}

		// 소유자 필드에 대해 수정모드인 경우 별도로 렌더링
		if (keyName === 'assetOwner') {
			return (
				<Form.Group className="mb-1">
					<Form.Control
						type="text"
						value={selectedOwner ? selectedOwner.fullname : value || ''} // 선택된 소유자의 fullname 또는 기존 값 사용
						disabled // 입력 필드 비활성화
						style={{ textAlign: 'center' }} // 텍스트 가운데 정렬
					/>
					<Button variant="secondary" onClick={() => setShowOwnerModal(true)}>
						소유자 선택
					</Button>
				</Form.Group>
			);
		}

		// 소유자 필드에 대해 수정모드인 경우 별도로 렌더링
		if (keyName === 'assetSecurityManager') {
			return (
				<Form.Group className="mb-1">
					<Form.Control
						type="text"
						value={
							selectedSecurityManager ? selectedSecurityManager.fullname : value || ''
						} // 선택된 소유자의 fullname 또는 기존 값 사용
						disabled // 입력 필드 비활성화
						style={{ textAlign: 'center' }} // 텍스트 가운데 정렬
					/>
					<Button variant="secondary" onClick={() => setShowSecurityManagerModal(true)}>
						보안담당자 선택
					</Button>
				</Form.Group>
			);
		}
		// select 외는 text input 설정
		return (
			<Form.Control
				type="text"
				value={value || ''}
				onChange={(e) => handleInputChange(e, keyName)}
				style={{ textAlign: 'center' }}
			/>
		);
	}
	// 수정 모드가 아닐 때 일반 텍스트 렌더링
	return value || 'N/A';
};

export default EditableCell;
