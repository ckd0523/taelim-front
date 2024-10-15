import React, { useState, useEffect } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap';
import { FileUploader } from '@/components/FileUploader';
import { BsCaretUpFill } from 'react-icons/bs';
import { BsCaretDownFill } from 'react-icons/bs';
import styled from 'styled-components';
const StyledCard = styled.div`
	display: flex;
	flex-direction: column;

	@media (max-width: 767px) {
		width: 100%;
		margin: 0 auto;
		display: block;
	}

	@media (min-width: 768px) and (max-width: 1023px) {
		width: 100%;
		margin: 0 auto;
		display: block;
	}

	@media (min-width: 1024px) {
		width: 100%;
		margin: 0 auto;
		display: block;
	}
`;

const StyledCardBody = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

function CustomToggle({ children, eventKey }) {
	const [isOpen, setIsOpen] = useState(false);
	const decoratedOnClick = useAccordionButton(eventKey, () => setIsOpen((prevOpen) => !prevOpen));
	return (
		<button
			className="custom-button px-3 pt-2 fw-bold"
			type="button"
			style={{ width: '100%', backgroundColor: '#727CF540', textAlign: 'left' }}
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
const FileUpload = ({ files = [], setFiles, formData, handleChange }) => {
	// const handleFileUpload = (file, fileType) => {
	// 	const updateFiles = [...files, { file, fileType }];
	// 	setFiles(updateFiles);
	// 	console.log(updateFiles);
	// };
	const handleFileUpload = (file, fileType) => {
		const updateFiles = [
			...files.filter((f) => f.fileType !== fileType),
			...file.map((f) => ({ file: f, fileType })),
		];
		setFiles(updateFiles);
		console.log(updateFiles);
	};

	useEffect(() => {
		return () => {
			files.forEach((file) => {
				if (file.file && file.file.preview) {
					URL.revokeObjectURL(file.file.preview);
				}
			});
		};
	}, [files]);

	return (
		<Accordion defaultActiveKey="">
			<StyledCard className="card">
				<CustomToggle eventKey="3">첨부파일 등록</CustomToggle>
				<Accordion.Collapse eventKey="3">
					<StyledCardBody className="card-body">
						<Form>
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
							<Form.Label className="pt-2">보증 세부사항(글)</Form.Label>
							<Form.Control
								type="textarea"
								rows={4}
								name="warrantyDetails"
								value={formData.warrantyDetails}
								onChange={handleChange}
							/>
							<p className="pt-2 mb-2 c fw-bold">사용자 메뉴얼 및 기술문서</p>
							<FileUploader
								showPreview={true}
								onFileUpload={(file) => handleFileUpload(file, 'USER_MANUAL')}
							/>
							<Form.Label className="pt-2">사용자 메뉴얼 및 기술문서(글)</Form.Label>
							<Form.Control
								type="textarea"
								rows={4}
								name="attachment"
								value={formData.attachment}
								onChange={handleChange}
							/>
						</Form>
					</StyledCardBody>
				</Accordion.Collapse>
			</StyledCard>
		</Accordion>
	);
};

export default FileUpload;
