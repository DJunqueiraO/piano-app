import webview
from bs4 import BeautifulSoup

with open('piano-app/build/index.html', 'r') as file:
    title = (
        BeautifulSoup(file.read(), 'html.parser')
        .find('title').text
    )

webview.create_window(
    title=title,
    url='piano-app/build/index.html'
)
webview.start(
    private_mode=False
)

