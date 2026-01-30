import { useCurrency } from "@/context/currencyContext";

const PriceConvert = ({
  price,
  minDecimal,
}: {
  price: number;
  minDecimal: any;
}) => {

  const { convertPrice } = useCurrency();

  return (
    <>
      {convertPrice(price).formatted}
    </>
  );
}

export default PriceConvert;