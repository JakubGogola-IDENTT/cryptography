# Lista 2

## Konfiguracja

Do uruchomienia aplikacji niezbędne są narzędzie `Node` oraz `NPM`. W celu zainstalowania niebzędnych zależności, należy, w katalogu z projektem wywołać komendę:

```bash
npm i
```

## Szyfrowanie plików

Program umożliwia szyfrowanie plików. W tym celu należy wywołać komendę

```bash
node ./index.js ...
```
z odpowiednimi argumentami:
```
Options:
  --help        Pokaż pomoc                                            [boolean]
  --version     Pokaż numer wersji                                     [boolean]
  --algorithm   encryption algorithm
      [ciąg znaków] [wymagany] [dostępne: "ofb", "ctr", "cbc"] [domyślny: "cbc"]
  --mode        program mode
             [ciąg znaków] [wymagany] [dostępne: "enc", "dec"] [domyślny: "enc"]
  --inputFile   path to input file                      [ciąg znaków] [wymagany]
  --outputFile  path to output file                     [ciąg znaków] [wymagany]
  --password    password to keystore                    [ciąg znaków] [wymagany]
  --keyId       ID of key in keystore                   [ciąg znaków] [wymagany]

```

Przykładowe wywołania (dla wszystkich dostępnych trybów szyfrowania) zaprezentowano w pliku `run.sh`, który można uruchomić za pomocą polecenia:
```bash
./run.sh
```

## Tryb wyroczni

Tryb wyroczni przygotowano w formie prostego REST API umożliwiającego szyfrowanie wiadomości, a także wykonanie _challengu_. Przygotowanoe w tym celu odpowiednio dwa endpointy:

```bash
curl --location --request GET 'http://localhost:3000/oracle?m=message'

curl --location --request GET 'http://localhost:3000/challenge?m1=message1&m2=message2'
```

Każdy z endpointów zwraca zakodową wiadomość:
```json
{
    "cipherText": "6e8e71b8698b99d5228f4b944c3e945da277ff449c88d9e1c92c210a89039d6f"
}
```

W celu uruchomienia serwera należy użyc skryptu
```bash
./run_oracle.sh
```

## Distinguisher

W celu uruchomienia distinguishera nalezy użyć skryptu:
```bash
./run_distinguisher.sh
```
przy działającym serwisie wyroczni.