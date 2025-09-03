import { Button, Container, Direita, Esquerda, Form, Img, Input, Logo, Space } from "./styles"

export const Login = () => {
  return (
    <Container>
      <Esquerda><Img src="/src/assets/loginimage.png" alt="Empresa Ache" /></Esquerda>
      <Direita>
        <Form>
          <Logo>achē</Logo>
          <Space>
            <Input placeholder="Email" />
            <Input placeholder="Senha" type="password" />
            <Button>Entrar</Button>
          </Space>
        </Form>
      </Direita>
    </Container>
  )
}
