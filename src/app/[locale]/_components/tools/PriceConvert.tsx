import { useFormatter } from "next-intl";

const PriceConvert = ({
    price,
    minDecimal,
  }: {
    price: number;
    minDecimal: any;
  }) => {

    const format = useFormatter();



    return (
        <>
        {format.number(price, {style: 'currency', currency: 'AED', minimumFractionDigits: minDecimal })}
        </>
    );
}

export default PriceConvert;