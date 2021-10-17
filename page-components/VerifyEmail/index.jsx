import { ButtonLink } from '@/components/Button';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import { Text } from '@/components/Text';
import Link from 'next/link';
import styles from './VerifyEmail.module.css';

export const VerifyEmail = ({ valid }) => {
  return (
    <Wrapper className={styles.root}>
      <Container column alignItems="center">
        <Text
          className={styles.text}
          color={valid ? 'success-light' : 'secondary'}
        >
          {valid
            ? 'Obrigado por verificar seu endereço de email. Você pode fechar esta página.'
            : 'Parece que você clicou em um link inválido. Feche esta janela e tente novamente.'}
        </Text>
        <Spacer size={4} axis="vertical" />
        <Link href="/" passHref>
          <ButtonLink variant="ghost" type="success" size="large">
            Voltar para a home
          </ButtonLink>
        </Link>
      </Container>
    </Wrapper>
  );
};
