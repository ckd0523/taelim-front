//자산분류별 컬럼
import { Accordion, Card, Row, Col, Form } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap";
import "./ButtonStyle.css";
import { TextInput, TextAreaInput } from "@/components/Form";
import { useForm, FormProvider } from "react-hook-form";
import { CustomDatePicker } from "@/components/Form";

import Select from "react-select";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom")
  );
  return (
    <button
      className="custom-button"
      type="button"
      style={{ backgroundColor: "white" }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}
const AssetCategories = ({ assetClassification, formData, handleChange }) => {
  const methods = useForm();
  const renderAdditionalFields = () => {
    switch (assetClassification) {
      case "INFORMATION_PROTECTION_SYSTEM":
        return (
          <div>
            <Accordion defaultActiveKey="0" flush>
              <Card>
                <Card.Header>
                  <CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <FormProvider {...methods}>
                    <Card.Body>
                      <Row>
                        <Col lg={5} style={{ paddingLeft: 80 }}>
                          <TextInput
                            label="서비스범위"
                            type="text"
                            placeholder="서비스범위를 입력해주세요"
                            name="serviceScope"
                            containerClass={"mb-3"}
                            value={formData.serviceScope}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </FormProvider>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        );

      case "APPLICATION_PROGRAM":
        return (
          <div>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <FormProvider {...methods}>
                    <Card.Body>
                      <Row>
                        <Col lg={5} style={{ paddingLeft: 80 }}>
                          <TextInput
                            label="서비스범위"
                            type="text"
                            placeholder="서비스범위를 입력해주세요"
                            name="serviceScope"
                            containerClass={"mb-3"}
                            value={formData.serviceScope}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="OS"
                            type="text"
                            placeholder="OS를 입력해주세요"
                            name="os"
                            containerClass={"mb-3"}
                            value={formData.os}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="관련DB"
                            type="text"
                            placeholder="관련DB를 입력해주세요"
                            name="relatedDB"
                            containerClass={"mb-3"}
                            value={formData.relatedDB}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="IP"
                            type="text"
                            placeholder="IP를 입력해주세요"
                            name="ip"
                            containerClass={"mb-3"}
                            value={formData.ip}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="화면수"
                            type="number"
                            placeholder="화면수를 입력해주세요"
                            name="screenNumber"
                            containerClass={"mb-3"}
                            value={formData.screenNumber}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </FormProvider>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        );
      case "SOFTWARE":
        return (
          <div>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <FormProvider {...methods}>
                    <Card.Body>
                      <Row>
                        <Col lg={5} style={{ paddingLeft: 80 }}>
                          <TextInput
                            label="IP"
                            type="text"
                            placeholder="IP를 입력해주세요"
                            name="ip"
                            containerClass={"mb-3"}
                            value={formData.ip}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="ID"
                            type="text"
                            placeholder="ID를 입력해주세요"
                            name="serverId"
                            containerClass={"mb-3"}
                            value={formData.serverId}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="PW"
                            type="text"
                            placeholder="PW를 입력해주세요"
                            name="serverPassword"
                            containerClass={"mb-3"}
                            value={formData.serverPassword}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="담당업체"
                            type="text"
                            placeholder="담당업체를 입력해주세요"
                            name="companyManager"
                            containerClass={"mb-3"}
                            value={formData.companyManager}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="OS"
                            type="text"
                            placeholder="OS를 입력해주세요"
                            name="os"
                            containerClass={"mb-3"}
                            value={formData.os}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </FormProvider>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        );
      case "ELECTRONIC_INFORMATION":
        return (
          <div>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <FormProvider {...methods}>
                    <Card.Body>
                      <Row>
                        <Col lg={5} style={{ paddingLeft: 80 }}>
                          <TextInput
                            label="OS"
                            type="text"
                            placeholder="OS를 입력해주세요"
                            name="os"
                            containerClass={"mb-3"}
                            value={formData.os}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="시스템"
                            type="text"
                            placeholder="시스템을 입력해주세요"
                            name="system"
                            containerClass={"mb-3"}
                            value={formData.system}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="DB종류"
                            type="text"
                            placeholder="DB종류를 입력해주세요"
                            name="dbtype"
                            containerClass={"mb-3"}
                            value={formData.dbtype}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </FormProvider>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        );
      case "DOCUMENT":
        return (
          <div>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <FormProvider {...methods}>
                    <Card.Body>
                      <Row>
                        <Col lg={5} style={{ paddingLeft: 80 }}>
                          <p className="mb-2 c fw-bold">문서등급</p>
                          <Select
                            className="mb-3"
                            placeholder="문서등급을 선택해주세요"
                            name="documentGrade"
                            value={formData.documentGrade}
                            onChange={(selectedOption) =>
                              handleChange({
                                target: {
                                  name: "documentGrade",
                                  value: selectedOption.value,
                                },
                              })
                            }
                            options={[
                              { value: "CONFIDENTIAL", label: "대외비" },
                              { value: "INTERNAL", label: "내부용" },
                              { value: "PUBLIC", label: "일반" },
                            ]}
                          ></Select>
                          <p className="mb-2 c fw-bold">문서형태</p>
                          <Select
                            className="mb-3"
                            placeholder="문서형태 선택해주세요"
                            name="documentType"
                            value={formData.documentType}
                            onChange={(selectedOption) =>
                              handleChange({
                                target: {
                                  name: "documentType",
                                  value: selectedOption.value,
                                },
                              })
                            }
                            options={[
                              { value: "GENERAL_DOCUMENT", label: "일반문서" },
                              {
                                value: "CONTRACTS_AND_LEGAL_DOCUMENTS",
                                label: "계약 및 법적문서",
                              },
                              {
                                value: "REPORTS_AND_PRESENTATIONS",
                                label: "보고서 및 프레젠테이션",
                              },
                              {
                                value: "FORMS_AND_TEMPLATES",
                                label: "양식 및 서식",
                              },
                            ]}
                          ></Select>
                          <TextInput
                            label="문서링크"
                            type="text"
                            placeholder="문서링크를 입력해주세요"
                            name="documentLink"
                            containerClass={"mb-3"}
                            value={formData.documentLink}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </FormProvider>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        );
      case "PATENTS_AND_TRADEMARKS":
        return (
          <div>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <FormProvider {...methods}>
                    <Card.Body>
                      <Row>
                        <Col lg={5} style={{ paddingLeft: 80 }}>
                          <div className="form-group mb-3">
                            <label className="form-label">출원일자</label>{" "}
                            <br />
                            <CustomDatePicker
                              type="date"
                              name="applicationDate"
                              hideAddon={true}
                              dateFormat="yyyy-MM-dd"
                              value={formData.applicationDate}
                              onChange={(selectedOption) =>
                                handleChange({
                                  target: {
                                    name: "applicationDate",
                                    value: selectedOption.value.toStringDate(),
                                  },
                                })
                              }
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label className="form-label">등록일자</label>{" "}
                            <br />
                            <CustomDatePicker
                              type="date"
                              name="registrationDate"
                              hideAddon={true}
                              dateFormat="yyyy-MM-dd"
                              value={formData.registrationDate}
                              onChange={(selectedOption) =>
                                handleChange({
                                  target: {
                                    name: "registrationDate",
                                    value: selectedOption.value.toStringDate(),
                                  },
                                })
                              }
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label className="form-label">만료일자</label>{" "}
                            <br />
                            <CustomDatePicker
                              type="date"
                              name="expirationDate"
                              hideAddon={true}
                              dateFormat="yyyy-MM-dd"
                              value={formData.expirationDate}
                              onChange={(selectedOption) =>
                                handleChange({
                                  target: {
                                    name: "expirationDate",
                                    value: selectedOption.value.toStringDate(),
                                  },
                                })
                              }
                            />
                          </div>
                          <p className="mb-2 c fw-bold">특허/상표 상태</p>
                          <Select
                            className="mb-3"
                            placeholder="특허/상표 상태를 선택해주세요"
                            name="patentTrademarkStatus"
                            value={formData.patentTrademarkStatus}
                            onChange={(selectedOption) =>
                              handleChange({
                                target: {
                                  name: "patentTrademarkStatus",
                                  value: selectedOption.value,
                                },
                              })
                            }
                            options={[
                              { value: "PCT_APPLICATION", label: "PCT 출원" },
                              {
                                value: "APPLICATION",
                                label: "출원",
                              },
                              {
                                value: "REGISTERED",
                                label: "등록",
                              },
                              {
                                value: "EXPIRED",
                                label: "만료",
                              },
                            ]}
                          ></Select>
                          <p className="mb-2 c fw-bold">출원국가</p>
                          <Select
                            className="mb-3"
                            placeholder="출원국가를 선택해주세요"
                            name="countryApplication"
                            value={formData.countryApplication}
                            onChange={(selectedOption) =>
                              handleChange({
                                target: {
                                  name: "countryApplication",
                                  value: selectedOption.value,
                                },
                              })
                            }
                            options={[
                              { value: "KOREA", label: "한국" },
                              {
                                value: "USA",
                                label: "미국",
                              },
                              {
                                value: "JAPAN",
                                label: "일본",
                              },
                              {
                                value: "CHINA",
                                label: "중국",
                              },
                              {
                                value: "GERMANY",
                                label: "독일",
                              },
                            ]}
                          ></Select>
                          <p className="mb-2 c fw-bold">특허분류</p>
                          <Select
                            className="mb-3"
                            placeholder="특허분류를 선택해주세요"
                            name="patentClassification"
                            value={formData.patentClassification}
                            onChange={(selectedOption) =>
                              handleChange({
                                target: {
                                  name: "patentClassification",
                                  value: selectedOption.value,
                                },
                              })
                            }
                            options={[
                              { value: "NEW_MATERIALS", label: "신소재" },
                              {
                                value: "INCUBATION",
                                label: "인큐베이션",
                              },
                            ]}
                          ></Select>
                          <p className="mb-2 c fw-bold">특허세목</p>
                          <Select
                            className="mb-3"
                            placeholder="특허세목을 선택해주세요"
                            name="patentItem"
                            value={formData.patentItem}
                            onChange={(selectedOption) =>
                              handleChange({
                                target: {
                                  name: "patentItem",
                                  value: selectedOption.value,
                                },
                              })
                            }
                            options={[
                              { value: "COMPOSITE_MATERIALS", label: "복합재" },
                              {
                                value: "CORPORATE_VENTURE",
                                label: "신소재",
                              },
                            ]}
                          ></Select>
                          <TextInput
                            label="출원번호"
                            type="text"
                            placeholder="출원번호를 입력해주세요"
                            name="applicationNo"
                            containerClass={"mb-3"}
                            value={formData.applicationNo}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="발명자"
                            type="text"
                            placeholder="발명자를 입력해주세요"
                            name="inventor"
                            containerClass={"mb-3"}
                            value={formData.inventor}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="권리권자"
                            type="text"
                            placeholder="권리권자를 입력해주세요"
                            name="assignee"
                            containerClass={"mb-3"}
                            value={formData.assignee}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="관련문서"
                            type="text"
                            placeholder="관련문서를 입력해주세요"
                            name="relatedDocuments"
                            containerClass={"mb-3"}
                            value={formData.relatedDocuments}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </FormProvider>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        );
      case "ITSYSTEM_EQUIPMENT":
        return (
          <div>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <FormProvider {...methods}>
                    <Card.Body>
                      <Row>
                        <Col lg={5} style={{ paddingLeft: 80 }}>
                          <TextInput
                            label="장비유형"
                            type="text"
                            placeholder="장비유형을 입력해주세요"
                            name="equipmentType"
                            containerClass={"mb-3"}
                            value={formData.equipmentType}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="랙유닛"
                            type="number"
                            placeholder="랙유닛을 입력해주세요"
                            name="rackUnit"
                            containerClass={"mb-3"}
                            value={formData.rackUnit}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="전원공급장치"
                            type="text"
                            placeholder="전원공급장치를 입력해주세요"
                            name="powerSupply"
                            containerClass={"mb-3"}
                            value={formData.powerSupply}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="쿨링시스템"
                            type="text"
                            placeholder="쿨링시스템을 입력해주세요"
                            name="coolingSystem"
                            containerClass={"mb-3"}
                            value={formData.coolingSystem}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="인터페이스 포트"
                            type="text"
                            placeholder="인터페이스 포트를 입력해주세요"
                            name="interfacePorts"
                            containerClass={"mb-3"}
                            value={formData.interfacePorts}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="폼팩터"
                            type="text"
                            placeholder="폼팩터를 입력해주세요"
                            name="formFactor"
                            containerClass={"mb-3"}
                            value={formData.formFactor}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="확장슬롯수"
                            type="number"
                            placeholder="확장슬롯수를 입력해주세요"
                            name="expansionSlots"
                            containerClass={"mb-3"}
                            value={formData.expansionSlots}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="그래픽카드"
                            type="text"
                            placeholder="그래픽카드를 입력해주세요"
                            name="graphicsCard"
                            containerClass={"mb-3"}
                            value={formData.graphicsCard}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="포트 구성"
                            type="text"
                            placeholder="포트 구성을 입력해주세요"
                            name="portConfiguration"
                            containerClass={"mb-3"}
                            value={formData.portConfiguration}
                            onChange={handleChange}
                          />
                          <Form.Group className="mt-2">
                            <Form.Label className="form-label">
                              모니터 포함여부
                            </Form.Label>
                            <div>
                              <Form.Check
                                label="포함"
                                type="radio"
                                name="monitorIncluded"
                                // containerClass={"form-check-inline"}
                                value="true"
                                checked={formData.monitorIncluded === true}
                                onChange={(e) =>
                                  handleChange({
                                    target: {
                                      name: "monitorIncluded",
                                      value: e.target.value === "true",
                                    },
                                  })
                                }
                              />
                              <Form.Check
                                label="미포함"
                                type="radio"
                                name="monitorIncluded"
                                // containerClass={"form-check-inline"}
                                value="false"
                                checked={formData.monitorIncluded === false}
                                onChange={(e) =>
                                  handleChange({
                                    target: {
                                      name: "monitorIncluded",
                                      value: e.target.value === "true",
                                    },
                                  })
                                }
                              />
                            </div>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </FormProvider>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        );
      case "ITNETWORK_EQUIPMENT":
        return (
          <div>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <FormProvider {...methods}>
                    <Card.Body>
                      <Row>
                        <Col lg={5} style={{ paddingLeft: 80 }}>
                          <TextInput
                            label="장비유형"
                            type="text"
                            placeholder="장비유형을 입력해주세요"
                            name="equipmentType"
                            containerClass={"mb-3"}
                            value={formData.equipmentType}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="포트수"
                            type="number"
                            placeholder="포트수를 입력해주세요"
                            name="numberOfPorts"
                            containerClass={"mb-3"}
                            value={formData.numberOfPorts}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="지원프로토콜"
                            type="text"
                            placeholder="지원프로토콜을 입력해주세요"
                            name="supportedProtocols"
                            containerClass={"mb-3"}
                            value={formData.supportedProtocols}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="펌웨어 버전"
                            type="text"
                            placeholder="펌웨어 버전을 입력해주세요"
                            name="firmwareVersion"
                            containerClass={"mb-3"}
                            value={formData.firmwareVersion}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="네트워크 속도"
                            type="number"
                            placeholder="네트워크 속도를 입력해주세요"
                            name="networkSpeed"
                            containerClass={"mb-3"}
                            value={formData.networkSpeed}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="서비스범위"
                            type="text"
                            placeholder="서비스범위를 입력해주세요"
                            name="serviceScope"
                            containerClass={"mb-3"}
                            value={formData.serviceScope}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </FormProvider>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        );
      case "TERMINAL":
        return (
          <div>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <FormProvider {...methods}>
                    <Card.Body>
                      <Row>
                        <Col lg={5} style={{ paddingLeft: 80 }}>
                          <TextInput
                            label="IP"
                            type="text"
                            placeholder="IP를 입력해주세요"
                            name="ip"
                            containerClass={"mb-3"}
                            value={formData.ip}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="제품 시리얼 번호"
                            type="text"
                            placeholder="제품 시리얼 번호를 입력해주세요"
                            name="productSerialNumber"
                            containerClass={"mb-3"}
                            value={formData.productSerialNumber}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="OS"
                            type="text"
                            placeholder="OS를 입력해주세요"
                            name="os"
                            containerClass={"mb-3"}
                            value={formData.os}
                            onChange={handleChange}
                          />
                          <p className="mb-2 c fw-bold">보안관제</p>
                          <Select
                            className="mb-3"
                            placeholder="보안관제를 선택해주세요"
                            name="securityControl"
                            value={formData.securityControl}
                            onChange={(selectedOption) =>
                              handleChange({
                                target: {
                                  name: "securityControl",
                                  value: selectedOption.value,
                                },
                              })
                            }
                            options={[
                              { value: "MONITORING", label: "관제중" },
                              {
                                value: "ANOMALY_DETECTED",
                                label: "이상감지",
                              },
                              {
                                value: "MONITORING_COMPLETED",
                                label: "관제완료",
                              },
                            ]}
                          ></Select>
                          <TextInput
                            label="내부정보 유출 방지"
                            type="text"
                            placeholder="내부정보 유출 방지를 입력해주세요"
                            name="kaitsKeeper"
                            containerClass={"mb-3"}
                            value={formData.kaitsKeeper}
                            onChange={handleChange}
                          />
                          <div className="form-group mb-3">
                            <label className="form-label">
                              악성코드,랜섬웨어 탐지
                            </label>{" "}
                            <br />
                            <CustomDatePicker
                              type="date"
                              name="V3OfficeSecurity"
                              hideAddon={true}
                              dateFormat="yyyy-MM-dd"
                              value={formData.V3OfficeSecurity}
                              onChange={(selectedOption) =>
                                handleChange({
                                  target: {
                                    name: "V3OfficeSecurity",
                                    value: selectedOption.value.toStringDate(),
                                  },
                                })
                              }
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label className="form-label">안티랜섬웨어</label>{" "}
                            <br />
                            <CustomDatePicker
                              type="date"
                              name="appCheckPro"
                              hideAddon={true}
                              dateFormat="yyyy-MM-dd"
                              value={formData.appCheckPro}
                              onChange={(selectedOption) =>
                                handleChange({
                                  target: {
                                    name: "appCheckPro",
                                    value: selectedOption.value.toStringDate(),
                                  },
                                })
                              }
                            />
                          </div>
                          <div className="form-group mb-3">
                            <label className="form-label">NAC agent</label>{" "}
                            <br />
                            <CustomDatePicker
                              type="date"
                              name="tgate"
                              hideAddon={true}
                              dateFormat="yyyy-MM-dd"
                              value={formData.tgate}
                              onChange={(selectedOption) =>
                                handleChange({
                                  target: {
                                    name: "tgate",
                                    value: selectedOption.value.toStringDate(),
                                  },
                                })
                              }
                            />
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </FormProvider>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        );
      case "FURNITURE":
        return (
          <div>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <FormProvider {...methods}>
                    <Card.Body>
                      <Row>
                        <Col lg={5} style={{ paddingLeft: 80 }}>
                          <TextInput
                            label="크기"
                            type="text"
                            placeholder="크기를 입력해주세요"
                            name="furnitureSize"
                            containerClass={"mb-3"}
                            value={formData.furnitureSize}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </FormProvider>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        );
      case "DEVICES":
        return (
          <div>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <FormProvider {...methods}>
                    <Card.Body>
                      <Row>
                        <Col lg={5} style={{ paddingLeft: 80 }}>
                          <TextInput
                            label="기기유형"
                            type="text"
                            placeholder="기기유형을 입력해주세요"
                            name="deviceType"
                            containerClass={"mb-3"}
                            value={formData.deviceType}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="모델번호"
                            type="text"
                            placeholder="모델번호을 입력해주세요"
                            name="modelNumber"
                            containerClass={"mb-3"}
                            value={formData.modelNumber}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="연결방식"
                            type="text"
                            placeholder="연결방식을 입력해주세요"
                            name="connectionType"
                            containerClass={"mb-3"}
                            value={formData.connectionType}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="전원사양"
                            type="text"
                            placeholder="전원사양을 입력해주세요"
                            name="powerSpecifications"
                            containerClass={"mb-3"}
                            value={formData.powerSpecifications}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </FormProvider>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        );
      case "CAR":
        return (
          <div>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <FormProvider {...methods}>
                    <Card.Body>
                      <Row>
                        <Col lg={5} style={{ paddingLeft: 80 }}>
                          <TextInput
                            label="배기량"
                            type="number"
                            placeholder="배기량을 입력해주세요"
                            name="displacement"
                            containerClass={"mb-3"}
                            value={formData.displacement}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="차량의 문 수"
                            type="number"
                            placeholder="차량의 문 수를 입력해주세요"
                            name="doorsCount"
                            containerClass={"mb-3"}
                            value={formData.doorsCount}
                            onChange={handleChange}
                          />
                          <p className="mb-2 c fw-bold">엔진 형식</p>
                          <Select
                            className="mb-3"
                            placeholder="엔진 형식을 선택해주세요"
                            name="engineType"
                            value={formData.engineType}
                            onChange={(selectedOption) =>
                              handleChange({
                                target: {
                                  name: "engineType",
                                  value: selectedOption.value,
                                },
                              })
                            }
                            options={[
                              { value: "GASOLINE", label: "가솔린" },
                              { value: "DIESEL", label: "디젤" },
                              { value: "HYBRID", label: "하이브리드" },
                              { value: "ELECTRIC", label: "전기" },
                            ]}
                          ></Select>
                          <p className="mb-2 c fw-bold">차량 종류</p>
                          <Select
                            className="mb-3"
                            placeholder="차량 종류를 선택해주세요"
                            name="carType"
                            value={formData.carType}
                            onChange={(selectedOption) =>
                              handleChange({
                                target: {
                                  name: "carType",
                                  value: selectedOption.value,
                                },
                              })
                            }
                            options={[
                              { value: "SEDAN", label: "승용차" },
                              { value: "SUV", label: "SUV" },
                              { value: "TRUCK", label: "트럭" },
                              { value: "VAN", label: "밴" },
                            ]}
                          ></Select>
                          <TextInput
                            label="차량 식별번호"
                            type="text"
                            placeholder="차량 식별번호를 입력해주세요"
                            name="identificationNo"
                            containerClass={"mb-3"}
                            value={formData.identificationNo}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="차량 색상"
                            type="text"
                            placeholder="차량 색상을 입력해주세요"
                            name="carColor"
                            containerClass={"mb-3"}
                            value={formData.carColor}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="연식"
                            type="number"
                            placeholder="연식을 입력해주세요"
                            name="modelYear"
                            containerClass={"mb-3"}
                            value={formData.modelYear}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </FormProvider>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        );
      case "OTHERASSETS":
        return (
          <div>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <CustomToggle eventKey="0">자산별 컬럼</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <FormProvider {...methods}>
                    <Card.Body>
                      <Row>
                        <Col lg={5} style={{ paddingLeft: 80 }}>
                          <TextInput
                            label="기타 세부 설명"
                            type="text"
                            placeholder="기타 세부 설명을 입력해주세요"
                            name="otherDescription"
                            containerClass={"mb-3"}
                            value={formData.otherDescription}
                            onChange={handleChange}
                          />
                          <TextInput
                            label="사용 빈도"
                            type="text"
                            placeholder="사용 빈도를 입력해주세요"
                            name="usageFrequency"
                            containerClass={"mb-3"}
                            value={formData.usageFrequency}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </FormProvider>
                </Accordion.Collapse>
              </Card>
            </Accordion>
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
