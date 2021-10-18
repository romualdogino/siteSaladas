import { Text } from '@/components/Text';
import styles from './Footer.module.css';
import Spacer from './Spacer';
import Wrapper from './Wrapper';

const Footer = () => {
  return (
    <>
      <footer className="uk-section">
        <div className="uk-container">
          <Wrapper>
            <Text className={styles.fim} color="accents-7">
              Adaptado por Romualdo <span>&#169;</span> 2021
            </Text>
            <Spacer size={2} axis="vertical" />
          </Wrapper>
        </div>
      </footer>
    </>
  );
};

export default Footer;
