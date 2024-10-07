#!/bin/bash

# SSL 인증서 경로
CERT_PATH="/etc/letsencrypt/live/taelimasset.com/fullchain.pem"

# SSL 인증서가 없으면 Certbot으로 인증서 발급
if [ ! -f "$CERT_PATH" ]; then
  echo "SSL 인증서가 존재하지 않습니다. Certbot을 통해 인증서를 발급합니다."
  certbot certonly --nginx -d taelimasset.com --non-interactive --agree-tos -m your-email@example.com
fi

# Nginx 시작
nginx -g "daemon off;"
