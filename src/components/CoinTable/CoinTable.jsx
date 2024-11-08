import { useState } from "react";
import { fetchCoinDataCall } from "../../services/fetchCoinData";
import { useQuery } from "react-query";

function CoinTable({ currency }) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery(
    ["coins", page, currency],
    () => fetchCoinDataCall(page, currency),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      //   retry: 2,
      //   retryDelay: 1000,
      cacheTime: 1000 * 60 * 2,
      staleTime: 1000 * 60 * 2,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  //   const coinData = Array.isArray(data) ? data : [];
  //   console.log(coinData);
  return (
    <div className="my-5 flex flex-col items-center justify-center gap-5 w-[80vw] mx-auto">
      <div className="w-full py-4 px-2 flex items-center justify-center bg-yellow-400 text-black font-semibold">
        {/* Header Of the table */}
        <div className="basis-[40%]">Coin</div>
        <div className="basis-[20%]">Price</div>
        <div className="basis-[20%]">24H Change</div>
        <div className="basis-[20%]">Market Cap</div>
      </div>

      <div className="flex flex-col w-[80vw] mx-auto">
        {isLoading && <div>Loading...</div>}
        {data &&
          data.data.map((coin) => {
            return (
              <div
                onClick={() => handleCoinRedirect(coin.id)}
                key={coin.id}
                className="w-full bg-transparent text-white flex py-4 px-2 font-semibold items-center justify-between cursor-pointer"
              >
                <div className="flex items-center justify-start gap-3 basis-[40%]">
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={coin.image}
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="text-3xl">{coin.name}</div>
                    <div className="text-xl">{coin.symbol}</div>
                  </div>
                </div>

                <div className="basis-[20%]">{coin.current_price}</div>
                <div className="basis-[20%]">{coin.price_change_24h}</div>
                <div className="basis-[20%]">{coin.market_cap}</div>
              </div>
            );
          })}
      </div>
      <div className="flex gap-4 justify-center items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-primary btn-wide text-white text-2xl"
        >
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="btn btn-secondary btn-wide text-white text-2xl"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CoinTable;
