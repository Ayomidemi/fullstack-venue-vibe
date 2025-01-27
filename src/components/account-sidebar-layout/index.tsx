import classNames from 'classnames';
import styles from './index.module.scss';
import SideBar from './sidebar';
import NavBar from '../navbar';

interface Props {
  children: React.ReactNode;
  navbarColor?: boolean;
}

export const AccountSideBar = ({ children, navbarColor = false }: Props) => {
  const showNav = true;

  return (
    <div className={classNames({ [styles.Layout || '']: showNav })}>
      {showNav ? (
        <nav>
          <SideBar navbarColor={navbarColor} />
        </nav>
      ) : null}

      <main className={styles.main_wrapperr}>
        <NavBar />
        {children}
      </main>
    </div>
  );
};

export default AccountSideBar;
