# Taleh Muzaffarov
from db_fiveberg import get_content
from nltk_generate import nltk_generate
from db_gmf import writeGMF


def main():
    articles = get_content()
    data = nltk_generate(articles)
    writeGMF(data)


if __name__ == '__main__':
    main()
