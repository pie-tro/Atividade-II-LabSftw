import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { getStyle } from './CadastroClienteStyle';
import { adicionarCliente, listarClientes, atualizarCliente, deletarCliente } from '../../services/firebaseService';

export function CadastroClienteTela({ darkMode = false }: any) {
    const styles = getStyle(darkMode);
    
    // Estados do formulário
    const [idSelecionado, setIdSelecionado] = useState<string | null>(null); // Guarda o ID se for edição
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [lista, setLista] = useState<any[]>([]);

    useEffect(() => {
        carregarLista();
    }, []);

    async function carregarLista() {
        try {
            const dados = await listarClientes();
            setLista(dados);
        } catch (error: any) {
            console.error("Erro ao listar:", error);
            Alert.alert('Erro ao carregar dados', 'Não foi possível buscar a lista de clientes.');
        }
    }

    async function handleSalvar() {
        if (!nome.trim() || !telefone.trim()) {
            Alert.alert('Atenção', 'Por favor, preencha pelo menos o Nome e o Telefone.');
            return;
        }

        try {
            if (idSelecionado) {
                // UPDATE: Se tem um ID selecionado, atualiza o existente
                await atualizarCliente(idSelecionado, { nome, telefone, endereco });
                Alert.alert('Sucesso', 'Cliente atualizado com sucesso!');
            } else {
                // CREATE: Se não tem ID selecionado, cria um novo
                await adicionarCliente({ nome, telefone, endereco });
                Alert.alert('Sucesso', 'Cliente cadastrado com sucesso!');
            }
            
            // Limpa o formulário e reseta o modo de edição
            handleCancelarEdicao();
            await carregarLista(); 
        } catch (error: any) {
            console.error("Erro ao salvar:", error);
            Alert.alert('Erro no Banco de Dados', error.message);
        }
    }

    // Função que joga os dados do Card de volta para os Inputs
    function handleIniciarEdicao(cliente: any) {
        setIdSelecionado(cliente.id);
        setNome(cliente.nome);
        setTelefone(cliente.telefone);
        setEndereco(cliente.endereco || '');
    }

    // Função para sair do modo de edição sem salvar
    function handleCancelarEdicao() {
        setIdSelecionado(null);
        setNome(''); 
        setTelefone(''); 
        setEndereco('');
    }

    async function handleExcluir(id: string) {
        try {
            await deletarCliente(id);
            if (idSelecionado === id) handleCancelarEdicao(); // Se deletar o que estava editando, limpa os campos
            await carregarLista();
            Alert.alert('Sucesso', 'Cliente removido com sucesso!');
        } catch (error: any) {
            console.error("Erro ao excluir:", error);
            Alert.alert('Erro ao deletar', 'Não foi possível remover o cliente do banco de dados.');
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* O título muda dinamicamente de acordo com o modo */}
                <Text style={styles.titulo}>{idSelecionado ? 'Editar Cliente' : 'Cadastro de Cliente'}</Text>
                
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome Completo</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Ex: João da Silva" 
                        placeholderTextColor={darkMode ? '#4b5563' : '#9ca3af'}
                        value={nome} 
                        onChangeText={setNome} 
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Telefone</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Ex: (11) 99999-9999" 
                        placeholderTextColor={darkMode ? '#4b5563' : '#9ca3af'}
                        value={telefone} 
                        onChangeText={setTelefone}
                        keyboardType="phone-pad" 
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Endereço</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Ex: Rua das Flores, 123" 
                        placeholderTextColor={darkMode ? '#4b5563' : '#9ca3af'}
                        value={endereco} 
                        onChangeText={setEndereco} 
                    />
                </View>

                {/* O botão muda de cor e texto quando está editando */}
                <TouchableOpacity 
                    style={[styles.btnSalvar, idSelecionado ? { backgroundColor: '#0284c7' } : null]} 
                    onPress={handleSalvar}
                >
                    <Text style={styles.btnSalvarText}>
                        {idSelecionado ? 'Atualizar Alterações' : 'Salvar Cliente'}
                    </Text>
                </TouchableOpacity>

                {/* Botão extra para cancelar a edição caso o usuário desista */}
                {idSelecionado && (
                    <TouchableOpacity 
                        style={[styles.btnSalvar, { backgroundColor: '#4b5563', marginTop: 8 }]} 
                        onPress={handleCancelarEdicao}
                    >
                        <Text style={styles.btnSalvarText}>Cancelar Edição</Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.sectionTitle}>Clientes Cadastrados (Toque para editar)</Text>
                
                {lista.length === 0 ? (
                    <Text style={{ textAlign: 'center', color: darkMode ? '#9ca3af' : '#4b5563', marginTop: 10 }}>
                        Nenhum cliente cadastrado ainda.
                    </Text>
                ) : (
                    lista.map((item) => (
                        /* Tornamos o Card clicável usando TouchableOpacity */
                        <TouchableOpacity 
                            key={item.id} 
                            style={styles.card}
                            onPress={() => handleIniciarEdicao(item)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardNome}>{item.nome}</Text>
                                <Text style={styles.cardTelefone}>{item.telefone}</Text>
                            </View>
                            
                            <TouchableOpacity 
                                style={styles.btnExcluir} 
                                onPress={() => handleExcluir(item.id)}
                            >
                                <Text style={styles.btnExcluirText}>Excluir</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                )}

            </ScrollView>
        </SafeAreaView>
    );
}