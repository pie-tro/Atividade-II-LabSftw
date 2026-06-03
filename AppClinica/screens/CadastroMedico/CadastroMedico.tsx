
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { getStyle } from './CadastroMedicoStyle'; // <--- Importando de forma limpa da mesma pasta
import { adicionarMedico, listarMedicos, deletarMedico } from '../../services/firebaseService';

export function CadastroMedicoTela({ darkMode = false }: any) {
    const styles = getStyle(darkMode);
    
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [lista, setLista] = useState<any[]>([]);

    useEffect(() => {
        carregarLista();
    }, []);

    async function carregarLista() {
        try {
            const dados = await listarMedicos();
            setLista(dados);
        } catch (error: any) {
            console.error("Erro ao listar médicos:", error);
            Alert.alert('Erro ao carregar dados', 'Não foi possível buscar a lista de médicos.');
        }
    }

    async function handleSalvar() {
        if (!nome.trim() || !especialidade.trim()) {
            Alert.alert('Atenção', 'Por favor, preencha pelo menos o Nome e a Especialidade.');
            return;
        }

        try {
            await adicionarMedico({ nome, telefone, especialidade });
            
            setNome(''); 
            setTelefone(''); 
            setEspecialidade('');
            await carregarLista(); 
            
            Alert.alert('Sucesso', 'Médico cadastrado com sucesso!');
        } catch (error: any) {
            console.error("Erro ao salvar médico:", error);
            Alert.alert('Erro no Banco de Dados', error.message);
        }
    }

    async function handleExcluir(id: string) {
        try {
            await deletarMedico(id);
            await carregarLista();
            Alert.alert('Sucesso', 'Médico removido com sucesso!');
        } catch (error: any) {
            console.error("Erro ao excluir médico:", error);
            Alert.alert('Erro ao deletar', 'Não foi possível remover o médico do banco de dados.');
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                <Text style={styles.titulo}>Cadastro de Médico</Text>
                
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome do Médico</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Ex: Dr. Carlos Silva" 
                        placeholderTextColor={darkMode ? '#4b5563' : '#9ca3af'}
                        value={nome} 
                        onChangeText={setNome} 
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Especialidade</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Ex: Cardiologia, Ortopedia..." 
                        placeholderTextColor={darkMode ? '#4b5563' : '#9ca3af'}
                        value={especialidade} 
                        onChangeText={setEspecialidade} 
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Telefone / Contato</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Ex: (11) 99999-9999" 
                        placeholderTextColor={darkMode ? '#4b5563' : '#9ca3af'}
                        value={telefone} 
                        onChangeText={setTelefone}
                        keyboardType="phone-pad" 
                    />
                </View>

                <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
                    <Text style={styles.btnSalvarText}>Salvar Médico</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Médicos Cadastrados</Text>
                
                {lista.length === 0 ? (
                    <Text style={{ textAlign: 'center', color: darkMode ? '#9ca3af' : '#4b5563', marginTop: 10 }}>
                        Nenhum médico cadastrado ainda.
                    </Text>
                ) : (
                    lista.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardNome}>{item.nome}</Text>
                                <Text style={styles.cardTelefone}>{item.especialidade} {item.telefone ? `- ${item.telefone}` : ''}</Text>
                            </View>
                            
                            <TouchableOpacity 
                                style={styles.btnExcluir} 
                                onPress={() => handleExcluir(item.id)}
                            >
                                <Text style={styles.btnExcluirText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}

            </ScrollView>
        </SafeAreaView>
    );
}