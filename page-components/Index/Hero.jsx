import { ButtonLink } from '@/components/Button';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <Wrapper>
      <div>
        <img src="./images/logo1.png" alt=""/>
        <Spacer axis="vertical" size={5} />
        <hr />
        <Spacer axis="vertical" size={2} />
        <h1 className={styles.title}>
          <span className={styles.nextjs}>DELIVERY</span>
          <span className={styles.mongodb}>para Camaragibe e regiões</span>
        </h1>
        <Spacer axis="vertical" size={2} />
        <hr />
        <Container>
          
          nossos produtos
        </Container>
        <Container justifyContent="center" className={styles.buttons}>
          <Container>
            <Link passHref href="/feed">
              <ButtonLink className={styles.button}>Explore Feed</ButtonLink>
            </Link>
          </Container>
          <Spacer axis="horizontal" size={1} />
          <Container>
            <ButtonLink
              href="/sign-up"
              type="secondary"
              className={styles.button}
            >
              faça seu cadastro
            </ButtonLink>
          </Container>
        </Container>
        <p className={styles.subtitle}>
          entre em contato pelo
          número : (81) 98533 0400
        </p>
      </div>
    </Wrapper>
  );
};

export default Hero;
