# ssh-keygen -t rsa -b 4096 -m PEM -f code-signing.key
# # Don't add passphrase
# openssl rsa -in jwtRS256.key -pubout -outform PEM -out code-signing.key.pub
# cat code-signing.key
# cat code-signing.key.pub


ssh-keygen -t rsa -b 4096 -m PEM -f code-signing.pem
# Don't add passphrase
openssl rsa -in code-signing.pem -pubout -outform PEM -out code-signing.pem.pub
cat code-signing.pem
cat code-signing.pem.pub