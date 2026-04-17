module.exports = ({ titulo, autor, genero, ano }) => {
    if (!titulo || typeof titulo !== 'string') {
        return "Título inválido";
    }
    if (!autor || typeof autor !== 'string') {
        return "Autor inválido";
    }
    if (ano && (ano < 0 || ano > new Date().getFullYear())) {
        return "Ano inválido";
    }
    return null;
};