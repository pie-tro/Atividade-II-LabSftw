import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { getStyle } from './LoginStyle';
 
export function LoginTela() {
    const styles = getStyle();
 
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
 
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* Cabeçalho / Logo */}
                <View style={styles.cabecalho}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoIcone}>🏥</Text>
                    </View>
                    <Text style={styles.appNome}>AppClínica</Text>
                    <Text style={styles.appSubtitulo}>Sistema de Gestão Médica</Text>
                </View>
 
                {/* Card de Login */}
                <View style={styles.card}>
                    <Text style={styles.cardTitulo}>Entrar na Conta</Text>
                    <Text style={styles.cardSubtitulo}>
                        Insira suas credenciais para acessar o sistema
                    </Text>
 
                    {/* Campo E-mail */}
                    <View style={styles.campoContainer}>
                        <Text style={styles.campoLabel}>E-mail</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputIcone}>✉</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="seu@email.com"
                                placeholderTextColor="#a0aec0"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>
 
                    {/* Campo Senha */}
                    <View style={styles.campoContainer}>
                        <Text style={styles.campoLabel}>Senha</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputIcone}>🔒</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor="#a0aec0"
                                value={senha}
                                onChangeText={setSenha}
                                secureTextEntry={!senhaVisivel}
                            />
                            <TouchableOpacity
                                onPress={() => setSenhaVisivel(v => !v)}
                                style={styles.senhaToggle}
                            >
                                <Text style={styles.senhaToggleTexto}>
                                    {senhaVisivel ? '🙈' : '👁'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
 
                
                    {/* Botão Entrar */}
                    <TouchableOpacity style={styles.btnEntrar}>
                        <Text style={styles.btnEntrarTexto}>Entrar</Text>
                    </TouchableOpacity>
 
                    {/* Divider */}
                    <View style={styles.dividerRow}>
                        <View style={styles.dividerLinha} />
                        <Text style={styles.dividerTexto}>ou</Text>
                        <View style={styles.dividerLinha} />
                    </View>
 
                    {/* Perfis de acesso rápido (mockup) */}
                    <Text style={styles.perfilLabel}>Acessar como:</Text>
                    <View style={styles.perfilRow}>
                        <TouchableOpacity style={styles.perfilBtn}>
                            <Text style={styles.perfilIcone}>👨‍⚕️</Text>
                            <Text style={styles.perfilTexto}>Médico</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.perfilBtn}>
                            <Text style={styles.perfilIcone}>🧑‍💼</Text>
                            <Text style={styles.perfilTexto}>Recepção</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.perfilBtn}>
                            <Text style={styles.perfilIcone}>🛡️</Text>
                            <Text style={styles.perfilTexto}>Admin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
 
                {/* Rodapé */}
                <Text style={styles.rodape}>
                    © 2025 AppClínica · Todos os direitos reservados
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
