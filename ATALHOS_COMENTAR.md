# Atalhos para Comentar Linhas no Cursor/VS Code

## Atalhos Padrão Disponíveis:

### 1. **Ctrl + /** (Toggle Line Comment)
   - Comenta/descomenta a linha atual ou linhas selecionadas
   - **Este é o atalho mais comum**

### 2. **Ctrl + K, Ctrl + C** (Add Line Comment)
   - Adiciona comentário na(s) linha(s) selecionada(s)
   - Pressione Ctrl + K, solte, depois Ctrl + C

### 3. **Ctrl + K, Ctrl + U** (Remove Line Comment)
   - Remove comentário da(s) linha(s) selecionada(s)
   - Pressione Ctrl + K, solte, depois Ctrl + U

### 4. **Ctrl + Shift + /** (Toggle Block Comment)
   - Comenta/descomenta como bloco (útil para CSS: /* */)

## Se o Ctrl + / não está funcionando:

### Solução 1: Verificar conflitos
1. Pressione **Ctrl + K, Ctrl + S** (abre Keyboard Shortcuts)
2. Procure por `ctrl+/`
3. Veja se há algum conflito ou se está desabilitado

### Solução 2: Usar atalho alternativo
Use **Ctrl + K, Ctrl + C** para comentar e **Ctrl + K, Ctrl + U** para descomentar

### Solução 3: Configurar manualmente
1. Pressione **Ctrl + Shift + P**
2. Digite: `Preferences: Open Keyboard Shortcuts (JSON)`
3. Adicione:
```json
{
  "key": "ctrl+/",
  "command": "editor.action.commentLine",
  "when": "editorTextFocus && !editorReadonly"
}
```

### Solução 4: Verificar se o arquivo está salvo
- Certifique-se de que o arquivo está salvo (Ctrl + S)
- Alguns atalhos não funcionam em arquivos não salvos

### Solução 5: Reiniciar o Cursor
- Feche e abra o Cursor novamente
- Os keybindings do workspace podem precisar de reload

## Teste Rápido:
1. Abra um arquivo CSS/HTML/JS
2. Coloque o cursor em uma linha
3. Tente: **Ctrl + K, Ctrl + C** (deve comentar)
4. Tente: **Ctrl + K, Ctrl + U** (deve descomentar)

Se esses funcionarem, o problema é específico com o Ctrl + / e pode ser um conflito de sistema.

