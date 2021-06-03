import axios from "axios";
import AuthService from './AuthService';

 
export const HTTP = axios.create({
	baseURL: `https://localhost:5001/api/`,
	headers: {
		Authorization: `Bearer {accessToken}`,
	},
});