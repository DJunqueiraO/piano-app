import time

import webview
import os
from bs4 import BeautifulSoup

os.environ["WEBKIT_DISABLE_DMABUF_RENDERER"] = "1"
os.environ["PYWEBVIEW_GUI"] = "gtk"

class Index:

    def __init__(self, url: str):
        self.beautifulsoup = None
        self.url = url

    def get_beautifulsoup(self) -> BeautifulSoup:
        if self.beautifulsoup is None:
            with open(self.url, 'r') as file:
                html = file.read()
                self.beautifulsoup = BeautifulSoup(html, 'html.parser')
        return self.beautifulsoup

    def get_title(self) -> str:
        return self.get_beautifulsoup().find('title').text

# def bind(window_: webview.Window):
#
#     def on_click(event):
#
#         key_button = window.dom.get_elements(f'.KeyButton{event['code']}')
#         if not key_button:
#             key_button = window.dom.get_elements(f'.KeyButton_c{ord(event['key'])}')
#
#         print(window.dom.get_elements(f'.KeyButton{event['code']}'))
#         print(f'.KeyButton_c{event['key']}')
#
#
#     window_.dom.window.events.keydown += on_click

if __name__ == '__main__':

    url = 'deploy/build/index.html'

    index = Index(url)

    window = webview.create_window(
        title=index.get_title(),
        url=url,
        maximized=True
    )

    webview.start(
        # bind,
        # window,
        private_mode=False,
        icon='deploy/public/icon.png'
    )

