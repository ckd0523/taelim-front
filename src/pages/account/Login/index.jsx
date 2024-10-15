import { PageBreadcrumb, Form, PasswordInput, TextInput } from '@/components';
import { Button, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import AccountWrapper from '../AccountWrapper';
import useLogin, { loginFormSchema } from './useLogin';

export default function Login() {
  const { t } = useTranslation();

  const { loading, login, redirectUrl, isAuthenticated } = useLogin();

  return (
    <>
      {isAuthenticated && <Navigate to={redirectUrl} replace />}

      <PageBreadcrumb title="Login" />
      <AccountWrapper>
        <div className="text-center w-75 m-auto">
          <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('로그인')}</h4>
          <p className="text-muted mb-4">
            {t('이메일과 비밀번호를 입력하세요.')}
          </p>
        </div>

        <Form
          onSubmit={login}
          schema={loginFormSchema}
          defaultValues={{ email: 'user1@example.com', password: '' }}
        >
          <Row>
            <Col>
              <TextInput
                name="email"
                label={t('Email Address')}
                type="email"
                placeholder={t('Enter your email')}
                containerClass="mb-3"
              />
            </Col>
          </Row>
          <PasswordInput
            label={t('Password')}
            name="password"
            placeholder={t('Enter your password')}
            containerClass="mb-3"
          >
          </PasswordInput>

          <div className="mb-3 text-center">
            <Button variant="primary" type="submit" disabled={loading}>
              {t('Log In')}
            </Button>
          </div>
        </Form>
      </AccountWrapper>
    </>
  );
}
