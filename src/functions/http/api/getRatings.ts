import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";
const getAssets = async (
  request: PagesHttpRequest
): Promise<PagesHttpResponse> => {
  const { npis, length } = request.queryParams;
  const getFieldsResponse = await fetch(
    `${YEXT_PUBLC_REVIEWS_URL}/person/${YEXT_PUBLIC_BUSINESS_ID}/${npis}?perPage=${length}&page=1`
  );

  const resp = await getFieldsResponse.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default getAssets;
