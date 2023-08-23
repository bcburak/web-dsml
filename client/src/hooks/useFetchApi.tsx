import { useState } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
// Pass URL
function useFetchApi<T>() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [responseData, setResponseData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (path: string, method: HttpMethod, body?: any) => {
    if (!apiUrl) {
      setError(new Error("API URL not defined"));
      setLoading(false);
      return;
    }
    console.log("api url", `${apiUrl}${path}`);
    const requestOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(requestOptions);

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    fetch("https://" + `${apiUrl}${path}`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setResponseData(data);
        console.log(data);
        setLoading(false);
        return true;
      })
      .catch((error) => {
        console.log(error.message);
        setError(error?.message);
      });
  };

  return { fetchData, responseData, loading, error };
}
export default useFetchApi;
