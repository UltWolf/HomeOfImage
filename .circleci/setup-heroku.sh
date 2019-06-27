ssh-keyscan -H heroku.com >> ~/.ssh/known_hosts
 

cat > ~/.netrc << EOF
machine api.heroku.com
  login ultwolf@gmail.com
  password e44ae292-5cd8-41e5-aae8-b594f50fb886
EOF

cat >> ~/.ssh/config << EOF
VerifyHostKeyDNS yes
StrictHostKeyChecking no
EOF