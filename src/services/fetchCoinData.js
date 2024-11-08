import axiosInstance from "../helpers/axiosInstance";

export async function fetchCoinDataCall(page = 1, currency) {
  const perPage = 10;
  try {
    const responce = await axiosInstance.get(
      `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}`
    );
    return responce;
  } catch (error) {
    console.error(error);
    return null;
  }
}
