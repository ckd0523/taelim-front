import React, { useState, useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap';
import { FileUploader } from '@/components/FileUploader';
import { BsCaretUpFill } from 'react-icons/bs';
import { BsCaretDownFill } from 'react-icons/bs';
import './Media.css';
function CustomToggle({ children, eventKey }) {
	const [isOpen, setIsOpen] = useState(false);
	const decoratedOnClick = useAccordionButton(eventKey, () => setIsOpen((prevOpen) => !prevOpen));
	return (
		<button
			className="custom-button px-3 pt-2"
			type="button"
			style={{ backgroundColor: 'white', textAlign: 'left' }}
			onClick={decoratedOnClick}
		>
			{isOpen ? (
				<BsCaretUpFill style={{ paddingRight: '10' }} size="30" color="#2222226b" />
			) : (
				<BsCaretDownFill style={{ paddingRight: '10' }} size="30" color="#2222226b" />
			)}
			{children}
		</button>
	);
}
const FileUpload = ({ files = [], setFiles }) => {
	// const handleFileUpload = useCallback(
	//    (acceptedFiles) => {
	//       setFiles(acceptedFiles);

	//       acceptedFiles.forEach((file) =>
	//          Object.assign(file, {
	//             preview: URL.createObjectURL(file),
	//          })
	//       );
	//    },
	//    [setFiles]
	// );
	const handleFileUpload = (file, fileType) => {
		const updateFiles = [...files, { file, fileType }];
		setFiles(updateFiles);
	};

	useEffect(
		() => () => {
			// 메모리 누수를 방지하기 위해 파일 URL을 정리
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files]
	);

	return (
		<Accordion defaultActiveKey="0">
			<Card className="card">
				<CustomToggle eventKey="0">첨부파일 등록</CustomToggle>
				<Accordion.Collapse eventKey="0">
					<Card.Body className="card-body">
						<p className="pt-2 mb-2 c fw-bold">이미지 등록</p>
						<FileUploader
							showPreview={true}
							onFileUpload={(file) => handleFileUpload(file, 'PHOTO')}
						/>

						<p className="pt-2 mb-2 c fw-bold">보증 세부사항</p>
						<FileUploader
							showPreview={true}
							onFileUpload={(file) => handleFileUpload(file, 'WARRANTY_DETAILS')}
						/>
						<p className="pt-2 mb-2 c fw-bold">사용자 메뉴얼 및 기술문서</p>
						<FileUploader
							showPreview={true}
							onFileUpload={(file) => handleFileUpload(file, 'USER_MANUAL')}
						/>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};

export default FileUpload;
