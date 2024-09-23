import { useState } from 'react';
import { Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import Select from 'react-select';
import { CustomDatePicker } from '@/components';
import assetSurveyLocation from './assetSurveyLocation';

const SearchBar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <Row>
        <Card></Card>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={2}>
                  <label>회차</label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="round"
                      min="0"
                    ></Form.Control>
                  </InputGroup>
                </Col>
                <Col lg={2}>
                  <label>조사자</label>
                  <InputGroup>
                    <Form.Control type="text" name="surveyBy"></Form.Control>
                  </InputGroup>
                </Col>
                <Col lg={3}>
                  <label>위치</label>
                  <Select
                    placeholder="위치를 선택하세요"
                    className="react-select"
                    classNamePrefix="react-select"
                    options={assetSurveyLocation}
                  ></Select>
                </Col>

                <Col>
                  <Row className="justify-content-start">
                    <label>자산 조사일</label>
                    <Col lg={4}>
                      <div className="mb-3">
                        <CustomDatePicker
                          hideAddon={true}
                          value={selectedDate}
                          onChange={(date) => {
                            setSelectedDate(date);
                          }}
                        />
                      </div>
                    </Col>
                    ~
                    <Col lg={4}>
                      <div className="mb-3">
                        <CustomDatePicker
                          hideAddon={true}
                          value={selectedDate}
                          onChange={(date) => {
                            setSelectedDate(date);
                          }}
                        />
                      </div>
                    </Col>
                    <Col lg={3}>
                      <Button>검색</Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SearchBar;
