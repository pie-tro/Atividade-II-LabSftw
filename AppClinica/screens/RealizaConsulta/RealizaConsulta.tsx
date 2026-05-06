import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { getStyle } from './RealizaConsultaStyle';

type Paciente = {
    id: string;
    nome: string;
    horario: string;
    idade: number;
    endereco: string;
    historico: string;
};

type FaseConsulta = 'selecao' | 'em_andamento' | 'finalizada';

const pacientesIniciais: Paciente[] = [
    {
        id: '1',
        nome: 'Juliana Ferreira',
        horario: '10:30 - 11:00',
        idade: 34,
        endereco: 'Rua das Flores, 120 - São Paulo, SP',
        historico:
            'Paciente com histórico de hipertensão leve. Última consulta em 12/03/2025 — PA 130/85 mmHg. Faz uso contínuo de Losartana 50mg. Sem alergias conhecidas. Relata episódios de cefaleia frequente nos últimos 30 dias.',
    },
    {
        id: '2',
        nome: 'Carlos Eduardo Silva',
        horario: '10:50 - 12:00',
        idade: 52,
        endereco: 'Av. Paulista, 1800 - Bela Vista, SP',
        historico:
            'Paciente diabético tipo 2 em acompanhamento desde 2021. HbA1c de 7,2% na última coleta. Em uso de Metformina 850mg. Refere sensação de formigamento nos pés. Encaminhado para avaliação com neuropatia.',
    },
];

type RealizaConsultaTelaProps = {
    darkMode?: boolean;
    onVoltar?: () => void;
};

export function RealizaConsultaTela({ darkMode = false, onVoltar }: RealizaConsultaTelaProps) {
    const styles = getStyle(darkMode);

    const [pacientes] = useState<Paciente[]>(pacientesIniciais);
    const [pacienteSelecionado, setPacienteSelecionado] = useState<Paciente | null>(null);
    const [fase, setFase] = useState<FaseConsulta>('selecao');
    const [laudo, setLaudo] = useState('');
    const [receita, setReceita] = useState('');
    const [modalFinalizar, setModalFinalizar] = useState(false);
    const [modalSucesso, setModalSucesso] = useState(false);

    function iniciarConsulta() {
        if (!pacienteSelecionado) return;
        setFase('em_andamento');
        setLaudo('');
        setReceita('');
    }

    function solicitarFinalizacao() {
        setModalFinalizar(true);
    }

    function confirmarFinalizacao() {
        setModalFinalizar(false);
        setFase('finalizada');
        setModalSucesso(true);
    }

    function novaConsulta() {
        setModalSucesso(false);
        setPacienteSelecionado(null);
        setFase('selecao');
        setLaudo('');
        setReceita('');
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {onVoltar && (
                    <TouchableOpacity style={styles.modalCancel} onPress={onVoltar}>
                        <Text style={styles.modalCancelText}>Voltar</Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.titulo}>Realização de Consulta</Text>
                <Text style={styles.subtitulo}>Dr. Ana · {new Date().toLocaleDateString('pt-BR')}</Text>

                {/* ── SEÇÃO 1: Lista de pacientes confirmados ── */}
                <Text style={styles.secaoTitulo}>Pacientes Confirmados</Text>

                {pacientes.map(paciente => {
                    const selecionado = pacienteSelecionado?.id === paciente.id;
                    return (
                        <TouchableOpacity
                            key={paciente.id}
                            style={[styles.pacienteCard, selecionado && styles.pacienteCardSelecionado]}
                            onPress={() => {
                                if (fase === 'selecao') setPacienteSelecionado(paciente);
                            }}
                            activeOpacity={fase === 'selecao' ? 0.7 : 1}
                        >
                            <View style={styles.pacienteCardRow}>
                                <View style={[styles.checkCircle, selecionado && styles.checkCircleAtivo]}>
                                    {selecionado && <Text style={styles.checkMark}>✓</Text>}
                                </View>
                                <View style={styles.pacienteInfo}>
                                    <Text style={[styles.pacienteNome, selecionado && styles.pacienteNomeSelecionado]}>
                                        {paciente.nome}
                                    </Text>
                                    <Text style={styles.pacienteHorario}>{paciente.horario}</Text>
                                </View>
                                {selecionado && (
                                    <View style={styles.badgeSelecionado}>
                                        <Text style={styles.badgeSelecionadoTexto}>Selecionado</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}

                {/* Botão Iniciar Consulta */}
                {fase === 'selecao' && (
                    <TouchableOpacity
                        style={[styles.btnIniciar, !pacienteSelecionado && styles.btnDesabilitado]}
                        onPress={iniciarConsulta}
                        disabled={!pacienteSelecionado}
                    >
                        <Text style={styles.btnIniciarTexto}>▶  Iniciar Consulta</Text>
                    </TouchableOpacity>
                )}

                {/* ── SEÇÃO 2: Dados do paciente + Histórico ── */}
                {(fase === 'em_andamento' || fase === 'finalizada') && pacienteSelecionado && (
                    <>
                        <Text style={styles.secaoTitulo}>Dados do Paciente</Text>
                        <View style={styles.dadosCard}>
                            <View style={styles.dadosRow}>
                                <View style={styles.dadoItem}>
                                    <Text style={styles.dadoLabel}>Idade</Text>
                                    <Text style={styles.dadoValor}>{pacienteSelecionado.idade} anos</Text>
                                </View>
                            </View>
                            <View style={styles.dadosSeparador} />
                            <Text style={styles.dadoLabel}>Endereço</Text>
                            <Text style={styles.dadoValor}>{pacienteSelecionado.endereco}</Text>
                        </View>

                        <Text style={styles.secaoTitulo}>Histórico de Atendimentos</Text>
                        <View style={styles.historicoCard}>
                            <Text style={styles.historicoTexto}>{pacienteSelecionado.historico}</Text>
                        </View>

                        {/* ── SEÇÃO 3: Laudo ── */}
                        <Text style={styles.secaoTitulo}>Laudo</Text>
                        <View style={styles.textAreaCard}>
                            <TextInput
                                style={styles.textArea}
                                placeholder="Descreva o laudo médico da consulta..."
                                placeholderTextColor="#a0aec0"
                                value={laudo}
                                onChangeText={setLaudo}
                                multiline
                                editable={fase === 'em_andamento'}
                                textAlignVertical="top"
                            />
                        </View>

                        {/* ── SEÇÃO 4: Receita ── */}
                        <Text style={styles.secaoTitulo}>Receita Médica</Text>
                        <View style={styles.textAreaCard}>
                            <TextInput
                                style={styles.textArea}
                                placeholder="Informe os medicamentos e posologia..."
                                placeholderTextColor="#a0aec0"
                                value={receita}
                                onChangeText={setReceita}
                                multiline
                                editable={fase === 'em_andamento'}
                                textAlignVertical="top"
                            />
                        </View>

                        {/* Botão Confirmar / Finalizar */}
                        {fase === 'em_andamento' && (
                            <TouchableOpacity
                                style={styles.btnConfirmar}
                                onPress={solicitarFinalizacao}
                            >
                                <Text style={styles.btnConfirmarTexto}>✓  Finalizar Consulta</Text>
                            </TouchableOpacity>
                        )}

                        {fase === 'finalizada' && (
                            <View style={styles.finalizadaBanner}>
                                <Text style={styles.finalizadaTexto}>
                                    ✓ Consulta finalizada com sucesso
                                </Text>
                            </View>
                        )}
                    </>
                )}
            </ScrollView>

            {/* Modal confirmação finalizar */}
            <Modal
                visible={modalFinalizar}
                transparent
                animationType="fade"
                onRequestClose={() => setModalFinalizar(false)}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitulo}>Finalizar Consulta</Text>
                        {pacienteSelecionado && (
                            <View style={styles.modalInfo}>
                                <Text style={styles.modalCliente}>{pacienteSelecionado.nome}</Text>
                                <Text style={styles.modalDetalhe}>{pacienteSelecionado.horario}</Text>
                            </View>
                        )}
                        <Text style={styles.modalPergunta}>
                            Deseja encerrar o atendimento e salvar laudo e receita?
                        </Text>
                        <View style={styles.modalAcoes}>
                            <TouchableOpacity
                                style={styles.modalCancel}
                                onPress={() => setModalFinalizar(false)}
                            >
                                <Text style={styles.modalCancelText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalConfirm}
                                onPress={confirmarFinalizacao}
                            >
                                <Text style={styles.modalConfirmText}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal sucesso */}
            <Modal
                visible={modalSucesso}
                transparent
                animationType="fade"
                onRequestClose={novaConsulta}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalSucessoIcone}>✅</Text>
                        <Text style={styles.modalTitulo}>Atendimento Finalizado</Text>
                        <Text style={styles.modalSucessoTexto}>
                            A consulta de {pacienteSelecionado?.nome} foi encerrada e registrada com sucesso.
                        </Text>
                        <TouchableOpacity style={styles.modalConfirm} onPress={novaConsulta}>
                            <Text style={styles.modalConfirmText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}