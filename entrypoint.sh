#!/bin/bash

# SSL 인증서 경로
CERT_PATH="/etc/letsencrypt/live/taelimasset.com/fullchain.pem"

# SSL 인증서가 없으면 Certbot으로 인증서 발급
if [ ! -f "$CERT_PATH" ]; then
  echo "SSL 인증서가 존재하지 않습니다. Certbot을 통해 인증서를 발급합니다."
  certbot certonly --nginx -d taelimasset.com --non-interactive --agree-tos -m your-email@example.com
  
  # 인증서 발급 성공 여부 확인
  if [ $? -ne 0 ]; then
    echo "인증서 발급에 실패했습니다. Nginx를 시작할 수 없습니다."
    exit 1
  fi
fi

# Nginx 시작
nginx -g "daemon off;"
