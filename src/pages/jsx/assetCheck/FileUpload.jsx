import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Accordion, Card } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap';
import { FileUploader } from '@/components/FileUploader';

function CustomToggle({ children, eventKey }) {
	const decoratedOnClick = useAccordionButton(eventKey, () => console.log('totally custom'));
	return (
		<button
			className="custom-button"
			type="button"
			style={{ backgroundColor: 'white' }}
			onClick={decoratedOnClick}
		>
			{children}
		</button>
	);
}
const FileUpload = ({ files = [], setFiles }) => {
	// const handleFileUpload = useCallback(
	// 	(acceptedFiles) => {
	// 		setFiles(acceptedFiles);

	// 		acceptedFiles.forEach((file) =>
	// 			Object.assign(file, {
	// 				preview: URL.createObjectURL(file),
	// 			})
	// 		);
	// 	},
	// 	[setFiles]
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
			<Card style={{ width: '120rem' }}>
				<CustomToggle eventKey="0">
					<Card.Header>첨부파일 등록</Card.Header>
				</CustomToggle>
				<Accordion.Collapse eventKey="0">
					<Card.Body style={{ paddingLeft: 80, alignItems: 'center' }}>
						<p className="mb-2 c fw-bold">이미지 등록</p>
						<FileUploader
							showPreview={true}
							onFileUpload={(file) => handleFileUpload(file, 'PHOTO')}
						/>

						<p className="mb-2 c fw-bold">보증 세부사항</p>
						<FileUploader
							showPreview={true}
							onFileUpload={(file) => handleFileUpload(file, 'WARRANTY_DETAILS')}
						/>
						<p className="mb-2 c fw-bold">사용자 메뉴얼 및 기술문서</p>
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
