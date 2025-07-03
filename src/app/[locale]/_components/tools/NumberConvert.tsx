import { useFormatter } from "next-intl";

const NumberConvert = ({
    number,
    minDecimal,
    label,
  }: {
    number: number;
    minDecimal: any;
    label: string;
  }) => {

    const format = useFormatter();
    return (
        <>
        {format.number(number, { maximumFractionDigits: minDecimal })} {label}
        </>
    );
}

export default NumberConvert;