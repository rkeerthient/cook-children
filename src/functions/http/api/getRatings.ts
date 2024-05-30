import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";
const getAssets = async (
  request: PagesHttpRequest
): Promise<PagesHttpResponse> => {
  const { npi } = request.queryParams;
  const getFieldsResponse = await fetch(
    `https://w5aug03g03.execute-api.us-east-1.amazonaws.com/prod/reviews/person/2102599/${npi}?perPage=1&page=1`
  );

  const resp = await getFieldsResponse.json();
  console.log(JSON.stringify(resp));

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default getAssets;
