import axios from "axios";
import { onRequest, onRequestError } from "./requestInterceptors";
import { onResponse, onResponseError } from "./responseInterceptors";

axios.interceptors.request.use(onRequest, onRequestError);
axios.interceptors.response.use(onResponse, onResponseError);
