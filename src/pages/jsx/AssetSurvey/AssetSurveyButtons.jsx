import { Row, Col, Button, Modal } from 'react-bootstrap';
import RegisterButton from './AssetSurveyRegisterButton';
import { useToggle } from '@/hooks';
import { Link } from 'react-router-dom';

const Buttons = ({ onClickRegister, onDelete }) => {
	return (
		<Row className="justify-content-end mt-2">
			<Col xs="auto" className="text-end">
				<Button
					className="btn btn-danger"
					style={{ background: '#c66464', border: 'none', marginBottom: '10px' }}
					onClick={onDelete}
				>
					자산 조사 삭제
				</Button>
			</Col>
			<Col xs="auto" className="text-end">
				<RegisterButton onClickRegister={onClickRegister} />
			</Col>
		</Row>
	);
};

const SurveyCompleteButton = ({ onClickCompleteSurvey }) => {
	const [signUpModal, toggleSignUp] = useToggle();
	//console.log("sdfdsfs");
	return (
		<>
			<Button style={{ background: '#5e83bb', border: 'none' }} onClick={toggleSignUp}>
				완료
			</Button>

			{/* Modal */}
			<Modal show={signUpModal} onHide={toggleSignUp} backdrop="static" size="sm" centered>
				<Modal.Body className="text-center">정말 자산 조사를 완료하시겠습니까?</Modal.Body>
				<Modal.Footer className="justify-content-center">
					<Button
						style={{ background: '#5e83bb', border: 'none' }}
						onClick={() => {
							//onClick에 함수 2개 넣는 법, 두 함수의 위치를 바꿔도 차이는 없음
							toggleSignUp();
							onClickCompleteSurvey();
						}}
					>
						완료
					</Button>
					<Button
						style={{ background: '#c66464', border: 'none' }}
						variant="danger"
						onClick={toggleSignUp}
					>
						취소
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

const SruveyCancelButton = () => {
	const [signUpModal, toggleSignUp] = useToggle();
	return (
		<>
			<Button variant="secondary" onClick={toggleSignUp}>
				취소
			</Button>

			{/* Modal */}
			<Modal show={signUpModal} onHide={toggleSignUp} backdrop="static" size="sm" centered>
				<Modal.Body className="text-center">
					<p>정말 나가시겠습니까?</p> 진행 상황은 저장됩니다.
				</Modal.Body>
				<Modal.Footer className="justify-content-center">
					<Link to={'/jsx/AssetSurveyHistory'}>
						<Button style={{ background: '#5e83bb', border: 'none' }}>예</Button>
					</Link>
					<Button
						style={{ background: '#c66464', border: 'none' }}
						onClick={toggleSignUp}
					>
						아니오
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export { Buttons, SurveyCompleteButton, SruveyCancelButton };
