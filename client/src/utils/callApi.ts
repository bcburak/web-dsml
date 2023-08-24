type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export function callApi(path: string, method: HttpMethod, body?: any) {
  const apiUrl = process.env.REACT_APP_API_URL;

  if (!apiUrl) {
    throw new Error("API URL not defined");
  }

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  // eslint-disable-next-line no-useless-concat
  const response = fetch("http://" + `${apiUrl}${path}`, options)
    .then((data) => {
      if (!data.ok) {
        throw new Error("Network response was not ok");
      }
      return data.json();
    })
    .catch((error) => {
      console.log("error:", error.message);
    });

  // fetch("https://" + `${apiUrl}${path}`, requestOptions)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setResponseData(data);
  //       console.log(data);
  //       setLoading(false);
  //       return true;
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //       setError(error?.message);
  //     });
  // fetch(getTreeUrl)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log("treedat", JSON.parse(data[0].treeValue));
  //     setData(JSON.parse(data[0].treeValue)); // Assuming the API returns an array of treeValue fields
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching tree data:", error);
  //   });

  return response;
}
