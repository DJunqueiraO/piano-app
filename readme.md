# Piano App

Aplicação desktop simples feita com **pywebview** que carrega e exibe uma página HTML local (`deploy/build/index.html`) em tela maximizada.

O projeto contém basicamente um único arquivo principal (`main.py`) que:

- Lê o título da página HTML com BeautifulSoup
- Abre uma janela nativa maximizada com a página
- Usa o backend GTK no Linux (com correções para NVIDIA + Wayland)

---

## Requisitos

- Python 3.10+
- Dependências Python (instalar no ambiente virtual):

```bash
pip install pywebview BeautifulSoup4 pycairo PyGObject