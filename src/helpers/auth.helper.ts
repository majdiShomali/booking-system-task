import { pbkdf2Sync, randomBytes } from "crypto";

function getSalt(): string {
  return randomBytes(16).toString("hex");
}

function getHash(password: string, salt: string): string {
  return pbkdf2Sync(password, salt, 10000, 512, "sha512").toString("hex");
}

function validatePassword(salt:string,hash:string, password: string): boolean {
  return getHash(password, salt) === hash;
};

const authHelper = { getSalt, getHash, validatePassword };
export default authHelper;
