export default {
  port: 8080,
  dbUri: "mongodb://localhost:27017/rest-api-tutorial",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  publicKey: `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCGF23cIOynQjeiylJA6xJrKnxD
  qcRM/m218if5OE0P11k7XogM2VaY2XvZ0xxn7hAVvasRBYkLYtkATKErQs84kyVk
  1wL9QB+dT05/OyfNv3pDiSZ0fk0cYmlg5Jybm137nwQVoU3Y/YupfmJn8APly5F6
  H6T2QuyqQz8uWegeIwIDAQAB
  -----END PUBLIC KEY-----`,
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
  MIICWwIBAAKBgQCGF23cIOynQjeiylJA6xJrKnxDqcRM/m218if5OE0P11k7XogM
  2VaY2XvZ0xxn7hAVvasRBYkLYtkATKErQs84kyVk1wL9QB+dT05/OyfNv3pDiSZ0
  fk0cYmlg5Jybm137nwQVoU3Y/YupfmJn8APly5F6H6T2QuyqQz8uWegeIwIDAQAB
  AoGAbRle7z1yjtuXfMH0jpE0WTEmDb9w0dwo02KFF4axXHQwS9esBhhHFvHMjPvx
  HrZZK/c32g+Q40y3lkDC2PnwsrIsOqrA/A7KtafGcTuXNHzEfe7NNI4W1yrtSl9a
  GC86q8xpeBT5TbMDHEuQpQuFVGukqazAOSjg8U9fHGlfDrECQQD5wuP303x77UBX
  tt/wwvYUeqa969Y6asmd/KJ4YCpaU/F2Eb+DC640WwYFT1WVjq4AElCdPkdeX20E
  ezpDTU11AkEAiXDiG2Hmc/y5WJd0Q4HUpLlBRUZpoVMOCXiJ269LbN5RENlZeg6S
  d5tvj6KBCQfhOlPv4XithiTaw+Bi2ulSNwJAf4f8T7c1gTIMAL3oa0+hx6M5MRET
  OpD8kidF7qFr/uOOD/PQDmIQebtgv6Va1hsczfyMHT6HwrCHQhqKDYOTYQJAG+aG
  f/iHx9Pt7EYSnAGnISlaTq3Uk6NAnjuSAL69GQSogDsfJt/+a7lqFEZw21x2JFkV
  wTe2Qh0JK+pJJxdmUQJAY5LHQkFDkeDuQp83/s2uGLqwRmp3SLLV27J88BewaXCU
  hWyxLAxhs712R/4Jy9qMgU+cJ6qmebflLFYMRoxCmw==
  -----END RSA PRIVATE KEY-----`,
};
