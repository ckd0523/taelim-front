<<<<<<< Updated upstream
import { ReactNode } from "react";
import { Row, Col, Breadcrumb } from "react-bootstrap";
import { Helmet } from "react-helmet";
=======
import { ReactNode } from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
>>>>>>> Stashed changes

const PageBreadcrumb = ({ subName, title, children }) => {
  return (
    <>
      <Helmet>
        <title>{title} | Hyper - Responsive Bootstrap 5 Admin Dashboard</title>
      </Helmet>
      {subName && (
        <Row>
          <Col>
            <div className="page-title-box">
              <div className="page-title-right">
<<<<<<< Updated upstream
                <Breadcrumb listProps={{ className: "m-0" }}>
                  <Breadcrumb.Item as={"li"}>{subName}</Breadcrumb.Item>
                  <Breadcrumb.Item as={"li"} active>
=======
                <Breadcrumb listProps={{ className: 'm-0' }}>
                  <Breadcrumb.Item as={'li'}>Hyper</Breadcrumb.Item>
                  <Breadcrumb.Item as={'li'}>{subName}</Breadcrumb.Item>
                  <Breadcrumb.Item as={'li'} active>
>>>>>>> Stashed changes
                    {title}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <h4 className="page-title">
                {title}
                {children ?? null}
              </h4>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

<<<<<<< Updated upstream
export { PageBreadcrumb };
=======
export default PageBreadcrumb;
>>>>>>> Stashed changes
