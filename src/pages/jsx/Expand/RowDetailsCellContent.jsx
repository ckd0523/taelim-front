// CellContent.jsx
import React from 'react';
import Select from 'react-select';
import { Form, Button, InputGroup } from 'react-bootstrap';

export const CellContent = ({
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
			const departmentOptions = [
				{ value: '경영기획실', label: '경영기획실' },
				{ value: '관리팀', label: '관리팀' },
				{ value: '영업팀', label: '영업팀' },
				{ value: '구매팀', label: '구매팀' },
				{ value: '품질팀', label: '품질팀' },
				{ value: '생산팀', label: '생산팀' },
				{ value: '기술연구소', label: '기술연구소' },
				{ value: '기타', label: '기타' },
			];

			return (
				<Select
					options={departmentOptions}
					value={departmentOptions.find((option) => option.value === value) || null}
					onChange={(selectedOption) =>
						handleInputChange({ target: { value: selectedOption.value } }, keyName)
					}
					styles={{
						control: (provided) => ({
							...provided,
							textAlign: 'center',
						}),
					}} // 스타일 추가
				/>
			);
		}
		// assetLocation select 설정
		if (keyName === 'assetLocation') {
			const assetLocationOptions = [
				{ value: '본관 지하 문서고', label: '본관 지하 문서고' },
				{ value: '본관 1층', label: '본관 1층' },
				{ value: '본관 1층 접견실', label: '본관 1층 접견실' },
				{ value: '본관 2층', label: '본관 2층' },
				{ value: '본관 2층 사장실', label: '본관 2층 사장실' },
				{ value: '본관 2층 기술연구소 사무실', label: '본관 2층 기술 연구소 사무실' },
				{ value: '본관 2층 대회의실', label: '본관 2층 대회의실' },
				{ value: '본관 2층 대표이사실', label: '본관 2층 대표 이사실' },
				{ value: '본관 3층 창고', label: '본관 3층 창고' },
				{ value: 'MDCG 천장', label: 'MDCG 천장' },
				{ value: '공장동', label: '공장동' },
			];

			return (
				<Select
					options={assetLocationOptions}
					value={assetLocationOptions.find((option) => option.value === value) || null}
					onChange={(selectedOption) =>
						handleInputChange({ target: { value: selectedOption.value } }, keyName)
					}
					styles={{
						control: (provided) => ({
							...provided,
							textAlign: 'center',
						}),
					}} // 스타일 추가
				/>
			);
		}
		// ownership select 설정
		if (keyName === 'ownership') {
			const ownershipOptions = [
				{ value: '소유', label: '소유' },
				{ value: '국책과제', label: '국책과제' },
				{ value: '기타', label: '기타' },
			];

			return (
				<Select
					options={ownershipOptions}
					value={ownershipOptions.find((option) => option.value === value) || null}
					onChange={(selectedOption) =>
						handleInputChange({ target: { value: selectedOption.value } }, keyName)
					}
					styles={{ control: (provided) => ({ ...provided, textAlign: 'center' }) }}
				/>
			);
		}
		// useState select 설정
		if (keyName === 'useStated') {
			const useStateOptions = [
				{ value: '신규', label: '신규' },
				{ value: '사용중', label: '사용중' },
				{ value: '유지 관리 중 or 보수 작업 중', label: '유지 관리 중' },
				{ value: '예비', label: '예비' },
				{ value: '퇴직/폐기', label: '퇴직/폐기' },
			];

			return (
				<Select
					options={useStateOptions}
					value={useStateOptions.find((option) => option.value === value) || null}
					onChange={(selectedOption) =>
						handleInputChange({ target: { value: selectedOption.value } }, keyName)
					}
					styles={{ control: (provided) => ({ ...provided, textAlign: 'center' }) }}
				/>
			);
		}
		// operationStatus select 설정
		if (keyName === 'operationStatus') {
			const operationStatusOptions = [
				{ value: '가동중', label: '가동중' },
				{ value: '미가동', label: '미가동' },
				{ value: '고장', label: '고장' },
			];

			return (
				<Select
					options={operationStatusOptions}
					value={operationStatusOptions.find((option) => option.value === value) || null}
					onChange={(selectedOption) =>
						handleInputChange({ target: { value: selectedOption.value } }, keyName)
					}
					styles={{ control: (provided) => ({ ...provided, textAlign: 'center' }) }}
				/>
			);
		}
		// depreciationMethod select 설정
		if (keyName === 'depreciationMethod') {
			const depreciationOptions = [
				{ value: '정률법', label: '정률법' },
				{ value: '정액법', label: '정액법' },
			];

			return (
				<Select
					options={depreciationOptions}
					value={depreciationOptions.find((option) => option.value === value) || null}
					onChange={(selectedOption) =>
						handleInputChange({ target: { value: selectedOption.value } }, keyName)
					}
					styles={{ control: (provided) => ({ ...provided, textAlign: 'center' }) }} // 스타일 추가
				/>
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

		if (
			[
				'screenNumber',
				'usefulLife',
				'purchaseCost',
				'rackUnit',
				'expansionSlots',
				'numberOfPorts',
				'networkSpeed',
				'displacement',
				'doorsCount',
				'modelYear',
			].includes(keyName)
		) {
			return (
				<input
					type="number"
					defaultValue={value || ''} // formData에서 값을 가져옵니다.
					onChange={(e) => handleInputChange(e, keyName)}
					style={{ textAlign: 'center' }}
				/>
			);
		}
		if (['quantity'].includes(keyName)) {
			return (
				<input
					type="number"
					defaultValue={value || ''} // formData에서 값을 가져옵니다.
					onChange={(e) => handleInputChange(e, keyName)}
					style={{
						textAlign: 'center',
						width: '60px', // 원하는 너비 설정
					}}
				/>
			);
		}
		// documentGrade select 설정
		if (keyName === 'documentGrade') {
			const documentGradeOptions = [
				{ value: '대외비', label: '대외비' },
				{ value: '내부용', label: '내부용' },
				{ value: '일반', label: '일반' },
			];

			return (
				<Select
					options={documentGradeOptions}
					value={documentGradeOptions.find((option) => option.value === value) || null}
					onChange={(selectedOption) =>
						handleInputChange({ target: { value: selectedOption.value } }, keyName)
					}
					styles={{ control: (provided) => ({ ...provided, textAlign: 'center' }) }} // 스타일 설정
				/>
			);
		}
		// documentType select 설정
		if (keyName === 'documentType') {
			const documentTypeOptions = [
				{ value: '일반문서', label: '일반문서' },
				{ value: '계약 및 법적문서', label: '계약 및 법적문서' },
				{ value: '보고서 및 프레젠테이션', label: '보고서 및 프레젠테이션' },
				{ value: '양식 및 서식', label: '양식 및 서식' },
			];

			return (
				<Select
					options={documentTypeOptions}
					value={documentTypeOptions.find((option) => option.value === value) || null}
					onChange={(selectedOption) =>
						handleInputChange({ target: { value: selectedOption.value } }, keyName)
					}
					styles={{ control: (provided) => ({ ...provided, textAlign: 'center' }) }} // 스타일 설정
				/>
			);
		}
		// it장비시스템 monitor included
		// monitorIncluded select 설정
		if (keyName === 'monitorIncluded') {
			const monitorIncludedOptions = [
				{ value: true, label: '포함' },
				{ value: false, label: '미포함' },
			];

			// value가 boolean 타입인지 확인하고, 문자열인 경우 boolean으로 변환
			const normalizedValue = value === 'true' ? true : value === 'false' ? false : value;

			return (
				<Select
					options={monitorIncludedOptions}
					value={
						monitorIncludedOptions.find(
							(option) => option.value === normalizedValue // 올바르게 boolean으로 비교
						) || null
					}
					onChange={(selectedOption) => {
						console.log('Selected option:', selectedOption.value); // 디버깅용
						handleInputChange(
							{ target: { value: selectedOption.value } }, // 'true' 또는 'false' 값 그대로 전달
							keyName
						);
					}}
					styles={{ control: (provided) => ({ ...provided, textAlign: 'center' }) }} // 스타일 설정
				/>
			);
		}
		if (keyName === 'securityControl') {
			const securityControlOptions = [
				{ value: '관제중', label: '관제중' },
				{ value: '이상감지', label: '이상감지' },
				{ value: '관제완료', label: '관제완료' },
				{ value: '', label: '' },
			];

			return (
				<Select
					options={securityControlOptions}
					value={securityControlOptions.find((option) => option.value === value) || null}
					onChange={(selectedOption) =>
						handleInputChange({ target: { value: selectedOption.value } }, keyName)
					}
					styles={{ control: (provided) => ({ ...provided, textAlign: 'center' }) }}
				/>
			);
		}

		// 특허 칼럼 설정해주기
		// patentTrademarkStatus select 설정
		if (keyName === 'patentTrademarkStatus') {
			const patentTrademarkStatusOptions = [
				{ value: 'PCT 출원', label: 'PCT 출원' },
				{ value: '출원', label: '출원' },
				{ value: '등록', label: '등록' },
				{ value: '만료', label: '만료' },
				{ value: 'N/A', label: 'N/A' },
			];

			return (
				<Select
					options={patentTrademarkStatusOptions}
					value={
						patentTrademarkStatusOptions.find((option) => option.value === value) ||
						null
					}
					onChange={(selectedOption) =>
						handleInputChange({ target: { value: selectedOption.value } }, keyName)
					}
					styles={{ control: (provided) => ({ ...provided, textAlign: 'center' }) }}
				/>
			);
		}

		// countryApplication select 설정
		if (keyName === 'countryApplication') {
			const countryOptions = [
				{ value: '한국', label: '한국' },
				{ value: '미국', label: '미국' },
				{ value: '일본', label: '일본' },
				{ value: '중국', label: '중국' },
				{ value: '독일', label: '독일' },
			];

			return (
				<Select
					options={countryOptions}
					value={countryOptions.find((option) => option.value === value) || null}
					onChange={(selectedOption) =>
						handleInputChange({ target: { value: selectedOption.value } }, keyName)
					}
					styles={{ control: (provided) => ({ ...provided, textAlign: 'center' }) }} // 스타일 추가
				/>
			);
		}
		// patentClassification select 설정
		if (keyName === 'patentClassification') {
			const patentClassificationOptions = [
				{ value: '신소재', label: '신소재' },
				{ value: '인큐베이션', label: '인큐베이션' },
			];

			return (
				<Select
					options={patentClassificationOptions}
					value={
						patentClassificationOptions.find((option) => option.value === value) || null
					}
					onChange={(selectedOption) =>
						handleInputChange({ target: { value: selectedOption.value } }, keyName)
					}
					styles={{ control: (provided) => ({ ...provided, textAlign: 'center' }) }}
				/>
			);
		}
		// patentItem select 설정
		if (keyName === 'patentItem') {
			const patentItemOptions = [
				{ value: '복합재', label: '복합재' },
				{ value: '사내벤처', label: '사내벤처' },
			];

			return (
				<Select
					options={patentItemOptions}
					value={patentItemOptions.find((option) => option.value === value) || null}
					onChange={(selectedOption) =>
						handleInputChange({ target: { value: selectedOption.value } }, keyName)
					}
					styles={{ control: (provided) => ({ ...provided, textAlign: 'center' }) }}
				/>
			);
		}
		// engineType select 설정
		if (keyName === 'engineType') {
			const engineTypeOptions = [
				{ value: '가솔린', label: '가솔린' },
				{ value: '디젤', label: '디젤' },
				{ value: '하이브리드', label: '하이브리드' },
				{ value: '전기', label: '전기' },
			];

			return (
				<Select
					options={engineTypeOptions}
					value={engineTypeOptions.find((option) => option.value === value) || null}
					onChange={(selectedOption) =>
						handleInputChange({ target: { value: selectedOption.value } }, keyName)
					}
					styles={{ control: (provided) => ({ ...provided, textAlign: 'center' }) }} // 스타일 설정
				/>
			);
		}

		// carType select 설정
		if (keyName === 'carType') {
			const carTypeOptions = [
				{ value: '승용차', label: '승용차' },
				{ value: 'SUV', label: 'SUV' },
				{ value: '트럭', label: '트럭' },
				{ value: '밴', label: '밴' },
				{ value: 'N/A', label: 'N/A' },
			];

			return (
				<Select
					options={carTypeOptions}
					value={carTypeOptions.find((option) => option.value === value) || null}
					onChange={(selectedOption) =>
						handleInputChange({ target: { value: selectedOption.value } }, keyName)
					}
					styles={{ control: (provided) => ({ ...provided, textAlign: 'center' }) }} // 스타일 추가
				/>
			);
		}

		// 사용자 필드에 대해 수정모드인 경우 별도로 렌더링
		if (keyName === 'assetUser') {
			return (
				<Form.Group
					className="mb-3"
					style={{ display: 'flex', justifyContent: 'center', height: '20px' }}
				>
					<InputGroup
						style={{
							maxWidth: '150px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Form.Control
							type="text"
							value={selectedUser ? selectedUser.fullname : value || ''} // 선택된 사용자의 fullname 또는 기존 값 사용
							disabled // 입력 필드 비활성화
							style={{ textAlign: 'center' }} // 텍스트 가운데 정렬 및 폰트 크기 조정
						/>
						<Button
							variant="secondary"
							onClick={() => setShowUserModal(true)}
							size="sm" // 작은 크기의 버튼
							style={{ padding: '0.25rem 0.5rem' }} // 버튼 크기 조정
						>
							<i className="ri-search-line font-22"></i> {/* 아이콘 추가 */}
						</Button>
					</InputGroup>
				</Form.Group>
			);
		}

		// 소유자 필드에 대해 수정모드인 경우 별도로 렌더링
		if (keyName === 'assetOwner') {
			return (
				<Form.Group
					className="mb-3"
					style={{ display: 'flex', justifyContent: 'center', height: '20px' }}
				>
					<InputGroup
						style={{
							maxWidth: '150px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Form.Control
							type="text"
							value={selectedOwner ? selectedOwner.fullname : value || ''} // 선택된 소유자의 fullname 또는 기존 값 사용
							disabled // 입력 필드 비활성화
							style={{ textAlign: 'center' }} // 텍스트 가운데 정렬
						/>
						<Button
							variant="secondary"
							onClick={() => setShowOwnerModal(true)}
							size="sm" // 작은 크기의 버튼
							style={{ padding: '0.25rem 0.5rem' }} // 버튼 크기 조정
						>
							<i className="ri-search-line font-22"></i> {/* 아이콘 추가 */}
						</Button>
					</InputGroup>
				</Form.Group>
			);
		}
		// 보안담당자 필드에 대해 수정모드인 경우 별도로 렌더링
		if (keyName === 'assetSecurityManager') {
			return (
				<Form.Group
					className="mb-3"
					style={{ display: 'flex', justifyContent: 'center', height: '20px' }}
				>
					<InputGroup
						style={{
							maxWidth: '150px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Form.Control
							type="text"
							value={
								selectedSecurityManager
									? selectedSecurityManager.fullname
									: value || ''
							} // 선택된 보안담당자의 fullname 또는 기존 값 사용
							disabled // 입력 필드 비활성화
							style={{ textAlign: 'center' }} // 텍스트 가운데 정렬
						/>
						<Button
							variant="secondary"
							onClick={() => setShowSecurityManagerModal(true)}
							size="sm" // 작은 크기의 버튼
							style={{ padding: '0.25rem 0.5rem' }} // 버튼 크기 조정
						>
							<i className="ri-search-line font-22"></i> {/* 아이콘 추가 */}
						</Button>
					</InputGroup>
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

export default CellContent;
