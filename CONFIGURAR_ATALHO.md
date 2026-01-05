# Como Configurar o Atalho Ctrl + / para Comentar Linhas

## Método 1: Através da Interface do Cursor (Recomendado)

1. Pressione **Ctrl + K, Ctrl + S** (ou vá em **File > Preferences > Keyboard Shortcuts**)
2. Na barra de pesquisa, digite: `comment line`
3. Procure pelo comando **"Toggle Line Comment"** ou **"Comment Line"**
4. Clique duas vezes no atalho atual (ou clique com botão direito e escolha "Change Keybinding")
5. Pressione **Ctrl + /** no teclado
6. Se aparecer um aviso de conflito, escolha "Remove" ou "Replace" no atalho conflitante

## Método 2: Editar keybindings.json Global

1. Pressione **Ctrl + Shift + P**
2. Digite: `Preferences: Open Keyboard Shortcuts (JSON)`
3. Adicione esta configuração:

```json
[
  {
    "key": "ctrl+/",
    "command": "editor.action.commentLine",
    "when": "editorTextFocus && !editorReadonly"
  }
]
```

## Verificar se já está configurado

1. Pressione **Ctrl + K, Ctrl + S**
2. Procure por `ctrl+/` na lista de atalhos
3. Veja qual comando está associado a esse atalho

## Dica

O atalho **Ctrl + /** já vem configurado por padrão no Cursor/VS Code. Se não está funcionando, pode ser:
- Um conflito com outro programa (como um gerenciador de janelas)
- O layout do teclado está diferente
- Alguma extensão está interferindo

Tente também: **Ctrl + K, Ctrl + C** (comentar) e **Ctrl + K, Ctrl + U** (descomentar)

