import { Wallet, WalletPurpose } from "@/enums";
import { useBackgroundGenerator } from "@/hooks/use-generate-background";
import styles from './index.module.scss';
import { useEffect, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { BsDatabaseFill } from "react-icons/bs";

interface Props {
 purpose?: WalletPurpose;
}
export const FiatBalanceCard = ({}: Props) => {

  const {generateBackground} = useBackgroundGenerator();
  const [hide, setHide] = useState(false);
  const [currentWallet, setCurrentWallet] = useState<Wallet>();

  const hideBalance = () => setHide(!hide);

  return ( 
    <div className={styles.fiatCardWrapper}>
      {generateBackground()}

      <div className={styles.fiatCardHeader}>
        <div className={styles.icon}>
          <BsDatabaseFill size={18} color="#FFF" />
        </div>

        <button className={`${styles.withdrawButton} ${
            currentWallet ? styles.enabled : styles.disabled
          }`}>
          Withdraw Commissions
        </button>
      </div>

      <div className={styles.fiatBalanceInfo}>
        <p className={styles.totalText}>{`Total referrals Commission balance`}</p>

        <div className={styles.totalFiatBalance}>
          <div className={styles.totalFiatFigure}>
            {hide === true
              ? '****'
              : `200,000.00`
            }
          </div>

          <div className={styles.hideBalance} onClick={hideBalance}>
            {hide ? 
            <VscEye fill="#fff" /> : <VscEyeClosed fill="#fff"/> }
          </div>
        </div>
      </div>
    </div>
  );
}