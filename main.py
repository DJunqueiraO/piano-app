import webview
import os
from bs4 import BeautifulSoup


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


if __name__ == '__main__':

    url = 'piano-app/build/index.html'

    index = Index(url)

    webview.create_window(
        title=index.get_title(),
        url=url
    )
    webview.start(
        private_mode=False
    )

