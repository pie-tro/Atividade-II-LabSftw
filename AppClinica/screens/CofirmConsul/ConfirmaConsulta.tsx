import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStyle } from "./ConfirmConsulStyle";

type StatusConsulta = 'pendente' | 'confirmada' | 'nao_compareceu';

interface Consulta {
    id: string;
    cliente: string;
    medico: string;
    especialidade: string;
    horario: string;
    status: StatusConsulta;
}

const consultasIniciais: Consulta[] = [
    {
        id: '1',
        cliente: 'Felipe',
        medico: 'Dr. Silva',
        especialidade: 'Cardiologia',
        horario: '7:00 - 7:30',
        status: 'pendente',
    },
    {
        id: '2',
        cliente: 'Artur',
        medico: 'Dra. Lima',
        especialidade: 'Clínica Geral',
        horario: '8:00 - 8:30',
        status: 'pendente',
    },
    {
        id: '3',
        cliente: 'Pietro',
        medico: 'Dr. Costa',
        especialidade: 'Ortopedia',
        horario: '9:00 - 9:30',
        status: 'pendente',
    },
    {
        id: '4',
        cliente: 'Felipe',
        medico: 'Dr. Costa',
        especialidade: 'Ortopedia',
        horario: '10:00 - 10:30',
        status: 'pendente',
    },
];

function getDataHojeBR(): string {
    return new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function ConfirmacaoTela() {
    const styles = getStyle();

    const [consultas, setConsultas] = useState<Consulta[]>(consultasIniciais);
    const [modalConsulta, setModalConsulta] = useState<Consulta | null>(null);
    const [modalTipo, setModalTipo] = useState<'confirmar' | 'nao_compareceu' | null>(null);
    const [modalSucesso, setModalSucesso] = useState<string | null>(null);

    const pendentes = consultas.filter(c => c.status === 'pendente');
    const resolvidas = consultas.filter(c => c.status !== 'pendente');

    function abrirModal(consulta: Consulta, tipo: 'confirmar' | 'nao_compareceu') {
        setModalConsulta(consulta);
        setModalTipo(tipo);
    }

    function fecharModal() {
        setModalConsulta(null);
        setModalTipo(null);
    }

    function executarAcao() {
        if (!modalConsulta || !modalTipo) return;

        const novoStatus: StatusConsulta =
            modalTipo === 'confirmar' ? 'confirmada' : 'nao_compareceu';

        setConsultas(prev =>
            prev.map(c =>
                c.id === modalConsulta.id ? { ...c, status: novoStatus } : c
            )
        );

        const msg =
            modalTipo === 'confirmar'
                ? `Consulta de ${modalConsulta.cliente} confirmada!`
                : `Não comparecimento de ${modalConsulta.cliente} registrado.`;

        fecharModal();
        setModalSucesso(msg);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.titulo}>Confirmação de Consultas</Text>
                <Text style={styles.dataHoje}>{getDataHojeBR()}</Text>

                {/* Resumo */}
                <View style={styles.resumoRow}>
                    <View style={[styles.resumoCard, styles.resumoCardPendente]}>
                        <Text style={styles.resumoNumero}>{pendentes.length}</Text>
                        <Text style={styles.resumoLabel}>Pendentes</Text>
                    </View>
                    <View style={[styles.resumoCard, styles.resumoCardConfirmada]}>
                        <Text style={styles.resumoNumero}>
                            {consultas.filter(c => c.status === 'confirmada').length}
                        </Text>
                        <Text style={styles.resumoLabel}>Confirmadas</Text>
                    </View>
                    <View style={[styles.resumoCard, styles.resumoCardAusente]}>
                        <Text style={styles.resumoNumero}>
                            {consultas.filter(c => c.status === 'nao_compareceu').length}
                        </Text>
                        <Text style={styles.resumoLabel}>Ausentes</Text>
                    </View>
                </View>

                {/* Lista de pendentes */}
                <Text style={styles.secaoTitulo}>Aguardando Confirmação</Text>

                {pendentes.length === 0 ? (
                    <View style={styles.vazioContainer}>
                        <Text style={styles.vazioTexto}>
                            Todas as consultas do dia foram processadas.
                        </Text>
                    </View>
                ) : (
                    pendentes.map(consulta => (
                        <View key={consulta.id} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardHorario}>{consulta.horario}</Text>
                                <View style={styles.badgePendente}>
                                    <Text style={styles.badgeTexto}>Pendente</Text>
                                </View>
                            </View>

                            <Text style={styles.cardCliente}>{consulta.cliente}</Text>

                            <View style={styles.cardInfoRow}>
                                <Text style={styles.cardInfoLabel}>Médico:</Text>
                                <Text style={styles.cardInfoValor}>{consulta.medico}</Text>
                            </View>
                            <View style={styles.cardInfoRow}>
                                <Text style={styles.cardInfoLabel}>Especialidade:</Text>
                                <Text style={styles.cardInfoValor}>{consulta.especialidade}</Text>
                            </View>

                            <View style={styles.cardAcoes}>
                                <TouchableOpacity
                                    style={[styles.btnAcao, styles.btnConfirmar]}
                                    onPress={() => abrirModal(consulta, 'confirmar')}
                                >
                                    <Text style={styles.btnAcaoTexto}>✓  Confirmar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.btnAcao, styles.btnAusente]}
                                    onPress={() => abrirModal(consulta, 'nao_compareceu')}
                                >
                                    <Text style={styles.btnAcaoTexto}>✕  Não Compareceu</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
                {resolvidas.length > 0 && (
                    <>
                        <Text style={styles.secaoTitulo}>Processadas</Text>
                        {resolvidas.map(consulta => (
                            <View
                                key={consulta.id}
                                style={[
                                    styles.card,
                                    consulta.status === 'confirmada'
                                        ? styles.cardConfirmada
                                        : styles.cardAusente,
                                ]}
                            >
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardHorario}>{consulta.horario}</Text>
                                    <View
                                        style={
                                            consulta.status === 'confirmada'
                                                ? styles.badgeConfirmada
                                                : styles.badgeAusente
                                        }
                                    >
                                        <Text style={styles.badgeTexto}>
                                            {consulta.status === 'confirmada'
                                                ? 'Confirmada'
                                                : 'Não Compareceu'}
                                        </Text>
                                    </View>
                                </View>

                                <Text style={[styles.cardCliente, styles.cardClienteResolvido]}>
                                    {consulta.cliente}
                                </Text>

                                <View style={styles.cardInfoRow}>
                                    <Text style={styles.cardInfoLabel}>Médico:</Text>
                                    <Text style={styles.cardInfoValor}>{consulta.medico}</Text>
                                </View>
                                <View style={styles.cardInfoRow}>
                                    <Text style={styles.cardInfoLabel}>Especialidade:</Text>
                                    <Text style={styles.cardInfoValor}>{consulta.especialidade}</Text>
                                </View>
                            </View>
                        ))}
                    </>
                )}
            </ScrollView>

            <Modal
                visible={modalConsulta !== null}
                transparent
                animationType="fade"
                onRequestClose={fecharModal}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitulo}>
                            {modalTipo === 'confirmar'
                                ? 'Confirmar Presença'
                                : 'Registrar Não Comparecimento'}
                        </Text>

                        {modalConsulta && (
                            <View style={styles.modalInfo}>
                                <Text style={styles.modalCliente}>{modalConsulta.cliente}</Text>
                                <Text style={styles.modalDetalhe}>
                                    {modalConsulta.horario} · {modalConsulta.medico}
                                </Text>
                                <Text style={styles.modalDetalhe}>
                                    {modalConsulta.especialidade}
                                </Text>
                            </View>
                        )}

                        <Text style={styles.modalPergunta}>
                            {modalTipo === 'confirmar'
                                ? 'Deseja confirmar a presença do paciente?'
                                : 'Deseja registrar o não comparecimento do paciente?'}
                        </Text>

                        <View style={styles.modalAcoes}>
                            <TouchableOpacity
                                style={styles.modalCancel}
                                onPress={fecharModal}
                            >
                                <Text style={styles.modalCancelText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.modalConfirm,
                                    modalTipo === 'nao_compareceu' && styles.modalConfirmAusente,
                                ]}
                                onPress={executarAcao}
                            >
                                <Text style={styles.modalConfirmText}>
                                    {modalTipo === 'confirmar' ? 'Confirmar' : 'Registrar'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={modalSucesso !== null}
                transparent
                animationType="fade"
                onRequestClose={() => setModalSucesso(null)}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalSucessoTexto}>{modalSucesso}</Text>
                        <TouchableOpacity
                            style={styles.modalConfirm}
                            onPress={() => setModalSucesso(null)}
                        >
                            <Text style={styles.modalConfirmText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}