
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_PAYLOAD_SECRET || 'default-secret-key';
const payloadObj = { email: 'test@example.com', passwordHash: 'hash', role: 'user' };
const payload = JSON.stringify(payloadObj);

console.log('Original:', payload);

const encrypted = CryptoJS.AES.encrypt(payload, SECRET_KEY).toString();
console.log('Encrypted:', encrypted);

const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
const decrypted = bytes.toString(CryptoJS.enc.Utf8);
console.log('Decrypted:', decrypted);

if (decrypted === payload) {
    console.log('Verification SUCCESS');
} else {
    console.error('Verification FAILED');
    process.exit(1);
}
