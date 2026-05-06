import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { getStyle } from './CadastroClienteStyle';

type CadastroClienteTelaProps = {
    darkMode?: boolean;
    onVoltar?: () => void;
};

export function CadastroClienteTela({ darkMode = false, onVoltar }: CadastroClienteTelaProps) {
    const styles = getStyle(darkMode);

    const [cliente, setCliente] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [mensagem, setMensagem] = useState('');

    function handleSalvar() {
        if (!cliente.trim() || !telefone.trim() || !endereco.trim()) {
            setMensagem('Preencha cliente, telefone e endereco.');
            return;
        }

        setMensagem('Cadastro salvo com sucesso.');
        setCliente('');
        setTelefone('');
        setEndereco('');
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <Text style={styles.titulo}>Cadastro de Cliente</Text>

                <Text style={styles.label}>Cliente</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do cliente"
                    value={cliente}
                    onChangeText={setCliente}
                />

                <Text style={styles.label}>Telefone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="(00) 00000-0000"
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
                />

                <Text style={styles.label}>Endereco</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Rua, numero, bairro"
                    value={endereco}
                    onChangeText={setEndereco}
                />

                {mensagem.length > 0 && (
                    <View style={styles.mensagemContainer}>
                        <Text style={styles.mensagemTexto}>{mensagem}</Text>
                    </View>
                )}

                <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
                    <Text style={styles.btnSalvarText}>Salvar</Text>
                </TouchableOpacity>

                {onVoltar && (
                    <TouchableOpacity style={styles.btnVoltar} onPress={onVoltar}>
                        <Text style={styles.btnVoltarText}>Voltar para agendamento</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
