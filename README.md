Membros do Grupo:
Artur Henrique Cruz da Silva
Felipe Santos Nascimento 
Pietro Maia Fernandes

DEPENDENCIAS NECESSÁRIAS PARA O FUNCIONAMENTO DO APP:
npm install
npx expo install react-native-safe-area-context
npx expo install @react-native-picker/picker

FLUXO DO APP PARA TESTES:
o Fluxo de Agendamento e Cadastros (Recepção), ao efetuar o login padrão, abre-se a tela de Marcação de Consulta; nela, quando um paciente ou médico é selecionado,
o app busca os dados no Firebase e preenche automaticamente os campos de telefone, endereço ou especialidade.
Caso eles não existam no banco, os seletores possuem as opções "+ Cadastrar novo cliente" e "+ Cadastrar novo médico" que redirecionam o usuário para as telas exclusivas
de cadastro (com salvamento e exclusão), permitindo retornar à marcação pelo botão "Voltar". Após definir o tipo de consulta (Normal, Primeira ou Retorno) e o horário
na grade médica, os dados são salvos no Firestore, levando às telas de Confirmação e Histórico. Por fim, a tela de login também disponibiliza o Fluxo do Médico, 
que abre diretamente a interface de atendimento (RealizaConsultaTela), e o Fluxo de Encerramento, que direciona para a interface de fechamento e faturamento
pós-consulta (EncerramentoConsultaTela).
