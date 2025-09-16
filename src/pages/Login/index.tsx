import { ArrowRightIcon, EnvelopeIcon, LockIcon } from "@phosphor-icons/react"
import { Input } from "../../components/Input"
import { Button, Container, Direita, Esquerda, Form, Img, Logo, Space } from "./styles"
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/flow');
  };


  return (
    <Container>
      <Esquerda><Img src="/src/assets/loginimage.png" alt="Empresa Ache" /></Esquerda>
      <Direita>
        <Form>
          <Logo>achē</Logo>
          <Space>
            <Input
              css={{ color: '#E4113F' }}
              type="email"
              placeholder="Email"
              placeholderColor="#E4113F"
              inputIcon={<EnvelopeIcon size={24} color="#E4113F" weight="regular" />}
            />
            <Input
              css={{ color: '#E4113F' }}
              placeholder="Senha"
              type="password"
              placeholderColor="#E4113F"
              inputIcon={<LockIcon size={24} color="#E4113F" weight="regular" />}
            />
            <Button onClick={handleLogin}>
              Entrar<ArrowRightIcon size={24} weight="bold" />
            </Button>
          </Space>
        </Form>
      </Direita>
    </Container>
  )
}
