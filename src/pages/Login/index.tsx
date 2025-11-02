import { useState, type FormEvent } from "react";
import { ArrowRightIcon, EnvelopeIcon, LockIcon } from "@phosphor-icons/react";

import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/Input";
import {
  Button,
  Container,
  Direita,
  Esquerda,
  Form,
  Img,
  Logo,
  Space,
  ErrorMessage
} from "./styles";

export const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.append('username', email);
      params.append('password', password);

      await login(params);

    } catch (err) {
      setError('Falha no login. Verifique seu e-mail e senha.');
      console.error("Erro no handleLogin:", err);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Container>
      <Esquerda>
        <Img src="/loginimage.png" alt="Empresa Ache" />
      </Esquerda>
      <Direita>
        <Form onSubmit={handleLogin}>
          <Logo>achē</Logo>
          <Space>
            <Input
              css={{ color: '#E4113F' }}
              type="email"
              placeholder="Email"
              placeholderColor="#E4113F"
              inputIcon={<EnvelopeIcon size={24} color="#E4113F" weight="regular" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
            <Input
              css={{ color: '#E4113F' }}
              placeholder="Senha"
              type="password"
              placeholderColor="#E4113F"
              inputIcon={<LockIcon size={24} color="#E4113F" weight="regular" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
              {!isLoading && <ArrowRightIcon size={24} weight="bold" />}
            </Button>
          </Space>
        </Form>
      </Direita>
    </Container>
  );
}