import { useState, useContext, type FormEvent } from 'react';
import { Modal } from '../Modal';
import { ProjectsContext } from '../../contexts/ProjectContext';
import { FormContainer, FormGroup, Input, Label, SubmitButton } from '../Form/styles';
import { createFuncionario, type FuncionarioPayload } from '../../services/api';

export function CreateEmployeeModal() {
    const { isEmployeeCreateModalOpen, closeEmployeeCreateModal, refreshData } = useContext(ProjectsContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);


        const form = event.target as HTMLFormElement;
        const data = Object.fromEntries(new FormData(form).entries());


        if (data.senha !== data.confirmar_senha) {
            setError('As senhas não coincidem.');
            setIsLoading(false);
            return;
        }


        const payload: FuncionarioPayload = {
            nome: data.nome as string,
            sobrenome: data.sobrenome as string,
            email: data.email as string,
            senha: data.senha as string,
            cargo: data.cargo as string,
            departamento: data.departamento as string,
        };

        try {
            await createFuncionario(payload);

            alert('Funcionário criado com sucesso!');
            form.reset();
            closeEmployeeCreateModal();
            refreshData();
        } catch (err: any) {
            console.error(err);
            const errorMsg = err.response?.data?.detail || err.response?.data?.detalhe || 'Falha ao criar funcionário.';


            if (Array.isArray(errorMsg)) {
                const details = errorMsg.map((e: any) => e.msg).join('\n');
                setError(details);
            } else {
                setError(errorMsg);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isEmployeeCreateModalOpen} onClose={closeEmployeeCreateModal} title="Criar Novo Funcionário">
            <FormContainer onSubmit={handleSubmit} onReset={() => setError(null)}>
                <FormGroup>
                    <Label htmlFor="nome">Nome*</Label>
                    <Input id="nome" name="nome" type="text" required disabled={isLoading} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="sobrenome">Sobrenome*</Label>
                    <Input id="sobrenome" name="sobrenome" type="text" required disabled={isLoading} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="email">Email*</Label>
                    <Input id="email" name="email" type="email" placeholder="exemplo@ache.com" required disabled={isLoading} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="cargo">Cargo*</Label>
                    <Input id="cargo" name="cargo" type="text" placeholder="Ex: Desenvolvedor" required disabled={isLoading} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="departamento">Departamento*</Label>
                    <Input id="departamento" name="departamento" type="text" placeholder="Ex: TI" required disabled={isLoading} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="senha">Senha*</Label>
                    <Input id="senha" name="senha" type="password" required disabled={isLoading} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="confirmar_senha">Confirmar Senha*</Label>
                    <Input id="confirmar_senha" name="confirmar_senha" type="password" required disabled={isLoading} />
                </FormGroup>

                {error && <p style={{ color: 'red', textAlign: 'center', whiteSpace: 'pre-wrap' }}>{error}</p>}

                <SubmitButton type="submit" disabled={isLoading}>
                    {isLoading ? 'Criando...' : 'Criar Funcionário'}
                </SubmitButton>
            </FormContainer>
        </Modal>
    );
}