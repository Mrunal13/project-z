import Image from "next/image";
import s from "./logo.module.css";

export interface Props {
  showDefault?: boolean;
}

const Logo = ({ showDefault = true }: Props) => {
  return (
    <div className={s.headerwrapper}>
      <div className={s.logo}>
        <Image
          src={showDefault ? "/images/logo.svg" : "/images/logo-two.svg"}
          alt="logo"
          width={67}
          height={67}
        />
      </div>
    </div>
  );
};
export default Logo;
