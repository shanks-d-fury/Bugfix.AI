// Simple global in-memory storage (server restart clears it)]
import dotenv from "dotenv";
if (process.env.NODE_ENV != "production") {
	dotenv.config();
}
let globalEmail = process.env.DEFAULT_EMAIL || "shs22ise@cmrit.ac.in ";

export function setGlobalEmail(email) {
	globalEmail = email;
}

export function getGlobalEmail() {
	return globalEmail;
}
