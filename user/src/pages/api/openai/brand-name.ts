import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = req.body;
  console.log(data);
  // const auth = process.env.GODADDY_API_AUTH_VALUE;
  // const headers = {
  //   "Content-Type": "application/json",
  //   Authorization: `sso-key ${auth}`,
  // };

  // try {
  //   const promises = data.map(async (obj: any) => {
  //     const queryParams = `query=${obj.title}&country=IN&city=delhi&tlds=co.in, co.uk, tech, org&limit=10`;

  //     // First API call
  //     const response = await fetch(
  //       `${process.env.GODADDY_API_ENDPOINT}/domains/suggest?${queryParams}`,
  //       {
  //         method: "GET",
  //         headers: headers,
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const responseData = await response.json();
  //     const valuesArray = responseData.map((obj: any) => obj.domain);

  //     // Second API call
  //     const secondResponse = await fetch(
  //       `${process.env.GODADDY_API_ENDPOINT}/domains/available`,
  //       {
  //         method: "POST",
  //         headers: headers,
  //         body: JSON.stringify(valuesArray),
  //       }
  //     );

  //     if (!secondResponse.ok) {
  //       throw new Error(`HTTP error! Status: ${secondResponse.status}`);
  //     }

  //     const secondResponseData = await secondResponse.json();

  //     return {
  //       [obj.title]: secondResponseData,
  //     };
  //   });

  //   const results = await Promise.all(promises);

  //   console.log(results, "results");

  //   return res.status(200).json(results);
  // } catch (error) {
  //   console.error("Error:", error);
  //   return res.status(500).json({ message: error });
  // }
}
